import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import CTA from "./CTA";
import "./Header.css";
import HeaderSocials from "./HeaderSocials";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
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
import { useRef, useEffect } from "react";


const Header = () => {


    const canvasRef = useRef(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, dpr, traces = [], pulses = [], blooms = [], floaters = [], frame = 0, animId;
  const mouse = { x: -999, y: -999 };
  const rw = () => W / dpr, rh = () => H / dpr;

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = r.width * dpr;
    H = canvas.height = r.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    build();
  }

  function build() {
    traces = [];
    const cw = rw(), ch = rh();
    const GRID = 28;
    const cols = Math.ceil(cw / GRID) + 2, rows = Math.ceil(ch / GRID) + 2;
    const pts = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        pts.push({
          x: c * GRID + (Math.random() - 0.5) * GRID * 0.35 - GRID,
          y: r * GRID + (Math.random() - 0.5) * GRID * 0.35 - GRID,
        });
    const used = new Set();
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const neighbors = pts
        .map((b, j) => ({ j, d: Math.hypot(b.x - a.x, b.y - a.y) }))
        .filter(o => o.j !== i && o.d < GRID * 2.2)
        .sort((x, y) => x.d - y.d)
        .slice(0, Math.random() > 0.3 ? 4 : 2);
      for (const { j } of neighbors) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (used.has(key)) continue;
        used.add(key);
        const b = pts[j];
        const rn = Math.random();
        let segs;
        if (rn < 0.6) {
          const mid = Math.random() > 0.5 ? { x: b.x, y: a.y } : { x: a.x, y: b.y };
          segs = [{ x: a.x, y: a.y }, mid, { x: b.x, y: b.y }];
        } else if (rn < 0.8) {
          const mx = (a.x + b.x) / 2;
          segs = [{ x: a.x, y: a.y }, { x: mx, y: a.y }, { x: mx, y: b.y }, { x: b.x, y: b.y }];
        } else {
          segs = [{ x: a.x, y: a.y }, { x: b.x, y: b.y }];
        }
        traces.push({ pts: segs, lit: 0, base: Math.random() * 0.06 + 0.04 });
      }
    }
  }

  function pathLen(pts) { let l = 0; for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y); return l; }
  function ptAt(pts, d) { let a = 0; for (let i = 1; i < pts.length; i++) { const s = Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y); if (a + s >= d) { const t = (d - a) / s; return { x: pts[i-1].x + (pts[i].x - pts[i-1].x) * t, y: pts[i-1].y + (pts[i].y - pts[i-1].y) * t }; } a += s; } return pts[pts.length - 1]; }
  function dSeg(px, py, ax, ay, bx, by) { const dx = bx-ax, dy = by-ay, l2 = dx*dx+dy*dy; if (!l2) return Math.hypot(px-ax, py-ay); const t = Math.max(0, Math.min(1, ((px-ax)*dx+(py-ay)*dy)/l2)); return Math.hypot(px-(ax+t*dx), py-(ay+t*dy)); }
  function dTrace(mx, my, tr) { let m = Infinity; for (let i = 1; i < tr.pts.length; i++) m = Math.min(m, dSeg(mx, my, tr.pts[i-1].x, tr.pts[i-1].y, tr.pts[i].x, tr.pts[i].y)); return m; }

  class Floater {
    constructor(x, y) { this.x=x; this.y=y; this.vx=(Math.random()-0.5)*0.5; this.vy=(Math.random()-0.5)*0.5; this.r=Math.random()*2+1; this.a=0; this.ta=0.85; this.age=0; this.life=350+Math.random()*250; }
    update() { this.x+=this.vx; this.y+=this.vy; this.age++; this.a+=(this.ta-this.a)*0.06; if(this.age>this.life-50) this.ta=0; const cw=rw(),ch=rh(); if(this.x<0||this.x>cw) this.vx*=-1; if(this.y<0||this.y>ch) this.vy*=-1; return this.age<this.life; }
    draw() { const h=Math.floor(this.a*255).toString(16).padStart(2,'0'); ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle='#7ab8f5'+h; ctx.fill(); }
  }

  function drawTraces() {
    for (const tr of traces) {
      tr.lit = Math.max(0, tr.lit - 0.008);
      const a = tr.base + tr.lit * 0.6;
      ctx.beginPath(); ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
      for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
      ctx.strokeStyle = `rgba(180,210,255,${a})`; ctx.lineWidth = tr.lit > 0.2 ? 1.1 : 0.65; ctx.stroke();
      if (tr.lit > 0.08) {
        ctx.beginPath(); ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.strokeStyle = `rgba(100,180,255,${tr.lit * 0.55})`; ctx.lineWidth = 2.5; ctx.stroke();
      }
      for (const p of tr.pts) { ctx.beginPath(); ctx.arc(p.x, p.y, tr.lit > 0.3 ? 2.2 : 1.4, 0, Math.PI*2); ctx.fillStyle = `rgba(180,215,255,${Math.min(a * 2.5, 0.9)})`; ctx.fill(); }
    }
  }

  function drawLinks() {
    for (let i = 0; i < floaters.length; i++) for (let j = i+1; j < floaters.length; j++) {
      const a = floaters[i], b = floaters[j], d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < 120) { const al = (1-d/120)*Math.min(a.a,b.a)*0.35; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(80,160,255,${al})`; ctx.lineWidth=0.6; ctx.stroke(); }
    }
  }

  function loop() {
    animId = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, rw(), rh());
    frame++;
    drawTraces();
    drawLinks();
    floaters = floaters.filter(f => f.update()); floaters.forEach(f => f.draw());
    pulses = pulses.filter(p => {
      p.t += p.speed;
      if (p.t >= p.len) {
        const end = p.pts[p.pts.length - 1];
        blooms.push({ x: end.x, y: end.y, age: 0, life: 40 });
        for (let i = 0; i < 5; i++) floaters.push(new Floater(end.x+(Math.random()-0.5)*25, end.y+(Math.random()-0.5)*25));
        return false;
      }
      const pos = ptAt(p.pts, p.t);
      const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 10);
      g.addColorStop(0, 'rgba(220,240,255,0.98)'); g.addColorStop(0.4, 'rgba(100,180,255,0.5)'); g.addColorStop(1, 'rgba(50,120,255,0)');
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 10, 0, Math.PI*2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 2, 0, Math.PI*2); ctx.fillStyle = '#fff'; ctx.fill();
      return true;
    });
    blooms = blooms.filter(b => {
      b.age++; const p = b.age / b.life;
      [0.35, 0.65, 1].forEach(s => { ctx.beginPath(); ctx.arc(b.x, b.y, 38*s*p, 0, Math.PI*2); ctx.strokeStyle=`rgba(160,215,255,${0.85*(1-p)})`; ctx.lineWidth=1.2; ctx.stroke(); });
      if (p < 0.25) { ctx.beginPath(); ctx.arc(b.x, b.y, 5*(1-p/0.25), 0, Math.PI*2); ctx.fillStyle=`rgba(255,255,255,${1-p/0.25})`; ctx.fill(); }
      return b.age < b.life;
    });
    if (frame % 180 === 0 && traces.length) {
      const n = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < n; i++) { const tr = traces[Math.floor(Math.random() * traces.length)]; tr.lit = Math.min(tr.lit + 0.35, 0.55); }
    }
  }

  function onMouseMove(e) { const r = canvas.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; for (const tr of traces) { const d=dTrace(mouse.x,mouse.y,tr); if(d<25) tr.lit=Math.min(1,tr.lit+0.1*(1-d/25)); } }
  function onMouseLeave() { mouse.x=-999; mouse.y=-999; }
  function onClick(e) {
    const r = canvas.getBoundingClientRect(); const mx=e.clientX-r.left, my=e.clientY-r.top;
    let best=null, bd=Infinity;
    for (const tr of traces) { const d=dTrace(mx,my,tr); if(d<bd){bd=d;best=tr;} }
    if (best && bd < 60) { best.lit=1; pulses.push({pts:best.pts,len:pathLen(best.pts),t:0,speed:pathLen(best.pts)/50,done:false}); }
    for (let i=0;i<5;i++) floaters.push(new Floater(mx+(Math.random()-0.5)*20, my+(Math.random()-0.5)*20));
  }
  function onResize() { ctx.setTransform(1,0,0,1,0,0); resize(); }

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);
  setTimeout(() => { resize(); loop(); }, 50);

  return () => {
    cancelAnimationFrame(animId);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseleave", onMouseLeave);
    canvas.removeEventListener("click", onClick);
    window.removeEventListener("resize", onResize);
  };
}, []);

    

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

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <header>
        <div className="background_Logos">
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
  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "all" }}
/>

        <div className="container header_container">
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