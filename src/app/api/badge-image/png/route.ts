import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { buildBadgeSvg } from "@/lib/badge-image";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skillId = searchParams.get("skill") || "unknown";
  const svg = buildBadgeSvg(skillId);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
