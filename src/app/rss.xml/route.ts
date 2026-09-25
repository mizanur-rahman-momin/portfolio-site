import { absoluteUrl, siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/content/blog";
import { stripMarkdown, truncate } from "@/lib/utils/text";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed for the blog.
 *
 * Generated from the same content layer as the pages, so the feed can never
 * drift from what is published.
 */
export async function GET() {
  const posts = getAllBlogPosts();
  const feedUrl = absoluteUrl("/rss.xml");
  const siteHome = absoluteUrl("/");
  const lastBuildDate = posts[0]?.frontmatter.updated ?? posts[0]?.frontmatter.date;

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      const summary = truncate(stripMarkdown(post.content), 400);

      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
      <author>${escapeXml(`${siteConfig.contactEmail} (${post.frontmatter.author ?? siteConfig.name})`)}</author>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <content:encoded><![CDATA[<p>${escapeXml(summary)}</p>]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.rssTitle)}</title>
    <link>${escapeXml(siteHome)}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${escapeXml(siteConfig.htmlLang)}</language>
    <managingEditor>${escapeXml(`${siteConfig.contactEmail} (${siteConfig.siteName})`)}</managingEditor>
    <webMaster>${escapeXml(`${siteConfig.contactEmail} (${siteConfig.siteName})`)}</webMaster>
    <copyright>${escapeXml(`© ${new Date().getFullYear()} ${siteConfig.siteName}`)}</copyright>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${lastBuildDate ? `    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
