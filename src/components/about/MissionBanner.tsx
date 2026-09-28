import { Container } from "@/components/ui/Container";

export function MissionBanner() {
  return (
    <section className="bg-white py-16 sm:py-20 dark:bg-zinc-950">
      <Container size="wide">
        <div className="mx-auto max-w-6xl rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-blue-50/50 to-indigo-50/80 p-8 shadow-sm sm:p-12 lg:p-14 dark:border-blue-900/50 dark:from-blue-950/40 dark:via-blue-950/20 dark:to-indigo-950/30">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Heading & Value Points */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-blue-900 sm:text-3xl lg:text-4xl dark:text-blue-100">
                Why I Founded Convo Digital <br className="hidden sm:inline" />
                and This Guide
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                Most outbound outreach today is completely broken. Founders purchase outdated
                databases of 10,000 generic emails, blast impersonal templates, burn their primary
                company domains, and get zero replies.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                I built Convo Digital on the fundamental belief that{" "}
                <strong className="font-semibold text-zinc-900 dark:text-white">
                  outreach must be rooted in deep research, verified data, and real human relevance
                </strong>
                .
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm text-zinc-800 sm:text-base dark:text-zinc-200">
                    <strong>Verified prospect research</strong> beats mass automated blasts every
                    single time.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm text-zinc-800 sm:text-base dark:text-zinc-200">
                    <strong>Protecting domain health</strong> and inbox deliverability is completely
                    non-negotiable.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm text-zinc-800 sm:text-base dark:text-zinc-200">
                    <strong>Intelligent automation &amp; AI</strong> gives lean B2B teams
                    enterprise-grade sales leverage.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Column: Visual Graphic / Dashboard Card */}
            <div className="flex justify-center lg:col-span-5">
              <div className="w-full max-w-sm rounded-2xl border border-blue-200 bg-white p-6 shadow-xl dark:border-blue-900/60 dark:bg-zinc-900">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      Outreach Performance
                    </p>
                    <p className="mt-0.5 text-xl font-bold text-zinc-900 dark:text-white">
                      Client Campaign Stats
                    </p>
                  </div>
                  <span className="size-3 animate-ping rounded-full bg-emerald-500" />
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-zinc-600 dark:text-zinc-400">Email Deliverability</span>
                      <span className="text-blue-600 dark:text-blue-400">99.4%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-2 w-[99%] rounded-full bg-blue-600" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-zinc-600 dark:text-zinc-400">Average Open Rate</span>
                      <span className="text-emerald-600 dark:text-emerald-400">46.8%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-2 w-[47%] rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span className="text-zinc-600 dark:text-zinc-400">Positive Reply Rate</span>
                      <span className="text-indigo-600 dark:text-indigo-400">14.2%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div className="h-2 w-[14%] rounded-full bg-indigo-600" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
                  <span>Zero Bounce Guarantee</span>
                  <span className="font-bold text-emerald-600">✓ 100% Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
