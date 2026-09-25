import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { GalleryImage, Project, ProjectFrontmatter, ProjectMetric } from "@/types/content";
import {
  ContentError,
  PROJECTS_ROOT,
  assertString,
  contentBaseDir,
  isProduction,
  optionalString,
  resolveContentImage,
} from "./shared";

const MDX_EXTENSIONS = new Set([".mdx", ".md"]);

/**
 * Projects support two layouts:
 *   content/projects/<slug>.mdx          (flat, with images in content/projects/images/)
 *   content/projects/<slug>/index.mdx    (folder, with images in content/projects/<slug>/images/)
 */
function readEntryFiles(): { slug: string; filePath: string }[] {
  if (!fs.existsSync(PROJECTS_ROOT)) return [];

  const entries = fs.readdirSync(PROJECTS_ROOT, { withFileTypes: true });
  const files: { slug: string; filePath: string }[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    if (entry.isDirectory()) {
      const directory = path.join(PROJECTS_ROOT, entry.name);
      const indexFile = ["index.mdx", "index.md"]
        // Content is read at build time only; opting out of Turbopack's tracing
        // keeps the server bundle from including the entire project.
        .map((name) => path.join(/* turbopackIgnore: true */ directory, name))
        .find((candidate) => fs.existsSync(candidate));
      if (indexFile) files.push({ slug: entry.name, filePath: indexFile });
      continue;
    }

    const extension = path.extname(entry.name);
    if (MDX_EXTENSIONS.has(extension)) {
      files.push({
        slug: path.basename(entry.name, extension),
        filePath: path.join(PROJECTS_ROOT, entry.name),
      });
    }
  }

  return files;
}

function parseMetrics(value: unknown, filePath: string): ProjectMetric[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new ContentError(`"metrics" must be a list in ${filePath}`);
  }
  return value.map((entry) => {
    const record = entry as Record<string, unknown>;
    assertString(record.label, "metrics[].label", filePath);
    assertString(record.value, "metrics[].value", filePath);
    return {
      label: record.label,
      value: record.value,
      note: typeof record.note === "string" ? record.note : undefined,
    };
  });
}

function parseGallery(
  value: unknown,
  filePath: string,
  baseDir: string,
): GalleryImage[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new ContentError(`"gallery" must be a list in ${filePath}`);
  }
  return value.map((entry) => {
    const record = entry as Record<string, unknown>;
    assertString(record.src, "gallery[].src", filePath);
    assertString(record.alt, "gallery[].alt", filePath);
    return {
      src: resolveContentImage(record.src, baseDir),
      alt: record.alt,
      caption: typeof record.caption === "string" ? record.caption : undefined,
    };
  });
}

function normalizeFrontmatter(
  data: Record<string, unknown>,
  slug: string,
  filePath: string,
  baseDir: string,
): ProjectFrontmatter {
  assertString(data.title, "title", filePath);
  assertString(data.description, "description", filePath);
  assertString(data.date, "date", filePath);
  assertString(data.category, "category", filePath);

  return {
    title: data.title,
    description: data.description,
    slug: typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : slug,
    date: new Date(data.date as string).toISOString(),
    category: data.category,
    role: optionalString(data.role),
    client: optionalString(data.client),
    timeline: optionalString(data.timeline),
    technologies: Array.isArray(data.technologies)
      ? data.technologies.map(String).filter((tech) => tech.trim().length > 0)
      : [],
    outcome: optionalString(data.outcome),
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : undefined,
    coverImage: optionalString(data.coverImage)
      ? resolveContentImage(data.coverImage as string, baseDir)
      : undefined,
    coverImageAlt: optionalString(data.coverImageAlt),
    liveUrl: optionalString(data.liveUrl),
    repoUrl: optionalString(data.repoUrl),
    draft: data.draft === true,
    placeholder: data.placeholder === true,
    metrics: parseMetrics(data.metrics, filePath),
    gallery: parseGallery(data.gallery, filePath, baseDir),
    relatedArticles: Array.isArray(data.relatedArticles)
      ? data.relatedArticles.map(String)
      : [],
    relatedServices: Array.isArray(data.relatedServices) ? data.relatedServices.map(String) : [],
  };
}

function parseProject(slug: string, filePath: string): Project {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const baseDir = contentBaseDir(filePath);
  const frontmatter = normalizeFrontmatter(data, slug, filePath, baseDir);
  const stats = readingTime(content);

  return {
    slug: frontmatter.slug ?? slug,
    frontmatter,
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
    filePath: path.relative(process.cwd(), filePath).replace(/\\/g, "/"),
    baseDir,
  };
}

/** All published projects, honouring `order` then date (newest first). */
export function getAllProjects(): Project[] {
  return readEntryFiles()
    .map(({ slug, filePath }) => parseProject(slug, filePath))
    .filter((project) => !(isProduction && project.frontmatter.draft))
    .sort((a, b) => {
      const orderA = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((project) => project.slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  const projects = getAllProjects();
  const featured = projects.filter((project) => project.frontmatter.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

/** Related projects: same category first, then shared technologies. */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const technologies = new Set(project.frontmatter.technologies ?? []);

  return getAllProjects()
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const sharedTech = (candidate.frontmatter.technologies ?? []).filter((tech) =>
        technologies.has(tech),
      ).length;
      const sameCategory = candidate.frontmatter.category === project.frontmatter.category ? 2 : 0;
      return { candidate, score: sharedTech + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getProjectCategories(): string[] {
  return [...new Set(getAllProjects().map((project) => project.frontmatter.category))].sort();
}

export function assertUniqueProjectSlugs(projects: Project[]): void {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) {
      throw new ContentError(
        `Duplicate project slug "${project.slug}" — check ${project.filePath} and any "slug" frontmatter overrides.`,
      );
    }
    seen.add(project.slug);
  }
}
