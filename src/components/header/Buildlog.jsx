import React, { useEffect, useState } from "react";
import "../header/Buildlog.css";
import { PROJECTS, PRIVATE_COUNT } from "../portfolio/Projects";

const GITHUB_USERNAME = "robert-brunner";
// Web apps = every portfolio project with a live page (Vercel, GitHub Pages, custom domains)
const WEB_APP_COUNT = PROJECTS.filter((p) => p.live).length;

const LINKS = {
  repos:   "#portfolio",
  webApps: "#portfolio",
  private: "#portfolio",
};

// Which portfolio folder each link opens (Portfolio.jsx listens for "pf-open")
const OPENS = {
  webApps: "web",
  private: "private",
};

const BuildLog = ({ visible }) => {
  const [repoCount, setRepoCount] = useState(null);

  // GitHub counts
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
      .then((res) => res.json())
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        setRepoCount(repos.length);
      })
      .catch(() => {});
  }, []);

  const items = [
    // { key: "repos",   label: "public repos", count: repoCount,     href: LINKS.repos   },
    { key: "webApps", label: "web apps",     count: WEB_APP_COUNT, href: LINKS.webApps },
    { key: "private", label: "",             count: PRIVATE_COUNT, href: LINKS.private },
  ];

  return (
    <div className={`buildlog ${visible ? "buildlog--visible" : ""}`}>
      {/* ── Always-visible header ── */}
      <div className="buildlog__header">
        <span className="buildlog__dot" aria-hidden="true" />
        <span className="buildlog__title">BUILD LOG</span>
        <span className="buildlog__cursor" aria-hidden="true" />
      </div>

      {/* ── Dropdown menu ── */}
      <div className="buildlog__menu">
        {items.map(({ key, label, count, href }) => (
          <a
            key={key}
            href={href}
            onClick={() => {
              if (OPENS[key]) {
                window.dispatchEvent(new CustomEvent("pf-open", { detail: OPENS[key] }));
              }
            }}
            className={`buildlog__item ${key === "private" ? "buildlog__item--private" : ""}`}
          >
            <span className="buildlog__count">
              {count !== null ? `[ ${count} ]` : "[ … ]"}
            </span>
            <span className="buildlog__label">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BuildLog;