import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { LeadMagnetSection } from "@/components/home/LeadMagnetSection";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { education, experience } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Professional Experience & Education",
  description: `Roles, responsibilities and milestones — the career history of ${siteConfig.name}, B2B lead generation expert and founder of Convo Digital.`,
  keywords: [
    "Mizanur Rahman Momin experience",
    "B2B lead generation background",
    "Convo Digital founder",
  ],
  path: "/experience",
  eyebrow: "Experience",
});

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Experience", href: "/experience" },
        ]}
        className="sr-only"
      />

      {/* Hero Header */}
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
            Career Milestones &amp; History
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Roles, Responsibilities &amp; <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Verifiable History</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            A chronological record of work with verified outcomes, repeatable processes, and links
            to case studies where in-depth data is documented.
          </p>
        </Container>
      </section>

      {/* Experience Timeline Entries */}
      <Section spacing="default">
        <Container size="wide">
          <div className="mx-auto flex max-w-5xl flex-col gap-10">
            {experience.map((entry, index) => {
              const relatedProjects = entry.relatedProjects
                .map((slug) => getProjectBySlug(slug))
                .filter((project): project is NonNullable<typeof project> => Boolean(project));

              return (
                <div
                  key={`${entry.company}-${index}`}
                  className="rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-8 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <article className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
                    <header>
                      <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {entry.period}
                      </span>
                      <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        {entry.role}
                      </h2>
                      <p className="mt-1 text-base font-semibold text-blue-600 dark:text-blue-400">
                        {entry.company}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-500 sm:text-sm">
                        <MapPinIcon className="size-4" aria-hidden="true" />
                        {entry.location}
                      </p>

                      {entry.technologies.length > 0 && (
                        <div className="mt-5">
                          <p className="mb-2 text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
                            Technologies &amp; Tools
                          </p>
                          <ul className="flex flex-wrap gap-1.5">
                            {entry.technologies.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </header>

                    <div>
                      <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {entry.summary}
                      </p>

                      {entry.responsibilities.length > 0 && (
                        <div className="mt-6">
                          <h3 className="mb-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">
                            Key Responsibilities
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {entry.responsibilities.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                              >
                                <span className="font-bold text-blue-600 dark:text-blue-400">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {entry.achievements.length > 0 && (
                        <div className="mt-6">
                          <h3 className="mb-3 text-xs font-bold tracking-widest text-zinc-400 uppercase">
                            Notable Achievements
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {entry.achievements.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                              >
                                <span className="font-bold text-emerald-500">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {relatedProjects.length > 0 && (
                        <div className="mt-6 border-t border-zinc-200/80 pt-4 dark:border-zinc-800">
                          <p className="mb-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">
                            Related Case Studies
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {relatedProjects.map((p) => (
                              <Link
                                key={p.slug}
                                href={`/projects/${p.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline sm:text-sm dark:text-blue-400"
                              >
                                {p.frontmatter.title}
                                <ArrowRightIcon width={14} height={14} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Education Section */}
      <section className="border-t border-zinc-200/80 bg-zinc-50/70 py-16 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-900/40">
        <Container size="wide">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                Academic Background
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Education &amp; Qualifications
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {education.map((edu) => (
                <div
                  key={edu.credential}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {edu.period}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    {edu.credential}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
                      <MapPinIcon className="size-3.5" aria-hidden="true" />
                      {edu.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Lead Magnet */}
      <LeadMagnetSection />

      {/* Bottom Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
