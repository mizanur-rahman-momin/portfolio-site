import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  ContactPage,
  CreativeWork,
  ListItem,
  Organization,
  Person,
  ProfilePage,
  Service,
  WebSite,
  WithContext,
} from "schema-dts";
import type { BlogPost, Project } from "@/types/content";
import { absoluteUrl, activeSocials, siteConfig, siteUrl } from "@/config/site";

/** Topics used by `knowsAbout`; keep in sync with the services page. */
const KNOWS_ABOUT = [
  "B2B lead generation",
  "Cold email marketing",
  "LinkedIn prospecting",
  "Email marketing",
  "Marketing automation",
  "SaaS promotion",
  "SaaS development",
];

/** Convo Digital — the company behind the professional work. */
const ORGANIZATION_NAME = "Convo Digital LLC";
const ORGANIZATION_URL = process.env.NEXT_PUBLIC_ORGANIZATION_URL?.trim();

const EDUCATION = [
  {
    "@type": "CollegeOrUniversity" as const,
    name: "North Bengal International University",
  },
  {
    "@type": "CollegeOrUniversity" as const,
    name: "Rajshahi Polytechnic Institute",
  },
];

const CREDENTIALS = [
  "Data Analysis with R Programming",
  "Google Data Analytics Capstone: Complete a Case Study",
];

function profileUrls(): string[] {
  return activeSocials
    .filter((social) => /^https?:/.test(social.href))
    .map((social) => social.href);
}

export function personSchema(): WithContext<Person> {
  const sameAs = profileUrls();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.description,
    knowsAbout: KNOWS_ABOUT,
    worksFor: { "@id": `${siteUrl}/#organization` },
    alumniOf: EDUCATION,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rajshahi",
      addressCountry: "BD",
    },
    hasCredential: CREDENTIALS.map((name) => ({
      "@type": "EducationalOccupationalCredential" as const,
      name,
      credentialCategory: "Certificate",
      recognizedBy: { "@type": "Organization" as const, name: "Google" },
      dateCreated: "2024-04",
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
  };
}

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: ORGANIZATION_NAME,
    founder: { "@id": `${siteUrl}/#person` },
    ...(ORGANIZATION_URL ? { url: ORGANIZATION_URL } : {}),
    ...(profileUrls().length > 0 ? { sameAs: profileUrls() } : {}),
  };
}

export function webSiteSchema(): WithContext<WebSite> {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.siteName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.htmlLang,
    publisher: { "@id": `${siteUrl}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      // `query-input` is required for the sitelinks search box but is missing
      // from schema-dts's generated SearchAction type, hence the cast below.
      "query-input": "required name=search_term_string",
    },
  };

  return schema as unknown as WithContext<WebSite>;
}

export function profilePageSchema(input: {
  name: string;
  description: string;
  path: string;
}): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    about: { "@id": `${siteUrl}/#person` },
  };
}

export function contactPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): WithContext<ContactPage> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
  };
}

export type Crumb = {
  name: string;
  /** Root-relative path. Omit for the current (last) item when it has no URL. */
  href?: string;
};

export function breadcrumbSchema(crumbs: Crumb[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => {
      const item: ListItem = {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
      };
      return item;
    }),
  };
}

export function blogSchema(posts: BlogPost[]): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/blog#blog`,
    url: absoluteUrl("/blog"),
    name: `${siteConfig.siteName} — Blog`,
    description: `Articles on B2B lead generation, LinkedIn prospecting, SaaS growth, automation and content.`,
    inLanguage: siteConfig.htmlLang,
    publisher: { "@id": `${siteUrl}/#person` },
    blogPost: posts.slice(0, 20).map((post) => ({
      "@type": "BlogPosting" as const,
      headline: post.frontmatter.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.frontmatter.date,
      dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    })),
  };
}

export function blogPostingSchema(post: BlogPost): WithContext<BlogPosting> {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const { frontmatter } = post;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: frontmatter.title,
    description: frontmatter.description,
    url,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    inLanguage: siteConfig.htmlLang,
    articleSection: frontmatter.category,
    ...(frontmatter.tags && frontmatter.tags.length > 0
      ? { keywords: frontmatter.tags.join(", ") }
      : {}),
    ...(frontmatter.coverImage
      ? { image: absoluteUrl(frontmatter.coverImage) }
      : { image: absoluteUrl(`/api/og?title=${encodeURIComponent(frontmatter.title)}`) }),
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
  };
}

export function projectSchema(project: Project): WithContext<CreativeWork> {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const { frontmatter } = project;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: frontmatter.title,
    description: frontmatter.description,
    url,
    dateCreated: frontmatter.date,
    dateModified: frontmatter.date,
    creator: { "@id": `${siteUrl}/#person` },
    inLanguage: siteConfig.htmlLang,
    ...(frontmatter.technologies && frontmatter.technologies.length > 0
      ? { keywords: frontmatter.technologies.join(", ") }
      : {}),
    ...(frontmatter.coverImage
      ? { image: absoluteUrl(frontmatter.coverImage) }
      : { image: absoluteUrl(`/api/og?title=${encodeURIComponent(frontmatter.title)}`) }),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string;
}): WithContext<Service> {
  const url = absoluteUrl(`/services#${input.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url,
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: input.areaServed ?? "Worldwide",
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; href: string }[];
}): WithContext<CreativeWork> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.href),
      })),
    },
  };
}
