import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Rate limiting: max 5 newsletter signups per 10 minutes per IP */
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const key = clientKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  // Silently accept bots so they don't learn how to bypass the check
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const authToken = process.env.ACUMBAMAIL_AUTH_TOKEN?.trim();
  const listId =
    process.env.ACUMBAMAIL_NEWSLETTER_LIST_ID?.trim() ||
    process.env.ACUMBAMAIL_LIST_ID?.trim() ||
    "1510867";

  if (!authToken) {
    return NextResponse.json(
      {
        ok: false,
        error: "Newsletter delivery is not configured on this server.",
      },
      { status: 503 },
    );
  }

  try {
    const params = new URLSearchParams();
    params.append("auth_token", authToken);
    params.append("response_type", "json");
    params.append("list_id", listId);
    params.append("merge_fields[email]", email);
    params.append("update_subscriber", "1");

    const res = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok || res.status === 201) {
      return NextResponse.json({ ok: true });
    }

    const errorText = await res.text();
    console.error("[newsletter] Acumbamail returned error:", res.status, errorText);

    return NextResponse.json(
      { ok: false, error: "Failed to subscribe with email provider." },
      { status: 502 },
    );
  } catch (error) {
    console.error("[newsletter] Network error:", error);
    return NextResponse.json(
      { ok: false, error: "Network error connecting to email service." },
      { status: 502 },
    );
  }
}
