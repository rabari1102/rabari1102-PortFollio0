import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import Magnetic from './fx/Magnetic'
import CountUp, { inr } from './ui/CountUp'
import { estimator, payment } from '../data/services'
import { estimate, milestones } from '../lib/estimate'
import { setPendingBrief } from '../lib/brief'

export default function Estimator() {
  const navigate = useNavigate()
  const [type, setType] = useState('web')
  const [size, setSize] = useState('m')
  const [extras, setExtras] = useState(['auth', 'admin'])

  const result = useMemo(() => estimate(estimator, { type, size, extras }), [type, size, extras])
  const { type: t, size: s, available, chosen } = result

  const toggle = (id) => setExtras((xs) => (xs.includes(id) ? xs.filter((x) => x !== id) : [...xs, id]))

  // Hand the draft to the contact form: on this page if there is one, otherwise on /contact.
  const sendToContact = () => {
    const brief = `Estimate from the website:\n- Type: ${t.label}\n- Size: ${s.label} (${s.hint})\n- Extras: ${
      chosen.map((e) => e.label).join(', ') || 'none'
    }\n- Range shown: ${inr(result.low)} – ${inr(result.high)}, ${result.weeksLow}–${result.weeksHigh} weeks\n\nAbout my project:\n`
    setPendingBrief({ brief, type: t.label })
    const here = document.getElementById('contact')
    if (here) here.scrollIntoView({ behavior: 'smooth' })
    else navigate('/contact#contact')
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
                  <i className="is-agency" />
                </div>
                <span className="mono">{inr(result.agency)}</span>
              </div>
              <div className="est-bar-row is-me">
                <span className="mono">Me</span>
                <div className="est-bar">
                  <motion.i className="is-me" initial={false} animate={{ width: `${myShare}%` }} transition={{ type: 'spring', stiffness: 110, damping: 20 }} />
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
                    transition={{ duration: 0.25 }}
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
                <CountUp to={result.low} duration={0.5} /> <i>–</i> <CountUp to={result.high} duration={0.5} />
              </p>
              <p className="est-weeks mono">
                about {result.weeksLow}–{result.weeksHigh} weeks
              </p>
            </div>

            <div className="est-milestones">
              <p className="mono">Paid in three parts</p>
              <ol>
                {milestones(payment, result.mid).map((m) => (
                  <li key={m.label}>
                    <b>{m.pct}%</b>
                    <span>{m.label}</span>
                    <em className="mono">≈ {inr(m.amount)}</em>
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
