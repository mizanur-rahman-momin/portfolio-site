import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface mt-auto border-t">
      <div
        aria-hidden="true"
        className="from-accent via-accent/25 h-px w-full bg-gradient-to-r to-transparent"
      />
      <Container size="wide">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-fg inline-flex items-center gap-2.5 text-base font-semibold tracking-tight"
            >
              <span aria-hidden="true" className="bg-accent size-2.5 rounded-[4px]" />
              {siteConfig.siteName}
            </Link>
            <p className="text-fg-muted mt-4 text-sm leading-relaxed">{siteConfig.description}</p>
            <p className="text-fg-subtle mt-4 text-sm">
              {siteConfig.location} · {siteConfig.availability}
            </p>
            <SocialLinks className="mt-6" includeRss />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="text-fg-muted hover:text-fg rounded text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-border text-fg-subtle flex flex-col gap-3 border-t py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.siteName}. All rights reserved.
          </p>
          <p>
            Built with Next.js, TypeScript, Tailwind CSS and MDX.{" "}
            <Link href="/privacy" className="link-underline hover:text-fg">
              Privacy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
