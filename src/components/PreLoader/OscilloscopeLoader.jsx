import { useRef, useEffect } from "react";

// ============================================================
const CONFIG = {
  words: ["Creative,", "Driven,", "Passionate"],   // words to decode

  colorTrace:       "#00e5ff",   // wave line color
  colorTraceShadow: "#00e5ff",   // wave glow color
  colorScanDot:     "#ffffff",   // leading edge dot color
  colorHex:         "#00e5ff",   // hex token color e.g. 0x43
  colorChar:        "#b76bf5",   // character color after morph
  colorCursor:      "#b76bf5",   // blinking cursor color
  colorGrid:        "rgba(0,229,255,0.04)",   // faint grid lines
  colorGridMid:     "rgba(0,229,255,0.10)",   // center grid line
  colorLabel:       "rgba(0,229,255,0.28)",   // channel label text
  colorBackground:  "#060a0f",   // canvas background

  waveStartX:   0.25,   // wave panel left edge (0.0–1.0 of canvas width)
  waveWidth:    0.25,   // wave panel width (0.0–1.0 of canvas width)
  textStartX:   0.45,   // text left edge (0.0–1.0 of canvas width)
  textY:        0.50,   // text vertical center (0.5 = middle)
  waveTop:      0.22,   // wave HIGH level (0.0–1.0 of canvas height)
  waveBot:      0.52,   // wave LOW level (0.0–1.0 of canvas height)

  waveSpeed:    2,      // samples advanced per interval tick
  waveInterval: 8,      // ms per wave tick — lower is faster
  charDelay:    100,     // frames between each character — lower is faster
  wordPause:    600,    // ms between words
  morphSpeed:   0.07,   // hex-to-char flip speed per frame — higher is faster
  cursorOffset: 30,     // px gap between last char and cursor

  bitWidth:     4,      // px per Manchester bit half-period — lower is denser
  leadBits:     6,      // idle LOW samples before each word's wave

  fontSize:     0.0165, // text size as fraction of canvas height
  fontFamily:   "monospace",   // font — monospace keeps spacing consistent
  tokenGap:     0,      // px between character tokens

  label:        "CH1  Manchester  9600 baud",   // wave panel label text
};
// ============================================================

function charToHex(c) {
  return "0x" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
}

function wordToSamples(word, hi, lo) {
  const s = [];
  for (let i = 0; i < CONFIG.leadBits; i++) s.push(lo);
  for (const c of word) {
    const code = c.charCodeAt(0);
    for (let i = 7; i >= 0; i--) {
      const b = (code >> i) & 1;
      if (b === 1) { s.push(lo); s.push(hi); }
      else         { s.push(hi); s.push(lo); }
    }
  }
  for (let i = 0; i < CONFIG.leadBits; i++) s.push(lo);
  return s;
}

const OscilloscopeLoader = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, waveIntervalId;
    let frame = 0;

    // ── Canvas setup ──────────────────────────────────────────
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const cw = rect.width;
    const ch = rect.height;

    const WAVE_X    = cw * CONFIG.waveStartX;
    const WAVE_W    = cw * CONFIG.waveWidth;
    const WAVE_TOP  = ch * CONFIG.waveTop;
    const WAVE_BOT  = ch * CONFIG.waveBot;
    const TEXT_X    = cw * CONFIG.textStartX;
    const TEXT_Y    = ch * CONFIG.textY;
    const FONT_SIZE = Math.floor(ch * CONFIG.fontSize);
    const HALF      = CONFIG.bitWidth / 2;
    const MAX_BUF   = Math.floor(WAVE_W / HALF);

    // ── Tokens ────────────────────────────────────────────────
    const allText = CONFIG.words.join(" ");
    const tokens  = [];
    for (const c of allText) {
      tokens.push({ hex: c === " " ? "   " : charToHex(c), char: c, isSpace: c === " " });
    }
    const tokenState = tokens.map(() => ({ phase: "hidden", morphT: 0 }));

    // ── Wave state (runs on its own interval) ─────────────────
    let waveSamples  = wordToSamples(CONFIG.words[0], WAVE_TOP, WAVE_BOT);
    let waveSampHead = 0;
    let waveDone     = false;
    let waveWordIdx  = 0;
    let waveBuffer   = [];

    function advanceWave() {
      if (waveDone) return;
      for (let s = 0; s < CONFIG.waveSpeed; s++) {
        if (waveSampHead >= waveSamples.length) { waveDone = true; break; }
        const y  = waveSamples[waveSampHead++];
        const sx = WAVE_X + waveBuffer.length * HALF;
        waveBuffer.push({ sx, y });
        if (waveBuffer.length > MAX_BUF) {
          waveBuffer.shift();
          waveBuffer.forEach(p => { p.sx -= HALF; });
          if (waveBuffer.length > 0) {
            const drift = waveBuffer[0].sx - WAVE_X;
            if (drift > 0) waveBuffer.forEach(p => { p.sx -= drift; });
          }
        }
      }
    }

    function startWordWave(idx) {
      if (idx >= CONFIG.words.length) return;
      waveSamples  = wordToSamples(CONFIG.words[idx], WAVE_TOP, WAVE_BOT);
      waveSampHead = 0;
      waveDone     = false;
      waveWordIdx  = idx;
      waveBuffer   = [];
    }

    // ── Typing state (timestamp-based — consistent on any machine) ──
    let typingTokenIdx = 0;
    let wordIdx        = 0;
    let wordCharIdx    = 0;
    let lastCharTime   = performance.now();
    let waitingForNext = false;

    function triggerMorph(i) {
      if (i >= 0 && i < tokens.length && !tokens[i].isSpace && tokenState[i].phase === "hex") {
        tokenState[i].phase  = "morphing";
        tokenState[i].morphT = 0;
      }
    }

    function advanceMorphs() {
      for (let i = 0; i < tokenState.length; i++) {
        if (tokenState[i].phase === "morphing") {
          tokenState[i].morphT = Math.min(1, tokenState[i].morphT + CONFIG.morphSpeed);
          if (tokenState[i].morphT >= 1) tokenState[i].phase = "char";
        }
      }
    }

    function advanceTyping() {
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
        wordCharIdx    = 0;
        waitingForNext = true;
        const next = wordIdx + 1;
        setTimeout(() => {
          wordIdx        = next;
          waitingForNext = false;
          startWordWave(next);
          lastCharTime   = performance.now();
          // fire onComplete after the last word finishes + morph settles
          if (next >= CONFIG.words.length && onComplete) {
            setTimeout(onComplete, 600);
          }
        }, CONFIG.wordPause);
      }
    }

    // ── Draw ──────────────────────────────────────────────────

    function drawGrid() {
      ctx.strokeStyle = CONFIG.colorGrid;
      ctx.lineWidth   = 0.5;
      const cols = 6, rows = 5;
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(WAVE_X + (WAVE_W / cols) * i, 0);
        ctx.lineTo(WAVE_X + (WAVE_W / cols) * i, ch);
        ctx.stroke();
      }
      for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(WAVE_X, (ch / rows) * i);
        ctx.lineTo(WAVE_X + WAVE_W, (ch / rows) * i);
        ctx.stroke();
      }
      ctx.strokeStyle = CONFIG.colorGridMid;
      const midY = (WAVE_TOP + WAVE_BOT) / 2;
      ctx.beginPath(); ctx.moveTo(WAVE_X, midY); ctx.lineTo(WAVE_X + WAVE_W, midY); ctx.stroke();
    }

    function drawWave() {
      if (waveBuffer.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = CONFIG.colorTrace;
      ctx.lineWidth   = 1.8;
      ctx.shadowColor = CONFIG.colorTraceShadow;
      ctx.shadowBlur  = 5;
      ctx.lineJoin    = "miter";
      ctx.lineCap     = "square";
      let prevY = null;
      for (let i = 0; i < waveBuffer.length; i++) {
        const { sx, y } = waveBuffer[i];
        if (i === 0) { ctx.moveTo(sx, y); prevY = y; continue; }
        if (y !== prevY) { ctx.lineTo(sx, prevY); ctx.lineTo(sx, y); }
        ctx.lineTo(sx + HALF, y);
        prevY = y;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      if (!waveDone) {
        const last = waveBuffer[waveBuffer.length - 1];
        ctx.beginPath();
        ctx.arc(last.sx, last.y, 3, 0, Math.PI * 2);
        ctx.fillStyle   = CONFIG.colorScanDot;
        ctx.shadowColor = CONFIG.colorScanDot;
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function drawTokens() {
      ctx.font         = `${FONT_SIZE}px ${CONFIG.fontFamily}`;
      ctx.textBaseline = "middle";
      const refW   = ctx.measureText("W").width * 1.1;
      const spaceW = refW * 0.6;
      let x = TEXT_X;

      for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        const ts  = tokenState[i];
        if (ts.phase === "hidden") { x += tok.isSpace ? spaceW : refW + CONFIG.tokenGap; continue; }
        if (tok.isSpace)           { x += spaceW; continue; }

        let text, color, alpha;
        if (ts.phase === "hex") {
          text = tok.hex; color = CONFIG.colorHex; alpha = 0.8;
        } else if (ts.phase === "morphing") {
          const t = ts.morphT;
          if (t < 0.5) { text = tok.hex;  color = CONFIG.colorHex;  alpha = 1 - t * 1.6; }
          else          { text = tok.char; color = CONFIG.colorChar; alpha = (t - 0.5) * 2; }
        } else {
          text = tok.char; color = CONFIG.colorChar; alpha = 1;
        }

        ctx.shadowColor = color;
        ctx.shadowBlur  = ts.phase === "char" ? 9 : 4;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        if (ts.phase === "morphing") {
          const scaleY = ts.morphT < 0.5
            ? Math.max(0.05, 1 - ts.morphT * 2)
            : Math.max(0.05, (ts.morphT - 0.5) * 2);
          const tw = ctx.measureText(text).width;
          ctx.save();
          ctx.translate(x + tw / 2, TEXT_Y);
          ctx.scale(1, scaleY);
          ctx.fillStyle = color;
          ctx.fillText(text, -tw / 2, 0);
          ctx.restore();
        } else {
          ctx.fillStyle = color;
          ctx.fillText(text, x, TEXT_Y);
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 0;
        x += refW + CONFIG.tokenGap;
      }

      // blinking cursor
      if (typingTokenIdx <= tokens.length) {
        let cx = TEXT_X;
        for (let i = 0; i < typingTokenIdx; i++) {
          if (tokens[i].isSpace) { cx += spaceW; continue; }
          cx += refW + CONFIG.tokenGap;
        }
        if (frame % 18 < 10) {
          ctx.fillStyle   = CONFIG.colorCursor;
          ctx.globalAlpha = 1;
          ctx.fillRect(cx + CONFIG.cursorOffset, TEXT_Y - FONT_SIZE / 2, FONT_SIZE * 0.45, FONT_SIZE);
        }
      }
    }

    function drawLabel() {
      ctx.font         = `9px ${CONFIG.fontFamily}`;
      ctx.fillStyle    = CONFIG.colorLabel;
      ctx.textBaseline = "top";
      ctx.fillText(CONFIG.label, WAVE_X + 2, 5);
      ctx.fillText("H", WAVE_X + WAVE_W + 3, WAVE_TOP);
      ctx.fillText("L", WAVE_X + WAVE_W + 3, WAVE_BOT);
    }

    // ── Loops ─────────────────────────────────────────────────

    // Wave: own interval, never blocks rAF
    waveIntervalId = setInterval(advanceWave, CONFIG.waveInterval);

    // Render + typing: rAF
    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;
      ctx.clearRect(0, 0, cw, ch);
      drawGrid();
      drawLabel();
      advanceTyping();
      advanceMorphs();
      // morph any remaining hex when all typed
      if (typingTokenIdx >= tokens.length) {
        for (let i = 0; i < tokenState.length; i++) {
          if (tokenState[i].phase === "hex") triggerMorph(i);
        }
      }
      drawWave();
      drawTokens();
    }

    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(waveIntervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};

export default OscilloscopeLoader;
