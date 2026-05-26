import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import CTA from "./CTA";
import "./Header.css";
import HeaderSocials from "./HeaderSocials";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useCallback, useRef, useEffect } from "react";
import react_logo from "../../assets/tech_logos/react.webp";
import ts_logo from "../../assets/tech_logos/ts.webp";
import next_logo from "../../assets/tech_logos/nextjs.webp";
import tailwind_logo from "../../assets/tech_logos/tailwind.webp";
import nodejs_logo from "../../assets/tech_logos/nodejs.webp";
import expressjs_logo from "../../assets/tech_logos/expressjs.webp";
import NET from "../../assets/tech_logos/NET.png";
import coffeeImage from "../../assets/coffee.webp";
import cSharpLogo from "../../assets/tech_logos/cSharp.webp"; // Corrected import
import sqlLogo from "../../assets/tech_logos/sql.png";
import Arduino from "../../assets/tech_logos/Arduino.png";
import { useMediaQuery } from "react-responsive";


const Header = () => {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });

  const logos = [
    { id: 1, name: "React", src: react_logo },
    { id: 2, name: "C#", src: cSharpLogo }, // Replaced TypeScript with C#
    { id: 3, name: "NET", src: NET },
    { id: 4, name: "sqlLogo", src: sqlLogo },
    { id: 5, name: "NodeJS", src: nodejs_logo },
    { id: 6, name: "arduino", src: Arduino },
  ];

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, dpr;
    let traces = [], floaters = [], pulses = [], blooms = [];
    let frame = 0, animId;
    const mouse = { x: -999, y: -999 };

    const rw = () => W / dpr;
    const rh = () => H / dpr;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = rect.width * dpr;
      H = canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildTraces();
    }

    function buildTraces() {
      traces = [];
      const cw = rw(), ch = rh();
      const cols = 10, rows = 6;
      const gx = cw / cols, gy = ch / rows;
      const nodes = [];
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          nodes.push({
            x: gx * c + (Math.random() - 0.5) * gx * 0.4,
            y: gy * r + (Math.random() - 0.5) * gy * 0.4,
          });
        }
      }
      const used = new Set();
      for (let i = 0; i < nodes.length; i++) {
        const nearby = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - nodes[i].x, m.y - nodes[i].y) }))
          .filter((o) => o.j !== i && o.d < gx * 1.8)
          .sort((a, b) => a.d - b.d)
          .slice(0, 3);
        for (const { j } of nearby) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (used.has(key)) continue;
          used.add(key);
          const a = nodes[i], b = nodes[j];
          const elbow = Math.random() > 0.5
            ? [{ x: a.x, y: a.y }, { x: b.x, y: a.y }, { x: b.x, y: b.y }]
            : [{ x: a.x, y: a.y }, { x: a.x, y: b.y }, { x: b.x, y: b.y }];
          traces.push({ pts: elbow, lit: 0, lastHit: -9999 });
        }
      }
    }

    function pathLen(pts) {
      let l = 0;
      for (let i = 1; i < pts.length; i++)
        l += Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
      return l;
    }

    function pointAtDist(pts, dist) {
      let acc = 0;
      for (let i = 1; i < pts.length; i++) {
        const seg = Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
        if (acc + seg >= dist) {
          const t = (dist - acc) / seg;
          return { x: pts[i-1].x + (pts[i].x - pts[i-1].x) * t, y: pts[i-1].y + (pts[i].y - pts[i-1].y) * t };
        }
        acc += seg;
      }
      return pts[pts.length - 1];
    }

    function distToSeg(px, py, ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay, l2 = dx*dx + dy*dy;
      if (l2 === 0) return Math.hypot(px - ax, py - ay);
      const t = Math.max(0, Math.min(1, ((px-ax)*dx + (py-ay)*dy) / l2));
      return Math.hypot(px - (ax + t*dx), py - (ay + t*dy));
    }

    function distToTrace(mx, my, tr) {
      let min = Infinity;
      for (let i = 1; i < tr.pts.length; i++)
        min = Math.min(min, distToSeg(mx, my, tr.pts[i-1].x, tr.pts[i-1].y, tr.pts[i].x, tr.pts[i].y));
      return min;
    }

    class Floater {
      constructor(x, y, color) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.r = Math.random() * 2 + 1.5;
        this.alpha = 0; this.targetAlpha = 0.9;
        this.color = color || "#7ab8f5";
        this.age = 0; this.life = 400 + Math.random() * 300;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.age++;
        this.alpha += (this.targetAlpha - this.alpha) * 0.05;
        if (this.age > this.life - 60) this.targetAlpha = 0;
        const cw = rw(), ch = rh();
        if (this.x < 0 || this.x > cw) this.vx *= -1;
        if (this.y < 0 || this.y > ch) this.vy *= -1;
        return this.age < this.life;
      }
      draw() {
        const ha = Math.floor(this.alpha * 255).toString(16).padStart(2, "0");
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + ha; ctx.fill();
        if (this.alpha > 0.4) {
          const hg = Math.floor(this.alpha * 40).toString(16).padStart(2, "0");
          ctx.beginPath(); ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = this.color + hg; ctx.fill();
        }
      }
    }

    class TracePulse {
      constructor(tr) {
        this.pts = tr.pts;
        this.len = pathLen(this.pts);
        this.t = 0; this.speed = this.len / 55; this.done = false;
      }
      update() {
        this.t += this.speed;
        if (this.t >= this.len) { this.done = true; this.spawnBloom(); }
      }
      spawnBloom() {
        const end = this.pts[this.pts.length - 1];
        blooms.push({ x: end.x, y: end.y, age: 0, life: 45 });
        const colors = ["#7ab8f5", "#a0d4ff", "#4fc3f7", "#81d4fa"];
        for (let i = 0; i < 6; i++) {
          floaters.push(new Floater(
            end.x + (Math.random() - 0.5) * 30,
            end.y + (Math.random() - 0.5) * 30,
            colors[Math.floor(Math.random() * colors.length)]
          ));
        }
      }
      draw() {
        const pos = pointAtDist(this.pts, this.t);
        if (!pos) return;
        const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
        g.addColorStop(0, "rgba(200,230,255,0.95)");
        g.addColorStop(0.3, "rgba(100,180,255,0.5)");
        g.addColorStop(1, "rgba(50,120,255,0)");
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff"; ctx.fill();
      }
    }

    function drawTraces() {
      for (const tr of traces) {
        tr.lit = Math.max(0, tr.lit - 0.012);
        const alpha = 0.06 + tr.lit * 0.55;
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.strokeStyle = `rgba(20,90,160,${alpha})`;
        ctx.lineWidth = tr.lit > 0.3 ? 1.2 : 0.7; ctx.stroke();
        if (tr.lit > 0.1) {
          ctx.beginPath();
          ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
          for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
          ctx.strokeStyle = `rgba(80,180,255,${tr.lit * 0.5})`;
          ctx.lineWidth = 2.5; ctx.stroke();
        }
        for (const pt of tr.pts) {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(60,140,220,${alpha * 2})`; ctx.fill();
        }
      }
    }

    function drawFloaterLinks() {
      const maxD = 130;
      for (let i = 0; i < floaters.length; i++) {
        for (let j = i + 1; j < floaters.length; j++) {
          const a = floaters[i], b = floaters[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD) {
            const alpha = (1 - d / maxD) * Math.min(a.alpha, b.alpha) * 0.4;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(80,160,255,${alpha})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
    }

    function drawBlooms() {
      blooms = blooms.filter((b) => {
        b.age++;
        const p = b.age / b.life;
        [0.3, 0.6, 1.0].forEach((s) => {
          ctx.beginPath(); ctx.arc(b.x, b.y, 40 * s * p, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150,210,255,${0.9 * (1 - p)})`;
          ctx.lineWidth = 1.5; ctx.stroke();
        });
        if (p < 0.3) {
          ctx.beginPath(); ctx.arc(b.x, b.y, 6 * (1 - p / 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.9 * (1 - p / 0.3)})`; ctx.fill();
        }
        return b.age < b.life;
      });
    }

    function loop() {
      animId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, rw(), rh());
      frame++;
      drawTraces();
      drawFloaterLinks();
      floaters = floaters.filter((f) => f.update());
      floaters.forEach((f) => f.draw());
      pulses = pulses.filter((p) => { p.update(); p.draw(); return !p.done; });
      drawBlooms();
      if (frame % 240 === 0 && traces.length) {
        const tr = traces[Math.floor(Math.random() * traces.length)];
        tr.lit = Math.min(tr.lit + 0.2, 0.4);
      }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      for (const tr of traces) {
        const d = distToTrace(mouse.x, mouse.y, tr);
        if (d < 30) { tr.lit = Math.min(1, tr.lit + 0.08 * (1 - d / 30)); tr.lastHit = frame; }
      }
    }

    function onMouseLeave() { mouse.x = -999; mouse.y = -999; }

    function onClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let best = null, bestD = Infinity;
      for (const tr of traces) {
        const d = distToTrace(mx, my, tr);
        if (d < bestD) { bestD = d; best = tr; }
      }
      if (best && bestD < 80) { best.lit = 1; best.lastHit = frame; pulses.push(new TracePulse(best)); }
      floaters.push(new Floater(mx, my, "#a0d4ff"));
    }

    function onResize() { ctx.setTransform(1, 0, 0, 1, 0, 0); resize(); }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    // Delay first resize so the header has painted and has real dimensions
    setTimeout(() => { resize(); loop(); }, 50);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <header style={{ position: "relative", minHeight: "100vh" }}>
        <div className="background_Logos" style={{ position: "relative", zIndex: 1 }}>
          <div className="background_Logos">
            {logos.map((logo) => (
              <img
                key={logo.id}
                className="wiggle"
                src={logo.src}
                alt={logo.name}
              />
            ))}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "all",
            zIndex: 0,
          }}
        />

        <div className="container header_container" style={{ position: "relative", zIndex: 1 }}>
          <div className="header_info">
            <motion.h2
              className="static_header_name"
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", duration: 3 }}
            >
              Hello I'm{" "}
            </motion.h2>

            <h3
              style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}
            >
              {/* Style will be inherited from the parent element */}

              <Typewriter
                options={{
                  strings: ["Robert Brunner", "Full Stack Developer"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>

            <div>
              <a href="#about">
                <div className="scroll-down"></div>
              </a>
            </div>

            <CTA />
          </div>

          <HeaderSocials />
        </div>
      </header>
    </>
  );
};

export default Header;