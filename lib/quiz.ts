import { ClassSlug } from "./classes";

export const ANSWER_SCALE = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
] as const;

// Display order is reversed; multipliers map index → score weight.
// Neutral gives a low but non-zero contribution; disagreement gives none.
const LIKERT_MULTIPLIERS = [3, 2, 1, 0, 0] as const;

export const NEUTRAL_OPTION_INDEX = 2;

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<ClassSlug, number>>;
  }[];
}

interface LikertQuestionDef {
  id: number;
  question: string;
  classWeights: Partial<Record<ClassSlug, number>>;
}

const likertQuestionDefs: LikertQuestionDef[] = [
  {
    id: 1,
    question:
      "I often feel mentally drained by the end of the day from managing other people's needs or emotions.",
    classWeights: { "the-guide": 3, "the-caregiver": 3, "the-supporter": 1 },
  },
  {
    id: 2,
    question:
      "I struggle to stay focused or get started on tasks, even when I know what needs to be done.",
    classWeights: { "the-rebalancer": 3, "the-learner": 1, "the-different-thinker": 1 },
  },
  {
    id: 3,
    question:
      "Big changes or transitions (new school, new routine, new role, etc.) tend to throw me off more than most people.",
    classWeights: { "the-bridge": 3, "the-different-thinker": 1, "the-learner": 1 },
  },
  {
    id: 4,
    question:
      "I feel like I have to work harder than others just to keep up with daily expectations at school or work.",
    classWeights: { "the-learner": 3, "the-different-thinker": 2, "the-rebalancer": 1 },
  },
  {
    id: 5,
    question:
      "I often absorb other people's stress or emotions, even when I'm trying to stay steady for them.",
    classWeights: { "the-supporter": 3, "the-caregiver": 2, "the-guide": 1 },
  },
  {
    id: 6,
    question:
      "I sometimes feel overwhelmed by noise, lights, schedules, or too many things happening at once.",
    classWeights: { "the-different-thinker": 3, "the-rebalancer": 2, "the-guide": 1 },
  },
  {
    id: 7,
    question:
      "I carry a lot of mental responsibility for others (kids, students, family members, or colleagues) and it's hard to turn it off.",
    classWeights: { "the-caregiver": 3, "the-guide": 3, "the-supporter": 1 },
  },
];

function buildLikertOptions(
  classWeights: Partial<Record<ClassSlug, number>>
): QuizQuestion["options"] {
  return ANSWER_SCALE.map((text, index) => {
    const multiplier = LIKERT_MULTIPLIERS[index];
    const scores: Partial<Record<ClassSlug, number>> = {};

    (Object.keys(classWeights) as ClassSlug[]).forEach((slug) => {
      const weight = classWeights[slug] ?? 0;
      const score = weight * multiplier;
      if (score > 0) scores[slug] = score;
    });

    return { text, scores };
  });
}

export const quizQuestions: QuizQuestion[] = likertQuestionDefs.map((def) => ({
  id: def.id,
  question: def.question,
  options: buildLikertOptions(def.classWeights),
}));

const EMPTY_SCORES = (): Record<ClassSlug, number> => ({
  "the-guide": 0,
  "the-caregiver": 0,
  "the-learner": 0,
  "the-bridge": 0,
  "the-rebalancer": 0,
  "the-different-thinker": 0,
  "the-supporter": 0,
});

export function calculateScores(answers: number[]): Record<ClassSlug, number> {
  const scores = EMPTY_SCORES();

  answers.forEach((optionIndex, qIndex) => {
    const question = quizQuestions[qIndex];
    if (!question) return;
    const selected = question.options[optionIndex];
    if (!selected) return;

    (Object.keys(selected.scores) as ClassSlug[]).forEach((slug) => {
      scores[slug] += selected.scores[slug] || 0;
    });
  });

  return scores;
}

export function isFlatProfile(
  answers: number[],
  scores: Record<ClassSlug, number>
): boolean {
  const neutralCount = answers.filter((answer) => answer === NEUTRAL_OPTION_INDEX).length;
  const mostlyNeutral = neutralCount >= 5;

  const sorted = (Object.values(scores) as number[]).sort((a, b) => b - a);
  const top = sorted[0] ?? 0;
  const second = sorted[1] ?? 0;
  const lowAndEven = top <= 10 && top - second <= 1;

  return mostlyNeutral || lowAndEven;
}

export function getTopClasses(scores: Record<ClassSlug, number>) {
  const entries = Object.entries(scores) as [ClassSlug, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const primary = entries[0][0];
  const primaryScore = entries[0][1];

  const affinities = entries
    .slice(1, 3)
    .filter(([, score]) => score >= Math.max(1, primaryScore - 3))
    .map(([slug]) => slug);

  return { primary, affinities, scores };
}