import React, { useState } from "react";
import { PROJECTS, PRIVATE_COUNT } from "../portfolio/Projects";
import "./Portfolio.css";

// Deterministic "redacted" bar widths so the private rows look the same every render
const REDACTED_WIDTHS = Array.from(
  { length: PRIVATE_COUNT },
  (_, i) => 6 + ((i * 5 + 3) % 8)
);
const bars = (n) => "█".repeat(n);

// Screenshot with a graceful fallback if the image file isn't there yet
const Shot = ({ project }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="pf-shot">
      {failed ? (
        <div className="pf-shot__ph">
          screenshot.png
          <br />
          not found
        </div>
      ) : (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
};

const Portfolio = () => {
  const [webOpen, setWebOpen] = useState(true);
  const [privOpen, setPrivOpen] = useState(false);
  const [sel, setSel] = useState({ type: "project", id: PROJECTS[0].id });

  const project =
    sel.type === "project" ? PROJECTS.find((p) => p.id === sel.id) : null;

  return (
    <section id="portfolio" className="portfolio">
      <div className="pf-heading">
        <span className="pf-eyebrow">~/build-log</span>
        <h2 className="pf-title">Portfolio</h2>
      </div>

      <div className="pf-term">
        <div className="pf-bar">
          <span className="pf-dot" aria-hidden="true" />
          bob@build-log: ~
        </div>

        <div className="pf-body">
          <div className="pf-line pf-line--root">~/build-log</div>

          {/* ── web-apps/ ── */}
          <button
            type="button"
            className="pf-line pf-folder"
            aria-expanded={webOpen}
            onClick={() => setWebOpen(!webOpen)}
          >
            ├─ {webOpen ? "▾" : "▸"} web-apps/
          </button>

          {webOpen && (
            <div className="pf-kids pf-kids--trunk">
              <div className="pf-cmdline">
                <span className="pf-green">$</span> ls -la
              </div>

              <div className="pf-row pf-row--dim" aria-hidden="true">
                <span className="pf-perm">drwxr-xr-x</span>
                <span className="pf-owner">bob</span>
                <span className="pf-stack">--</span>
                <span className="pf-name">../</span>
              </div>

              {PROJECTS.map((p) => {
                const on = sel.type === "project" && sel.id === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    className={`pf-row${on ? " is-on" : ""}`}
                    onClick={() => setSel({ type: "project", id: p.id })}
                  >
                    <span className="pf-perm">drwxr-xr-x</span>
                    <span className="pf-owner">bob</span>
                    <span className="pf-stack">{p.stack}</span>
                    <span className="pf-name">{p.id}/</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── private/ ── */}
          <button
            type="button"
            className="pf-line pf-folder"
            aria-expanded={privOpen}
            onClick={() => setPrivOpen(!privOpen)}
          >
            └─ {privOpen ? "▾" : "▸"} private/{" "}
            <span className="pf-muted">[{PRIVATE_COUNT}]</span>
          </button>

          {privOpen && (
            <div className="pf-kids">
              {REDACTED_WIDTHS.map((w, i) => {
                const on = sel.type === "private" && sel.id === i;
                return (
                  <button
                    type="button"
                    key={i}
                    className={`pf-row pf-row--private${on ? " is-on" : ""}`}
                    onClick={() => setSel({ type: "private", id: i })}
                  >
                    <span className="pf-perm">-rw-------</span>
                    <span className="pf-owner">bob</span>
                    <span className="pf-stack">██████</span>
                    <span className="pf-name">
                      <span className="pf-blocks">{bars(w)}</span>
                      <span className="pf-redacted">REDACTED</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Detail ── */}
          <div className="pf-detail">
            {project ? (
              <div className="pf-detail__grid">
                <div className="pf-detail__text">
                  <div className="pf-muted">
                    <span className="pf-green">$</span> cat {project.id}/README.md
                  </div>
                  <h3 className="pf-detail__name">{project.name}</h3>
                  <p className="pf-detail__desc">{project.description}</p>
                  <div className="pf-tags">
                    {project.tags.map((t) => (
                      <span key={t} className="pf-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pf-actions">
                    <a
                      className="pf-cmd"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ./open --live
                    </a>
                    {project.repo && (
                      <a
                        className="pf-cmd"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ./open --repo
                      </a>
                    )}
                  </div>
                  <span className="pf-cursor" aria-hidden="true" />
                </div>
                <Shot key={project.id} project={project} />
              </div>
            ) : (
              <div className="pf-detail__denied">
                <div>
                  <span className="pf-green">$</span> cat ██████████
                </div>
                <div className="pf-red">cat: permission denied</div>
                <div className="pf-muted">
                  {PRIVATE_COUNT} items. Available on request.
                </div>
                <span className="pf-cursor" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;