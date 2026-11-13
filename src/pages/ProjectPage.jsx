import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import ProjectCover from '../components/ProjectCover'
import Reveal from '../components/ui/Reveal'
import Kinetic from '../components/fx/Kinetic'
import Magnetic from '../components/fx/Magnetic'
import NotFound from './NotFound'
import { getProject, projects, relatedProjects } from '../data/projects'

const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android app' }

export default function ProjectPage() {
  const { id } = useParams()
  const project = getProject(id)
  // Keyed so moving between projects replays the entrance instead of morphing in place.
  return project ? <ProjectView key={project.id} project={project} /> : <NotFound />
}

function ProjectView({ project }) {
  const coverRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] })
  const coverY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const related = relatedProjects(project)
  const isFreelance = project.kind === 'freelance'

  const meta = [
    ['Sector', project.sector],
    ['Type', platformLabel[project.platform]],
    ['Year', project.year],
    ['My role', isFreelance ? 'Everything: design to deploy' : 'Engineer / team lead'],
  ]

  // Each block is one part of the case study. Blocks with nothing real to say are left out.
  const blocks = [
    { h: 'Overview', body: <p className="pp-lead">{project.summary}</p> },
    { h: 'The challenge', body: <p>{project.problem}</p> },
    {
      h: isFreelance ? 'What I built' : 'My part in it',
      body: (
        <div>
          <p>{project.solution}</p>
          {project.note && <p className="pp-note">{project.note}</p>}
        </div>
      ),
    },
    {
      h: 'Key features',
      body: (
        <ol className="pp-features">
          {project.features.map((f, i) => (
            <li key={f}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {f}
            </li>
          ))}
        </ol>
      ),
    },
    {
      h: 'Stack, layer by layer',
      body: (
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
      ),
    },
  ]

  return (
    <main id="main" className="project-page" style={{ '--c': project.accent }}>
      <span className="pp-glow" aria-hidden="true" />
      <div className="container">
        <nav className="crumbs mono in" aria-label="Breadcrumb" style={{ '--d': '0ms' }}>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/work">Work</Link>
            </li>
            <li>
              <span aria-current="page">{project.title}</span>
            </li>
          </ol>
        </nav>

        <header className="pp-head">
          <p className="pp-kind mono in" style={{ '--d': '40ms' }}>
            <span className="pp-swatch" /> {project.kindLabel || (isFreelance ? 'Client project · built solo' : 'Built inside a team · as engineer / lead')}
          </p>
          <Kinetic as="h1" mode="css" className="pp-title" text={project.title} />
          <p className="pp-tagline in" style={{ '--d': '300ms' }}>
            {project.tagline}
          </p>

          <dl className="pp-meta in" style={{ '--d': '380ms' }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {project.liveUrl && (
            <a className="btn btn-ghost pp-live in" style={{ '--d': '440ms' }} href={project.liveUrl} target="_blank" rel="noreferrer">
              Open the live product <ExternalLink size={16} />
            </a>
          )}
        </header>

        <div ref={coverRef} className="pp-cover in" style={{ '--d': '420ms' }}>
          <motion.div style={{ y: coverY }}>
            <ProjectCover project={project} large />
          </motion.div>
        </div>

        <dl className="pp-numbers" aria-label="Results">
          {project.numbers.map((n, i) => (
            <Reveal key={n.label} className="pp-number" delay={i * 0.06} data-spot>
              <dt>{n.value}</dt>
              <dd>{n.label}</dd>
            </Reveal>
          ))}
        </dl>

        <div className="pp-body">
          {blocks.map((b, i) => (
            <Reveal as="section" className="pp-block" key={b.h}>
              <h2 className="mono">
                <span>{String(i + 1).padStart(2, '0')}</span> {b.h}
              </h2>
              {b.body}
            </Reveal>
          ))}
        </div>

        {related.length > 0 && (
          <section className="pp-related" aria-labelledby="related-h">
            <h2 className="group-label mono" id="related-h">
              <b>Related projects</b>
              <span className="rule" aria-hidden="true" />
              <span>similar problems, solved</span>
            </h2>
            <ul className="related-grid">
              {related.map((p, i) => (
                <Reveal as="li" key={p.id} delay={i * 0.06}>
                  <Link to={`/work/${p.id}`} className="related" style={{ '--c': p.accent }} data-spot>
                    <span className="mono">
                      {p.kind === 'freelance' ? 'Solo project' : 'Team project'} · {p.year}
                    </span>
                    <strong>{p.title}</strong>
                    <span className="related-tag">{p.tagline}</span>
                    <span className="round-arrow" aria-hidden="true">
                      <ArrowUpRight size={17} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        <Reveal className="pp-cta" data-spot>
          <p className="mono">Want something like this?</p>
          <h2>
            Let's build <em>yours.</em>
          </h2>
          <p className="pp-cta-sub">Fixed written quote, three milestone payments, and the code is yours from day one.</p>
          <div className="hero-ctas">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Discuss your project <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Link to="/services#estimate" className="btn btn-ghost btn-lg">
              Get a rough estimate
            </Link>
          </div>
        </Reveal>

        <nav className="pp-pager" aria-label="More projects">
          <Link to={`/work/${prev.id}`} className="pp-pager-link" style={{ '--c': prev.accent }}>
            <span className="mono">
              <ArrowLeft size={14} /> Previous
            </span>
            <strong>{prev.title}</strong>
          </Link>
          <Link to={`/work/${next.id}`} className="pp-pager-link is-next" style={{ '--c': next.accent }}>
            <span className="mono">
              Next <ArrowRight size={14} />
            </span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </div>
    </main>
  )
}
