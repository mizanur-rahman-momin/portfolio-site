import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { GradientMesh } from "@/components/home/GradientMesh";
import { HeroPortrait } from "@/components/home/HeroPortrait";
import { TiltCard, type TiltAccent } from "@/components/home/TiltCard";
import styles from "@/components/home/home.module.css";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  CodeIcon,
  FolderIcon,
  LayersIcon,
  MapPinIcon,
  SparkIcon,
} from "@/components/ui/icons";
import { focusAreas, services, type FocusArea } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllProjects } from "@/lib/content/projects";
import { getLocalImageDimensions } from "@/lib/mdx/image-dimensions";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.siteName} — ${siteConfig.jobTitle}`,
  description: siteConfig.description,
  path: "/",
  eyebrow: siteConfig.eyebrow,
});

const focusIcons: Record<FocusArea["icon"], typeof LayersIcon> = {
  layers: LayersIcon,
  spark: SparkIcon,
  code: CodeIcon,
  folder: FolderIcon,
};

const focusAccents: TiltAccent[] = ["copper", "teal", "indigo", "rose"];
const serviceAccents: TiltAccent[] = ["teal", "indigo", "copper"];

const homeImagesDir = path.join(process.cwd(), "public", "images");
const homeImageExtensions = ["jpg", "webp", "avif"] as const;

type ResolvedHomeImage = {
  /** Public path without a query, for filesystem reads. */
  path: string;
  /** Public path with a cache-busting version, for `next/image`. */
  src: string;
};

/**
 * Resolves a homepage photo at build time, trying each base name in order and
 * then each supported extension. The returned `src` carries a version derived
 * from the file's mtime and size, so replacing a photo under the same name
 * invalidates Next's image-optimizer cache instead of serving the old bytes.
 * Missing files return `null`, which lets the hero render its placeholder.
 */
function resolveHomeImage(...baseNames: string[]): ResolvedHomeImage | null {
  for (const baseName of baseNames) {
    for (const extension of homeImageExtensions) {
      const fileName = `${baseName}.${extension}`;
      const filePath = path.join(homeImagesDir, fileName);
      if (!existsSync(filePath)) continue;

      const publicPath = `/images/${fileName}`;
      try {
        const { mtimeMs, size } = statSync(filePath);
        const version = `${Math.round(mtimeMs).toString(36)}${size.toString(36)}`;
        return { path: publicPath, src: `${publicPath}?v=${version}` };
      } catch {
        return { path: publicPath, src: publicPath };
      }
    }
  }
  return null;
}

const portraitImage = resolveHomeImage("mizanur", "portrait");
const portraitSize = portraitImage ? getLocalImageDimensions(portraitImage.path) : null;
const primaryWorkImage = resolveHomeImage("work-1");
const secondaryWorkImage = resolveHomeImage("work-2");
const closingWorkImage = resolveHomeImage("work-3");

export default function HomePage() {
  const allPosts = getAllBlogPosts();
  const posts = allPosts.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const projectCount = getAllProjects().length;
  const articleCount = allPosts.length;

  return (
    <div className={styles.accents}>
      <Breadcrumbs items={[{ name: "Home", href: "/" }]} className="sr-only" />
      <JsonLd data={organizationSchema()} />

      {/* Hero ---------------------------------------------------------- */}
      <Section spacing="default" className="relative overflow-hidden">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
        <GradientMesh />
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-16">
            <div>
              <p className="text-accent-ink inline-flex items-center gap-2.5 font-mono text-[0.7rem] font-medium tracking-[0.16em] uppercase">
                <span aria-hidden="true" className="bg-accent h-px w-6" />
                {siteConfig.eyebrow}
              </p>

              <h1 className="text-display text-fg mt-6 text-balance">{siteConfig.positioning}</h1>

              <p className="text-fg-muted mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
                {siteConfig.heroSupport}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/projects" size="lg">
                  See case studies
                  <ArrowRightIcon width={18} height={18} />
                </ButtonLink>
                <ButtonLink href="/blog" variant="outline" size="lg">
                  Read the blog
                </ButtonLink>
              </div>

              <dl className="border-border mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:max-w-md">
                <div>
                  <dt className="text-fg-subtle text-xs font-medium tracking-wide uppercase">
                    Case studies
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href="/projects"
                      className="text-fg hover:text-accent-ink text-2xl font-semibold tracking-tight transition-colors"
                    >
                      {projectCount}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-fg-subtle text-xs font-medium tracking-wide uppercase">
                    Articles
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href="/blog"
                      className="text-fg hover:text-accent-ink text-2xl font-semibold tracking-tight transition-colors"
                    >
                      {articleCount}
                    </Link>
                  </dd>
                </div>
              </dl>

              <div className="text-fg-subtle mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <MapPinIcon className="size-4" aria-hidden="true" />
                  {siteConfig.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="bg-success size-2 rounded-full" />
                  {siteConfig.availability}
                </span>
              </div>

              <SocialLinks className="border-border mt-6 border-t pt-6" includeRss />
            </div>

            <HeroPortrait
              portrait={
                portraitImage && portraitSize
                  ? { src: portraitImage.src, alt: siteConfig.name, ...portraitSize }
                  : null
              }
              primaryCard={primaryWorkImage ? { src: primaryWorkImage.src, alt: "" } : null}
              secondaryCard={secondaryWorkImage ? { src: secondaryWorkImage.src, alt: "" } : null}
            />
          </div>
        </Container>
      </Section>

      {/* Focus areas --------------------------------------------------- */}
      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="What I work on"
            title="B2B growth, done with systems"
            description="The work falls into four areas. Each one is described in more detail on the services page."
            action={
              <ButtonLink href="/services" variant="ghost" size="sm">
                All services
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            }
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area, index) => {
              const Icon = focusIcons[area.icon];
              return (
                <Reveal as="li" key={area.title} delay={index * 60} className="h-full">
                  <TiltCard
                    accent={focusAccents[index % focusAccents.length]}
                    className={cn("surface-card flex h-full flex-col p-6", styles.focusCard)}
                  >
                    <Icon className={cn("size-5", styles.focusIcon)} aria-hidden="true" />
                    <h3 className="text-fg mt-4 font-semibold tracking-tight">{area.title}</h3>
                    <p className="text-fg-muted mt-2 text-sm leading-relaxed">{area.description}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Services preview ---------------------------------------------- */}
      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Services"
            title="How I can help"
            description="Clear scope, defined deliverables and a process that keeps you informed."
            action={
              <ButtonLink href="/services" variant="ghost" size="sm">
                Service details
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            }
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 80} className="flex">
                <div
                  data-accent={serviceAccents[index % serviceAccents.length]}
                  className={cn("surface-card flex w-full flex-col p-6", styles.serviceCard)}
                >
                  <h3 className="text-fg font-semibold tracking-tight">{service.name}</h3>
                  <p className="text-fg-muted mt-2 flex-1 text-sm leading-relaxed">
                    {service.summary}
                  </p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-accent-ink mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    Read more
                    <ArrowRightIcon width={15} height={15} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Latest writing ------------------------------------------------ */}
      {posts.length > 0 ? (
        <Section divided spacing="compact">
          <Container size="wide">
            <SectionHeading
              eyebrow="Writing"
              title="Latest articles"
              description="Practical notes on lead generation, LinkedIn prospecting, SaaS growth and automation."
              action={
                <ButtonLink href="/blog" variant="ghost" size="sm">
                  All articles
                  <ArrowRightIcon width={16} height={16} />
                </ButtonLink>
              }
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal as="li" key={post.slug} delay={index * 80} className="flex">
                  <PostCard post={post} className="w-full" />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Closing CTA --------------------------------------------------- */}
      <Section divided spacing="compact">
        <Container size="wide">
          <div className={cn(styles.ctaPanel, "p-8 sm:p-12")}>
            <GradientMesh className="z-0 opacity-70" />
            {closingWorkImage ? (
              <div aria-hidden="true" className={styles.ctaBand}>
                <Image
                  src={closingWorkImage.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="relative max-w-2xl">
              <Badge tone="accent" dot>
                {siteConfig.availability}
              </Badge>
              <h2 className="text-title text-fg mt-5 text-balance">
                Need more qualified prospects, or a system to reach them?
              </h2>
              <p className="text-fg-muted mt-4 text-base leading-relaxed sm:text-lg">
                Tell me who you want to reach and what you have tried. I will reply with whether I
                can help and what I would do first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Start a conversation
                  <ArrowRightIcon width={18} height={18} />
                </ButtonLink>
                <ButtonLink href="/about" variant="outline" size="lg">
                  More about me
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
