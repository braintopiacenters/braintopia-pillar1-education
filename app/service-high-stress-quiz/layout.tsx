import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service & High-Stress Professions Quiz | Braintopia",
  description:
    "Discover which Pillar 2 class you most identify with — The Protector, The Anchor, The Healer, or The Night Watch.",
};

export default function ServiceHighStressQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}