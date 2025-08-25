import React, { useEffect, useMemo, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { gsap } from "gsap";
import "../styles/navigation.css";

const Navigation = () => {
  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "technologies", label: "Skills" },
      { id: "projects", label: "Projects" },
    ],
    []
  );

  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const barRef = useRef(null); // wrapper around the links
  const dotRef = useRef(null); // the glowing dot element
  const linkRefs = useRef({}); // map id -> DOM node

  // Position the dot under the provided link id
  const moveDotTo = (id, immediate = false) => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const target = linkRefs.current[id];
    if (!bar || !dot || !target) return;

    const barRect = bar.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const x = tRect.left - barRect.left + tRect.width / 2 - dot.offsetWidth / 2;

    const config = immediate
      ? { x, duration: 0 }
      : { x, duration: 0.35, ease: "power3.out" };

    gsap.to(dot, config);
  };

  // Scroll 
  useEffect(() => {
    const sectionIds = links.map((l) => l.id).concat("contact");
    const observers = [];
    sectionIds.forEach((sid) => {
      const el = document.getElementById(sid);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              if (sid !== "contact") {
                setActive(sid);
              }
            }
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px", 
          threshold: 0.01,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  // When active changes, animate the dot
  useEffect(() => {
    moveDotTo(active);
  }, [active]);

  // Initial layout + on resize 
  useEffect(() => {
    const place = () => moveDotTo(active, true);
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  // Smooth scroll helper
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onLinkClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    moveDotTo(id);
    goTo(id);
    setMenuOpen(false);
  };

  const onContactClick = (e) => {
    e.preventDefault();
    goTo("contact");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <a
            href="#home"
            onClick={(e) => onLinkClick(e, "home")}
            className="font-mono text-lg sm:text-xl font-semibold tracking-tight text-teal-300 hover:opacity-90"
            aria-label="Go to Home"
          >
            {"<i++/>"}
          </a>

          {/* Center: Link bar (+ dot) — hidden on small, shows on md+ */}
          <div className="relative hidden md:block">
            <ul
              ref={barRef}
              className="relative flex items-center gap-8 text-base font-medium"
            >
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    ref={(n) => (linkRefs.current[l.id] = n)}
                    href={`#${l.id}`}
                    onClick={(e) => onLinkClick(e, l.id)}
                    className="nav-link text-slate-800 dark:text-white"
                    aria-current={active === l.id ? "page" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}

              {/* Contact button */}
              <li>
                <a
                  href="#contact"
                  onClick={onContactClick}
                  className="btn-contact"
                >
                  Contact
                </a>
              </li>

              {/* Glowing dot */}
              <span ref={dotRef} className="nav-dot" aria-hidden="true" />
            </ul>
          </div>

          {/* Right: Theme + Mobile menu button */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu toggle (md-) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-slate-300/50 dark:ring-white/10"
              aria-label="Toggle menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="fill-slate-800 dark:fill-white"
              >
                {menuOpen ? (
                  <path
                    d="M5 6h14v2H5V6zm0 10h14v2H5v-2z"
                    transform="rotate(45 12 12)"
                  />
                ) : (
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        {menuOpen && (
          <div className="mobile-sheet md:hidden rounded-b-xl border-x border-b border-slate-200/70 dark:border-white/10">
            <ul className="flex flex-col px-4 py-3 text-base font-medium">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => onLinkClick(e, l.id)}
                    className="block py-2 text-slate-800 dark:text-white"
                    aria-current={active === l.id ? "page" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="py-2">
                <a
                  href="#contact"
                  onClick={onContactClick}
                  className="btn-contact"
                >
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
