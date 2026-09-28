import { Container } from "@/components/ui/Container";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  avatarColor: string;
  metric?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The list accuracy and verified work emails gave us a 42% open rate and 14 booked calls in the very first month. Mizanur's research saved us weeks of manual SDR work.",
    author: "David Kaufman",
    role: "Founder & CEO",
    company: "CloudMetric SaaS",
    initials: "DK",
    avatarColor: "bg-blue-600",
    metric: "42% Open Rate · 14 Booked Calls",
  },
  {
    quote:
      "Mizanur transformed our outbound strategy. Instead of spamming generic templates, his personalized conversational approach drove $85k in new pipeline within 60 days.",
    author: "Marcus Vance",
    role: "VP of Sales",
    company: "RevScale Global",
    initials: "MV",
    avatarColor: "bg-emerald-600",
    metric: "$85k Pipeline in 60 Days",
  },
  {
    quote:
      "Top-tier B2B researcher. The 'Why-Now' buying signals he uncovered for our target accounts gave our AE team the exact talking points they needed to close deals.",
    author: "Sarah Jenkins",
    role: "Head of Growth",
    company: "SaaSFlow Technologies",
    initials: "SJ",
    avatarColor: "bg-purple-600",
    metric: "Targeted Account Intel",
  },
  {
    quote:
      "Our cold email deliverability was in the trash before Mizanur stepped in. He rebuilt our secondary domains and inbox warmups from scratch. Positive replies tripled.",
    author: "Alex Rivera",
    role: "Co-Founder",
    company: "SyncLab Software",
    initials: "AR",
    avatarColor: "bg-amber-600",
    metric: "3x Positive Replies",
  },
  {
    quote:
      "Mizanur's n8n automations completely streamlined our inbound lead capture and CRM enrichment. Highly reliable, fast, and remarkably thorough.",
    author: "Tariqul Islam",
    role: "Lead Architect",
    company: "DataSprint Labs",
    initials: "TI",
    avatarColor: "bg-indigo-600",
    metric: "Zero Manual Data Entry",
  },
];

export function TestimonialsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-blue-900/40 bg-gradient-to-b from-[#0b1329] via-[#0d1b3e] to-[#090e1e] py-20 text-white sm:py-28 dark:border-zinc-800/80 dark:from-zinc-950 dark:via-blue-950/30 dark:to-zinc-950">
      {/* Decorative ambient radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header with Verified Rating Badge */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-blue-300 uppercase backdrop-blur-md">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Verified Client Results · 4.9/5 Rating
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trusted by Founders &amp; Sales Leaders
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Real feedback from B2B SaaS founders, sales executives, and agencies who scaled their
            pipeline with Mizanur&apos;s verified lists, campaigns, and systems.
          </p>
        </div>

        {/* Testimonials Grid: 3 in first row, 2 centered in second row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.author}
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-blue-500/10 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:hover:border-blue-500/40 ${
                index === 3 ? "lg:col-span-1 lg:col-start-1" : ""
              } ${index === 4 ? "lg:col-span-1 lg:col-start-2" : ""}`}
            >
              <div>
                {/* Metric pill if available */}
                {item.metric && (
                  <div className="text-2xs mb-4 inline-flex items-center rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-300">
                    ⚡ {item.metric}
                  </div>
                )}

                {/* 5 Yellow Stars */}
                <div
                  className="mb-4 flex items-center gap-1 text-amber-400"
                  aria-label="5 out of 5 stars"
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="size-4 fill-current"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="mb-6 text-sm leading-relaxed text-zinc-200">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3.5 border-t border-white/10 pt-4 dark:border-zinc-800">
                <div
                  className={`flex size-10 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ring-2 ring-white/20 ${item.avatarColor}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{item.author}</p>
                  <p className="truncate text-xs text-zinc-400">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
