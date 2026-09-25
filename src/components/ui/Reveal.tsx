"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  as?: ElementType;
};

/**
 * Reveals content once as it scrolls into view.
 *
 * The animation itself is CSS (`.reveal`), so it is automatically disabled by
 * `prefers-reduced-motion`. The observer disconnects after the first reveal and
 * writes a data attribute directly, avoiding a re-render.
 */
export function Reveal({ children, className, delay = 0, as: Component = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              node.dataset.visible = "true";
            }, delay);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Component ref={ref} className={cn("reveal", className)}>
      {children}
    </Component>
  );
}
