/**
 * Editable site content that is not tied to a single page.
 *
 * Everything here describes real work and real history. No employer, client,
 * metric or award is invented. If a number cannot be verified, it is not used.
 */

export type FocusArea = {
  title: string;
  description: string;
  icon: "layers" | "spark" | "code" | "folder";
};

/** Shown on the homepage instead of unverifiable statistics. */
export const focusAreas: FocusArea[] = [
  {
    title: "Lead generation",
    description:
      "I find the right companies and people for your offer and build a clean, usable list.",
    icon: "folder",
  },
  {
    title: "SaaS promotion",
    description:
      "I help SaaS products reach the right users through reviews, giveaways and campaigns.",
    icon: "layers",
  },
  {
    title: "Automation and AI",
    description: "I connect the tools you already use so routine work happens on its own.",
    icon: "spark",
  },
  {
    title: "Building SaaS",
    description: "I plan and build my own SaaS products, with AI as a working partner.",
    icon: "code",
  },
];

export type Service = {
  slug: string;
  name: string;
  /** One-line description used on cards. */
  summary: string;
  /** Who this is for. */
  forWho: string;
  problems: string[];
  deliverables: string[];
  process: { step: string; detail: string }[];
  /** A realistic range, or a note explaining why one cannot be given. */
  timeline: string;
  relatedProjects: string[];
  relatedArticles: string[];
};

export const services: Service[] = [
  {
    slug: "b2b-research-list-building",
    name: "B2B research and list building",
    summary:
      "I find the right companies and people for your offer, then hand you a clean, verified list.",
    forWho:
      "B2B SaaS teams, founders and agencies who know their ideal customer but do not have a reliable list.",
    problems: [
      "Your list is old, generic or full of the wrong job titles.",
      "Nobody has time to research accounts by hand.",
      "Bad data wastes every email you send.",
    ],
    deliverables: [
      "A written ideal customer profile",
      "A verified list with names, roles, companies and work emails",
      "Signals that show an account is worth contacting now",
      "A short note on how the list was built and how to keep it fresh",
    ],
    process: [
      { step: "Define", detail: "Agree who is worth contacting and why." },
      { step: "Source", detail: "Gather companies and people that match the profile." },
      { step: "Verify", detail: "Check roles, domains and email addresses." },
      { step: "Score", detail: "Rank accounts by fit and by the signals you care about." },
      { step: "Hand over", detail: "Deliver the list with a short guide to using it." },
    ],
    timeline: "Usually 1 to 2 weeks, depending on how many accounts you need.",
    relatedProjects: ["convo-digital"],
    relatedArticles: ["outbound-list-why-now-field"],
  },
  {
    slug: "cold-email-marketing",
    name: "Cold email marketing",
    summary:
      "I write and run short, personal cold email campaigns that start conversations instead of burning your domain.",
    forWho:
      "B2B teams that need new conversations but cannot afford to damage their sending reputation.",
    problems: [
      "Replies are low and nobody knows why.",
      "Emails read like a template and get ignored.",
      "Sending too much too fast puts the domain at risk.",
    ],
    deliverables: [
      "A short, clear offer for each audience",
      "A sending plan that protects your domain",
      "Personal first lines that show real research",
      "A follow-up sequence and a simple way to track replies",
    ],
    process: [
      { step: "Offer", detail: "Sharpen what you are asking for and who it is for." },
      { step: "Write", detail: "Draft short emails in plain language." },
      { step: "Warm up", detail: "Set up sending so the domain stays healthy." },
      { step: "Send", detail: "Run small batches and watch what happens." },
      { step: "Improve", detail: "Rewrite the parts that do not get replies." },
    ],
    timeline: "Setup takes about a week. The first results usually show in 2 to 3 weeks.",
    relatedProjects: ["convo-digital"],
    relatedArticles: ["outbound-list-why-now-field", "repeatable-revenue-system"],
  },
  {
    slug: "email-marketing",
    name: "Email marketing",
    summary:
      "I set up and run email that keeps your audience warm, from the first signup to the repeat customer.",
    forWho: "Small teams that collect emails but do not have a system for using them.",
    problems: [
      "People sign up and then hear nothing.",
      "Every email is written from scratch.",
      "There is no clear path from subscriber to customer.",
    ],
    deliverables: [
      "A simple set of emails for each stage of the journey",
      "Welcome, nurture and follow-up sequences",
      "A calendar so sending is planned, not rushed",
      "Plain reporting on opens, clicks and replies",
    ],
    process: [
      { step: "Map", detail: "List the moments when an email should arrive." },
      { step: "Write", detail: "Draft each email in short, clear language." },
      { step: "Build", detail: "Set up the sequences in your email tool." },
      { step: "Send", detail: "Start with the most important sequence first." },
      { step: "Review", detail: "Check the numbers and adjust the copy." },
    ],
    timeline: "Usually 2 to 4 weeks for a full set of core sequences.",
    relatedProjects: ["convo-digital"],
    relatedArticles: ["repeatable-revenue-system"],
  },
  {
    slug: "linkedin-lead-generation",
    name: "LinkedIn lead generation",
    summary:
      "I find and start conversations with the right people on LinkedIn, in a way that stays human.",
    forWho:
      "Founders and teams who want more real conversations and fewer generic connection requests.",
    problems: [
      "Connection requests go out and nothing follows.",
      "Messages sound copied and get ignored.",
      "It is hard to find the right people among so many profiles.",
    ],
    deliverables: [
      "A clear target list of people and companies",
      "A profile review so your page supports the outreach",
      "Short message templates you can make personal",
      "A simple routine for following up without being pushy",
    ],
    process: [
      { step: "Target", detail: "Choose the people and companies worth your time." },
      { step: "Review", detail: "Check that your profile gives them a reason to reply." },
      { step: "Connect", detail: "Send a short, specific note." },
      { step: "Talk", detail: "Move the conversation toward a real need." },
      { step: "Follow up", detail: "Keep it light and useful, not salesy." },
    ],
    timeline: "First messages go out in the first week. Conversations build over 3 to 6 weeks.",
    relatedProjects: ["postnow", "convo-digital"],
    relatedArticles: ["linkedin-prospecting-through-conversations"],
  },
  {
    slug: "saas-promotion-ltd-campaigns",
    name: "SaaS promotion and lifetime-deal campaigns",
    summary:
      "I introduce your SaaS product to lifetime-deal communities through clear reviews and giveaway campaigns.",
    forWho: "SaaS founders who want early users and honest feedback from a focused community.",
    problems: [
      "The product is good but nobody has heard of it.",
      "Paid ads are expensive and hard to measure.",
      "You want real users and real feedback, not just traffic.",
    ],
    deliverables: [
      "A clear product description and set of benefits",
      "Use cases that show how the product fits real work",
      "A giveaway or promotion campaign, run end to end",
      "A summary of the questions, feedback and interest you received",
    ],
    process: [
      { step: "Prepare", detail: "Write the product story and the use cases." },
      { step: "Plan", detail: "Agree the campaign, the prizes and the rules." },
      { step: "Run", detail: "Post the campaign and answer questions in the community." },
      { step: "Close", detail: "Pick winners and hand over the accounts or codes." },
      { step: "Report", detail: "Share what the community said and asked." },
    ],
    timeline: "A single campaign usually runs over 1 to 3 weeks.",
    relatedProjects: ["saas-ltd-campaigns", "sublix"],
    relatedArticles: ["find-your-best-channel-in-30-days"],
  },
  {
    slug: "marketing-automation-ai-workflows",
    name: "Marketing automation and AI workflows",
    summary: "I connect the tools you already use so routine work happens on its own.",
    forWho:
      "Small teams that lose hours to copying data between tools and sending the same messages by hand.",
    problems: [
      "Leads sit in a sheet and nobody follows up.",
      "The same task is repeated every day by hand.",
      "Your tools do not talk to each other.",
    ],
    deliverables: [
      "A map of the workflow, from input to result",
      "An automation built in n8n or a similar tool",
      "AI steps for drafting, sorting or summarising where they help",
      "A short guide so your team can run and edit it",
    ],
    process: [
      { step: "Map", detail: "Write down the steps that happen today." },
      { step: "Simplify", detail: "Remove steps that do not need to exist." },
      { step: "Build", detail: "Connect the tools and add the AI steps." },
      { step: "Test", detail: "Run real examples and check the output." },
      { step: "Hand over", detail: "Show your team how to use and change it." },
    ],
    timeline: "Most workflows take 1 to 3 weeks to build and test.",
    relatedProjects: ["convo-digital", "sublix"],
    relatedArticles: ["repeatable-revenue-system"],
  },
  {
    slug: "saas-development",
    name: "SaaS development",
    summary:
      "I plan and build web SaaS products with a modern stack, using AI as a working partner.",
    forWho: "Founders and small teams who need a real product built, not just an idea on paper.",
    problems: [
      "The idea is clear but there is no product yet.",
      "An early build has become hard to change.",
      "There is no plan for how the product should work.",
    ],
    deliverables: [
      "A written plan for the product and its main screens",
      "A working web application built with Next.js, TypeScript and Supabase",
      "Accounts, subscriptions and the core workflow",
      "A simple deployment your team can keep running",
    ],
    process: [
      { step: "Plan", detail: "Write down the problem, the users and the main flow." },
      { step: "Design", detail: "Sketch the screens and the data model." },
      { step: "Build", detail: "Build in small steps and test as we go." },
      { step: "Review", detail: "Check the product against the plan." },
      { step: "Launch", detail: "Deploy it and set up a simple way to improve it." },
    ],
    timeline: "A first working version usually takes 6 to 12 weeks, depending on scope.",
    relatedProjects: ["sublix", "postnow"],
    relatedArticles: ["repeatable-revenue-system"],
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  relatedProjects: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Founder and CEO",
    company: "SublixApp",
    period: "Jan 2026 — Present",
    location: "Rajshahi, Bangladesh",
    summary:
      "Building Sublix, a subscription and trial reminder SaaS that helps people and teams track what they pay for.",
    responsibilities: [
      "Plan the product, the screens and the main workflows.",
      "Write the product specification and work with AI coding tools to build it.",
      "Design how reminders, notification channels and teams should work.",
    ],
    achievements: [
      "Took the product from an idea to a defined plan and an early build.",
      "Set a clear direction for the stack: Next.js, TypeScript and Supabase.",
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL"],
    relatedProjects: ["sublix"],
  },
  {
    role: "CEO and Founder",
    company: "Convo Digital LLC",
    period: "Jan 2021 — Present",
    location: "Rajshahi, Bangladesh",
    summary:
      "I run Convo Digital, a B2B lead generation and digital marketing company. We help SaaS companies and agencies find and reach the right people.",
    responsibilities: [
      "Lead client work across research, cold email and LinkedIn outreach.",
      "Build and run lead generation systems for each client.",
      "Write the offers, the email copy and the outreach messages.",
      "Manage delivery, reporting and client communication.",
    ],
    achievements: [
      "Built the company from a solo freelance practice into a small team.",
      "Created repeatable systems for research, outreach and follow-up.",
    ],
    technologies: ["n8n", "Airtable", "Google Sheets", "LinkedIn"],
    relatedProjects: ["convo-digital", "saas-ltd-campaigns"],
  },
  {
    role: "Digital Marketing Specialist",
    company: "Fiverr",
    period: "Jul 2017 — Mar 2024",
    location: "Remote",
    summary:
      "Delivered digital marketing and lead generation projects for international clients through the Fiverr marketplace.",
    responsibilities: [
      "Handled web research, list building and email marketing projects.",
      "Communicated with clients across many countries and time zones.",
      "Kept a high standard on delivery and repeat work.",
    ],
    achievements: [
      "Built long-term relationships with repeat clients.",
      "Learned to scope work clearly and deliver on time.",
    ],
    technologies: ["Web research", "Email marketing", "LinkedIn"],
    relatedProjects: ["convo-digital"],
  },
  {
    role: "Digital Marketing Specialist",
    company: "Upwork",
    period: "Aug 2017 — Feb 2024",
    location: "Remote",
    summary:
      "Worked with startups and small businesses on lead generation, research and marketing support.",
    responsibilities: [
      "Ran research and list building for sales teams.",
      "Supported email campaigns and follow-up.",
      "Adapted to each client's tools and process.",
    ],
    achievements: [
      "Delivered repeat contracts for the same clients.",
      "Built the research habits that later shaped Convo Digital.",
    ],
    technologies: ["Web research", "Email marketing", "Google Sheets"],
    relatedProjects: ["convo-digital"],
  },
];

export type EducationEntry = {
  institution: string;
  credential: string;
  period: string;
  location?: string;
};

/** Shown on the experience page. */
export const education: EducationEntry[] = [
  {
    institution: "North Bengal International University",
    credential: "Bachelor of Engineering (BE), Electrical and Electronics Engineering",
    period: "2017 — 2021",
    location: "Rajshahi, Bangladesh",
  },
  {
    institution: "Rajshahi Polytechnic Institute",
    credential: "Diploma in Engineering, Electronic Technology",
    period: "2011 — 2016",
    location: "Rajshahi, Bangladesh",
  },
];

/** Working principles shown on the about page. */
export const workingPrinciples: { title: string; description: string }[] = [
  {
    title: "Research before outreach",
    description:
      "A short, relevant message to the right person beats a clever message to a random list.",
  },
  {
    title: "Systems over manual tasks",
    description: "If a task repeats, it should be automated or written down as a process.",
  },
  {
    title: "Verified data only",
    description: "A clean list of 200 people is worth more than a messy list of 5,000.",
  },
  {
    title: "Simple and direct",
    description:
      "Plain language, short sentences and no jargon. If it needs explaining twice, it is too complicated.",
  },
];

/** Capability groups shown on the about page. */
export const capabilities: { group: string; items: string[] }[] = [
  {
    group: "Lead generation and research",
    items: [
      "B2B research",
      "List building",
      "Email verification",
      "ICP definition",
      "Account scoring",
    ],
  },
  {
    group: "Email and cold outreach",
    items: ["Cold email", "Email marketing", "Follow-up sequences", "Deliverability basics"],
  },
  {
    group: "Digital marketing",
    items: ["SEO", "PPC", "Social media marketing", "Conversion optimisation"],
  },
  {
    group: "Marketing automation and AI",
    items: ["n8n", "Airtable", "Google Sheets", "OpenRouter", "ChatGPT", "Claude"],
  },
  {
    group: "SaaS development",
    items: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
  },
  {
    group: "WordPress and Elementor",
    items: ["WordPress", "Elementor", "Content pages", "Site maintenance"],
  },
  {
    group: "Data and reporting",
    items: ["R", "Google Analytics", "Spreadsheet reporting"],
  },
];

/** The /uses page. */
export const uses: { group: string; items: { name: string; note?: string }[] }[] = [
  {
    group: "Outreach and communication",
    items: [
      { name: "LinkedIn", note: "Prospecting and conversations" },
      { name: "Email", note: "Cold email and follow-up" },
      { name: "Telegram", note: "Reminders and alerts" },
      { name: "Slack", note: "Team and client channels" },
      { name: "WhatsApp", note: "Quick client messages" },
    ],
  },
  {
    group: "Automation and AI",
    items: [
      { name: "n8n", note: "Connecting tools into workflows" },
      { name: "Airtable", note: "Simple databases for campaigns" },
      { name: "Google Sheets", note: "Lists, research and reporting" },
      { name: "OpenRouter", note: "One API for several models" },
      { name: "ChatGPT", note: "Drafting, research and planning" },
      { name: "Claude", note: "Writing and code help" },
    ],
  },
  {
    group: "SaaS development",
    items: [
      { name: "Next.js", note: "Web apps with the App Router" },
      { name: "TypeScript", note: "Fewer mistakes as the code grows" },
      { name: "Supabase", note: "Database, auth and storage" },
      { name: "VS Code", note: "Editor, with AI coding tools" },
      { name: "GitHub", note: "Source and deployment" },
      { name: "Vercel", note: "Hosting for the products I build" },
    ],
  },
  {
    group: "Marketing and content",
    items: [
      { name: "WordPress", note: "Client sites and content" },
      { name: "Elementor", note: "Building pages without code" },
      { name: "Google Analytics", note: "Traffic and behaviour" },
      { name: "R", note: "Data analysis from Google's courses" },
    ],
  },
];

/** The /now page. Update the date whenever you change this list. */
export const now = {
  updated: "2026-09-24",
  intro:
    "A short snapshot of what I am focused on right now. This page is meant to go stale — if the date above is old, treat it as history.",
  items: [
    {
      title: "Building",
      detail:
        "Sublix, a subscription and trial reminder SaaS, and PostNow, a LinkedIn content tool. Both are in development.",
    },
    {
      title: "Running",
      detail:
        "Convo Digital client work — lead generation, cold email and LinkedIn outreach for B2B SaaS teams.",
    },
    {
      title: "Learning",
      detail:
        "Better ways to use AI and automation inside marketing work, so routine tasks take less time.",
    },
    {
      title: "Available for",
      detail: "New B2B lead generation projects with SaaS companies, founders and agencies.",
    },
  ],
};
