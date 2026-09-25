import fs from "node:fs";
import path from "node:path";

/** Root content directory (MDX lives outside src/ so authors can edit it freely). */
export const CONTENT_ROOT = path.join(process.cwd(), "content");
export const BLOG_ROOT = path.join(CONTENT_ROOT, "blog");
export const PROJECTS_ROOT = path.join(CONTENT_ROOT, "projects");

/** Public URL prefix that colocated content images are served from. */
export const CONTENT_IMAGE_PUBLIC_PREFIX = "/content";

/** Drafts are never included in a production build. */
export const isProduction = process.env.NODE_ENV === "production";

/** Minimum number of posts before a taxonomy page is worth indexing. */
export const MIN_TAXONOMY_POSTS = 2;

export class ContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentError";
  }
}

/** Returns a trimmed string, or undefined when absent or empty. */
export function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function assertString(
  value: unknown,
  field: string,
  filePath: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ContentError(`Missing or invalid "${field}" in frontmatter of ${filePath}`);
  }
}

/**
 * Resolve an image reference from frontmatter or MDX into a public URL.
 *
 * Colocated images are copied into `public/content/...` at build time by
 * `scripts/sync-content-images.mjs`, so a relative reference only needs its
 * content-relative base directory to become a valid public path.
 *
 * - "/images/x.png"  -> unchanged (already a public path)
 * - "https://..."    -> unchanged (remote)
 * - "./images/x.png" -> "/content/<baseDir>/images/x.png"
 *
 * @param baseDir Directory of the source file, relative to the content root
 *                (e.g. "blog/my-post" or "projects").
 */
export function resolveContentImage(reference: string, baseDir: string): string {
  const value = reference.trim();
  if (value.length === 0) return value;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  if (value.startsWith("/")) return value;

  const normalized = value.replace(/^\.\//, "");
  const base = baseDir.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  return base
    ? `${CONTENT_IMAGE_PUBLIC_PREFIX}/${base}/${normalized}`
    : `${CONTENT_IMAGE_PUBLIC_PREFIX}/${normalized}`;
}

/** Content-relative directory of a source file, using forward slashes. */
export function contentBaseDir(filePath: string): string {
  return path.relative(CONTENT_ROOT, path.dirname(filePath)).replace(/\\/g, "/");
}

const COLOCATED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Find a cover image colocated with a content file.
 *
 * Looks in `<dir>/images/` for a file named `cover.*`, falling back to the only
 * image when the folder holds exactly one. Returns the bare filename, or
 * undefined when nothing unambiguous is found.
 */
export function findColocatedCover(dir: string): string | undefined {
  const imagesDir = path.join(dir, "images");
  if (!fs.existsSync(imagesDir)) return undefined;

  const files = fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() && COLOCATED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort();

  if (files.length === 0) return undefined;
  return files.find((name) => /^cover\./i.test(name)) ?? (files.length === 1 ? files[0] : undefined);
}
