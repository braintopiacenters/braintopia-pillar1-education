import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pillar-quiz",
        destination: "/find-your-pillar",
        permanent: true,
      },
      {
        source: "/pillars",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/quiz",
        destination: "/education-family-support-quiz",
        permanent: true,
      },
      {
        source: "/pillar1",
        destination: "/education-family-support-quiz",
        permanent: true,
      },
      {
        source: "/pillar2",
        destination: "/service-high-stress-quiz",
        permanent: true,
      },
      {
        source: "/pillar3",
        destination: "/performance-professional-excellence-quiz",
        permanent: true,
      },
      {
        source: "/pillar4",
        destination: "/recovery-lifespan-cognitive-wellness-quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
