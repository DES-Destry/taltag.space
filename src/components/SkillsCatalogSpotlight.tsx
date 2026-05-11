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
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.03] p-5 shadow-lg shadow-black/20 transition duration-300 hover:border-cyan-500/25 hover:bg-white/[0.05] hover:shadow-cyan-950/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/15"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition group-hover:opacity-100" aria-hidden />

      <div className="relative">
        <p className="mb-3 inline-flex max-w-full rounded-full border border-white/10 bg-black/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {category.title}
        </p>
        <div className="flex items-start gap-4">
          <span
            className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${skill.color} text-2xl shadow-lg ${featured ? "h-16 w-16 text-4xl sm:h-20 sm:w-20 sm:text-5xl" : "h-12 w-12 sm:h-14 sm:w-14 sm:text-3xl"}`}
            aria-hidden
          >
            <span className="drop-shadow-md">{skill.icon}</span>
          </span>
          <div className="min-w-0 pt-0.5">
            <h3
              className={`font-semibold tracking-tight text-white ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
            >
              {skill.name}
            </h3>
            {featured && (
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Same minting flow for every domain—pick yours on the claim page.
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
    <section className="mb-16 sm:mb-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.045] to-transparent px-5 py-10 sm:px-8 sm:py-12">
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-blue-600/10 blur-[90px]"
          aria-hidden
        />

        <div className="relative mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Skills across every kind of work
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              A few examples from the catalog—engineering, creative, trades, education, community,
              and more. Each badge is the same verifiable cNFT on Solana.
            </p>
          </div>
          <Link
            href="/claim"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 transition hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/25"
          >
            See full catalog →
          </Link>
        </div>

        <div className="relative grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:grid-rows-2">
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

        <div className="relative mt-3 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          <SpotlightTile item={e} className="md:min-h-[140px]" />
          <SpotlightTile item={f} className="md:min-h-[140px]" />
        </div>

        <p className="relative mt-8 text-center text-sm text-zinc-500">
          <span className="text-zinc-400">{total} skills</span> in the live catalog — search and
          filter on the claim page.
        </p>
      </div>
    </section>
  );
}
