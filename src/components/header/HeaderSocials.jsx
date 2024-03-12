import { motion } from 'framer-motion'
import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs'

const HeaderSocials = () => {
  return (
    <motion.div
        initial={{x: '-100vw'}}
        animate={{x: 50 }} 
        transition={{ type: 'spring', bounce:0.3, duration: 2 }}
    className='header_socials'>

        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><BsLinkedin /></a>
        <a href="https://github.com/" target="_blank" rel="noreferrer"><BsGithub/></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><BsInstagram/></a>

    </motion.div>
  )
}

export default HeaderSocials;