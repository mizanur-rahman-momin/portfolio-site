import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { PostCard } from "@/components/blog/PostCard";
import { TaxonomyList } from "@/components/blog/TaxonomyList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import {
  getBlogCategories,
  getBlogTags,
  getFeaturedPost,
  getAllBlogPosts,
} from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogSchema, collectionPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "B2B Lead Generation Blog",
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
  const tags = getBlogTags();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  if (posts.length === 0) {
    return (
      <>
        <Breadcrumbs items={crumbs} className="sr-only" />
        <Section>
          <Container size="wide">
            <h1 className="text-title text-fg">Blog</h1>
            <p className="text-fg-muted mt-4 max-w-2xl text-lg">
              No articles have been published yet. Add an MDX file under{" "}
              <code className="bg-surface-muted rounded px-1.5 py-0.5 font-mono text-sm">
                content/blog/&lt;slug&gt;/index.mdx
              </code>{" "}
              to get started.
            </p>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
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

      <Section spacing="compact">
        <Container size="wide">
          <Breadcrumbs items={crumbs} className="mb-7" />
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Writing
          </p>
          <h1 className="text-title text-fg mt-4 max-w-3xl text-balance">
            Notes on lead generation and SaaS growth
          </h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed">
            Short, practical articles on finding prospects, starting conversations and building
            systems that keep working.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                Categories
              </p>
              <TaxonomyList items={categories} kind="category" className="mt-3" tone="accent" />
            </div>
            <div>
              <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                Topics
              </p>
              <TaxonomyList items={tags} kind="tag" className="mt-3" />
            </div>
          </div>
        </Container>
      </Section>

      {featured ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="sr-only">Featured article</h2>
            <PostCard post={featured} variant="featured" priority />
          </Container>
        </Section>
      ) : null}

      {rest.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">All articles</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug} className="flex">
                  <PostCard post={post} className="w-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section divided spacing="compact">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <h2 className="text-fg text-2xl font-semibold tracking-tight">Browse by topic</h2>
              <p className="text-fg-muted mt-3 text-sm">
                Taxonomy pages appear here once they contain enough articles to be useful.
              </p>
              <div className="mt-6 flex flex-col gap-6">
                <div>
                  <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                    Categories
                  </p>
                  <TaxonomyList
                    items={categories}
                    kind="category"
                    minCount={1}
                    className="mt-3"
                    tone="accent"
                  />
                </div>
                <div>
                  <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                    Tags
                  </p>
                  <TaxonomyList items={tags} kind="tag" minCount={1} className="mt-3" />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/search" variant="outline" size="sm">
                  Search all content
                </ButtonLink>
                <Link
                  href="/rss.xml"
                  className="text-fg-muted hover:text-fg inline-flex items-center gap-1.5 self-center text-sm font-medium"
                >
                  Subscribe via RSS
                  <ArrowRightIcon width={15} height={15} />
                </Link>
              </div>
            </div>

            <NewsletterCTA />
          </div>
        </Container>
      </Section>
    </>
  );
}
