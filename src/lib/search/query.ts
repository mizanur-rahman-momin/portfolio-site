import type { SearchRecord } from "@/types/content";

export type SearchResult = SearchRecord & { score: number };

const FIELD_WEIGHTS = {
  title: 6,
  tags: 3,
  category: 2,
  description: 2,
  body: 1,
} as const;

function normalize(value: string): string {
  return value.toLowerCase().normalize("NFKD");
}

/**
 * Tiny, dependency-free full-text search over the build-time index.
 *
 * Every term must match somewhere (AND semantics), which keeps results precise
 * for a site of this size. Results are ranked by where the match was found and
 * then by recency.
 */
export function searchRecords(records: SearchRecord[], rawQuery: string): SearchResult[] {
  const query = normalize(rawQuery).trim();
  if (query.length === 0) return [];

  const terms = query.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const record of records) {
    const haystacks = {
      title: normalize(record.title),
      tags: normalize((record.tags ?? []).join(" ")),
      category: normalize(record.category ?? ""),
      description: normalize(record.description),
      body: normalize(record.body),
    };

    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      let termScore = 0;

      if (haystacks.title.includes(term)) termScore += FIELD_WEIGHTS.title;
      if (haystacks.tags.includes(term)) termScore += FIELD_WEIGHTS.tags;
      if (haystacks.category.includes(term)) termScore += FIELD_WEIGHTS.category;
      if (haystacks.description.includes(term)) termScore += FIELD_WEIGHTS.description;
      if (haystacks.body.includes(term)) termScore += FIELD_WEIGHTS.body;

      if (termScore === 0) {
        matchedAll = false;
        break;
      }

      score += termScore;
    }

    if (matchedAll && score > 0) {
      results.push({ ...record, score });
    }
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}
