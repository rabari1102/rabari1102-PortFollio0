import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

export default function CountUp({ to, format = inr, duration = 1.4 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)
  const from = useRef(0)

  useEffect(() => {
    if (!inView) return
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

  return <span ref={ref}>{format(value)}</span>
}
