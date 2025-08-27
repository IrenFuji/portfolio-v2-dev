import React, { useEffect, useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  // "Back to top"
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const since = 2025;
  const presentLabel = new Date().getFullYear() > since ? "Present" : `${since}`;

  return (
    <footer className="site-footer relative app-bg">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:py-10">
        <p
          className="footer-copy text-center text-base sm:text-lg font-medium tracking-wide"
          aria-label="Site credits"
        >
          {since}&ndash;{presentLabel} &middot; Coded &amp; Designed by{" "}
          <span className="footer-name">Iren P.</span>
        </p>
      </div>

      <div className="pointer-events-none">
        <button
          type="button"
          onClick={handleBackToTop}
          className={`back-to-top pointer-events-auto ${
            showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
