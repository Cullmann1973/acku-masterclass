import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#08080d",
          surface: "#0c0c14",
          card: "rgba(14, 14, 22, 0.78)",
          elevated: "rgba(10, 12, 20, 0.90)",
        },
        accent: {
          DEFAULT: "#00d4aa",
          hover: "#00e8bc",
          dim: "rgba(0, 212, 170, 0.15)",
          glow: "rgba(0, 212, 170, 0.25)",
          indigo: "#6366f1",
          warm: "#f59e0b",
        },
        text: {
          primary: "#f0ebe4",
          secondary: "#d8cfc2",
          tertiary: "#b8a994",
          muted: "#8a7d6e",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          hover: "rgba(255, 255, 255, 0.12)",
          accent: "rgba(0, 212, 170, 0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "title": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "label": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "shimmer": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 8px rgba(0, 212, 170, 0.4)" },
          "50%": { opacity: "1", boxShadow: "0 0 16px rgba(0, 212, 170, 0.7)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
