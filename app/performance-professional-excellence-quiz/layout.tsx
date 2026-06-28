import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance & Professional Excellence Quiz | Braintopia",
  description:
    "Discover which Pillar 3 class you most identify with — from The Competitor and The Performer to The Strategist, Advocate, Closer, Creator, and Team.",
};

export default function PerformanceQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}