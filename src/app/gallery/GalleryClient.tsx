"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { resolveBadgeImageUri } from "@/lib/badge-image";
import { DataSourceBadge } from "@/components/DataSourceBadge";
import { GallerySkillFilter } from "@/components/GallerySkillFilter";
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
  explorerUrl?: string;
}

const PAGE_SIZE = 24;

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const walletFromUrl = searchParams.get("wallet") ?? "";

  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(walletFromUrl);
  const [skillFilter, setSkillFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState<"demo" | "chain">("demo");

  useEffect(() => {
    if (walletFromUrl) setQuery(walletFromUrl);
  }, [walletFromUrl]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/badges?page=${page}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setBadges(data.badges || []);
        setTotal(data.total ?? data.badges?.length ?? 0);
        setSource(data.source === "chain" ? "chain" : "demo");
      })
      .catch(() => {
        setBadges([]);
        setTotal(0);
        setSource("demo");
      })
      .finally(() => setLoading(false));
  }, [page]);

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

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <MainContainer className={pagePadding}>
      <PageHeader
        eyebrow="Gallery"
        title="Badge gallery"
        description="Browse verified skill badges minted on Solana. Each badge is a permanent, on-chain record — open any card for a shareable proof link."
      >
        <div className="mt-6">
          <DataSourceBadge source={source} />
        </div>
      </PageHeader>

      {!loading && badges.length > 0 && (
        <div className="mb-10 flex flex-col gap-4 lg:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, skill, wallet, or asset id…"
            className="tt-input flex-1"
          />
          <GallerySkillFilter value={skillFilter} onChange={setSkillFilter} />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 animate-pulse border border-line bg-field" />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="border border-dashed border-line bg-paper-raised py-24 text-center">
          <p className="mb-4 text-muted">No badges yet</p>
          <Link href="/claim" className="tt-link font-medium">
            Be the first to claim a badge →
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="tt-panel py-20 text-center">
          <p className="mb-4 text-ink-soft">No badges match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSkillFilter("");
            }}
            className="tt-link font-medium"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((badge) => (
              <div
                key={badge.id}
                className="group flex flex-col overflow-hidden border border-line bg-paper-raised transition-all hover:border-stamp"
              >
                <Link
                  href={`/badge/${encodeURIComponent(badge.id)}`}
                  className="block flex-1 cursor-pointer"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden bg-field p-6">
                    <img
                      src={resolveBadgeImageUri(badge.skillId)}
                      alt={`${badge.skillName} badge`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-medium text-ink">{badge.skillName}</span>
                      {badge.verified && (
                        <span className="bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--ok)]">
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ink-soft">{badge.recipientName}</p>
                    <p className="mt-1 truncate font-mono text-xs text-muted">
                      {badge.walletAddress}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-stamp group-hover:underline">
                      View proof page →
                    </p>
                  </div>
                </Link>
                {badge.explorerUrl && (
                  <a
                    href={badge.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-t border-line px-4 py-3 text-center text-xs text-muted transition-colors hover:text-ink"
                  >
                    Open on Solscan ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {source === "chain" && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="tt-btn-ghost !px-4 !py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-muted">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="tt-btn-ghost !px-4 !py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </MainContainer>
  );
}
