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
import pleaseRotate from './assets/pleaseRotate.png'; // Make sure this path is correct

function App() {
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  const [initialOrientation, setInitialOrientation] = useState(orientation);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      setOrientation(newOrientation);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = () => {
    if (isMobile) {
      if (initialOrientation === 'portrait' && orientation === 'landscape') {
        // Show "please rotate" image if the device started in portrait and is now in landscape
        return <img src={pleaseRotate} alt="Please rotate your device" />;
      }
      // For mobile, always return the rest of the components unless the specific condition is met
      return (
        <>
          <Header />
          <Nav />
          <About />
          <Experience />
          <Skills0 />
          <Portfolio />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      );
    }
    // For desktops, render all components normally
    return (
      <>
        <Header />
        <Nav />
        <About />
        <Experience />
        <Skills0 />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </>
    );
  };

  return (
    <>
      <PreLoader />
      {renderContent()}
    </>
  );
}

export default App;
