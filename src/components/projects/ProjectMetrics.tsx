import type { ProjectMetric } from "@/types/content";

/**
 * Results metrics for a case study.
 *
 * Only rendered when verifiable metrics are declared in frontmatter — the site
 * never invents numbers, so an empty list means the section simply does not
 * appear.
 */
export function ProjectMetrics({ metrics }: { metrics?: ProjectMetric[] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section aria-labelledby="project-results-heading">
      <h2 id="project-results-heading" className="text-2xl font-semibold tracking-tight">
        Results
      </h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-card border-border bg-surface border p-5">
            <dt className="text-fg-subtle text-sm">{metric.label}</dt>
            <dd className="text-fg mt-2 text-3xl font-semibold tracking-tight">{metric.value}</dd>
            {metric.note ? <p className="text-fg-subtle mt-2 text-xs">{metric.note}</p> : null}
          </div>
        ))}
      </dl>
    </section>
  );
}
