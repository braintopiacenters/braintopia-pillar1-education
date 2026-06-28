"use client";

import { Heart } from "lucide-react";
import { useSavedClasses } from "@/lib/useSavedClasses";

interface SaveClassButtonProps {
  slug: string;
  className?: string;
}

export default function SaveClassButton({ slug, className = "" }: SaveClassButtonProps) {
  const { isSaved, toggleSave } = useSavedClasses();
  const saved = isSaved(slug);

  return (
    <button
      type="button"
      onClick={() => toggleSave(slug)}
      className={`p-2 text-brand-dark/40 hover:text-brand-warm transition-colors ${className}`}
      aria-label={saved ? "Remove from My Classes" : "Save to My Classes"}
    >
      <Heart className={`w-6 h-6 ${saved ? "fill-brand-warm text-brand-warm" : ""}`} />
    </button>
  );
}