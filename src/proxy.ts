import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Check if the domain is control.mizanursguide.com (or control.localhost:3000 for local testing)
  if (host.startsWith("control.")) {
    // If accessing root of control subdomain, rewrite directly to /control
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/control", request.url));
    }

    // If path is not already under /control or /api or static assets, route to /control/*
    if (
      !pathname.startsWith("/control") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/_next") &&
      !pathname.includes(".")
    ) {
      return NextResponse.rewrite(new URL(`/control${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
