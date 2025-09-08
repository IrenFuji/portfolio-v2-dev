import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
      className="inline-flex items-center justify-center"
    >
      {/* sun, moon icons */}
      {dark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" className="fill-white">
          <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 1 0 21.64 13z" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className="fill-slate-800"
        >
          <path d="M6.76 4.84l-1.8-1.79L4 3.99l1.79 1.8 0.97-0.95zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm9-10h3v-2h-3v2zM6.76 19.16l-0.95-0.95L4 20.01l0.96 0.95 1.8-1.8zM13 1h-2v3h2V1zm7.24 3.84l-0.95 0.95 1.8 1.8 0.95-0.96-1.8-1.79zM12 6a6 6 0 100 12 6 6 0 000-12z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;