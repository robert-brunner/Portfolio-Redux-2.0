import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper/core";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { portfolio } from "../../constants";
import "./Portfolio.css";

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); // Check for mobile size
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  // Adding Navigation to SwiperCore
  SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <Swiper
        data-aos="fade-up"
        effect={"coverflow"}
        grabCursor={!isMobile} // Disable grabCursor on mobile
        allowTouchMove={!isMobile} // Disable touch move on mobile
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: !isMobile // Make pagination non-clickable on mobile
        }}
        navigation={isMobile ? { // Enable navigation only on mobile
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        } : false}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {portfolio.map(({ id, gif, title, github, demo, tag }) => (
          <SwiperSlide key={id} style={{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: isMobile ? '56vh' : '70vh',
            margin: isMobile ? '0px' : 'auto',
            height: '60vh'
          }} className={isMobile ? "disable-interaction" : ""}>
            <div className="portfolio_item_image">
              <img height={190} src={gif} alt={title} />
              <div className="portfolio_item_content">
                <h3 style={{ textAlign: "center" }}>{title}</h3>
                <div className="portfolio_item_cta">
                  {github && <a href={github} className="btn" target="_blank" rel="noreferrer">Github</a>}
                  {demo && <a href={demo} className="btn btn-primary" target="_blank" rel="noreferrer">Demo</a>}
                </div>
                <p className="tag_css">{tag}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {isMobile && (
          <>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </>
        )}
      </Swiper>
    </section>
  );
};

export default Portfolio;
