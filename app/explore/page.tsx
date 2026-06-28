"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import braintopiaLogo from "@/assets/braintopia-logo.png";
import { explorePillars, ExplorePillar } from "@/lib/explore-pillars";
import { PillarSlug } from "@/lib/pillars";

const selectClassName =
  "w-full border rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:border-brand-blue bg-white text-brand-dark";

export default function ExplorePage() {
  const [selectedPillarSlug, setSelectedPillarSlug] = useState<PillarSlug>(
    explorePillars[0].slug
  );
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);

  const selectedPillar = useMemo(
    () => explorePillars.find((p) => p.slug === selectedPillarSlug) ?? explorePillars[0],
    [selectedPillarSlug]
  );

  const selectedClass = selectedPillar.classes[selectedClassIndex] ?? selectedPillar.classes[0];

  const handlePillarChange = (slug: PillarSlug) => {
    setSelectedPillarSlug(slug);
    setSelectedClassIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="text-center mb-10 md:mb-12">
        <div className="flex justify-center mb-6 md:mb-8">
          <img
            src={braintopiaLogo.src}
            alt="Braintopia"
            className="h-[7.5rem] sm:h-36 md:h-[10.5rem] w-auto max-w-[min(100%,420px)] sm:max-w-[480px] md:max-w-[540px] object-contain"
          />
        </div>

        <div className="inline-block mb-5 px-4 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs tracking-widest font-medium">
          EXPLORE PILLARS &amp; CLASSES
        </div>

        <h1 className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tighter text-brand-dark mb-5 leading-[1.2]">
          Explore Braintopia&apos;s Four Pillars
        </h1>

        <p className="max-w-2xl mx-auto text-brand-dark/70 text-[15px] md:text-base">
          Each pillar represents a different kind of brain load. Choose a pillar and class below to
          learn more — or take the quiz to discover where you fit best.
        </p>
      </div>

      <div className="card p-6 md:p-10 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8">
          <div>
            <label htmlFor="pillar-select" className="block text-sm font-medium mb-2">
              Select your Pillar
            </label>
            <select
              id="pillar-select"
              value={selectedPillarSlug}
              onChange={(e) => handlePillarChange(e.target.value as PillarSlug)}
              className={selectClassName}
            >
              {explorePillars.map((pillar) => (
                <option key={pillar.slug} value={pillar.slug}>
                  Pillar {pillar.number}: {pillar.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="class-select" className="block text-sm font-medium mb-2">
              Select Class
            </label>
            <select
              id="class-select"
              value={selectedClassIndex}
              onChange={(e) => setSelectedClassIndex(Number(e.target.value))}
              className={selectClassName}
            >
              {selectedPillar.classes.map((cls, index) => (
                <option key={`${selectedPillar.slug}-${cls.slug ?? cls.name}`} value={index}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <PillarDescription pillar={selectedPillar} />

        {selectedClass && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-xs tracking-widest text-brand-blue font-medium mb-2">
              SELECTED CLASS
            </div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
              {selectedClass.name}
            </h2>
            <p className="text-[15px] text-brand-dark/80 leading-relaxed">
              {selectedClass.shortDescription}
            </p>

            {selectedClass.href ? (
              <Link
                href={selectedClass.href}
                className="btn-primary inline-flex items-center justify-center gap-2 mt-6 w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold"
              >
                View full class profile
                <ArrowRight size={18} />
              </Link>
            ) : (
              <p className="mt-4 text-sm text-brand-dark/50">
                Full class profile coming soon.
              </p>
            )}
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-center space-y-4">
          {selectedPillar.quizHref && (
            <Link
              href={selectedPillar.quizHref}
              className="btn-primary inline-flex items-center justify-center gap-2.5 w-full sm:w-auto max-w-xl px-8 py-3.5 rounded-full text-base font-semibold"
            >
              <Compass className="w-5 h-5 shrink-0" />
              Take the full class quiz
            </Link>
          )}

          <Link
            href="/find-your-pillar"
            className="btn-primary inline-flex items-center justify-center gap-2.5 w-full sm:w-auto max-w-xl px-8 py-3.5 rounded-full text-base font-semibold"
          >
            <Compass className="w-5 h-5 shrink-0" />
            Not sure which pillar fits you? Take the Pillar Finder Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

function PillarDescription({ pillar }: { pillar: ExplorePillar }) {
  return (
    <div className="rounded-xl bg-brand-blue/5 border border-brand-blue/10 px-5 py-4">
      <div className="text-xs tracking-widest text-brand-blue font-medium mb-1">
        PILLAR {pillar.number}
      </div>
      {pillar.quizHref ? (
        <h2 className="text-lg font-semibold mb-2">
          <Link
            href={pillar.quizHref}
            className="text-brand-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded-sm"
          >
            {pillar.name}
          </Link>
        </h2>
      ) : (
        <h2 className="text-lg font-semibold mb-2">{pillar.name}</h2>
      )}
      <p className="text-[15px] text-brand-dark/80 leading-relaxed">{pillar.shortDescription}</p>
    </div>
  );
}