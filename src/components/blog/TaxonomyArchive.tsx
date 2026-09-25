import Link from "next/link";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
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

/**
 * Shared layout for category and tag archives.
 *
 * Only posts are listed; empty archives never reach this component because the
 * routes call `notFound()` when nothing matches.
 */
export function TaxonomyArchive({ kind, label, slug, posts, siblings }: TaxonomyArchiveProps) {
  const kindLabel = kind === "category" ? "Category" : "Tag";
  const heading = kind === "category" ? `Articles in ${label}` : `Articles tagged “${label}”`;

  return (
    <>
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

      <Section spacing="compact">
        <Container size="wide">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: label }]}
            className="mb-7"
          />
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            {kindLabel}
          </p>
          <h1 className="text-title text-fg mt-4 text-balance">{heading}</h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg">
            {posts.length} article{posts.length === 1 ? "" : "s"} ·{" "}
            <Link href="/blog" className="link-underline">
              back to the blog
            </Link>
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
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

      {siblings.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
              Other {kind === "category" ? "categories" : "tags"}
            </h2>
            <TaxonomyList
              items={siblings.filter((item) => item.slug !== slug)}
              kind={kind}
              className="mt-4"
              tone={kind === "category" ? "accent" : "neutral"}
            />
          </Container>
        </Section>
      ) : null}

      <Section divided spacing="compact">
        <Container size="narrow">
          <NewsletterCTA />
        </Container>
      </Section>
    </>
  );
}
