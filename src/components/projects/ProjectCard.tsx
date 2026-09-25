import Link from "next/link";
import { CoverImage } from "@/components/ui/CoverImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { formatMonthYear } from "@/lib/utils/format";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  variant?: "default" | "featured";
  priority?: boolean;
  className?: string;
};

export function ProjectCard({
  project,
  variant = "default",
  priority = false,
  className,
}: ProjectCardProps) {
  const { frontmatter } = project;
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group surface-card card-interactive relative flex flex-col overflow-hidden",
        isFeatured && "lg:flex-row-reverse",
        className,
      )}
    >
      {frontmatter.coverImage ? (
        <CoverImage
          src={frontmatter.coverImage}
          alt={frontmatter.coverImageAlt ?? ""}
          priority={priority}
          zoomOnHover
          aspect={isFeatured ? "16/9" : "3/2"}
          sizes={
            isFeatured
              ? "(min-width: 1024px) 600px, 100vw"
              : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          }
          className={cn(isFeatured && "lg:w-1/2 lg:shrink-0")}
        />
      ) : null}

      <div className={cn("flex flex-1 flex-col p-6", isFeatured && "lg:justify-center lg:p-10")}>
        <div className="text-fg-subtle flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="text-accent-ink font-medium tracking-wide uppercase">
            {frontmatter.category}
          </span>
          <time dateTime={frontmatter.date}>{formatMonthYear(frontmatter.date)}</time>
        </div>

        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight text-balance",
            isFeatured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
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

        {frontmatter.technologies && frontmatter.technologies.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {frontmatter.technologies.slice(0, isFeatured ? 6 : 4).map((tech) => (
              <li
                key={tech}
                className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="text-fg mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
          Read case study
          <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </article>
  );
}
