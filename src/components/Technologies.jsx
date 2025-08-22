import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const stack = [
  "HTML5",
  "CSS3",
  "JavaScript (ES202x)",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "REST APIs",
  "JWT/Auth",
  "Vite/CRA",
  "Git/GitHub",
  "Testing",
];

const Technologies = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll("[data-tech]");
    if (items && items.length) {
      gsap.from(items, {
        y: 12,
        opacity: 0,
        stagger: 0.03,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section id="technologies" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Technologies
        </h2>

        <p className="mt-3 text-center text-slate-600 dark:text-slate-300">
          Tools I use to ship reliable products—front to back.
        </p>

        <div
          ref={listRef}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {stack.map((t) => (
            <span
              key={t}
              data-tech
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3
                         text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm hover:shadow transition
                         hover:bg-white dark:hover:bg-white/10 neon-ring/0"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
