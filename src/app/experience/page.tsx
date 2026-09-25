import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { education, experience } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description: `Roles, responsibilities and education — the professional history of ${siteConfig.name}, B2B lead generation expert and founder of Convo Digital.`,
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
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Experience", href: "/experience" },
        ]}
        className="sr-only"
      />

      <Section spacing="compact">
        <Container size="wide">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Experience
          </p>
          <h1 className="text-title text-fg mt-4 max-w-3xl text-balance">
            Roles, responsibilities and what changed
          </h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed">
            A chronological record of the work, with the outcomes that can be verified and links to
            the projects where more detail exists.
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <ol className="flex flex-col gap-12">
            {experience.map((entry, index) => {
              const relatedProjects = entry.relatedProjects
                .map((slug) => getProjectBySlug(slug))
                .filter((project): project is NonNullable<typeof project> => Boolean(project));

              return (
                <li key={`${entry.company}-${index}`}>
                  <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                    <header>
                      <p className="text-fg-subtle text-sm font-medium">{entry.period}</p>
                      <h2 className="text-fg mt-2 text-xl font-semibold tracking-tight">
                        {entry.role}
                      </h2>
                      <p className="text-fg-muted mt-1">{entry.company}</p>
                      <p className="text-fg-subtle mt-3 inline-flex items-center gap-2 text-sm">
                        <MapPinIcon className="size-4" aria-hidden="true" />
                        {entry.location}
                      </p>

                      {entry.technologies.length > 0 ? (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {entry.technologies.map((tech) => (
                            <li
                              key={tech}
                              className="border-border bg-surface text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </header>

                    <div>
                      <p className="text-fg-muted text-base leading-relaxed">{entry.summary}</p>

                      {entry.responsibilities.length > 0 ? (
                        <div className="mt-6">
                          <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                            Responsibilities
                          </h3>
                          <ul className="mt-3 flex flex-col gap-2.5">
                            {entry.responsibilities.map((item) => (
                              <li key={item} className="text-fg-muted flex gap-2.5 text-sm">
                                <span
                                  aria-hidden="true"
                                  className="bg-border-strong mt-2 size-1.5 shrink-0 rounded-full"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {entry.achievements.length > 0 ? (
                        <div className="mt-6">
                          <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                            Selected achievements
                          </h3>
                          <ul className="mt-3 flex flex-col gap-2.5">
                            {entry.achievements.map((item) => (
                              <li key={item} className="text-fg-muted flex gap-2.5 text-sm">
                                <span
                                  aria-hidden="true"
                                  className="bg-accent mt-2 size-1.5 shrink-0 rounded-full"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {relatedProjects.length > 0 ? (
                        <div className="mt-6">
                          <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                            Related projects
                          </h3>
                          <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                            {relatedProjects.map((project) => (
                              <li key={project.slug}>
                                <Link
                                  href={`/projects/${project.slug}`}
                                  className="link-underline text-fg-muted hover:text-fg"
                                >
                                  {project.frontmatter.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <h2 className="text-title text-fg text-balance">Education</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {education.map((entry) => (
              <li
                key={entry.institution}
                className="rounded-card border-border bg-surface border p-6"
              >
                <p className="text-fg-subtle text-sm font-medium">{entry.period}</p>
                <h3 className="text-fg mt-2 font-semibold tracking-tight">{entry.credential}</h3>
                <p className="text-fg-muted mt-1">{entry.institution}</p>
                {entry.location ? (
                  <p className="text-fg-subtle mt-3 inline-flex items-center gap-2 text-sm">
                    <MapPinIcon className="size-4" aria-hidden="true" />
                    {entry.location}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="narrow">
          <div className="rounded-card border-border bg-surface border p-8 text-center">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">
              Want the long version?
            </h2>
            <p className="text-fg-muted mt-3">
              I am happy to walk through the detail of any of these roles, including the parts that
              did not go to plan.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">
                Get in touch
                <ArrowRightIcon width={18} height={18} />
              </ButtonLink>
              <ButtonLink href="/about" variant="outline">
                About me
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
