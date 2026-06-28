import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Pillars & Classes | Braintopia",
  description:
    "Browse Braintopia's four pillars and discover the classes within each — from education and family support to performance, service, and cognitive wellness.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}