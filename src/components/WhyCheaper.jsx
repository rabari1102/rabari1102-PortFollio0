import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import CountUp, { inr } from './ui/CountUp'
import { aiHonesty, receipt } from '../data/services'

const sum = (rows) => rows.reduce((t, r) => t + r.amount, 0)

function Receipt({ title, sub, rows, total, stamp, variant }) {
  return (
    <Reveal className={`receipt is-${variant}`} y={40}>
      <div className="receipt-head mono">
        <strong>{title}</strong>
        <span>{sub}</span>
      </div>
      <ul className="receipt-rows mono">
        {rows.map((r, i) => (
          <motion.li
            key={r.item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
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
        className="receipt-stamp"
        initial={{ opacity: 0, scale: 1.8, rotate: variant === 'agency' ? -18 : 12 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.3, ease: 'easeIn' }}
      >
        {stamp}
      </motion.div>
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
    text: 'You are not paying for a junior to learn. I have led teams of 6 and built enterprise SaaS, IoT and healthcare systems.',
  },
]

export default function WhyCheaper() {
  const agency = sum(receipt.agency)
  const mine = sum(receipt.mine)
  const saved = Math.round((1 - mine / agency) * 100)

  return (
    <section className="section why" id="why">
      <div className="container">
        <SectionHead
          num="02"
          label="Why it costs less"
          title={
            <>
              Same app. <em>Different</em> receipt.
            </>
          }
          intro="Here is roughly where the money goes on a typical medium-size app. Most of an agency quote pays for the agency. Mine pays for the code."
        />

        <div className="receipts">
          <Receipt
            variant="agency"
            title="TYPICAL AGENCY"
            sub="Quote #4471 · medium web app"
            rows={receipt.agency}
            total={agency}
            stamp="OVERHEAD"
          />
          <div className="receipts-vs">
            <span className="hand">you save about</span>
            <strong className="display">{saved}%</strong>
          </div>
          <Receipt
            variant="mine"
            title="PRAGNESH · HOME STUDIO"
            sub="Same scope · same quality"
            rows={receipt.mine}
            total={mine}
            stamp="PAID FOR CODE"
          />
        </div>
        <p className="fineprint">Illustrative numbers for a medium web app. Your project gets a real fixed quote after a free call.</p>

        <div className="reasons">
          {reasons.map((r, i) => (
            <Reveal key={r.n} className="reason" delay={i * 0.1}>
              <span className="reason-n mono">{r.n}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="ai-honesty">
          <div className="ai-col">
            <h3 className="display">
              What AI does <em>in my workflow</em>
            </h3>
            <ul>
              {aiHonesty.does.map((d) => (
                <li key={d}>
                  <Check size={18} /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="ai-col is-never">
            <h3 className="display">
              What I never let it <em>do</em>
            </h3>
            <ul>
              {aiHonesty.doesnt.map((d) => (
                <li key={d}>
                  <X size={18} /> {d}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
