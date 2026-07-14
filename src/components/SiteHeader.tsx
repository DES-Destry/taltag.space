"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/skills", label: "Skills" },
  { href: "/gallery", label: "Gallery" },
  { href: "/learn", label: "Learn" },
] as const;

function isNavActive(pathname: string, href: string) {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/gallery" && pathname.startsWith("/badge/"))
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5 text-ink"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
      )}
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileNavPath, setMobileNavPath] = useState<string | null>(null);
  const menuOpen = mobileNavPath === pathname;

  const closeMenu = () => setMobileNavPath(null);
  const toggleMenu = () => setMobileNavPath(menuOpen ? null : pathname);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper-raised/80 backdrop-blur-md">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between gap-3 md:h-16">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5"
            onClick={closeMenu}
          >
            <Image
              src="/icon.svg"
              width={28}
              height={28}
              className="size-7 shrink-0"
              alt=""
              unoptimized
            />
            <span className="tt-display truncate text-xl tracking-tight text-ink sm:text-2xl">
              TalentTag
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-1 text-sm">
              {nav.map(({ href, label }) => {
                const active = isNavActive(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={
                      active
                        ? "px-3 py-1.5 font-semibold text-stamp"
                        : "px-3 py-1.5 text-muted transition-colors hover:text-ink"
                    }
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <Link href="/claim" className="tt-btn !px-4 !py-2 text-sm">
              Claim badge
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-line bg-paper-raised text-ink transition hover:border-ink"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 top-14 bg-ink/25 md:hidden"
              aria-label="Close menu"
              onClick={closeMenu}
            />
            <nav
              id="mobile-nav"
              className="absolute inset-x-0 top-full z-50 border-b border-line bg-paper-raised px-5 py-3 shadow-lg md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {nav.map(({ href, label }) => {
                  const active = isNavActive(pathname, href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className={`flex min-h-11 items-center px-3 text-base font-medium transition ${
                          active
                            ? "bg-[color-mix(in_srgb,var(--stamp)_10%,transparent)] text-stamp"
                            : "text-ink-soft hover:bg-field"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-2 border-t border-line pt-3">
                  <Link
                    href="/claim"
                    onClick={closeMenu}
                    className="tt-btn flex min-h-11 w-full"
                  >
                    Claim your badge
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
