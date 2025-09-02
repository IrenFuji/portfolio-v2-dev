import React, { useEffect, useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  // Show "Back to top" when scrolled
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const since = 2024;
  const presentLabel =
    new Date().getFullYear() > since ? "Present" : `${since}`;

  return (
    <footer className="site-footer relative app-bg">
      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:py-8">
        <p
          className="footer-copy text-center text-[clamp(13px,1.6vw,12px)] font-medium tracking-wide"
          aria-label="Site credits"
        >
          {since}&ndash;{presentLabel} &middot; Coded &amp; Designed by{" "}
          <span className="footer-name">Iren P.</span>
        </p>
      </div>

      {/* Back to top */}
      <div className="pointer-events-none">
        <button
          type="button"
          onClick={handleBackToTop}
          className={`back-to-top pointer-events-auto text-[clamp(13px,1.5vw,14px)] font-semibold ${
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
