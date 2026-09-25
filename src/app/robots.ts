import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Utility and non-indexable routes.
          "/api/",
          "/search",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
