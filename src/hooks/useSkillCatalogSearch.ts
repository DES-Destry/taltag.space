"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  filterSkillCategorySections,
  getSkillCategorySections,
  type SkillCategorySection,
} from "@/lib/skills";

/**
 * Instant catalog search: typing stays on the main thread; filtering follows via `useDeferredValue`
 * so the input feels immediate on large lists.
 */
export function useSkillCatalogSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const allSections = useMemo<SkillCategorySection[]>(() => getSkillCategorySections(), []);
  const sections = useMemo(
    () => filterSkillCategorySections(allSections, deferredQuery),
    [allSections, deferredQuery]
  );
  return {
    query,
    setQuery,
    sections,
    trimmedQuery: query.trim(),
  };
}
