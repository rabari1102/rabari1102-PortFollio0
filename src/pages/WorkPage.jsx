import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHead from '../components/ui/PageHead'
import Scramble from '../components/fx/Scramble'
import ProjectCard from '../components/work/ProjectCard'
import TeamList from '../components/work/TeamList'
import CtaBand from '../components/CtaBand'
import { categories, projects } from '../data/projects'

const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length)

export default function WorkPage() {
  const [filter, setFilter] = useState('all')
  const match = (p) => filter === 'all' || p.categories.includes(filter)
  const client = projects.filter((p) => p.kind === 'freelance' && match(p))
  const team = projects.filter((p) => p.kind === 'team' && match(p))

  return (
    <main id="main">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Work' }]}
        label="Work"
        title={'Thirteen products,\n*shipped.*'}
        intro="Six I built on my own for clients, from a children's hospital to a bank automation tool. Seven I built or led inside product companies. The two are kept apart on purpose, so you always know which is which."
      />

      <section className="section work-index">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects by type">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                className={`filter ${filter === c.id ? 'is-on' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {filter === c.id && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="filter-label">
                  {c.label} <sup>{count(c.id)}</sup>
                </span>
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            Showing {client.length + team.length} of {projects.length} projects.
          </p>

          {client.length > 0 && (
            <>
              <h2 className="group-label mono">
                <b>Client work</b>
                <span className="rule" aria-hidden="true" />
                <Scramble text="designed and built solo" />
              </h2>
              <div className="pcard-grid">
                <AnimatePresence initial={false} mode="popLayout">
                  {client.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard project={p} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {team.length > 0 && (
            <>
              <h2 className={`group-label mono ${client.length ? 'is-team' : ''}`}>
                <b>Inside teams</b>
                <span className="rule" aria-hidden="true" />
                <Scramble text="as engineer or team lead · 2023–2026" />
              </h2>
              <TeamList items={team} />
              <p className="fineprint">
                Team projects were built for employers and their customers. I describe my own part in them and leave the confidential details out.
              </p>
            </>
          )}

          {client.length + team.length === 0 && <p className="empty">Nothing in this category yet.</p>}
        </div>
      </section>

      <CtaBand title={'Want something like this?\nLet’s build *yours.*'} />
    </main>
  )
}
