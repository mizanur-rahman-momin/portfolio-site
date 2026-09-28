"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/icons";
import {
  B2bResearchVector,
  LinkedinVector,
  SaasGrowthVector,
  OutboundSystemsVector,
  SearchIntentVector,
  ColdEmailVector,
  ListBuildingVector,
  AutomationAiVector,
  SaasPromotionVector,
  SaasDevelopmentVector,
} from "./GuideVectors";

export type DynamicPostItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  readingTime: string;
  coverImage?: string;
};

type GuideCardItem = {
  id: string;
  category: string;
  group: "outbound" | "growth" | "automation";
  badgeBg: string;
  badgeText: string;
  title: string;
  description: string;
  href: string;
  readTime: string;
  imageSrc: string;
  vector?: React.ComponentType<{ className?: string }>;
};

function determineGroup(
  category: string,
  tags: string[] = [],
): "outbound" | "growth" | "automation" {
  const text = `${category} ${tags.join(" ")}`.toLowerCase();
  if (/automation|n8n|ai|workflow|dev|tech|supabase|software|code/i.test(text)) {
    return "automation";
  }
  if (/saas|growth|seo|search|intent|content|marketing|funnel|acquisition|channel/i.test(text)) {
    return "growth";
  }
  return "outbound";
}

function getBadgeColors(category: string, group: "outbound" | "growth" | "automation") {
  const cat = category.toLowerCase();
  if (cat.includes("linkedin"))
    return { badgeBg: "bg-sky-600/20 border-sky-400/30", badgeText: "text-sky-200" };
  if (cat.includes("research") || cat.includes("intent"))
    return { badgeBg: "bg-blue-600/20 border-blue-400/30", badgeText: "text-blue-200" };
  if (cat.includes("search") || cat.includes("seo") || cat.includes("content"))
    return { badgeBg: "bg-purple-600/20 border-purple-400/30", badgeText: "text-purple-200" };
  if (cat.includes("revenue") || cat.includes("sales") || cat.includes("system"))
    return { badgeBg: "bg-emerald-600/20 border-emerald-400/30", badgeText: "text-emerald-200" };
  if (cat.includes("cold email") || cat.includes("email"))
    return { badgeBg: "bg-rose-600/20 border-rose-400/30", badgeText: "text-rose-200" };
  if (cat.includes("list"))
    return { badgeBg: "bg-amber-600/20 border-amber-400/30", badgeText: "text-amber-200" };
  if (cat.includes("promotion") || cat.includes("ltd"))
    return { badgeBg: "bg-pink-600/20 border-pink-400/30", badgeText: "text-pink-200" };
  if (cat.includes("development") || cat.includes("dev"))
    return { badgeBg: "bg-teal-600/20 border-teal-400/30", badgeText: "text-teal-200" };
  if (group === "automation")
    return { badgeBg: "bg-cyan-600/20 border-cyan-400/30", badgeText: "text-cyan-200" };
  if (group === "growth")
    return { badgeBg: "bg-indigo-600/20 border-indigo-400/30", badgeText: "text-indigo-200" };
  return { badgeBg: "bg-blue-600/20 border-blue-400/30", badgeText: "text-blue-200" };
}

function getVector(slug: string, category: string, group: "outbound" | "growth" | "automation") {
  const s = slug.toLowerCase();
  const c = category.toLowerCase();
  if (s.includes("why-now") || c.includes("research")) return B2bResearchVector;
  if (s.includes("linkedin") || c.includes("linkedin")) return LinkedinVector;
  if (s.includes("channel") || s.includes("growth")) return SaasGrowthVector;
  if (s.includes("revenue") || s.includes("outbound") || s.includes("system"))
    return OutboundSystemsVector;
  if (s.includes("intent") || s.includes("search") || c.includes("seo") || c.includes("content"))
    return SearchIntentVector;
  if (c.includes("cold email") || c.includes("email")) return ColdEmailVector;
  if (c.includes("list")) return ListBuildingVector;
  if (group === "automation") return AutomationAiVector;
  if (group === "growth") return SaasGrowthVector;
  return B2bResearchVector;
}

const coreServiceCards: GuideCardItem[] = [
  {
    id: "cold-email",
    category: "Cold Email",
    group: "outbound",
    badgeBg: "bg-rose-600/20 border-rose-400/30",
    badgeText: "text-rose-200",
    title: "High-Reply Cold Email Sequences: Subject Lines & Follow-ups",
    description:
      "Short, punchy email templates and multi-step follow-ups optimized for 99%+ deliverability and 40%+ opens.",
    href: "/services#cold-email-marketing",
    readTime: "6 min read",
    imageSrc: "/images/services/cold-email-marketing.png",
    vector: ColdEmailVector,
  },
  {
    id: "list-building",
    category: "List Building",
    group: "outbound",
    badgeBg: "bg-amber-600/20 border-amber-400/30",
    badgeText: "text-amber-200",
    title: "Verified B2B Prospect Lists: Tools, Scoring & Zero Bounce Rates",
    description:
      "How we build 100% human-verified prospect databases using Apollo, Clay, and waterfall verification algorithms.",
    href: "/services#b2b-research-list-building",
    readTime: "5 min read",
    imageSrc: "/images/services/b2b-research-list-building.png",
    vector: ListBuildingVector,
  },
  {
    id: "automation-ai",
    category: "Automation & AI",
    group: "automation",
    badgeBg: "bg-cyan-600/20 border-cyan-400/30",
    badgeText: "text-cyan-200",
    title: "Connecting n8n, AI & CRM for Automated Lead Enrichment",
    description:
      "Build custom automated workflows that scrape prospect intel, score leads with LLMs, and push into your CRM.",
    href: "/services#marketing-automation-ai-workflows",
    readTime: "7 min read",
    imageSrc: "/images/services/marketing-automation-ai-workflows.png",
    vector: AutomationAiVector,
  },
  {
    id: "saas-promotion",
    category: "SaaS Promotion",
    group: "growth",
    badgeBg: "bg-pink-600/20 border-pink-400/30",
    badgeText: "text-pink-200",
    title: "Running High-Impact Lifetime Deals & Community Giveaways",
    description:
      "Strategies for scaling early user acquisition, AppSumo/LTD promotions, and driving viral Product Hunt launches.",
    href: "/services#saas-promotion-ltd-campaigns",
    readTime: "5 min read",
    imageSrc: "/images/services/saas-promotion-ltd-campaigns.png",
    vector: SaasPromotionVector,
  },
  {
    id: "saas-development",
    category: "SaaS Development",
    group: "automation",
    badgeBg: "bg-teal-600/20 border-teal-400/30",
    badgeText: "text-teal-200",
    title: "Modern Full-Stack SaaS: Next.js, Supabase & Product Strategy",
    description:
      "Architecture best practices for building scalable, high-performance web applications and automated micro-SaaS tools.",
    href: "/services#saas-development",
    readTime: "9 min read",
    imageSrc: "/images/services/saas-development.png",
    vector: SaasDevelopmentVector,
  },
];

type WhatYoullLearnSectionProps = {
  photoSrc: string;
  posts?: DynamicPostItem[];
};

const filterTabs = [
  { id: "all", label: "All Guides & Playbooks" },
  { id: "outbound", label: "Outbound & List Building" },
  { id: "automation", label: "AI & Automations" },
  { id: "growth", label: "SaaS Growth & Promotion" },
] as const;

export function WhatYoullLearnSection({ photoSrc, posts = [] }: WhatYoullLearnSectionProps) {
  const [activeTab, setActiveTab] = useState<"all" | "outbound" | "automation" | "growth">("all");

  // Dynamically map blog posts
  const dynamicBlogCards: GuideCardItem[] = posts.map((post) => {
    const group = determineGroup(post.category, post.tags);
    const badge = getBadgeColors(post.category, group);
    const vector = getVector(post.slug, post.category, group);

    return {
      id: post.slug,
      category: post.category,
      group,
      badgeBg: badge.badgeBg,
      badgeText: badge.badgeText,
      title: post.title,
      description: post.description,
      href: `/blog/${post.slug}`,
      readTime: post.readingTime,
      imageSrc: post.coverImage || `/content/blog/${post.slug}/images/cover.png`,
      vector,
    };
  });

  // Combine dynamic blog posts with core services
  const guideCards: GuideCardItem[] = [...dynamicBlogCards, ...coreServiceCards];

  const filteredCards =
    activeTab === "all" ? guideCards : guideCards.filter((card) => card.group === activeTab);

  return (
    <section id="what-youll-learn" className="bg-white py-20 sm:py-28 dark:bg-zinc-950">
      <Container size="wide">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-600 shadow-2xs backdrop-blur-md dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="size-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
            Curated Playbooks &amp; Architecture
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            What You&apos;ll Learn From Mizanur&apos;s Guide
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Battle-tested outbound tactics, step-by-step deliverability playbooks, and modern
            automation blueprints designed to scale your pipeline.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 sm:text-sm ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border border-zinc-200/90 bg-zinc-50/80 text-zinc-600 hover:border-blue-400 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spacious 3-Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => {
            const Vector = card.vector;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 dark:border-zinc-800/90 dark:bg-zinc-900/70 dark:hover:border-blue-400/40 dark:hover:shadow-blue-500/10"
              >
                <div>
                  {/* Top Featured Photo Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-100 bg-zinc-950 dark:border-zinc-800/80">
                    {card.imageSrc ? (
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : Vector ? (
                      <div className="size-full transition-transform duration-500 group-hover:scale-105">
                        <Vector />
                      </div>
                    ) : null}

                    {/* Floating Category Tag */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span
                        className={`text-2xs inline-flex items-center rounded-full border px-2.5 py-0.5 font-bold tracking-wide uppercase shadow-sm backdrop-blur-md ${card.badgeBg} ${card.badgeText}`}
                      >
                        {card.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg leading-snug font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {card.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Card Meta & Action Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 text-xs dark:border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <div className="relative size-6 overflow-hidden rounded-full ring-2 ring-blue-500/20">
                      <Image
                        src={photoSrc}
                        alt="Mizanur Rahman"
                        fill
                        className="object-cover object-[center_18%]"
                        sizes="24px"
                      />
                    </div>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Mizanur</span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <ClockIcon className="size-3 text-blue-600 dark:text-blue-400" />
                      {card.readTime}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-blue-600 transition-all group-hover:gap-1.5 dark:text-blue-400">
                    Explore
                    <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
