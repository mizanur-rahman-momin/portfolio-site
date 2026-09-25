/**
 * Convert MDX/markdown source into rough plain text for the search index.
 * This is intentionally simple: it does not need to be perfect, only useful
 * for substring matching. Markdown syntax is stripped rather than rendered.
 */
export function stripMarkdown(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, " ")
    .replace(/^\s{0,3}>\s?/gm, " ")
    .replace(/[*_~]{1,3}/g, "")
    .replace(/^\s*[-*+]\s+/gm, " ")
    .replace(/^\s*\d+\.\s+/gm, " ")
    .replace(/^\s*\|.*\|\s*$/gm, " ")
    .replace(/^\s*[-:| ]{3,}\s*$/gm, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate text on a word boundary, appending an ellipsis when cut. */
export function truncate(value: string, maxLength: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/** Count words in a string. */
export function wordCount(value: string): number {
  const matches = value.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}
