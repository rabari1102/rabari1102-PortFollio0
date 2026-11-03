import { motion } from 'framer-motion'

// Hand-drawn marks. Paths are drawn on screen when they scroll into view.
const draw = (delay = 0, duration = 1.1) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true },
  transition: { pathLength: { delay, duration, ease: 'easeInOut' }, opacity: { delay, duration: 0.01 } },
})

export function Circled({ children, delay = 0.6 }) {
  return (
    <span className="circled">
      {children}
      <svg viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M150 8 C 70 4, 10 22, 8 55 C 6 92, 90 104, 160 101 C 240 98, 293 80, 291 50 C 289 18, 210 4, 120 12 C 90 15, 60 22, 44 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          {...draw(delay, 1.2)}
        />
      </svg>
    </span>
  )
}

export function Underline({ children, delay = 0.3 }) {
  return (
    <span className="underlined">
      {children}
      <svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M3 11 C 40 4, 80 4, 110 8 S 170 13, 197 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          {...draw(delay, 0.8)}
        />
      </svg>
    </span>
  )
}

export function Arrow({ className = '', delay = 0.4, flip = false }) {
  return (
    <svg
      className={`scribble-arrow ${className}`}
      viewBox="0 0 120 80"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <motion.path
        d="M6 10 C 30 60, 70 70, 108 52"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        {...draw(delay, 0.8)}
      />
      <motion.path
        d="M94 42 L 110 52 L 96 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(delay + 0.7, 0.3)}
      />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 C 12.6 8, 15 11.4, 22 12 C 15 12.6, 12.6 15, 12 22 C 11.4 15, 9 12.6, 2 12 C 9 11.4, 11.4 9, 12 2 Z" fill="currentColor" />
    </svg>
  )
}
