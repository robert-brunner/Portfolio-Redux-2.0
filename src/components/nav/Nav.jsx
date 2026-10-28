import React, { useState, useEffect, useRef } from 'react';
import {
  TbTerminal2,   // home
  TbId,          // about
  TbGitBranch,   // experience
  TbCpu,         // skills
  TbFolder,      // portfolio
  TbQuote,       // testimonials
  TbAccessPoint, // contact
} from 'react-icons/tb';
import './Nav.css';

const SECTIONS = ['#', '#about', '#experience', '#skills0', '#portfolio', '#testimonials', '#contact'];

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#');
  // true from a click until the page has stopped scrolling
  const clickLock = useRef(false);
  const scrolledSinceClick = useRef(false);

  useEffect(() => {
    let stopTimer = null;
    let frame = null;

    // Which section is "current": the last one whose top is above a line
    // 1/3 down the screen. Measured live each time, so content loading,
    // AOS, or resizing can never leave it with stale positions.
    const pickActive = () => {
      const line = window.innerHeight / 3;
      let current = '#';
      for (const hash of SECTIONS.slice(1)) {
        const el = document.querySelector(hash);
        if (el && el.getBoundingClientRect().top <= line) current = hash;
      }
      // At the very bottom, Contact may never reach that line: count it as current
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      return atBottom ? SECTIONS[SECTIONS.length - 1] : current;
    };

    const onScroll = () => {
      scrolledSinceClick.current = true;
      // During a click-scroll, don't light up every section it passes.
      // Wait until scrolling has been quiet for 150ms, then sync once.
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        clickLock.current = false;
        setActiveNav(pickActive());
      }, 150);

      if (clickLock.current) return;
      if (frame) return; // one update per frame max
      frame = requestAnimationFrame(() => {
        frame = null;
        setActiveNav(pickActive());
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(stopTimer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = (hash) => {
    clickLock.current = true;
    scrolledSinceClick.current = false;
    setActiveNav(hash);
    // Clicked the section you're already on: no scroll happens, so release now
    setTimeout(() => {
      if (!scrolledSinceClick.current) clickLock.current = false;
    }, 300);
    // Safety: if the portfolio terminal's scroll lock is still on
    // (mouse left it mid-scroll without a mouseleave), release it.
    document.documentElement.style.overflow = '';
  };

  const link = (hash, title, Icon) => (
    <a
      title={title}
      href={hash}
      onClick={() => handleClick(hash)}
      className={activeNav === hash ? 'active' : ''}
    >
      <Icon />
    </a>
  );

  return (
    <nav>
      {link('#', 'Home', TbTerminal2)}
      {link('#about', 'About Me', TbId)}
      {link('#experience', 'Experience', TbGitBranch)}
      {link('#skills0', 'Skills', TbCpu)}
      {link('#portfolio', 'Portfolio', TbFolder)}
      {link('#testimonials', 'Testimonials', TbQuote)}
      {link('#contact', 'Contact', TbAccessPoint)}
    </nav>
  );
};

export default Nav;