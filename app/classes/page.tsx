import Link from "next/link";
import { getAllClasses } from "@/lib/classes";
import { getAllPillar2Classes } from "@/lib/pillar2-classes";
import { getAllPillar3Classes } from "@/lib/pillar3-classes";
import { getAllPillar4Classes } from "@/lib/pillar4-classes";
import ClassCard from "@/components/ClassCard";

const PILLAR_SECTIONS = [
  {
    number: 1,
    name: "Education & Family Support",
    description:
      "For educators, parents, students, and families carrying the mental and emotional load of teaching, learning, and family life.",
    quizHref: "/education-family-support-quiz",
    accentColor: "#40cdfc",
    classes: getAllClasses().map((cls) => ({
      key: cls.slug,
      name: cls.name,
      shortDescription: cls.shortDescription,
      href: `/classes/${cls.slug}`,
      slug: cls.slug,
      showSave: true,
    })),
  },
  {
    number: 2,
    name: "Service & High-Stress Professions",
    description:
      "For people in high-pressure or service-oriented environments who must stay alert, respond quickly, and support others while managing their own stress.",
    quizHref: "/service-high-stress-quiz",
    accentColor: "#ff2b32",
    classes: getAllPillar2Classes().map((cls) => ({
      key: cls.slug,
      name: cls.name,
      shortDescription: cls.shortDescription,
      href: `/classes/${cls.slug}`,
      slug: cls.slug,
      showSave: true,
    })),
  },
  {
    number: 3,
    name: "Performance & Professional Excellence",
    description:
      "For athletes, leaders, creatives, and high-visibility professionals who need sustained focus, mental sharpness, and reliable performance when the stakes are high.",
    quizHref: "/performance-professional-excellence-quiz",
    accentColor: "#ffdf06",
    classes: getAllPillar3Classes().map((cls) => ({
      key: cls.slug,
      name: cls.name,
      shortDescription: cls.shortDescription,
      href: `/classes/${cls.slug}`,
      slug: cls.slug,
      showSave: true,
    })),
  },
  {
    number: 4,
    name: "Recovery & Lifespan Cognitive Wellness",
    description:
      "For anyone navigating recovery, life transitions, aging, sleep challenges, or rebuilding mental clarity and energy after periods of sustained stress or change.",
    quizHref: "/recovery-lifespan-cognitive-wellness-quiz",
    accentColor: "#27AE60",
    classes: getAllPillar4Classes().map((cls) => ({
      key: cls.slug,
      name: cls.name,
      shortDescription: cls.shortDescription,
      href: `/classes/${cls.slug}`,
      slug: cls.slug,
      showSave: true,
    })),
  },
] as const;

export default function ClassesCodex() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="max-w-3xl mb-12">
        <div className="uppercase tracking-[2px] text-sm font-medium text-brand-blue mb-2">
          THE CODEX
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">All Classes</h1>
        <p className="mt-3 text-lg text-brand-dark/70">
          Braintopia organizes support around four pillars — each with its own classes. Explore the
          groups below to find where you may fit best.
        </p>
      </div>

      <div className="space-y-14">
        {PILLAR_SECTIONS.map((pillar) => (
          <section key={pillar.number} id={`pillar-${pillar.number}`} className="scroll-mt-24">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium tracking-widest mb-3">
                PILLAR {pillar.number}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{pillar.name}</h2>
              <p className="mt-2 max-w-2xl text-[15px] text-brand-dark/70">{pillar.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.classes.map((cls) => (
                <ClassCard
                  key={cls.key}
                  name={cls.name}
                  shortDescription={cls.shortDescription}
                  href={cls.href}
                  slug={cls.slug}
                  showSave={cls.showSave}
                  accentColor={pillar.accentColor}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link href="/education-family-support-quiz" className="btn-primary inline-flex px-8 py-3 rounded-full">
          Take the Pillar 1 class quiz
        </Link>
        <Link
          href="/service-high-stress-quiz"
          className="btn-primary inline-flex px-8 py-3 rounded-full"
        >
          Take the Pillar 2 class quiz
        </Link>
        <Link
          href="/performance-professional-excellence-quiz"
          className="btn-primary inline-flex px-8 py-3 rounded-full"
        >
          Take the Pillar 3 class quiz
        </Link>
        <Link
          href="/recovery-lifespan-cognitive-wellness-quiz"
          className="btn-primary inline-flex px-8 py-3 rounded-full"
        >
          Take the Pillar 4 class quiz
        </Link>
      </div>
    </div>
  );
}