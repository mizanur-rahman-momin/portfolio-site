import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import {
  hasErrors,
  looksLikeSpam,
  validateContact,
  type ContactInput,
} from "@/lib/validation/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Simple in-process rate limit. See the README for its limits. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);

  // Keep the map from growing without bound.
  if (submissions.size > 5000) {
    for (const [storedKey, times] of submissions) {
      if (times.every((time) => now - time > RATE_LIMIT_WINDOW_MS)) {
        submissions.delete(storedKey);
      }
    }
  }

  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const key = clientKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent. Please try again later." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const input: ContactInput = {
    name: asString(payload.name),
    email: asString(payload.email),
    projectType: asString(payload.projectType),
    budget: asString(payload.budget),
    timeline: asString(payload.timeline),
    message: asString(payload.message),
    company: asString(payload.company),
    startedAt: typeof payload.startedAt === "number" ? payload.startedAt : undefined,
  };

  // Bots are silently accepted so they do not learn what tripped the filter.
  if (looksLikeSpam(input)) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    // No delivery endpoint configured: fail loudly rather than pretending to send.
    return NextResponse.json(
      {
        ok: false,
        error: "The contact form is not configured on this deployment.",
        fallbackEmail: siteConfig.contactEmail,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...input,
        company: undefined,
        startedAt: undefined,
        submittedAt: new Date().toISOString(),
        source: "portfolio-contact-form",
      }),
      // Do not let a slow endpoint hang the request.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(`Delivery endpoint responded with ${response.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong sending your message. Please email me directly instead.",
        fallbackEmail: siteConfig.contactEmail,
      },
      { status: 502 },
    );
  }
}
