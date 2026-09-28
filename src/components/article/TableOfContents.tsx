"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/mdx/toc";

type TableOfContentsProps = {
  items: TocItem[];
  /** Accessible label for the navigation landmark. */
  label?: string;
};

/**
 * Table of contents with active-section tracking.
 *
 * Renders as a collapsible disclosure on small screens and a persistent,
 * sticky sidebar with active-heading indicator on large screens.
 */
export function TableOfContents({ items, label = "On this page" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: [0, 1] },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const contentList = (
    <ul className="flex flex-col gap-1 border-l border-zinc-200 dark:border-zinc-800">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-2 text-xs transition-all duration-200 sm:text-sm",
                item.depth === 3 ? "text-2xs pl-6 sm:text-xs" : "pl-3.5",
                isActive
                  ? "rounded-r-lg border-blue-600 bg-blue-50/80 font-semibold text-blue-700 shadow-2xs dark:border-blue-400 dark:bg-blue-950/60 dark:text-blue-300"
                  : "border-transparent text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200",
              )}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <details className="mb-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 shadow-2xs lg:hidden dark:border-zinc-800/80 dark:bg-zinc-900/60">
        <summary className="flex cursor-pointer items-center justify-between text-xs font-bold tracking-wider text-zinc-800 uppercase dark:text-zinc-200">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            {label} ({items.length} sections)
          </span>
          <span className="text-zinc-400">▾</span>
        </summary>
        <div className="mt-4 border-t border-zinc-200/70 pt-3 dark:border-zinc-800/70">
          {contentList}
        </div>
      </details>

      {/* Desktop Sticky TOC */}
      <nav
        aria-label={label}
        className="hidden rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-5 shadow-2xs backdrop-blur-md lg:block dark:border-zinc-800/80 dark:bg-zinc-900/50"
      >
        <div className="flex items-center justify-between border-b border-zinc-200/70 pb-3 dark:border-zinc-800/70">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
            <p className="text-xs font-bold tracking-wider text-zinc-800 uppercase dark:text-zinc-200">
              {label}
            </p>
          </div>
          <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            {items.length} sections
          </span>
        </div>

        <div className="mt-3.5">{contentList}</div>

        <div className="mt-4 border-t border-zinc-200/70 pt-3 dark:border-zinc-800/70">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Scroll to top
          </button>
        </div>
      </nav>
    </>
  );
}
