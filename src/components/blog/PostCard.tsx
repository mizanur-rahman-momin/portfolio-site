import Link from "next/link";
import { BadgeLink } from "@/components/ui/Badge";
import { CoverImage } from "@/components/ui/CoverImage";
import { ClockIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { formatDate, slugify } from "@/lib/utils/format";
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
  const showImage = variant !== "compact" && Boolean(frontmatter.coverImage);

  return (
    <article
      className={cn(
        "group surface-card card-interactive relative flex flex-col overflow-hidden",
        isFeatured && "lg:flex-row",
        className,
      )}
    >
      {showImage && frontmatter.coverImage ? (
        <CoverImage
          src={frontmatter.coverImage}
          alt={frontmatter.coverImageAlt ?? ""}
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
        <div className="text-fg-subtle flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <BadgeLink href={`/blog/category/${slugify(frontmatter.category)}`} tone="accent">
            {frontmatter.category}
          </BadgeLink>
          <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          <span aria-hidden="true" className="text-border-strong">
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-3.5" />
            {readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-balance",
            isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {frontmatter.title}
          </Link>
        </h3>

        <p
          className={cn(
            "text-fg-muted mt-3 flex-1",
            isFeatured ? "text-base leading-relaxed" : "text-sm leading-relaxed",
          )}
        >
          {frontmatter.description}
        </p>

        {frontmatter.tags && frontmatter.tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <span className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
