import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "accent" | "success" | "teal" | "blue" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral:
    "border-zinc-200 bg-zinc-100/80 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300",
  accent:
    "border-blue-200/90 bg-blue-50 text-blue-700 dark:border-blue-800/70 dark:bg-blue-950/80 dark:text-blue-300",
  success:
    "border-emerald-200/90 bg-emerald-50 text-emerald-700 dark:border-emerald-800/70 dark:bg-emerald-950/80 dark:text-emerald-300",
  teal: "border-teal-200/90 bg-teal-50 text-teal-700 dark:border-teal-800/70 dark:bg-teal-950/80 dark:text-teal-300",
  blue: "border-blue-200/90 bg-blue-50 text-blue-700 dark:border-blue-800/70 dark:bg-blue-950/80 dark:text-blue-300",
  danger:
    "border-red-200/90 bg-red-50 text-red-700 dark:border-red-800/70 dark:bg-red-950/80 dark:text-red-300",
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-all",
        toneClasses[tone],
        tone === "accent" || tone === "blue"
          ? "hover:border-blue-300 hover:bg-blue-100 dark:hover:border-blue-700 dark:hover:bg-blue-900/80"
          : "hover:border-zinc-400 hover:text-zinc-900 dark:hover:border-zinc-600 dark:hover:text-zinc-100",
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </Link>
  );
}
