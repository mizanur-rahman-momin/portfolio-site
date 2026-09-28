import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CONTROL_COOKIE_NAME,
  checkPassword,
  generateSessionToken,
  isAuthenticated,
} from "@/lib/control/auth";

export async function GET() {
  const authed = await isAuthenticated();
  return NextResponse.json({ authenticated: authed });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

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
