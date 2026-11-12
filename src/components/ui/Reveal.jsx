import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Fade-and-rise when scrolled into view. `blur` adds a soft focus pull for hero-ish moments.
export default function Reveal({ children, className = '', delay = 0, y = 28, as = 'div', blur = false, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
