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
            <span className="text-fg-subtle">{item.count}</span>
          </BadgeLink>
        </li>
      ))}
    </ul>
  );
}
