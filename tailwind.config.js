export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        brand: { DEFAULT: "#64FFDA", glow: "#64FFDA" },
        navy: "#0A1930",
      },
      dropShadow: {
        neon: [
          "0 0 8px rgba(100,255,218,.8)",
          "0 0 24px rgba(100,255,218,.45)",
        ],
      },

      /* ==== animations ==== */
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 700ms ease-out both",
        "fade-in-up": "fade-in-up 700ms ease-out both",
      },
    },
  },
  plugins: [],
};