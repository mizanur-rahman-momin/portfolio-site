import { Container } from "@/components/ui/Container";

type BlueprintSectionProps = {
  photoSrc?: string;
};

const pipelineSteps = [
  {
    step: "01",
    title: "ICP Targeting & Buying Signals",
    subtitle: "Identify accounts experiencing trigger events",
    badge: "Intelligence",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    tools: ["Apollo", "Clay", "LinkedIn Sales Nav"],
    details:
      "Filter by hiring triggers, recent funding, tech stack shifts, and executive departures.",
  },
  {
    step: "02",
    title: "Zero-Bounce Waterfall Verification",
    subtitle: "Protect domain reputation & inbox placement",
    badge: "Deliverability",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    tools: ["MillionVerifier", "NeverBounce", "Custom MX"],
    details:
      "Multi-provider waterfall verification ensures 98%+ valid inbox delivery with zero burn.",
  },
  {
    step: "03",
    title: "High-Reply Conversational Sequences",
    subtitle: "Address urgent buyer friction points",
    badge: "Copywriting",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    tools: ["Instantly", "Smartlead", "Heyreach"],
    details: "Short, value-first messaging that feels 1-to-1 and respects the prospect's inbox.",
  },
  {
    step: "04",
    title: "AI Workflows & CRM Syncing",
    subtitle: "Automate manual admin & calendar bookings",
    badge: "Automation",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    tools: ["n8n", "OpenAI", "HubSpot", "Slack"],
    details:
      "Real-time webhook routing pushes qualified interested replies directly into your calendar.",
  },
];

export function BlueprintSection({ photoSrc: _photoSrc }: BlueprintSectionProps) {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-20 sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-18">
          <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
            Proven Pipeline Architecture
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
            Everything You Need to Build a Scalable Outbound Engine
          </h2>
          <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            From discovering high-fit accounts to running multi-channel sequences and automating CRM
            routing, here is how we engineer repeatable revenue:
          </p>
        </div>

        {/* 4 Pipeline Architecture Cards in a 2x2 Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pipelineSteps.map((item) => (
            <div
              key={item.step}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-blue-500/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-blue-600/80 dark:text-blue-400/80">
                    {item.step}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {item.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.details}
                </p>
              </div>

              {/* Tools footer tag row */}
              <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-zinc-100 pt-4 dark:border-zinc-800/80">
                <span className="text-2xs mr-1 font-semibold tracking-wider text-zinc-400 uppercase">
                  Stack:
                </span>
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-2xs rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
