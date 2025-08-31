import React, { Suspense, lazy } from "react";
import Navigation from "./Navigation";
import Technologies from "./Technologies";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import FadeIn from "./FadeIn";

const Hero = lazy(() => import("./Hero"));

function HeroFallback() {
  return (
    <div
      className="h-[70vh] grid place-items-center text-slate-500 dark:text-slate-400"
      aria-live="polite"
      aria-busy="true"
    >
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <div className="app-bg min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded-md"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main" className="flex-1 space-y-24">
        <Suspense fallback={<HeroFallback />}>
          <FadeIn
            as="section"
            animate="fade-in"
            className="relative min-h-[70vh] overflow-hidden"
          >
            <Hero />
          </FadeIn>
        </Suspense>

        {/* Sections fade-in-up when scrolled into view */}
        <FadeIn as="section">
          <Technologies />
        </FadeIn>

        <FadeIn as="section">
          <Projects />
        </FadeIn>

        <FadeIn as="section">
          <Contact />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}