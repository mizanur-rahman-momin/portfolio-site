import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleEnhancer } from "@/components/article/ArticleEnhancer";
import { AuthorBox } from "@/components/article/AuthorBox";
import { PostNavigation } from "@/components/article/PostNavigation";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ShareControls } from "@/components/article/ShareControls";
import { TableOfContents } from "@/components/article/TableOfContents";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge, BadgeLink } from "@/components/ui/Badge";
import { CoverImage } from "@/components/ui/CoverImage";
import { Container } from "@/components/ui/Container";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { CalendarIcon, ClockIcon, TagIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import {
  getAdjacentPosts,
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedPosts,
} from "@/lib/content/blog";
import { getProjectBySlug } from "@/lib/content/projects";
import { MdxContent } from "@/lib/mdx/MdxContent";
import { extractToc } from "@/lib/mdx/toc";
import { absoluteUrl } from "@/config/site";
import { buildMetadata, ogImageUrl } from "@/lib/seo/metadata";
import { blogPostingSchema } from "@/lib/seo/schema";
import { formatDate, slugify } from "@/lib/utils/format";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const { frontmatter } = post;

  return buildMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/blog/${post.slug}`,
    type: "article",
    eyebrow: frontmatter.category,
    publishedTime: frontmatter.date,
    modifiedTime: frontmatter.updated ?? frontmatter.date,
    authors: [frontmatter.author ?? siteConfig.name],
    tags: frontmatter.tags,
    keywords: frontmatter.tags,
    canonicalUrl: frontmatter.canonicalUrl,
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
              type: "article",
            }),
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, readingTime } = post;
  const toc = extractToc(post.content, 2, 3);
  const related = getRelatedPosts(post, 3);
  const { previous, next } = getAdjacentPosts(post);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const relatedProjects = (frontmatter.relatedProjects ?? [])
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: frontmatter.category, href: `/blog/category/${slugify(frontmatter.category)}` },
    { name: frontmatter.title },
  ];

  return (
    <>
      <ReadingProgress />
      <JsonLd data={blogPostingSchema(post)} />

      <Section spacing="compact">
        <Container size="wide">
          <Breadcrumbs items={crumbs} className="mx-auto mb-8 max-w-3xl" />
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <BadgeLink href={`/blog/category/${slugify(frontmatter.category)}`} tone="accent">
                {frontmatter.category}
              </BadgeLink>
              {frontmatter.featured ? <Badge tone="neutral">Featured</Badge> : null}
            </div>

            <h1 className="text-title text-fg mt-5 text-balance">{frontmatter.title}</h1>

            <p className="text-fg-muted mt-5 text-lg leading-relaxed">{frontmatter.description}</p>

            <dl className="text-fg-subtle mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <div className="inline-flex items-center gap-1.5">
                <dt className="sr-only">Published</dt>
                <CalendarIcon className="size-4" aria-hidden="true" />
                <dd>
                  <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                </dd>
              </div>
              {frontmatter.updated ? (
                <div className="inline-flex items-center gap-1.5">
                  <dt>Updated</dt>
                  <dd>
                    <time dateTime={frontmatter.updated}>{formatDate(frontmatter.updated)}</time>
                  </dd>
                </div>
              ) : null}
              <div className="inline-flex items-center gap-1.5">
                <ClockIcon className="size-4" aria-hidden="true" />
                <dt className="sr-only">Reading time</dt>
                <dd>{readingTime}</dd>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <dt className="sr-only">Author</dt>
                <dd>{frontmatter.author ?? siteConfig.name}</dd>
              </div>
            </dl>
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
            sizes="(min-width: 1024px) 960px, 100vw"
            className="rounded-card border-border mx-auto max-w-4xl border"
          />
        </Container>
      ) : null}

      <Section spacing="compact">
        <Container size="wide">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div className="min-w-0">
              {frontmatter.placeholder ? <PlaceholderNotice label="This article" /> : null}

              <div id="article-content">
                <Prose wide>
                  <MdxContent source={post.content} baseDir={post.baseDir} />
                </Prose>
              </div>

              <ArticleEnhancer containerId="article-content" />

              {frontmatter.tags && frontmatter.tags.length > 0 ? (
                <div className="border-border mt-12 flex flex-wrap items-center gap-2 border-t pt-8">
                  <TagIcon className="text-fg-subtle size-4" aria-hidden="true" />
                  <span className="text-fg-subtle text-sm">Tagged</span>
                  <ul className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag) => (
                      <li key={tag}>
                        <BadgeLink href={`/blog/tag/${slugify(tag)}`}>{tag}</BadgeLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <ShareControls url={url} title={frontmatter.title} />
                <Link
                  href="/blog"
                  className="text-fg-muted hover:text-fg text-sm font-medium transition-colors"
                >
                  ← Back to all articles
                </Link>
              </div>

              <div className="mt-12">
                <AuthorBox />
              </div>

              <div className="mt-10">
                <PostNavigation previous={previous} next={next} />
              </div>
            </div>

            <aside className="order-first lg:order-none">
              <div className="lg:sticky lg:top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">Related projects</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <li key={project.slug} className="flex">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded-card border-border bg-surface hover:border-border-strong flex w-full flex-col border p-6 transition-colors"
                  >
                    <span className="text-accent-ink text-xs font-medium tracking-wide uppercase">
                      {project.frontmatter.category}
                    </span>
                    <span className="text-fg mt-2 font-semibold">{project.frontmatter.title}</span>
                    <span className="text-fg-muted mt-2 text-sm leading-relaxed">
                      {project.frontmatter.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">Related articles</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug} className="flex">
                  <PostCard post={relatedPost} variant="compact" className="w-full" />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section divided spacing="compact">
        <Container size="narrow">
          <NewsletterCTA />
        </Container>
      </Section>
    </>
  );
}
