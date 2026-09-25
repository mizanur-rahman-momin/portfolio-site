import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

type Options = {
  /** Content-relative directory of the source file, e.g. "blog/my-post". */
  baseDir: string;
};

/**
 * Rewrites relative image sources in MDX so authors can write:
 *
 *   ![Alt text](./images/diagram.png)
 *
 * Colocated images are copied into `public/content/...` by
 * `scripts/sync-content-images.mjs`, so the rewritten source becomes
 * `/content/blog/my-post/images/diagram.png`.
 *
 * Absolute, protocol-relative and data URLs are left untouched.
 */
export function rehypeRelativeImages(options: Options) {
  const base = (options?.baseDir ?? "").replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "img") return;

      const src = node.properties?.src;
      if (typeof src !== "string" || src.length === 0) return;
      if (/^(https?:)?\/\//.test(src) || src.startsWith("/") || src.startsWith("data:")) return;

      const normalized = src.replace(/^\.\//, "");
      node.properties = node.properties ?? {};
      node.properties.src = base ? `/content/${base}/${normalized}` : `/content/${normalized}`;
    });
  };
}
