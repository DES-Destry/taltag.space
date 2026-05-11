import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

export const metadata: Metadata = {
  title: "How it works — TalentTag",
  description: "How TalentTag mints compressed NFT skill badges on Solana.",
};

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
];

export default function HowItWorksPage() {
  return (
    <MainContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">How it works</h1>
        <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
          Three steps from form submission to a shareable, on-chain credential.
        </p>
        <ol className="space-y-10">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-5 sm:gap-8"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 font-semibold text-sm border border-cyan-500/25">
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{step.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            Operators
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Running your own instance requires Solana RPC access (e.g. Helius), a Merkle tree for
            compression, and a funded mint keypair. See the project README in the repo for{" "}
            <code className="text-cyan-400/90 text-xs">npm run setup</code> and environment variables.
          </p>
        </div>
        <div className="mt-10">
          <Link href="/faq" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
            Read the FAQ →
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
