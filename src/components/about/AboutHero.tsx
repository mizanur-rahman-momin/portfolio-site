import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";

type AboutHeroProps = {
  photoSrc: string;
};

export function AboutHero({ photoSrc }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 dark:bg-zinc-950">
      {/* Soft background ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.15),transparent_70%)]"
      />

      <Container size="wide">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7">
            <span className="text-base font-medium text-zinc-600 sm:text-lg dark:text-zinc-400">
              Hi there,
            </span>
            <h1 className="mt-2 text-4xl leading-[1.12] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              I Am <span className="text-blue-600 dark:text-blue-400">Mizanur Rahman</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
              A full-time B2B lead generation specialist, cold outreach strategist, and founder of{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                Convo Digital LLC
              </strong>
              .
            </p>

            <p className="mt-4 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
              I started Convo Digital and Mizanur&apos;s Guide to share battle-tested B2B
              prospecting playbooks, high-reply cold email frameworks, and automated outbound
              systems that turn research into real revenue.
            </p>

            {/* Quick badges & CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 sm:text-base"
              >
                Start a Conversation
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-6 py-3.5 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-100 sm:text-base dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Right Column: Founder Avatar / Cutout with circular backdrop */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative flex w-full max-w-sm items-center justify-center">
              {/* Circular light blue backdrop */}
              <div
                aria-hidden="true"
                className="absolute -z-0 size-72 rounded-full bg-blue-100/80 ring-8 ring-blue-500/10 sm:size-80 dark:bg-blue-950/60"
              />
              <div
                aria-hidden="true"
                className="absolute -z-0 size-64 rounded-full border border-blue-200 sm:size-72 dark:border-blue-900/60"
              />

              {/* Portrait Frame */}
              <div className="relative z-10 size-72 overflow-hidden rounded-full border-4 border-white bg-white shadow-2xl sm:size-80 dark:border-zinc-900 dark:bg-zinc-950">
                <Image
                  src={photoSrc}
                  alt="Mizanur Rahman Momin"
                  fill
                  sizes="(min-width: 1024px) 320px, 80vw"
                  priority
                  className="object-cover object-[center_18%] transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
