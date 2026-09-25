import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type CoverImageProps = {
  src: string;
  alt: string;
  /** Only the single above-the-fold image on a page should be prioritised. */
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Aspect ratio of the frame. Defaults to 16:9. */
  aspect?: "16/9" | "3/2" | "4/3" | "1/1";
  /** Gently scales the image when an ancestor with the `group` class is hovered. */
  zoomOnHover?: boolean;
};

const aspectClasses = {
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
} as const;

/**
 * Cover image with a reserved aspect ratio.
 *
 * Reserving space up front means the image never shifts the layout as it loads,
 * which is the single most common cause of a poor CLS score.
 */
export function CoverImage({
  src,
  alt,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 640px, 100vw",
  aspect = "16/9",
  zoomOnHover = false,
}: CoverImageProps) {
  return (
    <div
      className={cn("bg-surface-muted relative overflow-hidden", aspectClasses[aspect], className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover",
          zoomOnHover && "transition-transform duration-500 ease-out group-hover:scale-[1.04]",
        )}
      />
    </div>
  );
}
