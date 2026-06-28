import { getAllClasses } from "./classes";
import { getAllPillar2Classes } from "./pillar2-classes";
import { getAllPillar3Classes } from "./pillar3-classes";
import { getAllPillar4Classes } from "./pillar4-classes";

export interface ClassDetail {
  slug: string;
  name: string;
  shortDescription: string;
  whoItCovers: string;
  keyStruggles: string;
  howBraintopiaHelps: string;
  talkingPoints: string[];
  pillarNumber: number;
  pillarBadge: string;
  quizHref: string;
}

function toClassDetail(
  data: {
    slug: string;
    name: string;
    shortDescription: string;
    whoItCovers: string;
    keyStruggles?: string;
    howBraintopiaHelps: string;
    talkingPoints?: string[];
  },
  pillarNumber: number,
  pillarBadge: string,
  quizHref: string
): ClassDetail {
  return {
    slug: data.slug,
    name: data.name,
    shortDescription: data.shortDescription,
    whoItCovers: data.whoItCovers,
    keyStruggles: data.keyStruggles ?? "",
    howBraintopiaHelps: data.howBraintopiaHelps,
    talkingPoints: data.talkingPoints ?? [],
    pillarNumber,
    pillarBadge,
    quizHref,
  };
}

function buildClassDetailMap(): Map<string, ClassDetail> {
  const map = new Map<string, ClassDetail>();

  getAllClasses().forEach((cls) => {
    map.set(cls.slug, toClassDetail(cls, 1, "PILLAR 1 CLASS", "/education-family-support-quiz"));
  });

  getAllPillar2Classes().forEach((cls) => {
    map.set(
      cls.slug,
      toClassDetail(cls, 2, "PILLAR 2 CLASS", "/service-high-stress-quiz")
    );
  });

  getAllPillar3Classes().forEach((cls) => {
    map.set(
      cls.slug,
      toClassDetail(cls, 3, "PILLAR 3 CLASS", "/performance-professional-excellence-quiz")
    );
  });

  getAllPillar4Classes().forEach((cls) => {
    map.set(
      cls.slug,
      toClassDetail(cls, 4, "PILLAR 4 CLASS", "/recovery-lifespan-cognitive-wellness-quiz")
    );
  });

  return map;
}

const CLASS_DETAIL_MAP = buildClassDetailMap();

export function getClassDetailBySlug(slug: string): ClassDetail | undefined {
  return CLASS_DETAIL_MAP.get(slug);
}

export function getAllClassDetailSlugs(): string[] {
  return Array.from(CLASS_DETAIL_MAP.keys());
}

export function isKnownClassSlug(slug: string): boolean {
  return CLASS_DETAIL_MAP.has(slug);
}