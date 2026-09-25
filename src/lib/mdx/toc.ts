import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

/**
 * Extract a table of contents from raw MDX.
 *
 * `rehype-slug` generates ids with github-slugger, so this runs the same
 * slugger over every heading (including h1, to keep the sequence identical)
 * and only collects the levels we want to show.
 */
export function extractToc(source: string, minDepth = 2, maxDepth = 3): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  let fenceChar = "";

  for (const line of source.split(/\r?\n/)) {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fence) {
      const char = fence[1][0];
      if (!inFence) {
        inFence = true;
        fenceChar = char;
      } else if (char === fenceChar) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!heading) continue;

    const depth = heading[1].length;
    const text = heading[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    // Always advance the slugger so ids stay in sync with rehype-slug.
    const id = slugger.slug(text);
    if (!text || depth < minDepth || depth > maxDepth) continue;

    items.push({ id, text, depth });
  }

  return items;
}
