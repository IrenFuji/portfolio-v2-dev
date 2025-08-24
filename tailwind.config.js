// tailwind.config.js
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
        // brand + background from the mock
        brand: { DEFAULT: "#64FFDA", glow: "#64FFDA" },
        navy: "#0A1930",
      },
      dropShadow: {
        // subtle neon using the brand mint
        neon: [
          "0 0 8px rgba(100,255,218,.8)",
          "0 0 24px rgba(100,255,218,.45)",
        ],
      },
    },
  },
  plugins: [],
};
