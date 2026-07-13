import Link from "next/link";

const primary = [
  { href: "/claim", label: "Claim a badge" },
  { href: "/skills", label: "Skills catalog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/learn", label: "Learn" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-line bg-paper-raised">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <p className="tt-display mb-3 text-2xl text-ink">TalentTag</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Portable skill badges on Solana. Mint a compressed NFT, share a proof link, and let
              anyone verify your credential on-chain.
            </p>
          </div>
          <div>
            <p className="tt-label mb-3">Product</p>
            <ul className="space-y-2">
              {primary.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ink-soft transition-colors hover:text-stamp">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tt-label mb-3">Ecosystem</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft transition-colors hover:text-stamp"
                >
                  Solana
                </a>
              </li>
              <li>
                <a
                  href="https://www.metaplex.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft transition-colors hover:text-stamp"
                >
                  Metaplex
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <span>© {year} TalentTag. Skill badges on Solana.</span>
          <span>Compressed NFTs · Low fees · You own the asset</span>
        </div>
      </div>
    </footer>
  );
}
