import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small label above the heading. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered to the right of the heading on wide screens. */
  action?: ReactNode;
  className?: string;
  /** Heading level — keeps document outline correct on every page. */
  as?: "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-accent-ink mb-4 inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase">
            <span aria-hidden="true" className="bg-accent h-px w-6" />
            {eyebrow}
          </p>
        ) : null}
        <Heading id={id} className="text-title text-fg text-balance">
          {title}
        </Heading>
        {description ? (
          <p className="text-fg-muted mt-4 text-base leading-relaxed sm:text-lg">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
