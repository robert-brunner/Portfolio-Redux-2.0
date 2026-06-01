import React, { useEffect, useState, useRef } from 'react';
import OscilloscopeLoader from './OscilloscopeLoader';
import './PreLoader.css';

// ─────────────────────────────────────────────
// Only edit these if the CRT effect needs tuning.
// Typing duration is automatic — fires when animation actually finishes.
const CRT_DURATION  = 200;   // ms — CRT collapse animation
const HOLD_DURATION = 100;   // ms — flash hold before fade
const FADE_DURATION = 100;   // ms — final fade out
// ─────────────────────────────────────────────

// const CRTCollapse = ({ onDone }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const dpr = Math.min(window.devicePixelRatio || 1, 2);
//     const rect = canvas.getBoundingClientRect();
//     canvas.width  = rect.width  * dpr;
//     canvas.height = rect.height * dpr;
//     ctx.scale(dpr, dpr);
//     const cw = rect.width;
//     const ch = rect.height;
//     const start = performance.now();
//     let animId;

//     function loop(now) {
//       animId = requestAnimationFrame(loop);
//       const t = Math.min((now - start) / CRT_DURATION, 1);
//       ctx.clearRect(0, 0, cw, ch);
//       const midY  = ch / 2;
//       const lineH = Math.max(1, ch * (1 - t) * 0.5);
//       const lineW = cw * Math.min(t * 1.6, 1);
//       const lineX = (cw - lineW) / 2;

//       const grad = ctx.createLinearGradient(0, midY - lineH, 0, midY + lineH);
//       grad.addColorStop(0,   'rgba(255,255,255,0)');
//       grad.addColorStop(0.3, `rgba(200,220,255,${0.08 * (1 - t)})`);
//       grad.addColorStop(0.5, `rgba(255,255,255,${0.18 * (1 - t)})`);
//       grad.addColorStop(0.7, `rgba(200,220,255,${0.08 * (1 - t)})`);
//       grad.addColorStop(1,   'rgba(255,255,255,0)');
//       ctx.fillStyle = grad;
//       ctx.fillRect(lineX, midY - lineH, lineW, lineH * 2);

//       const brightness = t < 0.7 ? 1 : 1 - ((t - 0.7) / 0.3);
//       ctx.beginPath();
//       ctx.moveTo(lineX, midY);
//       ctx.lineTo(lineX + lineW, midY);
//       ctx.strokeStyle = `rgba(255,255,255,${brightness * 0.9})`;
//       ctx.lineWidth   = Math.max(0.5, 2 * (1 - t * 0.5));
//       ctx.shadowColor = '#ffffff';
//       ctx.shadowBlur  = 20 * brightness;
//       ctx.stroke();
//       ctx.shadowBlur  = 0;

//       const flashT = Math.max(0, 1 - Math.abs(t - 0.55) * 5);
//       if (flashT > 0) {
//         const fx = cw / 2;
//         const fg = ctx.createRadialGradient(fx, midY, 0, fx, midY, 180 * flashT);
//         fg.addColorStop(0,   `rgba(255,255,255,${flashT * 0.95})`);
//         fg.addColorStop(0.2, `rgba(200,230,255,${flashT * 0.5})`);
//         fg.addColorStop(0.6, `rgba(100,160,255,${flashT * 0.15})`);
//         fg.addColorStop(1,   'rgba(0,0,0,0)');
//         ctx.fillStyle = fg;
//         ctx.fillRect(0, 0, cw, ch);
//       }

//       if (t >= 1) { cancelAnimationFrame(animId); onDone(); }
//     }

//     animId = requestAnimationFrame(loop);
//     return () => cancelAnimationFrame(animId);
//   }, [onDone]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
//     />
//   );
// };

const PreLoader = () => {
  const [visible, setVisible] = useState(true);
  const [showCRT, setShowCRT] = useState(false);
  const [fading,  setFading]  = useState(false);

  // Called by OscilloscopeLoader when the last word finishes — no timers, no guessing
  const handleComplete = () => {
    setShowCRT(true);
    setTimeout(() => setFading(true),   CRT_DURATION + HOLD_DURATION);
    setTimeout(() => setVisible(false), CRT_DURATION + HOLD_DURATION + FADE_DURATION);
  };

  if (!visible) return null;

return (
    <div
      className="preloader"
      style={{ position: 'fixed', transition: `opacity ${FADE_DURATION}ms ease`, opacity: fading ? 0 : 1 }}
    >
      <OscilloscopeLoader onComplete={handleComplete} showCRT={showCRT} />
    </div>
  );
};

export default PreLoader;
