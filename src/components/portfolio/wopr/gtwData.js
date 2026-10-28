// Global Thermonuclear War demo data (a WarGames homage, all fictional).
// Side 1 = UNITED STATES (targets abroad), side 2 = SOVIET UNION (targets in the US).
export const GTW_TARGETS = {
  1: [
    { city: "MOSCOW", lat: 55.75, lon: 37.62 },
    { city: "LENINGRAD", lat: 59.93, lon: 30.31 },
    { city: "KIEV", lat: 50.45, lon: 30.52 },
    { city: "MURMANSK", lat: 68.97, lon: 33.08 },
    { city: "NOVOSIBIRSK", lat: 55.03, lon: 82.92 },
    { city: "VLADIVOSTOK", lat: 43.12, lon: 131.88 },
  ],
  2: [
    { city: "LAS VEGAS", lat: 36.17, lon: -115.14 },
    { city: "SEATTLE", lat: 47.61, lon: -122.33 },
    { city: "CHEYENNE MOUNTAIN", lat: 38.74, lon: -104.85 },
    { city: "CHICAGO", lat: 41.88, lon: -87.63 },
    { city: "WASHINGTON D.C.", lat: 38.9, lon: -77.04 },
    { city: "NEW YORK", lat: 40.71, lon: -74.01 },
  ],
};

export const SIDES = { 1: "UNITED STATES", 2: "SOVIET UNION" };

// Make each target a display record with a designator and a fake briefing
export const buildTargets = (side) =>
  GTW_TARGETS[side].map((t, i) => ({
    ...t,
    id: `TGT-${String(i + 1).padStart(2, "0")}`,
    coords: `${Math.abs(t.lat).toFixed(2)}${t.lat >= 0 ? "N" : "S"} ${Math.abs(t.lon).toFixed(
      2
    )}${t.lon >= 0 ? "E" : "W"}`,
    priority: i < 2 ? "ALPHA" : i < 4 ? "BRAVO" : "CHARLIE",
    eta: `${12 + i * 3} MIN`,
  }));