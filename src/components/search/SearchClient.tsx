"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SearchIcon } from "@/components/ui/icons";
import { formatShortDate } from "@/lib/utils/format";
import { searchRecords } from "@/lib/search/query";
import type { SearchRecord } from "@/types/content";

type SearchClientProps = {
  records: SearchRecord[];
  initialQuery?: string;
};

const typeLabels: Record<SearchRecord["type"], string> = {
  post: "Article",
  project: "Project",
  page: "Page",
};

export function SearchClient({ records, initialQuery = "" }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim();
  const results = useMemo(() => searchRecords(records, trimmed), [records, trimmed]);

  // Keep the URL shareable without triggering a navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (trimmed) {
      url.searchParams.set("q", trimmed);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, "", url);
  }, [trimmed]);

  // "/" focuses the field, matching common search conventions.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label htmlFor="site-search" className="text-fg block text-sm font-medium">
          Search articles, projects and pages
        </label>
        <div className="relative mt-2">
          <SearchIcon className="text-fg-subtle pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “performance”, “billing” or “AI”"
            autoComplete="off"
            className="border-border bg-surface text-fg placeholder:text-fg-subtle focus:border-border-strong w-full rounded-full border py-3 pr-4 pl-10 text-sm focus:outline-none"
          />
        </div>
        <p className="text-fg-subtle mt-2 text-xs">
          Press <kbd className="border-border rounded border px-1.5 py-0.5 font-mono">/</kbd> to
          focus the field. Search runs entirely in your browser.
        </p>
      </div>

      <div aria-live="polite" className="text-fg-subtle min-h-[1.5rem] text-sm">
        {trimmed
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${trimmed}”`
          : ""}
      </div>

      {trimmed.length === 0 ? (
        <p className="rounded-card border-border text-fg-muted border border-dashed p-8 text-center text-sm">
          Start typing to search the site.
        </p>
      ) : results.length === 0 ? (
        <div className="rounded-card border-border border border-dashed p-8 text-center">
          <p className="text-fg font-medium">No matches</p>
          <p className="text-fg-muted mt-2 text-sm">
            Try a broader term, or browse the{" "}
            <Link href="/blog" className="link-underline">
              blog
            </Link>{" "}
            and{" "}
            <Link href="/projects" className="link-underline">
              projects
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="divide-border flex flex-col divide-y">
          {results.map((result) => (
            <li key={result.id}>
              <Link
                href={result.url}
                className="group hover:bg-surface-muted/60 flex flex-col gap-2 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={result.type === "project" ? "teal" : "neutral"}>
                      {typeLabels[result.type]}
                    </Badge>
                    {result.category ? (
                      <span className="text-fg-subtle text-xs">{result.category}</span>
                    ) : null}
                  </div>
                  <p className="text-fg group-hover:text-accent-ink mt-2 font-medium">
                    {result.title}
                  </p>
                  <p className="text-fg-muted mt-1 text-sm">{result.description}</p>
                </div>
                {result.date ? (
                  <time
                    dateTime={result.date}
                    className="text-fg-subtle shrink-0 text-xs whitespace-nowrap"
                  >
                    {formatShortDate(result.date)}
                  </time>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
