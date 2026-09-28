import Image from "next/image";
import { Container } from "@/components/ui/Container";

type AboutTeamProps = {
  founderPhotoSrc: string;
};

const team = [
  {
    name: "Mizanur Rahman Momin",
    role: "Founder & Lead Strategist",
    image: "/images/mizanur.jpg",
    isFounder: true,
  },
  {
    name: "Rahul Ahmed",
    role: "Senior B2B Research Lead",
    image: "/images/team-member-1.jpg",
  },
  {
    name: "Tanvir Hasan",
    role: "Technical Deliverability Engineer",
    image: "/images/team-member-2.jpg",
  },
  {
    name: "Farhan Kabir",
    role: "Data Verification Specialist",
    initials: "FK",
    bgColor: "bg-emerald-600",
  },
  {
    name: "Nusrat Jahan",
    role: "Cold Outreach Copy Strategist",
    initials: "NJ",
    bgColor: "bg-purple-600",
  },
  {
    name: "Ariful Islam",
    role: "Automation & AI Engineer",
    initials: "AI",
    bgColor: "bg-amber-600",
  },
];

export function AboutTeam({ founderPhotoSrc }: AboutTeamProps) {
  return (
    <section className="bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <Container size="wide">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
            The People Behind The Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Meet Our Talented Team
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            We&apos;re a dedicated team of B2B researchers, data engineers, and outbound strategists
            committed to driving real pipeline results.
          </p>
        </div>

        {/* 6 Circular Team Member Cards Grid (2 rows of 3) */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => {
            const photo = member.isFounder ? founderPhotoSrc : member.image;
            return (
              <div
                key={member.name}
                className="group flex flex-col items-center rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 text-center shadow-2xs transition-colors hover:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-blue-600"
              >
                {/* Circular Avatar */}
                <div className="relative mb-4 size-24 overflow-hidden rounded-full shadow-md ring-4 ring-blue-500/20">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={member.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex size-full items-center justify-center text-lg font-bold text-white ${member.bgColor}`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white">{member.name}</h3>
                <p className="mt-1 text-xs font-semibold text-blue-600 sm:text-sm dark:text-blue-400">
                  {member.role}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
