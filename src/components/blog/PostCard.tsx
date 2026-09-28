import Link from "next/link";
import { BadgeLink } from "@/components/ui/Badge";
import { CoverImage } from "@/components/ui/CoverImage";
import { ClockIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { formatDate, slugify } from "@/lib/utils/format";
import { ogImageUrl } from "@/lib/seo/metadata";
import type { BlogPost } from "@/types/content";

type PostCardProps = {
  post: BlogPost;
  /** `featured` is the large lead card; `compact` omits the image. */
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
  className?: string;
};

export function PostCard({
  post,
  variant = "default",
  priority = false,
  className,
}: PostCardProps) {
  const { frontmatter, readingTime } = post;
  const isFeatured = variant === "featured";
  const coverSrc =
    frontmatter.coverImage ||
    ogImageUrl({
      title: frontmatter.title,
      eyebrow: frontmatter.category,
      type: "article",
    });
  const showImage = variant !== "compact" && Boolean(coverSrc);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-zinc-800/90 dark:bg-zinc-900/70 dark:hover:border-blue-400/40 dark:hover:shadow-blue-500/10",
        isFeatured && "lg:flex-row lg:items-center",
        className,
      )}
    >
      {showImage && coverSrc ? (
        <CoverImage
          src={coverSrc}
          alt={frontmatter.coverImageAlt ?? frontmatter.title}
          priority={priority}
          zoomOnHover
          aspect={isFeatured ? "16/9" : "3/2"}
          sizes={
            isFeatured
              ? "(min-width: 1024px) 560px, 100vw"
              : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          }
          className={cn(isFeatured && "lg:w-1/2 lg:shrink-0")}
        />
      ) : null}

      <div className={cn("flex flex-1 flex-col p-6", isFeatured && "lg:p-8")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
          <BadgeLink href={`/blog/category/${slugify(frontmatter.category)}`} tone="accent">
            {frontmatter.category}
          </BadgeLink>
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
            ·
          </span>
          <span className="inline-flex items-center gap-1 font-medium">
            <ClockIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
            {readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 font-bold tracking-tight text-balance text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400",
            isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {frontmatter.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 flex-1 text-zinc-600 dark:text-zinc-300",
            isFeatured ? "text-base leading-relaxed" : "text-sm leading-relaxed",
          )}
        >
          {frontmatter.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
          {frontmatter.tags && frontmatter.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {frontmatter.tags.slice(0, 2).map((tag) => (
                <li key={tag}>
                  <span className="text-2xs rounded-md border border-zinc-200/80 bg-zinc-50 px-2 py-0.5 font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
                    #{tag}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-all group-hover:gap-1.5 dark:text-blue-400">
            Read article
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
