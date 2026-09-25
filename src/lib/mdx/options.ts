import type { ComponentProps } from "react";
import type { Element } from "hast";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeRelativeImages } from "./rehype-relative-images";

/** Exact option type expected by `MDXRemote`, without reaching into internals. */
export type MdxOptions = NonNullable<ComponentProps<typeof MDXRemote>["options"]>;

const anchorIcon: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["heading-anchor__icon"], ariaHidden: "true" },
  children: [{ type: "text", value: "#" }],
};

/**
 * Shared MDX pipeline.
 *
 * - `remark-gfm`      tables, strikethrough, autolinks, task lists
 * - `rehype-slug`     stable heading ids (github-slugger, matching the TOC)
 * - `rehype-autolink` focusable "link to section" anchors on headings
 * - `rehype-pretty-code` syntax highlighting with light/dark themes
 * - `rehype-relative-images` rewrites ./images/x.png to /content/...
 *
 * `blockJS` stays enabled: content is data, not code, and blocking arbitrary
 * expressions keeps authored MDX safe to accept from contributors.
 */
export function getMdxOptions({ baseDir }: { baseDir: string }): MdxOptions {
  return {
    parseFrontmatter: false,
    blockJS: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              className: ["heading-anchor"],
              ariaLabel: "Link to this section",
            },
            content: anchorIcon,
          },
        ],
        [
          rehypePrettyCode,
          {
            theme: { light: "github-light", dark: "github-dark" },
            keepBackground: false,
            defaultLang: "plaintext",
          },
        ],
        [rehypeRelativeImages, { baseDir }],
      ],
    },
  };
}
