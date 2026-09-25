import type { Metadata } from "next";
import Link from "next/link";
import { SocialLinks } from "@/components/navigation/SocialLinks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/icons";
import { capabilities, experience, workingPrinciples } from "@/config/content";
import { siteConfig } from "@/config/site";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { profilePageSchema, organizationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "About Mizanur Rahman Momin",
  description: `About ${siteConfig.name}, a B2B lead generation expert and founder of Convo Digital. Background, current focus, working principles and capabilities.`,
  keywords: ["Mizanur Rahman Momin", "B2B lead generation expert", "Convo Digital", "about"],
  path: "/about",
  eyebrow: "About",
});

export default function AboutPage() {
  const projectCount = getAllProjects().length;
  const articleCount = getAllBlogPosts().length;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        className="sr-only"
      />
      <JsonLd
        data={[
          profilePageSchema({
            name: `About ${siteConfig.name}`,
            description: siteConfig.description,
            path: "/about",
          }),
          organizationSchema(),
        ]}
      />

      <Section spacing="compact">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <p className="text-accent-ink font-mono text-xs font-medium tracking-[0.14em] uppercase">
                About
              </p>
              <h1 className="text-title text-fg mt-4 text-balance">
                {siteConfig.name}, {siteConfig.jobTitle.toLowerCase()}
              </h1>

              <Prose className="mt-8">
                <p>
                  I help B2B SaaS companies, founders and agencies find the right prospects and turn
                  that research into revenue. My work covers research and list building, cold email,
                  LinkedIn outreach, SaaS promotion and the automation that ties it together.
                </p>
                <p>
                  I started freelancing in 2017, doing web research, list building and email
                  marketing on Upwork, Fiverr and PeoplePerHour. In 2021 I founded Convo Digital,
                  where that freelance work became a company with repeatable systems and a small
                  team.
                </p>
                <p>
                  Today I run Convo Digital and build my own SaaS products — Sublix, a subscription
                  and trial reminder tool, and PostNow, a LinkedIn content tool. Both are in
                  development. I work with AI as a partner and care most about systems that remove
                  manual work.
                </p>
              </Prose>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Badge tone="success" dot>
                  {siteConfig.availability}
                </Badge>
                <span className="text-fg-subtle inline-flex items-center gap-2 text-sm">
                  <MapPinIcon className="size-4" aria-hidden="true" />
                  {siteConfig.location}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">
                  Work with me
                  <ArrowRightIcon width={18} height={18} />
                </ButtonLink>
                <ButtonLink href="/experience" variant="outline">
                  Experience
                </ButtonLink>
              </div>

              <SocialLinks className="mt-8" includeRss />
            </div>

            <aside className="surface-card p-6">
              <h2 className="text-fg-subtle text-sm font-semibold tracking-[0.12em] uppercase">
                At a glance
              </h2>
              <dl className="mt-5 flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-fg-subtle">Role</dt>
                  <dd className="text-fg mt-0.5">{siteConfig.jobTitle}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Based</dt>
                  <dd className="text-fg mt-0.5">{siteConfig.location}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Status</dt>
                  <dd className="text-fg mt-0.5">{siteConfig.availability}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">Published work</dt>
                  <dd className="text-fg mt-0.5">
                    <Link href="/projects" className="link-underline">
                      {projectCount} case {projectCount === 1 ? "study" : "studies"}
                    </Link>
                    {" · "}
                    <Link href="/blog" className="link-underline">
                      {articleCount} article{articleCount === 1 ? "" : "s"}
                    </Link>
                  </dd>
                </div>
              </dl>
              <p className="text-fg-subtle mt-5 text-xs leading-relaxed">
                Counts are generated from the content in this repository, so they stay accurate on
                their own.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Current focus"
            title="What I am working on now"
            description="A short summary of the problems I am spending my time on."
            action={
              <ButtonLink href="/now" variant="ghost" size="sm">
                Full now page
                <ArrowRightIcon width={16} height={16} />
              </ButtonLink>
            }
          />
          <Prose className="mt-8">
            <p>
              I am building two SaaS products: Sublix, a subscription and trial reminder tool, and
              PostNow, a LinkedIn content tool. Both are in development. Alongside that I run client
              lead generation work through Convo Digital, mostly for B2B SaaS teams.
            </p>
            <p>
              I am open to new B2B lead generation projects — research, cold email, LinkedIn
              outreach and the automation behind them. I am not taking on general web development
              work at the moment.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Journey"
            title="How I got here"
            description="A condensed version. The full history is on the experience page."
          />

          <ol className="mt-10 flex flex-col gap-8">
            {experience.map((entry, index) => (
              <li key={`${entry.role}-${index}`} className="border-border relative border-l pl-6">
                <span
                  aria-hidden="true"
                  className="bg-accent absolute top-1.5 -left-[5px] size-2.5 rounded-full"
                />
                <p className="text-fg-subtle text-sm">{entry.period}</p>
                <h3 className="text-fg mt-1 font-semibold tracking-tight">{entry.role}</h3>
                <p className="text-fg-muted text-sm">{entry.company}</p>
                <p className="text-fg-muted mt-2 max-w-2xl text-sm leading-relaxed">
                  {entry.summary}
                </p>
              </li>
            ))}
          </ol>

          <p className="text-fg-muted mt-8 text-sm leading-relaxed">
            I studied Electrical and Electronics Engineering at North Bengal International
            University (BE, 2017–2021) and Electronic Technology at Rajshahi Polytechnic Institute
            (Diploma, 2011–2016). The full history is on the{" "}
            <Link href="/experience" className="link-underline">
              experience page
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Principles"
            title="How I work"
            description="The handful of rules that decide most of the other decisions."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {workingPrinciples.map((principle) => (
              <li key={principle.title} className="surface-card p-6">
                <h3 className="text-fg font-semibold tracking-tight">{principle.title}</h3>
                <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="wide">
          <SectionHeading
            eyebrow="Capabilities"
            title="Tools and skills"
            description="What I reach for, and the practices I bring to a team."
          />
          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((group) => (
              <div key={group.group}>
                <dt className="text-fg-subtle text-xs font-semibold tracking-[0.12em] uppercase">
                  {group.group}
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-border bg-surface text-fg-muted rounded-full border px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-fg-subtle mt-8 text-xs">
            This is what I use day to day, not everything I have tried.
          </p>
        </Container>
      </Section>

      <Section divided spacing="compact">
        <Container size="narrow">
          <div className="surface-card p-8 text-center">
            <h2 className="text-fg text-2xl font-semibold tracking-tight">
              Let’s talk about what you are building
            </h2>
            <p className="text-fg-muted mt-3">
              The fastest way to find out whether I can help is a short conversation about the
              problem.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Contact me</ButtonLink>
              <ButtonLink href="/projects" variant="outline">
                See my work
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
