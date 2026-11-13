import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

// Counts up to `to` when it scrolls into view, and tweens again whenever `to` changes.
// The real number is what gets rendered into the HTML, so search engines and visitors without
// JavaScript read the right figure; the count-up is layered on top once the page is live.
export default function CountUp({ to, format = inr, duration = 1.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const [value, setValue] = useState(to)
  const [started, setStarted] = useState(false)
  const from = useRef(0)

  useEffect(() => {
    if (!inView) return
    setStarted(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      from.current = to
      setValue(to)
      return
    }
    const controls = animate(from.current, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        from.current = v
        setValue(v)
      },
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={`countup ${started ? '' : 'is-pre'}`}>
      {format(value)}
    </span>
  )
}
