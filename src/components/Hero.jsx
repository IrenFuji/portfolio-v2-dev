import React from "react";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section
      aria-label="Intro"
      className="
        hero relative isolate overflow-hidden
        grid place-items-center
        min-h-[88svh] md:min-h-[92svh]
        px-6 sm:px-8
      "
    >


      <div className="w-full max-w-[56rem] mx-auto">
        <div className="hero-animate text-center">
          {/* Headline */}
          <h1 className="hero-title text-[clamp(32px,6vw,56px)] font-extrabold tracking-tight">
            I’m Iren,
          </h1>

          <h2 className="hero-title hero-accent-title text-[clamp(32px,6vw,56px)] font-extrabold tracking-tight">
            Full-Stack Developer.
          </h2>

          {/* Body */}
          <p className="hero-copy mt-5 sm:mt-6 text-[clamp(17px,2.1vw,20px)] leading-[1.7]">
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

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="
                hero-btn-primary
                inline-flex items-center justify-center
                w-full sm:w-auto rounded-2xl px-5 py-3
                text-base font-semibold transition
                focus:outline-none focus-visible:ring-2
              "
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="
                hero-btn-ghost
                inline-flex items-center justify-center
                w-full sm:w-auto rounded-2xl px-5 py-3
                text-base font-semibold transition
                focus:outline-none focus-visible:ring-2
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
