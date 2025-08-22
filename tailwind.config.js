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
        brand: { DEFAULT: "#6d5fff", glow: "#00e0ff" },
      },
      dropShadow: {
        neon: ["0 0 8px rgba(109,95,255,.8)", "0 0 24px rgba(0,224,255,.45)"],
      },
    },
  },
  plugins: [],
};
