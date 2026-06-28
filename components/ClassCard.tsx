"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useSavedClasses } from "@/lib/useSavedClasses";
import { motion } from "framer-motion";

interface ClassCardProps {
  name: string;
  shortDescription: string;
  href?: string | null;
  slug?: string;
  showSave?: boolean;
  accentColor?: string;
}

export default function ClassCard({
  name,
  shortDescription,
  href,
  slug,
  showSave = false,
  accentColor = "#40cdfc",
}: ClassCardProps) {
  const { isSaved, toggleSave } = useSavedClasses();
  const saved = slug ? isSaved(slug) : false;
  const canSave = showSave && slug;
  const classLabel = name.split(" ")[1] || name;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card p-6 flex flex-col h-full border-l-4"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-semibold tracking-tight">{name}</h3>
          {canSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSave(slug);
              }}
              className="p-1.5 -mr-1 -mt-1 text-brand-dark/40 hover:text-brand-warm transition-colors"
              aria-label={saved ? "Remove from My Classes" : "Save to My Classes"}
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-brand-warm text-brand-warm" : ""}`} />
            </button>
          )}
        </div>
        <p className="text-[15px] text-brand-dark/70 leading-relaxed mb-4">
          {shortDescription}
        </p>
      </div>

      {href ? (
        <Link
          href={href}
          className="mt-auto inline-flex items-center text-brand-blue font-medium hover:underline text-sm"
        >
          Learn more about {classLabel} →
        </Link>
      ) : (
        <span className="mt-auto text-sm text-brand-dark/50">Full profile coming soon</span>
      )}
    </motion.div>
  );
}