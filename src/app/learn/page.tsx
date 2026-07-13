import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";
import { PageHeader, pagePadding } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Learn — TalentTag",
  description:
    "What TalentTag is, how to mint a skill badge, common questions, and notes for operators.",
};

const sections = [
  { id: "what-is-talenttag", label: "What is TalentTag" },
  { id: "mint-flow", label: "Mint flow" },
  { id: "verify", label: "Verify" },
  { id: "faq", label: "FAQ" },
  { id: "operators", label: "Operators" },
] as const;

const steps = [
  {
    title: "Pick a skill & your details",
    body: "Choose from the skill grid, add your name and email, and paste the Solana wallet that should receive the badge.",
  },
  {
    title: "We mint a cNFT",
    body: "The server uses Metaplex Bubblegum to mint a compressed NFT to your wallet. Metadata (skill, recipient) is served from this app so wallets and explorers can display it.",
  },
  {
    title: "Share proof",
    body: "Open your badge from the gallery or use its proof page. Copy the link for LinkedIn, a portfolio, or employers — they can cross-check on Solscan.",
  },
] as const;

const faqItems = [
  {
    q: "What is a compressed NFT?",
    a: "Compressed NFTs (cNFTs) use state compression on Solana so many NFTs can exist at a much lower cost than traditional mints. Your badge is still a real on-chain asset with metadata and ownership.",
  },
  {
    q: "Do I need SOL to claim?",
    a: "You need a valid Solana wallet address. The mint transaction is paid by the TalentTag server (creator wallet), not by you at claim time — though running your own deployment means funding that wallet.",
  },
  {
    q: "Is this an official certification?",
    a: "No. TalentTag is a technical demo / product for portable credentials. It does not replace exams, degrees, or employer verification — it is a machine-verifiable record you can point to.",
  },
  {
    q: "Where do I find my badge after minting?",
    a: "Check the wallet you submitted in any Solana NFT-compatible wallet. You can also browse the gallery and open your badge's proof page to copy a share link.",
  },
  {
    q: "Can I transfer or sell the badge?",
    a: "Like other NFTs, transfer rules depend on wallet and program behavior. Treat badges as personal credentials; secondary markets are outside the scope of this app.",
  },
] as const;

export default function LearnPage() {
  return (
    <MainContainer className={pagePadding}>
      <PageHeader
        eyebrow="Guide"
        title="Learn TalentTag"
        description="Everything before you mint: what the product is, how the flow works, and answers to common questions."
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="border border-line bg-paper-raised px-3.5 py-1.5 text-sm font-medium text-ink-soft transition hover:border-stamp hover:text-stamp"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="space-y-16 sm:space-y-20">
        <section id="what-is-talenttag" className="scroll-mt-24">
          <h2 className="tt-display mb-6 text-3xl text-ink sm:text-4xl">What is TalentTag</h2>
          <div className="space-y-6 leading-relaxed text-ink-soft">
            <p className="text-lg text-ink">
              TalentTag is a small product experiment:{" "}
              <strong className="font-semibold text-ink">skill credentials you actually own</strong>.
              Instead of a screenshot or a line on a PDF, you get a{" "}
              <strong className="font-semibold text-ink">compressed NFT (cNFT)</strong> on Solana —
              cheap to mint, permanent on-chain, and easy to link from a résumé or profile.
            </p>
            <p>
              Traditional badges are locked inside platforms. A TalentTag badge is a standard digital
              asset in your wallet. Anyone can open your{" "}
              <Link href="/gallery" className="tt-link">
                proof page
              </Link>{" "}
              or follow the link to a block explorer to verify it matches the chain.
            </p>
            <p>
              The catalog spans tech, creative work, trades, education, community roles, and more —
              organized by category so the same minting flow works for many professions. The goal is
              not to replace formal accreditation — it is to give you a{" "}
              <strong className="font-semibold text-ink">portable, verifiable signal</strong> you
              control.
            </p>
          </div>
        </section>

        <section id="mint-flow" className="scroll-mt-24">
          <h2 className="tt-display mb-3 text-3xl text-ink sm:text-4xl">Mint flow</h2>
          <p className="mb-10 leading-relaxed text-ink-soft">
            Three steps from form submission to a shareable, on-chain credential.
          </p>
          <ol className="space-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-5 sm:gap-8">
                <span className="tt-display flex h-10 w-10 shrink-0 items-center justify-center border-2 border-stamp text-sm text-stamp">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="verify" className="scroll-mt-24">
          <h2 className="tt-display mb-3 text-3xl text-ink sm:text-4xl">How to verify a badge</h2>
          <p className="mb-8 leading-relaxed text-ink-soft">
            For employers, clients, and collaborators — three ways to confirm a credential is real.
          </p>
          <ol className="space-y-4">
            <li className="tt-panel border-l-2 border-l-stamp p-5 sm:p-6">
              <h3 className="mb-2 font-semibold text-ink">1. Open the proof page</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                The holder shares a link like{" "}
                <code className="bg-field px-1.5 py-0.5 text-xs">taltag.space/badge/…</code>. You see
                the skill, recipient, wallet, and asset id without installing anything.
              </p>
            </li>
            <li className="tt-panel border-l-2 border-l-stamp p-5 sm:p-6">
              <h3 className="mb-2 font-semibold text-ink">2. Check the public gallery</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Search by wallet address in the{" "}
                <Link href="/gallery" className="tt-link">
                  gallery
                </Link>{" "}
                to see every badge issued to that address.
              </p>
            </li>
            <li className="tt-panel border-l-2 border-l-stamp p-5 sm:p-6">
              <h3 className="mb-2 font-semibold text-ink">3. Confirm on-chain</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Use the Solscan link on the proof page, or paste the asset id into an explorer you
                trust. Ownership and metadata should match what the proof page shows.
              </p>
            </li>
          </ol>
        </section>

        <section id="faq" className="scroll-mt-24">
          <h2 className="tt-display mb-3 text-3xl text-ink sm:text-4xl">FAQ</h2>
          <p className="mb-8 leading-relaxed text-ink-soft">
            Quick answers about badges, wallets, and what TalentTag is meant for.
          </p>
          <div className="space-y-3">
            {faqItems.map(({ q, a }) => (
              <details
                key={q}
                className="group tt-panel px-5 open:border-stamp sm:px-6"
              >
                <summary className="cursor-pointer list-none py-5 font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {q}
                    <span className="text-stamp transition group-open:rotate-180">▼</span>
                  </span>
                </summary>
                <p className="border-t border-line pb-5 pt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section id="operators" className="scroll-mt-24">
          <details className="group tt-panel">
            <summary className="cursor-pointer list-none px-5 py-5 font-semibold text-ink sm:px-6 [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                <span>
                  <span className="tt-label block">Self-hosting</span>
                  <span className="mt-1 block text-lg">Operators</span>
                </span>
                <span className="text-stamp transition group-open:rotate-180">▼</span>
              </span>
            </summary>
            <div className="border-t border-line px-5 pb-6 pt-2 sm:px-6">
              <p className="text-sm leading-relaxed text-ink-soft">
                Running your own instance requires Solana RPC access (e.g. Helius), a Merkle tree for
                compression, and a funded mint keypair. See the project README in the repo for{" "}
                <code className="bg-[color-mix(in_srgb,var(--stamp)_10%,transparent)] px-1.5 py-0.5 text-xs text-stamp">
                  npm run setup
                </code>{" "}
                and environment variables.
              </p>
            </div>
          </details>
        </section>
      </div>

      <section className="tt-panel mt-16 flex flex-col items-stretch justify-between gap-6 border-t-2 border-t-stamp p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="font-semibold text-ink">Ready to mint?</p>
          <p className="mt-1 text-sm text-ink-soft">Pick a skill and receive your badge in one flow.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
          <Link href="/claim" className="tt-btn text-center">
            Claim a badge
          </Link>
          <Link href="/gallery" className="tt-btn-ghost text-center">
            Browse gallery
          </Link>
        </div>
      </section>
    </MainContainer>
  );
}
