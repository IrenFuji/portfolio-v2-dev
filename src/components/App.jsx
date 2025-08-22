import React, { Suspense, lazy } from "react";
import Navigation from "./Navigation";
import Technologies from "./Technologies";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

// Lazy-load Three.js hero for performance
const Hero = lazy(() => import("./Hero"));

const App = () => {
  return (
    <div className="app-bg min-h-dvh flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded-md"
      >
        Skip to content
      </a>

      <Navigation />

      <main id="main" className="flex-1">
        <Suspense
          fallback={
            <div className="h-[70vh] grid place-items-center text-slate-500">
              Loading…
            </div>
          }
        >
          <Hero />
        </Suspense>
        <Technologies />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
