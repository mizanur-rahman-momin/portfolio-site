import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilterControls } from "@/components/projects/ProjectFilterControls";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { collectionPageSchema } from "@/lib/seo/schema";
import { slugify } from "@/lib/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "B2B Case Studies",
  description:
    "Case studies of real B2B lead generation and SaaS work — the problem, the decisions and what happened. Where a number cannot be verified, it is left out.",
  keywords: [
    "B2B case studies",
    "lead generation case study",
    "cold email case study",
    "SaaS case study",
  ],
  path: "/projects",
  eyebrow: "Selected work",
});

export default function ProjectsIndexPage() {
  const projects = getAllProjects();
  const categories = [...new Set(projects.map((project) => project.frontmatter.category))];
  const [lead, ...rest] = projects;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Case Studies",
          description: "Case studies of real work and products in development.",
          path: "/projects",
          items: projects.map((project) => ({
            name: project.frontmatter.title,
            href: `/projects/${project.slug}`,
          })),
        })}
      />

      <Section spacing="compact">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Case Studies", href: "/projects" },
            ]}
            className="mb-7"
          />
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Selected work
          </p>
          <h1 className="text-title text-fg mt-4 max-w-3xl text-balance">
            Case studies, and the decisions behind them
          </h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed">
            Each case study covers the problem, the constraints and what actually happened. Where a
            number cannot be verified, it is left out rather than invented.
          </p>

          {categories.length > 1 ? (
            <div className="mt-8">
              <ProjectFilterControls
                containerId="project-list"
                categories={categories}
                allLabel="All work"
              />
            </div>
          ) : null}
        </Container>
      </Section>

      {projects.length === 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <p className="rounded-card border-border text-fg-muted border border-dashed p-10 text-center text-sm">
              No projects have been added yet. Create{" "}
              <code className="bg-surface-muted rounded px-1.5 py-0.5 font-mono">
                content/projects/&lt;slug&gt;.mdx
              </code>{" "}
              to publish one.
            </p>
          </Container>
        </Section>
      ) : (
        <Section divided spacing="compact">
          <Container size="wide">
            <div id="project-list" className="flex flex-col gap-6">
              {lead ? (
                <div data-category={slugify(lead.frontmatter.category)}>
                  <ProjectCard project={lead} variant="featured" priority />
                </div>
              ) : null}

              {rest.length > 0 ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((project) => (
                    <li
                      key={project.slug}
                      className="flex"
                      data-category={slugify(project.frontmatter.category)}
                    >
                      <ProjectCard project={project} className="w-full" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      <Section divided spacing="compact">
        <Container size="wide">
          <div className="surface-card p-8 sm:p-10">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">
              Looking for something similar?
            </h2>
            <p className="text-fg-muted mt-3 max-w-2xl">
              I take on a small number of projects at a time. Tell me what you are building and I
              will tell you honestly whether I am the right person for it.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Start a conversation</ButtonLink>
              <ButtonLink href="/services" variant="outline">
                See services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
