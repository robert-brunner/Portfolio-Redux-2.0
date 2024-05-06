import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import emailjs from 'emailjs-com';
import React, { useEffect, useRef } from 'react';
import { BsLinkedin} from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { useInView } from 'react-intersection-observer';
import './Contact.css';

const Contact = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, [])

  const {ref, inView} = useInView({
    threshold: 0.2
  });


  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault();

    // create an account on EMailJS then use the service ID and template ID to send the email

    emailjs.sendForm('service ID', 'template ID', form.current, 'JZRIOMXj')

    e.target.reset()

      .then((result) => {
          console.log('SUCCESS!',result.text);
      }, (error) => {
          console.log('FAILED...',error.text);
      });
  };

  return (
    <section ref={ref} id='contact'>
      
      <h5>Get In Touch</h5>
      <h2 
      >Contact Me</h2>

      <div data-aos="zoom-out" className="container contact_container">

        <div className="contact_options">

          <article className="contact_option">

            <GrMail className='contact_option_icon'/>
            <h4>Email</h4>
            <h5></h5>
            <a href="mailto:brunner.robert.work@gmail.com" target=" rel='noreferrer'_blank">Send Email</a>

          </article>

          <article className="contact_option">
            
            <BsLinkedin className='contact_option_icon'/>
            <h4>LinkedIn</h4>
            <h5></h5>
            <a href="https://www.linkedin.com/in/robert-e-brunner/" target="_blank" rel='noreferrer'>Send a Message</a>

          </article>
          
          {/* <article className="contact_option">
            
            <BsWhatsapp className='contact_option_icon'/>
            <h4>WhatsApp</h4>
            <a href="https://api.whatsapp.com/send?phone=[8054044509]" target="_blank" rel='noreferrer'>Send a Message</a>

          </article> */}

        </div>

        {/* =================== End of Contact Option ====================== */}

        <form ref={form} onSubmit={sendEmail}>

            <input type="text" name='name' placeholder='Your Full name' required />
            <input type="email" name='email' placeholder='Your Email' required />
            <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
            <button type='submit' className='btn btn-primary'>Send Message</button>

        </form>

      </div>

    </section>
  )
}

export default Contact