import { existsSync, statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutHero } from "@/components/about/AboutHero";
import { WhatWeDoCards } from "@/components/about/WhatWeDoCards";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { MissionBanner } from "@/components/about/MissionBanner";
import { WhosMizanur } from "@/components/about/WhosMizanur";
import { BrandsGrid } from "@/components/about/BrandsGrid";
import { WorkPhilosophy } from "@/components/about/WorkPhilosophy";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutFaq } from "@/components/about/AboutFaq";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { LeadMagnetSection } from "@/components/home/LeadMagnetSection";
import { NewsletterStrip } from "@/components/home/NewsletterStrip";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { profilePageSchema, organizationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: `About ${siteConfig.name} — ${siteConfig.jobTitle}`,
  description: `About ${siteConfig.name}, a B2B lead generation expert and founder of Convo Digital. Background, current focus, working principles and capabilities.`,
  keywords: ["Mizanur Rahman Momin", "B2B lead generation expert", "Convo Digital", "about"],
  path: "/about",
  eyebrow: "About",
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
const photoSrc = portraitImage ? portraitImage.src : "/images/mizanur.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        className="sr-only"
      />
      <JsonLd
        data={[
          profilePageSchema({
            name: `About ${siteConfig.name}`,
            description: siteConfig.description,
            path: "/about",
          }),
          organizationSchema(),
        ]}
      />

      {/* 1. About Hero Section with Circular Cutout & Greeting */}
      <AboutHero photoSrc={photoSrc} />

      {/* 2. What We Do (3 Value Pillar Cards) */}
      <WhatWeDoCards />

      {/* 3. Our Journey So Far (Stats + Vertical Timeline) */}
      <JourneyTimeline />

      {/* 4. Why I Founded Convo Digital (Mission & Campaign Performance) */}
      <MissionBanner />

      {/* 5. Who's Mizanur Rahman? (Outdoor Bridge Photo & In-Depth Story) */}
      <WhosMizanur photoSrc={photoSrc} />

      {/* 6. Featured on over 100+ Brands & Publications */}
      <BrandsGrid />

      {/* 7. How We Generate Results & Tools We Trust */}
      <WorkPhilosophy />

      {/* 8. Meet Our Talented Team (6 Circular Cards) */}
      <AboutTeam founderPhotoSrc={photoSrc} />

      {/* 9. Full-Width Blue Testimonials Strip */}
      <TestimonialsStrip />

      {/* 10. Lead Magnet & Book Showcase ("Get Access to my BEST Stuff") */}
      <LeadMagnetSection />

      {/* 11. Frequently Asked Questions (Accordion) */}
      <AboutFaq />

      {/* 12. Full-Width Blue Newsletter Section */}
      <NewsletterStrip />
    </div>
  );
}
