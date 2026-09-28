import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/article/TableOfContents";
import { PostCard } from "@/components/blog/PostCard";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { ExternalLinkIcon, GithubIcon } from "@/components/ui/icons";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getBlogPostBySlug } from "@/lib/content/blog";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/lib/content/projects";
import { MdxContent } from "@/lib/mdx/MdxContent";
import { extractToc } from "@/lib/mdx/toc";
import { buildMetadata, ogImageUrl } from "@/lib/seo/metadata";
import { projectSchema } from "@/lib/seo/schema";
import { formatMonthYear } from "@/lib/utils/format";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "The requested project could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  const { frontmatter } = project;

  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/projects/${project.slug}`,
    eyebrow: frontmatter.category,
    keywords: frontmatter.technologies,
    images: frontmatter.coverImage
      ? [
          {
            url: frontmatter.coverImage,
            width: 1200,
            height: 630,
            alt: frontmatter.coverImageAlt ?? frontmatter.title,
          },
        ]
      : [
          {
            url: ogImageUrl({
              title: frontmatter.title,
              eyebrow: frontmatter.category,
              description: frontmatter.description,
            }),
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { frontmatter } = project;
  const toc = extractToc(project.content, 2, 3);
  const relatedProjects = getRelatedProjects(project, 3);
  const relatedArticles = (frontmatter.relatedArticles ?? [])
    .map((articleSlug) => getBlogPostBySlug(articleSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  const position = getAllProjects().findIndex((item) => item.slug === project.slug) + 1;

  const facts: { label: string; value: string }[] = [
    ...(frontmatter.role ? [{ label: "Role", value: frontmatter.role }] : []),
    ...(frontmatter.client ? [{ label: "Client", value: frontmatter.client }] : []),
    ...(frontmatter.timeline ? [{ label: "Timeline", value: frontmatter.timeline }] : []),
    { label: "Completed", value: formatMonthYear(frontmatter.date) },
  ];

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <Section spacing="compact">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Case Studies", href: "/projects" },
              { name: frontmatter.title },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">{frontmatter.category}</Badge>
              <span className="text-fg-subtle text-sm">
                Project {position} of {getAllProjects().length}
              </span>
            </div>

            <h1 className="text-title text-fg mt-5 text-balance">{frontmatter.title}</h1>

            <p className="text-fg-muted mt-5 text-lg leading-relaxed sm:text-xl">
              {frontmatter.description}
            </p>

            {frontmatter.liveUrl || frontmatter.repoUrl ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {frontmatter.liveUrl ? (
                  <ButtonLink href={frontmatter.liveUrl} external size="sm">
                    Visit live site
                    <ExternalLinkIcon width={16} height={16} />
                  </ButtonLink>
                ) : null}
                {frontmatter.repoUrl ? (
                  <ButtonLink href={frontmatter.repoUrl} external variant="outline" size="sm">
                    <GithubIcon width={16} height={16} />
                    Source code
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {frontmatter.coverImage ? (
        <Container size="wide">
          <CoverImage
            src={frontmatter.coverImage}
            alt={frontmatter.coverImageAlt ?? ""}
            priority
            aspect="16/9"
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="rounded-card border-border mx-auto max-w-5xl border"
          />
        </Container>
      ) : null}

      <Section spacing="compact">
        <Container size="wide">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <div className="min-w-0">
              {frontmatter.placeholder ? <PlaceholderNotice label="This case study" /> : null}

              <div id="project-content">
                <Prose wide>
                  <MdxContent source={project.content} baseDir={project.baseDir} />
                </Prose>
              </div>

              <div className="mt-14 flex flex-col gap-12">
                <ProjectMetrics metrics={frontmatter.metrics} />
                <ProjectGallery images={frontmatter.gallery ?? []} />
              </div>

              {frontmatter.technologies && frontmatter.technologies.length > 0 ? (
                <section aria-labelledby="project-tech-heading" className="mt-14">
                  <h2 id="project-tech-heading" className="text-2xl font-semibold tracking-tight">
                    Technology
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {frontmatter.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border-border bg-surface text-fg-muted rounded-full border px-3 py-1 text-sm"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <div className="rounded-card border-border bg-surface mt-14 border p-6 sm:p-8">
                <h2 className="text-fg text-xl font-semibold tracking-tight">
                  Have a similar problem?
                </h2>
                <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                  I work with a small number of teams at a time. Tell me what you are building and
                  what is in the way.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" size="sm">
                    Start a conversation
                  </ButtonLink>
                  <ButtonLink href="/projects" variant="ghost" size="sm">
                    More case studies
                  </ButtonLink>
                </div>
              </div>
            </div>

            <aside className="order-first lg:order-none">
              <div className="flex flex-col gap-8 lg:sticky lg:top-24">
                <div>
                  <p className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                    Project facts
                  </p>
                  <dl className="mt-4 flex flex-col gap-3 text-sm">
                    {facts.map((fact) => (
                      <div key={fact.label} className="flex flex-col">
                        <dt className="text-fg-subtle">{fact.label}</dt>
                        <dd className="text-fg mt-0.5">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {relatedArticles.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">Related articles</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((post) => (
                <li key={post.slug} className="flex">
                  <PostCard post={post} variant="default" className="w-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">Related projects</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((related) => (
                <li key={related.slug} className="flex">
                  <Link
                    href={`/projects/${related.slug}`}
                    className="rounded-card border-border bg-surface hover:border-border-strong flex w-full flex-col border p-6 transition-colors"
                  >
                    <span className="text-accent-ink text-xs font-medium tracking-wide uppercase">
                      {related.frontmatter.category}
                    </span>
                    <span className="text-fg mt-2 font-semibold">{related.frontmatter.title}</span>
                    <span className="text-fg-muted mt-2 text-sm leading-relaxed">
                      {related.frontmatter.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section divided spacing="tight">
        <Container size="narrow">
          <p className="text-fg-subtle text-center text-sm">
            {siteConfig.name} · {siteConfig.jobTitle} ·{" "}
            <a href={absoluteUrl("/contact")} className="link-underline hover:text-fg">
              Get in touch
            </a>
          </p>
        </Container>
      </Section>
    </>
  );
}
