import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotionPref } from '../../lib/hooks'

// Small mono labels "decode" into place the first time they are seen.
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+<>·'

export default function Scramble({ text, className = '', as: Tag = 'span', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotionPref()
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView || reduced) {
      setOut(text)
      return
    }
    let frame = 0
    let raf = 0
    const total = 14 + text.length * 1.4
    const startAt = performance.now() + delay * 1000
    const tick = (now) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick)
        return
      }
      frame += 1
      const settled = Math.floor((frame / total) * text.length)
      setOut(
        text
          .split('')
          .map((ch, i) => (i < settled || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(''),
      )
      if (frame < total) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, text, delay])

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </Tag>
  )
}
