import React, { useMemo, useState } from "react";
import "../styles/technologies.css";

const CATEGORIES = {
  All: [],
  Frontend: [
    "JavaScript",
    "HTML5",
    "CSS3",
    "React",
    "Vite",
    "Three.js",
    "Tailwind",
    "Bootstrap",
  ],
  Backend: ["Node.js", "Express.js", "Python"],
  Databases: ["MongoDB", "Firebase"],
  Hosting: ["AWS", "Netlify", "Vercel"],
  Tools: [
    "GitHub",
    "Bitbucket",
    "Postman",
    "Insomnia",
    "Docker",
    "Stripe",
    "SendGrid",
  ],
  DesignPM: ["Figma", "Miro", "Jira"],
  IDEs: ["VS Code", "IntelliJ", "PyCharm"],
  APIs: ["Stripe", "OpenAI API", "Algolia"],
};

const TECHNOLOGIES = [
  { label: "JavaScript", iconClass: "devicon-javascript-plain colored" },
  { label: "HTML5", iconClass: "devicon-html5-plain colored" },
  { label: "CSS3", iconClass: "devicon-css3-plain colored" },

  { label: "React", iconClass: "devicon-react-original colored" },
  { label: "Vite", iconClass: "devicon-vitejs-plain colored" },
  { label: "Three.js", iconClass: "devicon-threejs-original", monochrome: true },

  { label: "Node.js", iconClass: "devicon-nodejs-plain colored" },
  { label: "Express.js", iconClass: "devicon-express-original", monochrome: true },
  { label: "Python", iconClass: "devicon-python-plain colored" },

  { label: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
  { label: "Firebase", iconClass: "devicon-firebase-plain colored" },

  // Hosting
  { label: "AWS", iconClass: "devicon-amazonwebservices-original colored" },
  { label: "Netlify", iconClass: "devicon-netlify-plain colored" },
  { label: "Vercel", iconClass: "devicon-vercel-original", monochrome: true },

  // Tools
  { label: "GitHub", iconClass: "devicon-github-original", monochrome: true },
  { label: "Bitbucket", iconClass: "devicon-bitbucket-original colored" },
  { label: "Postman", iconClass: "devicon-postman-plain colored" },
  { label: "Insomnia", iconClass: "devicon-insomnia-plain colored" },
  { label: "Docker", iconClass: "devicon-docker-plain colored" },
  { label: "SendGrid", iconClass: "devicon-sendgrid-plain colored" },

  // Design & PM
  { label: "Figma", iconClass: "devicon-figma-plain colored" },
  { label: "Miro" },
  { label: "Jira", iconClass: "devicon-jira-plain colored" },

  // Styling
  { label: "Tailwind", iconClass: "devicon-tailwindcss-original colored" },
  { label: "Bootstrap", iconClass: "devicon-bootstrap-plain colored" },

  // IDEs
  { label: "VS Code", iconClass: "devicon-vscode-plain colored" },
  { label: "IntelliJ", iconClass: "devicon-intellij-plain colored" },
  { label: "PyCharm", iconClass: "devicon-pycharm-plain colored" },

  // APIs
  { label: "OpenAI API" },
  { label: "Stripe" },
  { label: "Algolia", iconClass: "devicon-algolia-plain colored" },
];

const Technologies = () => {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = useMemo(() => {
    if (activeCat === "All") return TECHNOLOGIES;
    const allow = new Set(CATEGORIES[activeCat]);
    return TECHNOLOGIES.filter((t) => allow.has(t.label));
  }, [activeCat]);

  return (
    <section id="technologies" className="tech-section app-bg">
      <div className="tech-shell">
        <h2 className="tech-title text-center md:text-5xl">Tech Stack</h2>

        {/* Filter chips */}
        <div className="tech-controls" role="group" aria-label="Tech filters">
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              type="button"
              className="tech-chip"
              aria-pressed={activeCat === cat}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Icons Grid */}
        <div className="tech-grid" role="list" aria-label="Technologies">
          {filtered.map(({ label, iconClass, monochrome }) => (
            <div key={label} className="tech-item" role="listitem">
              {iconClass ? (
                <span
                  aria-hidden="true"
                  className={`tech-icon ${iconClass} ${
                    iconClass.includes("colored") ? "colored" : ""
                  } ${monochrome ? "monochrome" : ""}`}
                  title={label}
                />
              ) : null}
              <span className="tech-label">{label}</span>
              <button className="sr-only" aria-label={label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
