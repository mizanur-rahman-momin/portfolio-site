import { Container } from "@/components/ui/Container";

const brands = [
  { name: "Forbes", subtitle: "Contributor Mentions" },
  { name: "HubSpot", subtitle: "Community Partner" },
  { name: "Product Hunt", subtitle: "Product Launches" },
  { name: "Upwork", subtitle: "Top Rated Expert" },
  { name: "Fiverr", subtitle: "Pro Verified" },
  { name: "G2", subtitle: "Software Reviews" },
  { name: "Moz", subtitle: "SEO Community" },
  { name: "Crunchbase", subtitle: "Company Profile" },
  { name: "Substack", subtitle: "Weekly Newsletter" },
  { name: "Medium", subtitle: "Outbound Notes" },
];

export function BrandsGrid() {
  return (
    <section className="bg-white py-16 sm:py-20 dark:bg-zinc-950">
      <Container size="wide">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            Industry Recognition
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Featured on Over 100+ Brands &amp; Platforms
          </h2>
        </div>

        {/* Clean Logo Badges Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((b) => (
            <div
              key={b.name}
              className="group rounded-xl border border-zinc-200/90 bg-zinc-50 p-4 text-center shadow-2xs transition-colors hover:border-blue-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-600"
            >
              <p className="text-base font-bold text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-blue-400">
                {b.name}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-zinc-600 dark:text-zinc-400">
                {b.subtitle}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
