"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Route-level error boundary.
 *
 * Kept intentionally plain: it must render even when the failing page did not,
 * so it avoids any data fetching or content dependencies.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in the browser console; wire this to your error
    // reporting service if you add one.
    console.error("[route error]", error);
  }, [error]);

  return (
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-start py-20 sm:py-28">
        <p className="text-danger font-mono text-xs font-medium tracking-[0.14em] uppercase">
          Something went wrong
        </p>
        <h1 className="text-title text-fg mt-4 text-balance">This page could not be displayed</h1>
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">
          The error has been logged. You can try again, or head somewhere else while it is looked
          into.
        </p>

        {error.digest ? (
          <p className="border-border bg-surface-muted text-fg-subtle mt-4 rounded-lg border px-3 py-2 font-mono text-xs">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>

        <p className="text-fg-subtle mt-8 text-sm">
          If this keeps happening,{" "}
          <Link href="/contact" className="link-underline hover:text-fg">
            let me know
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
