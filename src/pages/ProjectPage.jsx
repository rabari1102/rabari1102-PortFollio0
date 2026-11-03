import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import ProjectCover from '../components/ProjectCover'
import Reveal from '../components/ui/Reveal'
import { getProject, projects } from '../data/projects'

const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android app' }

export default function ProjectPage() {
  const { id } = useParams()
  const project = getProject(id)

  useEffect(() => {
    if (project) document.title = `${project.title} · Pragnesh Kalotara`
  }, [project])

  if (!project) return <Navigate to="/#work" replace />

  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const isFreelance = project.kind === 'freelance'

  return (
    <main className="project-page" style={{ '--c': project.accent }}>
      <div className="container">
        <Link to="/#work" className="back-link mono">
          <ArrowLeft size={16} /> All work
        </Link>

        <header className="pp-head">
          <motion.p className="pp-kind mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="pp-swatch" /> {isFreelance ? 'Client project · built from home' : 'Built in a team · as engineer / lead'}
          </motion.p>
          <motion.h1
            className="pp-title display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>
          <motion.p className="pp-tagline" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            {project.tagline}
          </motion.p>

          <motion.dl className="pp-meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div>
              <dt className="mono">Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt className="mono">Type</dt>
              <dd>{platformLabel[project.platform]}</dd>
            </div>
            <div>
              <dt className="mono">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="mono">My role</dt>
              <dd>{isFreelance ? 'Everything: design to deploy' : 'Engineer / team lead'}</dd>
            </div>
          </motion.dl>
        </header>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <ProjectCover project={project} large />
        </motion.div>

        <div className="pp-numbers">
          {project.numbers.map((n, i) => (
            <Reveal key={n.label} className="pp-number" delay={i * 0.08}>
              <strong className="display">{n.value}</strong>
              <span>{n.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="pp-body">
          <Reveal className="pp-block">
            <h2 className="mono">The short version</h2>
            <p className="pp-lead">{project.summary}</p>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">The problem</h2>
            <p>{project.problem}</p>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">What I built</h2>
            <p>{project.solution}</p>
            {project.note && <p className="pp-note hand">{project.note}</p>}
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">Features</h2>
            <ol className="pp-features">
              {project.features.map((f, i) => (
                <li key={f}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">Stack, layer by layer</h2>
            <dl className="pp-stack">
              {Object.entries(project.stack).map(([layer, items]) => (
                <div key={layer}>
                  <dt className="mono">{layer}</dt>
                  <dd className="chips">
                    {items.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="pp-cta">
          <p className="hand">want something like this?</p>
          <h2 className="display">
            Let's build <em>yours</em>, for a fair price.
          </h2>
          <div className="hero-ctas">
            <Link to="/#estimate" className="btn btn-accent">
              Get a rough estimate <ArrowUpRight size={18} />
            </Link>
            <Link to="/#contact" className="btn btn-ghost">
              Talk to me
            </Link>
          </div>
        </Reveal>

        <nav className="pp-pager" aria-label="More projects">
          <Link to={`/work/${prev.id}`} className="pp-pager-link">
            <span className="mono">
              <ArrowLeft size={14} /> Previous
            </span>
            <strong className="display">{prev.title}</strong>
          </Link>
          <Link to={`/work/${next.id}`} className="pp-pager-link is-next">
            <span className="mono">
              Next <ArrowRight size={14} />
            </span>
            <strong className="display">{next.title}</strong>
          </Link>
        </nav>
      </div>
    </main>
  )
}
