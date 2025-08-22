import React, { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { gsap } from "gsap";

const links = [
  { href: "#hero", label: "Home", id: "hero" },
  { href: "#technologies", label: "Skills", id: "technologies" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
];

const Navigation = () => {
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    gsap.from(".nav-item", {
      y: -6,
      opacity: 0,
      stagger: 0.04,
      duration: 0.45,
      ease: "power2.out",
    });
  }, []);

  // Active section highlight
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const most = entries.reduce(
          (p, c) => (c.intersectionRatio > (p?.intersectionRatio || 0) ? c : p),
          null
        );
        if (most?.isIntersecting) setActive(`#${most.target.id}`);
      },
      { threshold: [0.55] }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Fade on scroll + auto-hide on mobile
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 6);
      if (window.innerWidth < 768) {
        const down = y > last + 6;
        const up = y < last - 6;
        if (down) setHidden(true);
        else if (up) setHidden(false);
      } else {
        setHidden(false);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClickNav = (href) => setActive(href);

  const items = useMemo(
    () =>
      links.map((l) => {
        const isActive = active === l.href;

        const base =
          "nav-item inline-flex items-center rounded-full px-3.5 py-2 text-sm md:text-[15px] font-semibold " +
          "transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60";

        // High contrast; hover = 70% fade; active stays white on brand
        const cls = isActive
          ? `${base} bg-brand text-white hover:opacity-80`
          : `${base} text-slate-900 dark:text-white drop-shadow hover:opacity-70`;

        return (
          <li key={l.href}>
            <a
              href={l.href}
              onClick={() => onClickNav(l.href)}
              className={cls}
              aria-current={isActive ? "page" : undefined}
            >
              {l.label}
            </a>
          </li>
        );
      }),
    [active]
  );

  return (
   <header
  className={[
    // sticky + on-top + full width
    "sticky top-0 left-0 right-0 z-50 w-full",
    // gentle fade on scroll
    "transition-opacity duration-300",
    scrolled ? "opacity-95" : "opacity-100",
    // glass look
    "backdrop-blur-md md:backdrop-blur-xl bg-white/10 dark:bg-slate-900/55",
    "shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
  ].join(" ")}
>
      

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 ">
        <div className="h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Brand */}
          <a
            href="#hero"
            className="font-semibold tracking-tight text-lg md:text-xl whitespace-nowrap justify-self-start"
          >
            <span className="text-brand">Iren</span>{" "}
            P.
          </a>

          {/* Centered glass pill nav (no overlay in front of text) */}
          <ul
            className="
              relative flex items-center gap-1 
              overflow-x-auto overflow-y-hidden max-w-full
            "
          >
            {items}
          </ul>

          {/* Right controls */}
          <div className="justify-self-end flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
