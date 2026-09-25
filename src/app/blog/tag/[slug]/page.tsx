import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyArchive } from "@/components/blog/TaxonomyArchive";
import { MIN_TAXONOMY_POSTS } from "@/lib/content/shared";
import { getBlogTags, getPostsByTag } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogTags().map((tag) => ({ slug: tag.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getBlogTags().find((item) => item.slug === slug);

  if (!tag) {
    return buildMetadata({
      title: "Tag not found",
      description: "The requested tag could not be found.",
      path: `/blog/tag/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `Tag: ${tag.label}`,
    description: `Articles tagged ${tag.label}.`,
    path: `/blog/tag/${tag.slug}`,
    eyebrow: "Tag",
    noIndex: tag.count < MIN_TAXONOMY_POSTS,
  });
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getBlogTags().find((item) => item.slug === slug);

  if (!tag) notFound();

  const posts = getPostsByTag(slug);
  if (posts.length === 0) notFound();

  return (
    <TaxonomyArchive
      kind="tag"
      label={tag.label}
      slug={tag.slug}
      posts={posts}
      siblings={getBlogTags()}
    />
  );
}
