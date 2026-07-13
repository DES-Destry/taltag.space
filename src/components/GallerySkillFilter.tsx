"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  filterSkillCategorySections,
  getSkillCategorySections,
  SKILLS,
  type SkillCategorySection,
} from "@/lib/skills";

type Props = {
  value: string;
  onChange: (skillId: string) => void;
};

export function GallerySkillFilter({ value, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const deferredQuery = useDeferredValue(skillQuery);

  const allSections = useMemo<SkillCategorySection[]>(() => getSkillCategorySections(), []);
  const displaySections = useMemo(() => {
    const q = deferredQuery.trim();
    return q ? filterSkillCategorySections(allSections, deferredQuery) : allSections;
  }, [allSections, deferredQuery]);

  const selectedLabel = value ? (SKILLS.find((s) => s.id === value)?.name ?? value) : null;
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full lg:max-w-md">
      <label htmlFor="gallery-skill-search" className="mb-1.5 block text-sm text-muted">
        Skill
      </label>
      <input
        id="gallery-skill-search"
        type="search"
        autoComplete="off"
        spellCheck={false}
        placeholder={
          selectedLabel
            ? `Filtering: ${selectedLabel} — type to search…`
            : "Search skills…"
        }
        value={skillQuery}
        onChange={(e) => {
          setSkillQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            setOpen(false);
          }
        }}
        className="tt-input w-full text-sm"
      />

      {open && (
        <div
          id="gallery-skill-panel"
          role="listbox"
          className="absolute z-30 mt-1 max-h-60 w-full overflow-y-auto border border-line bg-paper-raised py-1 shadow-xl"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === ""}
            onClick={() => {
              onChange("");
              setSkillQuery("");
              setOpen(false);
            }}
            className={`flex w-full items-center px-3 py-2.5 text-left text-sm transition-colors ${
              value === ""
                ? "bg-[color-mix(in_srgb,var(--stamp)_10%,transparent)] text-stamp"
                : "text-ink-soft hover:bg-field"
            }`}
          >
            All skills
          </button>
          {displaySections.map(({ category, skills }) => (
            <div key={category.id}>
              <div className="tt-label px-3 py-1.5">{category.title}</div>
              {skills.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="option"
                  aria-selected={value === s.id}
                  onClick={() => {
                    onChange(s.id);
                    setSkillQuery("");
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                    value === s.id
                      ? "bg-[color-mix(in_srgb,var(--stamp)_10%,transparent)] text-stamp"
                      : "text-ink-soft hover:bg-field"
                  }`}
                >
                  <span className="text-base" aria-hidden>
                    {s.icon}
                  </span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
