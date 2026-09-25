import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Adds a subtle top border to separate stacked sections. */
  divided?: boolean;
  id?: string;
  /** Accessible name for the section landmark. */
  ariaLabel?: string;
  spacing?: "default" | "compact" | "tight";
};

const spacingClasses = {
  default: "py-16 sm:py-20 lg:py-24",
  compact: "py-12 sm:py-14 lg:py-16",
  tight: "py-8 sm:py-10",
} as const;

export function Section({
  children,
  className,
  divided = false,
  id,
  ariaLabel,
  spacing = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(spacingClasses[spacing], divided && "border-border border-t", className)}
    >
      {children}
    </section>
  );
}
