"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/claim", label: "Claim" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-lg font-semibold tracking-tight"
        >
          <Image src="/icon.svg" width={32} height={32} className="size-8 rounded-lg" alt="" unoptimized />
          Talent<span className="text-cyan-400">Tag</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm justify-start sm:justify-end">
          {nav.map(({ href, label }) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`) ||
              (href === "/gallery" && pathname.startsWith("/badge/"));
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "text-cyan-400 font-medium"
                    : "text-zinc-400 hover:text-white transition-colors"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
