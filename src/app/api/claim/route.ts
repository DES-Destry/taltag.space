import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import type { BadgeClaimRequest } from "@/lib/types";
import { SKILLS } from "@/lib/skills";
import { mintBadge } from "@/lib/mint";
import { checkRateLimit } from "@/lib/rate-limit";
import { findOwnerSkillAssetId, ownerHasSkillBadge } from "@/lib/badges-server";
import { absoluteUrl, appBaseUrl } from "@/lib/site-url";

function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return address.length >= 32 && address.length <= 44;
  } catch {
    return false;
  }
}

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const rate = checkRateLimit(`claim:${clientIp(request)}`, 8, 60 * 60 * 1000);
    if (!rate.ok) {
      return NextResponse.json(
        { error: `Too many claims. Try again in ${rate.retryAfterSec} seconds.` },
        { status: 429 }
      );
    }

    const body: BadgeClaimRequest = await request.json();
    const skillId = (body.skillId ?? "").trim();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const walletAddress = (body.walletAddress ?? "").trim();

    const missingFields = [
      !skillId ? "skillId" : null,
      !name ? "name" : null,
      !walletAddress ? "walletAddress" : null,
    ].filter(Boolean) as Array<"skillId" | "name" | "walletAddress">;

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missingFields },
        { status: 400 }
      );
    }

    if (!isValidSolanaAddress(walletAddress)) {
      return NextResponse.json({ error: "Invalid Solana wallet address" }, { status: 400 });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
    }

    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) {
      return NextResponse.json({ error: "Unknown skill" }, { status: 400 });
    }
    const skillName = skill.name;

    if (await ownerHasSkillBadge(walletAddress, skillId)) {
      return NextResponse.json(
        { error: "This wallet already has a badge for this skill." },
        { status: 409 }
      );
    }

    const claimId = `claim_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const baseUrl = appBaseUrl().replace(/\/$/, "");
    const metadataUri = `${baseUrl}/api/badge-meta/${claimId}?skillId=${skillId}&skillName=${encodeURIComponent(skillName)}&name=${encodeURIComponent(name)}`;

    const { signature } = await mintBadge({
      recipientWallet: walletAddress,
      metadataUri,
      skillName,
      recipientName: name,
    });

    const clusterParam = process.env.SOLANA_NETWORK === "devnet" ? "?cluster=devnet" : "";
    const explorerUrl = `https://solscan.io/tx/${signature}${clusterParam}`;
    const assetId = await findOwnerSkillAssetId(walletAddress, skillId);
    const proofUrl = assetId
      ? absoluteUrl(`/badge/${encodeURIComponent(assetId)}`)
      : null;

    return NextResponse.json({
      success: true,
      message: "Badge minted successfully! Check your wallet.",
      signature,
      assetId,
      proofUrl,
      explorerUrl,
    });
  } catch (error) {
    console.error("Claim error:", error);
    let message = error instanceof Error ? error.message : "Failed to process claim";
    if (message.includes("Missing config")) {
      const missing = [];
      if (!process.env.HELIUS_RPC_URL) missing.push("HELIUS_RPC_URL");
      if (!process.env.MERKLE_TREE_ADDRESS) missing.push("MERKLE_TREE_ADDRESS");
      if (!process.env.MINT_KEYPAIR) missing.push("MINT_KEYPAIR");
      message = `Minting not configured. Missing: ${missing.join(", ")}. Add ~0.7 SOL to creator wallet, then run: npm run setup`;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
