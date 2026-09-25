# Content guidelines

How content on this site is written, reviewed and published. These rules exist so
the site stays honest, readable and easy to keep up to date.

## Voice

- Write in simple English.
- Use short sentences. One idea per sentence.
- Prefer plain words over jargon. If a term is necessary, explain it once.
- Write like a person, not a brochure. Avoid AI-sounding phrases such as
  "in today's fast-paced world", "unlock the power of" or "it's not just X, it's Y".
- Be direct. Do not pad with long introductions or repetitive conclusions.
- Professional but friendly.

## Readability targets

Measured with the Flesch Reading Ease score:

| Content | Target |
| --- | --- |
| Short marketing copy (hero, CTAs, cards) | 90+ |
| Service pages and case studies | 80–90 |
| Blog articles | 80–90 |

A score of 95+ is not realistic on pages that must stay specific. Specific
details — tools, steps, decisions — are worth more than a perfect score. When the
two conflict, keep the detail and accept a lower score.

You can check a file with a small script or an online Flesch calculator. Read the
text out loud as a second check: if you run out of breath, the sentence is too
long.

## Honesty rules

- **Never invent metrics.** If a number cannot be verified, leave it out.
- **Never invent clients, testimonials or awards.** Only publish what is real and
  permitted.
- **Do not name clients** unless they have agreed to be named.
- **Do not present unfinished products as shipped.** Sublix and PostNow are in
  development and must be described that way everywhere they appear.
- **Do not publish private information** — family, finances, banking, personal
  travel plans — anywhere in the repository.
- Keep dates accurate. A wrong date on a public profile is worse than a missing
  one.

## Frontmatter flags

Every MDX file can carry these flags:

| Flag | Meaning |
| --- | --- |
| `draft: true` | Work in progress. Excluded from production builds. |
| `placeholder: true` | Sample content. Renders a visible "sample content" banner. |

Set `placeholder: false` (or remove it) once the content is real. The site config
has a matching switch: `containsPlaceholders` in `src/config/site.ts` should only
be `true` while placeholder content still exists.

## Article quality standard

- Answer the main question near the top of the article.
- Use headings that describe the section, not teasers.
- Add a list, table or example where it helps.
- Link to one relevant service or case study where it is genuinely useful.
- End with one clear next step.
- Include the answer in the `description` frontmatter field.

## Publishing workflow

1. Write the file under `content/blog/<slug>/index.mdx` or
   `content/projects/<slug>.mdx`.
2. Add required frontmatter: `title`, `description`, `date`, `category`. Missing
   fields fail the build.
3. Use `draft: true` while writing. Drafts are excluded from production builds
   but still visible in development.
4. Run `npm run dev` and check the page, links and formatting.
5. Run `npm run format`, then `npm run format:check`, `npm run lint`,
   `npm run typecheck` and `npm run build`.
6. Remove `draft: true` when the piece is ready.
7. Add cross-links by hand: `relatedArticles` on projects, `relatedProjects` and
   `relatedServices` on articles and services. Broken slugs fail silently, so
   check them.

## Taxonomy

`MIN_TAXONOMY_POSTS` in `src/lib/content/shared.ts` is set to `2`. A category or
tag page is only indexed (and included in the sitemap) once it has at least two
articles. This keeps thin archives out of search results. New categories and tags
are created automatically from frontmatter, so no code change is needed.

## Images

Content images live next to the content and are copied into `public/content/` at
build time. Do not commit generated images to `public/content/`. Case studies and
articles render correctly without a cover image, so only add one when you have a
real screenshot or photo.

To give a blog post a cover photo, drop the image into
`content/blog/<slug>/images/` as `cover.*` (or as the only image in that folder).
It is detected automatically and the alt text defaults to the post title; set
`coverImage` and `coverImageAlt` in frontmatter to override either.
