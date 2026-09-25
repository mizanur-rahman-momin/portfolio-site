import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How this site handles personal data, cookies and analytics.",
  path: "/privacy",
  eyebrow: "Legal",
});

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="narrow">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Privacy
          </p>
          <h1 className="text-title text-fg mt-4">Privacy policy</h1>
          <p className="text-fg-subtle mt-4 text-sm">Last updated: 24 September 2026</p>

          <Prose className="mt-8">
            <p>
              This site is operated by Convo Digital LLC. This policy is a starting template, not
              legal advice — review it with a professional before relying on it.
            </p>

            <h2>Who is responsible</h2>
            <p>
              Convo Digital LLC is the data controller for this site. Questions about this policy
              can be sent to{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>

            <h2>What this site collects</h2>
            <p>
              Out of the box, this site has no analytics, no advertising and no third-party tracking
              scripts. Nothing you do on the site is profiled or sold.
            </p>

            <h2>Contact form</h2>
            <p>
              If you use the contact form, the information you submit (name, email address, project
              details and message) is sent to the delivery endpoint configured for this deployment
              so that it can be answered. It is not stored by this site itself. Do not include
              sensitive information in the message field.
            </p>

            <h2>Cookies and local storage</h2>
            <p>
              This site sets no cookies. It stores a single value in your browser’s local storage to
              remember your colour-theme preference. That value never leaves your device and can be
              cleared at any time through your browser settings.
            </p>

            <h2>Server logs</h2>
            <p>
              The hosting provider may record standard server logs (such as IP address, user agent
              and requested URL) for security and operational purposes. Retention is controlled by
              that provider.
            </p>

            <h2>Third parties</h2>
            <p>
              If analytics or a newsletter provider are enabled in future, they will be listed here
              along with what they collect and how to opt out. Until then, no third-party service
              receives your data from this site.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask what personal data is held about you, request a copy, or ask for it to be
              deleted. Contact{" "}
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            </p>

            <h2>Changes</h2>
            <p>
              Material changes to this policy will be reflected in the date at the top of this page.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
