import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, KeyRound } from 'lucide-react'
import ShaderCanvas from './fx/ShaderCanvas'
import Kinetic from './fx/Kinetic'
import Magnetic from './fx/Magnetic'
import { DesktopMock, PhoneMock, WebMock, seeded } from './Mocks'
import { hero, heroPromises, profile } from '../data/site'
import { payment } from '../data/services'
import { useFinePointer } from '../lib/hooks'

// Everything in the hero enters with CSS alone (the "in" and "pop" classes plus a --d delay),
// so the headline is on screen as soon as the HTML is, before any JavaScript has run.
const d = (ms) => ({ '--d': `${ms}ms` })

// The three windows floating beside the headline: a web dashboard, a desktop billing app and a
// phone. The whole stage leans a few degrees towards the pointer; each layer sits at its own depth.
function Stage({ rx, ry }) {
  return (
    <div className="stage-wrap" aria-hidden="true">
      <motion.div className="stage" style={{ rotateX: rx, rotateY: ry }}>
        <div className="stage-layer is-web">
          <div className="pop" style={d(260)}>
            <div className="floaty mock-box" style={{ '--fd': '0s' }}>
              <WebMock label="tripkoz.app" rnd={seeded('hero-web')} />
            </div>
          </div>
        </div>

        <div className="stage-layer is-desktop">
          <div className="pop" style={d(400)}>
            <div className="floaty mock-box" style={{ '--fd': '-2.2s' }}>
              <DesktopMock title="PharmaDesk" rnd={seeded('hero-desk')} />
            </div>
          </div>
        </div>

        <div className="stage-layer is-phone">
          <div className="pop" style={d(520)}>
            <div className="floaty mock-box" style={{ '--fd': '-4s' }}>
              <PhoneMock />
            </div>
          </div>
        </div>

        <div className="stage-layer is-milestone">
          <div className="pop" style={d(700)}>
            <div className="floaty hcard" style={{ '--fd': '-1s' }}>
              <small className="mono">How you pay</small>
              <div className="hcard-split">
                {payment.map((m) => (
                  <span key={m.label} style={{ flexGrow: m.pct }}>
                    {m.pct}%
                  </span>
                ))}
              </div>
              <p>Three milestones. Never all upfront.</p>
            </div>
          </div>
        </div>

        <div className="stage-layer is-keys">
          <div className="pop" style={d(820)}>
            <div className="floaty hcard is-row" style={{ '--fd': '-3s' }}>
              <span className="hcard-icon">
                <KeyRound size={16} />
              </span>
              <p>
                <b>You own it all</b>
                Code · servers · domain
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const fine = useFinePointer()
  const ref = useRef(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 70, damping: 16 })
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 70, damping: 16 })
  const onMove = (e) => {
    if (!fine) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  // As the hero scrolls away the backdrop fades and the stage drifts down a little.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section className="hero" ref={ref} onPointerMove={onMove}>
      <motion.div className="hero-bg" style={{ opacity: bgOpacity }} aria-hidden="true">
        <div className="glow-fallback">
          <i />
          <i />
        </div>
        <ShaderCanvas />
        <div className="hero-gridlines" />
      </motion.div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow mono in" style={d(0)}>
            <span className="signal-dot" aria-hidden="true" />
            <span>{profile.name}</span>
            <span className="sep" aria-hidden="true" />
            <span>{profile.role}</span>
            <span className="sep" aria-hidden="true" />
            <span>{profile.city}</span>
          </p>

          <Kinetic as="h1" mode="css" className="hero-title" text={hero.title} />

          <p className="hero-sub in" style={d(380)}>
            {hero.sub}
          </p>

          <div className="hero-ctas in" style={d(470)}>
            <Magnetic>
              <Link to="/work" className="btn btn-primary btn-lg">
                Explore my work <ArrowUpRight size={19} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/contact" className="btn btn-ghost btn-lg">
                Discuss a project
              </Link>
            </Magnetic>
          </div>

          <ul className="hero-promises in" style={d(560)}>
            {heroPromises.map((p) => (
              <li key={p}>
                <span className="tick">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <motion.div className="hero-visual" style={{ y: stageY }}>
          <Stage rx={rx} ry={ry} />
        </motion.div>
      </div>
    </section>
  )
}
