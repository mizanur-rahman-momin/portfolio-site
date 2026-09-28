import { BadgeLink } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";
import type { Taxonomy } from "@/lib/content/blog";

type TaxonomyListProps = {
  items: Taxonomy[];
  /** URL segment: "category" or "tag". */
  kind: "category" | "tag";
  className?: string;
  /** Hide entries with too few posts to be useful. */
  minCount?: number;
  tone?: "neutral" | "accent";
};

export function TaxonomyList({
  items,
  kind,
  className,
  minCount = 1,
  tone = "neutral",
}: TaxonomyListProps) {
  const visible = items.filter((item) => item.count >= minCount);
  if (visible.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((item) => (
        <li key={item.slug}>
          <BadgeLink href={`/blog/${kind}/${item.slug}`} tone={tone}>
            {item.label}
            <span className="text-2xs ml-1 rounded-full bg-blue-100/90 px-1.5 py-0.5 font-bold text-blue-700 dark:bg-blue-900/80 dark:text-blue-300">
              {item.count}
            </span>
          </BadgeLink>
        </li>
      ))}
    </ul>
  );
}
