import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { breadcrumbSchema, type Crumb } from "@/lib/seo/schema";
import { JsonLd } from "./JsonLd";

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

/**
 * Visible breadcrumb trail plus the matching `BreadcrumbList` structured data.
 * Keeping both in one component guarantees they never disagree.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-x-1.5">
                {item.href && !isLast ? (
                  <Link href={item.href} className="text-fg-muted hover:text-fg transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-fg">
                    {item.name}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRightIcon
                    className="text-fg-subtle size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
