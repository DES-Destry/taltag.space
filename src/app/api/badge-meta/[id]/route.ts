import { NextRequest, NextResponse } from "next/server";
import { SKILLS } from "@/lib/skills";

// Dynamic metadata for each badge - wallets & explorers fetch this
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const skillId = searchParams.get("skillId") || "unknown";
  const skillName = searchParams.get("skillName") || "Skill Badge";
  const recipientName = searchParams.get("name") || "Anonymous";

  const skill = SKILLS.find((s) => s.id === skillId);
  const name = `${skill?.name ?? skillName} Badge — ${recipientName}`;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://taltag.space";

  const metadata = {
    name,
    symbol: "TAG",
    description: `Verified ${skillName} skill badge for ${recipientName}. Minted on Solana.`,
    image: `${baseUrl}/api/badge-image?skill=${skillId}`,
    attributes: [
      { trait_type: "Skill", value: skillName },
      { trait_type: "Recipient", value: recipientName },
      { trait_type: "Verified", value: "true" },
    ],
    properties: {
      files: [{ uri: `${baseUrl}/api/badge-image?skill=${skillId}`, type: "image/png" }],
      category: "image",
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
