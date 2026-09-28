import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ClockIcon, MapPinIcon } from "@/components/ui/icons";
import { AboutFaq } from "@/components/about/AboutFaq";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Contact Mizanur Rahman Momin",
  description: `Start a conversation about your B2B lead generation project or sales pipeline. ${siteConfig.name} replies personally to every inquiry.`,
  keywords: [
    "contact",
    "hire B2B lead generation expert",
    "cold email consultant",
    "work with Mizanur Momin",
  ],
  path: "/contact",
  eyebrow: "Contact",
});

const expectations = [
  "Personal reply within 24 to 48 hours, usually faster.",
  "Direct, honest assessment of whether your ICP is a good fit.",
  "Clear recommendations on what to prioritize first.",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        className="sr-only"
      />
      <JsonLd
        data={contactPageSchema({
          name: `Contact ${siteConfig.name}`,
          description: "Start a conversation about a project or a problem.",
          path: "/contact",
        })}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white pt-14 pb-16 sm:pt-20 sm:pb-24 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.18),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        />
        <Container size="wide" className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-600 shadow-2xs backdrop-blur-md dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
            Let&apos;s Connect &amp; Scale
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Start a Conversation with <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Mizanur Rahman</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Tell me who you want to reach and what you have tried. I will reply with an honest
            assessment and what steps I would take first.
          </p>
        </Container>
      </section>

      {/* Contact Content Grid */}
      <Section spacing="default">
        <Container size="wide">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
            {/* Left Column: Direct Info & Guarantees */}
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                <Badge tone="success" dot>
                  {siteConfig.availability}
                </Badge>

                <div className="mt-6 flex flex-col gap-4 text-sm">
                  <div>
                    <span className="block text-xs font-bold tracking-wider text-zinc-400 uppercase">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="mt-0.5 inline-block text-base font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-zinc-600 dark:text-zinc-400">
                    <MapPinIcon className="size-4 text-blue-600" aria-hidden="true" />
                    <span>{siteConfig.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <ClockIcon className="size-4 text-blue-600" aria-hidden="true" />
                    <span>Typical reply within 24–48 hours</span>
                  </div>
                </div>

                <div className="mt-8 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
                  <h3 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    What to expect
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {expectations.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="font-bold text-emerald-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
                  <h3 className="mb-3 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                    Connect on Social
                  </h3>
                  <SocialLinks />
                </div>
              </div>
            </div>

            {/* Right Column: Form Container */}
            <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-8 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
                Send a Message
              </h2>
              <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
                Fill in the details below and I&apos;ll be in touch shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials Strip */}
      <TestimonialsStrip />

      {/* FAQs */}
      <AboutFaq />

      {/* Bottom Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
