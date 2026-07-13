import type { Metadata } from "next";
import Link from "next/link";
import { ClaimFormShell } from "@/components/ClaimFormShell";
import { MainContainer } from "@/components/MainContainer";
import { PageHeader, pagePadding } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Claim a badge — TalentTag",
  description:
    "Mint your skill badge as a compressed NFT on Solana. Select a skill, add your details, and receive the asset in your wallet.",
};

const beforeYouStart = [
  "Connect a Solana wallet or paste your address carefully.",
  "Email is optional — we only use it for operational notices about your mint.",
  "Double-check your wallet string; NFTs sent to the wrong address cannot be recovered by us.",
];

const afterMint = [
  {
    title: "Check your wallet",
    body: "Open your NFT gallery in the wallet app you used. The badge may take a moment to appear after confirmation.",
  },
  {
    title: "Use your proof page",
    body: "Find the badge in the public gallery and open its detail page to copy a shareable link for résumés or profiles.",
  },
  {
    title: "Verify on-chain",
    body: "Use the Solscan link after minting, or paste the asset id in an explorer, so anyone can audit the record.",
  },
];

export default function ClaimPage() {
  return (
    <MainContainer className={pagePadding}>
      <PageHeader
        eyebrow="Mint"
        title="Claim your skill badge"
        description="Complete the form below to mint a compressed NFT to your wallet. The transaction is submitted by TalentTag; you do not pay gas at claim time on this deployment."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
        <aside className="order-2 space-y-10 lg:order-1 lg:col-span-5">
          <section className="tt-panel p-6 sm:p-7">
            <h2 className="tt-label mb-4">Before you start</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-ink-soft">
              {beforeYouStart.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-stamp" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="tt-label mb-4">What happens next</h2>
            <ol className="space-y-4">
              {[
                "Choose a skill and enter your details.",
                "We validate your wallet, then mint the cNFT.",
                "You land on your shareable proof page.",
              ].map((text, i) => (
                <li key={text} className="flex gap-4">
                  <span className="tt-display flex h-8 w-8 shrink-0 items-center justify-center border border-stamp bg-[color-mix(in_srgb,var(--stamp)_8%,transparent)] text-xs text-stamp">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-ink-soft">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="border border-dashed border-line bg-field/50 p-6">
            <h2 className="mb-2 text-sm font-semibold text-ink">Not sure yet?</h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Review the flow and terminology before minting.
            </p>
            <Link href="/learn" className="tt-link text-sm">
              Read the guide →
            </Link>
          </section>
        </aside>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-ink">Mint form</h2>
            <p className="mt-1 text-sm text-muted">Name and wallet are required.</p>
          </div>
          <div className="tt-panel p-6 sm:p-8 lg:p-10">
            <div className="mb-8 hidden border-b border-line pb-8 lg:block">
              <h2 className="tt-display text-2xl text-ink">Mint form</h2>
              <p className="mt-1 text-sm text-muted">Name and wallet are required.</p>
            </div>
            <ClaimFormShell />
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-line pt-16 sm:mt-20 sm:pt-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="tt-display mb-3 text-3xl text-ink sm:text-4xl">After you mint</h2>
          <p className="leading-relaxed text-ink-soft">
            Three simple ways to use and show your new credential.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {afterMint.map(({ title, body }) => (
            <div key={title} className="tt-panel border-t-2 border-t-stamp p-6 text-left">
              <h3 className="mb-2 font-semibold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tt-panel mt-14 flex flex-col items-stretch justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="font-semibold text-ink">Explore issued badges</p>
          <p className="mt-1 text-sm text-muted">
            Browse the gallery or open a proof page from any listing.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
          <Link href="/gallery" className="tt-btn text-center">
            Open gallery
          </Link>
          <Link href="/" className="tt-btn-ghost text-center">
            Back to home
          </Link>
        </div>
      </section>
    </MainContainer>
  );
}
