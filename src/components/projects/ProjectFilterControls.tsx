"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type ProjectFilterControlsProps = {
  /** Id of the element containing the filterable items. */
  containerId: string;
  categories: string[];
  /** Attribute on each item holding its category. */
  attribute?: string;
  allLabel?: string;
};

/**
 * Category filter for the projects index.
 *
 * The project cards are server-rendered; this only toggles the `hidden`
 * attribute on items that carry a `data-category` value. With JavaScript
 * disabled every project simply remains visible, so nothing is lost.
 */
export function ProjectFilterControls({
  containerId,
  categories,
  attribute = "data-category",
  allLabel = "All work",
}: ProjectFilterControlsProps) {
  const [active, setActive] = useState<string>("all");

  function apply(category: string) {
    setActive(category);

    const container = document.getElementById(containerId);
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(`[${attribute}]`);
    for (const item of items) {
      const matches = category === "all" || item.getAttribute(attribute) === category;
      item.hidden = !matches;
    }
  }

  if (categories.length < 2) return null;

  const options = ["all", ...categories];

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {options.map((option) => {
        const isActive = active === option;
        const label = option === "all" ? allLabel : option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => apply(option)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-fg text-canvas border-transparent"
                : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
