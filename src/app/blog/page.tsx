import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LeadMagnetSection } from "@/components/home/LeadMagnetSection";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { siteConfig } from "@/config/site";
import { getBlogCategories, getFeaturedPost, getAllBlogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogSchema, collectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "B2B Lead Generation Blog & Guides",
  description:
    "Practical articles on B2B lead generation, cold email, LinkedIn prospecting, SaaS growth, automation and content.",
  keywords: [
    "B2B lead generation blog",
    "cold email tips",
    "LinkedIn prospecting",
    "SaaS growth",
    "marketing automation",
  ],
  path: "/blog",
  eyebrow: "Writing",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const featured = getFeaturedPost();
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  const categories = getBlogCategories();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs items={crumbs} className="sr-only" />
      <JsonLd
        data={[
          blogSchema(posts),
          collectionPageSchema({
            name: `${siteConfig.siteName} — Blog`,
            description:
              "Articles on B2B lead generation, LinkedIn prospecting, SaaS growth and automation.",
            path: "/blog",
            items: posts.map((post) => ({
              name: post.frontmatter.title,
              href: `/blog/${post.slug}`,
            })),
          }),
        ]}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white pt-14 pb-16 sm:pt-20 sm:pb-24 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.18),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        />
        <Container size="wide" className="text-center">
          {/* Breadcrumbs */}
          <div className="mb-6 flex justify-center">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs font-medium sm:text-sm">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    <svg
                      className="size-3.5 sm:size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                  /
                </li>
                <li>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Blog</span>
                </li>
              </ol>
            </nav>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-600 shadow-2xs backdrop-blur-md dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
            Field-Tested Insights &amp; Playbooks
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            B2B Lead Generation, Cold Email &amp; <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Outreach Playbooks</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Short, actionable guides on sourcing verified prospects, writing high-reply outreach
            sequences, and building repeatable revenue engines.
          </p>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              <Link
                href="/blog"
                className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 sm:text-sm"
              >
                All Articles ({posts.length})
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="rounded-full border border-zinc-200/90 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 sm:text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  {c.label} ({c.count})
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Blog Articles Grid */}
      <Section spacing="default">
        <Container size="wide">
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
              No articles published yet.
            </p>
          ) : (
            <div className="flex flex-col gap-10">
              {featured && (
                <div>
                  <span className="mb-4 block text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                    Featured Master Guide
                  </span>
                  <PostCard post={featured} variant="featured" priority />
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* Lead Magnet */}
      <LeadMagnetSection />

      {/* Bottom Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
