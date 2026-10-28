import React, { useMemo } from "react";
import { WORLD_MASK, MASK_COLS, MASK_ROWS, LAT_TOP, LAT_BOT } from "./worldMask";

// Dot-matrix world map for the preview box. SVG is 72 x 45 units (16:10,
// same as the box), map rows sit between y=4.5 and y=40.5.
const W = MASK_COLS;
const H = 45;
const TOP = 4.5;

const project = (lat, lon) => ({
  x: ((lon + 180) / 360) * W,
  y: TOP + ((LAT_TOP - lat) / (LAT_TOP - LAT_BOT)) * MASK_ROWS,
});

const GtwMap = ({ targets, current }) => {
  // Land dots never change: build them once
  const dots = useMemo(() => {
    const out = [];
    WORLD_MASK.forEach((row, r) =>
      [...row].forEach((ch, c) => {
        if (ch === "#") out.push(<circle key={`${r}-${c}`} cx={c + 0.5} cy={TOP + r + 0.5} r={0.32} />);
      })
    );
    return out;
  }, []);

  return (
    <svg className="wopr-map" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <g className="wopr-map__land">{dots}</g>
      {targets.map((t, i) => {
        const { x, y } = project(t.lat, t.lon);
        const live = i === current;
        return (
          <g key={t.id} className={live ? "wopr-tgt is-live" : "wopr-tgt"}>
            {live && <circle className="wopr-tgt__ring" cx={x} cy={y} r={1.2} />}
            <circle className="wopr-tgt__core" cx={x} cy={y} r={0.55} />
            <text x={x + 1.1} y={y - 0.8} className="wopr-tgt__label">
              {t.id.replace("TGT-", "")}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default GtwMap;