import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type Dimensions = { width: number; height: number };

const PUBLIC_ROOT = path.join(process.cwd(), "public");

/**
 * Read the intrinsic dimensions of a local image in `public/` at build time.
 *
 * `next/image` needs explicit dimensions (or `fill`) to reserve space and avoid
 * layout shift. Reading them from the file means MDX authors do not have to
 * repeat them in markdown. Remote and missing images fall back to a 16:9 box.
 */
export function getLocalImageDimensions(src: string): Dimensions | null {
  if (!src.startsWith("/")) return null;

  const filePath = path.join(PUBLIC_ROOT, decodeURIComponent(src.replace(/^\//, "")));

  // Guard against path traversal outside public/.
  if (!path.resolve(filePath).startsWith(path.resolve(PUBLIC_ROOT))) return null;

  try {
    const buffer = fs.readFileSync(filePath);
    const { width, height } = imageSize(buffer);
    if (width && height) return { width, height };
  } catch {
    // Missing or unsupported file — the caller falls back to a default box.
  }

  return null;
}
