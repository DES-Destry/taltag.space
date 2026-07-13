import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://taltag.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TalentTag — Skill Badges on Solana",
    template: "%s | TalentTag",
  },
  description:
    "Claim verified skill badges as Compressed NFTs on Solana. Permanent, on-chain records of your achievements.",
  applicationName: "TalentTag",
  keywords: [
    "Solana",
    "cNFT",
    "compressed NFT",
    "skill badges",
    "credentials",
    "portfolio",
  ],
  authors: [{ name: "TalentTag" }],
  creator: "TalentTag",
  publisher: "TalentTag",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TalentTag",
    title: "TalentTag — Skill Badges on Solana",
    description:
      "Verified skill badges as Compressed NFTs on Solana. On-chain proof of your achievements.",
    images: [
      {
        url: "/icon.svg",
        alt: "TalentTag",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TalentTag — Skill Badges on Solana",
    description: "Claim verified skill badges as Compressed NFTs on Solana.",
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${syne.variable} ${figtree.variable} font-sans antialiased`}>
        <div className="tt-shell flex min-h-screen flex-col text-ink">
          <SiteHeader />
          <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
