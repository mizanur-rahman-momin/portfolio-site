import { cn } from "@/lib/utils/cn";
import styles from "./home.module.css";

type GradientMeshProps = {
  className?: string;
};

/**
 * Decorative blurred colour blobs used behind the homepage hero and CTA.
 *
 * Pure CSS, so it stays a server component. It reads the homepage-scoped
 * `--hp-*` accents, which are provided by the `accents` wrapper on the page.
 */
export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div aria-hidden="true" className={cn(styles.mesh, "pointer-events-none -z-10", className)}>
      <span className={cn(styles.meshBlob, styles.blobCopper)} />
      <span className={cn(styles.meshBlob, styles.blobTeal)} />
      <span className={cn(styles.meshBlob, styles.blobIndigo)} />
      <span className={cn(styles.meshBlob, styles.blobGold)} />
    </div>
  );
}
