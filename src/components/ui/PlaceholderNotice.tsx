import { InfoIcon } from "./icons";

/**
 * Visible marker for content that still needs to be replaced with real
 * information. Shown automatically when a content file sets `placeholder: true`.
 */
export function PlaceholderNotice({ label = "This page" }: { label?: string }) {
  return (
    <aside
      role="note"
      className="rounded-card border-accent/40 bg-accent-soft text-accent-ink mb-8 flex gap-3 border px-4 py-3 text-sm"
    >
      <InfoIcon className="mt-0.5 size-4 shrink-0" />
      <p>
        <strong className="font-semibold">Sample content.</strong> {label} contains placeholder text
        and must be replaced with real, verifiable information before publishing. Set{" "}
        <code className="bg-accent/10 rounded px-1 py-0.5 font-mono text-xs">
          placeholder: false
        </code>{" "}
        (or remove the flag) in the frontmatter once the real content is in place.
      </p>
    </aside>
  );
}
