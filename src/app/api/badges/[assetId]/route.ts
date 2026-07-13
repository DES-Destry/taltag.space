import { NextResponse } from "next/server";
import { fetchBadgeById } from "@/lib/badges-server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ assetId: string }> }
) {
  const { assetId } = await params;
  const result = await fetchBadgeById(assetId);

  if (!result.badge) {
    return NextResponse.json({ error: "Badge not found" }, { status: 404 });
  }

  return NextResponse.json({
    badge: result.badge,
    explorerUrl: result.explorerUrl,
    source: result.source,
  });
}
