import { findSkill, resolveSkillId } from "@/lib/skills";

const TAILWIND_HEX: Record<string, string> = {
  "amber-400": "#fbbf24",
  "amber-500": "#f59e0b",
  "amber-600": "#d97706",
  "amber-700": "#b45309",
  "amber-800": "#92400e",
  "blue-400": "#60a5fa",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "blue-800": "#1e40af",
  "cyan-400": "#22d3ee",
  "cyan-500": "#06b6d4",
  "cyan-600": "#0891b2",
  "cyan-700": "#0e7490",
  "cyan-800": "#155e75",
  "emerald-500": "#10b981",
  "emerald-600": "#059669",
  "emerald-700": "#047857",
  "emerald-800": "#065f46",
  "fuchsia-400": "#e879f9",
  "fuchsia-500": "#d946ef",
  "fuchsia-600": "#c026d3",
  "fuchsia-700": "#a21caf",
  "green-400": "#4ade80",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "green-700": "#15803d",
  "indigo-400": "#818cf8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "indigo-700": "#4338ca",
  "indigo-800": "#3730a3",
  "lime-400": "#a3e635",
  "lime-500": "#84cc16",
  "lime-600": "#65a30d",
  "lime-700": "#4d7c0f",
  "neutral-500": "#737373",
  "neutral-700": "#404040",
  "neutral-800": "#262626",
  "orange-400": "#fb923c",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
  "pink-700": "#be185d",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "purple-700": "#7e22ce",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "rose-400": "#fb7185",
  "rose-500": "#f43f5e",
  "rose-600": "#e11d48",
  "rose-700": "#be123c",
  "rose-800": "#9f1239",
  "sky-400": "#38bdf8",
  "sky-500": "#0ea5e9",
  "sky-600": "#0284c7",
  "slate-400": "#94a3b8",
  "slate-500": "#64748b",
  "slate-600": "#475569",
  "slate-700": "#334155",
  "slate-800": "#1e293b",
  "stone-500": "#78716c",
  "stone-700": "#44403c",
  "stone-800": "#292524",
  "teal-500": "#14b8a6",
  "teal-600": "#0d9488",
  "teal-700": "#0f766e",
  "teal-800": "#115e59",
  "violet-400": "#a78bfa",
  "violet-500": "#8b5cf6",
  "violet-600": "#7c3aed",
  "violet-700": "#6d28d9",
  "violet-800": "#5b21b6",
  "yellow-400": "#facc15",
  "yellow-500": "#eab308",
  "yellow-600": "#ca8a04",
  "yellow-700": "#a16207",
  "yellow-800": "#854d0e",
  "zinc-400": "#a1a1aa",
  "zinc-500": "#71717a",
  "zinc-600": "#52525b",
  "zinc-700": "#3f3f46",
  "zinc-800": "#27272a",
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function gradientStops(color: string): [string, string] {
  const from = color.match(/from-([\w-]+)/)?.[1] ?? "cyan-500";
  const to = color.match(/to-([\w-]+)/)?.[1] ?? "blue-600";
  return [TAILWIND_HEX[from] ?? "#06b6d4", TAILWIND_HEX[to] ?? "#2563eb"];
}

/** Bump when badge artwork changes to bust CDN/browser caches. */
export const BADGE_IMAGE_VERSION = "2";

export function badgeImagePath(skillId: string): string {
  const id = resolveSkillId(skillId);
  return `/api/badge-image?skill=${encodeURIComponent(id)}&v=${BADGE_IMAGE_VERSION}`;
}

export function badgeImageUrl(skillId: string, baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, "")}${badgeImagePath(skillId)}`;
}

export function resolveBadgeImageUri(skillId: string): string {
  return badgeImagePath(skillId);
}

export function buildBadgeSvg(skillId: string): string {
  const skill = findSkill(skillId);
  const name = skill?.name ?? "Skill";
  const icon = skill?.icon ?? name.charAt(0);
  const [fromColor, toColor] = gradientStops(skill?.color ?? "from-cyan-500 to-blue-600");
  const label = name.length > 22 ? `${name.slice(0, 20)}…` : name;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${fromColor}"/>
      <stop offset="100%" style="stop-color:${toColor}"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="400" height="400" rx="40" fill="url(#bg)"/>
  <circle cx="320" cy="80" r="90" fill="white" opacity="0.08"/>
  <circle cx="70" cy="330" r="110" fill="white" opacity="0.06"/>
  <g filter="url(#shadow)">
    <text x="200" y="175" font-size="92" text-anchor="middle" dominant-baseline="middle">${escapeXml(icon)}</text>
  </g>
  <text x="200" y="262" font-family="system-ui,sans-serif" font-size="24" font-weight="700" fill="white" text-anchor="middle">${escapeXml(label)}</text>
  <text x="200" y="300" font-family="system-ui,sans-serif" font-size="15" fill="rgba(255,255,255,0.88)" text-anchor="middle">Skill badge</text>
  <text x="200" y="340" font-family="system-ui,sans-serif" font-size="13" fill="rgba(255,255,255,0.72)" text-anchor="middle">TalentTag · Solana</text>
</svg>`.trim();
}
