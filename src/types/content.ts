/** Frontmatter contract for blog posts (content/blog/<slug>/index.mdx). */
export type BlogFrontmatter = {
  title: string;
  description: string;
  /** Optional override — defaults to the containing folder name. */
  slug?: string;
  /** ISO date, e.g. 2026-01-31. */
  date: string;
  /** ISO date of the last meaningful update. */
  updated?: string;
  author?: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  coverImageAlt?: string;
  /** Overrides the computed reading time (e.g. "6 min read"). */
  readingTime?: string;
  /** Set when this article was first published elsewhere. */
  canonicalUrl?: string;
  /** Marks content as sample/placeholder so the UI can flag it. */
  placeholder?: boolean;
  /** Slugs of related projects, used for internal linking. */
  relatedProjects?: string[];
  /** Slugs of related services, used for internal linking. */
  relatedServices?: string[];
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  /** Raw MDX body, with frontmatter stripped. */
  content: string;
  /** Computed reading time, e.g. "7 min read". */
  readingTime: string;
  /** Absolute path to the source file, relative to the project root. */
  filePath: string;
  /** Source directory relative to the content root, e.g. "blog/my-post". */
  baseDir: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
  /** Optional context, e.g. "measured over 3 months". */
  note?: string;
};

/** Frontmatter contract for project case studies (content/projects/<slug>.mdx). */
export type ProjectFrontmatter = {
  title: string;
  /** One-line description used on cards and in metadata. */
  description: string;
  slug?: string;
  /** ISO date used for ordering and `datePublished`. */
  date: string;
  category: string;
  /** e.g. "Lead engineer", "Founding engineer". */
  role?: string;
  /** Omit if the work is under NDA or internal. */
  client?: string;
  /** e.g. "2024 — 2025". */
  timeline?: string;
  technologies?: string[];
  /** A short, verifiable outcome statement. Do not invent metrics. */
  outcome?: string;
  featured?: boolean;
  /** Lower numbers appear first on the projects index. */
  order?: number;
  coverImage?: string;
  coverImageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
  draft?: boolean;
  placeholder?: boolean;
  /** Only include metrics you can actually verify. */
  metrics?: ProjectMetric[];
  gallery?: GalleryImage[];
  /** Slugs of related articles, used for internal linking. */
  relatedArticles?: string[];
  relatedServices?: string[];
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingTime: string;
  filePath: string;
  /** Source directory relative to the content root, e.g. "projects/my-project". */
  baseDir: string;
};

/** A single row in the static search index. */
export type SearchRecord = {
  id: string;
  type: "post" | "project" | "page";
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  date?: string;
  /** Plain-text body used for full-text matching. */
  body: string;
};
