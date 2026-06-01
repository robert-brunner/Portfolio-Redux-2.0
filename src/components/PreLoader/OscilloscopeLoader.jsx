import { useRef, useEffect } from "react";
// import Scope from "../../assets/manchester/retroAlphaOcilloscope.png";
import Scope from "../../assets/manchester/retroAlphaTrans.webp";

const CRT_DURATION = 200;

const CRTCollapse = ({ onDone }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const cw = rect.width;
    const ch = rect.height;
    const start = performance.now();
    let animId;

    const loop = (now) => {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, cw, ch);
      animId = requestAnimationFrame(loop);
      const t = Math.min((now - start) / CRT_DURATION, 1);
      // ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      const midY = ch / 2.29;
      const lineH = Math.max(1, ch * (1 - t) * 0.5);
      const lineW = cw * Math.min(t * 1.6, 1);
      const lineX = (cw - lineW) / 2;

      const grad = ctx.createLinearGradient(0, midY - lineH, 0, midY + lineH);
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.3, `rgba(200,220,255,${0.08 * (1 - t)})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${0.18 * (1 - t)})`);
      grad.addColorStop(0.7, `rgba(200,220,255,${0.08 * (1 - t)})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(lineX, midY - lineH, lineW, lineH * 2);

      const brightness = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
      ctx.beginPath();
      ctx.moveTo(lineX, midY);
      ctx.lineTo(lineX + lineW, midY);
      ctx.strokeStyle = `rgba(255,255,255,${brightness * 0.9})`;
      ctx.lineWidth = Math.max(0.5, 2 * (1 - t * 0.5));
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 20 * brightness;
      ctx.stroke();
      ctx.shadowBlur = 0;

      const flashT = Math.max(0, 1 - Math.abs(t - 0.55) * 5);
      if (flashT > 0) {
        const fx = cw * 0.53;
        const fg = ctx.createRadialGradient(
          fx,
          midY,
          0,
          fx,
          midY,
          200 * flashT,
        );
        fg.addColorStop(0, `rgba(255,255,255,${flashT * 0.95})`);
        fg.addColorStop(0.2, `rgba(200,230,255,${flashT * 0.5})`);
        fg.addColorStop(0.6, `rgba(100,160,255,${flashT * 0.15})`);
        fg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, cw, ch);
      }

      if (t >= 1) {
        cancelAnimationFrame(animId);
        onDone();
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════
//  CONFIG — edit anything here freely
// ═══════════════════════════════════════════════════════════════
const CONFIG = {
  // ── Words to decode ─────────────────────────────────────────
  words: ["Creative,", "Driven,", "Passionate"],

  // ── Oscilloscope screen bounds (fractions of PNG: 1025×628) ─
  // Move these if the wave drifts outside the screen
  screenLeft: 0.32,
  screenRight: 0.85,
  screenTop: 0.088,
  screenBottom: 0.78,

  // ── Wave position within the screen (fractions of screen H) ─
  waveTopFrac: 0.25, // how high the HIGH level sits
  waveBotFrac: 0.75, // how low the LOW level sits

  // ── Wave appearance ──────────────────────────────────────────
  waveColor: "#00e5ff",
  waveGlowColor: "#00e5ff",
  waveGlowBlur: 5,
  waveLineWidth: 3.8,
  scanDotColor: "#ffffff",
  scanDotRadius: 3,
  scanDotGlow: 10,

  // ── Wave speed & density ─────────────────────────────────────
  bitWidth: 12, // px per half-bit — lower = denser wave, higher = stretched out
  leadBits: 6, // idle samples before/after each word
  waveSpeed: 2, // samples drawn per interval tick — higher = faster scroll
  waveInterval: 8, // ms per wave tick

  // ── Grid ─────────────────────────────────────────────────────
  gridColor: "rgba(0,229,255,0.04)",
  gridMidColor: "rgba(0,229,255,0.10)",
  gridCols: 6,
  gridRows: 5,

  // ── Label ────────────────────────────────────────────────────
  labelText: "CH1  Manchester  9600 baud",
  labelColor: "rgba(0,229,255,0.28)",

  // ── Text below oscilloscope ──────────────────────────────────
  textFontSize: 38, // px
  textFontFamily: "monospace",
  textHeight: 60, // px — height of the text strip below the scope
  textMarginTop: 12, // px — gap between scope and text
  tokenGap: 0, // px between character tokens

  hexColor: "#00e5ff",
  charColor: "#b76bf5",
  cursorColor: "#b76bf5",
  cursorOffset: 30, // px gap between last char and cursor

  // ── Text matte / feather (white knockout behind characters) ──
  matteLineWidth: 0, // thickness of white stroke behind text — increase for more extrusion
  matteColor: "#010101",
  matteGlowColor: "rgba(0, 0, 0, 0.9)",
  matteGlowBlur: 0, // feather softness — increase for more bleed

  // ── Colored glow on top of characters ───────────────────────
  charGlowBlur: 9, // glow on settled chars
  hexGlowBlur: 0, // glow on hex tokens

  // ── Timing ───────────────────────────────────────────────────
  charDelay: 100, // ms between each character appearing
  wordPause: 600, // ms pause between words
  morphSpeed: 0.07, // flip speed hex→char per frame (0–1)
};
// ═══════════════════════════════════════════════════════════════

const charToHex = (c) =>
  "0x" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");

const wordToSamples = (word, hi, lo) => {
  const s = [];
  for (let i = 0; i < CONFIG.leadBits; i++) s.push(lo);
  for (const c of word) {
    const code = c.charCodeAt(0);
    for (let i = 7; i >= 0; i--) {
      const b = (code >> i) & 1;
      b === 1 ? (s.push(lo), s.push(hi)) : (s.push(hi), s.push(lo));
    }
  }
  for (let i = 0; i < CONFIG.leadBits; i++) s.push(lo);
  return s;
};

const OscilloscopeLoader = ({ onComplete, showCRT }) => {
  const containerRef = useRef(null);
  const waveCanvasRef = useRef(null);
  const textCanvasRef = useRef(null);

  useEffect(() => {
    const waveCanvas = waveCanvasRef.current;
    const textCanvas = textCanvasRef.current;
    if (!waveCanvas || !textCanvas) return;

    const wCtx = waveCanvas.getContext("2d");
    const tCtx = textCanvas.getContext("2d");
    let animId, waveIntervalId;
    let frame = 0;

    // ── Canvas sizing ────────────────────────────────────────────
    const PW = 1025;
    const PH = 628;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    waveCanvas.width = PW * dpr;
    waveCanvas.height = PH * dpr;
    wCtx.scale(dpr, dpr);

    textCanvas.width = PW * dpr;
    textCanvas.height = CONFIG.textHeight * dpr;
    tCtx.scale(dpr, dpr);

    // ── Screen bounds ─────────────────────────────────────────────
    const SCREEN_L = PW * CONFIG.screenLeft;
    const SCREEN_R = PW * CONFIG.screenRight;
    const SCREEN_T = PH * CONFIG.screenTop;
    const SCREEN_B = PH * CONFIG.screenBottom;
    const SCREEN_W = SCREEN_R - SCREEN_L;
    const SCREEN_H = SCREEN_B - SCREEN_T;

    const WAVE_X = SCREEN_L;
    const WAVE_W = SCREEN_W;
    const WAVE_TOP = SCREEN_T + SCREEN_H * CONFIG.waveTopFrac;
    const WAVE_BOT = SCREEN_T + SCREEN_H * CONFIG.waveBotFrac;
    const HALF = CONFIG.bitWidth / 2;
    const MAX_BUF = Math.floor(WAVE_W / HALF);

    // ── Tokens ───────────────────────────────────────────────────
    const tokens = [...CONFIG.words.join(" ")].map((c) => ({
      hex: c === " " ? "   " : charToHex(c),
      char: c,
      isSpace: c === " ",
    }));
    const tokenState = tokens.map(() => ({ phase: "hidden", morphT: 0 }));

    // ── Wave state ───────────────────────────────────────────────
    let waveSamples = wordToSamples(CONFIG.words[0], WAVE_TOP, WAVE_BOT);
    let waveSampHead = 0;
    let waveDone = false;
    let waveBuffer = [];

    const advanceWave = () => {
      if (waveDone) return;
      for (let s = 0; s < CONFIG.waveSpeed; s++) {
        if (waveSampHead >= waveSamples.length) {
          waveDone = true;
          break;
        }
        const y = waveSamples[waveSampHead++];
        const sx = WAVE_X + waveBuffer.length * HALF;
        waveBuffer.push({ sx, y });
        if (waveBuffer.length > MAX_BUF) {
          waveBuffer.shift();
          waveBuffer.forEach((p) => {
            p.sx -= HALF;
          });
          const drift = waveBuffer[0]?.sx - WAVE_X;
          if (drift > 0)
            waveBuffer.forEach((p) => {
              p.sx -= drift;
            });
        }
      }
    };

    const startWordWave = (idx) => {
      if (idx >= CONFIG.words.length) return;
      waveSamples = wordToSamples(CONFIG.words[idx], WAVE_TOP, WAVE_BOT);
      waveSampHead = 0;
      waveDone = false;
      waveBuffer = [];
    };

    // ── Typing state ─────────────────────────────────────────────
    let typingTokenIdx = 0;
    let wordIdx = 0;
    let wordCharIdx = 0;
    let lastCharTime = performance.now();
    let waitingForNext = false;

    const triggerMorph = (i) => {
      if (
        i >= 0 &&
        i < tokens.length &&
        !tokens[i].isSpace &&
        tokenState[i].phase === "hex"
      ) {
        tokenState[i].phase = "morphing";
        tokenState[i].morphT = 0;
      }
    };

    const advanceMorphs = () => {
      tokenState.forEach((ts) => {
        if (ts.phase === "morphing") {
          ts.morphT = Math.min(1, ts.morphT + CONFIG.morphSpeed);
          if (ts.morphT >= 1) ts.phase = "char";
        }
      });
    };

    const advanceTyping = () => {
      if (waitingForNext || typingTokenIdx >= tokens.length) return;
      const tok = tokens[typingTokenIdx];
      if (tok.isSpace) {
        tokenState[typingTokenIdx].phase = "char";
        typingTokenIdx++;
        lastCharTime = performance.now();
        return;
      }
      const now = performance.now();
      if (now - lastCharTime < CONFIG.charDelay) return;
      lastCharTime = now;
      tokenState[typingTokenIdx].phase = "hex";
      if (typingTokenIdx > 0) triggerMorph(typingTokenIdx - 1);
      typingTokenIdx++;
      wordCharIdx++;
      if (wordCharIdx >= CONFIG.words[wordIdx].length) {
        triggerMorph(typingTokenIdx - 1);
        wordCharIdx = 0;
        waitingForNext = true;
        const next = wordIdx + 1;
        setTimeout(() => {
          wordIdx = next;
          waitingForNext = false;
          startWordWave(next);
          lastCharTime = performance.now();
          if (next >= CONFIG.words.length && onComplete)
            setTimeout(onComplete, 600);
        }, CONFIG.wordPause);
      }
    };

    // ── Draw wave canvas ─────────────────────────────────────────
    const drawWaveCanvas = () => {
      
      wCtx.clearRect(0, 0, PW, PH);
      wCtx.save();
      wCtx.beginPath();
      wCtx.rect(SCREEN_L, SCREEN_T, SCREEN_W, SCREEN_H);
      wCtx.clip();

      // grid
      wCtx.strokeStyle = CONFIG.gridColor;
      wCtx.lineWidth = 0.5;
      for (let i = 0; i <= CONFIG.gridCols; i++) {
        wCtx.beginPath();
        wCtx.moveTo(WAVE_X + (WAVE_W / CONFIG.gridCols) * i, SCREEN_T);
        wCtx.lineTo(WAVE_X + (WAVE_W / CONFIG.gridCols) * i, SCREEN_B);
        wCtx.stroke();
      }
      for (let i = 0; i <= CONFIG.gridRows; i++) {
        wCtx.beginPath();
        wCtx.moveTo(WAVE_X, SCREEN_T + (SCREEN_H / CONFIG.gridRows) * i);
        wCtx.lineTo(
          WAVE_X + WAVE_W,
          SCREEN_T + (SCREEN_H / CONFIG.gridRows) * i,
        );
        wCtx.stroke();
      }
      wCtx.strokeStyle = CONFIG.gridMidColor;
      const midY = (WAVE_TOP + WAVE_BOT) / 2;
      wCtx.beginPath();
      wCtx.moveTo(WAVE_X, midY);
      wCtx.lineTo(WAVE_X + WAVE_W, midY);
      wCtx.stroke();

      // label
      wCtx.font = `9px ${CONFIG.textFontFamily}`;
      wCtx.fillStyle = CONFIG.labelColor;
      wCtx.textBaseline = "top";
      wCtx.fillText(CONFIG.labelText, WAVE_X + 4, SCREEN_T + 4);
      wCtx.fillText("H", WAVE_X + WAVE_W + 3, WAVE_TOP);
      wCtx.fillText("L", WAVE_X + WAVE_W + 3, WAVE_BOT);

      // wave
      if (waveBuffer.length >= 2) {
        wCtx.beginPath();
        wCtx.strokeStyle = CONFIG.waveColor;
        wCtx.lineWidth = CONFIG.waveLineWidth;
        wCtx.shadowColor = CONFIG.waveGlowColor;
        wCtx.shadowBlur = CONFIG.waveGlowBlur;
        wCtx.lineJoin = "miter";
        wCtx.lineCap = "square";
        let prevY = null;
        waveBuffer.forEach(({ sx, y }, i) => {
          if (i === 0) {
            wCtx.moveTo(sx, y);
            prevY = y;
            return;
          }
          if (y !== prevY) {
            wCtx.lineTo(sx, prevY);
            wCtx.lineTo(sx, y);
          }
          wCtx.lineTo(sx + HALF, y);
          prevY = y;
        });
        wCtx.stroke();
        wCtx.shadowBlur = 0;

        if (!waveDone) {
          const last = waveBuffer[waveBuffer.length - 1];
          wCtx.beginPath();
          wCtx.arc(last.sx, last.y, CONFIG.scanDotRadius, 0, Math.PI * 2);
          wCtx.fillStyle = CONFIG.scanDotColor;
          wCtx.shadowColor = CONFIG.scanDotColor;
          wCtx.shadowBlur = CONFIG.scanDotGlow;
          wCtx.fill();
          wCtx.shadowBlur = 0;
        }
      }

      wCtx.restore();
    };

    // ── Draw text canvas ─────────────────────────────────────────
    const drawTextCanvas = () => {
      const FS = CONFIG.textFontSize;
      tCtx.clearRect(0, 0, PW, CONFIG.textHeight);
      tCtx.font = `${FS}px ${CONFIG.textFontFamily}`;
      tCtx.textBaseline = "middle";

      const refW = tCtx.measureText("W").width * 1.1;
      const spaceW = refW * 0.6;
      const totalW = tokens.reduce(
        (acc, t) => acc + (t.isSpace ? spaceW : refW + CONFIG.tokenGap),
        0,
      );
      let x = (PW - totalW) / 2;
      const TEXT_Y = CONFIG.textHeight / 2;

      tokens.forEach((tok, i) => {
        const ts = tokenState[i];
        if (ts.phase === "hidden") {
          x += tok.isSpace ? spaceW : refW + CONFIG.tokenGap;
          return;
        }
        if (tok.isSpace) {
          x += spaceW;
          return;
        }

        let text, color, alpha;
        if (ts.phase === "hex") {
          text = tok.hex;
          color = CONFIG.hexColor;
          alpha = 0.8;
        } else if (ts.phase === "morphing") {
          const t = ts.morphT;
          text = t < 0.5 ? tok.hex : tok.char;
          color = t < 0.5 ? CONFIG.hexColor : CONFIG.charColor;
          alpha = t < 0.5 ? 1 - t * 1.6 : (t - 0.5) * 2;
        } else {
          text = tok.char;
          color = CONFIG.charColor;
          alpha = 1;
        }

        tCtx.globalAlpha = Math.max(0, Math.min(1, alpha));

        const drawWithMatte = (tx, ty, scale = null) => {
          if (scale !== null) tCtx.scale(1, scale);
          // matte pass
          tCtx.lineWidth = CONFIG.matteLineWidth;
          tCtx.strokeStyle = CONFIG.matteColor;
          tCtx.shadowColor = CONFIG.matteGlowColor;
          tCtx.shadowBlur = CONFIG.matteGlowBlur;
          tCtx.strokeText(text, tx, ty);
          tCtx.shadowBlur = 0;
          // colored glow pass
          tCtx.shadowColor = color;
          tCtx.shadowBlur =
            ts.phase === "char" ? CONFIG.charGlowBlur : CONFIG.hexGlowBlur;
          tCtx.fillStyle = color;
          tCtx.fillText(text, tx, ty);
          tCtx.shadowBlur = 0;
        };

        if (ts.phase === "morphing") {
          const scaleY =
            ts.morphT < 0.5
              ? Math.max(0.05, 1 - ts.morphT * 2)
              : Math.max(0.05, (ts.morphT - 0.5) * 2);
          const tw = tCtx.measureText(text).width;
          tCtx.save();
          tCtx.translate(x + tw / 2, TEXT_Y);
          drawWithMatte(-tw / 2, 0, scaleY);
          tCtx.restore();
        } else {
          drawWithMatte(x, TEXT_Y);
        }

        tCtx.globalAlpha = 1;
        x += refW + CONFIG.tokenGap;
      });

      // cursor
      if (typingTokenIdx <= tokens.length) {
        let cx = (PW - totalW) / 2;
        for (let i = 0; i < typingTokenIdx; i++) {
          cx += tokens[i].isSpace ? spaceW : refW + CONFIG.tokenGap;
        }
        if (frame % 18 < 10) {
          tCtx.fillStyle = CONFIG.cursorColor;
          tCtx.globalAlpha = 1;
          tCtx.fillRect(
            cx + CONFIG.cursorOffset,
            TEXT_Y - FS / 2,
            FS * 0.45,
            FS,
          );
        }
      }
    };

    // ── Loop ─────────────────────────────────────────────────────
    waveIntervalId = setInterval(advanceWave, CONFIG.waveInterval);

    const loop = () => {
      animId = requestAnimationFrame(loop);
      frame++;
      advanceTyping();
      advanceMorphs();
      if (typingTokenIdx >= tokens.length) {
        tokenState.forEach((ts, i) => {
          if (ts.phase === "hex") triggerMorph(i);
        });
      }
      drawWaveCanvas();
      drawTextCanvas();
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(waveIntervalId);
    };
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ position: "relative", width: `${CONFIG.scopeMaxWidth}px` }}>
        <canvas
          ref={waveCanvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {showCRT && <CRTCollapse onDone={() => {}} />}
        <img
          src={Scope}
          alt="oscilloscope"
          style={{
            width: "100%",
            display: "block",
            position: "relative",
            zIndex: 3,
          }}
        />
      </div>
      <canvas
        ref={textCanvasRef}
        style={{
          width: `${CONFIG.scopeMaxWidth}px`,
          height: `${CONFIG.textHeight}px`,
          marginTop: `${CONFIG.textMarginTop}px`,
        }}
      />
    </div>
  );
};

export default OscilloscopeLoader;
