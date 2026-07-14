"use client";

import Link from "next/link";
import { useSkillCatalogSearch } from "@/hooks/useSkillCatalogSearch";
import { SKILLS } from "@/lib/skills";
import { resolveBadgeImageUri } from "@/lib/badge-image";

type Props = {
  mode: "browse" | "select";
  selectedSkillId?: string;
  onSelect?: (skillId: string) => void;
};

export function SkillsCatalog({ mode, selectedSkillId, onSelect }: Props) {
  const { query, setQuery, sections, trimmedQuery } = useSkillCatalogSearch();

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search by name, category, or slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="tt-input w-full sm:max-w-md"
        />
        <p className="shrink-0 text-sm text-muted">{SKILLS.length} skills</p>
      </div>

      {sections.length === 0 ? (
        <p className="border border-dashed border-line py-12 text-center text-sm text-muted">
          No skills match &ldquo;{trimmedQuery}&rdquo;.
        </p>
      ) : (
        <div className="space-y-10">
          {sections.map(({ category, skills }) => (
            <section key={category.id}>
              <h2 className="tt-label mb-1">{category.title}</h2>
              <p className="mb-4 text-sm text-muted">{category.blurb}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {skills.map((skill) => {
                  const selected = selectedSkillId === skill.id;
                  const inner = (
                    <>
                      <img
                        src={resolveBadgeImageUri(skill.id)}
                        alt=""
                        className="mb-2 h-16 w-16 object-cover"
                      />
                      <span className="text-center text-xs font-medium leading-tight text-ink-soft">
                        {skill.name}
                      </span>
                    </>
                  );

                  if (mode === "select") {
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => onSelect?.(skill.id)}
                        className={`flex flex-col items-center gap-1 border p-3 transition-all ${
                          selected
                            ? "border-stamp bg-[color-mix(in_srgb,var(--stamp)_8%,transparent)] ring-1 ring-stamp"
                            : "border-line bg-paper-raised hover:border-ink/30"
                        }`}
                      >
                        {inner}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={skill.id}
                      href={`/claim?skill=${encodeURIComponent(skill.id)}`}
                      className="flex flex-col items-center gap-1 border border-line bg-paper-raised p-3 transition hover:border-stamp"
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
