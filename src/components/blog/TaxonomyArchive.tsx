import Link from "next/link";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { PostCard } from "@/components/blog/PostCard";
import { TaxonomyList } from "@/components/blog/TaxonomyList";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { collectionPageSchema } from "@/lib/seo/schema";
import type { BlogPost } from "@/types/content";
import type { Taxonomy } from "@/lib/content/blog";

type TaxonomyArchiveProps = {
  kind: "category" | "tag";
  label: string;
  slug: string;
  posts: BlogPost[];
  /** Other entries of the same kind, for cross-linking. */
  siblings: Taxonomy[];
};

export function TaxonomyArchive({ kind, label, slug, posts, siblings }: TaxonomyArchiveProps) {
  const kindLabel = kind === "category" ? "Category" : "Topic Tag";
  const heading = kind === "category" ? `Articles in ${label}` : `Articles tagged “${label}”`;

  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: label }];

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs items={crumbs} className="sr-only" />
      <JsonLd
        data={collectionPageSchema({
          name: `${kindLabel}: ${label}`,
          description: `${posts.length} article${posts.length === 1 ? "" : "s"} in ${label}.`,
          path: `/blog/${kind}/${slug}`,
          items: posts.map((post) => ({
            name: post.frontmatter.title,
            href: `/blog/${post.slug}`,
          })),
        })}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white pt-12 pb-14 sm:pt-16 sm:pb-18 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.15),transparent_70%)]"
        />

        <Container size="wide">
          <div className="mx-auto max-w-4xl text-center">
            {/* Breadcrumb Bar */}
            <div className="mb-6 flex justify-center">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium sm:text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                    /
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                    >
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                    /
                  </li>
                  <li>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{label}</span>
                  </li>
                </ol>
              </nav>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 uppercase dark:border-blue-800/80 dark:bg-blue-950/80 dark:text-blue-300">
              <span className="size-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              {kindLabel}
            </span>

            <h1 className="mt-4 text-3xl leading-[1.16] font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              {heading}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              {posts.length} field-tested guide{posts.length === 1 ? "" : "s"} ·{" "}
              <Link
                href="/blog"
                className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                view all articles
              </Link>
            </p>

            {siblings.length > 0 ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Other {kind === "category" ? "categories" : "tags"}:
                </span>
                <TaxonomyList
                  items={siblings.filter((item) => item.slug !== slug)}
                  kind={kind}
                  tone={kind === "category" ? "accent" : "neutral"}
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <Section spacing="default">
        <Container size="wide">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="flex">
                <PostCard post={post} className="w-full" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Bottom Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
