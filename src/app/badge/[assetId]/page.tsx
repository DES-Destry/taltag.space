import type { Metadata } from "next";
import { BadgePageClient } from "@/components/BadgePageClient";
import { fetchBadgeById } from "@/lib/badges-server";
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ assetId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assetId } = await params;
  const { badge } = await fetchBadgeById(assetId);

  if (!badge) {
    return { title: "Badge not found" };
  }

  const title = `${badge.skillName} — ${badge.recipientName}`;
  const description = `Verified ${badge.skillName} skill badge issued to ${badge.recipientName} on Solana.`;
  const image = absoluteUrl(`/api/badge-image/png?skill=${encodeURIComponent(badge.skillId)}`);
  const url = absoluteUrl(`/badge/${encodeURIComponent(assetId)}`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 400, height: 400, alt: `${badge.skillName} badge` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BadgePage({ params }: Props) {
  const { assetId } = await params;
  return <BadgePageClient assetId={assetId} />;
}
