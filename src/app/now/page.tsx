import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { now } from "@/config/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description:
    "What I am focused on at the moment — building SaaS products, running Convo Digital client work and learning.",
  path: "/now",
  eyebrow: "Now",
});

export default function NowPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Now", href: "/now" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="narrow">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Now
          </p>
          <h1 className="text-title text-fg mt-4 text-balance">What I am doing now</h1>
          <p className="text-fg-muted mt-5 text-lg leading-relaxed">{now.intro}</p>
          <p className="text-fg-subtle mt-4 text-sm">
            Last updated <time dateTime={now.updated}>{formatDate(now.updated)}</time>
          </p>

          <dl className="mt-8 flex flex-col gap-8">
            {now.items.map((item) => (
              <div key={item.title} className="border-border border-t pt-6">
                <dt className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                  {item.title}
                </dt>
                <dd className="text-fg-muted mt-3 text-base leading-relaxed">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-card border-border bg-surface mt-12 border p-6">
            <h2 className="text-fg font-semibold">Availability</h2>
            <p className="text-fg-muted mt-2 text-sm leading-relaxed">
              {siteConfig.availability}. {siteConfig.location}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="sm">
                Get in touch
              </ButtonLink>
              <ButtonLink href="/about" variant="ghost" size="sm">
                About me
              </ButtonLink>
            </div>
          </div>

          <p className="text-fg-subtle mt-8 text-xs">
            The “now page” idea comes from Derek Sivers — a snapshot of current focus rather than a
            permanent biography.
          </p>
        </Container>
      </Section>
    </>
  );
}
