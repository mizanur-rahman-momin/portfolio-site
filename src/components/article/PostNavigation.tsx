import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { BlogPost } from "@/types/content";

type PostNavigationProps = {
  previous?: BlogPost;
  next?: BlogPost;
};

/** Previous/next links within the publication order. */
export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Article navigation" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          rel="prev"
          className="group rounded-card border-border bg-surface hover:border-border-strong flex flex-col border p-5 transition-colors"
        >
          <span className="text-fg-subtle inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Newer
          </span>
          <span className="text-fg mt-2 font-medium">{previous.frontmatter.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          rel="next"
          className="group rounded-card border-border bg-surface hover:border-border-strong flex flex-col border p-5 transition-colors sm:items-end sm:text-right"
        >
          <span className="text-fg-subtle inline-flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
            Older
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="text-fg mt-2 font-medium">{next.frontmatter.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
