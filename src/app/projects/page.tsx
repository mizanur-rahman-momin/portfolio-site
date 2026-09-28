import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilterControls } from "@/components/projects/ProjectFilterControls";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { LeadMagnetSection } from "@/components/home/LeadMagnetSection";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { getAllProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { collectionPageSchema } from "@/lib/seo/schema";
import { slugify } from "@/lib/utils/format";

export const metadata: Metadata = buildMetadata({
  title: "B2B Case Studies & Client Results",
  description:
    "Real-world case studies in B2B lead generation, cold email systems, and SaaS development — the challenge, our approach, and measurable outcomes.",
  keywords: [
    "B2B case studies",
    "lead generation case study",
    "cold email case study",
    "SaaS case study",
  ],
  path: "/projects",
  eyebrow: "Selected Work",
});

export default function ProjectsIndexPage() {
  const projects = getAllProjects();
  const categories = [...new Set(projects.map((project) => project.frontmatter.category))];
  const [lead, ...rest] = projects;

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Case Studies", href: "/projects" },
        ]}
        className="sr-only"
      />
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
            Verified Case Studies &amp; Outcomes
          </div>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Case Studies, Decisions &amp; <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Measurable Outcomes</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            Detailed breakdowns of B2B campaigns, verified list building, and outbound revenue
            systems. Where a number cannot be verified, it is left out.
          </p>

          {categories.length > 1 && (
            <div className="mt-10 flex justify-center">
              <ProjectFilterControls
                containerId="project-list"
                categories={categories}
                allLabel="All Case Studies"
              />
            </div>
          )}
        </Container>
      </section>

      {/* Projects List */}
      <Section spacing="default">
        <Container size="wide">
          {projects.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center text-sm text-zinc-500 dark:border-zinc-700">
              No case studies published yet.
            </p>
          ) : (
            <div id="project-list" className="flex flex-col gap-8">
              {lead && (
                <div data-category={slugify(lead.frontmatter.category)}>
                  <ProjectCard project={lead} variant="featured" priority />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2">
                  {rest.map((project) => (
                    <div key={project.slug} data-category={slugify(project.frontmatter.category)}>
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {/* Testimonials Strip */}
      <TestimonialsStrip />

      {/* Free Lead Magnet */}
      <LeadMagnetSection />

      {/* Bottom Newsletter Strip */}
      <NewsletterStrip />
    </div>
  );
}
