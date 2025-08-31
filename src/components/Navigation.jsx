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

  const barRef = useRef(null);
  const dotRef = useRef(null);
  const linkRefs = useRef({});
  const pulseRef = useRef(null);
  const setHash = (id) => {
    const newHash = `#${id}`;
    const base = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", base + newHash);
  };

  const moveDotTo = (id, immediate = false) => {
    const bar = barRef.current;
    const dot = dotRef.current;
    const target = linkRefs.current[id];
    if (!bar || !dot || !target) return;

    const barRect = bar.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const x = tRect.left - barRect.left + tRect.width / 2 - dot.offsetWidth / 2;

    gsap.to(
      dot,
      immediate ? { x, duration: 0 } : { x, duration: 0.35, ease: "power3.out" }
    );
  };

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---- effects ----
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if ((hash && links.some((l) => l.id === hash)) || hash === "contact") {
      const tab = hash === "contact" ? "projects" : hash;
      setActive(tab);
      setTimeout(() => {
        moveDotTo(tab, true);
        if (hash) goTo(hash);
      }, 0);
    } else {
      moveDotTo("home", true);
      setHash("home");
    }
  }, []);

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
                setHash(sid);
              }
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    let ticking = false;
    const forceHomeNearTop = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const homeEl = document.getElementById("home");
        const nextEl = document.getElementById("technologies");
        if (homeEl && nextEl) {
          const threshold = nextEl.offsetTop - window.innerHeight * 0.6;
          if (window.scrollY <= Math.max(0, threshold)) {
            if (active !== "home") {
              setActive("home");
              setHash("home");
            }
          }
        } else if (window.scrollY <= 4 && active !== "home") {
          setActive("home");
          setHash("home");
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", forceHomeNearTop, { passive: true });
    forceHomeNearTop();
    return () => window.removeEventListener("scroll", forceHomeNearTop);
  }, [active]);

  // do slides when active changes
  useEffect(() => {
    moveDotTo(active);
  }, [active]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    if (pulseRef.current) {
      pulseRef.current.kill();
      pulseRef.current = null;
    }

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (prefersReduced) {
      dot.style.boxShadow =
        "0 0 0 3px rgba(78, 244, 214, 0.15), 0 0 18px rgba(78, 244, 214, 0.75)";
      gsap.set(dot, { scale: 1 });
      return;
    }

    // gentle breathing animation
    pulseRef.current = gsap.to(dot, {
      keyframes: [
        {
          boxShadow:
            "0 0 0 3px rgba(78, 244, 214, 0.20), 0 0 24px rgba(78, 244, 214, 0.95)",
          scale: 1.06,
          duration: 0.75,
          ease: "sine.inOut",
        },
        {
          boxShadow:
            "0 0 0 3px rgba(78, 244, 214, 0.12), 0 0 14px rgba(78, 244, 214, 0.55)",
          scale: 1.0,
          duration: 0.75,
          ease: "sine.inOut",
        },
      ],
      repeat: -1,
    });

    return () => {
      if (pulseRef.current) {
        pulseRef.current.kill();
        pulseRef.current = null;
      }
    };
  }, [active]);

  useEffect(() => {
    const place = () => moveDotTo(active, true);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  // ---- events ----
  const onLinkClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    setHash(id);
    moveDotTo(id);
    goTo(id);
    setMenuOpen(false);
  };

  const onContactClick = (e) => {
    e.preventDefault();
    setHash("contact");
    goTo("contact");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between overflow-visible">
          <span
            className="select-none font-mono text-base sm:text-lg md:text-xl font-semibold tracking-tight text-teal-300"
            aria-label="Logo"
          >
            {"<i++/>"}
          </span>

          {/* links */}
          <div className="relative hidden md:block overflow-visible">
            <ul
              ref={barRef}
              className="relative flex items-center gap-6 lg:gap-8 text-sm md:text-[0.95rem] lg:text-base font-medium pb-4"
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
              <li>
                <a
                  href="#contact"
                  onClick={onContactClick}
                  className="btn-contact text-sm md:text-[0.95rem]"
                >
                  Contact
                </a>
              </li>

              {/* Glowing dot */}
              <span ref={dotRef} className="nav-dot" aria-hidden="true" />
            </ul>
          </div>

          {/* Right Theme */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
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
            <ul className="flex flex-col px-4 py-3 text-base">
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
                  className="btn-contact w-full text-center"
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