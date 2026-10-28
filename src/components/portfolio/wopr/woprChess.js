// Chess rules come from chess.js; this file adds the computer opponent.
// WOPR plays black with a small alpha-beta search: quick, beatable, not dumb.
import { Chess } from "chess.js";

const VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

// Small bonus for pieces near the center, so it doesn't shuffle aimlessly
const centerBonus = (rank, file) => {
  const d = Math.abs(3.5 - rank) + Math.abs(3.5 - file);
  return Math.round((7 - d) * 3);
};

// Score from black's point of view (positive = good for WOPR)
const evaluate = (game) => {
  if (game.isCheckmate()) return game.turn() === "b" ? -100000 : 100000;
  if (game.isDraw()) return 0;
  let score = 0;
  game.board().forEach((row, r) =>
    row.forEach((sq, f) => {
      if (!sq) return;
      const v = VALUE[sq.type] + (sq.type === "p" || sq.type === "n" ? centerBonus(r, f) : 0);
      score += sq.color === "b" ? v : -v;
    })
  );
  return score;
};

// Captures first: makes alpha-beta prune much more
const ordered = (game) =>
  game.moves({ verbose: true }).sort((a, b) => (b.captured ? 1 : 0) - (a.captured ? 1 : 0));

const search = (game, depth, alpha, beta, maximizing) => {
  if (depth === 0 || game.isGameOver()) return evaluate(game);
  const moves = ordered(game);
  if (maximizing) {
    let best = -Infinity;
    for (const m of moves) {
      game.move(m);
      best = Math.max(best, search(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, best);
      if (alpha >= beta) break;
    }
    return best;
  }
  let best = Infinity;
  for (const m of moves) {
    game.move(m);
    best = Math.min(best, search(game, depth - 1, alpha, beta, true));
    game.undo();
    beta = Math.min(beta, best);
    if (alpha >= beta) break;
  }
  return best;
};

export const newGame = () => new Chess();

// Returns WOPR's chosen move (verbose move object) for black to play
export const bestMove = (game, depth = 2) => {
  let best = null;
  let bestScore = -Infinity;
  for (const m of ordered(game)) {
    game.move(m);
    const s = search(game, depth - 1, -Infinity, Infinity, false) + Math.random() * 8; // a little variety
    game.undo();
    if (s > bestScore) {
      bestScore = s;
      best = m;
    }
  }
  return best;
};

// Accepts "e4", "Nf3", "O-O", "e2e4", "e2-e4", "e7e8q". Returns the move or null.
export const tryUserMove = (game, text) => {
  const t = text.trim();
  const coord = t.toLowerCase().replace(/[\s-]/g, "").match(/^([a-h][1-8])([a-h][1-8])([qrbn])?$/);
  try {
    if (coord) return game.move({ from: coord[1], to: coord[2], promotion: coord[3] || "q" });
    return game.move(t);
  } catch {
    return null;
  }
};

// Short status line after a move, or null if the game goes on
export const statusOf = (game) => {
  if (game.isCheckmate()) return game.turn() === "w" ? "CHECKMATE. WOPR WINS." : "CHECKMATE. YOU WIN.";
  if (game.isStalemate()) return "STALEMATE.";
  if (game.isDraw()) return "DRAW.";
  if (game.inCheck()) return "CHECK.";
  return null;
};