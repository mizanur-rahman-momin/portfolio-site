import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
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
    <header className="border-border bg-canvas/80 sticky top-0 z-50 border-b shadow-xs backdrop-blur-md">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="text-fg inline-flex items-center rounded-md py-2 text-[0.95rem] font-semibold tracking-tight"
          >
            {siteConfig.siteName}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {desktopNav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="border-border text-fg-muted hover:border-border-strong hover:text-fg inline-flex size-9 items-center justify-center rounded-full border transition-colors"
            >
              <SearchIcon width={17} height={17} />
              <span className="sr-only">Search</span>
            </Link>

            <ThemeToggle />

            <ButtonLink href="/contact" size="sm" className="hidden lg:inline-flex">
              Contact
            </ButtonLink>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
