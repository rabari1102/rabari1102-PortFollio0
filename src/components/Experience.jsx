import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { experience } from '../data/experience'
import { profile } from '../data/site'

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section experience" id="experience">
      <div className="container exp-grid">
        <div className="exp-intro">
          <SectionHead
            num="07"
            label="Background"
            title={
              <>
                Trained on <em>real</em> teams.
              </>
            }
            intro={`${profile.yearsExperience} years in product companies, the last two as team lead. That is where I learned to ship on time, review code properly and keep clients in the loop. Now you get that, without the company around it.`}
          />
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Download CV
          </a>
        </div>

        <ol className="exp-list">
          {experience.map((e, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={e.company} className={`exp ${isOpen ? 'is-open' : ''}`} delay={i * 0.06}>
                <button className="exp-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="exp-period mono">{e.period}</span>
                  <span className="exp-role">
                    <strong className="display">{e.company}</strong>
                    <span>{e.role}</span>
                  </span>
                  <span className="exp-toggle">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="exp-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ul>
                        {e.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      <div className="chips">
                        {e.technologies.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
