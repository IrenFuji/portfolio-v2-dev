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
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const barRef = useRef(null);
  const dotRef = useRef(null);
  const linkRefs = useRef({});
  const pulseRef = useRef(null);

  const dotTargetId = useRef("home");

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
      immediate
        ? { x, duration: 0, overwrite: "auto" }
        : { x, duration: 0.35, ease: "power3.out", overwrite: "auto" }
    );
  };

  const headerH = () =>
    document.querySelector(".site-header")?.offsetHeight ?? 68;

  const goTo = (id) => {
    if (id === "home") {
      // always go to the very top for the hero
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - (headerH() + 8); 
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const setPad = () => {
      const h = headerRef.current?.offsetHeight ?? 68;
      document.documentElement.style.setProperty("--header-h", `${h}px`);
      document.body.style.paddingTop = `${h}px`;
    };
    setPad();
    window.addEventListener("resize", setPad);
    return () => window.removeEventListener("resize", setPad);
  }, []);

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    const initial =
      hash && (links.some((l) => l.id === hash) || hash === "contact")
        ? hash
        : "home";

    setActive(initial);
    dotTargetId.current = initial;

    setTimeout(() => {
      moveDotTo(initial, true);
      if (initial !== "home") {
        goTo(initial);
      } else {
        setHash("home");
      }
    }, 0);
  }, [links]);

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
              setActive(sid);
              setHash(sid);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  useEffect(() => {
    let ticking = false;
    const forceHomeNearTop = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const nextEl = document.getElementById("technologies");
        if (nextEl) {
          const threshold = nextEl.offsetTop - window.innerHeight * 0.6;
          if (window.scrollY <= Math.max(0, threshold) && active !== "home") {
            setActive("home");
            setHash("home");
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
    const place = () => moveDotTo(dotTargetId.current, true);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) {
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      return () => (root.style.overflow = prev || "");
    }
  }, [menuOpen]);

  // accessibility
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onHash = () => setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const onLinkClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    setHash(id);
    dotTargetId.current = id; 
    moveDotTo(id);
    goTo(id);
    setMenuOpen(false);
  };

  const onContactClick = (e) => {
    e.preventDefault();
    setActive("contact"); 
    setHash("contact");
    dotTargetId.current = "contact"; 
    moveDotTo("contact");
    goTo("contact");
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`site-header fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "is-scrolled" : ""
      }`}
    >
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
                  ref={(n) => (linkRefs.current["contact"] = n)} 
                  href="#contact"
                  onClick={onContactClick}
                  className="btn-contact text-sm md:text-[0.95rem]"
                  aria-current={active === "contact" ? "page" : undefined}
                >
                  Contact
                </a>
              </li>

              <span ref={dotRef} className="nav-dot" aria-hidden="true" />
            </ul>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-slate-300/50 dark:ring-white/10 touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
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
          <div
            id="mobile-menu"
            className="mobile-sheet md:hidden rounded-b-xl border-x border-b border-slate-200/70 dark:border-white/10"
          >
            <ul className="flex flex-col px-4 py-3 text-base">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => onLinkClick(e, l.id)}
                    className="block py-3 text-slate-800 dark:text-white"
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
                  aria-current={active === "contact" ? "page" : undefined}
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
