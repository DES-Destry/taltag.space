import {
  getDemoBadges,
  getMintSignature,
  mapDASAssetToBadge,
  solscanExplorerUrl,
  type BadgePublic,
  type DASAsset,
} from "@/lib/badge-from-das";
import { resolveSkillId } from "@/lib/skills";

const HELIUS_RPC = process.env.HELIUS_RPC_URL || "https://api.mainnet-beta.solana.com";
const CREATOR_ADDRESS = process.env.BADGE_CREATOR_ADDRESS;

async function dasRpc<T>(method: string, params: unknown): Promise<T> {
  const res = await fetch(HELIUS_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: method, method, params }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result as T;
}

async function getOwnerAssets(owner: string, limit = 100): Promise<DASAsset[]> {
  const result = await dasRpc<{ items?: DASAsset[] }>("getAssetsByOwner", {
    ownerAddress: owner,
    page: 1,
    limit,
  });
  return result.items ?? [];
}

function badgeSkillId(badge: BadgePublic): string {
  return resolveSkillId(badge.skillId, badge.skillName);
}

export async function ownerHasSkillBadge(owner: string, skillId: string): Promise<boolean> {
  if (!CREATOR_ADDRESS) return false;
  try {
    const assets = await getOwnerAssets(owner);
    return assets.some((asset) => {
      const badge = mapDASAssetToBadge(asset);
      return badgeSkillId(badge) === skillId;
    });
  } catch {
    return false;
  }
}

export async function findOwnerSkillAssetId(
  owner: string,
  skillId: string,
  attempts = 5,
  delayMs = 1500
): Promise<string | null> {
  if (!CREATOR_ADDRESS) return null;
  for (let i = 0; i < attempts; i++) {
    try {
      const assets = await getOwnerAssets(owner);
      const match = assets.find((asset) => mapDASAssetToBadge(asset).skillId === skillId);
      if (match?.id) return match.id;
    } catch {
      // retry
    }
    if (i < attempts - 1) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  return null;
}

export async function fetchBadgeById(assetId: string): Promise<{
  badge: BadgePublic | null;
  explorerUrl: string | null;
  source: "demo" | "chain";
}> {
  const id = decodeURIComponent(assetId).trim();
  if (!id) return { badge: null, explorerUrl: null, source: "demo" };

  if (!CREATOR_ADDRESS) {
    const demo = getDemoBadges().find((b) => b.id === id || b.assetId === id) ?? null;
    return { badge: demo, explorerUrl: null, source: "demo" };
  }

  try {
    const asset = await dasRpc<DASAsset | null>("getAsset", { id });
    if (!asset?.id) return { badge: null, explorerUrl: null, source: "chain" };
    const badge = mapDASAssetToBadge(asset);
    const txSig = await getMintSignature(HELIUS_RPC, asset.id);
    return {
      badge,
      explorerUrl: solscanExplorerUrl(asset.id, txSig),
      source: "chain",
    };
  } catch {
    return { badge: null, explorerUrl: null, source: "chain" };
  }
}
