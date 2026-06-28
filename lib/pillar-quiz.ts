import { PillarSlug } from "./pillars";

export const PILLAR_ANSWER_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
] as const;

const LIKERT_MULTIPLIERS = [3, 2, 1, 0, 0] as const;

export const PILLAR_NEUTRAL_OPTION_INDEX = 2;

export interface PillarQuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<PillarSlug, number>>;
  }[];
}

interface LikertQuestionDef {
  id: number;
  question: string;
  pillarWeights: Partial<Record<PillarSlug, number>>;
}

const likertQuestionDefs: LikertQuestionDef[] = [
  {
    id: 1,
    question:
      "I often find myself in roles where I'm helping, guiding, or supporting other people (students, family, clients, or team members).",
    pillarWeights: { "education-family": 3, "service-care": 2 },
  },
  {
    id: 2,
    question:
      "I work in high-pressure or service-oriented environments where I need to stay alert, respond quickly, or care for others under stress.",
    pillarWeights: { "service-care": 3, "education-family": 1 },
  },
  {
    id: 3,
    question:
      "Performance, focus, and consistency under pressure are important to me — whether in sports, work, creativity, or leadership.",
    pillarWeights: { performance: 3, "service-care": 1 },
  },
  {
    id: 4,
    question:
      "I'm navigating recovery, transitions, aging, sleep issues, or trying to restore my mental clarity and energy.",
    pillarWeights: { restoration: 3, "education-family": 1 },
  },
  {
    id: 5,
    question:
      "I deal with the mental load of education, family routines, homework, or supporting children's development and emotional needs.",
    pillarWeights: { "education-family": 3 },
  },
  {
    id: 6,
    question:
      "I'm in a creative, competitive, or high-visibility role where I need to deliver results and stay sharp.",
    pillarWeights: { performance: 3, "service-care": 1 },
  },
  {
    id: 7,
    question:
      "I'm focused on long-term brain health, resilience, or rebuilding capacity after periods of high stress or life changes.",
    pillarWeights: { restoration: 3, performance: 1 },
  },
];

function buildLikertOptions(
  pillarWeights: Partial<Record<PillarSlug, number>>
): PillarQuizQuestion["options"] {
  return PILLAR_ANSWER_SCALE.map((text, index) => {
    const multiplier = LIKERT_MULTIPLIERS[index];
    const scores: Partial<Record<PillarSlug, number>> = {};

    (Object.keys(pillarWeights) as PillarSlug[]).forEach((slug) => {
      const weight = pillarWeights[slug] ?? 0;
      const score = weight * multiplier;
      if (score > 0) scores[slug] = score;
    });

    return { text, scores };
  });
}

export const pillarQuizQuestions: PillarQuizQuestion[] = likertQuestionDefs.map((def) => ({
  id: def.id,
  question: def.question,
  options: buildLikertOptions(def.pillarWeights),
}));

const EMPTY_SCORES = (): Record<PillarSlug, number> => ({
  "education-family": 0,
  "service-care": 0,
  performance: 0,
  restoration: 0,
});

export function calculatePillarScores(answers: number[]): Record<PillarSlug, number> {
  const scores = EMPTY_SCORES();

  answers.forEach((optionIndex, qIndex) => {
    const question = pillarQuizQuestions[qIndex];
    if (!question) return;
    const selected = question.options[optionIndex];
    if (!selected) return;

    (Object.keys(selected.scores) as PillarSlug[]).forEach((slug) => {
      scores[slug] += selected.scores[slug] || 0;
    });
  });

  return scores;
}

export function isFlatPillarProfile(
  answers: number[],
  scores: Record<PillarSlug, number>
): boolean {
  const neutralCount = answers.filter((answer) => answer === PILLAR_NEUTRAL_OPTION_INDEX).length;
  const mostlyNeutral = neutralCount >= 5;

  const sorted = (Object.values(scores) as number[]).sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const second = sorted[1] ?? 0;
  const lowAndEven = top <= 12 && top - second <= 2;

  return mostlyNeutral || lowAndEven;
}

export function getTopPillars(scores: Record<PillarSlug, number>) {
  const entries = Object.entries(scores) as [PillarSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primary = entries[0][0];
  const primaryScore = entries[0][1];

  const affinities = entries
    .slice(1, 3)
    .filter(([, score]) => score >= Math.max(1, primaryScore - 3))
    .map(([slug]) => slug);

  return { primary, affinities, scores };
}