import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { LinkedinIcon } from './ui/Icons'
import { experience } from '../data/experience'
import { profile } from '../data/site'

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section experience" id="experience" data-hud="Experience">
      <div className="container exp-grid">
        <div className="exp-intro">
          <SectionHead
            label="Experience"
            title={'Trained on *real* teams.'}
            intro={`${profile.yearsExperience} years in product companies, team lead since 2025. That is where I learned to ship on time, review code properly and keep clients in the loop. Now you get that, without the company around it.`}
          />
          <Reveal className="exp-links" delay={0.2}>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Read the CV <ArrowUpRight size={17} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <LinkedinIcon width={16} height={16} /> Check it on LinkedIn
            </a>
          </Reveal>
        </div>

        <ol className="exp-list">
          {experience.map((e, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={e.company} className={`exp ${isOpen ? 'is-open' : ''}`} delay={i * 0.06}>
                <button className="exp-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="exp-period mono">
                    {e.current && <i className="pulse-dot" />}
                    {e.period}
                  </span>
                  <span className="exp-role">
                    <strong>{e.company}</strong>
                    <span>
                      {e.role} · {e.location}
                    </span>
                  </span>
                  <motion.span className="exp-toggle" animate={{ rotate: isOpen ? 45 : 0 }}>
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="exp-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="exp-body-in">
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
