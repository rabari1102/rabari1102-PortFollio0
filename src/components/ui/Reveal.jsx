import { useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useScrollReveal } from '../../lib/reveal'

const EASE = [0.22, 1, 0.36, 1]

// Fade-and-rise when scrolled into view. Rendered visible; see lib/reveal.js for why.
export default function Reveal({ children, className = '', delay = 0, y = 24, as = 'div', ...rest }) {
  const ref = useRef(null)
  const controls = useAnimationControls()
  const Tag = motion[as]

  useScrollReveal(ref, controls, {
    hidden: { opacity: 0, y },
    shown: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: EASE } },
    margin: '0px 0px -60px 0px',
  })

  return (
    <Tag ref={ref} className={className} initial={false} animate={controls} {...rest}>
      {children}
    </Tag>
  )
}
