export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary header navigation. */
export const primaryNav: NavItem[] = [
  { label: "About", href: "/about", description: "Background, focus and how I work." },
  {
    label: "Case Studies",
    href: "/projects",
    description: "Real work and products in development.",
  },
  { label: "Services", href: "/services", description: "How I can help your team." },
  { label: "Experience", href: "/experience", description: "Roles, timelines and education." },
  { label: "Blog", href: "/blog", description: "Writing on lead generation, SaaS and automation." },
  { label: "Contact", href: "/contact", description: "Start a conversation." },
];

/** Footer navigation, grouped by intent. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/projects" },
      { label: "Services", href: "/services" },
      { label: "Experience", href: "/experience" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Search", href: "/search" },
      { label: "Now", href: "/now" },
      { label: "Uses", href: "/uses" },
      { label: "Contact", href: "/contact" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];
