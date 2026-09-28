import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

type HeroRedesignProps = {
  photoSrc: string;
};

export function HeroRedesign({ photoSrc }: HeroRedesignProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-20 sm:pb-24 dark:bg-zinc-950">
      {/* Background subtle radial gradient & blueprint texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.1),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.18),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-20"
      />

      <Container size="wide" className="text-center">
        {/* Availability Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs backdrop-blur-md dark:border-blue-500/30 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            Available for Q3/Q4 Projects · 8+ Years B2B Outbound
          </div>
        </div>

        {/* Centered Avatar Badge with Blue Outer Ring */}
        <div className="mb-6 flex justify-center">
          <div className="group relative">
            <div className="relative size-24 overflow-hidden rounded-full bg-blue-600 p-1 shadow-xl ring-4 ring-blue-500/25 ring-offset-4 ring-offset-white sm:size-28 dark:ring-offset-zinc-950">
              <Image
                src={photoSrc}
                alt="Mizanur Rahman Momin"
                width={120}
                height={120}
                priority
                className="size-full rounded-full object-cover object-[center_18%] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Online badge */}
            <span
              className="absolute right-1 bottom-1 size-4 rounded-full border-2 border-white bg-emerald-500 shadow-sm dark:border-zinc-950"
              title="Available for new projects"
            />
          </div>
        </div>

        {/* Main Display Headline */}
        <h1 className="mx-auto max-w-4xl text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          Build a High-Converting Pipeline <br className="hidden sm:inline" />
          with <span className="text-blue-600 dark:text-blue-400">Mizanur Rahman</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed font-normal text-zinc-600 sm:text-xl dark:text-zinc-400">
          I help B2B SaaS teams, founders, and agencies find qualified prospects, scale cold
          outreach, and build repeatable revenue systems.
        </p>

        {/* Primary CTA + Link */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex transform items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0 active:bg-blue-800"
          >
            Start Your Pipeline
            <ArrowRightIcon width={18} height={18} />
          </Link>
          <Link
            href="#what-youll-learn"
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100/80 hover:text-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-blue-400"
          >
            Explore Free Guides &amp; Playbooks ↓
          </Link>
        </div>

        {/* As Seen On / Featured In Logos */}
        <div className="mx-auto mt-14 max-w-4xl border-t border-zinc-200/80 pt-8 dark:border-zinc-800/80">
          <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-zinc-600 uppercase dark:text-zinc-400">
            TRUSTED BY HIGH-GROWTH B2B TEAMS & FEATURED ON
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-75 grayscale transition-all duration-300 hover:grayscale-0 sm:gap-12">
            {/* Forbes */}
            <span className="font-serif text-xl font-black tracking-tight text-zinc-800 sm:text-2xl dark:text-zinc-200">
              Forbes
            </span>
            {/* HubSpot */}
            <span className="flex items-center gap-1.5 font-sans text-lg font-bold tracking-tight text-zinc-800 sm:text-xl dark:text-zinc-200">
              <span className="inline-block size-3 rounded-full bg-orange-500" />
              HubSpot
            </span>
            {/* Product Hunt */}
            <span className="flex items-center gap-1 font-sans text-base font-semibold text-zinc-800 sm:text-lg dark:text-zinc-200">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                P
              </span>
              Product Hunt
            </span>
            {/* Upwork */}
            <span className="font-sans text-lg font-bold text-zinc-800 sm:text-xl dark:text-zinc-200">
              Upwork <span className="text-xs font-normal text-emerald-600">Top Rated</span>
            </span>
            {/* Fiverr */}
            <span className="font-sans text-lg font-bold text-zinc-800 sm:text-xl dark:text-zinc-200">
              fiverr<span className="font-extrabold text-emerald-500">.</span>
            </span>
            {/* G2 */}
            <span className="font-sans text-lg font-black text-zinc-800 sm:text-xl dark:text-zinc-200">
              G<span className="text-red-500">2</span>
            </span>
            {/* Moz */}
            <span className="font-sans text-lg font-black tracking-wider text-zinc-800 sm:text-xl dark:text-zinc-200">
              MOZ
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
