import { useRef, useEffect } from "react";

// ============================================================
// EDIT THESE — all tunable values in one place
// ============================================================
const CONFIG = {
  words: ["Creative,", "Driven,", "Passionate"],

  // Colors (hex)
  colorTrace: "#00e5ff",
  colorTraceShadow: "#00e5ff",
  colorScanDot: "#ffffff",
  colorHex: "#00e5ff", // hex token color
  colorChar: "#b76bf5", // morphed character color
  colorCursor: "#b76bf5",
  colorGrid: "rgba(0,229,255,0.04)",
  colorGridMid: "rgba(0,229,255,0.10)",
  colorLabel: "rgba(0,229,255,0.28)",
  colorBackground: "#060a0f",

  // Layout (fractions of canvas)
waveStartX:   0.25,   // was 0.02 — shifts wave right
waveWidth:    0.25,   // was 0.30 — slightly narrower so text has room
textStartX:   0.45,   // was 0.35 — shifts text toward center
textY:        0.50,   // leave this as is
  waveTop: 0.22,
  waveBot: 0.52,

  // Timing
  waveSpeed: 2, // samples per frame
  charDelay: 20, // frames between each new token appearing
  wordPause: 600, // ms between words
  morphSpeed: 0.07, // how fast hex flips to char (0..1 per frame)
  cursorOffset: 30,   // px gap between last char and cursor

  // Wave shape
  bitWidth: 4,
  leadBits: 6,
  tailBits: 8,

  // Font
  fontSize: 0.0165, // fraction of canvas height
  fontFamily: "monospace",
  tokenGap: 0, // px between tokens

  label: "CH1  Manchester  9600 baud",
};
// ============================================================

function charToHex(c) {
  return "0x" + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
}

function charToManchesterSamples(c, hi, lo) {
  const code = c.charCodeAt(0);
  const s = [];
  for (let i = 7; i >= 0; i--) {
    const b = (code >> i) & 1;
    if (b === 1) {
      s.push(lo);
      s.push(hi);
    } else {
      s.push(hi);
      s.push(lo);
    }
  }
  return s;
}

function wordToSamples(word, hi, lo) {
  const s = [];
  for (let i = 0; i < CONFIG.leadBits; i++) s.push(lo);
  for (const c of word)
    charToManchesterSamples(c, hi, lo).forEach((y) => s.push(y));
  for (let i = 0; i < CONFIG.tailBits; i++) s.push(lo);
  return s;
}

function waveUnlockedChars(sampHead) {
  return Math.floor(Math.max(0, sampHead - CONFIG.leadBits) / 16);
}

const OscilloscopeLoader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    function setupCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return { cw: rect.width, ch: rect.height };
    }

    let { cw, ch } = setupCanvas();

    // Derived layout
    let WAVE_X, WAVE_W, WAVE_TOP, WAVE_BOT, TEXT_X, TEXT_Y, FONT_SIZE, HALF;
    function recalc() {
      WAVE_X = cw * CONFIG.waveStartX;
      WAVE_W = cw * CONFIG.waveWidth;
      WAVE_TOP = ch * CONFIG.waveTop;
      WAVE_BOT = ch * CONFIG.waveBot;
      TEXT_X = cw * CONFIG.textStartX;
      TEXT_Y = ch * CONFIG.textY;
      FONT_SIZE = Math.floor(ch * CONFIG.fontSize);
      HALF = CONFIG.bitWidth / 2;
    }
    recalc();

    // Build token list from all words joined
    // token: { hex, char, isSpace }
    const allText = CONFIG.words.join(" ");
    const tokens = [];
    for (const c of allText) {
      tokens.push({
        hex: c === " " ? "   " : charToHex(c),
        char: c,
        isSpace: c === " ",
      });
    }

    // Per-token state: phase = 'hidden' | 'hex' | 'morphing' | 'char'
    const tokenState = tokens.map(() => ({ phase: "hidden", morphT: 0 }));

    // Wave state
    let currentWordIdx = 0;
    let currentSamples = wordToSamples(CONFIG.words[0], WAVE_TOP, WAVE_BOT);
    let sampHead = 0;
    let waveBuffer = [];

    // Typing state
    let typingTokenIdx = 0; // next token to reveal
    let wordIdx = 0; // which word we're on
    let wordCharIdx = 0; // char position within current word
    let charTimer = 0;
    let waitingForNext = false;

    // ── Draw helpers ──────────────────────────────────────────

    function drawGrid() {
      ctx.strokeStyle = CONFIG.colorGrid;
      ctx.lineWidth = 0.5;
      const cols = 6,
        rows = 5;
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
      ctx.beginPath();
      ctx.moveTo(WAVE_X, midY);
      ctx.lineTo(WAVE_X + WAVE_W, midY);
      ctx.stroke();
    }

    function drawWave() {
      if (waveBuffer.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = CONFIG.colorTrace;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = CONFIG.colorTraceShadow;
      ctx.shadowBlur = 5;
      ctx.lineJoin = "miter";
      ctx.lineCap = "square";
      let prevY = null;
      for (let i = 0; i < waveBuffer.length; i++) {
        const { sx, y } = waveBuffer[i];
        if (i === 0) {
          ctx.moveTo(sx, y);
          prevY = y;
          continue;
        }
        if (y !== prevY) {
          ctx.lineTo(sx, prevY);
          ctx.lineTo(sx, y);
        }
        ctx.lineTo(sx + HALF, y);
        prevY = y;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      const last = waveBuffer[waveBuffer.length - 1];
      ctx.beginPath();
      ctx.arc(last.sx, last.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.colorScanDot;
      ctx.shadowColor = CONFIG.colorScanDot;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawTokens() {
      ctx.font = `${FONT_SIZE}px ${CONFIG.fontFamily}`;
      ctx.textBaseline = "middle";

      // measure a reference hex token width for layout
      const refW = ctx.measureText("W").width * 1.1;
      const spaceW = refW * 0.6;
      let x = TEXT_X;

      for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        const ts = tokenState[i];

        if (ts.phase === "hidden") {
          x += tok.isSpace ? spaceW : refW + CONFIG.tokenGap;
          continue;
        }

        if (tok.isSpace) {
          x += spaceW;
          continue;
        }

        let text, color, alpha;

        if (ts.phase === "hex") {
          text = tok.hex;
          color = CONFIG.colorHex;
          alpha = 0.8;
        } else if (ts.phase === "morphing") {
          const t = ts.morphT;
          if (t < 0.5) {
            text = tok.hex;
            color = CONFIG.colorHex;
            alpha = 1 - t * 1.6;
          } else {
            text = tok.char;
            color = CONFIG.colorChar;
            alpha = (t - 0.5) * 2;
          }
        } else {
          // char
          text = tok.char;
          color = CONFIG.colorChar;
          alpha = 1;
        }

        ctx.shadowColor = color;
        ctx.shadowBlur = ts.phase === "char" ? 9 : 4;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        if (ts.phase === "morphing") {
          // flip on Y axis: squash then unsquash
          const scaleY =
            ts.morphT < 0.5
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
        ctx.shadowBlur = 0;
        x += refW + CONFIG.tokenGap;
      }

      // blinking cursor after last visible token
      if (typingTokenIdx < tokens.length) {
        let cx = TEXT_X;
        for (let i = 0; i < typingTokenIdx; i++) {
          if (tokens[i].isSpace) {
            cx += spaceW;
            continue;
          }
          cx += refW + CONFIG.tokenGap;
        }
        if (frame % 18 < 10) {
          ctx.fillStyle = CONFIG.colorCursor;
          ctx.globalAlpha = 1;
          ctx.fillRect(
            cx + CONFIG.cursorOffset,
            TEXT_Y - FONT_SIZE / 2,
            FONT_SIZE * 0.45,
            FONT_SIZE,
          );
        }
      }
    }

    function drawLabel() {
      ctx.font = `9px ${CONFIG.fontFamily}`;
      ctx.fillStyle = CONFIG.colorLabel;
      ctx.textBaseline = "top";
      ctx.fillText(CONFIG.label, WAVE_X + 2, 5);
      ctx.fillText("H", WAVE_X + WAVE_W + 3, WAVE_TOP);
      ctx.fillText("L", WAVE_X + WAVE_W + 3, WAVE_BOT);
    }

    // ── Morph update ──────────────────────────────────────────

    function advanceMorphs() {
      for (let i = 0; i < tokenState.length; i++) {
        if (tokenState[i].phase === "morphing") {
          tokenState[i].morphT = Math.min(
            1,
            tokenState[i].morphT + CONFIG.morphSpeed,
          );
          if (tokenState[i].morphT >= 1) tokenState[i].phase = "char";
        }
      }
    }

    function triggerMorph(i) {
      if (tokenState[i].phase === "hex") {
        tokenState[i].phase = "morphing";
        tokenState[i].morphT = 0;
      }
    }

    // ── Main loop ─────────────────────────────────────────────

    function loop() {
      animId = requestAnimationFrame(loop);
      frame++;
      ctx.clearRect(0, 0, cw, ch);
      drawGrid();
      drawLabel();

      // Switch wave when word advances
      if (currentWordIdx !== wordIdx && wordIdx < CONFIG.words.length) {
        currentWordIdx = wordIdx;
        currentSamples = wordToSamples(
          CONFIG.words[wordIdx],
          WAVE_TOP,
          WAVE_BOT,
        );
        sampHead = 0;
        waveBuffer = [];
      }

      // Advance wave
      if (wordIdx < CONFIG.words.length && sampHead < currentSamples.length) {
        for (let s = 0; s < CONFIG.waveSpeed; s++) {
          if (sampHead >= currentSamples.length) break;
          const y = currentSamples[sampHead];
          const sx = WAVE_X + waveBuffer.length * HALF;
          waveBuffer.push({ sx, y });
          const maxBuf = Math.floor(WAVE_W / HALF);
          if (waveBuffer.length > maxBuf) {
            waveBuffer.shift();
            waveBuffer.forEach((p) => {
              p.sx -= HALF;
            });
            if (waveBuffer.length > 0) {
              const drift = waveBuffer[0].sx - WAVE_X;
              if (drift > 0)
                waveBuffer.forEach((p) => {
                  p.sx -= drift;
                });
            }
          }
          sampHead++;
        }
      }

      // Typewriter — reveal tokens in sync with wave
      const unlocked = waveUnlockedChars(sampHead);

      if (!waitingForNext && typingTokenIdx < tokens.length) {
        const tok = tokens[typingTokenIdx];

        if (tok.isSpace) {
          // spaces reveal instantly
          tokenState[typingTokenIdx].phase = "char";
          typingTokenIdx++;
        } else {
          charTimer++;
          if (charTimer >= CONFIG.charDelay && wordCharIdx < unlocked) {
            // reveal new token as hex
            tokenState[typingTokenIdx].phase = "hex";

            // morph the token before this one (left to right ripple)
            if (typingTokenIdx > 0) {
              const prev = typingTokenIdx - 1;
              if (!tokens[prev].isSpace) triggerMorph(prev);
            }

            typingTokenIdx++;
            wordCharIdx++;
            charTimer = 0;

            // end of current word?
            if (wordCharIdx >= CONFIG.words[wordIdx].length) {
              // morph last token of this word
              triggerMorph(typingTokenIdx - 1);
              waitingForNext = true;
              setTimeout(() => {
                wordCharIdx = 0;
                wordIdx++;
                waitingForNext = false;
              }, CONFIG.wordPause);
            }
          }
        }
      }

      // When all tokens revealed, morph any remaining hex
      if (typingTokenIdx >= tokens.length) {
        for (let i = 0; i < tokenState.length; i++) {
          if (tokenState[i].phase === "hex") triggerMorph(i);
        }
      }

      advanceMorphs();
      drawWave();
      drawTokens();
    }

    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
};

export default OscilloscopeLoader;
