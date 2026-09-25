import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const revalidate = 3600;
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

/**
 * Branded Open Graph image generator.
 *
 * `ImageResponse` renders JSX to a PNG at build time for static pages and on
 * demand (cached) otherwise, so every article and project gets a consistent
 * social card without hand-made assets.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get("title") ?? siteConfig.siteName).slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? siteConfig.jobTitle).slice(0, 60);
  const description = (searchParams.get("description") ?? "").slice(0, 160);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#f7f5f2",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 26,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#9a3412",
          fontWeight: 600,
        }}
      >
        <div style={{ width: 18, height: 18, backgroundColor: "#c2410c", borderRadius: 4 }} />
        <div>{eyebrow}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: title.length > 60 ? 60 : 76,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#1a1712",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.4,
              color: "#4a453e",
              maxWidth: 940,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #e5e0d7",
          paddingTop: 28,
          fontSize: 26,
          color: "#746c62",
        }}
      >
        <div style={{ display: "flex", color: "#1a1712", fontWeight: 600 }}>
          {siteConfig.siteName}
        </div>
        <div style={{ display: "flex" }}>{siteConfig.jobTitle}</div>
      </div>
    </div>,
    size,
  );
}
