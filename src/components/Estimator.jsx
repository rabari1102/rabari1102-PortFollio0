import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import Magnetic from './fx/Magnetic'
import CountUp, { inr } from './ui/CountUp'
import { estimator, payment } from '../data/services'

// Round to something a human would quote.
const nice = (n) => Math.round(n / 5000) * 5000

export default function Estimator() {
  const [type, setType] = useState('web')
  const [size, setSize] = useState('m')
  const [extras, setExtras] = useState(['auth', 'admin'])

  const t = estimator.types.find((x) => x.id === type)
  const s = estimator.sizes.find((x) => x.id === size)
  const available = estimator.extras.filter((e) => !e.only || e.only === type)
  const chosen = available.filter((e) => extras.includes(e.id))

  const result = useMemo(() => {
    const base = t.base * s.mult
    const mid = base + chosen.reduce((a, e) => a + e.cost, 0)
    const weeks = t.weeks * (0.6 + s.mult * 0.45) + chosen.reduce((a, e) => a + e.weeks, 0)
    return {
      base,
      mid,
      low: nice(mid * 0.85),
      high: nice(mid * 1.2),
      agency: nice(mid * estimator.agencyMultiplier),
      weeksLow: Math.max(1, Math.round(weeks * 0.85)),
      weeksHigh: Math.max(2, Math.round(weeks * 1.25)),
    }
  }, [t, s, chosen])

  const toggle = (id) => setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]))

  const sendToContact = () => {
    const brief = `Estimate from the website:\n- Type: ${t.label}\n- Size: ${s.label} (${s.hint})\n- Extras: ${
      chosen.map((e) => e.label).join(', ') || 'none'
    }\n- Range shown: ${inr(result.low)} – ${inr(result.high)}, ${result.weeksLow}–${result.weeksHigh} weeks\n\nAbout my project:\n`
    window.dispatchEvent(new CustomEvent('prefill-brief', { detail: { brief, type: t.label } }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const myShare = (result.high / result.agency) * 100

  // The draft is itemised: the base build, then one line per extra.
  const lines = [
    { id: 'base', label: `${t.label} · ${s.label.toLowerCase()} (${s.hint})`, amount: result.base },
    ...chosen.map((e) => ({ id: e.id, label: e.label, amount: e.cost })),
  ]

  return (
    <section className="section estimate" id="estimate">
      <div className="container">
        <SectionHead
          num="05"
          label="Rough estimate"
          title={'What would *yours* cost?'}
          intro="Three quick choices and you get an itemised draft, the same shape as the written quote I send after a call. It is deliberately rough: the real one is fixed."
        />

        <div className="estimator">
          <Reveal className="est-form">
            <fieldset>
              <legend className="mono">
                <span>1</span> What are we building?
              </legend>
              <div className="choice-row">
                {estimator.types.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={`choice ${type === x.id ? 'is-on' : ''}`}
                    onClick={() => setType(x.id)}
                    aria-pressed={type === x.id}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mono">
                <span>2</span> How big is the first version?
              </legend>
              <div className="choice-row is-sizes">
                {estimator.sizes.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={`choice is-tall ${size === x.id ? 'is-on' : ''}`}
                    onClick={() => setSize(x.id)}
                    aria-pressed={size === x.id}
                  >
                    <strong>{x.label}</strong>
                    <span>{x.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mono">
                <span>3</span> Anything extra?
              </legend>
              <div className="choice-row">
                {available.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    className={`choice is-check ${extras.includes(x.id) ? 'is-on' : ''}`}
                    onClick={() => toggle(x.id)}
                    aria-pressed={extras.includes(x.id)}
                  >
                    <span className="tickbox" aria-hidden="true" />
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="est-compare">
              <p className="mono est-compare-title">The same scope, two quotes</p>
              <div className="est-bar-row">
                <span className="mono">Typical agency</span>
                <div className="est-bar">
                  <motion.i
                    className="is-agency"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="mono">{inr(result.agency)}</span>
              </div>
              <div className="est-bar-row is-me">
                <span className="mono">Me</span>
                <div className="est-bar">
                  <motion.i
                    className="is-me"
                    initial={{ width: 0 }}
                    animate={{ width: `${myShare}%` }}
                    transition={{ type: 'spring', stiffness: 110, damping: 20 }}
                  />
                </div>
                <span className="mono">{inr(result.high)}</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="est-result paper" delay={0.1} aria-live="polite">
            <div className="est-doc-head mono">
              <strong>DRAFT QUOTE</strong>
              <span>Rough · not an offer</span>
            </div>

            <ul className="est-lines mono">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.li
                    key={l.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="est-line">
                      <span>{l.label}</span>
                      <span className="dots" />
                      <span>{inr(l.amount)}</span>
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="est-total">
              <p className="mono">Ballpark</p>
              <p className="est-price">
                <CountUp to={result.low} duration={0.6} /> <i>–</i> <CountUp to={result.high} duration={0.6} />
              </p>
              <p className="est-weeks mono">
                about {result.weeksLow}–{result.weeksHigh} weeks
              </p>
            </div>

            <div className="est-milestones">
              <p className="mono">Paid in three parts</p>
              <ol>
                {payment.map((m) => (
                  <li key={m.label}>
                    <b>{m.pct}%</b>
                    <span>{m.label}</span>
                    <em className="mono">≈ {inr(nice((result.mid * m.pct) / 100))}</em>
                  </li>
                ))}
              </ol>
            </div>

            <Magnetic strength={0.18} className="est-cta">
              <button type="button" className="btn btn-ink" onClick={sendToContact}>
                Send this draft to Pragnesh <Send size={16} />
              </button>
            </Magnetic>
            <p className="est-fine">Includes design, development, deployment and 30 days of fixes. Hosting and store fees are separate.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
