import React, { useEffect, useState } from "react";
import "./BuildLog.css";

const GITHUB_USERNAME = "robert-brunner";
const PRIVATE_COUNT = 12;

const LINKS = {
  repos:   "#portfolio",
  webApps: "#portfolio",
  private: "#portfolio",
};

const BuildLog = ({ visible }) => {
  const [repoCount, setRepoCount]     = useState(null);
  const [webAppCount, setWebAppCount] = useState(null);

  // GitHub counts
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
      .then((res) => res.json())
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        setRepoCount(repos.length);
        setWebAppCount(
          repos.filter((r) => r.homepage && r.homepage.includes("vercel")).length
        );
      })
      .catch(() => {});
  }, []);

  const items = [
    { key: "repos",   label: "public repos", count: repoCount,     href: LINKS.repos   },
    { key: "webApps", label: "web apps",     count: webAppCount,   href: LINKS.webApps },
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