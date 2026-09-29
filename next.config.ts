import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The Content-Security-Policy is intentionally permissive for scripts and
 * styles because the site is statically rendered: Next.js ships inline
 * bootstrap scripts, and a nonce-based policy would force every page to render
 * dynamically. Everything else (framing, plugins, form targets, base URI) is
 * locked down. If you later add third-party scripts, tighten `script-src` and
 * move to a nonce-based policy in `middleware.ts`.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  // Pin the workspace root so builds do not walk up into the user's home folder.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Modern formats first; Next negotiates the best supported option.
    formats: ["image/avif", "image/webp"],
    /**
     * Homepage photos carry a `?v=` cache-busting query so that replacing a
     * file under the same name invalidates the image optimizer cache. The
     * catch-all entry keeps every other local image working exactly as before.
     */
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/**", search: "" }],
    // Content images are served from /public/content, so no remote patterns are
    // needed by default. Add `remotePatterns` here if you reference remote art.
    remotePatterns: [],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
  },
  /**
   * Redirects.
   *
   * A new site has nothing to redirect yet, but permanent redirects are part of
   * the SEO architecture: if you rename a slug, add a `permanent: true` entry
   * here rather than deleting the old URL, so the equity and any inbound links
   * follow. Example:
   *
   *   { source: "/blog/old-slug", destination: "/blog/new-slug", permanent: true }
   *
   * Keep `permanent: true` (308) for content moves; use `permanent: false` (307)
   * only for temporary changes.
   */
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Content images are immutable between builds.
        source: "/content/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
