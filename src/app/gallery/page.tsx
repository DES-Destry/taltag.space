"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GallerySkillFilter } from "@/components/GallerySkillFilter";
import { MainContainer } from "@/components/MainContainer";

interface Badge {
  id: string;
  skillId: string;
  skillName: string;
  recipientName: string;
  walletAddress: string;
  imageUri?: string;
  verified?: boolean;
  explorerUrl?: string;
}

export default function GalleryPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("");

  useEffect(() => {
    fetch("/api/badges")
      .then((res) => res.json())
      .then((data) => {
        setBadges(data.badges || []);
      })
      .catch(() => setBadges([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return badges.filter((b) => {
      if (skillFilter && b.skillId !== skillFilter) return false;
      if (!q) return true;
      return (
        b.recipientName.toLowerCase().includes(q) ||
        b.skillName.toLowerCase().includes(q) ||
        b.walletAddress.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    });
  }, [badges, query, skillFilter]);

  return (
    <MainContainer className="py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Badge Gallery
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Browse verified skill badges minted on Solana. Each badge is a
          permanent, on-chain record — open any card for a shareable proof link.
        </p>
      </div>

      {!loading && badges.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, skill, wallet, or asset id…"
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40"
          />
          <GallerySkillFilter value={skillFilter} onChange={setSkillFilter} />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 h-64 animate-pulse"
            />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="text-center py-24 rounded-2xl border border-dashed border-white/10">
          <p className="text-zinc-500 mb-4">No badges yet</p>
            <Link
              href="/claim"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Be the first to claim a badge →
            </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-white/10">
          <p className="text-zinc-400 mb-4">No badges match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSkillFilter("");
            }}
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((badge) => (
            <div
              key={badge.id}
              className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-white/20 transition-all flex flex-col"
            >
              <Link
                href={`/badge/${encodeURIComponent(badge.id)}`}
                className="block flex-1 cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-8 overflow-hidden">
                  {badge.imageUri ? (
                    <img
                      src={badge.imageUri}
                      alt={`${badge.skillName} badge`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-3xl font-bold text-cyan-400/80 shadow-lg">
                      {badge.skillName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{badge.skillName}</span>
                    {badge.verified && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                        verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400">{badge.recipientName}</p>
                  <p className="text-xs text-zinc-500 font-mono mt-1 truncate">
                    {badge.walletAddress}
                  </p>
                  <p className="text-xs text-cyan-400/80 mt-2 group-hover:text-cyan-300">
                    View proof page →
                  </p>
                </div>
              </Link>
              {badge.explorerUrl && (
                <a
                  href={badge.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 hover:text-zinc-300 px-4 py-3 border-t border-white/5 text-center transition-colors"
                >
                  Open on Solscan ↗
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </MainContainer>
  );
}
