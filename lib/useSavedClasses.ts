"use client";

import { useState, useEffect } from "react";
import { ClassSlug } from "./classes";

const STORAGE_KEY = "braintopia_saved_classes";

export function useSavedClasses() {
  const [saved, setSaved] = useState<ClassSlug[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSaved(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const isSaved = (slug: ClassSlug) => saved.includes(slug);

  const toggleSave = (slug: ClassSlug) => {
    setSaved((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const remove = (slug: ClassSlug) => {
    setSaved((prev) => {
      const next = prev.filter((s) => s !== slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { saved, isSaved, toggleSave, remove };
}
