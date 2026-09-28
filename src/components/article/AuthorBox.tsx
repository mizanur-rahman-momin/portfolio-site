import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { siteConfig } from "@/config/site";

export function AuthorBox() {
  return (
    <aside className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 shadow-xs backdrop-blur-xs transition-all hover:border-blue-500/30 sm:p-8 dark:border-zinc-800/90 dark:bg-zinc-900/70">
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <div className="relative shrink-0">
          <Image
            src="/images/mizanur.jpg"
            alt={siteConfig.name}
            width={64}
            height={64}
            className="size-16 rounded-full object-cover ring-2 ring-blue-600/30"
          />
          <span
            className="absolute -right-1 -bottom-1 inline-flex items-center rounded-full bg-blue-600 p-1 text-white shadow-xs"
            title="Verified Strategist"
          >
            <svg className="size-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Written by {siteConfig.name}
            </h3>
            <span className="text-2xs rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
              Verified Author
            </span>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {siteConfig.jobTitle} · Founder at Convo Digital LLC
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
            >
              Start a Conversation
            </Link>
            <Link
              href="/about"
              className="dark:hover:bg-zinc-750 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-2xs transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              More About Mizanur
            </Link>
            <SocialLinks size="sm" />
          </div>
        </div>
      </div>
    </aside>
  );
}
