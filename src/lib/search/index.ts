import type { SearchRecord } from "@/types/content";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllProjects } from "@/lib/content/projects";
import { stripMarkdown, truncate } from "@/lib/utils/text";
import { siteConfig } from "@/config/site";

/** Static, always-available destinations worth surfacing in search. */
const staticPages: SearchRecord[] = [
  {
    id: "page-about",
    type: "page",
    title: "About",
    description: "Background, current focus and how I work.",
    url: "/about",
    body: "about biography experience skills working principles lead generation saas automation",
  },
  {
    id: "page-services",
    type: "page",
    title: "Services",
    description:
      "Lead generation, cold email, LinkedIn outreach, SaaS promotion, automation and SaaS development.",
    url: "/services",
    body: "services lead generation list building cold email email marketing linkedin prospecting saas promotion lifetime deal ltd campaigns marketing automation ai workflows n8n saas development",
  },
  {
    id: "page-projects",
    type: "page",
    title: "Case studies",
    description: "Case studies of real work and products in development.",
    url: "/projects",
    body: "projects case studies portfolio work convo digital sublix postnow",
  },
  {
    id: "page-experience",
    type: "page",
    title: "Experience",
    description: "Roles, timelines, education and responsibilities.",
    url: "/experience",
    body: "experience roles employment timeline career education convo digital sublix fiverr upwork",
  },
  {
    id: "page-blog",
    type: "page",
    title: "Blog",
    description: "Writing on lead generation, LinkedIn prospecting, SaaS growth and automation.",
    url: "/blog",
    body: "blog articles writing posts lead generation linkedin prospecting saas growth marketing automation seo content",
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contact",
    description: "Start a conversation about a project.",
    url: "/contact",
    body: "contact email hire work together lead generation project",
  },
  {
    id: "page-uses",
    type: "page",
    title: "Uses",
    description: "The tools, hardware and stack behind the work.",
    url: "/uses",
    body: "uses tools stack setup hardware software",
  },
  {
    id: "page-now",
    type: "page",
    title: "Now",
    description: "What I am focused on at the moment.",
    url: "/now",
    body: "now current focus availability",
  },
];

const MAX_BODY_LENGTH = 1400;

/**
 * Cached index.
 *
 * The content layer is only read from disk once per server process, so the
 * `/search` route costs no filesystem work on subsequent requests. In
 * development the module is re-evaluated when content changes, so the cache
 * never hides an edit for long.
 */
let cachedIndex: SearchRecord[] | null = null;

/**
 * Build the search index.
 *
 * Runs on the server, so the browser only ever receives the resulting records —
 * there is no search service to operate and nothing is queried remotely.
 */
export function buildSearchIndex(): SearchRecord[] {
  if (cachedIndex) return cachedIndex;
  cachedIndex = createSearchIndex();
  return cachedIndex;
}

function createSearchIndex(): SearchRecord[] {
  const posts: SearchRecord[] = getAllBlogPosts().map((post) => ({
    id: `post-${post.slug}`,
    type: "post",
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    url: `/blog/${post.slug}`,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags,
    date: post.frontmatter.date,
    body: truncate(stripMarkdown(post.content), MAX_BODY_LENGTH),
  }));

  const projects: SearchRecord[] = getAllProjects().map((project) => ({
    id: `project-${project.slug}`,
    type: "project",
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    url: `/projects/${project.slug}`,
    category: project.frontmatter.category,
    tags: project.frontmatter.technologies,
    date: project.frontmatter.date,
    body: truncate(stripMarkdown(project.content), MAX_BODY_LENGTH),
  }));

  return [
    ...posts,
    ...projects,
    ...staticPages.map((page) => ({
      ...page,
      body: `${page.body} ${siteConfig.siteName} ${siteConfig.name} ${siteConfig.jobTitle}`.trim(),
    })),
  ];
}
