import React from "react";
import trialImg from "../assets/trial.jpeg";
import "../styles/projects.css";

const LINKS = {
  github: "https://github.com/IrenFuji",
  live: "https://ai-readme-generator-md.vercel.app/",
};

const projects = [
  {
    title: "E-commerce platform",
    desc: "Improved new e-commerce platform for energy basde company.",
    tech: ["JS", "Firebase", "AWS"],
  },
  {
    title: "E-commerce platform",
    desc: "Improved new e-commerce platform for energy basde company.",
    tech: ["JS", "Firebase", "AWS"],
  },
  {
    title: "E-commerce platform",
    desc: "Improved new e-commerce platform for energy basde company.",
    tech: ["JS", "Firebase", "AWS"],
  },
];

function IconGitHub(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-5"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.77 1.05a9.3 9.3 0 0 1 5.04 0c1.92-1.33 2.77-1.05 2.77-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.49A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function IconExternal(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="size-5"
      {...props}
    >
      <path d="M14 3h7v7h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H14V3z" />
      <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
    </svg>
  );
}

function Tech({ list }) {
  return (
    <p className="mt-3 font-semibold tracking-tight text-[var(--accent, #34d399)]">
      {list.join(", ")}
    </p>
  );
}

function ProjectCard({ item, index }) {
  const rounded = ["rounded-xl", "rounded-[28px]", "rounded-[28px]"][index % 3];
  const flip = index % 2 === 1; // alternated layout on desktop

  return (
    <article
      className={`grid items-start gap-6 md:gap-8 md:grid-cols-2 ${
        flip ? "md:[&>.media]:order-2" : ""
      }`}
    >
      {/* image */}
      <div
        className={`media overflow-hidden ${rounded} shadow-lg shadow-black/10 dark:shadow-black/30`}
      >
        <img
          src={trialImg}
          alt={`${item.title} preview`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* text */}
      <div className="flex flex-col items-start">
        <h3 className="text-[1.15rem] font-semibold leading-snug text-slate-900 dark:text-slate-100">
          {item.title}
        </h3>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
          {item.desc}
        </p>
        <Tech list={item.tech} />

        <div className="mt-4 flex items-center gap-3">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
            aria-label="GitHub"
          >
            <IconGitHub />
            <span className="sr-only">GitHub</span>
          </a>

          <a
            href={LINKS.live}
            target="_blank"
            rel="noreferrer"
            className="btn-accent"
          >
            <IconExternal className="-ml-0.5" />
            <span className="ml-1">Live</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Projects
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-10">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/40 dark:ring-slate-800"
            >
              <ProjectCard item={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
