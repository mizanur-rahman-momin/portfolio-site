import { Container } from "@/components/ui/Container";

/**
 * Route-level loading state.
 *
 * Most pages on this site are statically generated and render instantly; this
 * exists so any dynamically rendered route still shows something branded rather
 * than a blank screen.
 */
export default function Loading() {
  return (
    <Container size="wide">
      <div className="py-20 sm:py-28" role="status" aria-live="polite">
        <span className="sr-only">Loading page</span>
        <div aria-hidden="true" className="mx-auto flex max-w-2xl flex-col gap-5">
          <div className="bg-surface-muted h-3 w-24 animate-pulse rounded-full" />
          <div className="bg-surface-muted h-10 w-3/4 animate-pulse rounded-lg" />
          <div className="bg-surface-muted h-4 w-full animate-pulse rounded" />
          <div className="bg-surface-muted h-4 w-5/6 animate-pulse rounded" />
          <div className="bg-surface-muted h-4 w-2/3 animate-pulse rounded" />
        </div>
      </div>
    </Container>
  );
}
