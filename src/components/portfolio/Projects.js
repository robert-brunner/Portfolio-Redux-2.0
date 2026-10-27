// Single source of truth for the portfolio section.
// To add a project: add an entry here and drop a screenshot at public/portfolio/<id>.png
// Set `repo: null` for projects without a public repo (the repo button hides itself).

export const PRIVATE_COUNT = 12;

export const PROJECTS = [
  {
    id: "midi-motor-music-box",
    name: "MIDI Motor Music Box",
    stack: "web · ESP32",
    description:
      "Drop in any MIDI file and it maps to three stepper motors, with C++ output for the ESP32. Started as a MacGyver theme joke on a wire stripping machine, now a vaporwave web app with a Three.js ESP32 pinout.",
    tags: ["Three.js", "ESP32", "C++"],
    live: "https://midi-motor-music-box.vercel.app/",
    repo: "https://github.com/robert-brunner/StepperMelodyLab",
    image: "/portfolio/midi-motor-music-box.png",
  },
  {
    id: "gain-ladder-calculator",
    name: "Gain Ladder Calculator",
    stack: "web · firmware",
    description:
      "Tweak five resistor values and see how all 32 switch combinations land against the firmware's 65 gain targets, with the error for each. Built to catch a bad circuit design before anyone builds it.",
    tags: ["Browser tool", "Circuit math", "Firmware"],
    live: "https://gain-ladder-calculator.vercel.app/",
    repo: "https://github.com/robert-brunner/Gain-Ladder-Calculator",
    image: "/portfolio/gain-ladder-calculator.png",
  },
  {
    id: "sketch-a-font",
    name: "Sketch-A-Font",
    stack: "React · Vite",
    description:
      "Draw a letter and it ranks the closest Google Fonts by the actual shape of your stroke. Not perfect, but surprisingly close.",
    tags: ["React", "Vite", "Shape matching"],
    live: "https://sketchfont-inky.vercel.app/",
    repo: "https://github.com/robert-brunner/SketchAFont",
    image: "/portfolio/sketch-a-font.png",
  },
  {
    id: "brigand",
    name: "Brigand",
    stack: "web · Lottie",
    description:
      "A free browser app that turns After Effects exports into usable Lottie JSON, because rendering Lottie files the usual way gets expensive.",
    tags: ["After Effects", "Lottie"],
    live: "https://brigand.vercel.app/",
    repo: "https://github.com/robert-brunner/Brigand",
    image: "/portfolio/brigand.png",
  },
  {
    id: "jcs-plumbing",
    name: "JCS Plumbing",
    stack: "web · Python",
    description:
      "A site for a plumber whose business only lived on Facebook. A Python scraper pulled his text and images, and they became a phone-friendly web app.",
    tags: ["Web app", "Python", "Mobile"],
    live: "https://jcs-plumbing-nine.vercel.app/",
    repo: null,
    image: "/portfolio/jcs-plumbing.png",
  },
  {
    id: "play-haaland",
    name: "Play Haaland",
    stack: "web · game",
    description:
      "A browser sidescroller built in a week to learn game development, with AI-generated video doing the heavy lifting on the visuals. Desktop first, mobile still to do.",
    tags: ["Browser game", "AI video"],
    live: "https://playhaaland.com/",
    repo: null,
    image: "/portfolio/play-haaland.png",
  },
];