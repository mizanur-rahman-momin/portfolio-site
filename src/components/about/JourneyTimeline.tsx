import { Container } from "@/components/ui/Container";

const milestones = [
  {
    year: "2017",
    title: "Freelancing Roots on Upwork & Fiverr",
    description:
      "Started providing B2B web research, prospect list building, and email marketing for international startups and agencies.",
  },
  {
    year: "2021",
    title: "Founded Convo Digital LLC",
    description:
      "Turned freelance consulting into a full-service agency with repeatable systems, dedicated researchers, and client outreach campaigns.",
  },
  {
    year: "2023",
    title: "500K+ Verified Prospects Milestone",
    description:
      "Delivered over 500,000 human-verified leads and supported outbound campaigns for SaaS startups across North America and Europe.",
  },
  {
    year: "2024",
    title: "AI Workflows & n8n Automation",
    description:
      "Integrated autonomous AI enrichment, webhook pipelines, and modern CRM synchronization to eliminate manual data entry.",
  },
  {
    year: "2026",
    title: "Building Sublix & PostNow SaaS Products",
    description:
      "Expanding into product development with Sublix (subscription & trial reminders) and PostNow (LinkedIn content workflows).",
  },
];

const stats = [
  { value: "8+", label: "Years Experience" },
  { value: "500K+", label: "Verified Leads" },
  { value: "50+", label: "Clients Served" },
];

export function JourneyTimeline() {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <Container size="wide">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading, Bio, and Stats */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Milestones
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Our Journey <br />
              <span className="text-blue-600 dark:text-blue-400">So Far</span>
            </h2>

            <p className="mt-5 text-base leading-relaxed font-normal text-zinc-600 sm:text-lg dark:text-zinc-400">
              From a solo freelancer on Upwork and Fiverr to building Convo Digital and helping 50+
              B2B companies scale their outbound revenue. Here is how our story evolved:
            </p>

            {/* 3 Metric Counters */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-200 pt-8 text-left dark:border-zinc-800">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-blue-600 sm:text-3xl dark:text-blue-400">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7">
            <div className="relative ml-4 space-y-10 border-l-2 border-blue-200 pl-6 sm:ml-6 sm:pl-8 dark:border-blue-900/60">
              {milestones.map((item) => (
                <div key={item.year} className="group relative">
                  {/* Timeline Dot Marker */}
                  <div className="absolute top-1 -left-[31px] flex size-5 items-center justify-center rounded-full bg-blue-600 shadow-sm ring-4 ring-white sm:-left-[39px] dark:ring-zinc-950" />

                  <span className="mb-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {item.year}
                  </span>

                  <h3 className="text-lg font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
