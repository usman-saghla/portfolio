import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0E14",
        surface: "#131822",
        surface2: "#1A2130",
        border: "#232B3A",
        text: "#E4E7EC",
        dim: "#8B94A3",
        accent: "#4CC9C0",
        accent2: "#E8A33D",
        classA: "#4CC9C0",
        classB: "#E8A33D",
        classC: "#7C8CF8",
        classD: "#3A6B8A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
