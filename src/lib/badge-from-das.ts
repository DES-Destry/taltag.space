export interface DASAsset {
  id: string;
  content?: {
    metadata?: Record<string, unknown>;
    json_uri?: string;
    files?: Array<{ uri?: string; mime?: string; type?: string }>;
  };
  ownership?: { owner?: string };
  compression?: { compressed?: boolean };
}

export interface BadgePublic {
  id: string;
  assetId: string;
  skillId: string;
  skillName: string;
  recipientName: string;
  walletAddress: string;
  imageUri?: string;
  verified?: boolean;
}

function appBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://taltag.space")
  );
}

export function mapDASAssetToBadge(asset: DASAsset): BadgePublic {
  const metadata = (asset.content?.metadata || {}) as Record<string, unknown>;
  const attributes = (metadata.attributes as Array<{ trait_type?: string; value?: string }>) || [];
  const skillAttr = attributes.find((a) => a.trait_type === "Skill");
  const rawName = String(metadata.name || metadata.skillName || "Skill Badge");
  const skillName = String(
    skillAttr?.value || rawName.replace(/\s+Badge\s+—.*$/, "").trim() || "Skill Badge"
  );
  const skillId = String(metadata.skillId || skillName.toLowerCase().replace(/\s+/g, "-") || "unknown");
  const imgFile = asset.content?.files?.find(
    (f) =>
      (f.mime || f.type) === "image/png" ||
      (f.mime || f.type) === "image/jpeg" ||
      (f.mime || f.type) === "image/svg+xml"
  );
  const baseUrl = appBaseUrl();
  const imageUri = imgFile?.uri || (metadata.image as string) || `${baseUrl}/api/badge-image?skill=${skillId}`;
  const recipientFromName = rawName.includes(" — ") ? rawName.split(" — ")[1]?.trim() : null;
  return {
    id: asset.id,
    assetId: asset.id,
    skillId,
    skillName,
    recipientName: String(metadata.recipientName || recipientFromName || "Anonymous"),
    walletAddress: asset.ownership?.owner || "",
    imageUri,
    verified: asset.compression?.compressed ?? true,
  };
}

export async function getMintSignature(rpcUrl: string, assetId: string): Promise<string | null> {
  try {
    const res = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "sig",
        method: "getSignaturesForAsset",
        params: { id: assetId, page: 1, limit: 10 },
      }),
    });
    const data = await res.json();
    const items = data.result?.items as Array<[string, string]> | undefined;
    if (!items?.length) return null;
    const mintOp = items.find(([, op]) => op?.includes("Mint"));
    return (mintOp?.[0] ?? items[0]?.[0]) ?? null;
  } catch {
    return null;
  }
}

export function solscanExplorerUrl(assetId: string, txSig: string | null): string {
  const clusterParam = process.env.SOLANA_NETWORK === "devnet" ? "?cluster=devnet" : "";
  return txSig
    ? `https://solscan.io/tx/${txSig}${clusterParam}`
    : `https://solscan.io/token/${assetId}${clusterParam}`;
}

/** Placeholder badges when creator RPC is not configured or DAS fails */
export function getDemoBadges(): BadgePublic[] {
  const baseUrl = appBaseUrl();
  const skills = [
    { id: "demo-1", skillId: "react", skillName: "React", recipientName: "Alex Chen", walletAddress: "Demo...4xYz" },
    { id: "demo-2", skillId: "solana", skillName: "Solana", recipientName: "Jordan Lee", walletAddress: "Demo...8aBc" },
    { id: "demo-3", skillId: "typescript", skillName: "TypeScript", recipientName: "Sam Rivera", walletAddress: "Demo...2kLm" },
    { id: "demo-4", skillId: "rust", skillName: "Rust", recipientName: "Morgan Kim", walletAddress: "Demo...9pQr" },
    { id: "demo-5", skillId: "web3", skillName: "Web3 product", recipientName: "Casey Drew", walletAddress: "Demo...1mNk" },
  ];
  return skills.map((s) => ({
    ...s,
    assetId: s.id,
    verified: true,
    imageUri: `${baseUrl}/api/badge-image?skill=${s.skillId}`,
  }));
}
