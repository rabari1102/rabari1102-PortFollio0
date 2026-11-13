import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { payment, process } from '../data/services'

export default function Process({ num }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  return (
    <section className="section process" id="process">
      <div className="container process-grid">
        <div className="process-intro">
          <SectionHead
            num={num}
            label="How I work"
            title={'From a chat to a *launched* app.'}
            intro="No surprises, no disappearing for a month. You see working software every single week."
          />

          <Reveal className="payment">
            <p className="mono payment-label">How you pay</p>
            <div className="payment-bar">
              {payment.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="payment-seg"
                  data-rv
                  style={{ flexGrow: m.pct }}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <strong>{m.pct}%</strong>
                  <span>{m.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="payment-note">No full payment upfront, ever.</p>
          </Reveal>
        </div>

        <ol className="steps" ref={ref}>
          <span className="steps-line" aria-hidden="true">
            <motion.i style={{ scaleY: progress }} />
          </span>
          {process.map((p, i) => (
            <Reveal as="li" key={p.step} className="step" y={30}>
              <span className="step-dot">{i + 1}</span>
              <div className="step-body" data-spot>
                <p className="step-time mono">{p.time}</p>
                <h3>{p.step}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
