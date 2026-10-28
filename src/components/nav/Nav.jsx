import React, { useState, useEffect } from 'react';
import {
  TbTerminal2,   // home
  TbId,          // about
  TbGitBranch,   // experience
  TbCpu,         // skills
  TbFolder,      // portfolio
  TbAccessPoint, // contact
} from 'react-icons/tb';
import './Nav.css';

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');

useEffect(() => {
    let isClicking = false;

    const handleScroll = () => {
      if (isClicking) return;
      const scrollPosition = window.scrollY;
      const sectionPositions = {
        '#':           0,
        '#about':      document.getElementById('about').offsetTop,
        '#experience': document.getElementById('experience').offsetTop,
        '#skills0':    document.getElementById('skills0').offsetTop,
        '#portfolio':  document.getElementById('portfolio').offsetTop,
        '#contact':    document.getElementById('contact').offsetTop,
      };

      let visibleSection = '#';
      for (const section in sectionPositions) {
        if (scrollPosition >= sectionPositions[section]) {
          visibleSection = section;
        }
      }
      setActiveNav(visibleSection);
    };

    window.addEventListener('scroll', handleScroll);

    const handleClick = () => {
      isClicking = true;
      setTimeout(() => { isClicking = false; }, 1000);
    };

    document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', handleClick));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav>
      <a title="Home" href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}>
        <TbTerminal2 />
      </a>
      <a title="About Me" href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}>
        <TbId />
      </a>
      <a title="Experience" href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}>
        <TbGitBranch />
      </a>
      <a title="Skills" href="#skills0" onClick={() => setActiveNav('#skills0')} className={activeNav === '#skills0' ? 'active' : ''}>
        <TbCpu />
      </a>
      <a title="Portfolio" href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}>
        <TbFolder />
      </a>
      <a title="Contact" href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}>
        <TbAccessPoint />
      </a>
    </nav>
  );
};

export default Nav;