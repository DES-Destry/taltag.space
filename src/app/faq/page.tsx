import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

export const metadata: Metadata = {
  title: "FAQ — TalentTag",
  description: "Common questions about TalentTag skill badges and Solana cNFTs.",
};

const items: { q: string; a: string }[] = [
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
    a: "Check the wallet you submitted in any Solana NFT-compatible wallet. You can also browse the gallery and open your badge’s proof page to copy a share link.",
  },
  {
    q: "Can I transfer or sell the badge?",
    a: "Like other NFTs, transfer rules depend on wallet and program behavior. Treat badges as personal credentials; secondary markets are outside the scope of this app.",
  },
];

export default function FaqPage() {
  return (
    <MainContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">FAQ</h1>
        <p className="text-zinc-400 text-lg mb-12">
          Quick answers about badges, wallets, and what TalentTag is meant for.
        </p>
        <div className="space-y-8">
          {items.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-6 sm:px-6"
            >
              <h2 className="text-lg font-semibold text-white mb-2">{q}</h2>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">{a}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 text-zinc-500 text-sm">
          Ready to try it?{" "}
          <Link href="/claim" className="text-cyan-400 hover:text-cyan-300 font-medium">
            Claim your first badge
          </Link>{" "}
          or{" "}
          <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300 font-medium">
            browse the gallery
          </Link>
          .
        </p>
      </div>
    </MainContainer>
  );
}
