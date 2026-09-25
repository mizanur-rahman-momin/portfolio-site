/**
 * Copy colocated content images into `public/content/...` so they can be served
 * statically by `next/image` without a runtime route handler.
 *
 * Authors keep images next to their MDX:
 *   content/blog/my-post/images/cover.png
 *   content/projects/my-project/images/shot-01.png
 *
 * and reference them relatively:
 *   ![Cover](./images/cover.png)
 *
 * which is served from:
 *   /content/blog/my-post/images/cover.png
 *
 * Runs automatically before `dev` and `build` (see package.json).
 */
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, "content");
const publicRoot = path.join(projectRoot, "public", "content");

function findImageDirectories(directory) {
  if (!fs.existsSync(directory)) return [];
  const results = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "images") {
        results.push(fullPath);
      } else {
        results.push(...findImageDirectories(fullPath));
      }
    }
  }
  return results;
}

function main() {
  if (!fs.existsSync(contentRoot)) {
    console.log("[sync-content-images] No content directory found, skipping.");
    return;
  }

  fs.rmSync(publicRoot, { recursive: true, force: true });

  const imageDirectories = findImageDirectories(contentRoot);
  let copied = 0;

  for (const sourceDir of imageDirectories) {
    const relative = path.relative(contentRoot, sourceDir);
    const destination = path.join(publicRoot, relative);
    fs.mkdirSync(destination, { recursive: true });
    fs.cpSync(sourceDir, destination, { recursive: true });
    copied += 1;
  }

  console.log(
    `[sync-content-images] Synced ${copied} image director${copied === 1 ? "y" : "ies"} into public/content.`,
  );
}

main();
