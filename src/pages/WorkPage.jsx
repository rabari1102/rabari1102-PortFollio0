import { useState } from 'react'
import PageHead from '../components/ui/PageHead'
import WorkIndex from '../components/work/WorkIndex'
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
        title={'Sixteen products,\n*shipped.*'}
        intro="Nine I built on my own, from a children's hospital system to a paid marketplace. Seven I built or led inside product companies. The two are kept apart on purpose, so you always know which is which."
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
                <span>designed and built solo · {client.length}</span>
              </h2>
              <WorkIndex items={client} />
            </>
          )}

          {team.length > 0 && (
            <>
              <h2 className={`group-label mono ${client.length ? 'is-team' : ''}`}>
                <b>Inside teams</b>
                <span className="rule" aria-hidden="true" />
                <span>as engineer or team lead · 2023–2026 · {team.length}</span>
              </h2>
              <WorkIndex items={team} start={client.length} />
              <p className="fineprint">
                Team projects were built for employers and their customers. I describe my own part in them and leave the confidential details out.
              </p>
            </>
          )}

          {client.length + team.length === 0 && <p className="empty">Nothing in this category yet.</p>}
        </div>
      </section>
    </main>
  )
}
