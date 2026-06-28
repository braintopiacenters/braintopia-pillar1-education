"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  pillarQuizQuestions,
  calculatePillarScores,
  getTopPillars,
  isFlatPillarProfile,
} from "@/lib/pillar-quiz";
import { getPillarBySlug, PillarSlug, PillarData } from "@/lib/pillars";
import { ArrowLeft, ArrowRight, Compass, ExternalLink } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import braintopiaLogo from "@/assets/braintopia-logo.png";

const ADVANCE_DELAY_MS = 280;

const PILLAR_OVERVIEW = [
  { number: 1, name: "Education & Family Support", href: "/classes#pillar-1" },
  { number: 2, name: "Service & High-Stress Professions", href: "/classes#pillar-2" },
  { number: 3, name: "Performance & Professional Excellence", href: "/classes#pillar-3" },
  { number: 4, name: "Recovery & Lifespan Cognitive Wellness", href: "/classes#pillar-4" },
] as const;

const pillarNameLinkClass =
  "text-brand-blue font-medium hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded-sm";

function PillarOverviewName({
  name,
  href,
}: {
  name: string;
  href: string | null;
}) {
  if (href) {
    return (
      <Link href={href} className={pillarNameLinkClass}>
        {name}
      </Link>
    );
  }

  return <span className={`${pillarNameLinkClass} cursor-default`}>{name}</span>;
}

function PillarLink({ pillar }: { pillar: PillarData }) {
  const className =
    "btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full";

  if (pillar.external) {
    return (
      <a href={pillar.href} target="_blank" rel="noopener noreferrer" className={className}>
        Explore {pillar.name}
        <ExternalLink size={16} />
      </a>
    );
  }

  return (
    <Link href={pillar.href} className={className}>
      Explore {pillar.name}
      <ArrowRight size={16} />
    </Link>
  );
}

function QuizLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex justify-center ${compact ? "mb-6" : "mb-6 md:mb-8"}`}>
      <img
        src={braintopiaLogo.src}
        alt="Braintopia"
        className={
          compact
            ? "h-24 sm:h-28 w-auto max-w-[min(100%,320px)] object-contain"
            : "h-[7.5rem] sm:h-36 md:h-[10.5rem] w-auto max-w-[min(100%,420px)] sm:max-w-[480px] md:max-w-[540px] object-contain"
        }
      />
    </div>
  );
}

export default function FindYourPillarPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    Array(pillarQuizQuestions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [resultPillar, setResultPillar] = useState<PillarData | null>(null);
  const [affinities, setAffinities] = useState<PillarSlug[]>([]);
  const [flatProfile, setFlatProfile] = useState(false);

  const advancingRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const showResultsFromAnswers = (finalAnswers: number[]) => {
    const scores = calculatePillarScores(finalAnswers);
    const { primary, affinities: aff } = getTopPillars(scores);
    const primaryData = getPillarBySlug(primary);

    if (primaryData) {
      setResultPillar(primaryData);
      setAffinities(aff);
      setFlatProfile(isFlatPillarProfile(finalAnswers, scores));
      setShowResults(true);
    }
  };

  const selectAnswer = (optionIndex: number) => {
    if (advancingRef.current) return;

    const questionIndex = current;
    advancingRef.current = true;

    const nextAnswers = [...answersRef.current];
    nextAnswers[questionIndex] = optionIndex;
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);

    window.setTimeout(() => {
      advancingRef.current = false;

      if (questionIndex < pillarQuizQuestions.length - 1) {
        setCurrent(questionIndex + 1);
        return;
      }

      showResultsFromAnswers(nextAnswers);
    }, ADVANCE_DELAY_MS);
  };

  const goBack = () => {
    if (advancingRef.current || current === 0) return;
    setCurrent((q) => q - 1);
  };

  const restart = () => {
    advancingRef.current = false;
    const fresh = Array(pillarQuizQuestions.length).fill(-1);
    answersRef.current = fresh;
    setQuizStarted(false);
    setCurrent(0);
    setAnswers(fresh);
    setShowResults(false);
    setResultPillar(null);
    setAffinities([]);
    setFlatProfile(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentQuestion = pillarQuizQuestions[current];
  const progress = ((current + 1) / pillarQuizQuestions.length) * 100;

  if (!quizStarted && !showResults) {
    return (
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20 text-center">
        <QuizLogo />

        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs tracking-widest font-medium">
          PILLAR FINDER QUIZ
        </div>

        <h1 className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tighter text-brand-dark mb-6 leading-[1.2]">
          Discover which pillar best matches your life and needs.
        </h1>

        <p className="max-w-2xl mx-auto text-brand-dark/70 text-[15px] md:text-base mb-10">
          Braintopia organizes brain health support around four pillars — each designed for a
          different kind of mental load. This short quiz helps you explore where you may fit best
          right now.
        </p>

        <div className="card max-w-2xl mx-auto p-6 md:p-8 text-left mb-10">
          <div className="space-y-3">
            {PILLAR_OVERVIEW.map((pillar) => (
              <div
                key={pillar.number}
                className="flex gap-3 items-start text-[15px] md:text-base text-brand-dark/80"
              >
                <span className="shrink-0 font-semibold text-brand-blue">
                  Pillar {pillar.number}:
                </span>
                <PillarOverviewName name={pillar.name} href={pillar.href} />
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-xl mx-auto text-brand-dark/80 text-[15px] md:text-base mb-5">
          Need help deciding what pillar you&apos;re in? Start the quiz
        </p>

        <button
          type="button"
          onClick={startQuiz}
          className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <Compass className="w-5 h-5 shrink-0" />
          Start the Quiz
        </button>

        <p className="mt-6 text-sm text-brand-dark/60">
          7 thoughtful questions · About 2 minutes · No right or wrong answers
        </p>
      </div>
    );
  }

  if (!currentQuestion && !showResults) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {!showResults && currentQuestion ? (
        <>
          <QuizLogo compact />

          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 text-brand-dark/60">
              <div>
                Question {current + 1} of {pillarQuizQuestions.length}
              </div>
              <div>{Math.round(progress)}%</div>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mb-6 text-center">
            <p className="text-brand-dark/70 text-[15px] max-w-lg mx-auto">
              Take a moment with each statement. There are no right or wrong answers — just
              choose what feels most true for you right now.
            </p>
          </div>

          <div key={current} className="card p-8 md:p-10">
            <div className="text-xs tracking-widest text-brand-blue font-medium mb-3">
              PILLAR FINDER QUIZ
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={`${current}-${idx}`}
                  type="button"
                  onClick={() => selectAnswer(idx)}
                  className={`question-option w-full text-left ${
                    answers[current] === idx ? "selected" : ""
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={goBack}
                disabled={current === 0}
                className="flex items-center gap-1 text-sm disabled:opacity-40"
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <div className="text-xs text-brand-dark/50">Tap the response that fits best</div>
            </div>
          </div>
        </>
      ) : resultPillar ? (
        <div className="text-center">
          <QuizLogo compact />

          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-brand-success/10 text-brand-success text-sm font-medium">
            YOUR RESULTS
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2">
            You most align with
          </h1>
          <div className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-blue mb-2">
            {resultPillar.name}
          </div>
          <p className="text-brand-dark/60 mb-6">{resultPillar.tagline}</p>

          {flatProfile && (
            <p className="max-w-xl mx-auto text-lg text-brand-dark/80 mb-6 px-4 py-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
              Your responses suggest you may be carrying brain load across several areas of life
              right now — and that&apos;s more common than you might think. You&apos;re welcome to
              explore all four pillars, or book a QEEG assessment for a clearer picture of how your
              brain is working beneath the surface.
            </p>
          )}

          <p className="max-w-xl mx-auto text-lg text-brand-dark/80 mb-8">
            {resultPillar.shortDescription}
          </p>

          {affinities.length > 0 && (
            <div className="mb-10">
              <div className="text-sm font-medium mb-2 text-brand-dark/60">
                You also connect with
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {affinities.map((slug) => {
                  const aff = getPillarBySlug(slug);
                  return aff ? (
                    <span key={slug} className="result-chip">
                      {aff.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {resultPillar.slug === "education-family" && (
            <div className="card p-8 text-left max-w-2xl mx-auto mb-8">
              <div className="uppercase text-xs tracking-widest text-brand-blue mb-2">
                GO DEEPER IN PILLAR 1
              </div>
              <p className="text-[15px] text-brand-dark/80 mb-4">
                You&apos;re already in the right place. Take the class discovery quiz to find which
                of the seven education &amp; family groups you most identify with.
              </p>
              <Link
                href="/education-family-support-quiz"
                className="text-brand-blue font-medium hover:underline inline-flex items-center gap-1"
              >
                Discover your class <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <PillarLink pillar={resultPillar} />
            <BookingModal
              preselectedClass={`Pillar ${resultPillar.number}: ${resultPillar.name}`}
              triggerText="Request More Information"
              triggerClassName="px-6 py-3 rounded-full border flex items-center justify-center gap-2 hover:bg-white"
            />
          </div>

          {flatProfile && (
            <div className="mb-8">
              <div className="text-sm text-brand-dark/60 mb-3">Explore all four pillars</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(["education-family", "service-care", "performance", "restoration"] as PillarSlug[])
                  .filter((slug) => slug !== resultPillar.slug)
                  .map((slug) => {
                    const p = getPillarBySlug(slug);
                    if (!p) return null;
                    const chipClass = "result-chip hover:bg-brand-blue/10 transition-colors";
                    return p.external ? (
                      <a
                        key={slug}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={chipClass}
                      >
                        {p.name}
                      </a>
                    ) : (
                      <Link key={slug} href={p.href} className={chipClass}>
                        {p.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="text-sm mb-12">
            <button type="button" onClick={restart} className="text-brand-blue hover:underline">
              Retake the quiz
            </button>
            {" · "}
            <Link href="/" className="text-brand-blue hover:underline">
              Back to home
            </Link>
          </div>

          <div className="max-w-md mx-auto text-xs text-brand-dark/60">
            Results are for self-reflection and education only. A QEEG brain map gives a much more
            complete picture of how your brain carries life&apos;s demands.
          </div>
        </div>
      ) : null}
    </div>
  );
}