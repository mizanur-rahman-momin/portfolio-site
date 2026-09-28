import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

const benefits = [
  "The 3-tier ICP qualification scorecard used for $85k+ pipeline deals",
  "8 high-reply cold email & follow-up templates (tested on 500k+ sends)",
  "Technical deliverability checklist (SPF, DKIM, DMARC, secondary domains)",
  "Plug-and-play n8n automation blueprint for automatic lead enrichment",
];

export function LeadMagnetSection() {
  return (
    <section className="border-t border-zinc-200/80 bg-zinc-50/70 py-20 sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading, Subtitle & Value Checklist */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
              Free Master Playbook · 42 Pages
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              The Complete B2B Outbound Playbook
            </h2>

            <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
              Stop guessing your cold email strategy. Download the complete, battle-tested framework
              we use at Convo Digital to find verified decision-makers and build repeatable sales
              pipeline.
            </p>

            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckIcon className="size-3" />
                  </span>
                  <span className="text-sm leading-relaxed font-medium text-zinc-700 dark:text-zinc-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:bg-blue-800"
              >
                Download Free Playbook
                <ArrowRightIcon width={18} height={18} />
              </Link>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Instant PDF download · No credit card required
              </span>
            </div>

            {/* Stat Counters */}
            <div className="mt-10 grid max-w-sm grid-cols-2 gap-6 border-t border-zinc-200/80 pt-6 dark:border-zinc-800">
              <div>
                <p className="text-3xl font-black text-blue-600 sm:text-4xl dark:text-blue-400">
                  10K+
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                  Active Subscribers
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-blue-600 sm:text-4xl dark:text-blue-400">
                  50K+
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                  Monthly Readers
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Book Showcase Card */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-sm">
              {/* Soft ambient back-light glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-indigo-500/20 blur-2xl filter"
              />

              <div className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-7 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90">
                <div className="group relative mb-5 aspect-[3/4] w-48 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 transition-transform duration-300 hover:scale-103 sm:w-52 dark:ring-white/10">
                  <Image
                    src="/images/b2b-outbound-playbook.jpg"
                    alt="B2B Outbound Playbook by Mizanur Rahman"
                    fill
                    sizes="(min-width: 640px) 240px, 200px"
                    className="object-cover"
                  />
                </div>

                <div className="text-center">
                  <span className="text-2xs rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    PDF Guide + Notion Blueprint
                  </span>
                  <h3 className="mt-2 text-base font-bold text-zinc-900 dark:text-white">
                    B2B Outbound Playbook (2026 Edition)
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    42 pages of battle-tested templates, verified list frameworks, and email
                    workflows.
                  </p>
                </div>

                <div className="mt-5 w-full">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
                  >
                    Grab Free Copy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
