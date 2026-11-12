import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../../lib/hooks'

// Wrap a button and it leans towards the pointer, then springs back. Mouse only.
export default function Magnetic({ children, strength = 0.32, className = '' }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  const onMove = (e) => {
    if (!fine) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.span>
  )
}
