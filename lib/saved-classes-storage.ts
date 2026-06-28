export const SAVED_CLASSES_STORAGE_KEY = "braintopia_saved_classes";
export const SAVED_CLASSES_CHANGED_EVENT = "braintopia_saved_classes_changed";

export function readSavedClassSlugs(): string[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(SAVED_CLASSES_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return [...new Set(parsed.filter((item): item is string => typeof item === "string" && item.length > 0))];
  } catch {
    return [];
  }
}

export function writeSavedClassSlugs(slugs: string[]) {
  if (typeof window === "undefined") return;

  const normalized = [...new Set(slugs.filter((slug) => typeof slug === "string" && slug.length > 0))];
  localStorage.setItem(SAVED_CLASSES_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent(SAVED_CLASSES_CHANGED_EVENT));
}

export function toggleSavedClassSlug(slug: string): string[] {
  const current = readSavedClassSlugs();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];

  writeSavedClassSlugs(next);
  return next;
}

export function removeSavedClassSlug(slug: string): string[] {
  const next = readSavedClassSlugs().filter((item) => item !== slug);
  writeSavedClassSlugs(next);
  return next;
}