import { Pillar3ClassSlug } from "./pillar3-classes";

export const PILLAR3_ANSWER_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
] as const;

const LIKERT_MULTIPLIERS = [3, 2, 1, 0, 0] as const;

export const PILLAR3_NEUTRAL_OPTION_INDEX = 2;

export interface Pillar3QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<Pillar3ClassSlug, number>>;
  }[];
}

interface LikertQuestionDef {
  id: number;
  question: string;
  classWeights: Partial<Record<Pillar3ClassSlug, number>>;
}

const likertQuestionDefs: LikertQuestionDef[] = [
  {
    id: 1,
    question:
      "Performance, focus, and consistency under pressure are important to me — whether in sports, work, creativity, or leadership.",
    classWeights: {
      "the-competitor": 3,
      "the-performer": 2,
      "the-strategist": 2,
      "the-creator": 1,
    },
  },
  {
    id: 2,
    question:
      "I often need to stay sharp, deliver results, or perform well when others are watching or evaluating me.",
    classWeights: { "the-performer": 3, "the-competitor": 2, "the-closer": 1 },
  },
  {
    id: 3,
    question:
      "I carry responsibility for making decisions, leading teams, or managing outcomes that affect others.",
    classWeights: { "the-strategist": 3, "the-team": 2, "the-advocate": 1 },
  },
  {
    id: 4,
    question:
      "I rely on creativity, originality, or the ability to generate ideas and produce work consistently.",
    classWeights: { "the-creator": 3, "the-performer": 1, "the-competitor": 1 },
  },
  {
    id: 5,
    question:
      "I frequently negotiate, close deals, persuade, or follow up with clients or customers under pressure.",
    classWeights: { "the-closer": 3, "the-advocate": 2, "the-strategist": 1 },
  },
  {
    id: 6,
    question:
      "I work in environments where I need to advocate, argue, present, or defend positions effectively.",
    classWeights: { "the-advocate": 3, "the-performer": 2, "the-strategist": 1 },
  },
  {
    id: 7,
    question:
      "I am part of a team where communication, morale, focus, and stress management affect everyone's performance.",
    classWeights: { "the-team": 3, "the-strategist": 1, "the-advocate": 1 },
  },
];

function buildLikertOptions(
  classWeights: Partial<Record<Pillar3ClassSlug, number>>
): Pillar3QuizQuestion["options"] {
  return PILLAR3_ANSWER_SCALE.map((text, index) => {
    const multiplier = LIKERT_MULTIPLIERS[index];
    const scores: Partial<Record<Pillar3ClassSlug, number>> = {};

    (Object.keys(classWeights) as Pillar3ClassSlug[]).forEach((slug) => {
      const weight = classWeights[slug] ?? 0;
      const score = weight * multiplier;
      if (score > 0) scores[slug] = score;
    });

    return { text, scores };
  });
}

export const pillar3QuizQuestions: Pillar3QuizQuestion[] = likertQuestionDefs.map((def) => ({
  id: def.id,
  question: def.question,
  options: buildLikertOptions(def.classWeights),
}));

const EMPTY_SCORES = (): Record<Pillar3ClassSlug, number> => ({
  "the-competitor": 0,
  "the-performer": 0,
  "the-strategist": 0,
  "the-advocate": 0,
  "the-closer": 0,
  "the-creator": 0,
  "the-team": 0,
});

export function calculatePillar3Scores(answers: number[]): Record<Pillar3ClassSlug, number> {
  const scores = EMPTY_SCORES();

  answers.forEach((optionIndex, qIndex) => {
    const question = pillar3QuizQuestions[qIndex];
    if (!question) return;
    const selected = question.options[optionIndex];
    if (!selected) return;

    (Object.keys(selected.scores) as Pillar3ClassSlug[]).forEach((slug) => {
      scores[slug] += selected.scores[slug] || 0;
    });
  });

  return scores;
}

export function isFlatPillar3Profile(
  answers: number[],
  scores: Record<Pillar3ClassSlug, number>
): boolean {
  const neutralCount = answers.filter((answer) => answer === PILLAR3_NEUTRAL_OPTION_INDEX).length;
  const mostlyNeutral = neutralCount >= 5;

  const sorted = (Object.values(scores) as number[]).sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const second = sorted[1] ?? 0;
  const lowAndEven = top <= 10 && top - second <= 1;

  return mostlyNeutral || lowAndEven;
}

export function getTopPillar3Classes(scores: Record<Pillar3ClassSlug, number>) {
  const entries = Object.entries(scores) as [Pillar3ClassSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primary = entries[0][0];
  const primaryScore = entries[0][1];

  const affinities = entries
    .slice(1, 3)
    .filter(([, score]) => score >= Math.max(1, primaryScore - 3))
    .map(([slug]) => slug);

  return { primary, affinities, scores };
}