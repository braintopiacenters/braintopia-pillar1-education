import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#40cdfc",
          yellow: "#ffdf06",
          warm: "#ff2b32",
          light: "#F8F9FA",
          dark: "#272727",
          success: "#27AE60",
        },
      },
    },
  },
  plugins: [],
};
export default config;
