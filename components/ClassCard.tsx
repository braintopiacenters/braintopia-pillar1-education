'use client';
import Link from "next/link";
import { ClassData } from "@/lib/classes";
import { Heart } from "lucide-react";
import { useSavedClasses } from "@/lib/useSavedClasses";
import { motion } from "framer-motion";

interface ClassCardProps {
  cls: ClassData;
  showSave?: boolean;
}

export default function ClassCard({ cls, showSave = true }: ClassCardProps) {
  const { isSaved, toggleSave } = useSavedClasses();

  const saved = isSaved(cls.slug);

  return (
    <motion.div 
      whileHover={{ y: -3 }} 
      className="card p-6 flex flex-col h-full border-l-4" 
      style={{ borderLeftColor: "#40cdfc" }}
    >
      <div className="flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-2xl font-semibold tracking-tight">{cls.name}</h3>
          {showSave && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSave(cls.slug);
              }}
              className="p-1.5 -mr-1 -mt-1 text-brand-dark/40 hover:text-brand-warm transition-colors"
              aria-label={saved ? "Remove from My Classes" : "Save to My Classes"}
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-brand-warm text-brand-warm" : ""}`} />
            </button>
          )}
        </div>
        <p className="text-[15px] text-brand-dark/70 leading-relaxed mb-4">
          {cls.shortDescription}
        </p>
      </div>

      <Link 
        href={`/classes/${cls.slug}`}
        className="mt-auto inline-flex items-center text-brand-blue font-medium hover:underline text-sm"
      >
        Learn more about {cls.name.split(" ")[1] || cls.name} →
      </Link>
    </motion.div>
  );
}

