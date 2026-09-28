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
      className={`rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/80 ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
        <p className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
          Stay in touch
        </p>
      </div>
      <h2
        id="newsletter-heading"
        className="mt-3 text-xl font-bold tracking-tight text-balance text-zinc-900 dark:text-white"
      >
        {hasProvider ? "Get new articles by email" : "Follow new articles"}
      </h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
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
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 sm:text-sm"
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
