import { Container } from "@/components/ui/Container";

const pillars = [
  {
    icon: "🎯",
    title: "B2B Research & List Building",
    description:
      "Hand-verified prospect lists targeted by exact ICP, firmographic filters, tech stack, and intent signals. Every contact is 100% verified with zero bounce guarantees.",
  },
  {
    icon: "✉️",
    title: "Cold Email & LinkedIn Outreach",
    description:
      "Personalized, conversational multi-touch campaigns crafted to cut through noisy inboxes and start genuine business conversations without risking your primary domain reputation.",
  },
  {
    icon: "⚡",
    title: "Automation & Growth Systems",
    description:
      "Custom n8n workflows, CRM pipelines, automated data enrichment, and webhook integrations that eliminate manual data entry and keep your sales team focused on closing.",
  },
];

export function WhatWeDoCards() {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-16 sm:py-20 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            What We Do
          </h2>
          <p className="mt-3 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            Helping B2B teams, founders, and agencies generate qualified prospects and build
            predictable revenue systems.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-2xl dark:border-blue-800 dark:bg-blue-950/70">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
