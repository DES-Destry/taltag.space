import { NextRequest, NextResponse } from "next/server";
import { buildBadgeSvg } from "@/lib/badge-image";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skillId = searchParams.get("skill") || "unknown";
  const svg = buildBadgeSvg(skillId);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
