import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type OgImageParams = {
  title: string;
  eyebrow?: string;
  description?: string;
  type?: string;
};

/** Build a URL for the dynamically generated Open Graph image. */
export function ogImageUrl({ title, eyebrow, description, type }: OgImageParams): string {
  const search = new URLSearchParams({ title });
  if (eyebrow) search.set("eyebrow", eyebrow);
  if (description) search.set("description", description);
  if (type) search.set("type", type);
  return `/api/og?${search.toString()}`;
}

export type BuildMetadataInput = {
  title: string;
  description: string;
  /** Root-relative path of the page, e.g. "/blog/my-post". */
  path: string;
  type?: "website" | "article";
  images?: OgImage[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  /** Set for pages that must not be indexed (utility, thin or private pages). */
  noIndex?: boolean;
  /** Override when the canonical lives elsewhere (e.g. a cross-posted article). */
  canonicalUrl?: string;
  /** Eyebrow text used on the generated OG image. */
  eyebrow?: string;
  /** Page-specific keywords. Falls back to the site-wide list. */
  keywords?: readonly string[];
};

/**
 * Single entry point for page metadata.
 *
 * Building metadata in one place keeps titles, descriptions, canonicals, Open
 * Graph and Twitter tags consistent, and avoids accidental inheritance of a
 * parent's canonical or OG URL.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  images,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex = false,
  canonicalUrl,
  eyebrow,
  keywords,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedImages: OgImage[] =
    images && images.length > 0
      ? images
      : [
          {
            url: ogImageUrl({
              title,
              eyebrow: eyebrow ?? siteConfig.siteName,
              description,
              type,
            }),
            width: 1200,
            height: 630,
            alt: title,
          },
        ];

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords ? [...keywords] : [...siteConfig.keywords],
    alternates: {
      canonical: canonicalUrl ?? url,
      types: {
        "application/rss+xml": absoluteUrl("/rss.xml"),
      },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      locale: siteConfig.locale,
      images: resolvedImages,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages.map((image) => image.url),
      ...(siteConfig.twitterHandle
        ? { creator: siteConfig.twitterHandle, site: siteConfig.twitterHandle }
        : {}),
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  }

  return metadata;
}
