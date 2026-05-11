import { NextRequest, NextResponse } from "next/server";
import {
  getDemoBadges,
  getMintSignature,
  mapDASAssetToBadge,
  solscanExplorerUrl,
  type DASAsset,
} from "@/lib/badge-from-das";

// Fetches badges from Helius DAS API
// Set HELIUS_API_KEY in .env.local for production
const HELIUS_RPC = process.env.HELIUS_RPC_URL || "https://api.mainnet-beta.solana.com";
const CREATOR_ADDRESS = process.env.BADGE_CREATOR_ADDRESS;

export async function GET(request: NextRequest) {
  try {
    console.log("CREATOR_ADDRESS", CREATOR_ADDRESS);
    // If no creator configured, return demo badges for UI development
    if (!CREATOR_ADDRESS) {
      return NextResponse.json({
        badges: getDemoBadges(),
        source: "demo",
      });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "24"), 100);

    const response = await fetch(HELIUS_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "badges",
        method: "getAssetsByCreator",
        params: {
          creatorAddress: CREATOR_ADDRESS,
          onlyVerified: false,
          page,
          limit,
        },
      }),
    });

    console.log("response", response);

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    const result = data.result || {};
    const assets = result.items || [];
    const badges = await Promise.all(
      assets.map(async (asset: DASAsset) => {
        const badge = mapDASAssetToBadge(asset);
        const txSig = await getMintSignature(HELIUS_RPC, asset.id);
        return {
          ...badge,
          explorerUrl: solscanExplorerUrl(asset.id, txSig),
        };
      })
    );

    return NextResponse.json({
      badges,
      total: result.total ?? badges.length,
      source: "chain",
    });
  } catch (error) {
    console.error("Badges fetch error:", error);
    // Fallback to demo on error
    return NextResponse.json({
      badges: getDemoBadges(),
      source: "demo",
    });
  }
}
