"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { quizQuestions, calculateScores, getTopClasses, isFlatProfile } from "@/lib/quiz";
import { getClassBySlug, ClassSlug, ClassData } from "@/lib/classes";
import { ArrowLeft } from "lucide-react";
import BookingModal from "@/components/BookingModal";
import { useSavedClasses } from "@/lib/useSavedClasses";

const ADVANCE_DELAY_MS = 280;

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    Array(quizQuestions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [resultClass, setResultClass] = useState<ClassData | null>(null);
  const [affinities, setAffinities] = useState<ClassSlug[]>([]);
  const [flatProfile, setFlatProfile] = useState(false);

  const advancingRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const { toggleSave, isSaved } = useSavedClasses();

  const showResultsFromAnswers = (finalAnswers: number[]) => {
    const scores = calculateScores(finalAnswers);
    const { primary, affinities: aff } = getTopClasses(scores);
    const primaryData = getClassBySlug(primary);

    if (primaryData) {
      setResultClass(primaryData);
      setAffinities(aff);
      setFlatProfile(isFlatProfile(finalAnswers, scores));
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

      if (questionIndex < quizQuestions.length - 1) {
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
    const fresh = Array(quizQuestions.length).fill(-1);
    answersRef.current = fresh;
    setCurrent(0);
    setAnswers(fresh);
    setShowResults(false);
    setResultClass(null);
    setAffinities([]);
    setFlatProfile(false);
  };

  const currentQuestion = quizQuestions[current];
  const progress = ((current + 1) / quizQuestions.length) * 100;
  const primarySaved = resultClass ? isSaved(resultClass.slug) : false;

  if (!currentQuestion && !showResults) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {!showResults && currentQuestion ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 text-brand-dark/60">
              <div>
                Question {current + 1} of {quizQuestions.length}
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
              CLASS DISCOVERY QUIZ
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
      ) : resultClass ? (
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-brand-success/10 text-brand-success text-sm font-medium">
            YOUR RESULTS
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-2">
            You most identify with
          </h1>
          <div className="text-5xl md:text-6xl font-semibold tracking-tighter text-brand-blue mb-4">
            {resultClass.name}
          </div>

          {flatProfile && (
            <p className="max-w-xl mx-auto text-lg text-brand-dark/80 mb-6 px-4 py-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
              You appear to be managing fairly well across several areas. Many people in your
              situation still benefit from understanding their brain patterns more deeply.
            </p>
          )}

          <p className="max-w-xl mx-auto text-lg text-brand-dark/80 mb-8">
            {resultClass.shortDescription}
          </p>

          {affinities.length > 0 && (
            <div className="mb-10">
              <div className="text-sm font-medium mb-2 text-brand-dark/60">
                You also strongly connect with
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {affinities.map((slug) => {
                  const aff = getClassBySlug(slug);
                  return aff ? (
                    <Link key={slug} href={`/classes/${slug}`} className="result-chip">
                      {aff.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="card p-8 text-left max-w-2xl mx-auto mb-8">
            <div className="uppercase text-xs tracking-widest text-brand-blue mb-2">
              HOW BRAINTOPIA CAN HELP
            </div>
            <p className="text-[15px]">{resultClass.howBraintopiaHelps}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              type="button"
              onClick={() => toggleSave(resultClass.slug)}
              className="px-6 py-3 rounded-full border flex items-center justify-center gap-2 hover:bg-white"
            >
              {primarySaved ? "Saved ✓" : "Save this class"}
            </button>

            <Link
              href={`/classes/${resultClass.slug}`}
              className="px-6 py-3 rounded-full border hover:bg-white"
            >
              View full class profile
            </Link>

            <BookingModal preselectedClass={resultClass.name} />
          </div>

          <div className="text-sm mb-12">
            <button type="button" onClick={restart} className="text-brand-blue hover:underline">
              Retake the quiz
            </button>
            {" · "}
            <Link href="/classes" className="text-brand-blue hover:underline">
              Explore all classes
            </Link>
          </div>

          <div className="max-w-md mx-auto text-xs text-brand-dark/60">
            Results are for self-reflection and education only. A QEEG brain map gives a much
            more complete picture.
          </div>
        </div>
      ) : null}
    </div>
  );
}