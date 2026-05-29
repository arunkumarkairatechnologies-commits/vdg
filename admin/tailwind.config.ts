import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0c10",
        "base-light": "#f8fafc",
        card: "#10141c",
        "card-light": "#ffffff",
        elevated: "#161b26",
        "elevated-light": "#f1f5f9",
        input: "#1e2535",
        "input-light": "#e2e8f0",
        border: {
          DEFAULT: "#2a3145",
          hover: "#3a4560",
          light: "#e2e8f0",
          "hover-light": "#cbd5e1",
        },
        text: {
          primary: "#e8eaf0",
          "primary-light": "#0f172a",
          secondary: "#8892a8",
          "secondary-light": "#64748b",
          muted: "#5a637a",
          "muted-light": "#94a3b8",
        },
        accent: "#4f7fff",
        accentGlow: "rgba(79,127,255,0.15)",
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        purple: "#a78bfa",
        cyan: "#22d3ee",
        pink: "#f472b6",
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
        container: "16px",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;