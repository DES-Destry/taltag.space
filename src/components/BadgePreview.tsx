"use client";

import { resolveBadgeImageUri } from "@/lib/badge-image";
import { SKILLS } from "@/lib/skills";

type Props = {
  skillId: string;
  recipientName?: string;
  walletReady?: boolean;
};

export function BadgePreview({ skillId, recipientName, walletReady }: Props) {
  const skill = SKILLS.find((s) => s.id === skillId);
  const marks = [
    { label: "Skill", done: Boolean(skill) },
    { label: "Name", done: Boolean(recipientName?.trim()) },
    { label: "Wallet", done: Boolean(walletReady) },
  ];

  if (!skill) {
    return (
      <div className="border border-dashed border-line bg-field/50 px-5 py-6 text-center">
        <p className="tt-label text-stamp">Press preview</p>
        <p className="mt-2 text-sm text-ink-soft">Pick a skill. The stamp updates before you mint.</p>
      </div>
    );
  }

  return (
    <div className="border-2 border-ink bg-paper-raised p-5">
      <div className="flex items-center gap-4 sm:gap-5">
        <img
          src={resolveBadgeImageUri(skillId)}
          alt=""
          className="h-24 w-24 shrink-0 rounded-full border-4 border-stamp object-cover sm:h-28 sm:w-28"
        />
        <div className="min-w-0">
          <p className="tt-label text-stamp">Ready to press</p>
          <p className="tt-display mt-1 text-2xl leading-none text-ink sm:text-3xl">{skill.name}</p>
          <p className="mt-2 text-sm text-ink-soft">
            {recipientName?.trim()
              ? `Issued to ${recipientName.trim()}`
              : "Add your name so the proof page reads as yours."}
          </p>
        </div>
      </div>
      <ol className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
        {marks.map((mark) => (
          <li key={mark.label} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
            <span className={`size-2 ${mark.done ? "bg-stamp" : "bg-line"}`} />
            <span className={mark.done ? "text-ink" : "text-muted"}>{mark.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
