import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroRedesign } from "@/components/home/HeroRedesign";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { AboutStorySection } from "@/components/home/AboutStorySection";
import { WhatYoullLearnSection } from "@/components/home/WhatYoullLearnSection";
import { BlueprintSection } from "@/components/home/BlueprintSection";
import { TeamSection } from "@/components/home/TeamSection";
import { LeadMagnetSection } from "@/components/home/LeadMagnetSection";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.siteName} — ${siteConfig.jobTitle}`,
  description: siteConfig.description,
  path: "/",
  eyebrow: siteConfig.eyebrow,
});

const homeImagesDir = path.join(process.cwd(), "public", "images");
const homeImageExtensions = ["jpg", "webp", "avif"] as const;

type ResolvedHomeImage = {
  path: string;
  src: string;
};

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
const heroPhotoSrc = portraitImage ? portraitImage.src : "/images/mizanur.jpg";

export default function HomePage() {
  const posts = getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
    readingTime: post.readingTime,
    coverImage: post.frontmatter.coverImage,
  }));

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs items={[{ name: "Home", href: "/" }]} className="sr-only" />
      <JsonLd data={organizationSchema()} />

      {/* 1. Hero Section with Centered Avatar & Headline */}
      <HeroRedesign photoSrc={heroPhotoSrc} />

      {/* 2. Full-Width Blue Testimonials Strip */}
      <TestimonialsStrip />

      {/* 3. "Hi, I'm Mizanur Rahman" Story Section */}
      <AboutStorySection photoSrc={heroPhotoSrc} />

      {/* 4. "What You'll Learn From Mizanur's Guide?" (Card Grid) */}
      <WhatYoullLearnSection photoSrc={heroPhotoSrc} posts={posts} />

      {/* 5. "Everything You Need to Build a Scalable Pipeline" */}
      <BlueprintSection photoSrc={heroPhotoSrc} />

      {/* 6. "Meet the Minds Behind Convo Digital" (Team & Metrics) */}
      <TeamSection founderPhotoSrc={heroPhotoSrc} />

      {/* 7. Lead Magnet & Book Showcase ("Get Access to my BEST Stuff") */}
      <LeadMagnetSection />

      {/* 8. Full-Width Blue Newsletter Section */}
      <NewsletterStrip />
    </div>
  );
}
