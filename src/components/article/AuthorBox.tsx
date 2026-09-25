import Link from "next/link";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/** Initials monogram — no stock portrait is used as a stand-in for a real face. */
function Monogram() {
  const initials = siteConfig.name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="bg-accent-soft text-accent-ink flex size-12 shrink-0 items-center justify-center rounded-full font-semibold"
    >
      {initials}
    </span>
  );
}

export function AuthorBox() {
  return (
    <aside className="rounded-card border-border bg-surface border p-6">
      <div className="flex items-start gap-4">
        <Monogram />
        <div className="min-w-0">
          <p className="text-fg text-sm font-semibold">{siteConfig.name}</p>
          <p className="text-fg-subtle text-sm">{siteConfig.jobTitle}</p>
          <p className="text-fg-muted mt-3 text-sm leading-relaxed">{siteConfig.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/about" className={buttonClasses({ variant: "outline", size: "sm" })}>
              More about me
            </Link>
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>
    </aside>
  );
}
