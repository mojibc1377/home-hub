import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0D0F11",
        panel: "rgba(255,255,255,0.045)",
        line: "rgba(255,255,255,0.09)",
        brass: "#C89B5C",
        brassDim: "#8A6D42",
        teal: "#6FA8A0",
        ivory: "#EDEAE3",
        muted: "#8B8D91",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      boxShadow: {
        panel: "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
export default config;