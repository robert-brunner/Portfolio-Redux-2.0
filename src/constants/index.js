import { company, company1, company2, company3, client1, client2, client3, client4, client5, client6, client7, client21, client22, client23, linkedInLogo, upworkLogo } from "../assets";
import NewForce from '../assets/company/NewForce.jpeg';
import NorthStar from '../assets/company/NorthStar.png';
import Nussbaum from '../assets/company/Nussbaum.png';
import VFD from '../assets/company/VFD.jpg';
import LEDLLC from '../assets/company/LEDLLC.png';
import NajrulSumon from '../assets/clients/NajrulSumon.jpeg';




const experiences = [
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
    date: "May 2014 - Present (Seasonal)",
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
          "https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png",
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
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png",
      },
      
      {
        id: 7,
        name: "JavaScript",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
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
      // {
      //   id: 10,
      //   name: "Material UI",
      //   image:
      //     "data:image/png;base64,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",
      // },
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
        id: 103,
        name: "C#",
        image:
          "https://www.codeguru.com/wp-content/uploads/2021/08/C-Sharp-Tutorials.png",
      },
      {
        id: 101,
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
        id: 203,
        name: "Vercel",
        image:
          "https://i.ibb.co/VjL9zJH/Vercel.png",
      },
      {
        id: 203,
        name: "ExpoGo",
        image:
          "https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s",
      },
      {
        id: 204,
        name: "Arduino",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Arduino_IDE_logo.svg/2048px-Arduino_IDE_logo.svg.png",
      },
      {
        id: 205,
        name: "VS Code",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
      },
      {
        id: 205,
        name: "Visual Studio",
        image:
          "https://1000logos.net/wp-content/uploads/2023/04/Visual-Studio-logo.png",
      },
      {
        id: 213,
        name: "WordPress",
        image:
          "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg",
      },
      {
        id: 209,
        name: "Flutter",
        image:
          "https://cdn-images-1.medium.com/max/1200/1*5-aoK8IBmXve5whBQM90GA.png",
      },
      {
        id: 207,
        name: "Adobe After Effects",
        image:
          "https://1000logos.net/wp-content/uploads/2020/07/After-Effects-Logo.png",
      },
      {
        id: 207,
        name: "Adobe Premier Pro",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1200px-Adobe_Premiere_Pro_CC_icon.svg.png",
      },
      {
        id: 207,
        name: "Final Cut Pro",
        image:
          "https://upload.wikimedia.org/wikipedia/en/9/9f/2015_Final_Cut_Pro_Logo.png",
      },
      {
        id: 208,
        name: "Figma",
        image:
          "https://i.pinimg.com/originals/63/a7/b1/63a7b1894b3210d07e434e9d12170586.png",
      },
      {
        id: 208,
        name: "Miro",
        image:
          "https://store-images.s-microsoft.com/image/apps.47763.13959754522315136.87be3224-9693-4fd4-8cd4-af6362fb8d37.b3c24453-164b-4d03-b561-e77aec7c076a",
      },
      {
        id: 209,
        name: "Canva",
        image:
          "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
      },
      {
        id: 209,
        name: "Blender",
        image:
          "https://www.wittystore.com/image/cache/data/brands_logos/blender-free-3d-creation-suite-wittystore-650x650.png",
      },
      {
        id: 209,
        name: "OBS",
        image:
          "https://www.logo.wine/a/logo/Open_Broadcaster_Software/Open_Broadcaster_Software-Logo.wine.svg",
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
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdrdGV2Y3NobmFtejI1d2Fob25ib3FmazRiYjBmZzM5djd4MHBhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PmFZWKn5AySg9vLuCn/giphy.gif",
    title: "Virtual Piano",
    // github: "https://github.com/",
    demo: "https://www.loom.com/share/e3a442e852b74415bd88897fcf99c32f?sid=0573307b-8b0c-495f-b247-6f392d9879ea",
    tag: "REACT",
  },
  
  {
    id: 4,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  // {
  //   id: 5,
  //   gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
  //   title: "[Project]",
  //   github: "https://github.com/",
  //   demo: "https://www.google.co/",
  //   tag: "#Tech #Tech #Tech",
  // },
  
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

