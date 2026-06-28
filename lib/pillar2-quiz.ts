import { Pillar2ClassSlug } from "./pillar2-classes";

export const PILLAR2_ANSWER_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
] as const;

const LIKERT_MULTIPLIERS = [3, 2, 1, 0, 0] as const;

export const PILLAR2_NEUTRAL_OPTION_INDEX = 2;

export interface Pillar2QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<Pillar2ClassSlug, number>>;
  }[];
}

interface LikertQuestionDef {
  id: number;
  question: string;
  classWeights: Partial<Record<Pillar2ClassSlug, number>>;
}

const likertQuestionDefs: LikertQuestionDef[] = [
  {
    id: 1,
    question:
      "I often work in environments where I need to stay alert, respond quickly, or make fast decisions with serious consequences.",
    classWeights: { "the-protector": 3, "the-anchor": 2, "the-night-watch": 1 },
  },
  {
    id: 2,
    question:
      "I carry the emotional weight of what I've seen, handled, or prevented while serving or responding to others in crisis.",
    classWeights: { "the-protector": 3, "the-healer": 2, "the-anchor": 1 },
  },
  {
    id: 3,
    question:
      "My schedule or work demands make it hard to maintain regular sleep, routines, or recovery time.",
    classWeights: { "the-night-watch": 3, "the-healer": 2, "the-protector": 1 },
  },
  {
    id: 4,
    question:
      "I absorb stress or emotions from the people I serve or care for, even when I try to stay steady.",
    classWeights: { "the-healer": 3, "the-anchor": 2, "the-protector": 1 },
  },
  {
    id: 5,
    question:
      "Reintegration into family or \"normal\" life after periods of high alertness or service feels challenging.",
    classWeights: { "the-protector": 3, "the-night-watch": 2, "the-anchor": 1 },
  },
  {
    id: 6,
    question:
      "I feel responsible for protecting, supporting, or caring for others, often while putting my own needs aside.",
    classWeights: { "the-protector": 3, "the-healer": 3, "the-anchor": 1 },
  },
  {
    id: 7,
    question:
      "The nature of my work or service makes it difficult to fully turn off my mind or relax even when I'm off duty.",
    classWeights: { "the-protector": 3, "the-night-watch": 2, "the-healer": 1 },
  },
];

function buildLikertOptions(
  classWeights: Partial<Record<Pillar2ClassSlug, number>>
): Pillar2QuizQuestion["options"] {
  return PILLAR2_ANSWER_SCALE.map((text, index) => {
    const multiplier = LIKERT_MULTIPLIERS[index];
    const scores: Partial<Record<Pillar2ClassSlug, number>> = {};

    (Object.keys(classWeights) as Pillar2ClassSlug[]).forEach((slug) => {
      const weight = classWeights[slug] ?? 0;
      const score = weight * multiplier;
      if (score > 0) scores[slug] = score;
    });

    return { text, scores };
  });
}

export const pillar2QuizQuestions: Pillar2QuizQuestion[] = likertQuestionDefs.map((def) => ({
  id: def.id,
  question: def.question,
  options: buildLikertOptions(def.classWeights),
}));

const EMPTY_SCORES = (): Record<Pillar2ClassSlug, number> => ({
  "the-protector": 0,
  "the-anchor": 0,
  "the-healer": 0,
  "the-night-watch": 0,
});

export function calculatePillar2Scores(answers: number[]): Record<Pillar2ClassSlug, number> {
  const scores = EMPTY_SCORES();

  answers.forEach((optionIndex, qIndex) => {
    const question = pillar2QuizQuestions[qIndex];
    if (!question) return;
    const selected = question.options[optionIndex];
    if (!selected) return;

    (Object.keys(selected.scores) as Pillar2ClassSlug[]).forEach((slug) => {
      scores[slug] += selected.scores[slug] || 0;
    });
  });

  return scores;
}

export function isFlatPillar2Profile(
  answers: number[],
  scores: Record<Pillar2ClassSlug, number>
): boolean {
  const neutralCount = answers.filter((answer) => answer === PILLAR2_NEUTRAL_OPTION_INDEX).length;
  const mostlyNeutral = neutralCount >= 5;

  const sorted = (Object.values(scores) as number[]).sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const second = sorted[1] ?? 0;
  const lowAndEven = top <= 10 && top - second <= 1;

  return mostlyNeutral || lowAndEven;
}

export function getTopPillar2Classes(scores: Record<Pillar2ClassSlug, number>) {
  const entries = Object.entries(scores) as [Pillar2ClassSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primary = entries[0][0];
  const primaryScore = entries[0][1];

  const affinities = entries
    .slice(1, 3)
    .filter(([, score]) => score >= Math.max(1, primaryScore - 3))
    .map(([slug]) => slug);

  return { primary, affinities, scores };
}