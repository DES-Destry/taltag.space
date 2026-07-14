"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { resolveBadgeImageUri } from "@/lib/badge-image";
import { BadgeShareButtons } from "@/components/BadgeShareButtons";
import { DataSourceBadge } from "@/components/DataSourceBadge";
import { MainContainer } from "@/components/MainContainer";
import { PageHeader, pagePadding } from "@/components/PageHeader";

interface Badge {
  id: string;
  skillId: string;
  skillName: string;
  recipientName: string;
  walletAddress: string;
  imageUri?: string;
  verified?: boolean;
}

type Props = {
  assetId: string;
};

export function BadgePageClient({ assetId }: Props) {
  const [badge, setBadge] = useState<Badge | null>(null);
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);
  const [source, setSource] = useState<"demo" | "chain">("demo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/badges/${encodeURIComponent(assetId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setBadge(data.badge ?? null);
        setExplorerUrl(data.explorerUrl ?? null);
        setSource(data.source === "chain" ? "chain" : "demo");
        setError(!data.badge ? "Badge not found" : null);
      })
      .catch(() => {
        if (!cancelled) {
          setError("Badge not found");
          setBadge(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [assetId]);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/badge/${encodeURIComponent(assetId)}`
      : "";

  async function copyShareLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <MainContainer className={pagePadding}>
      <div className="mx-auto max-w-lg">
        {loading ? (
          <div className="h-96 animate-pulse border border-line bg-field" />
        ) : error || !badge ? (
          <>
            <PageHeader eyebrow="Proof" title="Badge not found" />
            <div className="border border-dashed border-line bg-paper-raised py-12 text-center">
              <p className="mb-6 text-ink-soft">{error || "This badge could not be loaded."}</p>
              <Link href="/gallery" className="tt-link font-medium">
                ← Back to gallery
              </Link>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <PageHeader
              eyebrow="Proof"
              title={badge.skillName}
              description={`Issued to ${badge.recipientName}`}
            >
              <div className="mt-6">
                <DataSourceBadge source={source} />
              </div>
            </PageHeader>

            <div className="tt-panel overflow-hidden">
              <div className="flex aspect-square items-center justify-center bg-field p-8 sm:p-12">
                <img
                  src={resolveBadgeImageUri(badge.skillId)}
                  alt=""
                  className="mx-auto h-full w-full max-w-md object-cover"
                />
              </div>
              <div className="space-y-3 border-t border-line p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {badge.verified && (
                    <span className="bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] px-2 py-0.5 text-[10px] font-semibold text-[var(--ok)]">
                      On-chain · cNFT
                    </span>
                  )}
                  <Link
                    href={`/gallery?wallet=${encodeURIComponent(badge.walletAddress)}`}
                    className="truncate font-mono text-xs text-muted hover:text-stamp"
                  >
                    {badge.walletAddress}
                  </Link>
                </div>
                <p className="break-all text-xs text-muted">Asset: {badge.id}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={copyShareLink} className="tt-btn-ghost flex-1">
                {copied ? "Copied link" : "Copy proof link"}
              </button>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tt-btn flex-1 text-center"
                >
                  View on Solscan
                </a>
              )}
            </div>

            {shareUrl && (
              <BadgeShareButtons
                url={shareUrl}
                title={`${badge.skillName} skill badge — ${badge.recipientName}`}
              />
            )}

            <p className="text-sm text-muted">
              Verifiers can confirm this badge on-chain.{" "}
              <Link href="/learn#verify" className="tt-link">
                How to verify →
              </Link>
            </p>
          </div>
        )}
      </div>
    </MainContainer>
  );
}
