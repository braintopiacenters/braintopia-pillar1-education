"use client";

import Link from "next/link";
import { getClassBySlug } from "@/lib/classes";
import { useSavedClasses } from "@/lib/useSavedClasses";
import { Heart } from "lucide-react";

export default function MyClassesPage() {
  const { saved, remove } = useSavedClasses();

  const savedClasses = saved
    .map((slug) => getClassBySlug(slug))
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight mb-2">My Classes</h1>
      <p className="text-lg text-brand-dark/70 mb-10">
        Classes you&apos;ve saved to explore further. Your selections are stored in your browser.
      </p>

      {savedClasses.length === 0 ? (
        <div className="card p-12 text-center">
          <Heart className="mx-auto mb-4 text-brand-dark/30 w-10 h-10" />
          <h3 className="font-semibold text-xl mb-2">No classes saved yet</h3>
          <p className="text-brand-dark/60 mb-6 max-w-md mx-auto">
            Take the quiz or browse the codex and save the classes that feel most like you.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/quiz" className="btn-primary px-6 py-2.5 rounded-full">Take the Quiz</Link>
            <Link href="/classes" className="px-6 py-2.5 rounded-full border">Browse Classes</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="text-sm mb-4 text-brand-dark/60">
            {savedClasses.length} of 7 classes saved
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedClasses.map((cls) => (
              <div key={cls!.slug} className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-semibold tracking-tight">{cls!.name}</h3>
                  <button
                    onClick={() => remove(cls!.slug)}
                    className="text-brand-warm/70 hover:text-brand-warm"
                    aria-label="Remove"
                  >
                    <Heart className="w-5 h-5 fill-brand-warm" />
                  </button>
                </div>
                <p className="text-[15px] text-brand-dark/70 mb-5 line-clamp-3">
                  {cls!.shortDescription}
                </p>
                <div className="flex gap-3">
                  <Link href={`/classes/${cls!.slug}`} className="text-brand-blue text-sm font-medium">
                    View full details →
                  </Link>
                  <Link href={`/quiz?class=${cls!.slug}`} className="text-sm text-brand-dark/60 hover:text-brand-dark">
                    Revisit in quiz
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
