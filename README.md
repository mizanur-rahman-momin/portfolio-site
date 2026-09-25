# Mizanur's Guide — Portfolio + Blog

**Mizanur's Guide** (mizanursguide.com) is a statically rendered personal site and MDX blog built
with **Next.js (App Router), TypeScript, Tailwind CSS and MDX**. It presents B2B lead generation
work, Convo Digital, and the SaaS products in development (Sublix and PostNow). Designed to be fast
on a phone, crawlable, accessible, easy to keep writing in, and portable between Node hosts
(Hostinger today, Vercel or anything else tomorrow).

---

## Contents

- [What is implemented](#what-is-implemented)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Content and publishing](#content-and-publishing)
- [Project structure](#project-structure)
- [Writing content](#writing-content)
- [Frontmatter reference](#frontmatter-reference)
- [Images](#images)
- [SEO](#seo)
- [Architecture decisions](#architecture-decisions)
- [Quality checks](#quality-checks)
- [Deploying to Hostinger](#deploying-to-hostinger)
- [Deploying elsewhere](#deploying-elsewhere)
- [Git workflow](#git-workflow)
- [Security notes](#security-notes)
- [Deliberately not included](#deliberately-not-included)

---

## What is implemented

| Area | Status |
| --- | --- |
| Homepage with hero, focus areas, featured projects, services, latest writing, CTA | ✅ |
| About, Services, Experience, Contact pages | ✅ |
| Projects index with category filter (progressive enhancement) | ✅ |
| Project case-study pages with facts sidebar, TOC, gallery and metrics | ✅ |
| Blog index, featured article, taxonomy (categories + tags) | ✅ |
| MDX pipeline with syntax highlighting, heading anchors, GFM, callouts, figures | ✅ |
| Table of contents, reading progress, copy-code, share controls | ✅ |
| Build-time static search index with client-side filtering | ✅ |
| Metadata, canonicals, Open Graph, Twitter cards, generated OG images | ✅ |
| JSON-LD (Person, WebSite, ProfilePage, ContactPage, Blog, BlogPosting, CreativeWork, Service, BreadcrumbList, CollectionPage) | ✅ |
| `sitemap.xml`, `robots.txt`, `rss.xml` | ✅ |
| Contact form with validation, honeypot, timing check and rate limiting | ✅ |
| 404, error boundary, loading state | ✅ |
| Dark mode with no flash and no layout shift | ✅ |
| Security headers (CSP, HSTS, Referrer-Policy, Permissions-Policy, nosniff, framing) | ✅ |
| Accessibility: skip link, semantic landmarks, focus states, reduced motion, labelled forms | ✅ |
| CI workflow (format, lint, typecheck, build) | ✅ |

---

## Requirements

- **Node.js 20.9 or newer** (developed against Node 24)
- **npm 10 or newer**
- Git

No database, no CMS and no external service is required to build or run the site.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local      # Windows: copy .env.example .env.local

# 3. Start the development server
npm run dev                     # http://localhost:3000
```

Production build and preview:

```bash
npm run build
npm run start
```

> `npm run dev` and `npm run build` both run a `predev`/`prebuild` step that copies colocated
> content images into `public/content/`. If images ever look missing, run `npm run sync:images`.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also runs type checking) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (used by CI) |
| `npm run sync:images` | Copy `content/**/images` into `public/content` |

---

## Environment variables

All variables are documented in [`.env.example`](./.env.example). Only the first is required.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin. Drives canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt` and `rss.xml`. No trailing slash. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Public contact address shown on the contact page and in the RSS feed. |
| `CONTACT_WEBHOOK_URL` | For the form | JSON POST endpoint that receives contact submissions. |
| `NEXT_PUBLIC_NEWSLETTER_URL` | No | Newsletter provider URL. Without it, the newsletter block links to RSS instead. |

**If `NEXT_PUBLIC_SITE_URL` is not set the site falls back to `http://localhost:3000`**, which will
produce incorrect canonicals in production. Always set it before deploying.

**If `CONTACT_WEBHOOK_URL` is not set**, the contact form still validates input and shows the visitor
an error plus your contact email — it never pretends a message was delivered.

---

## Content and publishing

The site content is real. There is no placeholder copy left in the repository, and
`containsPlaceholders` in `src/config/site.ts` is `false`.

How the content is organised:

1. **`src/config/site.ts`** — identity: name, job title, description, positioning, hero copy,
   location, availability, social links and contact email.
2. **`src/config/content.ts`** — focus areas, services, experience, education, working principles,
   capabilities, uses and the now page.
3. **`src/config/navigation.ts`** — navigation labels.
4. **`content/blog/**`** — articles, adapted from real posts and written for this site.
5. **`content/projects/**`** — case studies of real work and products in development.
6. **`src/app/privacy/page.tsx`** and **`src/app/terms/page.tsx`** — templates, not legal advice.
   They name Convo Digital LLC as the controller and should be reviewed before relying on them.

Read **[CONTENT.md](./CONTENT.md)** before adding or editing content. It covers the writing style,
readability targets, honesty rules, frontmatter flags and the publish workflow.

Content files can be flagged as sample content with `placeholder: true`, which renders a visible
banner. Drafts use `draft: true` and are excluded from production builds.

---

## Project structure

```text
.
├── content/                      # MDX content (outside src/, so it is easy to find)
│   ├── blog/<slug>/index.mdx
│   │   └── images/
│   └── projects/<slug>.mdx       # or projects/<slug>/index.mdx
│       └── images/
├── public/                       # Static assets; /content is generated at build time
├── scripts/
│   └── sync-content-images.mjs   # Copies colocated content images into public/
└── src/
    ├── app/                      # Routes, metadata, sitemap, robots, RSS, OG image, contact API
    ├── components/
    │   ├── article/              # TOC, reading progress, copy-code, share, author box, prev/next
    │   ├── blog/                 # Post cards, taxonomy lists, newsletter CTA
    │   ├── forms/                # Contact form
    │   ├── navigation/           # Header, mobile nav, theme toggle/script, footer, social links
    │   ├── projects/             # Project cards, gallery, metrics, filter
    │   ├── search/               # Search UI
    │   ├── seo/                  # JSON-LD, breadcrumbs
    │   └── ui/                   # Primitives: Button, Badge, Container, Section, icons, …
    ├── config/                   # Site identity, navigation, editable content
    ├── lib/
    │   ├── content/              # Filesystem loaders for blog posts and projects
    │   ├── mdx/                  # MDX pipeline, components, TOC extraction, image sizing
    │   ├── search/               # Build-time index + client-side query
    │   ├── seo/                  # Metadata builder + structured data
    │   ├── utils/                # Class merging, formatting, text helpers
    │   └── validation/           # Contact form contract shared by client and server
    └── types/                    # Shared content types
```

---

## Writing content

### Adding a blog post

```bash
content/blog/my-new-post/
├── index.mdx
└── images/
    └── cover.png
```

````mdx
---
title: "My new post"
description: "One or two sentences used for the card, meta description and RSS summary."
slug: "my-new-post"
date: "2026-03-01"
updated: "2026-03-08"
author: "Your Name"
category: "SaaS"
tags: ["Next.js", "Architecture"]
featured: false
draft: false
coverImage: "./images/cover.png"
coverImageAlt: "Describe what the image shows"
relatedProjects: ["atlas-analytics"]
relatedServices: ["saas-development"]
---

## A heading becomes a table-of-contents entry

Regular markdown works, including **bold**, `inline code`, tables (GFM) and images:

![Alt text](./images/diagram.png)

<Callout type="tip" title="Optional title">
  Custom components are available in every MDX file.
</Callout>

```ts
// Fenced code blocks are syntax highlighted, with a copy button added
// by progressive enhancement.
export const hello = "world";
```
````

Notes:

- **Drafts never ship.** `draft: true` excludes a post from production builds.
- **A post with no frontmatter `date` fails the build.** Broken content is caught before deployment.
- The folder name is the slug unless you override it with `slug`.
- `relatedProjects` and `relatedServices` create real internal links; use slugs that exist.

### Adding a project case study

Either layout works:

```text
content/projects/my-project.mdx          # flat
content/projects/my-project/index.mdx    # folder (needed if you have many images)
```

Recommended case-study structure (used by the sample content):

> Overview → Problem → Context → Goals → Constraints → Discovery → Solution → Architecture →
> Design decisions → Implementation → Challenges → Results → Lessons learned → Technology → Next

Only include a **Results** section when you have verifiable outcomes. To render the results metric
grid, add them to frontmatter — the section is hidden when the list is empty:

```yaml
metrics:
  - label: "Onboarding time"
    value: "-38%"
    note: "Measured over 8 weeks after launch"
```

> **Never invent metrics.** If you cannot verify a number, leave it out.

### Images

Put images in an `images/` folder next to the MDX file and reference them relatively:

```mdx
![Descriptive alt text](./images/dashboard.png)
```

The prebuild script copies `content/**/images/**` into `public/content/**`, and a rehype plugin
rewrites the relative path. Intrinsic dimensions are read from the file at build time, so you never
have to write `width`/`height` and the layout never shifts.

Use descriptive filenames and meaningful alt text. Decorative images should have an empty alt (`""`).

For a blog post cover, drop an image at `content/blog/<slug>/images/cover.*` (`.jpg`, `.jpeg`,
`.png`, `.webp` or `.avif`). It is picked up automatically — no frontmatter needed. When the
`images/` folder holds exactly one image, that image is used as the cover too; otherwise a file
named `cover.*` is required. Setting `coverImage` in frontmatter always overrides the detected
file. Alt text falls back to the post title unless `coverImageAlt` is set.

---

## Frontmatter reference

### Blog (`BlogFrontmatter`)

| Field | Required | Notes |
| --- | --- | --- |
| `title` | ✅ | |
| `description` | ✅ | Card, meta description and RSS summary |
| `date` | ✅ | ISO date (`2026-03-01`) |
| `category` | ✅ | Drives `/blog/category/<slug>` |
| `slug` | | Defaults to the folder name |
| `updated` | | Shown as “Updated”, used for `dateModified` |
| `author` | | Defaults to `siteConfig.name` |
| `tags` | | Drives `/blog/tag/<slug>` |
| `featured` | | Promotes the post on the blog index |
| `draft` | | Excluded from production builds |
| `coverImage` / `coverImageAlt` | | Relative path or absolute URL; auto-detected from `images/cover.*` when omitted |
| `readingTime` | | Overrides the computed value |
| `canonicalUrl` | | Set when the article was first published elsewhere |
| `placeholder` | | Renders the “sample content” banner |
| `relatedProjects` / `relatedServices` | | Slugs used for internal links |

### Projects (`ProjectFrontmatter`)

Same core fields, plus: `role`, `client`, `timeline`, `technologies`, `outcome`, `order` (index
ordering), `liveUrl`, `repoUrl`, `metrics`, `gallery`, `relatedArticles`, `relatedServices`.

---

## SEO

SEO is treated as architecture rather than a plugin. Everything is generated from the content layer
so it cannot drift:

- **One `buildMetadata()` helper** produces title, description, canonical, Open Graph and Twitter
  tags for every page. Canonicals are never inherited accidentally from a parent layout.
- **`sitemap.ts`** includes only indexable URLs — drafts are excluded, `/search` is excluded, and
  taxonomy pages are added only once they contain at least `MIN_TAXONOMY_POSTS` (2) posts.
- **`robots.ts`** allows public pages and disallows `/api/` and `/search`.
- **`rss.xml`** is generated from the same posts as the blog index.
- **JSON-LD** is emitted only where it accurately describes visible content.
- **Generated OG images** at `/api/og?title=…` keep social cards in sync with content.
- **Structured identity** comes from one place (`src/config/site.ts`), so name, title and profile
  links stay consistent across metadata, structured data and the UI.

To change the taxonomy indexing threshold, edit `MIN_TAXONOMY_POSTS` in `src/lib/content/shared.ts`.

---

## Architecture decisions

- **Server Components by default.** The only client components are the theme toggle, the mobile
  menu, the search filter, the project filter, the reading progress bar, share controls, the
  copy-code enhancer and the contact form.
- **Static rendering everywhere it is possible.** All content routes are prerendered at build time.
  Only `/search` and `/api/contact` render per request.
- **Content lives in the repository.** No database, no CMS, no external API. Adding an article is one
  folder and one commit.
- **Fail the build, not the page.** Missing or invalid frontmatter throws during the build.
- **Progressive enhancement over client-side rendering.** The article is complete server-rendered
  HTML; copy buttons, the TOC highlight and the filters are enhancements on top.
- **Colocated images, copied at build time.** Authors get a natural folder layout without a runtime
  image route.
- **Security headers without a nonce.** A nonce-based CSP would force every page to render
  dynamically. The current policy is permissive for inline scripts and styles (required by statically
  rendered Next.js) but locks down framing, plugins, form targets and object embedding. See
  `next.config.ts` for the upgrade path.

---

## Quality checks

```bash
npm run format:check   # formatting
npm run lint           # ESLint (includes React Compiler and a11y-oriented rules)
npm run typecheck      # TypeScript, strict
npm run build          # production build + type checking
```

Before launching, also verify by hand:

- [ ] Keyboard-only navigation of the header, mobile menu, forms and search
- [ ] Focus visibility on every interactive element
- [ ] Contrast in both light and dark themes
- [ ] `prefers-reduced-motion` disables the reveal and progress animations
- [ ] Every route resolves and `/does-not-exist` returns a branded 404
- [ ] `/sitemap.xml`, `/robots.txt`, `/rss.xml` and `/api/og` respond correctly
- [ ] Canonicals point at your real domain (set `NEXT_PUBLIC_SITE_URL`)
- [ ] Contact form success **and** error states
- [ ] Lighthouse on mobile and desktop
- [ ] Structured data validates (Rich Results Test)
- [ ] No placeholder content remains

---

## Deploying to Hostinger

The site needs a **Node.js runtime** — it uses route handlers (contact form, OG images) and Next.js
server rendering. It cannot be deployed as a plain static upload.

> Hostinger's control panel changes over time. Confirm the current labels against Hostinger's
> official Node.js documentation; the values below are what you need to supply.

### 0. Prerequisites

- A Hostinger plan that supports Node.js applications (Business/Cloud hosting with Node.js support,
  or a VPS).
- The repository pushed to GitHub (recommended) or uploaded.
- Node.js **20.9+** available in the hosting environment.

### 1. Prepare the repository

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Commit and push to `main`.

### 2. Create the Node.js application

1. In **hPanel**, open the Node.js application section (often under *Advanced* → *Node.js* or
   *Web Apps*).
2. Create a new application and connect your GitHub repository (or upload the project).
3. Set the **Node.js version** to 20 or newer.
4. Set the **application root** to the repository root.
5. Set the **install command** to `npm ci` (or `npm install` if there is no lockfile).
6. Set the **build command** to `npm run build`.
7. Set the **start command** to `npm run start` (equivalently `next start`). Hostinger provides the
   `PORT` environment variable — Next.js reads it automatically.

### 3. Configure environment variables

Add these in the application's environment variable section (never commit them):

```text
NEXT_PUBLIC_SITE_URL=https://mizanursguide.com
NEXT_PUBLIC_CONTACT_EMAIL=mizanur@convodigital.com
CONTACT_WEBHOOK_URL=https://formspree.io/f/xxxxxxxx
NEXT_PUBLIC_NEWSLETTER_URL=
NODE_ENV=production
```

`NEXT_PUBLIC_*` variables are inlined at **build** time, so rebuild the application after changing
them.

### 4. Build and start

Run the build (Hostinger does this automatically if configured), then start the application. Watch
the logs for a successful `Ready` message.

### 5. Domain and SSL

1. Point your domain (or subdomain) at the application in hPanel.
2. Issue a free SSL certificate (Let's Encrypt) and force HTTPS.
3. Because HTTPS is enforced, `Strict-Transport-Security` from `next.config.ts` will take effect.

### 6. Verify after deploy

```bash
curl -I https://mizanursguide.com
curl -s https://mizanursguide.com/robots.txt
curl -s https://mizanursguide.com/sitemap.xml | head
curl -s https://mizanursguide.com/rss.xml | head
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" "https://mizanursguide.com/api/og?title=Test"
```

Then check:

- [ ] Every route in `/sitemap.xml` returns 200
- [ ] Canonical URLs use your real domain
- [ ] Open Graph images render (share a link in a preview tool)
- [ ] The contact form delivers (submit a real test message)
- [ ] Security headers are present (`curl -I`)
- [ ] `NEXT_PUBLIC_SITE_URL` is correct — a wrong value silently breaks canonicals

### 7. Updating the site

Publishing an article is a normal commit: add the MDX folder, commit, push. Rebuild and restart the
application (or let the connected GitHub deployment do it).

---

## Deploying elsewhere

The project has no Hostinger-specific code. On Vercel or Netlify:

1. Import the repository.
2. Set the same environment variables.
3. Build command `npm run build`, output handled by the platform.

For a VPS or Docker host, run `npm run build` then `next start`. If you prefer a self-contained
bundle, add `output: "standalone"` to `next.config.ts` and run the generated server instead.

---

## Git workflow

```text
feature branch → commit → pull request → review/CI → main → deploy
```

- CI (`.github/workflows/ci.yml`) runs formatting, lint, typecheck and build on every pull request
  and push to `main`.
- Never commit `.env`, `.env.local`, API keys or secrets — `.gitignore` covers them.
- Never commit `.next/`, `node_modules/` or `public/content/` (generated at build time).

Suggested first-time setup:

```bash
git init
git add .
git commit -m "Initial commit: portfolio and blog platform"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

---

## Security notes

- Secrets live only in environment variables; nothing sensitive is imported into client code.
- The contact form validates on both client and server, uses a honeypot field and a fill-time check,
  and rate-limits by IP.
- **Rate limiting is in-process memory.** On a multi-instance or serverless deployment it is
  per-instance only. If you need durable limits, move it to a shared store (Redis, Upstash) in
  `src/app/api/contact/route.ts`.
- The contact endpoint is a webhook forwarder: it does not store submissions. Choose a delivery
  provider you trust with the data.
- Security headers are set in `next.config.ts`. The CSP is documented there, including how to tighten
  it if you add third-party scripts.
- Run `npm audit` periodically and keep dependencies current.

---

## Deliberately not included

These were evaluated and left out because they add cost without improving the site at this size:

- **Analytics** — not installed. The `.env.example` documents how to add a privacy-conscious option.
- **Comments** — no strong reason to add them; they add moderation and privacy burden.
- **Command palette** — the `/search` page plus the header link covers the need with less JavaScript.
- **A database or CMS** — content in the repository is simpler and faster.
- **Animation libraries** — the few animations are CSS and respect `prefers-reduced-motion`.

If you add one of these, follow the same rule the rest of the project does: justify it against a real
requirement, and keep the client bundle small.

---

## License

The code in this repository is yours to use and adapt. Follow [CONTENT.md](./CONTENT.md) when
adding content. Third-party fonts are served by `next/font` under their own licenses (Inter, Newsreader
and JetBrains Mono are all SIL Open Font License).
