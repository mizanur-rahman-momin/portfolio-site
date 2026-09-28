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
                  <Link
                    href={item.href}
                    className="font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className="max-w-xs truncate font-semibold text-zinc-800 sm:max-w-md dark:text-zinc-200"
                  >
                    {item.name}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRightIcon
                    className="size-3.5 shrink-0 text-zinc-400 dark:text-zinc-600"
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
