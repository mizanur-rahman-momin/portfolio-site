import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "success" | "teal" | "blue" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-muted text-fg-muted",
  accent: "border-transparent bg-accent-soft text-accent-ink",
  success: "border-transparent bg-success/12 text-success",
  teal: "border-transparent bg-teal/12 text-teal",
  blue: "border-transparent bg-blue/12 text-blue",
  danger: "border-transparent bg-danger/12 text-danger",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  /** Renders a small status dot before the label. */
  dot?: boolean;
};

export function Badge({ children, tone = "neutral", className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

type BadgeLinkProps = BadgeProps & { href: string };

export function BadgeLink({ href, children, tone = "neutral", className, dot }: BadgeLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:border-border-strong hover:text-fg inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        toneClasses[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </Link>
  );
}
