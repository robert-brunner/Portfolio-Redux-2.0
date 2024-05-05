import React, { useState, useEffect } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Skills0 from './components/skills0/Skills0';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Portfolio from './components/portfolio/Portfolio';
import PreLoader from "./components/PreLoader/PreLoader";
import Testimonials from "./components/testimonials/Testimonials";
import Experience from './components/experience/Experience';
import pleaseRotate from './assets/pleaseRotate.png';

const App = () => {
  const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

  useEffect(() => {
    const handleOrientationChange = (e) => {
      setIsLandscape(e.matches);
    };
    const mql = window.matchMedia("(orientation: landscape)");
    mql.addListener(handleOrientationChange);

    return () => mql.removeListener(handleOrientationChange);
  }, []);

  if (isLandscape) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
        <img src={pleaseRotate} alt="Rotate Device" style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }

  return (
    <>
      <PreLoader/>
      <Header/>
      <Nav/>
      <About/>
      <Experience/>
      <Skills0/>
      <Portfolio/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default App;
