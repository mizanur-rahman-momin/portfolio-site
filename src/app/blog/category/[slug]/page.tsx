import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyArchive } from "@/components/blog/TaxonomyArchive";
import { MIN_TAXONOMY_POSTS } from "@/lib/content/shared";
import { getBlogCategories, getPostsByCategory } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ slug: category.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) {
    return buildMetadata({
      title: "Category not found",
      description: "The requested category could not be found.",
      path: `/blog/category/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `Category: ${category.label}`,
    description: `Articles filed under ${category.label}.`,
    path: `/blog/category/${category.slug}`,
    eyebrow: "Category",
    // Thin archives are kept out of the index until they earn it.
    noIndex: category.count < MIN_TAXONOMY_POSTS,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategories().find((item) => item.slug === slug);

  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();

  return (
    <TaxonomyArchive
      kind="category"
      label={category.label}
      slug={category.slug}
      posts={posts}
      siblings={getBlogCategories()}
    />
  );
}
