import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { payment, process } from '../data/services'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section className="section process" id="process">
      <div className="container">
        <SectionHead
          num="05"
          label="How it works"
          title={
            <>
              From a chat to a <em>launched</em> app.
            </>
          }
          intro="No surprises, no disappearing for a month. You see working software every single week."
        />

        <div className="steps" ref={ref}>
          <svg className="steps-line" viewBox="0 0 10 1000" preserveAspectRatio="none" aria-hidden="true">
            <path d="M5 0 V1000" className="steps-line-bg" />
            <motion.path d="M5 0 V1000" className="steps-line-fg" style={{ pathLength: progress }} />
          </svg>
          {process.map((p, i) => (
            <Reveal key={p.step} className="step" delay={0.05}>
              <span className="step-dot display">{i + 1}</span>
              <div>
                <p className="step-time mono">{p.time}</p>
                <h3 className="display">{p.step}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="payment">
          <p className="mono">How you pay</p>
          <div className="payment-bar">
            {payment.map((m, i) => (
              <motion.div
                key={m.label}
                className="payment-seg"
                style={{ flexBasis: `${m.pct}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <strong className="display">{m.pct}%</strong>
                <span>{m.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="hand payment-note">no full payment upfront, ever.</p>
        </Reveal>
      </div>
    </section>
  )
}
