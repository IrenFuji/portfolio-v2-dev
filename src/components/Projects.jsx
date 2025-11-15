import React, { useState } from "react";
import "../styles/projects.css";

import ecomDesktop from "../assets/e-commerce-desktop.png";
import ecomMobile from "../assets/e-commerce-mobile.png";
import aiDesktop from "../assets/aireadme-desktop.png";
import aiMobile from "../assets/aireadme-mobile.png";
import portDesktop from "../assets/port-desktop.png";
import portMobile from "../assets/port-mobile.png";

/* --- Device Toggle Icons --- */
const IconLaptop = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-5" {...props}>
    <path
      fill="currentColor"
      d="M4 6h16a1 1 0 0 1 1 1v8H3V7a1 1 0 0 1 1-1Zm-2 11h20a1 1 0 0 1 1 1v1H1v-1a1 1 0 0 1 1-1Zm3-9v6h14V8H5Z"
    />
  </svg>
);
const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden className="size-5" {...props}>
    <path
      fill="currentColor"
      d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 2v16h10V4H7Zm5 15a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
    />
  </svg>
);

const IconGitHub = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className="size-10"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.77 1.05a9.3 9.3 0 0 1 5.04 0c1.92-1.33 2.77-1.05 2.77-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.59.69.49A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
  </svg>
);
const IconExternal = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className="size-1"
    {...props}
  >
    <path d="M14 3h7v7h-2V6.414l-8.293 8.293-1.414-1.414L17.586 5H14V3z" />
    <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
  </svg>
);

/* --- Data --- */
const DEVICE = { DESKTOP: "desktop", MOBILE: "mobile" };

const projects = [
  {
    key: "ecommerce",
    title: "E-Commerce Platform for Fuji Energy Co., Ltd. (B2B & B2C)",
    tagline:
      "End-to-end e-commerce platform for Fuji Energy, delivered solo from design to AWS deployment.",
    desc: "I built this project completely on my own, starting with Figma to map out user and client flows, creating mock designs, and working directly with the client to align on requirements. From there, I developed the frontend and backend, handled testing, and deployed everything on AWS. It’s a full production-ready e-commerce platform that supports both B2B and B2C transactions.",
    tech: [
      "JS",
      "CSS",
      "HTML",
      "Firebase",
      "AWS",
      "React",
      "Bootstrap",
      "Stripe",
      "Figma",
    ],
    previews: { desktop: ecomDesktop, mobile: ecomMobile },
    links: { github: "https://github.com/IrenFuji/fuji-energy-ecommerce-mern", demo: "https://www.fuji-energy.com/", demo: "https://admin.fuji-energy.com/#/login" },
  },
  {
    key: "aireadme",
    title: "AI-Powered README Generator for Tech Professionals",
    tagline:
      "AI-driven README generator to make developer documentation faster and more consistent.",
    desc: "This tool helps developers quickly create professional, well-structured README files. I researched common pain points in project documentation, designed a simple interface, and integrated AI to generate content. The goal was to save developers time and improve consistency in documentation.",
    tech: ["JS", "HTML5", "CSS3", "Open AI API", "Tailwind", "Vercel"],
    previews: { desktop: aiDesktop, mobile: aiMobile },
    links: {
      github: "https://github.com/IrenFuji/ai-readme-generator",
      demo: "https://ai-readme-generator-md.vercel.app/",
    },
  },
  {
    key: "portfolio",
    title: "Full-Stack Developer Personal Portfolio",
    tagline: "Responsive full-stack portfolio with automated CI/CD on Netlify.",
    desc: "I designed and coded my personal portfolio from scratch to showcase my work as a full-stack developer. I started with Figma mockups, then built a responsive site that works well across devices. I focused on performance and accessibility, and I set up automated deployment with Netlify’s CI/CD so I can update it quickly whenever I add new projects. I also integrated FormSubmit for serverless form handling with a honeypot field for spam protection.",
    tech: ["JS", "CSS", "HTML", "Tailwind", "React", "GSAP", "Netlify"],
    previews: { desktop: portDesktop, mobile: portMobile },
    links: {
      github: "https://github.com/IrenFuji/portfolio-v2-dev",
      demo: "https://irendev.netlify.app/",
    },
  },
];

/* --- UI --- */
function DeviceToggle({ device, setDevice }) {
  return (
    <div className="device-toggle" role="tablist" aria-label="Device preview">
      {[
        { id: DEVICE.DESKTOP, label: "Desktop", Icon: IconLaptop },
        { id: DEVICE.MOBILE, label: "Mobile", Icon: IconPhone },
      ].map(({ id, label, Icon }) => {
        const active = device === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            aria-pressed={active}
            onClick={() => setDevice(id)}
            className={`device-chip ${active ? "is-active" : ""}`}
          >
            <Icon />
            <span className="sm:ml-1">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function TechStack({ items = [] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="stack-pill">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ links }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          aria-label="GitHub"
        >
          <IconGitHub />
          <span className="sr-only">GitHub</span>
        </a>
      )}
      {links.demo && (
        <a
          href={links.demo}
          target="_blank"
          rel="noreferrer"
          className="btn-accent"
        >
          <IconExternal className="-ml-0.5" />
          <span className="ml-1">Demo</span>
        </a>
      )}
    </div>
  );
}

function ProjectCard({ item, index, device }) {
  const flip = index % 2 === 1;
  const rounded = ["rounded-xl", "rounded-[22px]", "rounded-[28px]"][index % 3];
  const previewSrc =
    device === DEVICE.MOBILE ? item.previews.mobile : item.previews.desktop;
  const previewAlt = `${item.title} ${device} preview`;

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8">
      {/* preview image */}
      <div
        className={`media ${rounded} preview-surface ${
          device === DEVICE.MOBILE
            ? "media--mobile max-w-[360px] justify-self-center"
            : "media--desktop w-full"
        }`}
      >
        <img
          src={previewSrc}
          alt={previewAlt}
          className="preview-img"
          loading="lazy"
        />
      </div>

      <div
        className={`flex flex-col items-start ${
          flip ? "pl-4 md:pl-8" : "pr-4 md:pr-8"
        }`}
      >
        <h3 className="project-title text-[1.15rem] font-semibold leading-snug">
          {item.title}
        </h3>
        <p className="project-sub mt-1 text-[13px] italic">{item.tagline}</p>

        <p className="project-body mt-3 max-w-prose text-[15px] leading-relaxed">
          {item.desc}
        </p>

        <TechStack items={item.tech} />
        <Links links={item.links} />
      </div>
    </article>
  );
}

export default function Projects() {
  const [device, setDevice] = useState(DEVICE.DESKTOP);

  return (
    <section id="projects" className="py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Title & Toggle */}
        <div className="text-center">
          <h2 className="section-title text-4xl sm:text-5xl">Projects</h2>

          <div className="toggle-under-title">
            <DeviceToggle device={device} setDevice={setDevice} />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-10">
          {projects.map((p, i) => (
            <div
              key={p.key}
              className="group rounded-2xl bg-white/5 p-4 shadow-sm ring-1 ring-slate-800 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/40 dark:ring-slate-800"
            >
              <ProjectCard item={p} index={i} device={device} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
