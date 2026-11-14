import { motion } from 'framer-motion'

// The curtain that crosses the screen between pages: a panel with a curved leading edge rises to
// cover the old page, shows where you are going, then lifts off the new one.
// App.jsx decides when; this only draws it. phase: 'cover' | 'reveal'.
const EASE = [0.76, 0, 0.24, 1]

// The curve is an SVG path whose bulge flattens as the panel settles.
const coverPath = { from: 'M0 100 Q50 100 100 100 L100 100 L0 100 Z', mid: 'M0 100 Q50 0 100 100 L100 100 L0 100 Z', to: 'M0 0 Q50 0 100 0 L100 100 L0 100 Z' }
const revealPath = { mid: 'M0 0 Q50 0 100 0 L100 0 Q50 100 0 0 Z', to: 'M0 0 Q50 0 100 0 L100 0 Q50 0 0 0 Z' }

export const COVER_MS = 520
export const REVEAL_MS = 620

export default function Curtain({ phase, label }) {
  const covering = phase === 'cover'
  return (
    <div className="curtain" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          initial={{ d: covering ? coverPath.from : coverPath.to }}
          animate={{ d: covering ? [coverPath.from, coverPath.mid, coverPath.to] : [coverPath.to, revealPath.mid, revealPath.to] }}
          transition={{ duration: (covering ? COVER_MS : REVEAL_MS) / 1000, ease: EASE, times: [0, 0.5, 1] }}
        />
      </svg>
      <motion.p
        className="curtain-label"
        initial={{ opacity: covering ? 0 : 1, y: covering ? 30 : 0 }}
        animate={{ opacity: covering ? 1 : 0, y: covering ? 0 : -40 }}
        transition={{ duration: covering ? 0.4 : 0.3, delay: covering ? 0.18 : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <i />
        {label}
      </motion.p>
    </div>
  )
}
