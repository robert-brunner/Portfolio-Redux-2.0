import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
// import Typical from 'react-typical'
import CTA from "./CTA";
import "./Header.css";
import HeaderSocials from "./HeaderSocials";
// import { Typewriter } from 'react-simple-typewriter'
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
// import videoBg from "../../assets/video_portfolio/videoBg1.m4v";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import react_logo from "../../assets/tech_logos/react.webp";
import ts_logo from "../../assets/tech_logos/ts.webp";
import next_logo from "../../assets/tech_logos/nextjs.webp";
import tailwind_logo from "../../assets/tech_logos/tailwind.webp";
import nodejs_logo from "../../assets/tech_logos/nodejs.webp";
import expressjs_logo from "../../assets/tech_logos/expressjs.webp";
import coffeeImage from "../../assets/coffee.webp";

const Header = () => {
  const logos = [
    { id: 1, name: "React", src: react_logo },
    { id: 2, name: "TypeScript", src: ts_logo },
    { id: 3, name: "NextJS", src: next_logo },
    { id: 4, name: "TailwindCSS", src: tailwind_logo },
    { id: 5, name: "NodeJS", src: nodejs_logo },
    { id: 6, name: "Express JS", src: expressjs_logo },
  ];

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <header>
        <div className="background_Logos">
          <div className="background_Logos">
            {logos.map((logo) => (
              <img
                key={logo.id}
                className="wiggle"
                src={logo.src}
                alt={logo.name}
              />
            ))}
          </div>
        </div>

        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          width="100vw"
          height="100vh"
          options={{
            fullScreen: {
              enable: false,
            },
            fpsLimit: 30,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 1.0,
                },
              },
            },
            particles: {
              "push": {
                "particles_nb": 2
              },
              "remove": {
                "particles_nb": 1
              },
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: false,
                  area: 805,
                },
                value: 50,
              },
              opacity: {
                value: 0.1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },

            detectRetina: false,
          }}
        />

        <div className="container header_container">
          <div className="header_info">
            <motion.h2
              className="static_header_name"
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", duration: 3 }}
            >
              Hello I'm{" "}
            </motion.h2>

            <h3
              style={{ color: "white", fontWeight: "bold", fontSize: "1.7rem" }}
            >
              {/* Style will be inherited from the parent element */}

              <Typewriter
                options={{
                  strings: ["[Your Name]", "[Your Title]"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h3>

            <div>
              <a href="#about">
                <div className="scroll-down"></div>
              </a>
            </div>

            <CTA />
          </div>

          <HeaderSocials />
        </div>
      </header>
    </>
  );
};

export default Header;
