import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SearchIcon } from "@/components/ui/icons";
import { primaryNav } from "@/config/navigation";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Container size="wide">
      <div className="mx-auto flex max-w-2xl flex-col items-start py-20 sm:py-28">
        <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
          404 — Not found
        </p>
        <h1 className="text-title text-fg mt-4 text-balance">
          That page does not exist, or it has moved
        </h1>
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">
          The link may be out of date, or the address may have a typo. Everything worth reading is
          one of the places below.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/search" variant="outline">
            <SearchIcon width={17} height={17} />
            Search the site
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="border-border mt-12 w-full border-t pt-8">
          <h2 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
            Popular destinations
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group hover:bg-surface-muted flex flex-col rounded-lg px-3 py-2 transition-colors"
                >
                  <span className="text-fg group-hover:text-accent-ink font-medium">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="text-fg-subtle text-sm">{item.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}
