import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig, siteUrl } from "@/config/site";
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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function addAcumbamailSubscriber(email: string, name: string): Promise<boolean> {
  const authToken = process.env.ACUMBAMAIL_AUTH_TOKEN?.trim();
  const listId = process.env.ACUMBAMAIL_LIST_ID?.trim();

  if (!authToken || !listId) return false;

  try {
    const params = new URLSearchParams();
    params.append("auth_token", authToken);
    params.append("response_type", "json");
    params.append("list_id", listId);
    params.append("merge_fields[email]", email);
    params.append("merge_fields[nombre]", name);
    params.append("merge_fields[name]", name);
    params.append("update_subscriber", "1");

    const res = await fetch("https://acumbamail.com/api/1/addSubscriber/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok || res.status === 201) {
      return true;
    }
    console.warn("[contact] Acumbamail addSubscriber returned status:", res.status);
    return false;
  } catch (err) {
    console.error("[contact] Failed to add subscriber to Acumbamail list:", err);
    return false;
  }
}

async function sendAcumbamailEmail(input: ContactInput): Promise<boolean> {
  const smtpUser = process.env.ACUMBAMAIL_SMTP_USER?.trim();
  const authToken = process.env.ACUMBAMAIL_AUTH_TOKEN?.trim();
  const smtpPass = process.env.ACUMBAMAIL_SMTP_PASSWORD?.trim() || authToken;

  if (!smtpUser || !smtpPass) return false;

  const smtpHost = process.env.ACUMBAMAIL_SMTP_HOST?.trim() || "smtp.acumbamail.com";
  const smtpPort = Number(process.env.ACUMBAMAIL_SMTP_PORT) || 587;
  const fromEmail = process.env.ACUMBAMAIL_FROM_EMAIL?.trim() || smtpUser;
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL?.trim() || siteConfig.contactEmail;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const subject = `[New Contact Lead] ${input.name} - ${input.projectType || "General Inquiry"}`;
  const textBody = [
    `New Lead from Portfolio:`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.projectType ? `Service / Project: ${input.projectType}` : "",
    input.budget ? `Budget: ${input.budget}` : "",
    input.timeline ? `Timeline: ${input.timeline}` : "",
    `\nMessage:\n${input.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 12px; background-color: #ffffff; color: #18181b;">
      <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #18181b; font-size: 20px;">New Contact Lead from Portfolio</h2>
        <p style="margin: 4px 0 0; color: #71717a; font-size: 13px;">Received on ${new Date().toLocaleString()}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #71717a; width: 140px; font-weight: 500;">Name:</td>
          <td style="padding: 8px 0; color: #18181b; font-weight: 600;">${escapeHtml(input.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #71717a; font-weight: 500;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(input.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(input.email)}</a></td>
        </tr>
        ${input.projectType ? `<tr><td style="padding: 8px 0; color: #71717a; font-weight: 500;">Service:</td><td style="padding: 8px 0; color: #18181b;">${escapeHtml(input.projectType)}</td></tr>` : ""}
        ${input.budget ? `<tr><td style="padding: 8px 0; color: #71717a; font-weight: 500;">Budget:</td><td style="padding: 8px 0; color: #18181b;">${escapeHtml(input.budget)}</td></tr>` : ""}
        ${input.timeline ? `<tr><td style="padding: 8px 0; color: #71717a; font-weight: 500;">Timeline:</td><td style="padding: 8px 0; color: #18181b;">${escapeHtml(input.timeline)}</td></tr>` : ""}
      </table>

      <div style="background-color: #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px; color: #27272a; font-size: 14px;">Message:</h4>
        <p style="margin: 0; color: #3f3f46; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(input.message)}</p>
      </div>

      <div style="border-top: 1px solid #e4e4e7; padding-top: 14px; font-size: 12px; color: #a1a1aa; text-align: center;">
        Sent from <a href="${siteUrl}" style="color: #71717a; text-decoration: underline;">${siteConfig.name}</a> via Acumbamail. You can click Reply to respond directly to ${escapeHtml(input.name)}.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${fromEmail}>`,
    to: toEmail,
    replyTo: input.email,
    subject,
    text: textBody,
    html: htmlBody,
  });

  return true;
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

  const hasAcumbamail = Boolean(
    process.env.ACUMBAMAIL_AUTH_TOKEN?.trim() &&
    (process.env.ACUMBAMAIL_SMTP_USER?.trim() || process.env.ACUMBAMAIL_LIST_ID?.trim()),
  );
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!hasAcumbamail && !webhookUrl) {
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

  let delivered = false;

  // 1. Direct Acumbamail delivery
  if (hasAcumbamail) {
    // Attempt saving to Acumbamail audience list
    if (process.env.ACUMBAMAIL_LIST_ID?.trim()) {
      try {
        const added = await addAcumbamailSubscriber(input.email, input.name);
        if (added) delivered = true;
      } catch (err) {
        console.error("[contact] Acumbamail addSubscriber error:", err);
      }
    }

    // Attempt sending lead notification email via SMTP
    if (process.env.ACUMBAMAIL_SMTP_USER?.trim()) {
      try {
        const sent = await sendAcumbamailEmail(input);
        if (sent) delivered = true;
      } catch (error) {
        console.error("[contact] Acumbamail SMTP delivery failed:", error);
      }
    }
  }

  // 2. Webhook delivery (if configured)
  if (webhookUrl) {
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
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) {
        delivered = true;
      } else {
        console.warn(`[contact] Webhook responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("[contact] Webhook delivery failed:", error);
    }
  }

  if (delivered) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    {
      ok: false,
      error: "Something went wrong sending your message. Please email me directly instead.",
      fallbackEmail: siteConfig.contactEmail,
    },
    { status: 502 },
  );
}
