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
          className="group flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-sm dark:border-zinc-800/90 dark:bg-zinc-900/80 dark:hover:border-blue-500/40"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-600 uppercase transition-colors dark:text-blue-400">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Previous Article
          </span>
          <span className="mt-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 sm:text-base dark:text-white dark:group-hover:text-blue-400">
            {previous.frontmatter.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          rel="next"
          className="group flex flex-col rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-sm sm:items-end sm:text-right dark:border-zinc-800/90 dark:bg-zinc-900/80 dark:hover:border-blue-500/40"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-blue-600 uppercase transition-colors dark:text-blue-400">
            Next Article
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 sm:text-base dark:text-white dark:group-hover:text-blue-400">
            {next.frontmatter.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
