import { client1, client2, client3, client4, client5, client6, client7, client21, client22, client23, linkedInLogo, upworkLogo } from "../assets";
import NewForce from '../assets/company/NewForce.jpeg';
import NorthStar from '../assets/company/NorthStar.png';
import Nussbaum from '../assets/company/Nussbaum.png';
import VFD from '../assets/company/VFD.jpg';
import LEDLLC from '../assets/company/LEDLLC.png';
import NajrulSumon from '../assets/clients/NajrulSumon.jpeg';
import AW from '../assets/company/AW_Alpha.png';
import Arduino from '../assets/tech_logos/Arduino.png';
import CSharp from '../assets/tech_logos/cSharp.webp';
import ThreeJS from '../assets/tech_logos/threeJS.png';
import cssLogo from '../assets/tech_logos/css.png';
import jsLOGO from '../assets/tech_logos/JS.png';
import fus360 from '../assets/tech_logos/fusion360.png';
import VSCODE from '../assets/tech_logos/vsCodeLogo.png';
import premPro from '../assets/tech_logos/premierPro.png';
import CPlusPlus from '../assets/tech_logos/cPlusPlus.png';
import ASM from '../assets/tech_logos/microChip.png';




const experiences = [
{
    title: "Software Developer & Embedded Systems",
    company_name: "Applied Wireless",
    icon: AW, // Make sure this path/variable is correct
    iconBg: "#E6DEDD",
    date: "August 2024 - Present",
    role_description: "Built a real-time Android application for embedded hardware control while working on RF and audio product lines at the embedded level. Built the communication protocol via ble, checksums and 10 byte packets, created and designed the user interface, and solved hardware issues.",
    points: [
        "--- EMBEDDED CONTROL APPLICATION & UI/UX ---",
        "Architected and solo-developed a real-time Android (Ionic React + Capacitor) application for embedded brake and vehicle control.",
        "Designed and built the complete UI/UX from scratch in Figma, including dark mode, custom animated Lottie splash screen (created in After Effects), dynamic text formatting/highlighting system, help menu, and a real-time linear gradient brake force visualization driven by stage voltage and vehicle profile.",
        "Designed the entire 10-byte custom bidirectional packet structure and communication API from scratch to interface with the hardware engineer’s PIC16 ASM implementation.",
        "Developed the full phone and ESP32 side of the stack (JavaScript → BLE → ESP32 C++ → UART), including checksum validation, handshake protocol, and exponential backoff with guaranteed eventual delivery.",
        "Achieved 1.67-second average round-trip latency.",
        "Implemented selective optimistic UI, GPS + accelerometer-based vehicle profile auto-locking (>5 mph threshold requiring full stop to change), longPressHandler for continuous value adjustment, automatic profile recall on reconnect, PIN protection system, and safety-critical guaranteed brake command logic (queued and sent 2× with explicit latch).",
        "Self-taught C++, ESP32 development, binary/hexadecimal protocol design, and low-level BLE integration.",
        
        "--- PAR900M / PAT900 AUDIO PRODUCT LINE---",
        "Investigated and resolved a 12-year-old audio whine/grounding issue on the PAR900M legacy RF product line.",
        "Identified missing decoupling capacitors and improper grounding near the oscillator/RF section through systematic board probing and testing using a spectrum analyzer and oscilloscope.",
        "Implemented fixes that enabled continued sale of existing inventory instead of total loss.",
        "Extensively worked with Si4703 FM receiver developer modules, as well as the TEA5757— built and tested custom FM modules, diagnosed persistent whine issues, and traced problems back to the main board design.",
        "Manage the physical assembly, flashing, and bench testing for all ongoing iterations of the PAR900M and PAT900 hardware lines.",
        
        "--- EAGLE EYE PRODUCT LINE ---",
        "Build all sequential iterations of the Eagle Eye Transmitter/Receiver product line after initial rollout.",
        "Independently handle firmware flashing and modification (hex frequency band adjustments to prevent crosstalk), full assembly, CNC machining of cases, functional testing, and quality control.",
        "Delivered 200+ units with only one RMA (software-related bug).",
        
        "--- TESTING PROCEDURES ---",
        "Designed and implemented improved RF testing procedures, replacing ineffective Mylar bag testing with a modified Faraday cage + LED pass/fail indicators.",
        "The modified setup dramatically increased testing reliability and ensured consistent performance validation across all units.",

        "--- MANUALS ---",
        "Created product manuals and custom visual artwork to improve customer understanding of product connections and setup",

        "--- FUSION 360 ---",
        "Self-taught Fusion 360 and produced accurate .STEP file models of multiple products for direct customer delivery"
    ],
},
  {
    title: "Full Stack Developer",
    company_name: "NewForce",
    icon: NewForce, // Make sure this path is correct
    iconBg: "#E6DEDD",
    date: "June 2022 - January 2023",
    role_description: "Intensive full-time 6-month software development immersive training program focusing on full stack (C#/.NET) development fundamentals and problem solving. The final half of the program executed in a simulated company environment with SCRUM methodology.",
    points: [
      "Applied JavaScript, HTML, and CSS fundamentals to build a feature-rich social media dashboard",
      
      "Created RESTful Web API with C#/ .NET Core and connected it to a React front-end",

      "Developed a blog management platform in ASP.NET, MVC, and Razor templates in Visual Studio 2022",

      "Built and interacted with databases using SQL and ADO.NET",

      "Designed applications through white boarding dependencies and building ERD’s",

      "Designed and built a web app with React using hooks capable of manipulating data using the C.R.U.D. methods. In addition, I incorporated aspects of CSS and SaSS to make it more visually appealing",

      "Collaborated remotely on projects using Slack and Zoom ",

      "Applied object-oriented programming fundamentals through team-based projects that reflect real world business problems",    

      "Managed source code version control with Git / GitHub",      

    ],
  },
  {
    title: "Alarm Technician / Solar Site Surveyor",
    company_name: "Northstar Alarm Services, LLC",
    icon: NorthStar,
    iconBg: "#E6DEDD",
    date: "May 2014 - June 2024)",
    points: [
      "Trained and managed technicians in new techniques and assisted in installations ",
      "Assisted customers concerning initial installs and service calls ",
      "Trained customers to use alarm panel and associated apps",
      "Strong at solving issues on over the phone for both customers and other technicians ",
      "Programmed Home appliances to the specifications of of customers ",
      "Ran and diagnosed phone lines for panels",
      "Installed and programmed smart thermostats, door locks, garage openers, indoor cameras, outdoor cameras, and doorbell cameras ",
      "Fished wire thru walls, and traced wires ",
      "5+ years experience with alarm.com and MobileTech",
      "Conducted a personal inventory count weekly",
      "Photographed Main Service Panels and other electrical boxes inside and out",
      "Took aerial photos of houses and businesses for solar sight surveys using drones",
      "Photographed and measured roof pitch and rafter spacing inside attics",
      "Strong ability to work as an individual or as a team and manage time.",
      "Ability to build and design timed or triggered events for the convenience of customers",

    ],
  },
  {
    title: "Autobody Prepper",
    company_name: "Nussbaum Autobody and Glass, LLC",
    icon: Nussbaum,
    iconBg: "#E6DEDD",
    date: "2011-2014",
    points: [
      "Performed comprehensive automotive repairs, focusing on surface preparation with grinders and hand techniques and the installation of replacement parts ",
      "Skilled in light collision repair, adept at addressing damage using filler application, painting, and priming ",
      "Experienced in replacing and repairing damaged body parts, with proficiency in preparing parts for paint through sanding and masking, and a strong understanding of fiberglassing and resin techniques ",
    ],
  },
  {
    title: "Volunteer Firefighter",
    company_name: "Montpelier City Fire & Rescue / Bear Lake County Fire",
    icon: VFD,
    iconBg: "#E6DEDD",
    date: "2011 - 2014",
    points: [
      "Proficient in firefighting practices, gear, and equipment, with a strong grasp of evacuation procedures and fire protection systems ",
      "Exceptional in handling stressful situations, demonstrating effective teamwork and communication skills",
    ],
  },
  {
    title: "Digtial Editor",
    company_name: "Leading Edge Duplication",
    icon: LEDLLC,
    iconBg: "#E6DEDD",
    date: "2008 - 2009",
    points: [
      "Proficient in daily use of Final Cut Pro, Adobe After Effects, and Premiere Pro for video editing",
      "Edited and manipulated video and audio files, performed tasks such as cutting, cropping, and keying video and graphics",
      "Experienced in exporting videos to various formats, including BetaMax, DVCPro-HD, VHS, and DVDs. Managed shipping to broadcasting stations and companies",
      "Worked on infomercials such as Procera AVH, Omega XL, BlueBlockers and many others.",
    ],
  },
];

const skills = [
  {
    id: 210,
    title: "Low Level",
    skills: [
      {
        id: 211,
        name: "C++",
        image:
          CPlusPlus,
      },
      {
        id: 212,
        name: "Assembly",
        image:
          ASM,
      },

    ],
  },
  {
    id: 999,
    title: "Frontend",
    skills: [
      {
        id: 2,
        name: "React Js",
        image:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
      },

      {
        id: 3,
        name: "Three.js",
        image:
          ThreeJS,
      },
      
      // {
      //   id: 4,
      //   name: "Redux",
      //   image:
      //     "https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg",
      // },

      {
        id: 5,
        name: "HTML",
        image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png",
      },
      {
        id: 6,
        name: "CSS",
        image:
          cssLogo,
      },
      
      {
        id: 7,
        name: "JavaScript",
        image:
          jsLOGO,
      },

      // {
      //   id: 8,
      //   name: "TypeScript",
      //   image:
      //     "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
      // },

      {
        id: 9,
        name: "Bootstrap",
        image:
          "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
      },
      {
        id: 11,
        name: "TailwindCSS",
        image:
          "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      },
    ],
  },
  {
    id: 998,
    title: "Backend",
    skills: [
      {
        id: 101,
        name: "C#",
        image:
          CSharp,
      },
      {
        id: 102,
        name: "SQL Server",
        image: "https://user-images.githubusercontent.com/4249331/52232852-e2c4f780-28bd-11e9-835d-1e3cf3e43888.png",
      },
      // {
      //   id: 102,
      //   name: "Express Js",
      //   image:
      //     "https://i.ibb.co/3dssqRk/express-js.png",
      // },

      {
        id: 103,
        name: "Cloudinary",
        image:
          "https://s3.amazonaws.com/awsmp-logos/cloudinary.png",
      },
      {
        id: 104,
        name: "Firebase",
        image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
    ],
  },
  {
    id: 997,
    title: "Others",
skills: [
  {
    id: 210,
    name: "Adobe After Effects",
    image:
      "https://1000logos.net/wp-content/uploads/2020/07/After-Effects-Logo.png",
  },
  {
    id: 211,
    name: "Adobe Premier Pro",
    image:
      premPro,
  },
  {
    id: 205,
    name: "Arduino",
    image:
      Arduino,
  },
  {
    id: 216,
    name: "Blender",
    image:
      "https://www.wittystore.com/image/cache/data/brands_logos/blender-free-3d-creation-suite-wittystore-650x650.png",
  },
  {
    id: 215,
    name: "Canva",
    image:
      "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
  },
  {
    id: 204,
    name: "ExpoGo",
    image:
      "https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s",
  },
  {
    id: 212,
    name: "Final Cut Pro",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/2015_Final_Cut_Pro_Logo.png",
  },
  {
    id: 213,
    name: "Figma",
    image:
      "https://i.pinimg.com/originals/63/a7/b1/63a7b1894b3210d07e434e9d12170586.png",
  },
  {
    id: 209,
    name: "Flutter",
    image:
      "https://cdn-images-1.medium.com/max/1200/1*5-aoK8IBmXve5whBQM90GA.png",
  },
  {
    id: 218,
    name: "Fusion360",
    image:
      fus360,
  },
  {
    id: 201,
    name: "Git",
    image:
      "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
  },
  {
    id: 202,
    name: "GitHub",
    image:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
  {
    id: 214,
    name: "Miro",
    image:
      "https://store-images.s-microsoft.com/image/apps.47763.13959754522315136.87be3224-9693-4fd4-8cd4-af6362fb8d37.b3c24453-164b-4d03-b561-e77aec7c076a",
  },
  {
    id: 217,
    name: "OBS",
    image:
      "https://www.logo.wine/a/logo/Open_Broadcaster_Software/Open_Broadcaster_Software-Logo.wine.svg",
  },
  {
    id: 203,
    name: "Vercel",
    image:
      "https://i.ibb.co/VjL9zJH/Vercel.png",
  },
  {
    id: 206,
    name: "VS Code",
    image:
      VSCODE,
  },
  {
    id: 207,
    name: "Visual Studio",
    image:
      "https://1000logos.net/wp-content/uploads/2023/04/Visual-Studio-logo.png",
  },
  {
    id: 208,
    name: "WordPress",
    image:
      "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg",
  },
],
  },
];

const portfolio = [
  {
    id: 1,
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXRpNGJxZTB6dGlzM2NzeWM5cmpmYjlzZnMxZ3JkazFzYjVtODh6cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Nf98hUGPri0AZ5EgKh/giphy.gif",
    title: "Cute-N-Furry",
    github: "https://github.com/robert-brunner/FFBNs",
    demo: "https://www.loom.com/share/6dd46234ec9e41f89be515aca8fd4194?sid=200e036b-c995-4980-8f6a-4014ec306aa4",
    tag: "REACT C# .NET SQL Cloudinary",
  },
  
  {
    id: 2,
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXU0a3VnbXdxbjRjZnhkZWttNmtkNzFpOGNqeXh3NXhjc2lieHphNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H3BatSwdp5tIXfDaCW/giphy-downsized-large.gif",
    title: "MidEastern WhetherFleura",
    github: "https://github.com/robert-brunner/MidEasternWhetherfleura",
    demo: "https://www.loom.com/share/aa4f7f6d6ce845e39d1dca4d8700a8a2?sid=0a78c6e3-af7e-4457-80c0-0a535ff2bf48",
    tag: "REACT json-server RESTful Api",
  },

  {
    id: 3,
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXZjbXQ2YnNiZWhucTJ4em44dWxranFweXYxczMwMm9pY3R6dTd2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TgjHgD3ljLQFrlaKcN/giphy-downsized-large.gif",
    title: "Airship Old Profile Page",
    github: "https://github.com/robert-brunner/RB-Airship?tab=readme-ov-file",
    demo: "https://robert-brunner.github.io/RB-Airship/",
    tag: "Vanilla: JavaScript HTML CSS",
  },
  
  {
    id: 4,
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzkydzh5MWVvYWVtNmhtdjY3ZDFhOHY3b2t5eDlheTVkeGtqamh4ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IoR2RzYnmzr48znOFK/giphy.gif",
    title: "Nat-My-Problem",
    github: "https://github.com/robert-brunner/NatMYProblem",
    demo: "https://www.loom.com/share/0d6331d96e274a0a92a1308dd166b357?t=1&sid=481f6130-a41e-405e-9dc0-286b20a6d88c",
    tag: "REACT Tailwind Axios OpenAi_api",
  },

  {
    id: 5,
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdrdGV2Y3NobmFtejI1d2Fob25ib3FmazRiYjBmZzM5djd4MHBhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PmFZWKn5AySg9vLuCn/giphy.gif",
    title: "Virtual Piano",
    // github: "https://github.com/",
    demo: "https://www.loom.com/share/e3a442e852b74415bd88897fcf99c32f?sid=0573307b-8b0c-495f-b247-6f392d9879ea",
    tag: "REACT",
  },
  
  // {
  //   id: 6,
  //   gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
  //   title: "[Project]",
  //   github: "https://github.com/",
  //   demo: "https://www.google.co/",
  //   tag: "#Tech #Tech #Tech",
  // },
  
  // {
  //   id: 7,
  //   gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
  //   title: "[Project]",
  //   github: "https://github.com/",
  //   demo: "https://www.google.co/",
  //   tag: "#Tech #Tech #Tech",
  // },
  

];

const testimonial = [
  {
    index: 1,
    avatar: NajrulSumon,
    name: "Najrul Sumon",
    review: `The very first person I have to thank for this is Robert Brunner. He has gone far beyond and put in more than 50-60 hours of his time. 
    
   I have met many great people on LinkedIn, and he is one of them without any doubt.`,
    title: "Full Stack Developer, Dhaka, Bangladesh ",

    source: "LinkedIn",
  },

  {
    index: 2,
    avatar: NorthStar,
    name: "Ken Anderson",
    review: `Robert B. and Jay D. were both professional, knowledgeable and friendly. They were patient with our questions and their explanations were excellent. They were both very well versed with the equipment and technology. We are excited to have the peace of mind this system will provide.`,
    title: "NorthStar Customer, Whitsett, NC",

    source: NorthStar,
  },

  {
    index: 3,
    avatar: NorthStar,
    name: "Brennan Hooper",
    review: `Robert B was super professional and did an excellent job setting up our NorthStar Security system. He was very accommodating and listened to all my concerns and wants. I hope to do more business with Mr. B in the future.`,
    title: "NorthStar Customer, Dallas, TX",

    source: NorthStar,
  },

  {
    index: 4,
    avatar: NorthStar,
    name: "Sykea Brinkley",
    review: `Robert B was very respectful, pleasant and very detailed when he explained how to use the security system. The job he did was well above and beyond our expectations. He made this an absolute pleasure.`,
    title: "NorthStar Customer",

    source: NorthStar,
  },

  {
    index: 5,
    avatar: NorthStar,
    name: "Rebecca Titus",
    review: `Robert B was very courteous and professional. He took the time to answer all of my questions. He also entertained my son as he talked about his obsession with Marvel characters. Excellent customer service.`,
    title: "NorthStar Customer, Arlington, TX",

    source: NorthStar,
  },

  {
    index: 6,
    avatar: NorthStar,
    name: "Chris Avalos",
    review: `Robert B was our technician today for our alarm system today. He was able to answer all my questions and install everything pretty quickly. Good clean person with good manners.`,
    title: "NorthStar Customer, Fort Worth, TX",

    source: NorthStar,
  },

  {
    index: 7,
    avatar: NorthStar,
    name: "Allison Clark",
    review: `Robert B was Our technician ! He was so helpful and thorough ! He stayed up extra late to finish installing our security system . He answered all my questions and made sure I understood all my devices .`,
    title: "NorthStar Customer, Denton, Texas",

    source: NorthStar,
  },


  // {
  //   index: 21,
  //   avatar: client21,
  //   name: "[client]",
  //   review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //   title: "[Title], [Location]",

  //   source: "Local",
  // },
  // {
  //   index: 22,
  //   avatar: client22,
  //   name: "[client]",
  //   review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //   title: "[Title], [Location]",

  //   source: "Local",
  // },
  // {
  //   index: 23,
  //   avatar: client23,
  //   name: "[client]",
  //   review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //   title: "[Title], [Location]",

  //   source: "Local",
  // },
];


export { experiences, skills, portfolio, testimonial };

