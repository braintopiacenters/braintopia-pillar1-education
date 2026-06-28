import { Pillar4ClassSlug } from "./pillar4-classes";

export const PILLAR4_ANSWER_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
] as const;

const LIKERT_MULTIPLIERS = [3, 2, 1, 0, 0] as const;

export const PILLAR4_NEUTRAL_OPTION_INDEX = 2;

export interface Pillar4QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<Pillar4ClassSlug, number>>;
  }[];
}

interface LikertQuestionDef {
  id: number;
  question: string;
  classWeights: Partial<Record<Pillar4ClassSlug, number>>;
}

const likertQuestionDefs: LikertQuestionDef[] = [
  {
    id: 1,
    question:
      "I'm navigating recovery, transitions, aging, sleep issues, or trying to restore my mental clarity and energy.",
    classWeights: {
      "the-recoverer": 3,
      "the-recalibrator": 2,
      "the-sharp-mind": 2,
      "the-overloaded": 2,
    },
  },
  {
    id: 2,
    question:
      "I often deal with brain fog, fatigue, or feeling like my mind is not as sharp as it used to be.",
    classWeights: {
      "the-overloaded": 3,
      "the-recoverer": 2,
      "the-recalibrator": 2,
      "the-sharp-mind": 2,
    },
  },
  {
    id: 3,
    question:
      "I'm trying to rebuild confidence, focus, and daily capacity after a period of high stress, illness, or life change.",
    classWeights: {
      "the-recoverer": 3,
      "the-overloaded": 2,
      "the-recalibrator": 2,
    },
  },
  {
    id: 4,
    question: "Sleep quality and feeling rested have become more difficult for me.",
    classWeights: {
      "the-overloaded": 3,
      "the-recalibrator": 2,
      "the-recoverer": 1,
      "the-sharp-mind": 1,
    },
  },
  {
    id: 5,
    question:
      "I carry a lot of emotional weight or stress that affects my energy and mental clarity.",
    classWeights: {
      "the-overloaded": 3,
      "the-recalibrator": 2,
      "the-recoverer": 1,
    },
  },
  {
    id: 6,
    question:
      "I want to stay mentally engaged and independent as I age or move through life changes.",
    classWeights: {
      "the-sharp-mind": 3,
      "the-recalibrator": 2,
      "the-overloaded": 1,
    },
  },
  {
    id: 7,
    question:
      "I'm working on regaining emotional steadiness and patience after a period of depletion or disruption.",
    classWeights: {
      "the-overloaded": 3,
      "the-recoverer": 2,
      "the-recalibrator": 1,
    },
  },
];

function buildLikertOptions(
  classWeights: Partial<Record<Pillar4ClassSlug, number>>
): Pillar4QuizQuestion["options"] {
  return PILLAR4_ANSWER_SCALE.map((text, index) => {
    const multiplier = LIKERT_MULTIPLIERS[index];
    const scores: Partial<Record<Pillar4ClassSlug, number>> = {};

    (Object.keys(classWeights) as Pillar4ClassSlug[]).forEach((slug) => {
      const weight = classWeights[slug] ?? 0;
      const score = weight * multiplier;
      if (score > 0) scores[slug] = score;
    });

    return { text, scores };
  });
}

export const pillar4QuizQuestions: Pillar4QuizQuestion[] = likertQuestionDefs.map((def) => ({
  id: def.id,
  question: def.question,
  options: buildLikertOptions(def.classWeights),
}));

const EMPTY_SCORES = (): Record<Pillar4ClassSlug, number> => ({
  "the-recoverer": 0,
  "the-recalibrator": 0,
  "the-sharp-mind": 0,
  "the-overloaded": 0,
});

export function calculatePillar4Scores(answers: number[]): Record<Pillar4ClassSlug, number> {
  const scores = EMPTY_SCORES();

  answers.forEach((optionIndex, qIndex) => {
    const question = pillar4QuizQuestions[qIndex];
    if (!question) return;
    const selected = question.options[optionIndex];
    if (!selected) return;

    (Object.keys(selected.scores) as Pillar4ClassSlug[]).forEach((slug) => {
      scores[slug] += selected.scores[slug] || 0;
    });
  });

  return scores;
}

export function isFlatPillar4Profile(
  answers: number[],
  scores: Record<Pillar4ClassSlug, number>
): boolean {
  const neutralCount = answers.filter((answer) => answer === PILLAR4_NEUTRAL_OPTION_INDEX).length;
  const mostlyNeutral = neutralCount >= 5;

  const sorted = (Object.values(scores) as number[]).sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const second = sorted[1] ?? 0;
  const lowAndEven = top <= 10 && top - second <= 1;

  return mostlyNeutral || lowAndEven;
}

export function getTopPillar4Classes(scores: Record<Pillar4ClassSlug, number>) {
  const entries = Object.entries(scores) as [Pillar4ClassSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primary = entries[0][0];
  const primaryScore = entries[0][1];

  const affinities = entries
    .slice(1, 3)
    .filter(([, score]) => score >= Math.max(1, primaryScore - 3))
    .map(([slug]) => slug);

  return { primary, affinities, scores };
}