import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import ProjectCover from './ProjectCover'
import { categories, projects } from '../data/projects'

const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android' }

function Tilt({ children, className }) {
  // A small lean towards the pointer, only on devices with a real mouse.
  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }
  return (
    <div className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}

const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
}

export default function Work() {
  const [filter, setFilter] = useState('all')
  const match = (p) => filter === 'all' || p.categories.includes(filter)
  const freelance = projects.filter((p) => p.kind === 'freelance' && match(p))
  const team = projects.filter((p) => p.kind === 'team' && match(p))

  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionHead
          num="01"
          label="Selected work"
          title={
            <>
              Things I've <em>actually</em> shipped.
            </>
          }
          intro="Six products built for my own clients, from a children's hospital to a bank automation tool, plus seven systems I built or led while working in teams. Click any of them for the full story."
        />

        <div className="filters" role="tablist" aria-label="Filter projects">
          {categories.map((c) => {
            const count = c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id)).length
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={filter === c.id}
                className={`filter ${filter === c.id ? 'is-on' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {filter === c.id && <motion.span layoutId="filter-pill" className="filter-pill" />}
                <span className="filter-label">
                  {c.label} <sup>{count}</sup>
                </span>
              </button>
            )
          })}
        </div>

        {freelance.length > 0 && (
          <>
            <h3 className="work-group mono">
              <span>For my clients</span> <i /> built from home
            </h3>
            <motion.div layout className="work-grid">
              <AnimatePresence mode="popLayout">
                {freelance.map((p) => (
                  <motion.div key={p.id} {...cardMotion}>
                    <Tilt className="tilt">
                      <Link to={`/work/${p.id}`} className="work-card" style={{ '--c': p.accent }}>
                        <ProjectCover project={p} />
                        <div className="work-card-body">
                          <div className="work-card-top mono">
                            <span>{p.sector}</span>
                            <span>{platformLabel[p.platform]}</span>
                          </div>
                          <h4 className="display">{p.title}</h4>
                          <p>{p.tagline}</p>
                          <div className="work-card-foot">
                            <div className="chips">
                              {Object.values(p.stack)
                                .flat()
                                .slice(0, 4)
                                .map((t) => (
                                  <span key={t} className="chip">
                                    {t}
                                  </span>
                                ))}
                            </div>
                            <span className="round-arrow" aria-hidden="true">
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Tilt>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {team.length > 0 && (
          <>
            <h3 className="work-group mono">
              <span>While leading teams</span> <i /> enterprise · 2023–2026
            </h3>
            <motion.div layout className="team-grid">
              <AnimatePresence mode="popLayout">
                {team.map((p) => (
                  <motion.div key={p.id} {...cardMotion}>
                    <Link to={`/work/${p.id}`} className="team-card" style={{ '--c': p.accent }}>
                      <span className="team-swatch" />
                      <div className="team-card-top mono">
                        <span>{p.sector}</span>
                        <span>{p.year}</span>
                      </div>
                      <h4 className="display">{p.title}</h4>
                      <p>{p.tagline}</p>
                      <div className="team-numbers">
                        {p.numbers.slice(0, 2).map((n) => (
                          <span key={n.label}>
                            <b className="display">{n.value}</b> {n.label}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="team-arrow" size={18} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {freelance.length + team.length === 0 && <p className="empty hand">Nothing here yet. Want to be the first?</p>}
      </div>
    </section>
  )
}
