import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getAllBlogPosts, getBlogCategories, getBlogTags } from "@/lib/content/blog";
import { getAllProjects } from "@/lib/content/projects";
import { MIN_TAXONOMY_POSTS } from "@/lib/content/shared";

/**
 * Dynamic sitemap.
 *
 * Includes only indexable, canonical URLs: drafts are already filtered out by
 * the content layer, `/search` is noindexed, and taxonomy pages are added only
 * once they contain enough posts to be worth indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const projects = getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/experience"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/now"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/uses"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getBlogCategories()
    .filter((category) => category.count >= MIN_TAXONOMY_POSTS)
    .map((category) => ({
      url: absoluteUrl(`/blog/category/${category.slug}`),
      changeFrequency: "weekly",
      priority: 0.4,
    }));

  const tagRoutes: MetadataRoute.Sitemap = getBlogTags()
    .filter((tag) => tag.count >= MIN_TAXONOMY_POSTS)
    .map((tag) => ({
      url: absoluteUrl(`/blog/tag/${tag.slug}`),
      changeFrequency: "weekly",
      priority: 0.3,
    }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
