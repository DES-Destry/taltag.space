import { NextRequest, NextResponse } from "next/server";
import { badgeMetadataImageUrl } from "@/lib/badge-from-das";
import { findSkill, resolveSkillId } from "@/lib/skills";

// Dynamic metadata for each badge - wallets & explorers fetch this
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const skillId = resolveSkillId(searchParams.get("skillId") || undefined, searchParams.get("skillName") || undefined);
  const skillName = searchParams.get("skillName") || "Skill Badge";
  const recipientName = searchParams.get("name") || "Anonymous";

  const skill = findSkill(skillId, skillName);
  const name = `${skill?.name ?? skillName} Badge — ${recipientName}`;
  const imageUrl = badgeMetadataImageUrl(skillId);

  const metadata = {
    name,
    symbol: "TAG",
    description: `Verified ${skillName} skill badge for ${recipientName}. Minted on Solana.`,
    image: imageUrl,
    attributes: [
      { trait_type: "Skill", value: skillName },
      { trait_type: "Recipient", value: recipientName },
      { trait_type: "Verified", value: "true" },
    ],
    properties: {
      files: [{ uri: imageUrl, type: "image/png" }],
      category: "image",
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
