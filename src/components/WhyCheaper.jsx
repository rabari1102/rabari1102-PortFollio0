import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import CountUp, { inr } from './ui/CountUp'
import { aiHonesty, receipt } from '../data/services'

const sum = (rows) => rows.reduce((t, r) => t + r.amount, 0)

function Receipt({ title, sub, rows, total, stamp, variant }) {
  return (
    <Reveal className={`receipt is-${variant}`} y={50}>
      <div className="receipt-paper paper">
        <div className="receipt-head mono">
          <strong>{title}</strong>
          <span>{sub}</span>
        </div>
        <ul className="receipt-rows mono">
          {rows.map((r, i) => (
            <motion.li
              key={r.item}
              data-rv
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className={variant === 'agency' && r.item !== 'Senior review' ? 'is-overhead' : ''}
            >
              <span>{r.item}</span>
              <span className="dots" />
              <span>{r.amount === 0 ? '—' : inr(r.amount)}</span>
            </motion.li>
          ))}
        </ul>
        <div className="receipt-total mono">
          <span>TOTAL</span>
          <strong>
            <CountUp to={total} />
          </strong>
        </div>
        <motion.div
          data-rv
          className="receipt-stamp"
          initial={{ opacity: 0, scale: 2, rotate: variant === 'agency' ? -22 : 16 }}
          whileInView={{ opacity: 1, scale: 1, rotate: variant === 'agency' ? -9 : 7 }}
          viewport={{ once: true }}
          transition={{ delay: 1.15, duration: 0.28, ease: 'easeIn' }}
        >
          {stamp}
        </motion.div>
      </div>
    </Reveal>
  )
}

const reasons = [
  {
    n: '01',
    title: 'No office, no overhead',
    text: 'I work from a quiet room at home in Ahmedabad. No rent, no reception, no ping-pong table built into your invoice.',
  },
  {
    n: '02',
    title: 'AI does the grunt work',
    text: 'Forms, boilerplate, test drafts and docs get done in hours instead of days. I spend the saved time on the parts that matter.',
  },
  {
    n: '03',
    title: 'Senior from day one',
    text: 'You are not paying for a junior to learn. I have led a team of 6 and built enterprise SaaS, IoT and healthcare systems.',
  },
]

// "What AI does / what I never let it do". Shown on /about.
export function AiHonesty() {
  return (
    <Reveal className="ai-honesty">
      <div className="ai-col">
        <h3>
          What AI does <em>in my workflow</em>
        </h3>
        <ul>
          {aiHonesty.does.map((d) => (
            <li key={d}>
              <span className="ai-mark">
                <Check size={14} strokeWidth={3} />
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>
      <div className="ai-col is-never">
        <h3>
          What I never let it <em>do</em>
        </h3>
        <ul>
          {aiHonesty.doesnt.map((d) => (
            <li key={d}>
              <span className="ai-mark">
                <X size={14} strokeWidth={3} />
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function WhyCheaper() {
  const agency = sum(receipt.agency)
  const mine = sum(receipt.mine)
  const saved = Math.round((1 - mine / agency) * 100)

  return (
    <section className="section why" id="pricing">
      <div className="container">
        <SectionHead
          label="Pricing, explained"
          title={'Same app.\n*Different* receipt.'}
          intro="A low price from a stranger should make you suspicious, so here is where it comes from. This is roughly how the money is spent on a typical medium-size app. Most of an agency quote pays for the agency. Mine pays for the code."
        />

        <div className="receipts">
          <Receipt variant="agency" title="TYPICAL AGENCY" sub="Illustrative · medium web app" rows={receipt.agency} total={agency} stamp="OVERHEAD" />
          <Reveal className="receipts-vs" delay={0.3}>
            <span className="mono">you save about</span>
            <strong>
              <CountUp to={saved} format={(v) => `${Math.round(v)}%`} duration={1.6} />
            </strong>
          </Reveal>
          <Receipt variant="mine" title="PRAGNESH · HOME STUDIO" sub="Same scope · same quality" rows={receipt.mine} total={mine} stamp="PAID FOR CODE" />
        </div>
        <p className="fineprint is-center">
          Illustrative numbers for a medium web app, not a quote. Your project gets a real, fixed, written quote after a free call.
        </p>

        <div className="reasons">
          {reasons.map((r, i) => (
            <Reveal key={r.n} className="reason" delay={i * 0.1} data-spot>
              <span className="reason-n mono">{r.n}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
