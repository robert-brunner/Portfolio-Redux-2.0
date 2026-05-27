import { useRef, useEffect } from "react";

const Traces = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, dpr, traces = [], pulses = [], blooms = [], frame = 0, animId;
    const rw = () => W / dpr;
    const rh = () => H / dpr;

    // =========================================================
    // COLORS — edit everything here
    // =========================================================
const COLOR = {
  traceBase:    '#00ffcc18',   // faint teal dormant
  traceGlow:    '#00e5b47a',   // teal glow
  viaDot:       '#00ccaa',     // teal via dots

  pulseCore:    '#ffffff',
  pulseInner:   '#eefffa',
  pulseMiddle:  '#ffe600',
  pulseOuter:   '#007a60',

  bloomRing:    '#00ccaa',
  bloomFlash:   '#ffffff',
};
    // =========================================================

    // converts a hex color + alpha into rgba() string
    const rgb = (hex, a) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };

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
      const S = 22;
      const cols = Math.ceil(cw / S) + 1;
      const rows = Math.ceil(ch / S) + 1;
      const occ = new Set();
      const key = (c, r) => c + ',' + r;
      const DX = [1, 0, -1, 0];
      const DY = [0, 1, 0, -1];

      function tryRoute() {
        let c = Math.floor(Math.random() * cols);
        let r = Math.floor(Math.random() * rows);
        if (occ.has(key(c, r))) return;
        const pts = [{ x: c * S, y: r * S }];
        occ.add(key(c, r));
        let dir = Math.floor(Math.random() * 4);
        const turns = 3 + Math.floor(Math.random() * 8);
        for (let t = 0; t < turns; t++) {
          const run = 2 + Math.floor(Math.random() * 13);
          for (let s = 0; s < run; s++) {
            const nc = c + DX[dir];
            const nr = r + DY[dir];
            if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) break;
            if (occ.has(key(nc, nr))) break;
            c = nc; r = nr;
            occ.add(key(c, r));
          }
          pts.push({ x: c * S, y: r * S });
          const left = (dir + 1) % 4;
          const right = (dir + 3) % 4;
          const choices = Math.random() < 0.5 ? [left, right] : [right, left];
          let turned = false;
          for (const d of choices) {
            const nc = c + DX[d];
            const nr = r + DY[d];
            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows && !occ.has(key(nc, nr))) {
              dir = d; turned = true; break;
            }
          }
          if (!turned) break;
        }
        if (pts.length > 2) {
          traces.push({ pts, lit: 0, base: 0.07 + Math.random() * 0.1, w: Math.random() > 0.8 ? 1.7 : 0.9 });
        }
      }

      for (let i = 0; i < 700; i++) tryRoute();
    }

    function pathLen(pts) {
      let l = 0;
      for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
      return l;
    }
    function ptAt(pts, d) {
      let a = 0;
      for (let i = 1; i < pts.length; i++) {
        const s = Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
        if (a + s >= d) {
          const t = (d - a) / s;
          return { x: pts[i-1].x + (pts[i].x - pts[i-1].x) * t, y: pts[i-1].y + (pts[i].y - pts[i-1].y) * t };
        }
        a += s;
      }
      return pts[pts.length - 1];
    }
    function dSeg(px, py, ax, ay, bx, by) {
      const dx = bx - ax, dy = by - ay, l2 = dx*dx + dy*dy;
      if (!l2) return Math.hypot(px - ax, py - ay);
      const t = Math.max(0, Math.min(1, ((px-ax)*dx + (py-ay)*dy) / l2));
      return Math.hypot(px - (ax + t*dx), py - (ay + t*dy));
    }
    function dTrace(mx, my, tr) {
      let m = Infinity;
      for (let i = 1; i < tr.pts.length; i++)
        m = Math.min(m, dSeg(mx, my, tr.pts[i-1].x, tr.pts[i-1].y, tr.pts[i].x, tr.pts[i].y));
      return m;
    }

    function drawTraces() {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (const tr of traces) {
        tr.lit = Math.max(0, tr.lit - 0.007);
        const a = tr.base + tr.lit * 0.65;

        // base trace line
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.strokeStyle = rgb(COLOR.traceBase, a);
        ctx.lineWidth = tr.w;
        ctx.stroke();

        // glow layer when lit
        if (tr.lit > 0.06) {
          ctx.beginPath();
          ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
          for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
          ctx.strokeStyle = rgb(COLOR.traceGlow, tr.lit * 0.45);
          ctx.lineWidth = tr.w * 4;
          ctx.stroke();
        }

        // via dots at bends
        for (const p of tr.pts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, tr.lit > 0.3 ? 2.5 : 1.6, 0, Math.PI * 2);
          ctx.fillStyle = rgb(COLOR.viaDot, Math.min(a * 2.4, 0.92));
          ctx.fill();
        }
      }
    }

    function onMouseMove(e) {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      for (const tr of traces) {
        const d = dTrace(mx, my, tr);
        if (d < 18) tr.lit = Math.min(1, tr.lit + 0.09 * (1 - d / 18));
      }
    }

    function onClick(e) {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      let best = null, bd = Infinity;
      for (const tr of traces) {
        const d = dTrace(mx, my, tr);
        if (d < bd) { bd = d; best = tr; }
      }
      if (best && bd < 50) {
        best.lit = 1;
        const len = pathLen(best.pts);
        pulses.push({ pts: best.pts, len, t: 0, speed: len / 55 });
      }
    }

    function onResize() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    }

    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;
      ctx.clearRect(0, 0, rw(), rh());
      drawTraces();

      // pulse — moving electric charge along trace
      pulses = pulses.filter(p => {
        p.t += p.speed;
        if (p.t >= p.len) {
          blooms.push({ x: p.pts[p.pts.length-1].x, y: p.pts[p.pts.length-1].y, age: 0, life: 42 });
          return false;
        }
        const pos = ptAt(p.pts, p.t);
        const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 11);
        g.addColorStop(0,   rgb(COLOR.pulseInner,  0.99));
        g.addColorStop(0.4, rgb(COLOR.pulseMiddle, 0.55));
        g.addColorStop(1,   rgb(COLOR.pulseOuter,  0));
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 11, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2); ctx.fillStyle = COLOR.pulseCore; ctx.fill();
        return true;
      });

      // bloom — expanding rings when pulse arrives
      blooms = blooms.filter(b => {
        b.age++;
        const p = b.age / b.life;
        [0.3, 0.65, 1].forEach(s => {
          ctx.beginPath(); ctx.arc(b.x, b.y, 40 * s * p, 0, Math.PI * 2);
          ctx.strokeStyle = rgb(COLOR.bloomRing, 0.88 * (1 - p));
          ctx.lineWidth = 1.2; ctx.stroke();
        });
        if (p < 0.28) {
          ctx.beginPath(); ctx.arc(b.x, b.y, 5.5 * (1 - p / 0.28), 0, Math.PI * 2);
          ctx.fillStyle = rgb(COLOR.bloomFlash, 0.96 * (1 - p / 0.28));
          ctx.fill();
        }
        return b.age < b.life;
      });

      // ambient random flicker
      if (frame % 200 === 0 && traces.length) {
        for (let i = 0; i < 3; i++) {
          const tr = traces[Math.floor(Math.random() * traces.length)];
          tr.lit = Math.min(tr.lit + 0.4, 0.6);
        }
      }
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    setTimeout(() => { resize(); loop(); }, 50);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "all",
      }}
    />
  );
};

export default Traces;
