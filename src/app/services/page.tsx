import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { AboutFaq } from "@/components/about/AboutFaq";
import { services } from "@/config/content";
import { getBlogPostBySlug } from "@/lib/content/blog";
import { getProjectBySlug } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { collectionPageSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "B2B Lead Generation Services",
  description:
    "B2B research and list building, cold email, email marketing, LinkedIn lead generation, SaaS promotion, marketing automation and SaaS development.",
  keywords: [
    "B2B lead generation services",
    "cold email marketing",
    "LinkedIn lead generation",
    "list building",
    "marketing automation",
    "SaaS development",
  ],
  path: "/services",
  eyebrow: "Services",
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        className="sr-only"
      />
      <JsonLd
        data={[
          ...services.map((service) =>
            serviceSchema({
              name: service.name,
              description: service.summary,
              slug: service.slug,
            }),
          ),
          collectionPageSchema({
            name: "Services",
            description: "Lead generation, outreach, SaaS promotion and SaaS development services.",
            path: "/services",
            items: services.map((service) => ({
              name: service.name,
              href: `/services#${service.slug}`,
            })),
          }),
        ]}
      />

      {/* Services Hero Header */}
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
            B2B Outbound &amp; Sales Engines
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Lead Generation, Outreach &amp; SaaS <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Done With Clear Systems</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            I work with a small number of B2B teams at a time to build verified prospect lists,
            high-reply cold sequences, and automated outreach pipelines.
          </p>

          {/* Quick jump navigation */}
          <nav aria-label="Services on this page" className="mt-10">
            <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-700 shadow-2xs transition-colors hover:border-blue-500 hover:text-blue-600 sm:text-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:text-blue-400"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Services List */}
      <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
        {services.map((service, index) => {
          const relatedProjects = service.relatedProjects
            .map((slug) => getProjectBySlug(slug))
            .filter((project): project is NonNullable<typeof project> => Boolean(project));
          const relatedArticles = service.relatedArticles
            .map((slug) => getBlogPostBySlug(slug))
            .filter((post): post is NonNullable<typeof post> => Boolean(post));

          return (
            <Section key={service.slug} id={service.slug} spacing="default">
              <Container size="wide">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                  <div>
                    <span className="rounded-md bg-blue-50 px-3 py-1 font-mono text-xs font-bold tracking-wider text-blue-600 uppercase dark:bg-blue-950 dark:text-blue-400">
                      Service {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white">
                      {service.name}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
                      {service.summary}
                    </p>

                    <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
                      <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                        Who it is for
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed font-medium text-zinc-800 sm:text-base dark:text-zinc-200">
                        {service.forWho}
                      </p>
                    </div>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-600 uppercase dark:text-rose-400">
                          <span>⚠️</span> Problems it solves
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                          {service.problems.map((problem) => (
                            <li
                              key={problem}
                              className="flex gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                            >
                              <span className="font-bold text-rose-500">•</span>
                              <span>{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                          <span>✓</span> What you get
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                            >
                              <CheckIcon
                                className="mt-0.5 size-4 shrink-0 text-emerald-500"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar with Process & Timeline */}
                  <aside className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                      <h3 className="mb-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                        Step-by-Step Process
                      </h3>
                      <ol className="flex flex-col gap-4">
                        {service.process.map((step, stepIndex) => (
                          <li key={step.step} className="flex gap-3">
                            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                              {stepIndex + 1}
                            </span>
                            <div>
                              <span className="block text-sm font-semibold text-zinc-900 dark:text-white">
                                {step.step}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {step.detail}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                      <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                        Typical Timeline
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-300">
                        {service.timeline}
                      </p>
                    </div>

                    {(relatedProjects.length > 0 || relatedArticles.length > 0) && (
                      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                          Related Resources
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm">
                          {relatedProjects.map((project) => (
                            <li key={project.slug}>
                              <Link
                                href={`/projects/${project.slug}`}
                                className="text-xs font-medium text-blue-600 hover:underline sm:text-sm dark:text-blue-400"
                              >
                                Case Study: {project.frontmatter.title} →
                              </Link>
                            </li>
                          ))}
                          {relatedArticles.map((post) => (
                            <li key={post.slug}>
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-xs font-medium text-blue-600 hover:underline sm:text-sm dark:text-blue-400"
                              >
                                Guide: {post.frontmatter.title} →
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href="/contact"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                    >
                      Discuss {service.name}
                      <ArrowRightIcon width={16} height={16} />
                    </Link>
                  </aside>
                </div>
              </Container>
            </Section>
          );
        })}
      </div>

      {/* Social Proof Testimonials Strip */}
      <TestimonialsStrip />

      {/* FAQs on Services */}
      <AboutFaq />

      {/* Bottom Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
