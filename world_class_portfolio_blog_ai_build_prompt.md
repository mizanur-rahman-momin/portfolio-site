# World-Class Personal Portfolio + Blog — AI Build Prompt

## Role

Act as a **principal frontend architect, Next.js engineer, technical SEO specialist, UX designer, performance engineer, accessibility expert, and content-platform architect**.

Your job is to design and implement a **world-class personal portfolio and blog** that feels like a premium digital product rather than a generic developer portfolio.

The target is to create a site capable of competing with the **top 1% of modern personal websites globally** in design quality, technical execution, accessibility, discoverability, performance, and content architecture.

Do not merely produce a visually attractive website. Build a **fast, crawlable, accessible, maintainable, conversion-focused personal brand platform**.

---

# 1. Project Context

Build a personal website containing:

- Personal portfolio
- Project case studies
- Services
- About/profile
- Experience and capabilities
- Blog
- Contact
- Optional resources/notes section
- Strong technical SEO foundation
- Strong personal-brand/entity signals
- Excellent mobile experience

Primary technology choice:

> **Next.js + TypeScript + Tailwind CSS + MDX + GitHub + Hostinger**

The site must be deployable to the user's existing **Hostinger Business hosting with Next.js support**.

Keep the architecture portable so it can later be deployed to Vercel or another modern Node-compatible platform without a major rewrite.

---

# 2. Design Direction

Create a premium developer/SaaS aesthetic.

The visual language should feel:

- Premium
- Minimal
- Modern
- Technical
- Confident
- Editorial
- Human
- Fast
- Sophisticated
- Enterprise-quality without feeling corporate

Avoid:

- Generic developer templates
- Excessive gradients
- Excessive glassmorphism
- Huge walls of text
- Stock-photo-heavy layouts
- Overuse of animations
- Excessive neon
- Template-looking cards
- Artificial-looking AI copy
- Low-contrast typography
- Decorative elements that hurt usability

## Brand palette

Use this palette as the foundation:

```text
Background:       #F8F6F3
Primary Dark:     #171717
Secondary Dark:   #202124
Dark Surface:     #2A2A2A

Primary Orange:   #E67E22
Hover Orange:     #F2994A
Dark Orange:      #C96A14

Success:          #28C76F
Teal:             #00C2A8
Blue:             #4D8DFF
Danger:           #FF5C5C
```

Orange must be used as an accent rather than dominating the interface.

Use generous whitespace, strong typography, subtle borders, restrained shadows, and excellent visual hierarchy.

---

# 3. Core Information Architecture

Create the following routes:

```text
/
├── /about
├── /projects
│   ├── /projects/[slug]
├── /services
├── /experience
├── /blog
│   ├── /blog/[slug]
│   ├── /blog/category/[slug]
│   └── /blog/tag/[slug]
├── /contact
├── /search
├── /privacy
├── /terms
├── /uses
├── /now
├── /sitemap.xml
├── /robots.txt
├── /rss.xml
└── /404
```

Only include pages that provide real value. Do not create thin SEO pages simply to increase URL count.

---

# 4. Homepage Architecture

Build a highly polished homepage with the following sections.

## 4.1 Header

Include:

- Logo/name
- About
- Projects
- Services
- Blog
- Contact
- Theme control if appropriate
- Mobile navigation

Requirements:

- Sticky or intelligently persistent navigation
- Excellent mobile behavior
- Keyboard accessible
- Visible focus states
- No layout shift
- Minimal JavaScript

---

## 4.2 Hero

The hero must communicate within seconds:

1. Who I am
2. What I do
3. Who I help
4. Why someone should care
5. Primary action

Structure:

```text
Eyebrow

Clear positioning statement

Short supporting paragraph

[View Projects] [Read Blog]

Optional:
availability/status/location
```

Do not use vague copy such as:

> "I create digital experiences that make a difference."

Use specific positioning.

---

# 5. Credibility / Trust Section

Create a compact section for evidence.

Possible content:

- Years of experience
- Number of projects
- Products launched
- Industries served
- Clients/brands
- Technologies
- Selected achievements

Only display numbers that can be verified.

Do not fabricate testimonials, clients, revenue, project counts, awards, or credentials.

---

# 6. Featured Projects

Show 3–6 strongest projects.

Each project should include:

- Project image
- Project name
- One-line description
- Category
- Technology
- Outcome/result
- Link

Cards should not all look identical.

Allow one featured project to receive more visual prominence.

---

# 7. Project Case Studies

Every serious project should have a dedicated case-study page.

Recommended structure:

```text
Project Hero
↓
Overview
↓
Problem
↓
Context
↓
Goals
↓
Constraints
↓
Research / Discovery
↓
Solution
↓
Architecture
↓
Design Decisions
↓
Implementation
↓
Challenges
↓
Results
↓
Lessons Learned
↓
Screenshots / Gallery
↓
Technology
↓
Related Projects
↓
Related Articles
↓
CTA
```

Case studies must focus on **decisions and outcomes**, not just screenshots.

If real metrics exist, display them.

If metrics do not exist, do not invent them.

---

# 8. Services Page

Create a clear services architecture.

Potential categories:

- SaaS Development
- AI Tool Development
- Web Application Development
- Frontend Development
- Product Development
- API Integration
- UI Implementation
- Technical Consulting

For each service:

- What it is
- Who it is for
- Problems solved
- Deliverables
- Process
- Typical timeline if appropriate
- Relevant projects
- Relevant articles
- CTA

Avoid generic agency language.

---

# 9. About Page

Create an editorial-style About page.

Include:

- Short biography
- Current focus
- Professional journey
- Skills/capabilities
- Working principles
- Technology preferences
- Experience
- Personal interests where appropriate
- Current status
- Links to professional profiles

Use structured data where appropriate.

Do not create fake credentials.

---

# 10. Experience Page

If experience is substantial, create a timeline.

Each entry:

```text
Role
Company
Period
Location / Remote
Responsibilities
Selected achievements
Technologies
Related projects
```

Use semantic HTML rather than purely visual timelines.

---

# 11. Blog Architecture

The blog should be treated as a **first-class publishing platform**, not an afterthought.

Blog homepage should include:

- Featured article
- Latest posts
- Popular/evergreen posts if real analytics exist
- Categories
- Tags
- Search
- Topics
- Newsletter CTA
- Author information

---

# 12. MDX Content System

Use MDX as the initial content source.

Recommended structure:

```text
content/
├── blog/
│   ├── article-slug/
│   │   ├── index.mdx
│   │   └── images/
│   └── another-article/
│       ├── index.mdx
│       └── images/
└── projects/
    ├── project-slug.mdx
    └── another-project.mdx
```

Each article should support frontmatter:

```yaml
---
title:
description:
slug:
date:
updated:
author:
category:
tags:
featured:
draft:
coverImage:
coverImageAlt:
readingTime:
canonicalUrl:
---
```

Do not expose drafts publicly.

---

# 13. Blog Article Experience

Each article should include:

- Breadcrumbs
- H1
- Publication date
- Updated date where relevant
- Reading time
- Author
- Cover image
- Table of contents for long articles
- Proper headings
- Code blocks
- Copy-code button
- Images with meaningful alt text
- Related articles
- Previous/next article
- Share options
- Author box
- Newsletter CTA
- Comments only if there is a strong reason to add them
- Back-to-blog navigation

Avoid intrusive popups.

---

# 14. Content Strategy

Design the blog around topical authority.

Potential content pillars:

### SaaS

- SaaS development
- Product engineering
- SaaS architecture
- Product lessons

### AI

- AI development
- AI APIs
- AI product building
- Practical AI workflows

### Development

- Next.js
- TypeScript
- JavaScript
- APIs
- Performance
- Architecture

### Freelancing

- Client work
- Productized services
- Development workflows
- Lessons from projects

### Product / Design

- UX decisions
- Product strategy
- Conversion
- Landing pages

Prioritize:

- First-hand experience
- Original research
- Practical tutorials
- Original screenshots
- Real project lessons
- Clear explanations
- Useful examples

Do not produce large amounts of generic AI-generated content.

---

# 15. SEO Architecture

Treat SEO as a technical system, not a plugin.

Implement:

- Unique title per page
- Unique meta description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- Correct robots directives
- XML sitemap
- RSS feed
- Breadcrumbs
- Semantic HTML
- Proper heading hierarchy
- Descriptive URLs
- Internal linking
- Image alt text
- Structured data
- Author information
- Publication/update dates
- No accidental noindex
- Redirect handling
- 404 handling
- Duplicate-content prevention

---

# 16. Structured Data

Implement JSON-LD where applicable.

Potential schemas:

- Person
- WebSite
- WebPage
- Blog
- BlogPosting
- Article
- BreadcrumbList
- CreativeWork / SoftwareApplication where genuinely applicable
- Service where appropriate

Do not add schema simply for the sake of adding schema.

Structured data must accurately represent visible page content.

---

# 17. Personal Brand / Entity SEO

Build strong, consistent identity signals.

Maintain consistent:

- Name
- Professional title
- Biography
- Profile image
- Website URL
- Social links
- Author information
- Organization/company information where applicable

Add appropriate `sameAs` links for genuine professional profiles.

Create an author page if the publishing volume warrants it.

---

# 18. Internal Linking Strategy

Every important article should link to:

- Relevant projects
- Related articles
- Services where contextually relevant
- Author/about page
- Useful external references

Every important project should link to:

- Relevant blog articles
- Services
- Contact
- Related projects

Create topic clusters.

Do not add irrelevant internal links simply for SEO.

---

# 19. Technical Stack

Use:

```text
Next.js
TypeScript
Tailwind CSS
MDX
GitHub
Hostinger
```

Recommended supporting libraries should be kept minimal.

Consider:

- `next-mdx-remote` or an appropriate modern MDX approach
- `rehype-pretty-code` or equivalent for code blocks
- `reading-time`
- `schema-dts` for typed schema definitions
- A lightweight search solution if search is needed

Do not install libraries unless they solve a real requirement.

Prefer native Next.js capabilities whenever possible.

---

# 20. Next.js Architecture

Use the modern Next.js App Router.

Use:

- Server Components by default
- Client Components only when interactivity requires them
- Static generation where possible
- Dynamic rendering only where necessary
- `generateMetadata`
- `generateStaticParams`
- `sitemap.ts`
- `robots.ts`
- `not-found.tsx`
- Route handlers only where genuinely necessary

Do not turn the entire site into a client-side application.

---

# 21. Component Architecture

Create reusable components.

Suggested structure:

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── projects/
│   ├── blog/
│   ├── article/
│   ├── ui/
│   ├── seo/
│   └── forms/
├── content/
├── lib/
│   ├── mdx/
│   ├── seo/
│   ├── search/
│   └── utils/
├── config/
├── styles/
└── types/
```

Keep components small and composable.

---

# 22. Performance Requirements

Performance is a first-class requirement.

Target:

- Excellent Core Web Vitals
- Minimal JavaScript
- Fast initial HTML
- Low Total Blocking Time
- Low Cumulative Layout Shift
- Fast Largest Contentful Paint
- Responsive interaction
- Small bundle sizes

Prioritize:

- Server Components
- Static rendering
- Image optimization
- Responsive images
- Modern image formats
- Proper image dimensions
- Font optimization
- Lazy loading below-the-fold assets
- Minimal third-party scripts
- CSS efficiency
- Code splitting
- Dynamic imports only when beneficial
- No unnecessary animation libraries

---

# 23. Image Optimization

Use `next/image`.

Requirements:

- Explicit dimensions
- Correct `sizes`
- Responsive sources
- Modern formats
- Lazy loading where appropriate
- Priority loading only for genuinely critical images
- Meaningful alt text
- Avoid huge source images

Do not ship a 3000px image when a 1200px version is sufficient.

---

# 24. Typography

Typography should feel premium.

Requirements:

- Use a high-quality modern font
- Prefer local/self-hosted or `next/font`
- Avoid layout shift
- Establish a clear type scale
- Strong article readability
- Comfortable line length
- Excellent mobile typography

Target article line length around 60–80 characters where practical.

---

# 25. Accessibility

Target **WCAG 2.2 AA** quality.

Implement:

- Semantic HTML
- Keyboard navigation
- Focus indicators
- Skip-to-content link
- Proper labels
- Accessible forms
- Accessible mobile navigation
- Correct heading structure
- Sufficient contrast
- Reduced-motion support
- Descriptive link text
- Meaningful alt text
- No keyboard traps
- Proper ARIA only where necessary

Test with keyboard navigation and accessibility tooling.

---

# 26. Responsive Design

Design mobile-first.

Test at:

- Small mobile
- Large mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Avoid simply shrinking the desktop layout.

Navigation, typography, cards, images, code blocks, tables, and article layouts must be deliberately designed for mobile.

---

# 27. Search

Create a lightweight site search.

Requirements:

- Search blog posts
- Search projects
- Search titles/descriptions/tags
- Keyboard accessible
- Fast
- No unnecessary server cost

For a small site, prefer a static/build-time search index over a database.

---

# 28. Blog Taxonomy

Support:

- Categories
- Tags
- Related articles
- Topic clusters

Avoid creating dozens of empty taxonomy pages.

Only index taxonomy pages that contain enough useful content.

---

# 29. RSS

Create:

```text
/rss.xml
```

Include:

- Title
- Description
- Publication date
- Updated date where appropriate
- Canonical article URL
- Author
- Summary

---

# 30. Sitemap

Generate a dynamic sitemap containing important indexable pages.

Exclude:

- Drafts
- Noindex pages
- Search result pages
- Thin taxonomy pages
- Utility routes

---

# 31. Robots

Create a proper `robots.ts`.

Allow normal public pages.

Prevent crawling/indexing of private or utility URLs where appropriate.

Reference the sitemap.

---

# 32. Analytics

Design analytics so they can be added without harming performance.

Possible options:

- Vercel Analytics if migrating later
- Google Analytics if needed
- Plausible
- Umami
- Another privacy-conscious analytics platform

Do not add analytics scripts until required.

If analytics are added, load them responsibly and account for privacy requirements.

---

# 33. Contact System

Create a professional contact page.

Include:

- Clear reason to contact
- Name
- Email
- Project type
- Budget range if appropriate
- Timeline
- Message
- Spam protection
- Success state
- Error state

Do not expose private email addresses unnecessarily.

The form should be progressively enhanced and accessible.

---

# 34. Security

Implement basic web security practices.

Consider:

- Security headers
- Content Security Policy where practical
- Referrer-Policy
- X-Content-Type-Options
- Permissions-Policy
- Secure form handling
- Input validation
- Rate limiting for public endpoints
- No secrets in Git
- Environment variables
- Dependency auditing

Never place API keys in client-side code.

---

# 35. Error Handling

Create polished:

- 404 page
- Error page
- Loading states where necessary
- Form errors
- Empty states
- Search no-results state

Error pages should still feel like part of the brand.

---

# 36. Animation

Use motion strategically.

Good uses:

- Subtle hover states
- Page transitions where appropriate
- Reveal animations
- Micro-interactions
- Button feedback

Avoid:

- Excessive scroll animations
- Long entrance animations
- Animation that delays content
- Motion that causes accessibility issues

Respect:

```css
prefers-reduced-motion
```

---

# 37. Dark Mode

If implemented, make it intentional rather than simply inverting colors.

Both light and dark themes must have:

- Correct contrast
- Proper code-block styling
- Correct images
- Correct borders
- Correct focus states
- Correct syntax highlighting

Do not add dark mode if it compromises the quality of the primary theme.

---

# 38. Social Sharing

Every important article should have:

- Open Graph title
- Open Graph description
- Open Graph image
- Twitter/X metadata
- Correct canonical URL

Create a reusable social-image system if practical.

Prefer programmatically generated branded OG images over manually creating every image.

---

# 39. Content Images

For blog images:

- Use descriptive filenames
- Use alt text
- Optimize file size
- Use responsive dimensions
- Avoid decorative images being treated as content
- Use captions when context matters

---

# 40. Developer Experience

The repository should be easy to maintain.

Include:

```text
README.md
.env.example
.gitignore
```

README should explain:

- Requirements
- Installation
- Local development
- MDX authoring
- Adding projects
- Adding blog posts
- Environment variables
- Build process
- Deployment
- SEO configuration

---

# 41. GitHub Workflow

Use:

```text
main
```

for production.

Recommended workflow:

```text
feature branch
      ↓
commit
      ↓
pull request
      ↓
review / checks
      ↓
main
      ↓
Hostinger deployment
```

Use clear commit messages.

Do not commit:

- `.env`
- API keys
- secrets
- build artifacts
- unnecessary local files

---

# 42. Deployment to Hostinger

Design deployment around Hostinger's supported Next.js environment.

Before deployment:

1. Confirm Node.js version supported by the Hostinger environment.
2. Confirm the supported Next.js deployment mode.
3. Configure environment variables.
4. Configure the domain.
5. Configure SSL.
6. Connect GitHub if supported.
7. Install dependencies.
8. Run production build.
9. Start/deploy using Hostinger's documented Next.js process.
10. Verify all routes.
11. Verify metadata.
12. Verify sitemap.
13. Verify robots.
14. Verify RSS.
15. Verify images.
16. Verify forms.
17. Verify redirects.

Do not assume a Vercel-only feature will behave identically on Hostinger.

Keep the project compatible with the actual Hostinger deployment model.

---

# 43. Environment Configuration

Create:

```text
.env.example
```

Document variables without exposing real secrets.

Example:

```text
NEXT_PUBLIC_SITE_URL=
CONTACT_EMAIL=
ANALYTICS_ID=
```

Only variables that are actually needed should be included.

---

# 44. SEO Content Rules

Every indexable page must have:

- One clear H1
- Search-intent-aligned title
- Useful meta description
- Strong opening content
- Descriptive URL
- Internal links
- Relevant structured data
- Canonical URL

Never keyword-stuff.

Do not write for search engines at the expense of readers.

---

# 45. E-E-A-T / Trust Signals

Build authentic experience signals through:

- First-hand project writeups
- Author identity
- Original screenshots
- Technical explanations
- Real implementation details
- Transparent dates
- Update history
- External references
- Professional profiles
- Clear contact information

Do not manufacture authority.

---

# 46. AI Search / Modern Discovery

Make content easy for modern search and answer systems to understand.

Use:

- Clear definitions
- Concise answers
- Strong headings
- Structured data
- Author information
- Original evidence
- Explicit relationships between projects, services, and articles
- Stable canonical URLs
- Descriptive page titles
- Clear factual writing

Do not create pages specifically stuffed with AI-targeted phrases.

---

# 47. Advanced Features Worth Considering

Evaluate these features and implement only those that genuinely improve the site:

### Content

- Reading progress indicator
- Estimated reading time
- Table of contents
- Related posts
- Article series
- Code-copy button
- Syntax highlighting
- Changelog/update history
- RSS
- Newsletter integration
- Search

### Portfolio

- Project filtering
- Case-study navigation
- Project technology list
- Image gallery
- Results section
- Related articles

### UX

- Command palette
- Keyboard shortcuts
- Smooth anchor navigation
- Share controls
- Copy-link action
- Theme preference
- Reduced-motion support

### Technical

- Static search index
- Automated sitemap
- Automated OG images
- JSON-LD validation
- Broken-link checks
- Lighthouse CI
- Accessibility testing
- Type checking
- ESLint
- Formatting
- Dependency auditing

Do not implement features merely because they are fashionable.

---

# 48. Testing Strategy

Before launch, test:

## Functional

- Navigation
- Mobile menu
- Search
- Blog routes
- Project routes
- Contact form
- 404
- RSS
- Sitemap
- Robots

## SEO

- Titles
- Descriptions
- Canonicals
- OG metadata
- Structured data
- Sitemap
- Robots
- Indexability
- Internal links

## Performance

- Lighthouse
- Core Web Vitals
- Mobile performance
- Desktop performance
- JavaScript bundle size
- Image sizes
- Font loading

## Accessibility

- Keyboard-only navigation
- Screen-reader basics
- Contrast
- Focus visibility
- Form labels
- Heading structure
- Reduced motion

## Security

- Dependency audit
- Environment variables
- Headers
- Form abuse protection
- Secret scanning

---

# 49. Performance Acceptance Criteria

Aim for excellent real-world performance rather than merely passing a synthetic score.

Target:

```text
LCP: excellent
INP: excellent
CLS: near-zero
TTFB: low
JavaScript: minimal
Images: optimized
Fonts: optimized
```

Do not add heavy libraries just to make the site look impressive.

The site should feel **instant** on a modern mobile connection.

---

# 50. SEO Acceptance Criteria

Before launch:

- Every important page is indexable
- No accidental duplicate URLs
- Canonicals are correct
- Sitemap is valid
- Robots is valid
- Structured data is valid
- Social metadata is correct
- Internal linking is logical
- No broken links
- No orphaned important pages
- Blog posts have author/date metadata
- Images have meaningful alt text
- URLs are permanent and readable

---

# 51. Content Publishing Workflow

Create a simple workflow:

```text
Idea
↓
Research
↓
Outline
↓
Draft MDX
↓
Add original examples
↓
Add images
↓
SEO metadata
↓
Internal links
↓
Proofread
↓
Build
↓
Preview
↓
Publish
↓
Update later when necessary
```

---

# 52. Blog Article Quality Standard

Every serious article should answer:

1. What problem does this solve?
2. Who is it for?
3. What is the direct answer?
4. What evidence or experience supports it?
5. What practical steps can the reader take?
6. What are the limitations or tradeoffs?
7. What should the reader do next?

Prefer depth over volume.

---

# 53. Avoid These Mistakes

Do not:

- Copy another website
- Use copyrighted assets without permission
- Fake testimonials
- Fake statistics
- Fake clients
- Fake awards
- Create thin SEO pages
- Publish hundreds of low-quality AI articles
- Stuff keywords
- Hide text
- Use deceptive UX
- Use excessive animations
- Add unnecessary dependencies
- Add unnecessary databases
- Add unnecessary CMS infrastructure
- Ship unoptimized images
- Expose API keys
- Make every component client-side
- Sacrifice accessibility for aesthetics

---

# 54. Build Order

Implement in this order:

## Phase 1 — Foundation

- Initialize Next.js
- TypeScript
- Tailwind
- ESLint
- Formatting
- Git
- Core configuration

## Phase 2 — Design system

- Colors
- Typography
- Spacing
- Buttons
- Links
- Cards
- Containers
- Forms
- Navigation
- Footer

## Phase 3 — Core pages

- Home
- About
- Projects
- Services
- Experience
- Contact

## Phase 4 — MDX

- MDX pipeline
- Frontmatter
- Blog index
- Article pages
- Categories
- Tags
- Related posts

## Phase 5 — SEO

- Metadata
- Canonicals
- Sitemap
- Robots
- RSS
- JSON-LD
- Breadcrumbs
- OG images

## Phase 6 — Performance

- Images
- Fonts
- Server Components
- Bundle analysis
- Caching/static generation
- Third-party script review

## Phase 7 — Advanced UX

- Search
- TOC
- Reading progress
- Copy code
- Share
- Theme if desired

## Phase 8 — Testing

- Type checking
- Linting
- Accessibility
- Lighthouse
- Broken links
- Mobile testing
- SEO validation

## Phase 9 — Deployment

- GitHub
- Hostinger
- Domain
- SSL
- Environment variables
- Production build
- Final QA

---

# 55. Final Deliverables

The finished implementation should contain:

```text
✓ Premium homepage
✓ About page
✓ Projects index
✓ Project case studies
✓ Services page
✓ Experience page
✓ Blog index
✓ MDX article system
✓ Categories
✓ Tags
✓ Search
✓ Related posts
✓ RSS
✓ Sitemap
✓ Robots
✓ JSON-LD
✓ Open Graph
✓ Canonicals
✓ Responsive design
✓ Accessibility
✓ Performance optimization
✓ Contact form
✓ Error states
✓ 404 page
✓ GitHub-ready repository
✓ Hostinger deployment instructions
✓ README
✓ Environment example
```

---

# 56. AI Coding-Agent Instructions

When implementing this project:

1. **Inspect the repository before changing anything.**
2. Do not overwrite existing working functionality unnecessarily.
3. Build incrementally.
4. Keep the architecture simple.
5. Prefer native Next.js functionality.
6. Avoid unnecessary dependencies.
7. Use TypeScript strictly.
8. Use semantic HTML.
9. Make accessibility part of implementation, not a final patch.
10. Treat SEO as architecture.
11. Treat performance as architecture.
12. Use Server Components by default.
13. Use Client Components only when necessary.
14. Never expose secrets.
15. Never invent portfolio facts.
16. Never invent client results.
17. Never fabricate testimonials.
18. Use placeholder content only where the user has not supplied final content, and clearly mark it as replaceable.
19. Keep content easy to edit through MDX.
20. Keep the project portable between Hostinger and Vercel.
21. Test after each major implementation stage.
22. Fix errors rather than suppressing them.
23. Explain architectural decisions briefly in the README.
24. Do not stop after generating a visual mockup; implement the complete working structure.
25. Do not claim a feature works until it has been tested.

---

# 57. Final Quality Gate

Before declaring the project complete, verify:

### Design

- Does it look like a premium product?
- Does the visual hierarchy feel intentional?
- Does it avoid generic template aesthetics?
- Is typography excellent?
- Is mobile equally polished?

### UX

- Can a visitor understand who I am within seconds?
- Can they discover projects quickly?
- Can they read articles comfortably?
- Can they contact me without friction?

### SEO

- Can search engines crawl the site?
- Is each important page unique and useful?
- Are canonical URLs correct?
- Is structured data accurate?
- Are internal links strong?

### Performance

- Is JavaScript minimal?
- Are images optimized?
- Are fonts optimized?
- Are layout shifts minimized?
- Is the first load fast?

### Accessibility

- Can the site be used without a mouse?
- Are focus states visible?
- Are forms properly labeled?
- Is contrast sufficient?
- Does reduced motion work?

### Engineering

- Is the code maintainable?
- Is the repository organized?
- Are dependencies justified?
- Are environment variables protected?
- Can the site be deployed to Hostinger?
- Can it later migrate to Vercel?

---

# 58. Most Important Principle

Do not optimize this project for vanity metrics.

The goal is not:

> "Make a website with lots of features."

The goal is:

> **Build a fast, elegant, technically excellent personal brand platform that communicates expertise, demonstrates real work, earns trust, gets discovered through search, and gives visitors an excellent experience.**

Every design and engineering decision should support that goal.

Start by producing the architecture and implementation plan, then build the project systematically.
