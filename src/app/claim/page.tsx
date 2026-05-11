import type { Metadata } from "next";
import Link from "next/link";
import { ClaimForm } from "@/components/ClaimForm";
import { MainContainer } from "@/components/MainContainer";

export const metadata: Metadata = {
  title: "Claim a badge — TalentTag",
  description:
    "Mint your skill badge as a compressed NFT on Solana. Select a skill, add your details, and receive the asset in your wallet.",
};

const beforeYouStart = [
  "A Solana wallet address you control (Phantom, Backpack, Solflare, etc.).",
  "A working email—we may use it for operational notices about your mint.",
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
    <MainContainer className="py-10 sm:py-14 lg:py-16">
      {/* Hero */}
      <section className="relative mb-12 sm:mb-16">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-[min(100%,36rem)] -translate-x-1/2 opacity-35 blur-[100px]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,211,238,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400/90">
            Mint
          </p>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Claim your{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              skill badge
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-zinc-400 leading-relaxed lg:mx-0">
            Complete the form below to mint a compressed NFT to your wallet. The transaction is
            submitted by TalentTag; you do not pay gas at claim time on this deployment.
          </p>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-start">
        {/* Side column: checklist + steps (desktop) */}
        <aside className="order-2 space-y-10 lg:order-1 lg:col-span-5">
          <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Before you start
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-400">
              {beforeYouStart.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              What happens next
            </h2>
            <ol className="space-y-4">
              {["Choose a skill and enter your details.", "We validate your wallet and email, then mint the cNFT.", "You receive a success message with an explorer link."].map(
                (text, i) => (
                  <li key={text} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-xs font-bold text-cyan-300">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-zinc-400">{text}</p>
                  </li>
                )
              )}
            </ol>
          </section>

          <section className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6">
            <h2 className="mb-2 text-sm font-semibold text-white">Not sure yet?</h2>
            <p className="mb-4 text-sm leading-relaxed text-zinc-500">
              Review the flow and terminology before minting.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                How it works →
              </Link>
              <Link href="/faq" className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
                FAQ →
              </Link>
            </div>
          </section>
        </aside>

        {/* Form */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-white">Mint form</h2>
            <p className="mt-1 text-sm text-zinc-500">All fields are required.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="mb-8 hidden border-b border-white/10 pb-8 lg:block">
              <h2 className="text-xl font-bold text-white">Mint form</h2>
              <p className="mt-1 text-sm text-zinc-500">All fields are required.</p>
            </div>
            <ClaimForm />
          </div>
        </div>
      </div>

      {/* After mint */}
      <section className="mt-16 border-t border-white/10 pt-16 sm:mt-20 sm:pt-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            After you mint
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Three simple ways to use and show your new credential.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {afterMint.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left"
            >
              <h3 className="mb-2 font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mt-14 flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="font-semibold text-white">Explore issued badges</p>
          <p className="mt-1 text-sm text-zinc-500">
            Browse the gallery or open a proof page from any listing.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:shrink-0">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500"
          >
            Open gallery
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-zinc-200 transition hover:bg-white/5"
          >
            Back to home
          </Link>
        </div>
      </section>
    </MainContainer>
  );
}
