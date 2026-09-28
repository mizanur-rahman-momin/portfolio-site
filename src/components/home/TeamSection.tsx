import Image from "next/image";
import { Container } from "@/components/ui/Container";

type TeamSectionProps = {
  founderPhotoSrc: string;
};

const teamMembers = [
  {
    name: "Mizanur Rahman Momin",
    role: "Founder & Lead Strategist",
    image: "/images/mizanur.jpg",
    objectPosition: "object-[center_18%]",
    bio: "8+ years in B2B lead generation, research-first prospecting, and SaaS growth. Dedicated to building reliable, high-yield sales funnels.",
    socials: [
      { name: "LinkedIn", href: "https://bd.linkedin.com/in/mizanur-rahman-momin-448a81121" },
      { name: "Twitter", href: "https://twitter.com/M_R_MOMIN" },
      { name: "GitHub", href: "https://github.com/mizanur-rahman-momin" },
    ],
  },
  {
    name: "Rahul Ahmed",
    role: "Senior B2B Research Lead",
    image: "/images/team-member-1.jpg",
    objectPosition: "object-top",
    bio: "Specializes in deep prospect intelligence, firmographic filtering, tech stack identification, and zero-bounce data verification.",
    socials: [
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "Twitter", href: "https://twitter.com" },
    ],
  },
  {
    name: "Tanvir Hasan",
    role: "Technical Deliverability Engineer",
    image: "/images/team-member-2.jpg",
    objectPosition: "object-top",
    bio: "Expert in cold email infrastructure, DNS record hygiene (SPF, DKIM, DMARC), custom tracking domains, and n8n webhook routing.",
    socials: [
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "GitHub", href: "https://github.com" },
    ],
  },
];

const metrics = [
  { value: "500K+", label: "Verified Leads Delivered" },
  { value: "$250K+", label: "Pipeline Generated" },
  { value: "98%+", label: "Inbox Deliverability Rate" },
];

export function TeamSection({ founderPhotoSrc }: TeamSectionProps) {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <Container size="wide">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Meet the Minds Behind Convo Digital
          </h2>
          <p className="mt-3 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            We&apos;re a dedicated team of B2B researchers, outreach strategists, and automation
            builders committed to scaling your business.
          </p>
        </div>

        {/* 3 Profile Cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {teamMembers.map((member, idx) => {
            const photo = idx === 0 ? founderPhotoSrc : member.image;
            return (
              <div
                key={member.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md transition-all duration-200 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Member Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className={`object-cover ${member.objectPosition} transition-transform duration-300 group-hover:scale-103`}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {member.role}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4 text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                    {member.socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-zinc-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Metric Counters */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 border-t border-zinc-200/80 pt-12 text-center sm:grid-cols-3 dark:border-zinc-800/80">
          {metrics.map((m) => (
            <div key={m.label} className="p-4">
              <p className="text-4xl font-black tracking-tight text-blue-600 sm:text-5xl dark:text-blue-400">
                {m.value}
              </p>
              <p className="mt-2 text-sm font-semibold tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
