import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070A0F",
        surface: "#0F141C",
        surface2: "#161D28",
        border: "#243041",
        text: "#E8ECF2",
        dim: "#8A93A3",
        accent: "#3DB8AE",
        accent2: "#E8A33D",
        classA: "#3DB8AE",
        classB: "#E8A33D",
        classC: "#5A9BB5",
        classD: "#3A6B8A",
        "accent-steel": "#5A9BB5",
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
