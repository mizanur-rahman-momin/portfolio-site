import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for this website and its content.",
  path: "/terms",
  eyebrow: "Legal",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Terms", href: "/terms" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="narrow">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Terms
          </p>
          <h1 className="text-title text-fg mt-4">Terms of use</h1>
          <p className="text-fg-subtle mt-4 text-sm">Last updated: 24 September 2026</p>

          <Prose className="mt-8">
            <p>
              This site is operated by Convo Digital LLC. These terms are a starting template, not
              legal advice — review them with a professional before relying on them.
            </p>

            <h2>Content</h2>
            <p>
              The written content, code samples and case studies on this site are provided for
              information. Code samples are illustrative and are offered without warranty of any
              kind; you are responsible for reviewing anything you adapt for your own use.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Unless stated otherwise, the text and original images on this site belong to{" "}
              {siteConfig.siteName}. You may quote or link to the content with attribution. You may
              not republish it wholesale or present it as your own.
            </p>

            <h2>No professional advice</h2>
            <p>
              Nothing here constitutes legal, financial or professional advice. Decisions you make
              based on this content are your own responsibility.
            </p>

            <h2>External links</h2>
            <p>
              Links to third-party sites are provided for convenience. Their content and practices
              are outside of my control and are not endorsed by including them.
            </p>

            <h2>Availability</h2>
            <p>
              The site is provided as-is, without any guarantee of availability. It may change or be
              taken offline at any time.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
