import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, GripVertical } from 'lucide-react'
import { heroFacts, profile } from '../data/site'

// three.js is big; load the island after the text so the page paints instantly.
const HeroScene = lazy(() => import('./HeroScene'))

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
})

const float = (delay, distance = 8) => ({
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: { opacity: 1, y: [0, -distance, 0], scale: 1 },
  transition: {
    opacity: { delay, duration: 0.6 },
    scale: { delay, duration: 0.6 },
    y: { delay, duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
})

function Ring({ pct }) {
  const r = 9
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 24 24" className="ring" aria-hidden="true">
      <defs>
        <linearGradient id={`ring-${pct}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4338ff" />
          <stop offset="60%" stopColor="#9b3dff" />
          <stop offset="100%" stopColor="#ff5a1f" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r={r} className="ring-bg" />
      <circle
        cx="12"
        cy="12"
        r={r}
        className="ring-fg"
        stroke={`url(#ring-${pct})`}
        strokeDasharray={`${(pct / 100) * c} ${c}`}
      />
    </svg>
  )
}

export default function Hero() {
  // The three.js island is ~140 kB gzipped. On phones it sits below the fold as
  // decoration, so only load it on wide screens where motion is welcome. The CSS
  // aurora still gives the hero its colour everywhere.
  const [showScene, setShowScene] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setShowScene(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section className={`hero ${showScene ? '' : 'hero--flat'}`} id="top">
      <div className="hero-scene-wrap">
        <div className="aurora" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        {showScene && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        <span className="hero-floor" aria-hidden="true" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.p className="eyebrow mono" {...rise(0)}>
            <i className="pulse-dot" /> {profile.availability}
          </motion.p>

          <h1 className="hero-title">
            <motion.span className="ht-line" {...rise(0.1)}>
              Software,
            </motion.span>
            <motion.span className="ht-line" {...rise(0.22)}>
              <em>grown</em> at home.
            </motion.span>
          </h1>

          <motion.p className="hero-sub" {...rise(0.4)}>
            Web apps, mobile apps and desktop software, designed and built by me from a quiet home studio in{' '}
            {profile.city.split(',')[0]}. No office or sales team on your invoice, so you pay{' '}
            <strong>40–60% less than an agency</strong> and talk directly to the person writing your code.
          </motion.p>

          <motion.div className="hero-ctas" {...rise(0.5)}>
            <Link to="/#estimate" className="btn btn-accent">
              Estimate my project <ArrowDownRight size={18} />
            </Link>
            <Link to="/#work" className="btn btn-ghost">
              See the work <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.dl className="hero-facts" {...rise(0.65)}>
            {heroFacts.map((f) => (
              <div key={f.label}>
                <dt className="display">{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div className="hero-note" {...rise(0.8)}>
          <p>
            A real house, a laptop on the porch, and everything I ship orbiting around it. That is the whole studio.
          </p>
          <Link to="/#why" className="pill">
            <GripVertical size={14} /> Why it costs less
          </Link>
        </motion.div>

        <motion.div className="hcard hcard-stats" {...float(1.1)}>
          <div className="hcard-row">
            <Ring pct={100} />
            <span>
              <small>Projects shipped</small>
              <b>13</b>
            </span>
          </div>
          <div className="hcard-row">
            <Ring pct={59} />
            <span>
              <small>Saved vs agency</small>
              <b>~59%</b>
            </span>
          </div>
        </motion.div>

        <motion.div className="hcard hcard-quote" {...float(1.3, 10)}>
          <div className="hcard-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <small className="mono">Studio note</small>
          <p>Every app starts at a kitchen table.</p>
        </motion.div>

        <motion.div className="hcard hcard-slot" {...float(1.5, 6)}>
          <small className="mono">Next free slot</small>
          <p>December · 2 projects</p>
          <span className="slot-bar">
            <i />
          </span>
        </motion.div>

        <motion.div className="spin-badge" {...rise(1.6)} aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="spin-path" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
            </defs>
            <text>
              <textPath href="#spin-path">DRAG TO SPIN · DRAG TO SPIN ·</textPath>
            </text>
          </svg>
          <span>↻</span>
        </motion.div>
      </div>
    </section>
  )
}
