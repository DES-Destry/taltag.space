import Image from "next/image";
import Link from "next/link";
import { SkillsCatalogSpotlight } from "@/components/SkillsCatalogSpotlight";

const presses = [
  {
    n: "01",
    title: "Pick",
    body: "Choose a skill from the catalog — engineering, creative, trades, community, and more.",
  },
  {
    n: "02",
    title: "Press",
    body: "We mint a compressed NFT to your wallet. Metadata stays readable in wallets and explorers.",
  },
  {
    n: "03",
    title: "Prove",
    body: "Share one proof URL. Verifiers open the page or check Solscan — no vendor login required.",
  },
] as const;

const signals = [
  {
    title: "Cryptographically verifiable",
    body: "Each badge is a cNFT on Solana. Ownership and metadata are checkable on-chain — not a screenshot.",
  },
  {
    title: "Self-custodied",
    body: "The asset lives in your wallet. No platform can wall your credential behind a login you do not control.",
  },
  {
    title: "One link, everywhere",
    body: "Résumé, proposal, DAO profile — the same proof URL travels with you.",
  },
] as const;

function HeroSeal() {
  return (
    <div className="tt-press relative mx-auto aspect-square w-[min(100%,22rem)] sm:w-[26rem] lg:w-[28rem]">
      <svg viewBox="0 0 320 320" className="h-full w-full drop-shadow-[0_18px_40px_rgba(232,51,42,0.22)]" aria-hidden>
        <defs>
          <path id="tt-seal-ring" d="M160,160 m-118,0 a118,118 0 1,1 236,0 a118,118 0 1,1 -236,0" />
        </defs>
        <circle cx="160" cy="160" r="152" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 6" opacity="0.35" />
        <circle cx="160" cy="160" r="138" fill="var(--stamp)" />
        <circle cx="160" cy="160" r="118" fill="none" stroke="var(--paper-raised)" strokeWidth="2" opacity="0.55" />
        <g className="tt-orbit" style={{ transformOrigin: "160px 160px", transformBox: "view-box" }}>
          <text fill="var(--paper-raised)" fontSize="15" fontWeight="700" letterSpacing="0.28em">
            <textPath href="#tt-seal-ring" startOffset="0%">
              TALENTTAG · SOLANA · cNFT · PROOF · TALENTTAG · SOLANA · cNFT · PROOF ·
            </textPath>
          </text>
        </g>
        <circle cx="160" cy="160" r="78" fill="var(--paper-raised)" />
        <circle cx="160" cy="160" r="72" fill="none" stroke="var(--stamp)" strokeWidth="3" />
        <text
          x="160"
          y="152"
          textAnchor="middle"
          fill="var(--ink)"
          fontSize="34"
          fontWeight="800"
          letterSpacing="-0.04em"
          fontFamily="var(--font-display), Syne, system-ui, sans-serif"
        >
          TT
        </text>
        <text
          x="160"
          y="178"
          textAnchor="middle"
          fill="var(--stamp)"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.22em"
        >
          STAMPED
        </text>
      </svg>
      <span className="sr-only">TalentTag</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero — centered stamp seal (not full-bleed photo overlay) */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="tt-hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-ink/40 sm:left-8 sm:top-8"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-ink/40 sm:right-8 sm:top-8"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-28 left-4 h-5 w-5 border-b-2 border-l-2 border-ink/40 sm:left-8"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-28 right-4 h-5 w-5 border-b-2 border-r-2 border-ink/40 sm:right-8"
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="tt-rise tt-label mb-8 text-stamp">Skill credentials · Solana</p>

          <div className="tt-stamp-in">
            <HeroSeal />
          </div>
          <h1 className="tt-rise tt-rise-delay-1 tt-display mt-8 text-4xl tracking-tight text-ink sm:text-5xl">
            TalentTag
          </h1>

          <p className="tt-rise tt-rise-delay-2 mt-4 max-w-xl text-balance text-xl font-semibold leading-snug text-ink-soft sm:text-2xl">
            Skill badges you press into the chain.
          </p>
          <p className="tt-rise tt-rise-delay-2 mt-4 max-w-md text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Mint a compressed NFT in seconds. Portable proof for freelancers, job seekers, and
            builders who want more than a line on a résumé.
          </p>
          <div className="tt-rise tt-rise-delay-3 mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link href="/claim" className="tt-btn">
              Claim your badge
            </Link>
            <Link href="/gallery" className="tt-btn-ghost">
              Browse gallery
            </Link>
          </div>
        </div>

        {/* Atmosphere band — photo as strip, not hero backdrop */}
        <div className="relative h-28 overflow-hidden border-t border-line sm:h-36">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_40%] opacity-90"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--paper) 55%, transparent), transparent 30%, transparent 70%, color-mix(in srgb, var(--paper) 55%, transparent))",
            }}
          />
        </div>
      </section>

      {/* Stack strip */}
      <section className="border-y border-line bg-paper-raised/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <p className="tt-label">Pressed with</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm font-medium text-ink-soft">
            <span className="text-ink">Solana</span>
            <span>Compressed NFTs</span>
            <span>Metaplex Bubblegum</span>
            <span>Helius DAS-ready</span>
          </div>
        </div>
      </section>

      {/* Press steps */}
      <section className="relative border-b border-line">
        <div className="tt-marks pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="tt-label text-stamp">The press</p>
          <h2 className="tt-display mt-3 max-w-xl text-4xl text-ink sm:text-5xl">
            Pick. Press. Prove.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {presses.map((step) => (
              <li key={step.n} className="border-t-2 border-ink pt-6">
                <p className="tt-display text-sm tracking-[0.2em] text-stamp">{step.n}</p>
                <h3 className="tt-display mt-3 text-3xl text-ink">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/learn"
            className="tt-link mt-10 inline-flex text-sm uppercase tracking-[0.12em]"
          >
            Full guide →
          </Link>
        </div>
      </section>

      {/* Why — image + copy */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-field sm:aspect-[5/6]">
            <Image
              src="/section-craft.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              aria-hidden
              className="tt-stamp-in absolute bottom-6 left-6 right-6 border-2 border-stamp bg-paper-raised/95 px-5 py-4 backdrop-blur-sm"
            >
              <p className="tt-label text-stamp">Stamp mark</p>
              <p className="tt-display mt-1 text-2xl text-ink">cNFT · Solana</p>
            </div>
          </div>
          <div>
            <p className="tt-label">Why it exists</p>
            <h2 className="tt-display mt-3 text-4xl leading-[1.05] text-ink sm:text-5xl">
              Screenshots fade. Wallet assets do not.
            </h2>
            <div className="tt-rule mt-6 h-0.5 w-16 bg-stamp" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Platform badges die with the vendor account. TalentTag issues a standard Solana asset
              you hold — so employers and clients verify with explorers they already trust.
            </p>
            <ul className="mt-8 space-y-5">
              {signals.map((s) => (
                <li key={s.title} className="border-l-2 border-stamp pl-4">
                  <h3 className="font-semibold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SkillsCatalogSpotlight />
      </div>

      {/* Compare */}
      <section className="border-y border-line bg-paper-raised/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="tt-label text-stamp">Custody</p>
          <h2 className="tt-display mt-3 max-w-xl text-4xl text-ink sm:text-5xl">
            Platform badge vs TalentTag
          </h2>
          <div className="mt-12 grid overflow-hidden border border-line sm:grid-cols-2">
            <div className="border-b border-line p-6 sm:border-b-0 sm:border-r sm:p-8">
              <p className="tt-label mb-4">Typical learning platform</p>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li className="flex gap-2">
                  <span className="text-stamp">—</span>
                  Badge inside a vendor account; export is a screenshot.
                </li>
                <li className="flex gap-2">
                  <span className="text-stamp">—</span>
                  Verification requires that vendor to stay online forever.
                </li>
                <li className="flex gap-2">
                  <span className="text-stamp">—</span>
                  Skills do not compose with the rest of your on-chain footprint.
                </li>
              </ul>
            </div>
            <div className="bg-[color-mix(in_srgb,var(--stamp)_6%,var(--paper-raised))] p-6 sm:p-8">
              <p className="tt-label mb-4 text-stamp">TalentTag</p>
              <ul className="space-y-3 text-sm text-ink">
                <li className="flex gap-2">
                  <span className="font-bold text-stamp">✓</span>
                  Standard Solana asset + public gallery + proof URLs.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-stamp">✓</span>
                  Verifiers use explorers and wallets they already trust.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-stamp">✓</span>
                  Composable with future on-chain reputation experiments.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="tt-ink-in pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-stamp/15 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="tt-display text-5xl text-ink sm:text-6xl md:text-7xl">Ready to press?</p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Open the claim page, pick your skill, and receive the badge in one flow. Prefer context
            first? Read the guide — then come back when you are set.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/claim" className="tt-btn">
              Go to claim page
            </Link>
            <Link href="/learn" className="tt-btn-ghost">
              Learn
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
