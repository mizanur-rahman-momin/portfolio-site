import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CONTROL_COOKIE_NAME,
  checkPassword,
  generateSessionToken,
  isAuthenticated,
} from "@/lib/control/auth";

const LOGIN_ATTEMPTS_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_LOGIN_ATTEMPTS = 5;
const failedAttempts = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (failedAttempts.get(ip) ?? []).filter(
    (time) => now - time < LOGIN_ATTEMPTS_WINDOW_MS,
  );
  failedAttempts.set(ip, recent);
  return recent.length >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const recent = (failedAttempts.get(ip) ?? []).filter(
    (time) => now - time < LOGIN_ATTEMPTS_WINDOW_MS,
  );
  recent.push(now);
  failedAttempts.set(ip, recent);
}

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many failed login attempts. Please try again in 15 minutes." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!checkPassword(password)) {
      recordFailedAttempt(ip);
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Reset failed attempts on success
    failedAttempts.delete(ip);

    const token = generateSessionToken();
    const cookieStore = await cookies();

    cookieStore.set(CONTROL_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(CONTROL_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
