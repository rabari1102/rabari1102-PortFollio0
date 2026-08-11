import { motion } from 'framer-motion'

export default function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 35,
  once = true
}) {
  const getVariants = () => {
    let x = 0
    let y = 0
    if (direction === 'up') y = distance
    if (direction === 'down') y = -distance
    if (direction === 'left') x = distance
    if (direction === 'right') x = -distance

    return {
      hidden: {
        opacity: 0,
        x,
        y,
        filter: 'blur(8px)'
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  )
}
