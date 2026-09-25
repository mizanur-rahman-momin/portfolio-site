import type { Metadata } from "next";
import { SearchClient } from "@/components/search/SearchClient";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildSearchIndex } from "@/lib/search/index";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search articles, projects and pages across the site.",
  path: "/search",
  eyebrow: "Search",
  // Search result pages are utility pages: useful to visitors, not to crawlers.
  noIndex: true,
});

type PageProps = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const initialQuery = (rawQuery ?? "").slice(0, 120);

  // Built at request time on the server; the browser never sees the raw content.
  const records = buildSearchIndex();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Search", href: "/search" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="narrow">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Search
          </p>
          <h1 className="text-title text-fg mt-4 text-balance">Find something specific</h1>
          <p className="text-fg-muted mt-5 text-lg leading-relaxed">
            Search across every article, case study and page. Matching runs entirely in your browser
            — nothing you type is sent anywhere.
          </p>

          <div className="mt-10">
            <SearchClient records={records} initialQuery={initialQuery} />
          </div>
        </Container>
      </Section>
    </>
  );
}
