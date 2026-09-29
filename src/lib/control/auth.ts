import crypto from "node:crypto";
import { cookies } from "next/headers";

export const CONTROL_COOKIE_NAME = "control_session";
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getCredentials() {
  const isProd = process.env.NODE_ENV === "production";
  const password = process.env.CONTROL_PANEL_PASSWORD?.trim();
  const secret = process.env.CONTROL_PANEL_SECRET?.trim();

  // In production, strictly require an explicit non-default password
  if (isProd) {
    if (!password || password === "change-to-a-strong-password") {
      return { password: "", secret: "" };
    }
    return {
      password,
      secret: secret || crypto.createHash("sha256").update(password).digest("hex"),
    };
  }

  // Development fallbacks only
  return {
    password: password || "mizanur-admin-2026",
    secret: secret || "mizanurs-guide-control-secret-salt-2026",
  };
}

/** Check if submitted password matches the configured control panel password */
export function checkPassword(input: string): boolean {
  const { password } = getCredentials();
  if (!input || !password) return false;

  const inputBuffer = Buffer.from(input);
  const targetBuffer = Buffer.from(password);

  if (inputBuffer.length !== targetBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

/** Generate a signed session token */
export function generateSessionToken(): string {
  const { password, secret } = getCredentials();
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}:${password}`)
    .digest("hex");

  return `${timestamp}.${signature}`;
}

/** Verify if a session token is valid and not expired */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (Number.isNaN(timestamp)) return false;

  // Check expiration
  if (Date.now() - timestamp > SESSION_MAX_AGE_MS || timestamp > Date.now() + 60000) {
    return false;
  }

  const { password, secret } = getCredentials();
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${timestampStr}:${password}`)
    .digest("hex");

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

/** Server-side check for current cookie */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CONTROL_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
