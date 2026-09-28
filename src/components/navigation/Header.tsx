import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SearchIcon } from "@/components/ui/icons";
import { primaryNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";

/** Navigation links shown inline; Contact is rendered as the CTA instead. */
const desktopNav = primaryNav.filter((item) => item.href !== "/contact");

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 shadow-2xs backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center py-1 transition-opacity hover:opacity-90"
            aria-label={siteConfig.siteName}
          >
            <Image
              src="/images/mizanursguidelogo.png"
              alt={siteConfig.siteName}
              width={180}
              height={78}
              priority
              className="h-9 w-auto object-contain sm:h-10 dark:hidden"
            />
            <Image
              src="/images/mizanursguidelogo-dark.png"
              alt={siteConfig.siteName}
              width={180}
              height={78}
              priority
              className="hidden h-9 w-auto object-contain sm:h-10 dark:block"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {desktopNav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/search"
              className="inline-flex size-9 items-center justify-center rounded-full border border-zinc-200/90 text-zinc-600 transition-colors hover:border-blue-500 hover:text-blue-600 sm:hidden dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-blue-400"
              aria-label="Search site"
            >
              <SearchIcon width={16} height={16} />
            </Link>

            <Link
              href="/search"
              className="hidden h-9 items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/80 px-3.5 text-xs text-zinc-500 shadow-2xs transition-all hover:border-blue-500/50 hover:bg-white hover:text-blue-600 sm:inline-flex dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:border-blue-500/40 dark:hover:bg-zinc-900"
            >
              <SearchIcon width={14} height={14} />
              <span>Search...</span>
              <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800">
                ⌘K
              </kbd>
            </Link>

            <ThemeToggle />

            <Link
              href="/contact"
              className="hidden h-9 items-center justify-center rounded-xl bg-blue-600 px-4 text-xs font-semibold text-white shadow-xs shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/30 active:translate-y-0 active:bg-blue-800 sm:text-sm lg:inline-flex"
            >
              Start Pipeline
            </Link>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
