"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readSavedClassSlugs,
  removeSavedClassSlug,
  SAVED_CLASSES_CHANGED_EVENT,
  toggleSavedClassSlug,
} from "./saved-classes-storage";

export function useSavedClasses() {
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const syncFromStorage = useCallback(() => {
    setSaved(readSavedClassSlugs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    syncFromStorage();

    const handleChange = () => syncFromStorage();

    window.addEventListener(SAVED_CLASSES_CHANGED_EVENT, handleChange);
    window.addEventListener("storage", handleChange);

    return () => {
      window.removeEventListener(SAVED_CLASSES_CHANGED_EVENT, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, [syncFromStorage]);

  const isSaved = (slug: string) => saved.includes(slug);

  const toggleSave = (slug: string) => {
    const next = toggleSavedClassSlug(slug);
    setSaved(next);
  };

  const remove = (slug: string) => {
    const next = removeSavedClassSlug(slug);
    setSaved(next);
  };

  return { saved, isSaved, toggleSave, remove, hydrated };
}