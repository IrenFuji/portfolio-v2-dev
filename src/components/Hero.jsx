import React from "react";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section
      className="relative min-h-[88vh] md:min-h-screen flex items-center"
      aria-label="Intro"
    >
      <div className="container mx-auto px-6 sm:px-8">
        <div className="hero-wrap hero-animate">
          {/* Headline */}
          <h1 className="hero-title text-[clamp(36px,6vw,64px)] font-extrabold tracking-tight">
            I’m Iren,
          </h1>

          <h2 className="hero-title text-[clamp(36px,6vw,64px)] font-extrabold tracking-tight hero-accent-title">
            Full-Stack Developer.
          </h2>

          {/* Body */}
          <p className="mt-6 text-[clamp(18px,2.1vw,22px)] leading-[1.65] hero-copy">
            <span className="hero-muted">
              Based in Montreal, Canada, passionate about building{" "}
            </span>
            <span className="hero-accent font-semibold">
              scalable, high-impact products
            </span>
            <span className="hero-muted">. I’ve contributed to </span>
            <span className="hero-accent font-semibold">
              major enterprise feature launches
            </span>
            <span className="hero-muted">
              , powering millions of transactions and operations worldwide.
            </span>
          </p>

          <div className="h-10 md:h-14" />

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {/* View Projects */}
            <a
              href="#projects"
              className="
                inline-flex items-center justify-center rounded-2xl
                px-5 py-3 text-base font-semibold transition
                ring-1 ring-slate-200 bg-white text-slate-800 shadow-sm
                hover:shadow active:translate-y-px
                focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
                dark:bg-white/10 dark:text-white dark:ring-white/15
                dark:hover:bg-white/15 dark:focus-visible:ring-white/70
              "
            >
              View Projects
            </a>

            {/* Get in Touch */}
            <a
              href="#contact"
              className="
                inline-flex items-center justify-center rounded-2xl
                px-5 py-3 text-base font-semibold transition
                bg-[var(--hero-accent)] text-[#05121f]
                hover:opacity-95 active:translate-y-px
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)]/70
              "
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
