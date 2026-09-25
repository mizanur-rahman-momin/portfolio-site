/**
 * Central site configuration.
 *
 * This is the single source of truth for identity signals (name, title,
 * biography, links). Keeping it in one place keeps personal-brand / entity SEO
 * consistent across metadata, structured data, RSS and the UI.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Canonical site origin, without a trailing slash. */
export const siteUrl = (rawUrl && rawUrl.length > 0 ? rawUrl : "http://localhost:3000").replace(
  /\/+$/,
  "",
);

export type SocialLink = {
  /** Human-readable network name, used for accessible labels. */
  label: string;
  /** Absolute profile URL. Leave empty ("") to hide the link entirely. */
  href: string;
  /** Short key used to pick an icon. */
  icon:
    | "github"
    | "linkedin"
    | "x"
    | "facebook"
    | "youtube"
    | "pinterest"
    | "reddit"
    | "fiverr"
    | "upwork"
    | "peopleperhour"
    | "email"
    | "rss";
};

export const siteConfig = {
  /** The person behind the site — used for authorship and structured data. */
  name: "Mizanur Rahman Momin",
  /**
   * The site / brand name.
   *
   * Used for the wordmark, the page-title template, the Open Graph site name
   * and the copyright line. Keeping it separate from `name` means the brand can
   * change without breaking authorship or `Person` structured data.
   */
  siteName: "Mizanur's Guide",
  jobTitle: "Strategic B2B Lead Generation Expert",
  description:
    "Mizanur's Guide publishes practical B2B lead generation guides by Mizanur Rahman Momin: cold email, LinkedIn prospecting, list building, marketing automation and SaaS growth.",
  /** Topic keywords used as sensible defaults for page metadata. */
  keywords: [
    "Mizanur's Guide",
    "Mizanur Rahman Momin",
    "B2B lead generation",
    "cold email marketing",
    "LinkedIn prospecting",
    "list building",
    "email marketing",
    "marketing automation",
    "SaaS growth",
    "SaaS development",
  ],
  eyebrow: "Founder of Convo Digital LLC · B2B lead generation & SaaS",
  positioning: "I help B2B teams find the right prospects and turn research into revenue.",
  heroSupport:
    "I run Convo Digital, where I build lead generation and outreach systems for SaaS companies, founders and agencies. I also build my own SaaS products.",
  locale: "en_US",
  htmlLang: "en",
  /**
   * Public contact address. Do not use a personal inbox you want to keep
   * private — this value is rendered on the contact page and in the feed.
   * Set it through NEXT_PUBLIC_CONTACT_EMAIL in `.env.local`.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@example.com",
  location: "Rajshahi, Bangladesh",
  availability: "Open to new B2B lead generation projects",
  timeZone: "Asia/Dhaka",
  /**
   * Real professional profiles only. Leave a link as "" to hide it.
   * These feed `sameAs` in structured data — do not add profiles you do not own.
   */
  socials: [
    {
      label: "LinkedIn",
      href: "https://bd.linkedin.com/in/mizanur-rahman-momin-448a81121",
      icon: "linkedin",
    },
    { label: "GitHub", href: "https://github.com/mizanur-rahman-momin", icon: "github" },
    { label: "X (Twitter)", href: "https://twitter.com/M_R_MOMIN", icon: "x" },
    { label: "Facebook", href: "https://www.facebook.com/themizanurrahman", icon: "facebook" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@mizanur-rahman-momin",
      icon: "youtube",
    },
    {
      label: "Pinterest",
      href: "https://www.pinterest.com/mizanur_pinterest/",
      icon: "pinterest",
    },
    { label: "Reddit", href: "https://www.reddit.com/user/momindev/", icon: "reddit" },
    { label: "Fiverr", href: "https://www.fiverr.com/users/lead_generator_/", icon: "fiverr" },
    { label: "Upwork", href: "", icon: "upwork" },
    {
      label: "PeoplePerHour",
      href: "https://www.peopleperhour.com/freelancer/marketing-seo/mizanur_rahman-momin-lead-generation-web-research-zvvmxxv",
      icon: "peopleperhour",
    },
    {
      label: "Email",
      href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@example.com"}`,
      icon: "email",
    },
  ] satisfies SocialLink[],
  /** Handles for social metadata (Twitter/X). Leave empty to omit. */
  twitterHandle: "",
  /**
   * Newsletter signup URL (Buttondown, ConvertKit, Mailerlite, …).
   * Leave empty to show the RSS-based fallback CTA instead — no provider is
   * assumed, and no visitor data is collected by this project itself.
   * Set it through NEXT_PUBLIC_NEWSLETTER_URL in `.env.local`.
   */
  newsletterUrl: process.env.NEXT_PUBLIC_NEWSLETTER_URL?.trim() || "",
  /** The default Open Graph image path, relative to the site root. */
  defaultOgImage: "/api/og?title=Mizanur%27s%20Guide&eyebrow=B2B%20lead%20generation%20%26%20SaaS",
  /** Short label used by the RSS feed and manifest. */
  rssTitle: "Mizanur's Guide — Blog",
  /** Set to true only while the site still contains placeholder content. */
  containsPlaceholders: false,
} as const;

/** Social links that actually have a destination. */
export const activeSocials = siteConfig.socials.filter((social) => social.href.trim().length > 0);

/** Absolute URL helper — always returns a fully qualified, canonical URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}
