import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"
      />
      <Container size="wide">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label={siteConfig.siteName}
            >
              <Image
                src="/images/mizanursguidelogo.png"
                alt={siteConfig.siteName}
                width={180}
                height={78}
                className="h-9 w-auto object-contain sm:h-10 dark:hidden"
              />
              <Image
                src="/images/mizanursguidelogo-dark.png"
                alt={siteConfig.siteName}
                width={180}
                height={78}
                className="hidden h-9 w-auto object-contain sm:h-10 dark:block"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed font-normal text-zinc-600 dark:text-zinc-400">
              {siteConfig.description}
            </p>
            <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
              {siteConfig.location} · {siteConfig.availability}
            </p>
            <SocialLinks className="mt-6" includeRss />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-bold tracking-[0.14em] text-zinc-400 uppercase dark:text-zinc-500">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
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

        <div className="flex flex-col gap-3 border-t border-zinc-200 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm dark:border-zinc-800">
          <p>
            © {year} {siteConfig.siteName}. All rights reserved.
          </p>
          <p>
            Built with Next.js, TypeScript, Tailwind CSS and MDX.{" "}
            <Link
              href="/privacy"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
