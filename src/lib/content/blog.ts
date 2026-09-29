import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogFrontmatter, BlogPost } from "@/types/content";
import { slugify } from "@/lib/utils/format";
import {
  BLOG_ROOT,
  ContentError,
  contentBaseDir,
  findColocatedCover,
  isProduction,
  optionalString,
  resolveContentImage,
} from "./shared";

const MDX_EXTENSIONS = new Set([".mdx", ".md"]);

function readEntryFiles(): { slug: string; filePath: string }[] {
  if (!fs.existsSync(BLOG_ROOT)) return [];

  const entries = fs.readdirSync(BLOG_ROOT, { withFileTypes: true });
  const files: { slug: string; filePath: string }[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    if (entry.isDirectory()) {
      const directory = path.join(BLOG_ROOT, entry.name);
      const indexFile = ["index.mdx", "index.md"]
        // Content is read at build time only; opting out of Turbopack's tracing
        // keeps the server bundle from including the entire project.
        .map((name) => path.join(/* turbopackIgnore: true */ directory, name))
        .find((candidate) => fs.existsSync(candidate));

      if (indexFile) {
        files.push({ slug: entry.name, filePath: indexFile });
      }
      continue;
    }

    const extension = path.extname(entry.name);
    if (MDX_EXTENSIONS.has(extension)) {
      files.push({
        slug: path.basename(entry.name, extension),
        filePath: path.join(BLOG_ROOT, entry.name),
      });
    }
  }

  return files;
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
  _filePath: string,
  baseDir: string,
): BlogFrontmatter {
  const title =
    typeof data.title === "string" && data.title.trim().length > 0
      ? data.title.trim()
      : slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  const rawDescription =
    typeof data.description === "string" && data.description.trim().length > 0
      ? data.description.trim()
      : "";
  const description = rawDescription || title;

  const rawCategory =
    typeof data.category === "string" && data.category.trim().length > 0
      ? data.category.trim()
      : "Guides";

  let dateIso = new Date().toISOString();
  if (typeof data.date === "string" && data.date.trim().length > 0) {
    const timestamp = new Date(data.date.trim()).getTime();
    if (!Number.isNaN(timestamp)) {
      dateIso = new Date(data.date.trim()).toISOString();
    }
  }

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : typeof data.tags === "string"
      ? (data.tags as string)
          .split(/[,;\n]/)
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  return {
    title,
    description,
    slug: typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : slug,
    date: dateIso,
    updated: optionalString(data.updated)
      ? new Date(data.updated as string).toISOString()
      : undefined,
    author: optionalString(data.author) ?? "Mizanur Rahman Momin",
    category: rawCategory,
    tags,
    featured: data.featured === true,
    draft: data.draft === true,
    coverImage: optionalString(data.coverImage)
      ? resolveContentImage(data.coverImage as string, baseDir)
      : undefined,
    coverImageAlt: optionalString(data.coverImageAlt),
    readingTime: optionalString(data.readingTime),
    canonicalUrl: optionalString(data.canonicalUrl),
    placeholder: data.placeholder === true,
    relatedProjects: Array.isArray(data.relatedProjects)
      ? data.relatedProjects.map(String)
      : [],
    relatedServices: Array.isArray(data.relatedServices) ? data.relatedServices.map(String) : [],
  };
}

function parsePost(slug: string, filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const baseDir = contentBaseDir(filePath);
  const frontmatter = normalizeFrontmatter(data, slug, filePath, baseDir);

  if (!frontmatter.coverImage) {
    const cover = findColocatedCover(path.dirname(filePath));
    if (cover) {
      frontmatter.coverImage = resolveContentImage(`./images/${cover}`, baseDir);
      frontmatter.coverImageAlt = frontmatter.coverImageAlt ?? frontmatter.title;
    }
  }

  const stats = readingTime(content);

  return {
    slug: frontmatter.slug ?? slug,
    frontmatter,
    content,
    readingTime: frontmatter.readingTime ?? `${Math.max(1, Math.round(stats.minutes))} min read`,
    filePath: path.relative(process.cwd(), filePath).replace(/\\/g, "/"),
    baseDir,
  };
}

/** All published blog posts, newest first. Drafts are excluded in production. */
export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const { slug, filePath } of readEntryFiles()) {
    try {
      posts.push(parsePost(slug, filePath));
    } catch (error) {
      console.error(`[blog] Failed to parse post "${slug}" at ${filePath}:`, error);
    }
  }

  return posts
    .filter((post) => !(isProduction && post.frontmatter.draft))
    .sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
    );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.frontmatter.featured) ?? posts[0];
}

export type Taxonomy = {
  /** Slug used in the URL. */
  slug: string;
  /** Human-readable label. */
  label: string;
  count: number;
};

export function getBlogCategories(): Taxonomy[] {
  const counts = new Map<string, Taxonomy>();

  for (const post of getAllBlogPosts()) {
    const label = post.frontmatter.category.trim();
    if (!label) continue;
    const slug = slugify(label);
    const existing = counts.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(slug, { slug, label, count: 1 });
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getBlogTags(): Taxonomy[] {
  const counts = new Map<string, Taxonomy>();

  for (const post of getAllBlogPosts()) {
    for (const tag of post.frontmatter.tags ?? []) {
      const label = tag.trim();
      if (!label) continue;
      const slug = slugify(label);
      const existing = counts.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(slug, { slug, label, count: 1 });
      }
    }
  }

  return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => slugify(post.frontmatter.category) === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    (post.frontmatter.tags ?? []).some((tag) => slugify(tag) === tagSlug),
  );
}

/** Related posts scored by shared tags, then category, then recency. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const tags = new Set((post.frontmatter.tags ?? []).map(slugify));

  return getAllBlogPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateTags = (candidate.frontmatter.tags ?? []).map(slugify);
      const sharedTags = candidateTags.filter((tag) => tags.has(tag)).length;
      const sameCategory = candidate.frontmatter.category === post.frontmatter.category ? 1 : 0;
      return { candidate, score: sharedTags * 2 + sameCategory };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.candidate.frontmatter.date).getTime() -
          new Date(a.candidate.frontmatter.date).getTime(),
    )
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

/** Previous/next post in publication order. */
export function getAdjacentPosts(post: BlogPost): { previous?: BlogPost; next?: BlogPost } {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((candidate) => candidate.slug === post.slug);
  if (index === -1) return {};
  return {
    previous: posts[index + 1],
    next: posts[index - 1],
  };
}

export function assertUniqueBlogSlugs(posts: BlogPost[]): void {
  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new ContentError(
        `Duplicate blog slug "${post.slug}" — check ${post.filePath} and any "slug" frontmatter overrides.`,
      );
    }
    seen.add(post.slug);
  }
}
