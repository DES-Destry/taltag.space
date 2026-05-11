import { NextRequest, NextResponse } from "next/server";
import { SKILLS } from "@/lib/skills";

// Simple SVG badge image - wallets & explorers display this
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skillId = searchParams.get("skill") || "unknown";
  const skill = SKILLS.find((s) => s.id === skillId);
  const name = skill?.name ?? "Skill";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="40" fill="url(#bg)"/>
  <text x="200" y="180" font-family="system-ui,sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">${name.charAt(0)}</text>
  <text x="200" y="260" font-family="system-ui,sans-serif" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="middle">${name} Badge</text>
  <text x="200" y="320" font-family="system-ui,sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">TalentTag • Solana</text>
</svg>`.trim();

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
