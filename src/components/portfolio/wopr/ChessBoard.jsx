import React from "react";

// Solid glyphs for both sides, colored by CSS, read better at this size
const GLYPH = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const FILES = "abcdefgh";

// Board for the WOPR easter egg. Fills the preview box height.
// `game` is a chess.js instance; `version` just forces a re-render after moves.
const ChessBoard = ({ game, selected, targets, lastMove, onSquare }) => {
  const board = game.board(); // rank 8 first

  return (
    <div className="wopr-board" role="grid" aria-label="Chess board">
      {board.map((row, r) =>
        row.map((sq, f) => {
          const name = `${FILES[f]}${8 - r}`;
          const dark = (r + f) % 2 === 1;
          const cls = [
            "wopr-sq",
            dark ? "is-dark" : "is-light",
            selected === name ? "is-sel" : "",
            lastMove && (lastMove.from === name || lastMove.to === name) ? "is-last" : "",
          ].join(" ");
          return (
            <button
              type="button"
              key={name}
              className={cls}
              onClick={() => onSquare(name)}
              aria-label={name}
            >
              {sq && (
                <span className={`wopr-pc ${sq.color === "w" ? "is-w" : "is-b"}`}>
                  {GLYPH[sq.type]}
                </span>
              )}
              {targets.includes(name) && <span className="wopr-dot" />}
            </button>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;