import Link from "next/link";

const primary = [
  { href: "/claim", label: "Claim a badge" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How it works" },
] as const;

const learn = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-white/5 bg-[#070809]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="font-semibold text-white tracking-tight mb-2">
              Talent<span className="text-cyan-400">Tag</span>
            </p>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Portable skill badges on Solana. Mint a compressed NFT, share a proof link, and let
              anyone verify your credential on-chain.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Product
            </p>
            <ul className="space-y-2">
              {primary.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
              Learn
            </p>
            <ul className="space-y-2">
              {learn.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 mt-8">
              Ecosystem
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  Solana
                </a>
              </li>
              <li>
                <a
                  href="https://www.metaplex.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                >
                  Metaplex
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-zinc-600">
          <span>© {year} TalentTag. Skill badges on Solana.</span>
          <span className="text-zinc-600">Compressed NFTs · Low fees · You own the asset</span>
        </div>
      </div>
    </footer>
  );
}
