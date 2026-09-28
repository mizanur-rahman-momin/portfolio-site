import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleEnhancer } from "@/components/article/ArticleEnhancer";
import { AuthorBox } from "@/components/article/AuthorBox";
import { PostNavigation } from "@/components/article/PostNavigation";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { ShareControls } from "@/components/article/ShareControls";
import { TableOfContents } from "@/components/article/TableOfContents";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { BadgeLink } from "@/components/ui/Badge";
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

export const dynamicParams = true;

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
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: frontmatter.category, href: `/blog/category/${slugify(frontmatter.category)}` },
    { name: frontmatter.title },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ReadingProgress />
      <Breadcrumbs items={crumbs} className="sr-only" />
      <JsonLd data={blogPostingSchema(post)} />

      {/* Redecorated Blog Post Hero Header */}
      <header className="relative overflow-hidden border-b border-zinc-200/80 bg-white pt-10 pb-12 sm:pt-16 sm:pb-16 dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.18),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-20"
        />

        <Container size="wide">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb Trail */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-medium sm:text-sm">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    <svg
                      className="size-3.5 sm:size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                  /
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-zinc-500 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                  /
                </li>
                <li>
                  <Link
                    href={`/blog/category/${slugify(frontmatter.category)}`}
                    className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {frontmatter.category}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeLink href={`/blog/category/${slugify(frontmatter.category)}`} tone="accent">
                {frontmatter.category}
              </BadgeLink>
              {frontmatter.featured ? (
                <span className="inline-flex items-center rounded-full border border-amber-200/90 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-800/80 dark:bg-amber-950/80 dark:text-amber-300">
                  Featured Master Guide
                </span>
              ) : null}
            </div>

            {/* Article Title */}
            <h1 className="mt-5 text-3xl leading-[1.16] font-extrabold tracking-tight text-balance text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              {frontmatter.title}
            </h1>

            {/* Excerpt / Lead */}
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-300">
              {frontmatter.description}
            </p>

            {/* Redecorated Author & Publication Meta Card */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-zinc-200/90 bg-zinc-50/70 p-4 shadow-2xs backdrop-blur-xs sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-zinc-800/90 dark:bg-zinc-900/60">
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <Image
                  src="/images/mizanur.jpg"
                  alt={frontmatter.author ?? siteConfig.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover ring-2 ring-blue-600/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">
                      {frontmatter.author ?? siteConfig.name}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full bg-blue-100 p-0.5 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                      title="Verified Author"
                    >
                      <svg className="size-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    B2B Outreach Strategist · Founder, Convo Digital
                  </p>
                </div>
              </div>

              {/* Publication stats & Quick actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-zinc-200/80 pt-3 text-xs text-zinc-500 sm:border-t-0 sm:pt-0 sm:text-sm dark:border-zinc-800/80 dark:text-zinc-400">
                <div className="inline-flex items-center gap-1.5">
                  <CalendarIcon
                    className="size-4 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                  <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                </div>

                <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                  ·
                </span>

                <div className="inline-flex items-center gap-1.5">
                  <ClockIcon
                    className="size-4 text-blue-600 dark:text-blue-400"
                    aria-hidden="true"
                  />
                  <span>{readingTime}</span>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden text-zinc-300 sm:inline dark:text-zinc-700"
                >
                  ·
                </span>

                <div>
                  <ShareControls url={url} title={frontmatter.title} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {frontmatter.coverImage ? (
        <section className="bg-white pt-8 pb-4 dark:bg-zinc-950">
          <Container size="wide">
            <CoverImage
              src={frontmatter.coverImage}
              alt={frontmatter.coverImageAlt ?? ""}
              priority
              aspect="16/9"
              sizes="(min-width: 1024px) 960px, 100vw"
              className="mx-auto max-w-4xl rounded-2xl border border-zinc-200/90 shadow-sm dark:border-zinc-800/90"
            />
          </Container>
        </section>
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
                <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80">
                  <TagIcon className="size-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                    Topics:
                  </span>
                  <ul className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag) => (
                      <li key={tag}>
                        <BadgeLink href={`/blog/tag/${slugify(tag)}`} tone="accent">
                          #{tag}
                        </BadgeLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800/60">
                <ShareControls url={url} title={frontmatter.title} />
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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

      {related.length > 0 ? (
        <section className="border-t border-zinc-200/80 bg-white py-14 dark:border-zinc-800/80 dark:bg-zinc-950">
          <Container size="wide">
            <div className="mb-8">
              <span className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                Recommended Reading
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Related outreach playbooks
              </h2>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug} className="flex">
                  <PostCard post={relatedPost} variant="default" className="w-full" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* Newsletter */}
      <NewsletterStrip />
    </div>
  );
}
