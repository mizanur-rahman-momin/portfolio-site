import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

type AboutStorySectionProps = {
  photoSrc: string;
};

export function AboutStorySection({ photoSrc }: AboutStorySectionProps) {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-20 sm:py-24 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Creator Photo */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md">
              {/* Soft decorative blur behind frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-indigo-500/20 opacity-60 blur-2xl filter"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl sm:aspect-[3/4] dark:border-zinc-800 dark:bg-zinc-950">
                <Image
                  src={photoSrc}
                  alt="Mizanur Rahman Momin — B2B Lead Generation Expert"
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[center_20%] transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Value Props */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Founder &amp; B2B Strategist
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              Hi, I&apos;m Mizanur Rahman
            </h2>

            <p className="mt-6 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
              I&apos;m a B2B lead generation specialist, researcher, and founder of Convo Digital
              LLC with over 8+ years of hands-on experience helping B2B SaaS companies, agencies,
              and tech startups turn cold prospects into qualified sales conversations.
            </p>

            <p className="mt-4 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
              Over the years, I&apos;ve built verified prospect databases, crafted high-reply cold
              outreach sequences, and developed automated workflows that save founders hundreds of
              hours every month.
            </p>

            <h3 className="mt-8 text-lg font-bold text-zinc-900 dark:text-white">
              Here&apos;s how I can help your business:
            </h3>

            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                  <strong className="font-semibold text-zinc-900 dark:text-white">
                    Build custom, verified B2B prospect lists
                  </strong>{" "}
                  targeted by exact ICP, tech stack, and buying intent signals.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                  <strong className="font-semibold text-zinc-900 dark:text-white">
                    Deploy high-converting cold email &amp; LinkedIn systems
                  </strong>{" "}
                  that start real human conversations without burning domain reputation.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                  <strong className="font-semibold text-zinc-900 dark:text-white">
                    Automate routine outreach &amp; CRM workflows
                  </strong>{" "}
                  using n8n, AI agents, and scalable webhook integrations.
                </span>
              </li>
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg sm:text-base"
              >
                Read My Full Story
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 sm:text-base dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
