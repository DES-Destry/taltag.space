import { NextResponse } from "next/server";
import {
  getDemoBadges,
  getMintSignature,
  mapDASAssetToBadge,
  solscanExplorerUrl,
  type DASAsset,
} from "@/lib/badge-from-das";

const HELIUS_RPC = process.env.HELIUS_RPC_URL || "https://api.mainnet-beta.solana.com";
const CREATOR_ADDRESS = process.env.BADGE_CREATOR_ADDRESS;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const id = decodeURIComponent(assetId).trim();
  if (!id) {
    return NextResponse.json({ error: "Missing asset id" }, { status: 400 });
  }

  if (!CREATOR_ADDRESS) {
    const demo = getDemoBadges().find((b) => b.id === id || b.assetId === id);
    if (demo) {
      return NextResponse.json({
        badge: demo,
        explorerUrl: null,
        source: "demo",
      });
    }
    return NextResponse.json({ error: "Badge not found" }, { status: 404 });
  }

  try {
    const response = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "one",
        method: "getAsset",
        params: { id },
      }),
    });

    const data = await response.json();
    if (data.error) {
      console.error("getAsset error", data.error);
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    const asset = data.result as DASAsset | null;
    if (!asset?.id) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    const badge = mapDASAssetToBadge(asset);
    const txSig = await getMintSignature(HELIUS_RPC, asset.id);
    const explorerUrl = solscanExplorerUrl(asset.id, txSig);

    return NextResponse.json({
      badge,
      explorerUrl,
      source: "chain",
    });
  } catch (e) {
    console.error("Badge fetch error:", e);
    return NextResponse.json({ error: "Failed to load badge" }, { status: 500 });
  }
}
