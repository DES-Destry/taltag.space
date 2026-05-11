"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

interface Badge {
  id: string;
  skillId: string;
  skillName: string;
  recipientName: string;
  walletAddress: string;
  imageUri?: string;
  verified?: boolean;
}

export default function BadgePage({ params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = use(params);
  const [badge, setBadge] = useState<Badge | null>(null);
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);
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
    typeof window !== "undefined" ? `${window.location.origin}/badge/${encodeURIComponent(assetId)}` : "";

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
    <MainContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-lg">
        {loading ? (
          <div className="rounded-2xl bg-white/5 border border-white/10 h-96 animate-pulse" />
        ) : error || !badge ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
            <p className="text-zinc-400 mb-6">{error || "Badge not found"}</p>
            <Link href="/gallery" className="text-cyan-400 hover:text-cyan-300 font-medium">
              ← Back to gallery
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-400/90 mb-2">
                Verified skill badge
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{badge.skillName}</h1>
              <p className="text-zinc-400 mt-1">Issued to {badge.recipientName}</p>
            </div>

            <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-8 sm:p-12">
                {badge.imageUri ? (
                  <img
                    src={badge.imageUri}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl max-w-md mx-auto shadow-xl"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-5xl font-bold text-cyan-400/80">
                    {badge.skillName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-5 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {badge.verified && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      On-chain · cNFT
                    </span>
                  )}
                  <span className="text-xs text-zinc-500 font-mono truncate">{badge.walletAddress}</span>
                </div>
                <p className="text-xs text-zinc-500 break-all">Asset: {badge.id}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={copyShareLink}
                className="flex-1 py-3 rounded-xl font-medium bg-white/10 border border-white/15 hover:bg-white/[0.14] transition-colors"
              >
                {copied ? "Copied link" : "Copy proof link"}
              </button>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl font-medium text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                  View on Solscan
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </MainContainer>
  );
}
