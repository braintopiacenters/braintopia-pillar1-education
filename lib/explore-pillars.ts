import { classes } from "./classes";
import { pillar2Classes } from "./pillar2-classes";
import { pillar3Classes } from "./pillar3-classes";
import { pillar4Classes } from "./pillar4-classes";
import { PillarSlug } from "./pillars";

export interface ExploreClass {
  slug: string | null;
  name: string;
  shortDescription: string;
  href: string | null;
}

export interface ExplorePillar {
  slug: PillarSlug;
  number: number;
  name: string;
  shortDescription: string;
  quizHref: string | null;
  classes: ExploreClass[];
}

const pillar1Classes: ExploreClass[] = classes.map((cls) => ({
  slug: cls.slug,
  name: cls.name,
  shortDescription: cls.shortDescription,
  href: `/classes/${cls.slug}`,
}));

const pillar2ClassesExplore: ExploreClass[] = pillar2Classes.map((cls) => ({
  slug: cls.slug,
  name: cls.name,
  shortDescription: cls.shortDescription,
  href: `/classes/${cls.slug}`,
}));

const pillar3ClassesExplore: ExploreClass[] = pillar3Classes.map((cls) => ({
  slug: cls.slug,
  name: cls.name,
  shortDescription: cls.shortDescription,
  href: `/classes/${cls.slug}`,
}));

const pillar4ClassesExplore: ExploreClass[] = pillar4Classes.map((cls) => ({
  slug: cls.slug,
  name: cls.name,
  shortDescription: cls.shortDescription,
  href: `/classes/${cls.slug}`,
}));

export const explorePillars: ExplorePillar[] = [
  {
    slug: "education-family",
    number: 1,
    name: "Education & Family Support",
    shortDescription:
      "For educators, parents, students, and families carrying the mental and emotional load of teaching, homework, routines, and supporting children's growth — while trying to stay regulated yourself.",
    quizHref: "/education-family-support-quiz",
    classes: pillar1Classes,
  },
  {
    slug: "service-care",
    number: 2,
    name: "Service & High-Stress Professions",
    shortDescription:
      "For people in high-pressure or service-oriented environments — healthcare, first responders, and professionals who must stay alert, respond quickly, and support others while managing their own stress.",
    quizHref: "/service-high-stress-quiz",
    classes: pillar2ClassesExplore,
  },
  {
    slug: "performance",
    number: 3,
    name: "Performance & Professional Excellence",
    shortDescription:
      "For athletes, leaders, creatives, and high-visibility professionals who need sustained focus, mental sharpness, and reliable performance when the stakes are high.",
    quizHref: "/performance-professional-excellence-quiz",
    classes: pillar3ClassesExplore,
  },
  {
    slug: "restoration",
    number: 4,
    name: "Recovery & Lifespan Cognitive Wellness",
    shortDescription:
      "For anyone navigating recovery, life transitions, aging, sleep challenges, or rebuilding mental clarity and energy after periods of sustained stress or change.",
    quizHref: "/recovery-lifespan-cognitive-wellness-quiz",
    classes: pillar4ClassesExplore,
  },
];

export function getExplorePillar(slug: PillarSlug): ExplorePillar | undefined {
  return explorePillars.find((p) => p.slug === slug);
}