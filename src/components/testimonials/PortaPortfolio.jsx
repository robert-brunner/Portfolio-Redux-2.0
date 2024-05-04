import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.min.css";
import { useInView } from "react-intersection-observer";
import { portfolio } from "../../constants";
import "./Testimonials.css";

SwiperCore.use([Pagination]);

const Apple = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 720);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <section ref={ref} id="testimonials">
      <h5>My Recent Work</h5>
      <h2>Apple</h2>

      <Swiper
        data-aos="fade-up"
        className="container apple_container"
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        {portfolio.map(({ id, gif, title, github, demo, tag }, index) => (
          <SwiperSlide key={id} className="testimonial">
            <div className="client_avatar">
              <img src={gif} alt={title} style={{ width: isMobile ? '100%' : 'auto', height: 'auto' }} />
            </div>
            <h4 className="client_name">{title}</h4>
            <div className="portfolio_item_cta">
              {github && (
                <a href={github} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
              )}
              {demo && (
                <a href={demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Demo</a>
              )}
            </div>
            <p className="tag_css">{tag}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Apple;
