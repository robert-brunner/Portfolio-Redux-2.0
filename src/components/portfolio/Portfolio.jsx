import React, { useState, useRef, useEffect } from "react";
import { PROJECTS, PRIVATE_COUNT, PRIVATE_HINTS } from "../portfolio/Projects";
import "./Portfolio.css";

// Deterministic "redacted" bar widths so the private rows look the same every render
const REDACTED_WIDTHS = Array.from(
  { length: PRIVATE_COUNT },
  (_, i) => 6 + ((i * 5 + 3) % 8)
);
const bars = (n) => "█".repeat(n);

// Desktop = real mouse. Touch devices stay view-only and never lock the page.
const IS_DESKTOP =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Live previews: every project's iframe mounts once and stays mounted,
// only the selected one is visible, so switching is instant after first load.
const VIEW_W = 1280; // desktop viewport the pages render at
const VIEW_H = 800; // 16:10, matches .pf-shot
// Iframe is rendered this much wider than the visible area, so each app's own
// scrollbar sits past the clipped edge: it still scrolls, but the bar is never seen.
const SB_HIDE = 20;

// Loom share link → embeddable player
const loomEmbed = (url) => url.replace("/share/", "/embed/");

// `tree -L 1` of a repo, pulled live from GitHub's contents API.
// Results are cached per repo so switching back and forth never refetches.
const treeCache = {};

const RepoTree = ({ project, show, onLoad }) => {
  const [entries, setEntries] = useState(treeCache[project.id] ?? null);
  const [failed, setFailed] = useState(false);
  const repoPath = project.repo.replace("https://github.com/", "");

  useEffect(() => {
    if (treeCache[project.id]) return onLoad();
    fetch(`https://api.github.com/repos/${repoPath}/contents`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list = data.map((e) => ({ name: e.name, dir: e.type === "dir" }));
        treeCache[project.id] = list;
        setEntries(list);
      })
      .catch(() => setFailed(true))
      .finally(onLoad);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dirs = entries?.filter((e) => e.dir).length ?? 0;
  const files = (entries?.length ?? 0) - dirs;

  return (
    <div
      className="pf-tree-view pf-list"
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      <div>
        <span className="pf-green">$</span> tree -L 1 {project.id}/
      </div>
      {failed ? (
        <div className="pf-red">fatal: repository not found</div>
      ) : entries ? (
        <>
          {entries.map((e, i) => (
            <div key={e.name}>
              <span className="pf-muted">
                {i === entries.length - 1 ? "└── " : "├── "}
              </span>
              <span className={e.dir ? "pf-tree-dir" : undefined}>
                {e.name}
                {e.dir ? "/" : ""}
              </span>
            </div>
          ))}
          <div className="pf-muted pf-tree-sum">
            {dirs} {dirs === 1 ? "directory" : "directories"}, {files}{" "}
            {files === 1 ? "file" : "files"}
          </div>
        </>
      ) : null}
    </div>
  );
};

const LivePreviews = ({ activeId, warm }) => {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.2);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const ro = new ResizeObserver(([e]) =>
      setScale(e.contentRect.width / VIEW_W)
    );
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="pf-shot" ref={boxRef}>
      {activeId && !loaded[activeId] && (
        <div className="pf-shot__ph">loading…</div>
      )}
      {!activeId && <div className="pf-shot__ph pf-red">permission denied</div>}

      {PROJECTS.map((p) => {
        const show = p.id === activeId;
        if (!warm && !show) return null; // before warm-up, only the clicked one loads
        const onLoad = () => setLoaded((l) => ({ ...l, [p.id]: true }));

        // No live page: Loom player, repo tree, else a still image
        if (!p.live && p.tree) {
          return <RepoTree key={p.id} project={p} show={show} onLoad={onLoad} />;
        }
        if (!p.live && p.video) {
          return (
            <iframe
              key={p.id}
              src={loomEmbed(p.video)}
              title={`${p.name} demo video`}
              allow="fullscreen"
              allowFullScreen
              onLoad={onLoad}
              className="pf-frame pf-frame--fill"
              style={{
                visibility: show ? "visible" : "hidden",
                pointerEvents: show ? "auto" : "none",
              }}
            />
          );
        }
        if (!p.live) {
          return (
            <img
              key={p.id}
              src={p.image}
              alt={`${p.name} preview`}
              onLoad={onLoad}
              onError={onLoad}
              className="pf-frame pf-frame--fill pf-img"
              style={{ visibility: show ? "visible" : "hidden" }}
            />
          );
        }

        return (
          <iframe
            key={p.id}
            src={p.live}
            title={`${p.name} live preview`}
            tabIndex={-1}
            scrolling={IS_DESKTOP ? "auto" : "no"}
            onLoad={onLoad}
            className="pf-frame"
            style={{
              width: VIEW_W + SB_HIDE,
              height: VIEW_H,
              transform: `scale(${scale})`,
              visibility: show ? "visible" : "hidden",
              pointerEvents: IS_DESKTOP && show ? "auto" : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// While the mouse is over the terminal, the page itself can't scroll.
// Only the list and the iframe scroll. Mouse off the terminal = page scrolls again.
const lockPage = (on) => {
  if (!IS_DESKTOP) return;
  document.documentElement.style.overflow = on ? "hidden" : "";
};

// Easter egg: hover the terminal and type anything. Every key types the
// next letter of this, whatever key it actually was.
const HELLO = "Hello World!";

const Portfolio = () => {
  const [webOpen, setWebOpen] = useState(true);
  const [privOpen, setPrivOpen] = useState(false);
  const [sel, setSel] = useState({ type: "project", id: PROJECTS[0].id });
  const [warm, setWarm] = useState(false);
  const sectionRef = useRef(null);
  const hoverRef = useRef(false);
  const [typed, setTyped] = useState(0);

  // Start loading all previews once the section is within ~1 screen of view
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setWarm(true);
          io.disconnect();
        }
      },
      { rootMargin: "1000px 0px" }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // BUILD LOG links: open the matching folder (the link's #portfolio does the scroll)
  useEffect(() => {
    const open = (e) => {
      setWebOpen(e.detail === "web");
      setPrivOpen(e.detail === "private");
    };
    window.addEventListener("pf-open", open);
    return () => window.removeEventListener("pf-open", open);
  }, []);

  // Easter egg keyboard handler (desktop only, only while hovered)
  useEffect(() => {
    if (!IS_DESKTOP) return;
    let clearTimer;
    const onKey = (e) => {
      if (!hoverRef.current) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return; // leave shortcuts alone
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      if (e.key === "Escape") {
        setTyped(0);
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        setTyped((n) => Math.max(0, n - 1));
      } else if (e.key.length === 1 || e.key === "Enter") {
        e.preventDefault(); // stop Space/Enter from clicking a focused row
        setTyped((n) => Math.min(HELLO.length, n + 1));
      } else {
        return; // arrows, Tab, F-keys etc. behave normally
      }
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => setTyped(0), 4000); // clears 4s after the last key
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(clearTimer);
    };
  }, []);

  // Never leave the page locked if the section unmounts mid-hover
  useEffect(() => () => lockPage(false), []);

  const project =
    sel.type === "project" ? PROJECTS.find((p) => p.id === sel.id) : null;
  const hint = sel.type === "private" ? PRIVATE_HINTS[sel.id] : null;

  return (
    <section id="portfolio" className="portfolio" ref={sectionRef}>
      <div className="pf-heading">
        <span className="pf-eyebrow">~/build-log</span>
        <h2 className="pf-title">Portfolio</h2>
      </div>

      <div
        className="pf-term"
        onMouseEnter={() => {
          hoverRef.current = true;
          lockPage(true);
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
          lockPage(false);
        }}
      >
        <div className="pf-bar">
          <span className="pf-dot" aria-hidden="true" />
          bob@build-log: ~
        </div>

        <div className="pf-body">
          <div className="pf-tree">
          <div className="pf-line pf-line--root">~/build-log</div>

          {/* ── web-apps/ ── */}
          <button
            type="button"
            className="pf-line pf-folder"
            aria-expanded={webOpen}
            onClick={() => {
              setWebOpen(!webOpen);
              if (!webOpen) setPrivOpen(false);
            }}
          >
            ├─ {webOpen ? "▾" : "▸"} web-apps/{" "}
            <span className="pf-muted">[{PROJECTS.length}]</span>
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

              <div className="pf-list">
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
            </div>
          )}

          {/* ── private/ ── */}
          <button
            type="button"
            className="pf-line pf-folder"
            aria-expanded={privOpen}
            onClick={() => {
              setPrivOpen(!privOpen);
              if (!privOpen) setWebOpen(false);
            }}
          >
            └─ {privOpen ? "▾" : "▸"} private/{" "}
            <span className="pf-muted">[{PRIVATE_COUNT}]</span>
          </button>

          {privOpen && (
            <div className="pf-kids">
              <div className="pf-list">
                {REDACTED_WIDTHS.map((w, i) => {
                  const on = sel.type === "private" && sel.id === i;
                  return (
                    <button
                      type="button"
                      key={i}
                      className={`pf-row pf-row--private${
                        PRIVATE_HINTS[i] ? " pf-row--hinted" : ""
                      }${on ? " is-on" : ""}`}
                      onClick={() => setSel({ type: "private", id: i })}
                    >
                      <span className="pf-perm">-rw-------</span>
                      <span className="pf-owner">bob</span>
                      <span className="pf-stack">
                        {PRIVATE_HINTS[i]?.stack ?? "██████"}
                      </span>
                      <span className="pf-name">
                        <span className="pf-blocks">{bars(w)}</span>
                        <span className="pf-redacted">REDACTED</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          </div>

          {/* ── Detail ── */}
          <div className="pf-detail">
            <div className="pf-detail__grid">
              <div className="pf-detail__text">
                {project ? (
                  <>
                    <div className="pf-muted">
                      <span className="pf-green">$</span> cat {project.id}
                      /README.md
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
                      {project.live && (
                        <a
                          className="pf-cmd"
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ./open --live
                        </a>
                      )}
                      {project.video && (
                        <a
                          className="pf-cmd"
                          href={project.video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ./play --demo
                        </a>
                      )}
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
                  </>
                ) : (
                  <div className="pf-detail__denied">
                    <div>
                      <span className="pf-green">$</span> cat ██████████
                    </div>
                    <div className="pf-red">cat: permission denied</div>
                    {hint && <div className="pf-hint"># {hint.hint}</div>}
                    <div className="pf-muted">
                      {PRIVATE_COUNT} items. Available on request.
                    </div>
                  </div>
                )}
              </div>

              <LivePreviews activeId={project?.id ?? null} warm={warm} />
            </div>
          </div>

          {/* ── Prompt (easter egg types here) ── */}
          <div className="pf-prompt" aria-hidden="true">
            <span className="pf-green">bob@build-log</span>
            <span className="pf-muted">:~$ </span>
            <span className={typed === HELLO.length ? "pf-green" : undefined}>
              {HELLO.slice(0, typed)}
            </span>
            <span className="pf-cursor" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;