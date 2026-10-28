import React, { useEffect, useMemo, useRef, useState } from "react";
import AOS from "aos";
import { useMediaQuery } from "react-responsive";
import "aos/dist/aos.css";
import { testimonial } from "../../constants";
import "./Testimonials.css";

// Stable 7-char "commit hash" from a string, so each review keeps the same
// hash on every load without adding anything to constants.
const hashOf = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

// First few words of a review for the chip
const snippet = (text, words = 5) => {
  const parts = text.trim().split(/\s+/);
  return parts.length <= words ? text : parts.slice(0, words).join(" ") + "…";
};

const sourceKey = (source) => source.toLowerCase();

// ── Marquee ──
// Rows are moved by JS (not CSS animation) so the wheel can push them.
// Row 0 drifts left, row 1 drifts right; the wheel speeds both up in their
// own direction (or reverses both), so they always stay opposed.
const MIN_CHIPS_PER_ROW = 8;
const BASE_SPEED = 25;   // px per second, normal drift
const WHEEL_GAIN = 4;    // how hard one wheel notch pushes
const BOOST_DECAY = 3;   // how fast a wheel push settles back to normal
const MAX_BOOST = 2500;  // px per second cap

const loopOf = (items) => {
  const base = [];
  while (base.length < MIN_CHIPS_PER_ROW) base.push(...items);
  return { base, loop: [...base, ...base] };
};

const Marquee = ({ rows, activeIdx, onPick }) => {
  const wrapRef = useRef(null);
  const rowRefs = useRef([]);
  // hover pauses the drift until a chip is clicked, then it resumes
  const st = useRef({ hover: false, resumed: false, boost: 0, pos: [] });

  useEffect(() => {
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = performance.now();
    let raf;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const drift = reduce || (s.hover && !s.resumed) ? 0 : BASE_SPEED;
      const v = drift + s.boost;
      s.boost *= Math.exp(-BOOST_DECAY * dt);

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const half = el.scrollWidth / 2;
        if (!half) return;
        const dir = i % 2 === 0 ? 1 : -1;
        let p = (s.pos[i] ?? 0) + dir * v * dt;
        p = ((p % half) + half) % half;
        s.pos[i] = p;
        el.style.transform = `translate3d(${-p}px, 0, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Wheel over the chips scrubs them instead of scrolling the page
    const wrap = wrapRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      let d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (e.deltaMode === 1) d *= 33; // Firefox reports lines, not pixels
      s.boost = Math.max(-MAX_BOOST, Math.min(MAX_BOOST, s.boost + d * WHEEL_GAIN));
    };
    wrap.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      className="tm-marquee"
      ref={wrapRef}
      onMouseEnter={() => {
        st.current.hover = true;
        st.current.resumed = false;
      }}
      onMouseLeave={() => {
        st.current.hover = false;
      }}
    >
      {rows.map((items, rowIdx) => {
        const { base, loop } = loopOf(items);
        return (
          <div
            className="tm-row"
            key={rowIdx}
            ref={(el) => (rowRefs.current[rowIdx] = el)}
          >
            {loop.map((r, i) => (
              <button
                type="button"
                key={i}
                className={`tm-chip${r.idx === activeIdx ? " is-on" : ""}`}
                onClick={() => {
                  st.current.resumed = true; // start moving again right away
                  onPick(r.idx);
                }}
                tabIndex={i < base.length ? 0 : -1}
                aria-hidden={i >= base.length}
              >
                <img className="tm-chip__av" src={r.avatar} alt="" />
                <span className="tm-hash">{r.hash}</span>
                <span className="tm-chip__name">{r.name}</span>
                <span className="tm-muted">"{snippet(r.review)}"</span>
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const reviews = useMemo(
    () =>
      testimonial.map((t, idx) => ({
        ...t,
        idx,
        hash: hashOf(`${t.name}${t.review}`),
      })),
    []
  );

  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const r = reviews[active];

  // Fade out, swap, fade back in
  const FADE_MS = 400;
  const go = (i) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, FADE_MS);
  };

  // Auto-advance every 10s. Restarts after any change (including a click),
  // and holds while the mouse is over the section so nobody loses their place.
  const CYCLE_MS = 10000;
  useEffect(() => {
    if (paused || reviews.length < 2) return;
    const t = setTimeout(() => go((active + 1) % reviews.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  // Two opposite rows when there are enough reviews to not look repetitive,
  // otherwise one row. Mobile always gets one row with every review in it.
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const twoRows = !isMobile && reviews.length >= 6;
  const rows = twoRows
    ? [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)]
    : [reviews];

  return (
    <section id="testimonials">
      <h2>Testimonials</h2>

      <div
        className="tm-frame"
        data-aos="fade-up"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Featured quote ── */}
        <div className={`tm-feature${fading ? " is-fading" : ""}`}>
          <div className="tm-cmd">
            <span className="tm-green">$</span>{" "}
            <span className="tm-muted">git show</span>{" "}
            <span className="tm-hash">{r.hash}</span>
          </div>

          <div className="tm-quote" key={active}>
            <span className="tm-mark" aria-hidden="true">
              "
            </span>
            <p className="tm-text">{r.review}</p>
          </div>

          <div className="tm-meta">
            <img className="tm-meta__av" src={r.avatar} alt={r.name} />
            <span className="tm-dot">●</span>
            <span className="tm-hash">{r.hash}</span>
            <span className={`tm-branch tm-branch--${sourceKey(r.source)}`}>
              (origin/{sourceKey(r.source)})
            </span>
            {r.source !== "LinkedIn" && <span className="tm-stars">★★★★★</span>}
            <span className="tm-name">{r.name}</span>
            {r.title && <span className="tm-muted">· {r.title}</span>}
          </div>
        </div>

        {/* ── Marquee picker ── */}
        <Marquee
          key={rows.length}
          rows={rows}
          activeIdx={active}
          onPick={go}
        />
      </div>
    </section>
  );
};

export default Testimonials;