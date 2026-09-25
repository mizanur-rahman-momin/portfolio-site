"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./home.module.css";

export type TiltAccent = "copper" | "teal" | "indigo" | "rose";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Accent used by the child card's decorative styles. */
  accent?: TiltAccent;
  /** Maximum rotation in degrees at the pointer extremes. */
  maxTilt?: number;
};

/**
 * Pointer-driven tilt wrapper for cards.
 *
 * Progressive: without `(hover: hover) and (pointer: fine)`, or under
 * `prefers-reduced-motion`, no listeners are attached and the CSS tilt rule is
 * never applied — the card renders exactly as a static surface. Offsets are
 * written to CSS variables directly (no re-render) and reset on leave.
 */
export function TiltCard({ children, className, accent = "copper", maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;

    const reset = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      node.style.setProperty("--tilt-x", "0deg");
      node.style.setProperty("--tilt-y", "0deg");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--tilt-x", `${(offsetX * maxTilt * 2).toFixed(2)}deg`);
        node.style.setProperty("--tilt-y", `${(-offsetY * maxTilt * 2).toFixed(2)}deg`);
      });
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", reset);
    node.addEventListener("pointercancel", reset);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", reset);
      node.removeEventListener("pointercancel", reset);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} data-accent={accent} className={cn(styles.tiltCard, className)}>
      {children}
    </div>
  );
}
