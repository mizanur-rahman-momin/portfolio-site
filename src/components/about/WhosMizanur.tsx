import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type WhosMizanurProps = {
  photoSrc: string;
};

export function WhosMizanur({ photoSrc }: WhosMizanurProps) {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-20 sm:py-24 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Outdoor Photo */}
            <div className="flex justify-center lg:col-span-5">
              <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
                <Image
                  src={photoSrc}
                  alt="Mizanur Rahman Momin"
                  fill
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-103"
                />
              </div>
            </div>

            {/* Right Column: In-Depth Personal Story */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
                Background &amp; Philosophy
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
                Who&apos;s <span className="text-blue-600 dark:text-blue-400">Mizanur Rahman?</span>
              </h2>

              <p className="mt-6 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
                I graduated in Electrical and Electronics Engineering from North Bengal
                International University and Electronic Technology from Rajshahi Polytechnic
                Institute. That engineering background instilled in me a deep obsession with
                systems, precision, and repeatable processes.
              </p>

              <p className="mt-4 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
                In 2017, I stepped into the digital marketing and sales world, offering B2B market
                research, data verification, and email marketing. Over the next 7 years, I worked
                with international clients across the US, UK, Canada, and Australia as a Top Rated
                specialist on Fiverr and Upwork.
              </p>

              <p className="mt-4 text-base leading-relaxed font-normal text-zinc-700 sm:text-lg dark:text-zinc-300">
                In 2021, I founded Convo Digital LLC to formalize these methodologies into a
                full-service outbound engine. My philosophy has always stayed simple:{" "}
                <em className="font-medium text-zinc-900 dark:text-white">
                  &ldquo;A short, relevant message to the right person beats a clever message to a
                  random list.&rdquo;
                </em>
              </p>
            </div>
          </div>

          {/* Light Blue Callout Card Below */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center shadow-sm sm:flex-row sm:p-8 sm:text-left dark:border-blue-900/60 dark:bg-blue-950/50">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Want to connect or discuss your B2B outbound pipeline?
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                I regularly share practical outreach breakdowns, email sequences, and list-building
                strategies.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <a
                href="https://bd.linkedin.com/in/mizanur-rahman-momin-448a81121"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                LinkedIn Profile
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-white dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Send Email
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
