import { Container } from "@/components/ui/Container";

const steps = [
  {
    step: "01",
    title: "ICP & Buying Intent Discovery",
    description:
      "We define the exact job titles, company size, tech stack, and trigger events (such as recent funding or hiring) that signal a company is ready to buy.",
  },
  {
    step: "02",
    title: "Multi-Source Research & Human Verification",
    description:
      "Instead of buying stale databases, our researchers curate bespoke lists and run multi-layer SMTP and DNS checks to guarantee 99%+ deliverability.",
  },
  {
    step: "03",
    title: "Conversational, High-Context Messaging",
    description:
      "We write short, personal cold sequences that focus on solving urgent pains rather than generic feature dumping, driving real replies and meetings.",
  },
  {
    step: "04",
    title: "Continuous Deliverability & Workflow Optimization",
    description:
      "Inbox rotation, custom tracking domains, domain health monitors, and automated CRM routing so every warm lead is responded to in minutes.",
  },
];

const tools = [
  "n8n Automation",
  "Apollo.io",
  "LinkedIn Sales Navigator",
  "Google Sheets",
  "Airtable",
  "Next.js & React",
  "Supabase & PostgreSQL",
  "Claude & OpenAI APIs",
  "DNS Hygiene (SPF/DKIM)",
  "Custom Webhooks",
];

export function WorkPhilosophy() {
  return (
    <section className="border-y border-zinc-200/80 bg-zinc-50/70 py-20 sm:py-24 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      <Container size="wide">
        <div className="mx-auto max-w-5xl">
          {/* Part 1: How we generate results */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              Our Methodology
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              How We Generate Real Results for B2B Clients
            </h2>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              A disciplined, engineering-grade approach to outbound sales development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {steps.map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 font-mono text-sm font-bold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* Part 2: Tools we trust */}
          <div className="mt-16 border-t border-zinc-200 pt-12 text-center dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Tools &amp; Technologies We Rely On Daily
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Only battle-tested platforms that provide reliable data and enterprise uptime.
            </p>

            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-2xs sm:text-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
