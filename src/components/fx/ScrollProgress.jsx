import { motion, useScroll, useSpring } from 'framer-motion'

// The thin ember line at the very top that fills as you read.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return <motion.span className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}
