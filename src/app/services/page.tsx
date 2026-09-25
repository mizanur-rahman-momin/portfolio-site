import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { services } from "@/config/content";
import { siteConfig } from "@/config/site";
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
    <>
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

      <Section spacing="compact">
        <Container size="wide">
          <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
            Services
          </p>
          <h1 className="text-title text-fg mt-4 max-w-3xl text-balance">
            Lead generation, outreach and SaaS — done with clear systems
          </h1>
          <p className="text-fg-muted mt-5 max-w-2xl text-lg leading-relaxed">
            I work with a small number of B2B teams at a time. Each service below describes what the
            work covers, who it is for and how it runs.
          </p>

          <nav aria-label="Services on this page" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="border-border text-fg-muted hover:border-border-strong hover:text-fg inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {services.map((service, index) => {
        const relatedProjects = service.relatedProjects
          .map((slug) => getProjectBySlug(slug))
          .filter((project): project is NonNullable<typeof project> => Boolean(project));
        const relatedArticles = service.relatedArticles
          .map((slug) => getBlogPostBySlug(slug))
          .filter((post): post is NonNullable<typeof post> => Boolean(post));

        return (
          <Section key={service.slug} id={service.slug} divided spacing="compact">
            <Container size="wide">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <div>
                  <p className="text-fg-subtle font-mono text-xs font-medium tracking-[0.14em] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-title text-fg mt-3 text-balance">{service.name}</h2>
                  <p className="text-fg-muted mt-4 max-w-2xl text-lg leading-relaxed">
                    {service.summary}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                      Who it is for
                    </h3>
                    <p className="text-fg-muted mt-3 max-w-2xl text-sm leading-relaxed">
                      {service.forWho}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                        Problems it solves
                      </h3>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {service.problems.map((problem) => (
                          <li key={problem} className="text-fg-muted flex gap-2.5 text-sm">
                            <span
                              aria-hidden="true"
                              className="bg-accent mt-2 size-1.5 rounded-full"
                            />
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                        What you get
                      </h3>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="text-fg-muted flex gap-2.5 text-sm">
                            <CheckIcon
                              className="text-success mt-0.5 size-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <aside className="flex flex-col gap-8">
                  <div className="surface-card p-6">
                    <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                      Process
                    </h3>
                    <ol className="mt-4 flex flex-col gap-4">
                      {service.process.map((step, stepIndex) => (
                        <li key={step.step} className="flex gap-3">
                          <span className="bg-accent-soft text-accent-ink mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                            {stepIndex + 1}
                          </span>
                          <span>
                            <span className="text-fg block text-sm font-medium">{step.step}</span>
                            <span className="text-fg-muted mt-0.5 block text-sm">
                              {step.detail}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="surface-card p-6">
                    <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                      Typical timeline
                    </h3>
                    <p className="text-fg-muted mt-3 text-sm leading-relaxed">{service.timeline}</p>
                  </div>

                  {(relatedProjects.length > 0 || relatedArticles.length > 0) && (
                    <div className="surface-card p-6">
                      <h3 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                        Related
                      </h3>
                      <ul className="mt-4 flex flex-col gap-3 text-sm">
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
                        {relatedArticles.map((post) => (
                          <li key={post.slug}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="link-underline text-fg-muted hover:text-fg"
                            >
                              {post.frontmatter.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <ButtonLink href="/contact" className="self-start">
                    Discuss {service.name.toLowerCase()}
                    <ArrowRightIcon width={18} height={18} />
                  </ButtonLink>
                </aside>
              </div>
            </Container>
          </Section>
        );
      })}

      <Section divided spacing="compact">
        <Container size="narrow">
          <div className="surface-card p-8 text-center">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">
              Not sure which of these fits?
            </h2>
            <p className="text-fg-muted mt-3">
              Describe the problem and I will tell you what I would do first — even if the answer is
              that you do not need me.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Get in touch</ButtonLink>
              <ButtonLink href="/projects" variant="outline">
                See case studies
              </ButtonLink>
            </div>
            <p className="text-fg-subtle mt-6 text-xs">
              Or email{" "}
              <a className="link-underline" href={`mailto:${siteConfig.contactEmail}`}>
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
