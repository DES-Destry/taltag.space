import Link from "next/link";
import { getHomepageSkillSpotlight, SKILLS } from "@/lib/skills";
import type { HomepageSkillSpotlight } from "@/lib/skills";

function SpotlightTile({
  item,
  className = "",
  featured = false,
}: {
  item: HomepageSkillSpotlight;
  className?: string;
  featured?: boolean;
}) {
  const { skill, category } = item;
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden border border-line bg-paper-raised p-5 transition duration-300 hover:border-stamp ${className}`}
    >
      <div className="relative">
        <p className="tt-label mb-3">{category.title}</p>
        <div className="flex items-start gap-4">
          <span
            className={`flex shrink-0 items-center justify-center bg-gradient-to-br ${skill.color} text-2xl ${featured ? "h-16 w-16 text-4xl sm:h-20 sm:w-20 sm:text-5xl" : "h-12 w-12 sm:h-14 sm:w-14 sm:text-3xl"}`}
            aria-hidden
          >
            <span>{skill.icon}</span>
          </span>
          <div className="min-w-0 pt-0.5">
            <h3
              className={`font-semibold tracking-tight text-ink ${featured ? "tt-display text-2xl sm:text-3xl" : "text-base sm:text-lg"}`}
            >
              {skill.name}
            </h3>
            {featured && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Same minting flow for every domain — pick yours on the claim page.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsCatalogSpotlight() {
  const items = getHomepageSkillSpotlight();
  const [hero, a, b, c, d, e, f] = items;
  const total = SKILLS.length;

  return (
    <section>
      <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="tt-label text-stamp">Catalog</p>
          <h2 className="tt-display mt-3 text-4xl text-ink sm:text-5xl">
            Skills across every kind of work
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Engineering, creative, trades, education, community, and more. Each badge is the same
            verifiable cNFT on Solana.
          </p>
        </div>
        <Link href="/skills" className="tt-btn-ink shrink-0">
          Browse all skills →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-4">
        <SpotlightTile
          item={hero}
          featured
          className="md:col-span-5 md:row-span-2 md:row-start-1 md:col-start-1 md:min-h-[260px]"
        />
        <SpotlightTile item={a} className="md:col-span-3 md:row-start-1 md:col-start-6" />
        <SpotlightTile item={b} className="md:col-span-4 md:row-start-1 md:col-start-9" />
        <SpotlightTile item={c} className="md:col-span-3 md:row-start-2 md:col-start-6" />
        <SpotlightTile item={d} className="md:col-span-4 md:row-start-2 md:col-start-9" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        <SpotlightTile item={e} className="md:min-h-[140px]" />
        <SpotlightTile item={f} className="md:min-h-[140px]" />
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        <span className="font-semibold text-ink">{total} skills</span> in the live catalog — search
        and filter on the claim page.
      </p>
    </section>
  );
}
