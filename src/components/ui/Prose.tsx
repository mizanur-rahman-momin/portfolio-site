import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type ProseProps = {
  children: ReactNode;
  className?: string;
  /** Use the wider measure for content that includes media or tables. */
  wide?: boolean;
};

export function Prose({ children, className, wide = false }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-fg",
        "prose-p:leading-relaxed prose-li:leading-relaxed",
        "prose-strong:text-fg prose-strong:font-semibold",
        "prose-figcaption:text-sm prose-figcaption:text-fg-subtle",
        "prose-hr:my-12",
        wide ? "measure-wide" : "measure",
        className,
      )}
    >
      {children}
    </div>
  );
}
