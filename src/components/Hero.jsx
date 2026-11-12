import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, KeyRound } from 'lucide-react'
import ShaderCanvas from './fx/ShaderCanvas'
import Kinetic from './fx/Kinetic'
import Magnetic from './fx/Magnetic'
import { DesktopMock, PhoneMock, WebMock, seeded } from './Mocks'
import { heroFacts, heroPromises, profile } from '../data/site'
import { payment } from '../data/services'
import { useFinePointer } from '../lib/hooks'
import { useIntroDone } from '../lib/intro'

const EASE = [0.22, 1, 0.36, 1]

const rise = (ready, delay, y = 26) => ({
  initial: { opacity: 0, y },
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y },
  transition: { delay, duration: 0.9, ease: EASE },
})

// The three windows floating beside the headline: a web dashboard, a desktop billing app and a phone.
// The whole stage leans towards the pointer, and each layer sits at a different depth.
function Stage({ ready, rx, ry }) {
  const enter = (delay, from) => ({
    initial: { opacity: 0, ...from },
    animate: ready ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, ...from },
    transition: { delay, duration: 1.1, ease: EASE },
  })
  return (
    <div className="stage-wrap" aria-hidden="true">
      <motion.div className="stage" style={{ rotateX: rx, rotateY: ry }}>
        <div className="stage-layer is-web">
          <motion.div {...enter(0.35, { y: 60, scale: 0.94 })}>
            <div className="floaty mock-box" style={{ '--fd': '0s' }}>
              <WebMock label="tripkoz.app" rnd={seeded('hero-web')} />
            </div>
          </motion.div>
        </div>

        <div className="stage-layer is-desktop">
          <motion.div {...enter(0.5, { x: -50, y: 40 })}>
            <div className="floaty mock-box" style={{ '--fd': '-2.2s' }}>
              <DesktopMock title="PharmaDesk" rnd={seeded('hero-desk')} />
            </div>
          </motion.div>
        </div>

        <div className="stage-layer is-phone">
          <motion.div {...enter(0.62, { x: 50, y: 50 })}>
            <div className="floaty mock-box" style={{ '--fd': '-4s' }}>
              <PhoneMock />
            </div>
          </motion.div>
        </div>

        <div className="stage-layer is-milestone">
          <motion.div {...enter(0.85, { y: 30, scale: 0.9 })}>
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
          </motion.div>
        </div>

        <div className="stage-layer is-keys">
          <motion.div {...enter(0.98, { y: 30, scale: 0.9 })}>
            <div className="floaty hcard is-row" style={{ '--fd': '-3s' }}>
              <span className="hcard-icon">
                <KeyRound size={16} />
              </span>
              <p>
                <b>You own it all</b>
                Code · servers · domain
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ready = useIntroDone()
  const fine = useFinePointer()
  const ref = useRef(null)

  // Pointer → a few degrees of lean on the device stage.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 70, damping: 16 })
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 70, damping: 16 })
  const onMove = (e) => {
    if (!fine) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  // As the hero scrolls away, the copy drifts up a touch faster and the backdrop fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={onMove}>
      <motion.div className="hero-bg" style={{ opacity: bgOpacity }} aria-hidden="true">
        <div className="ember-fallback" />
        <ShaderCanvas />
        <div className="hero-gridlines" />
      </motion.div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.p className="status-chip mono" {...rise(ready, 0)}>
            <i className="pulse-dot" /> {profile.availability}
          </motion.p>

          <Kinetic as="h1" className="hero-title" text={'I build the\nwhole product.\nYou hold the *keys.*'} play={ready} delay={0.12} stagger={0.07} />

          <motion.p className="hero-sub" {...rise(ready, 0.62)}>
            Web apps, Android apps and desktop software, designed, built and shipped by one senior engineer in {profile.city.split(',')[0]}. No sales team and
            no hand-offs: you talk to the person who writes your code, and you see it working every week.
          </motion.p>

          <motion.div className="hero-ctas" {...rise(ready, 0.74)}>
            <Magnetic>
              <Link to="/#estimate" className="btn btn-primary btn-lg">
                Estimate my project <ArrowDownRight size={19} />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/#work" className="btn btn-ghost btn-lg">
                See the work <ArrowUpRight size={19} />
              </Link>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero-promises" {...rise(ready, 0.86)}>
            {heroPromises.map((p) => (
              <li key={p}>
                <span className="tick">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div className="hero-visual" style={{ y: stageY }}>
          <Stage ready={ready} rx={rx} ry={ry} />
        </motion.div>
      </div>

      <div className="container">
        <motion.div className="hero-foot" {...rise(ready, 0.98)}>
          <dl className="hero-facts">
            {heroFacts.map((f) => (
              <div key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <Link to="/#work" className="hero-scroll mono" aria-label="Scroll to the work">
            <span>Scroll</span>
            <i>
              <ArrowDown size={15} />
            </i>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
