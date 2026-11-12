import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// A one-second curtain on the first visit of a session: the wordmark writes itself, a counter
// runs to 100, the curtain lifts. It is skipped on later page loads and for reduced-motion users.
const KEY = 'intro-seen'

export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return false
  }
}

export default function Preloader({ onLift, onDone }) {
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    let lifted = false
    const lift = () => {
      if (lifted) return
      lifted = true
      setShow(false)
      onLift?.()
    }
    const start = performance.now()
    const DURATION = 850
    let raf = 0
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else lift()
    }
    raf = requestAnimationFrame(tick)
    // Safety net: never let the curtain outstay its welcome (e.g. a throttled background tab).
    const bail = setTimeout(lift, 2600)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(bail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="preloader" aria-hidden="true" exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}>
          <div className="preloader-mark">
            {'pragnesh'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-110%' }}
                transition={{ delay: i * 0.035, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
            <motion.i initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.42, type: 'spring', stiffness: 380, damping: 14 }} />
          </div>
          <div className="preloader-foot mono">
            <span>Freelance software studio · Ahmedabad</span>
            <span className="preloader-count">{String(count).padStart(3, '0')}</span>
          </div>
          <span className="preloader-bar" style={{ transform: `scaleX(${count / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
