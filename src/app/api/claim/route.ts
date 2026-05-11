import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import type { BadgeClaimRequest } from "@/lib/types";
import { SKILLS } from "@/lib/skills";
import { mintBadge } from "@/lib/mint";

// Validate Solana wallet address
function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return address.length >= 32 && address.length <= 44;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BadgeClaimRequest = await request.json();
    const skillId = (body.skillId ?? "").trim();
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const walletAddress = (body.walletAddress ?? "").trim();

    const missingFields = [
      !skillId ? "skillId" : null,
      !name ? "name" : null,
      !email ? "email" : null,
      !walletAddress ? "walletAddress" : null,
    ].filter(Boolean) as Array<"skillId" | "name" | "email" | "walletAddress">;

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missingFields },
        { status: 400 }
      );
    }

    if (!isValidSolanaAddress(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid Solana wallet address" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const skill = SKILLS.find((s) => s.id === skillId);
    const skillName = skill?.name ?? skillId;

    const claimId = `claim_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://taltag.space");
    const metadataUri = `${baseUrl}/api/badge-meta/${claimId}?skillId=${skillId}&skillName=${encodeURIComponent(skillName)}&name=${encodeURIComponent(name)}`;

    const { signature } = await mintBadge({
      recipientWallet: walletAddress,
      metadataUri,
      skillName,
      recipientName: name,
    });

    return NextResponse.json({
      success: true,
      message: "Badge minted successfully! Check your wallet.",
      signature,
      explorerUrl: `https://solscan.io/tx/${signature}${process.env.SOLANA_NETWORK === "devnet" ? "?cluster=devnet" : ""}`,
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
