// Single source of truth for the portfolio section.
//
// Each project shows ONE preview, picked in this order:
//   live  → the real site, live in a scaled iframe
//   video → a Loom share link, embedded as a player
//   tree  → `tree -L 1` of the repo, pulled live from GitHub
//   image → a still image
// Set `repo: null` for projects without a public repo (the repo button hides itself).
// Set `live: null` for projects without a live page (the live button hides itself).
// Tags follow the repo's GitHub "Languages" section unless written otherwise.

// ── Repo counts ──
export const TOTAL_REPOS = 69;
export const PUBLIC_REPOS = 32; // GitHub profile shows 32 public
export const PRIVATE_COUNT = TOTAL_REPOS - PUBLIC_REPOS; // 37

export const PROJECTS = [
  {
    id: "midi-motor-music-box",
    name: "MIDI Motor Music Box",
    stack: "web · app",
    description:
      "Drop in any MIDI file and it maps to three stepper motors, with C++ output for the ESP32. Started as a MacGyver theme joke on a wire stripping machine, now a vaporwave web app with a Three.js ESP32 pinout.",
    tags: ["React.js", "Three.js", "ESP32", "C++", "Vite"],
    live: "https://midi-motor-music-box.vercel.app/",
    repo: "https://github.com/robert-brunner/StepperMelodyLab",
  },
  {
    id: "gain-ladder-calculator",
    name: "Gain Ladder Calculator",
    stack: "web · firmware",
    description:
      "Tweak five resistor values and see how all 32 switch combinations land against the firmware's 65 gain targets, with the error for each. Built to catch a bad circuit design before anyone builds it.",
    tags: ["HTML", "JS", "CSS"],
    live: "https://gain-ladder-calculator.vercel.app/",
    repo: "https://github.com/robert-brunner/Gain-Ladder-Calculator",
  },
  {
    id: "sketch-a-font",
    name: "Sketch-A-Font",
    stack: "web · app",
    description:
      "Draw a letter and it ranks the closest Google Fonts by the actual shape of your stroke. Not perfect, but surprisingly close.",
    tags: ["React.js", "Vite"],
    live: "https://sketchfont-inky.vercel.app/",
    repo: "https://github.com/robert-brunner/SketchAFont",
  },
  {
    id: "brigand",
    name: "Brigand",
    stack: "web · app",
    description:
      "A free browser app that turns After Effects exports into usable Lottie JSON, because rendering Lottie files the usual way gets expensive.",
    tags: ["React.js", "App"],
    live: "https://brigand.vercel.app/",
    repo: "https://github.com/robert-brunner/Brigand",
  },
  {
    id: "browser-svg-editor",
    name: "Browser SVG Editor",
    stack: "web · tool",
    description:
      "An SVG and mask editor that runs in the browser. Built because Adobe Creative Cloud wasn't available to me at the time and nothing free did half of what I needed.",
    tags: ["JavaScript", "CSS", "HTML"],
    live: "https://browser-svg-editor.vercel.app/",
    repo: "https://github.com/robert-brunner/Browser-SVG-Editor",
  },
  {
    id: "basilisk",
    name: "Basilisk",
    stack: "web · tool",
    description:
      "A live neumorphism and box-shadow generator. Stack and tweak shadow layers with sliders, switch between flat, convex, concave and pressed presets, or paste existing CSS back in to keep editing it.",
    tags: ["JavaScript", "CSS", "HTML"],
    live: "https://basilisk-rho.vercel.app/",
    repo: "https://github.com/robert-brunner/Basilisk",
  },
  {
    id: "play-haaland",
    name: "Play Haaland",
    stack: "web · game",
    description:
      "Based on the Haaland Meme. A browser sidescroller built in a week to learn game development, with AI-generated video doing the heavy lifting on the visuals.  A/D (Left/Right) W(Jump) Shift(Sprint) M(Music)",
    tags: ["React.js", "Browser Game"],
    live: "https://playhaaland.com/",
    repo: null,
  },
  {
    id: "jcs-plumbing",
    name: "JCS Plumbing",
    stack: "web · app",
    description:
      "A site for a plumber whose business only lived on Facebook. A Python scraper pulled his text and images, and they became a phone-friendly web app.",
    tags: ["React.js", "Python", "Responsive", "Vite"],
    live: "https://jcs-plumbing-nine.vercel.app/",
    repo: null,
  },
  {
    id: "bear-lake-propane",
    name: "Bear Lake Propane",
    stack: "web · client",
    description:
      "A site for a family-owned propane company in the Bear Lake Valley: bulk delivery, tank sales, leasing and monitoring, with the phone number one tap away.",
    tags: ["Client site", "Responsive"], // TODO: swap for the real stack
    live: "https://bearlakepropane.vercel.app/",
    repo: null,
  },
  {
    id: "bearwood-firewood",
    name: "Bear Wood Firewood",
    stack: "web · client",
    description:
      "A site for a family-owned firewood seller in the Poconos. Seasoned hardwood, delivery or pickup, and veterans always taken care of.",
    tags: ["Client site", "Responsive"], // TODO: swap for the real stack
    live: "https://www.bearwoodfirewood.com/",
    repo: null,
  },
  {
    id: "kcs-creations",
    name: "KC's Creations",
    stack: "web · client",
    description: "TODO: one or two sentences on what KC's Creations is.",
    tags: ["Client site"], // TODO: swap for the real stack
    live: "https://kcs-creations.vercel.app/",
    repo: null,
  },
  {
    id: "roys-rant",
    name: "Roy's Rant",
    stack: "web · client",
    description: "A site built for a client. TODO: one sentence on what it is.",
    tags: ["Client site"], // TODO: swap for the real stack
    live: "https://roysrant.com/",
    repo: null,
  },
  {
    id: "nemos-workshop",
    name: "Nemo's Workshop",
    stack: "chrome · ext",
    description:
      "A CSS editor for the browser, packaged as an unpacked Chrome extension. The tool I was using wanted a subscription to keep going, so I removed the paywall and rebranded it for personal use. Works offline, no account.",
    tags: ["JavaScript"],
    live: null,
    repo: "https://github.com/robert-brunner/Nemos_Workshop-Css-Editor",
    image:
      "https://raw.githubusercontent.com/robert-brunner/Nemos_Workshop-Css-Editor/main/nemos-workshop/icons/icon_128.png",
  },
  {
    id: "ez-transfer",
    name: "EzTransferApp",
    stack: "node · tool",
    description:
      "A quick way to move files from a phone to a PC over local Wi-Fi. The PC runs a tiny server, the phone opens a URL, picks files, and they land in a set folder. No cloud, no accounts, no install.",
    tags: ["JavaScript", "HTML", "Batchfile"],
    live: null,
    repo: "https://github.com/robert-brunner/EzTransferApp",
    tree: true,
  },
  {
    id: "rb-airship",
    name: "RB Airship",
    stack: "web · profile",
    description:
      "My first ever profile site. A CSS-heavy page inspired by balloonists and the sky, built to show off my interest in CSS, After Effects and Premiere while making something personal.",
    tags: ["JavaScript", "CSS", "HTML"],
    live: "https://robert-brunner.github.io/RB-Airship/",
    repo: "https://github.com/robert-brunner/RB-Airship",
  },
  {
    id: "cute-n-furry",
    name: "Cute-N-Furry",
    stack: "capstone · 2",
    description:
      "My second bootcamp capstone: Tinder for dogs, with every stereotype that implies. Profiles, photo uploads, swipe to like or pass, and a match only when both dogs like each other. Built in two week-long sprints.",
    tags: ["C#", "React.js", "SQL", "Cloudinary"],
    live: null,
    video: "https://www.loom.com/share/6dd46234ec9e41f89be515aca8fd4194",
    repo: "https://github.com/robert-brunner/FFBNs",
  },
  {
    id: "whetherfleura",
    name: "Whetherfleura",
    stack: "capstone · 1",
    description:
      "My first capstone, concept to completion in two week-long sprints. A cryptid-hunting app where users sign up and log, edit and delete creature sightings, backed by a mock REST API.",
    tags: ["JavaScript", "HTML", "CSS"],
    live: null,
    video: "https://www.loom.com/share/aa4f7f6d6ce845e39d1dca4d8700a8a2",
    repo: "https://github.com/robert-brunner/MidEasternWhetherfleura",
  },
];

// ── private/ hints ──
// Shown in order at the top of the private folder. `stack` replaces the
// redacted stack column; `hint` shows under "permission denied" when clicked.
// The remaining private rows stay fully redacted.
export const PRIVATE_HINTS = [
  {
    stack: "Ionic · ESP32 · PIC",
    hint: "Safety-critical brake controller. Phone → BLE → ESP32 → UART → PIC assembly. ~X months in and still shipping.", // TODO: X
  },
  {
    stack: "React · C# · SQL",
    hint: "Geo-aware appointment scheduling for small service businesses. Multi-tenant, embeddable widget.",
  },
  {
    stack: "Arduino · NEMA 17",
    hint: "Automated wire cutter/stripper. Steppers feed, a solenoid cuts. It also turned out to play music.",
  },
  {
    stack: "ESP32 · Wi-Fi CSI",
    hint: "Presence detection from how a body disturbs Wi-Fi signals. No cameras.",
  },
  {
    stack: "Si4703 · RF",
    hint: "A custom FM receiver module built to hunt down a 12-year-old RF noise defect. Found it.",
  },
  {
    stack: "Fusion 360 · Mach3",
    hint: "CNC toolpaths for cutting connector holes into production enclosures.",
  },
  {
    stack: "Canvas 2D",
    hint: "A wave-survival browser game with chain lightning and a raccoon intro.",
  },
  {
    stack: "React · Canvas",
    hint: "An animated PCB-trace signature badge, embeddable on any site.",
  },
  {
    stack: "GSAP · ScrollTrigger",
    hint: "A parallax site where scrolling is a deep-sea descent.",
  },
];