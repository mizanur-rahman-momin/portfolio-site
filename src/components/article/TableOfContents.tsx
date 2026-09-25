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
 * The list is rendered from the same slugger as the heading ids, so anchors
 * always resolve. The active state uses a single IntersectionObserver and only
 * updates when the active heading actually changes.
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

  return (
    <nav aria-label={label}>
      <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">{label}</p>
      <ul className="border-border mt-4 flex flex-col gap-1 border-l">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 text-sm transition-colors",
                  item.depth === 3 ? "pl-7" : "pl-4",
                  isActive
                    ? "border-accent text-fg font-medium"
                    : "text-fg-muted hover:border-border-strong hover:text-fg border-transparent",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
