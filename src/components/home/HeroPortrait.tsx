"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./home.module.css";

export type HeroAsset = { src: string; alt: string } | null;

/** The portrait carries its intrinsic size so the frame matches the photo. */
export type HeroPortraitAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null;

type HeroPortraitProps = {
  portrait: HeroPortraitAsset;
  primaryCard: HeroAsset;
  secondaryCard: HeroAsset;
};

/**
 * The hero's right column: a portrait frame with two floating cards over the
 * gradient mesh.
 *
 * Pointer tilt and a subtle scroll parallax are written to CSS variables on the
 * scene element via requestAnimationFrame. Both effects are skipped entirely
 * under reduced motion; tilt is additionally skipped without a fine pointer, so
 * touch devices never get transform artifacts. Missing photos fall back to
 * abstract gradient placeholders, keeping the build green until the files exist.
 */
export function HeroPortrait({ portrait, primaryCard, secondaryCard }: HeroPortraitProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;

    const reset = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      scene.style.setProperty("--tilt-x", "0deg");
      scene.style.setProperty("--tilt-y", "0deg");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = scene.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
        const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
        scene.style.setProperty("--tilt-x", `${(offsetX * 12).toFixed(2)}deg`);
        scene.style.setProperty("--tilt-y", `${(-offsetY * 9).toFixed(2)}deg`);
      });
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", reset);
    scene.addEventListener("pointercancel", reset);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", reset);
      scene.removeEventListener("pointercancel", reset);
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = scene.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      const progress = Math.max(-1, Math.min(1, rect.top / viewport));
      scene.style.setProperty("--scroll-y", `${(progress * 10).toFixed(2)}px`);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene}>
      <div className={cn(styles.portraitFrame, !portrait && styles.portraitFramePlaceholder)}>
        {portrait ? (
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className="h-auto w-full object-contain"
          />
        ) : (
          <span aria-hidden="true" className={styles.portraitPlaceholder} />
        )}
      </div>

      <figure aria-hidden="true" className={cn(styles.floatCard, styles.floatCardA)}>
        <div className={styles.floatCardMedia}>
          {primaryCard ? (
            <Image
              src={primaryCard.src}
              alt=""
              fill
              sizes="160px"
              className={styles.portraitImage}
            />
          ) : (
            <span className={styles.cardPlaceholder} />
          )}
        </div>
      </figure>

      <figure aria-hidden="true" className={cn(styles.floatCard, styles.floatCardB)}>
        <div className={styles.floatCardMedia}>
          {secondaryCard ? (
            <Image
              src={secondaryCard.src}
              alt=""
              fill
              sizes="160px"
              className={styles.portraitImage}
            />
          ) : (
            <span className={styles.cardPlaceholder} />
          )}
        </div>
      </figure>
    </div>
  );
}
