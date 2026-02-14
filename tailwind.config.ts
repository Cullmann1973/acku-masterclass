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
          primary: "#0a0a0f",
          card: "rgba(15, 15, 25, 0.8)",
          elevated: "rgba(20, 20, 35, 0.9)",
        },
        accent: {
          DEFAULT: "#00d4aa",
          hover: "#00e8bc",
          dim: "#00d4aa33",
          glow: "rgba(0, 212, 170, 0.3)",
        },
        text: {
          primary: "#eee4d7",
          secondary: "#d1c4b1",
          tertiary: "#b39f87",
        },
        border: {
          DEFAULT: "#1a1a2e",
          hover: "#2a2a4e",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["Baskerville", "Georgia", "Times New Roman", "serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
