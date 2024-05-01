import { company, company1, company2, company3, client1, client2, client3, client4, client5, client6, client7, client21, client22, client23, linkedInLogo, upworkLogo } from "../assets";



const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "NewForce",
    icon: `"path/to/icon.png"`, // Make sure this path is correct
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
    icon: company1,
    iconBg: "#E6DEDD",
    date: "May 2014 - Present (Seasonal)",
    points: [
      "Trained and managed technicians in new techniques and assisted in installations ",
      "Assisted customers concerning initial installs and service calls ",
      "Trained customers to use alarm panel and associated apps",
      "Strong at solving issues on over the phone for both customers and other technicians ",
      "Programmed Home appliances to the specificiations of of customers ",
      "Ran and diagnosed phone lines for panels",
      "Installed and programmed smart thermostats, door locks, garage openers, indoor cameras, outdoor cameras, and doorbell cameras ",
      "Fished wire thru walls, and traced wires ",
      "Conducted a personal inventory count weekly",
      "Took aerial photos of houses and businesses for solar sight surveys using drones",
      "Photographed Main Service Panels and other electrical boxes inside and out",
      "Photographed and measured roof pitch and rafter spacing inside attics",
      "5+ years experience with alarm.com and MobileTech",
      "Strong ability to work as an individual or as a team and manage time.",
      "Ability to build and design timed or triggered events for the convenience of customers",

    ],
  },
  {
    title: "Autobody Prepper",
    company_name: "Nussbaum Autobody and Glass, LLC",
    icon: company2,
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
    icon: company3,
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
    icon: company3,
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
        name: "Next Js",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACTklEQVR4Ab1XAaQqURB9DyohSykREpRIQSAlBCoECKUFCSRCBBEAaSEABQEoCIEASCwAUICALgCo83do0//9v819XX845O7VnDkzOzP7JWGaBd3C3IJpQVjAHeJ+Rs9a97vKLGrBsB1KgMhEP3FMUUwt4ENMfxr1yQIU4SSjRkbeOZtERmHk6pXQVDlnkHh9S+QLTm1hkiz4n/gzFQuny9FoFLquE+i34x+n02k0m00UCoV3BIzn3MMJrVYLtp1OJ0cS/X4f5/MZhmG8IyDsWtDfEaDIn2232/3zbrvdxuFwwGg04qRBt+VnETBNE0IIkE2n07/erdfrWK/X6Ha73Hb9ZXII3G43ivy3dNRqtZe7lUoFs9mM6oBDwCQCgquALT1FT3a5XF7qIZ/PYzgcolqtcggIIgBZAgRKB6lCRalp2uM8k8mAVMrlchwC+DEBipycE4n5fP44j8ViKJVKSCaTbAJCpgaez4vFIsjoWa/XA50FAgEkEgmEw2F2CkxZBZ5Br5tt1ITcbjd8Ph88Hg+7CBefECCsVitS4aVJcV9D/VMCVITk/Hq9YrPZyBBo2a1YMGvAcQYcj0cCtWMugcdYNhjDiBrP25mx3++x3W6RzWZZ8isfxzQLlsslJpMJpYY5jhkqcOH1ejEYDDAej9FoNOByuZxGsfqVzC7KTqcDSkkqleKsZOqX0mAwiHK5DGrJfr+fs5SqX8sjkQji8ThCoRC+v78Za7l6JagrUh3YkUuZpqgwDaecc9VYSDoV5Fg+at7n+eLN57kuE/EvzHr/Kvs31aYAAAAASUVORK5CYII=",
      },
      
      {
        id: 4,
        name: "Redux",
        image:
          "https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg",
      },

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

      {
        id: 8,
        name: "TypeScript",
        image:
          "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
      },

      {
        id: 9,
        name: "Bootstrap",
        image:
          "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png",
      },
      {
        id: 10,
        name: "Material UI",
        image:
          "data:image/png;base64,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",
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
        name: "Node Js",
        image: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
      },
      {
        id: 102,
        name: "Express Js",
        image:
          "https://i.ibb.co/3dssqRk/express-js.png",
      },

      {
        id: 103,
        name: "MongoDB",
        image:
          "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
      },
      {
        id: 104,
        name: "Firebase",
        image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
      },
      
      {
        id: 105,
        name: "NoSQL",
        image:
          "https://i.ibb.co/g6kyNdP/NoSQL.png",
      },
      {
        id: 106,
        name: "Python",
        image: "https://qph.cf2.quoracdn.net/main-qimg-28cadbd02699c25a88e5c78d73c7babc",
      },
      {
        id: 107,
        name: "PHP",
        image: "https://www.vectorlogo.zone/logos/php/php-horizontal.svg",
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
//       
// 

      {
        id: 204,
        name: "Netlify",
        image:
          "https://seeklogo.com/images/N/netlify-logo-BD8F8A77E2-seeklogo.com.png",
      },
      {
        id: 205,
        name: "VS Code",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png?20210804221519",
      },
      {
        id: 206,
        name: "WordPress",
        image:
          "https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg",
      },
      {
        id: 207,
        name: "Adobe PS",
        image:
          "https://i.ibb.co/X52kyqc/adobe-photoshop-svgrepo-com.png",
      },
      {
        id: 208,
        name: "Figma",
        image:
          "https://i.pinimg.com/originals/63/a7/b1/63a7b1894b3210d07e434e9d12170586.png",
      },
      {
        id: 209,
        name: "Canva",
        image:
          "https://www.vectorlogo.zone/logos/canva/canva-icon.svg",
      },
      {
        id: 210,
        name: "Camtasia",
        image:
          "https://i.ibb.co/rxWnyvh/camtasia.jpg",
      },
      {
        id: 211,
        name: "Filmora",
        image:
          "https://i.ibb.co/WK1mZ6s/filmora.png",
      },
      {
        id: 212,
        name: "Shopify",
        image:
          "https://logowik.com/content/uploads/images/shopify-bag5181.logowik.com.webp",
      },
    ],
  },
];

const portfolio = [
  {
    id: 1,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 2,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 3,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 4,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 5,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 6,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  
  {
    id: 7,
    gif: "https://uploads-ssl.webflow.com/624ffa8926c9b353747d449f/626117bf88153d043bf91d37_preview.gif",
    title: "[Project]",
    github: "https://github.com/",
    demo: "https://www.google.co/",
    tag: "#Tech #Tech #Tech",
  },
  

];

const testimonial = [
  {
    index: 1,
    avatar: client1,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "UpWork",
  },

  {
    index: 2,
    avatar: client2,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },

  {
    index: 3,
    avatar: client3,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },

  {
    index: 4,
    avatar: client4,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },

  {
    index: 5,
    avatar: client5,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },

  {
    index: 6,
    avatar: client6,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },

  {
    index: 7,
    avatar: client7,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "LinkedIn",
  },


  {
    index: 21,
    avatar: client21,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "Local",
  },
  {
    index: 22,
    avatar: client22,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "Local",
  },
  {
    index: 23,
    avatar: client23,
    name: "[client]",
    review: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    title: "[Title], [Location]",

    source: "Local",
  },
];


export { experiences, skills, portfolio, testimonial };

