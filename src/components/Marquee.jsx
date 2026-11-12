import { useRef } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { marqueeWords } from '../data/site'
import { useReducedMotionPref } from '../lib/hooks'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// A row that drifts on its own and speeds up (and reverses) with the scroll.
function Row({ words, baseVelocity }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduced = useReducedMotionPref()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2000, 2000], [8, -8])
  // The words are rendered twice, so sliding from 0 to -50% loops seamlessly.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (!inView || reduced) return
    let move = dir.current * baseVelocity * (Math.min(delta, 50) / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  const items = [...words, ...words]
  return (
    <div className="marquee-row" ref={ref}>
      <motion.div className="marquee-track" style={{ x, skewX: reduced ? 0 : skew }}>
        {items.map((w, i) => (
          <span key={i} className={`marquee-item ${i % 3 === 1 ? 'is-outline' : ''}`} aria-hidden={i >= words.length}>
            {w}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 C 12.6 8, 15 11.4, 22 12 C 15 12.6, 12.6 15, 12 22 C 11.4 15, 9 12.6, 2 12 C 9 11.4, 11.4 9, 12 2 Z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const half = Math.ceil(marqueeWords.length / 2)
  return (
    <section className="marquee" aria-label="Technologies I work with">
      <Row words={marqueeWords.slice(0, half)} baseVelocity={-1.4} />
      <Row words={marqueeWords.slice(half)} baseVelocity={1.4} />
    </section>
  )
}
