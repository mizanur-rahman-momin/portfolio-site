import { CoverImage } from "@/components/ui/CoverImage";
import type { GalleryImage } from "@/types/content";

type ProjectGalleryProps = {
  images: GalleryImage[];
  title?: string;
};

/**
 * Screenshot gallery for a case study.
 *
 * Images are declared in frontmatter so dimensions can be resolved at build
 * time and space reserved before they load.
 */
export function ProjectGallery({ images, title = "Screenshots" }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="project-gallery-heading">
      <h2 id="project-gallery-heading" className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {images.map((image) => (
          <li key={image.src}>
            <figure>
              <CoverImage
                src={image.src}
                alt={image.alt}
                aspect="3/2"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="rounded-card border-border border"
              />
              {image.caption ? (
                <figcaption className="text-fg-subtle mt-2.5 text-sm">{image.caption}</figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
