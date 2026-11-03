import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import CountUp, { inr } from './ui/CountUp'
import { estimator } from '../data/services'

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
    const mid = t.base * s.mult + chosen.reduce((a, e) => a + e.cost, 0)
    const weeks = t.weeks * (0.6 + s.mult * 0.45) + chosen.reduce((a, e) => a + e.weeks, 0)
    return {
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

  return (
    <section className="section estimate" id="estimate">
      <div className="container">
        <SectionHead
          num="04"
          label="Rough estimate"
          title={
            <>
              What would <em>yours</em> cost?
            </>
          }
          intro="Three quick choices for a ballpark in 10 seconds. It is deliberately rough: the real quote is fixed and written, after a free call."
        />

        <div className="estimator">
          <Reveal className="est-form">
            <fieldset>
              <legend className="mono">1 · What are we building?</legend>
              <div className="choice-row">
                {estimator.types.map((x) => (
                  <button key={x.id} className={`choice ${type === x.id ? 'is-on' : ''}`} onClick={() => setType(x.id)} aria-pressed={type === x.id}>
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mono">2 · How big is the first version?</legend>
              <div className="choice-row">
                {estimator.sizes.map((x) => (
                  <button key={x.id} className={`choice is-tall ${size === x.id ? 'is-on' : ''}`} onClick={() => setSize(x.id)} aria-pressed={size === x.id}>
                    <strong>{x.label}</strong>
                    <span>{x.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mono">3 · Anything extra?</legend>
              <div className="choice-row">
                {available.map((x) => (
                  <button key={x.id} className={`choice is-check ${extras.includes(x.id) ? 'is-on' : ''}`} onClick={() => toggle(x.id)} aria-pressed={extras.includes(x.id)}>
                    <span className="tick" aria-hidden="true" />
                    {x.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          <Reveal className="est-result" delay={0.1}>
            <span className="tape" />
            <p className="mono est-label">My ballpark</p>
            <p className="est-price display">
              <CountUp to={result.low} duration={0.6} /> <span>–</span> <CountUp to={result.high} duration={0.6} />
            </p>
            <p className="est-weeks hand">
              about {result.weeksLow}–{result.weeksHigh} weeks
            </p>

            <div className="est-compare">
              <div className="est-bar-row">
                <span className="mono">Typical agency</span>
                <div className="est-bar">
                  <motion.i className="is-agency" animate={{ width: '100%' }} />
                </div>
                <span className="mono">{inr(result.agency)}</span>
              </div>
              <div className="est-bar-row">
                <span className="mono">Me</span>
                <div className="est-bar">
                  <motion.i className="is-me" animate={{ width: `${myShare}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
                </div>
                <span className="mono">{inr(result.high)}</span>
              </div>
            </div>

            <button className="btn btn-accent est-cta" onClick={sendToContact}>
              Send this to Pragnesh <Send size={16} />
            </button>
            <p className="fineprint">Includes design, development, deployment and 30 days of fixes. Hosting and store fees are separate.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
