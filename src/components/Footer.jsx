import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Iren Pavlenko, Canada • Built with React,
        Tailwind, Three.js & GSAP
      </div>
    </footer>
  );
};

export default Footer;
