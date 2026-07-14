"use client";

import { resolveBadgeImageUri } from "@/lib/badge-image";
import { SKILLS } from "@/lib/skills";

type Props = {
  skillId: string;
  recipientName?: string;
};

export function BadgePreview({ skillId, recipientName }: Props) {
  if (!skillId) return null;
  const skill = SKILLS.find((s) => s.id === skillId);

  return (
    <div className="border border-line bg-field/60 p-4">
      <p className="tt-label mb-3">Badge preview</p>
      <div className="flex items-center gap-4">
        <img
          src={resolveBadgeImageUri(skillId)}
          alt=""
          className="h-24 w-24 shrink-0 object-cover"
        />
        <div className="min-w-0">
          <p className="font-semibold text-ink">{skill?.name ?? skillId}</p>
          {recipientName && (
            <p className="mt-1 text-sm text-ink-soft">Issued to {recipientName}</p>
          )}
          <p className="mt-2 text-xs text-muted">Compressed NFT on Solana</p>
        </div>
      </div>
    </div>
  );
}
