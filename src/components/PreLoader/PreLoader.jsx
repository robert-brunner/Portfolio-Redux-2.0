import React, { useEffect, useState, useRef } from 'react';
import OscilloscopeLoader from './OscilloscopeLoader';
import './PreLoader.css';

// ─────────────────────────────────────────────
// EDIT THESE to control preloader timing
const DISPLAY_DURATION = 7000;  // ms — how long oscilloscope plays before CRT effect
const CRT_DURATION     = 200;  // ms — how long the CRT collapse animation takes
const HOLD_DURATION    = 100;   // ms — how long the flash holds before fade
const FADE_DURATION    = 100;   // ms — final fade out
// ─────────────────────────────────────────────

const CRTCollapse = ({ onDone }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const cw = rect.width;
    const ch = rect.height;

    const start = performance.now();
    let animId;

    function loop(now) {
      animId = requestAnimationFrame(loop);
      const elapsed = now - start;
      const t = Math.min(elapsed / CRT_DURATION, 1); // 0 -> 1

      ctx.clearRect(0, 0, cw, ch);

      const midY = ch / 2;

      // line collapses vertically — height shrinks from full to 0
      const lineH = Math.max(1, ch * (1 - t) * 0.5);

      // horizontal line grows from center outward
      const lineW = cw * Math.min(t * 1.6, 1);
      const lineX = (cw - lineW) / 2;

      // draw the collapsing glow band
      const grad = ctx.createLinearGradient(0, midY - lineH, 0, midY + lineH);
      grad.addColorStop(0,   'rgba(255,255,255,0)');
      grad.addColorStop(0.3, `rgba(200,220,255,${0.08 * (1 - t)})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${0.18 * (1 - t)})`);
      grad.addColorStop(0.7, `rgba(200,220,255,${0.08 * (1 - t)})`);
      grad.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(lineX, midY - lineH, lineW, lineH * 2);

      // the hard bright line
      const brightness = t < 0.7 ? 1 : 1 - ((t - 0.7) / 0.3);
      ctx.beginPath();
      ctx.moveTo(lineX, midY);
      ctx.lineTo(lineX + lineW, midY);
      ctx.strokeStyle = `rgba(255,255,255,${brightness * 0.9})`;
      ctx.lineWidth = Math.max(0.5, 2 * (1 - t * 0.5));
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur  = 20 * brightness;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // center flash — peaks as lines meet
      const flashT = Math.max(0, 1 - Math.abs(t - 0.55) * 5);
      if (flashT > 0) {
        const fx = cw / 2;
        const fg = ctx.createRadialGradient(fx, midY, 0, fx, midY, 180 * flashT);
        fg.addColorStop(0,   `rgba(255,255,255,${flashT * 0.95})`);
        fg.addColorStop(0.2, `rgba(200,230,255,${flashT * 0.5})`);
        fg.addColorStop(0.6, `rgba(100,160,255,${flashT * 0.15})`);
        fg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, cw, ch);
      }

      if (t >= 1) {
        cancelAnimationFrame(animId);
        onDone();
      }
    }

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

const PreLoader = () => {
  const [visible,  setVisible]  = useState(true);
  const [showCRT,  setShowCRT]  = useState(false);
  const [fading,   setFading]   = useState(false);

  useEffect(() => {
    // After oscilloscope finishes, trigger CRT collapse
    const crtTimer  = setTimeout(() => setShowCRT(true),  DISPLAY_DURATION);
    // After CRT + hold, fade out
    const fadeTimer = setTimeout(() => setFading(true),   DISPLAY_DURATION + CRT_DURATION + HOLD_DURATION);
    const hideTimer = setTimeout(() => setVisible(false), DISPLAY_DURATION + CRT_DURATION + HOLD_DURATION + FADE_DURATION);
    return () => {
      clearTimeout(crtTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader"
      style={{
        position: 'fixed',
        transition: `opacity ${FADE_DURATION}ms ease`,
        opacity: fading ? 0 : 1,
      }}
    >
      <OscilloscopeLoader />
      {showCRT && <CRTCollapse onDone={() => {}} />}
    </div>
  );
};

export default PreLoader;
