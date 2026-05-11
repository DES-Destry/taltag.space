import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

export const metadata: Metadata = {
  title: "About — TalentTag",
  description: "What TalentTag is and why skill badges belong on Solana.",
};

export default function AboutPage() {
  return (
    <MainContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">About TalentTag</h1>
        <div className="max-w-none space-y-6 text-zinc-400 leading-relaxed">
          <p className="text-lg text-zinc-300">
            TalentTag is a small product experiment:{" "}
            <strong className="text-white font-medium">skill credentials you actually own</strong>. Instead
            of a screenshot or a line on a PDF, you get a{" "}
            <strong className="text-white font-medium">compressed NFT (cNFT)</strong> on Solana — cheap to
            mint, permanent on-chain, and easy to link from a résumé or profile.
          </p>
          <p>
            Traditional badges are locked inside platforms. A TalentTag badge is a standard digital
            asset in your wallet. Anyone can open your{" "}
            <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300">
              proof page
            </Link>{" "}
            or follow the link to a block explorer to verify it matches the chain.
          </p>
          <p>
            The catalog spans tech, creative work, trades, education, community roles, and more—
            organized by category so the same minting flow works for many professions. The goal is
            not to replace formal accreditation — it is to give you a{" "}
            <strong className="text-white font-medium">portable, verifiable signal</strong> you control.
          </p>
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/claim"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            Claim a badge
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium border border-white/15 text-zinc-300 hover:bg-white/5 transition-colors"
          >
            How it works
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
