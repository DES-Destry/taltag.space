import Image from "next/image";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";
import { SkillsCatalogSpotlight } from "@/components/SkillsCatalogSpotlight";

function IconShield() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function IconWallet() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m0 0h18"
      />
    </svg>
  );
}

function IconLink() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
    </svg>
  );
}

const features = [
  {
    icon: IconShield,
    title: "Cryptographically verifiable",
    description:
      "Each badge is a compressed NFT on Solana. Employers and clients can confirm ownership and metadata on-chain—not just trust a screenshot.",
  },
  {
    icon: IconWallet,
    title: "Self-custodied credentials",
    description:
      "The asset lives in your wallet. No platform can revoke your proof of skill or wall it behind a login you do not control.",
  },
  {
    icon: IconLink,
    title: "One link, everywhere",
    description:
      "Share a dedicated proof URL for your badge. Pair it with Solscan or your wallet address for full transparency.",
  },
] as const;

const audiences = [
  {
    title: "Freelancers & consultants",
    body: "Send one proof link with proposals instead of rebuilding your portfolio annex every quarter.",
  },
  {
    title: "Job seekers & bootcamp grads",
    body: "Stand out with a credential verifiers can trace—without asking HR to sign up for another siloed LMS.",
  },
  {
    title: "Open-source & DAO contributors",
    body: "Surface public, wallet-bound skills that align with how you already work on-chain.",
  },
  {
    title: "Teams skilling up",
    body: "Pilot lightweight recognition: mint badges after internal reviews or shipped milestones.",
  },
] as const;

const flowSteps = [
  { title: "Choose a skill", body: "Pick from the catalog that matches what you actually ship." },
  { title: "Mint to your wallet", body: "We compress state on Solana so fees stay practical at scale." },
  { title: "Share proof", body: "Gallery + per-badge pages + explorers give three ways to verify you." },
] as const;

const faqPreview = [
  {
    q: "Do I pay gas when I claim?",
    a: "On this deployment the creator wallet sponsors the mint— you only need a valid receiving address. Self-hosted instances fund their own payer.",
  },
  {
    q: "Is this a formal certification?",
    a: "No. TalentTag issues portable proofs you control. It complements—not replaces—degrees, exams, and employer references.",
  },
  {
    q: "Can I lose access to my badge?",
    a: "The NFT stays in whatever wallet holds it. Back up your seed phrase or hardware wallet like any other on-chain asset.",
  },
] as const;

export default function Home() {
  return (
    <MainContainer className="py-10 sm:py-14 lg:py-16">
      {/* Hero */}
      <section className="relative mb-16 sm:mb-20 lg:mb-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[22rem] w-[min(100%,42rem)] -translate-x-1/2 opacity-40 blur-[120px]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.35) 0%, rgba(59,130,246,0.12) 45%, transparent 70%)",
          }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-5">
              <Image
                src="/icon.svg"
                width={56}
                height={56}
                className="rounded-xl shadow-lg shadow-cyan-950/50"
                alt=""
                unoptimized
                priority
              />
            </div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300/95">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Solana · Skill credentials
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Credentials you own.{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Proof anyone can verify.
              </span>
            </h1>
            <p className="mb-10 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
              Mint a skill badge as a compressed NFT in seconds. Portable, permanent, and
              inspection-friendly—built for builders who want more than a line on a résumé.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/claim"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
              >
                Claim your badge
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-center text-sm font-semibold text-zinc-200 transition hover:border-white/25 hover:bg-white/[0.07]"
              >
                Browse gallery
              </Link>
            </div>
            <p className="mt-8 text-sm text-zinc-500">
              Low cost via state compression · Compatible with major Solana wallets
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div
              className="relative mx-auto max-w-sm lg:max-w-none lg:ml-auto lg:mr-0"
              aria-hidden
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/15 via-transparent to-blue-600/10 blur-2xl lg:-inset-8" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-6 shadow-2xl shadow-black/50 backdrop-blur-sm sm:p-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Preview
                  </span>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                    cNFT
                  </span>
                </div>
                <div className="mx-auto mb-5 flex aspect-square max-h-[200px] items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-transparent sm:max-h-[220px]">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white/90 sm:text-5xl">◎</p>
                    <p className="mt-2 text-sm font-medium text-cyan-200/90">Skill badge</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-500">Standard</span>
                    <span className="font-mono text-zinc-300">Metaplex Bubblegum</span>
                  </div>
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-500">Network</span>
                    <span className="text-zinc-300">Solana</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 hidden rounded-xl border border-white/10 bg-[#0d0f12]/95 px-3 py-2 text-[10px] text-zinc-400 shadow-xl sm:block">
                Shareable proof URL included
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mb-16 border-y border-white/[0.06] bg-white/[0.02] py-8 sm:mb-20 sm:py-10">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-400">
          <span className="font-medium text-zinc-300">Solana</span>
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            ·
          </span>
          <span>Compressed NFTs</span>
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            ·
          </span>
          <span>Metaplex Bubblegum</span>
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            ·
          </span>
          <span>Helius DAS-ready</span>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16 sm:mb-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built for professional credibility
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            A lightweight way to show what you can do—with an audit trail backed by the chain, not
            a closed leaderboard.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-cyan-500/25 hover:bg-white/[0.03] sm:p-7"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition group-hover:border-cyan-400/35">
                <Icon />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="mb-16 sm:mb-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Built for people who ship
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Whether you are client-facing, hiring-facing, or community-facing, the same pattern
            applies: prove skills with data anyone can inspect.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {audiences.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <SkillsCatalogSpotlight />

      {/* Flow teaser */}
      <section className="mb-16 sm:mb-20">
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent px-6 py-12 sm:px-10 sm:py-14">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              From form to verified asset
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              No walletConnect dance on this path—just clear inputs, an RPC-backed mint, and hashes
              you can trace.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3 md:gap-6">
            {flowSteps.map((step, i) => (
              <div key={step.title} className="text-center md:text-left">
                <div className="mb-4 flex justify-center md:justify-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-bold text-cyan-300">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Read the full walkthrough →
            </Link>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="mb-16 sm:mb-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Platform badge vs TalentTag
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Same social proof goal—different custody model. When the record lives in your wallet, you
            choose where it shows up.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="grid sm:grid-cols-2">
            <div className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Typical learning platform
              </p>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex gap-2">
                  <span className="text-rose-400/90">—</span>
                  Badge inside vendor account; export is a screenshot.
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-400/90">—</span>
                  Verification requires that vendor to stay online forever.
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-400/90">—</span>
                  Skills do not compose with the rest of your on-chain footprint.
                </li>
              </ul>
            </div>
            <div className="bg-cyan-500/[0.04] p-6 sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
                TalentTag
              </p>
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Standard Solana asset + public gallery + proof URLs.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Verifiers use explorers and wallets they already trust.
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-400">✓</span>
                  Composable with future on-chain reputation experiments.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mb-16 sm:mb-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Questions, answered briefly
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Dive deeper on the FAQ page—here are the conversations we hear most in office hours.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqPreview.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 open:bg-white/[0.03] sm:px-6"
            >
              <summary className="cursor-pointer list-none py-5 font-medium text-white [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {q}
                  <span className="text-cyan-400/80 transition group-open:rotate-180">▼</span>
                </span>
              </summary>
              <p className="border-t border-white/5 pb-5 pt-2 text-sm leading-relaxed text-zinc-400">
                {a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/faq" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
            View all FAQ →
          </Link>
        </p>
      </section>

      {/* Why Solana */}
      <section className="mb-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-10 sm:mb-20 sm:px-10 sm:py-12">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Why Solana for credentials?
            </h2>
            <p className="mb-6 text-zinc-400 leading-relaxed">
              High throughput and state compression mean minting friction stays low while metadata
              stays rich enough for real workflows—not vanity JPGs alone.
            </p>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-0.5 text-cyan-400">●</span>
                <span>Fees that make experimentation viable for communities and classrooms.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-cyan-400">●</span>
                <span>Ecosystem tooling (wallets, RPCs, explorers) employers already Google for.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-cyan-400">●</span>
                <span>Room to evolve toward richer attestations without changing the core UX.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/5 p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-cyan-300/90">
              Ship checklist
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Ready when you are: connect a funded deployment, wire Helius (or another DAS-capable
              RPC), publish metadata routes, and badges start appearing in both gallery views and
              personal wallets.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-white hover:text-cyan-200"
            >
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.12] via-[#0a0b0d] to-blue-600/[0.08] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">Ready to mint?</h2>
          <p className="mb-8 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Open the claim page to pick your skill and receive your badge in one flow. Prefer context
            first? Read how it works or the FAQ—then come back when you are set.
          </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/claim"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0a0b0d] transition hover:bg-zinc-100"
            >
              Go to claim page
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How it works
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 sm:border-transparent sm:bg-transparent sm:px-4 sm:py-3 sm:text-cyan-300 sm:hover:text-cyan-200"
            >
              FAQ
            </Link>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
