import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons";
import { uses } from "@/config/content";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Uses",
  description: "The tools and stack behind the lead generation, automation and SaaS work.",
  keywords: ["marketing tools", "automation stack", "n8n", "Airtable", "Next.js"],
  path: "/uses",
  eyebrow: "Uses",
});

export default function UsesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Uses", href: "/uses" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="wide">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Uses
          </p>
          <h1 className="text-title text-fg mt-4 max-w-3xl text-balance">
            The tools I use to build things
          </h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed">
            A short inventory of the setup behind the work. This page is deliberately opinionated —
            it describes what I actually use, not everything I have tried.
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <div className="grid gap-12 sm:grid-cols-2">
            {uses.map((group) => (
              <section key={group.group} aria-labelledby={`uses-${group.group}`}>
                <h2
                  id={`uses-${group.group}`}
                  className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase"
                >
                  {group.group}
                </h2>
                <dl className="mt-5 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <div key={item.name} className="border-border border-b pb-4 last:border-0">
                      <dt className="text-fg font-medium">{item.name}</dt>
                      {item.note ? (
                        <dd className="text-fg-muted mt-1 text-sm">{item.note}</dd>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="narrow">
          <div className="rounded-card border-border bg-surface border p-8">
            <h2 className="text-fg text-xl font-semibold tracking-tight">How this site is built</h2>
            <p className="text-fg-muted mt-3 text-sm leading-relaxed">
              This site is a statically rendered Next.js application. Content is written in MDX and
              lives in the repository, images are optimised at build time, and the only client-side
              JavaScript is the theme toggle, the mobile menu, search and a handful of small
              enhancements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/projects" size="sm">
                See case studies
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
              <ButtonLink href="/now" variant="outline" size="sm">
                What I am doing now
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
