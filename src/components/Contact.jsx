import React from "react";

const links = [
  {
    href: "mailto:irenpavlenko22@gmail.com",
    label: "Email",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/IrenFuji",
    label: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 .5A12 12 0 000 12.6c0 5.35 3.44 9.89 8.2 11.49.6.1.82-.27.82-.6v-2.14c-3.34.74-4.04-1.63-4.04-1.63-.55-1.44-1.34-1.83-1.34-1.83-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.27 1.86 1.27 1.08 1.89 2.84 1.34 3.53 1.03.11-.8.42-1.34.76-1.65-2.66-.31-5.47-1.38-5.47-6.13 0-1.35.47-2.45 1.24-3.31-.12-.3-.54-1.54.12-3.2 0 0 1.01-.33 3.3 1.26a11.3 11.3 0 016 0c2.28-1.59 3.29-1.26 3.29-1.26.66 1.66.24 2.9.12 3.2.78.86 1.24 1.96 1.24 3.31 0 4.76-2.81 5.81-5.49 6.12.43.37.8 1.09.8 2.2v3.26c0 .33.22.72.83.6C20.56 22.47 24 17.94 24 12.6A12 12 0 0012 .5z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/irenepavlenko/",
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8h4v13H3V8zm7 0h3.8v1.8h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21H18v-5.8c0-1.38-.03-3.17-1.93-3.17-1.93 0-2.23 1.5-2.23 3.06V21H10V8z" />
      </svg>
    ),
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Get in touch
        </h2>
        <p className="mt-3 text-center text-slate-600 dark:text-slate-300">
          Open to full-stack roles, collaborations.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? "_self" : "_blank"}
              rel={
                l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
              }
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10
                         bg-white/70 dark:bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white
                         dark:hover:bg-white/10 transition neon-ring"
              title={l.label}
            >
              <span className="text-brand group-hover:drop-shadow-neon">
                {l.svg}
              </span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
