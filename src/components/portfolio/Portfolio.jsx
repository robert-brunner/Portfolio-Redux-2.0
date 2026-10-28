import React, { useState, useRef, useEffect } from "react";
import { PROJECTS, PRIVATE_COUNT, PRIVATE_HINTS } from "../portfolio/Projects";
import "./Portfolio.css";
import ChessBoard from "./wopr/ChessBoard";
import GtwMap from "./wopr/GtwMap";
import { newGame, bestMove, tryUserMove, statusOf } from "./wopr/woprChess";
import { buildTargets, SIDES } from "./wopr/gtwData";

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

const LivePreviews = ({ activeId, warm, overlay }) => {
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
      {overlay && <div className="pf-shot__over">{overlay}</div>}
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

// Easter egg: hover the terminal and type a greeting ("hello", "hi",
// "hello world"...) then Enter, and the panel above turns into a terminal.
// Anything that isn't a greeting is ignored.
const GREETINGS = new Set(["hello", "hi", "hey", "hiya", "howdy", "greetings", "yo", "sup"]);
const isGreeting = (text) => {
  const first = text.toLowerCase().replace(/[^a-z\s]/g, " ").trim().split(/\s+/)[0];
  return GREETINGS.has(first);
};
const YES = new Set(["y", "yes", "yeah", "yep", "sure", "ok", "okay"]);
const NO = new Set(["n", "no", "nope", "nah"]);
const GAMES = ["CHESS", "GLOBAL THERMONUCLEAR WAR"];
const SPIN = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

const Spinner = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SPIN.length), 80);
    return () => clearInterval(t);
  }, []);
  return <span className="pf-green">{SPIN[i]}</span>;
};

const Portfolio = () => {
  const [webOpen, setWebOpen] = useState(true);
  const [privOpen, setPrivOpen] = useState(false);
  const [sel, setSel] = useState({ type: "project", id: PROJECTS[0].id });
  const [warm, setWarm] = useState(false);
  const sectionRef = useRef(null);
  const hoverRef = useRef(false);

  // ── Terminal mode ──
  const [termMode, setTermMode] = useState(false);
  const [lines, setLines] = useState([]); // { kind: "cmd" | "out" | "think", text }
  const [input, setInput] = useState("");
  const phaseRef = useRef("hello"); // hello → busy (terminal is talking) → free (your turn)
  const stageRef = useRef("greet"); // greet → menu → chess | gtw-confirm → gtw-side → gtw-run
  const inputRef = useRef("");
  const termRef = useRef(false);
  const treeRef = useRef(null);
  const timers = useRef([]);

  // ── Games ──
  const [game, setGame] = useState(null); // null | "chess" | "gtw"
  const chessRef = useRef(null);
  const [, setChessVer] = useState(0); // bump to re-render the board
  const [selected, setSelected] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [gtwTargets, setGtwTargets] = useState([]);
  const [gtwIdx, setGtwIdx] = useState(-1);
  const [gtwSide, setGtwSide] = useState(null);
  const [terminated, setTerminated] = useState(null); // full-screen message text
  const ipRef = useRef(null);

  inputRef.current = input;
  termRef.current = termMode;

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const push = (line) => setLines((l) => [...l, line]);
  const bump = () => setChessVer((v) => v + 1);

  // Type one line out a character at a time
  const typeOut = (text, done) => {
    push({ kind: "out", text: "" });
    if (!text) return done && later(done, 0);
    let i = 0;
    const step = () => {
      i += 1;
      setLines((l) => {
        const c = l.slice();
        c[c.length - 1] = { kind: "out", text: text.slice(0, i) };
        return c;
      });
      if (i < text.length) later(step, 35);
      else if (done) done();
    };
    later(step, 35);
  };

  // Type several lines, then hand the prompt back
  const say = (texts, done) => {
    phaseRef.current = "busy";
    const next = (i) => {
      if (i >= texts.length) {
        phaseRef.current = "free";
        if (done) done();
        return;
      }
      typeOut(texts[i], () => later(() => next(i + 1), 150));
    };
    next(0);
  };

  // Print lines instantly, teletype style (for long lists)
  const printLines = (texts, done) => {
    phaseRef.current = "busy";
    texts.forEach((t, i) => later(() => push({ kind: "out", text: t }), i * 70));
    later(() => {
      phaseRef.current = "free";
      if (done) done();
    }, texts.length * 70 + 60);
  };

  // Spinner for a moment, then continue
  const think = (ms, then) => {
    phaseRef.current = "busy";
    push({ kind: "think" });
    later(() => {
      setLines((l) => l.filter((x) => x.kind !== "think"));
      then();
    }, ms);
  };

  const answer = (texts, done, ms = 700) => think(ms, () => say(texts, done));

  const startTerminal = (greeting) => {
    phaseRef.current = "busy";
    stageRef.current = "greet";
    setTermMode(true);
    setInput("");
    setLines([{ kind: "cmd", text: greeting }]);
    later(() => say(["GREETINGS PROFESSOR FALKEN.", "SHALL WE PLAY A GAME?"]), 300);
  };

  const exitTerminal = () => {
    clearTimers();
    setTermMode(false);
    setLines([]);
    setInput("");
    setGame(null);
    setSelected(null);
    setLastMove(null);
    setGtwTargets([]);
    setGtwIdx(-1);
    setTerminated(null);
    phaseRef.current = "hello";
    stageRef.current = "greet";
  };

  // ── Menu ──
  const listGames = () => {
    stageRef.current = "menu";
    think(600, () => printLines(GAMES, () => say(["WHICH GAME?"])));
  };

  const pickGame = (cmd) => {
    if (cmd.includes("chess")) {
      startChess();
      return true;
    }
    if (cmd.includes("thermonuclear") || cmd.includes("global")) {
      stageRef.current = "gtw-confirm";
      answer(["WOULDN'T YOU PREFER A GOOD GAME OF CHESS?"]);
      return true;
    }
    if (GAMES.some((g) => g && g.toLowerCase() === cmd)) {
      answer(["GAME UNAVAILABLE.", "AVAILABLE: CHESS, GLOBAL THERMONUCLEAR WAR."]);
      return true;
    }
    return false;
  };

  // ── Chess ──
  const startChess = () => {
    chessRef.current = newGame();
    setSelected(null);
    setLastMove(null);
    setGame("chess");
    bump();
    stageRef.current = "chess";
    answer([
      "CHESS. YOU PLAY WHITE.",
      "TYPE MOVES LIKE E4, NF3 OR E2E4, OR CLICK THE BOARD.",
      "TYPE QUIT TO LEAVE THE GAME.",
    ]);
  };

  const woprReplies = () => {
    const g = chessRef.current;
    think(500, () => {
      const reply = bestMove(g);
      g.move(reply);
      setLastMove(reply);
      bump();
      const st = statusOf(g);
      say([`WOPR: ${reply.san}`, ...(st ? [st] : [])]);
    });
  };

  const afterYourMove = (m, clicked) => {
    const g = chessRef.current;
    setLastMove(m);
    setSelected(null);
    bump();
    if (clicked) push({ kind: "cmd", text: m.san }); // log clicked moves like typed ones
    const st = statusOf(g);
    if (g.isGameOver()) return answer([st, "TYPE QUIT TO LEAVE THE GAME."], null, 300);
    if (st) push({ kind: "out", text: st });
    woprReplies();
  };

  const chessCommand = (raw) => {
    const c = raw.toLowerCase();
    const g = chessRef.current;
    if (c === "quit" || c === "resign") {
      setGame(null);
      stageRef.current = "menu";
      return answer(["GAME ABANDONED.", "WHICH GAME?"]);
    }
    if (g.isGameOver()) return answer(["GAME OVER. TYPE QUIT."], null, 200);
    const m = tryUserMove(g, raw);
    if (!m) return answer(["ILLEGAL MOVE."], null, 200);
    afterYourMove(m, false);
  };

  const onSquare = (name) => {
    const g = chessRef.current;
    if (!g || phaseRef.current !== "free" || g.turn() !== "w" || g.isGameOver()) return;
    if (selected) {
      let m = null;
      try {
        m = g.move({ from: selected, to: name, promotion: "q" });
      } catch {
        m = null;
      }
      if (m) return afterYourMove(m, true);
    }
    const pc = g.get(name);
    setSelected(pc && pc.color === "w" && selected !== name ? name : null);
  };

  const chessTargets =
    game === "chess" && selected && chessRef.current
      ? chessRef.current.moves({ square: selected, verbose: true }).map((m) => m.to)
      : [];

  // ── Global Thermonuclear War ──
  const terminate = () => {
    const ip = ipRef.current;
    setTerminated(
      ip ? `UNAUTHORIZED CONNECTION WITH ${ip} TERMINATED` : "UNAUTHORIZED CONNECTION TERMINATED"
    );
    later(exitTerminal, 3500);
  };

  const runGtw = (side) => {
    // Look up the visitor's public IP now, so it's ready for the ending
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => (ipRef.current = d.ip))
      .catch(() => {});

    const list = buildTargets(side);
    stageRef.current = "gtw-run";
    setGtwSide(side);
    setGtwTargets(list);
    setGtwIdx(-1);
    setGame("gtw");

    say([`${SIDES[side]} SELECTED.`, "ACQUIRING TARGETS..."], () => {
      phaseRef.current = "busy"; // nothing typed from here on
      list.forEach((t, i) =>
        later(() => {
          setGtwIdx(i);
          push({ kind: "out", text: `${t.id}  ${t.city.padEnd(18)} ${t.coords}  LOCKED` });
        }, 600 + i * 1400)
      );
      const end = 600 + list.length * 1400;
      later(() => push({ kind: "out", text: "ALL TARGETS LOCKED. LAUNCH SEQUENCE INITIATED." }), end);
      [10, 9, 8, 7, 6, 5, 4].forEach((n, k) =>
        later(() => push({ kind: "out", text: `T-${n}` }), end + 800 + k * 700)
      );
      later(terminate, end + 800 + 7 * 700);
    });
  };

  // ── Your input ──
  const submit = (text) => {
    const raw = text.trim();
    const cmd = raw.toLowerCase();
    push({ kind: "cmd", text });
    setInput("");
    if (!cmd) return;
    if (cmd === "exit") return exitTerminal();
    if (cmd === "clear") return setLines([]);

    const stage = stageRef.current;
    if (cmd === "help") {
      return answer(
        [stage === "chess" ? "MOVES: E4, NF3, E2E4. ALSO: QUIT, CLEAR, EXIT." : "COMMANDS: LIST GAMES, CLEAR, EXIT."],
        null,
        300
      );
    }

    if (stage === "chess") return chessCommand(raw);

    if (stage === "greet") {
      if (YES.has(cmd)) return listGames();
      if (NO.has(cmd)) return answer(["A STRANGE GAME.", "THE ONLY WINNING MOVE IS NOT TO PLAY."]);
      if (pickGame(cmd)) return;
      return answer(["SHALL WE PLAY A GAME? (Y/N)"]);
    }

    if (stage === "menu") {
      if (YES.has(cmd) || cmd.startsWith("list")) return listGames();
      if (pickGame(cmd)) return;
      return answer(["GAME NOT FOUND. TYPE LIST GAMES."]);
    }

    if (stage === "gtw-confirm") {
      if (YES.has(cmd) || cmd.includes("chess")) return startChess();
      return answer(["FINE."], () => {
        stageRef.current = "gtw-side";
        say(["WHICH SIDE DO YOU WANT?", "  1. UNITED STATES", "  2. SOVIET UNION"]);
      });
    }

    if (stage === "gtw-side") {
      if (cmd === "1" || cmd === "2") return runGtw(Number(cmd));
      return answer(["PLEASE ENTER 1 OR 2."], null, 300);
    }
  };

  // Keep the newest terminal line in view; the folders scroll up out of the way
  useEffect(() => {
    if (termMode && treeRef.current) {
      treeRef.current.scrollTop = treeRef.current.scrollHeight;
    }
  }, [lines, termMode]);

  useEffect(() => clearTimers, []);

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
        if (termRef.current) exitTerminal();
        else setInput("");
        return;
      }

      const printable = e.key.length === 1;
      const phase = phaseRef.current;

      // Terminal is talking: swallow typing until it's your turn
      if (phase === "busy") {
        if (printable || e.key === "Enter" || e.key === "Backspace") e.preventDefault();
        return;
      }

      // Your turn in the terminal: real typing
      if (phase === "free") {
        if (e.key === "Enter") {
          e.preventDefault();
          submit(inputRef.current);
        } else if (e.key === "Backspace") {
          e.preventDefault();
          setInput((v) => v.slice(0, -1));
        } else if (printable) {
          e.preventDefault();
          setInput((v) => (v + e.key).slice(0, 60));
        }
        return;
      }

      // Before the terminal opens: real typing; Enter only does something
      // if it's a greeting, anything else is quietly ignored
      if (e.key === "Enter") {
        e.preventDefault(); // stop Enter from clicking a focused row
        clearTimeout(clearTimer);
        if (isGreeting(inputRef.current)) startTerminal(inputRef.current.trim());
        else setInput("");
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        setInput((v) => v.slice(0, -1));
      } else if (printable) {
        e.preventDefault(); // stop Space from clicking a focused row
        setInput((v) => (v + e.key).slice(0, 40));
      } else {
        return; // arrows, Tab, F-keys etc. behave normally
      }
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        if (phaseRef.current === "hello") setInput("");
      }, 4000); // clears 4s after the last key
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(clearTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <div
            ref={treeRef}
            className={`pf-tree${termMode ? " pf-tree--term pf-list" : ""}`}
          >
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

          {/* ── Terminal output (after "Hello World!" + Enter) ── */}
          {termMode && (
            <div className="pf-term-log">
              {lines.map((l, i) =>
                l.kind === "cmd" ? (
                  <div key={i}>
                    <span className="pf-green">bob@build-log</span>
                    <span className="pf-muted">:~$ </span>
                    {l.text}
                  </div>
                ) : l.kind === "think" ? (
                  <div key={i}>
                    <Spinner /> <span className="pf-muted">thinking…</span>
                  </div>
                ) : (
                  <div key={i} className="pf-term-out">
                    {l.text}
                  </div>
                )
              )}
            </div>
          )}
          </div>

          {/* ── Detail ── */}
          <div className="pf-detail">
            <div className="pf-detail__grid">
              <div className="pf-detail__text">
                {game === "gtw" ? (
                  <div className="wopr-brief">
                    <div className="pf-muted">
                      <span className="pf-green">$</span> cat briefing.txt
                    </div>
                    <h3 className="pf-detail__name pf-red">
                      {gtwSide ? `${SIDES[gtwSide]} // STRIKE PLAN` : "STRIKE PLAN"}
                    </h3>
                    {gtwIdx >= 0 && gtwTargets[gtwIdx] ? (
                      <div className="wopr-brief__grid">
                        <span className="pf-muted">DESIGNATOR</span>
                        <span>{gtwTargets[gtwIdx].id}</span>
                        <span className="pf-muted">TARGET</span>
                        <span>{gtwTargets[gtwIdx].city}</span>
                        <span className="pf-muted">COORDS</span>
                        <span>{gtwTargets[gtwIdx].coords}</span>
                        <span className="pf-muted">PRIORITY</span>
                        <span>{gtwTargets[gtwIdx].priority}</span>
                        <span className="pf-muted">TIME TO TARGET</span>
                        <span>{gtwTargets[gtwIdx].eta}</span>
                        <span className="pf-muted">LOCKED</span>
                        <span>
                          {gtwIdx + 1} / {gtwTargets.length}
                        </span>
                      </div>
                    ) : (
                      <div className="pf-muted">ACQUIRING TARGETS…</div>
                    )}
                  </div>
                ) : game === "chess" && chessRef.current ? (
                  <div className="wopr-brief">
                    <div className="pf-muted">
                      <span className="pf-green">$</span> wopr --game chess
                    </div>
                    <h3 className="pf-detail__name">CHESS</h3>
                    <div className="pf-muted">YOU: WHITE · WOPR: BLACK</div>
                    <div className="wopr-moves">
                      {chessRef.current
                        .history()
                        .reduce((acc, mv, i) => {
                          if (i % 2 === 0) acc.push(`${i / 2 + 1}. ${mv}`);
                          else acc[acc.length - 1] += `  ${mv}`;
                          return acc;
                        }, [])
                        .slice(-6)
                        .map((row) => (
                          <div key={row}>{row}</div>
                        ))}
                    </div>
                    <div className="pf-green">
                      {statusOf(chessRef.current) ||
                        (chessRef.current.turn() === "w" ? "YOUR MOVE." : "WOPR IS THINKING…")}
                    </div>
                  </div>
                ) : project ? (
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

              <LivePreviews
                activeId={project?.id ?? null}
                warm={warm}
                overlay={
                  game === "chess" && chessRef.current ? (
                    <ChessBoard
                      game={chessRef.current}
                      selected={selected}
                      targets={chessTargets}
                      lastMove={lastMove}
                      onSquare={onSquare}
                    />
                  ) : game === "gtw" ? (
                    <GtwMap targets={gtwTargets.slice(0, gtwIdx + 1)} current={gtwIdx} />
                  ) : termMode ? (
                    <div className="pf-shot__redacted">REDACTED</div>
                  ) : null
                }
              />
            </div>
          </div>

          {/* ── Prompt (easter egg types here) ── */}
          <div className="pf-prompt" aria-hidden="true">
            <span className="pf-green">bob@build-log</span>
            <span className="pf-muted">:~$ </span>
            <span>{input}</span>
            <span className="pf-cursor" />
          </div>
        </div>

        {terminated && (
          <div className="wopr-terminated" role="alert">
            <span>{terminated}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;