import {
  FacebookIcon,
  FiverrIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  PeoplePerHourIcon,
  PinterestIcon,
  RedditIcon,
  RssIcon,
  UpworkIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { activeSocials, type SocialLink } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import type { SVGProps } from "react";

const icons: Record<SocialLink["icon"], (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  pinterest: PinterestIcon,
  reddit: RedditIcon,
  fiverr: FiverrIcon,
  upwork: UpworkIcon,
  peopleperhour: PeoplePerHourIcon,
  email: MailIcon,
  rss: RssIcon,
};

type SocialLinksProps = {
  className?: string;
  /** Include the RSS feed link. */
  includeRss?: boolean;
  size?: "sm" | "md";
};

export function SocialLinks({ className, includeRss = false, size = "md" }: SocialLinksProps) {
  const links: SocialLink[] = includeRss
    ? [...activeSocials, { label: "RSS feed", href: "/rss.xml", icon: "rss" }]
    : activeSocials;

  if (links.length === 0) return null;

  const dimension = size === "sm" ? 16 : 18;
  const button = size === "sm" ? "size-8" : "size-9";

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((social) => {
        const Icon = icons[social.icon];
        const isExternal = /^https?:/.test(social.href);
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "border-border text-fg-muted hover:border-border-strong hover:text-fg inline-flex items-center justify-center rounded-full border transition-colors",
                button,
              )}
            >
              <Icon width={dimension} height={dimension} />
              <span className="sr-only">
                {social.label}
                {isExternal ? " (opens in a new tab)" : ""}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
