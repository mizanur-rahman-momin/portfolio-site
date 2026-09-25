import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";
import { MailIcon, RssIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

/**
 * Newsletter call to action.
 *
 * If `siteConfig.newsletterUrl` is set the block links to your provider.
 * Otherwise it falls back to RSS and contact, so the site never implies an
 * email list that does not exist and never collects data it cannot handle.
 */
export function NewsletterCTA({ className }: { className?: string }) {
  const hasProvider = siteConfig.newsletterUrl.trim().length > 0;

  return (
    <section
      aria-labelledby="newsletter-heading"
      className={`rounded-card border-border bg-surface border p-6 sm:p-8 ${className ?? ""}`}
    >
      <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
        Stay in touch
      </p>
      <h2
        id="newsletter-heading"
        className="mt-3 text-xl font-semibold tracking-tight text-balance"
      >
        {hasProvider ? "Get new articles by email" : "Follow new articles"}
      </h2>
      <p className="text-fg-muted mt-3 max-w-prose text-sm leading-relaxed">
        {hasProvider
          ? "Occasional emails when something worth reading is published. No spam, unsubscribe at any time."
          : "There is no email list yet. Subscribe with any RSS reader, or get in touch if you would rather hear about new work directly."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {hasProvider ? (
          <a
            href={siteConfig.newsletterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "primary", size: "sm" })}
          >
            <MailIcon width={16} height={16} />
            Subscribe
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link href="/rss.xml" className={buttonClasses({ variant: "outline", size: "sm" })}>
            <RssIcon width={16} height={16} />
            RSS feed
          </Link>
        )}
        <Link href="/contact" className={buttonClasses({ variant: "ghost", size: "sm" })}>
          Get in touch
        </Link>
      </div>
    </section>
  );
}
