"use client";

import { useEffect, useRef } from "react";

type ReadingProgressProps = {
  /** Element whose scroll progress is tracked. Defaults to the whole document. */
  targetId?: string;
};

/**
 * Thin progress bar showing how far through an article the reader is.
 *
 * Decorative only (`aria-hidden`), updates the DOM directly instead of
 * re-rendering React, and is skipped entirely when motion is reduced.
 */
export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const target = targetId ? document.getElementById(targetId) : null;

      const start = target ? target.offsetTop : 0;
      const total = target
        ? target.offsetHeight - window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;

      if (total <= 0) {
        bar.style.transform = "scaleX(0)";
        return;
      }

      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / total));
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[3px] bg-zinc-200/20 dark:bg-zinc-800/30"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.7)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
