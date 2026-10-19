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
        "bg-main": "var(--bg-main)",
        "bg-secondary": "var(--bg-secondary)",
        "card-surface": "var(--card-surface)",
        "card-elevated": "var(--card-elevated)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      fontFamily: {
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "12px",
        tag: "4px",
      },
      gap: {
        bento: "1.125rem", // 18px — between 16px and 20px
      },
      maxWidth: {
        bento: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
