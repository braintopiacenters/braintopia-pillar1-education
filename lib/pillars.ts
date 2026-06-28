export type PillarSlug =
  | "education-family"
  | "service-care"
  | "performance"
  | "restoration";

export interface PillarData {
  slug: PillarSlug;
  number: number;
  name: string;
  tagline: string;
  shortDescription: string;
  href: string;
  external: boolean;
}

export const pillars: PillarData[] = [
  {
    slug: "education-family",
    number: 1,
    name: "Education & Family Support",
    tagline: "Teaching, parenting, learning, and family life",
    shortDescription:
      "For educators, parents, students, and families carrying the mental and emotional load of teaching, homework, routines, and supporting children's growth — while trying to stay regulated yourself.",
    href: "/",
    external: false,
  },
  {
    slug: "service-care",
    number: 2,
    name: "Service & High-Stress Care",
    tagline: "Alert, responsive roles under pressure",
    shortDescription:
      "For people in high-pressure or service-oriented environments — healthcare, first responders, caregivers, and professionals who must stay alert, respond quickly, and support others while managing their own stress.",
    href: "https://www.braintopiacenters.com/mental-stress-ptsd",
    external: true,
  },
  {
    slug: "performance",
    number: 3,
    name: "Performance & Peak Focus",
    tagline: "Results, creativity, and consistency under pressure",
    shortDescription:
      "For athletes, leaders, creatives, and high-visibility professionals who need sustained focus, mental sharpness, and reliable performance when the stakes are high.",
    href: "https://www.braintopiacenters.com/peak-brain-performance",
    external: true,
  },
  {
    slug: "restoration",
    number: 4,
    name: "Restoration & Resilience",
    tagline: "Recovery, clarity, and long-term brain health",
    shortDescription:
      "For anyone navigating recovery, life transitions, aging, sleep challenges, or rebuilding mental clarity and energy after periods of sustained stress or change.",
    href: "https://www.braintopiacenters.com/sleep-issues",
    external: true,
  },
];

export function getPillarBySlug(slug: PillarSlug): PillarData | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getAllPillars(): PillarData[] {
  return pillars;
}