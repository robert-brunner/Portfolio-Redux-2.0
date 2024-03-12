import React from 'react'
import { CgFacebook } from 'react-icons/cg'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      
      <a href="#" className='footer_logo'>[Your Name]</a>

      <ul className='permalinks'>

        <li><a href="#">Home</a></li>

        <li><a href="#about">About</a></li>

        <li><a href="#experience">Experience</a></li>

        <li><a href="#skills">Skills</a></li>

        {/* <li><a href="#services">Services</a></li> */}

        <li><a href="#portfolio">Portfolio</a></li>

        <li><a href="#testimonials">Testimonials</a></li>

        <li><a href="#contact">Contact</a></li>

      </ul>

      <div className="footer_socials">
        <div
        whilehover={{scale:1.1}}
        >
        <a href="https://www.facebook.com/" target="_blank" rel='noreferrer'><CgFacebook/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://www.linkedin.com/in/" target="_blank" rel='noreferrer'><FaLinkedin/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://www.instagram.com/" target="_blank" rel='noreferrer'><GrInstagram/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://twitter.com/" target="_blank" rel='noreferrer'><FaTwitter/></a>
        </div>
        <div
        whilehover={{scale:1.1}}>
        <a href="https://github.com/" target="_blank" rel='noreferrer'><FaGithub/></a>
        </div>
      </div>

      <div className="footer_copyright">

        <small>&copy; [Your Name]. All rights reserved {new Date().getFullYear()}</small>

      </div>

    </footer>
  )
}

export default Footer