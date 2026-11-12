import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import ProjectCover from '../components/ProjectCover'
import Reveal from '../components/ui/Reveal'
import Kinetic from '../components/fx/Kinetic'
import Magnetic from '../components/fx/Magnetic'
import Seo from '../components/Seo'
import NotFound from './NotFound'
import { getProject, projects } from '../data/projects'

const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android app' }
const EASE = [0.22, 1, 0.36, 1]

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
  const isFreelance = project.kind === 'freelance'

  const meta = [
    ['Sector', project.sector],
    ['Type', platformLabel[project.platform]],
    ['Year', project.year],
    ['My role', isFreelance ? 'Everything: design to deploy' : 'Engineer / team lead'],
  ]

  return (
    <main id="main" className="project-page" style={{ '--c': project.accent }}>
      <Seo title={`${project.title} · ${project.sector} — Pragnesh Kalotara`} description={project.summary} path={`/work/${project.id}`} />
      <span className="pp-glow" aria-hidden="true" />
      <div className="container">
        <Link to="/#work" className="back-link mono">
          <ArrowLeft size={15} /> All work
        </Link>

        <header className="pp-head">
          <motion.p className="pp-kind mono" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="pp-swatch" /> {isFreelance ? 'Client project · built solo, from home' : 'Built inside a team · as engineer / lead'}
          </motion.p>
          <Kinetic as="h1" className="pp-title" text={project.title} play delay={0.05} />
          <motion.p
            className="pp-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          >
            {project.tagline}
          </motion.p>

          <motion.dl className="pp-meta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8, ease: EASE }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </motion.dl>

          {project.liveUrl && (
            <motion.a
              className="btn btn-ghost pp-live"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Open the live product <ExternalLink size={16} />
            </motion.a>
          )}
        </header>

        <motion.div
          ref={coverRef}
          className="pp-cover"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 1.1, ease: EASE }}
        >
          <motion.div style={{ y: coverY }}>
            <ProjectCover project={project} large />
          </motion.div>
        </motion.div>

        <div className="pp-numbers">
          {project.numbers.map((n, i) => (
            <Reveal key={n.label} className="pp-number" delay={i * 0.08} data-spot>
              <strong>{n.value}</strong>
              <span>{n.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="pp-body">
          <Reveal className="pp-block">
            <h2 className="mono">
              <span>01</span> The short version
            </h2>
            <p className="pp-lead">{project.summary}</p>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">
              <span>02</span> The problem
            </h2>
            <p>{project.problem}</p>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">
              <span>03</span> What I built
            </h2>
            <div>
              <p>{project.solution}</p>
              {project.note && <p className="pp-note">{project.note}</p>}
            </div>
          </Reveal>
          <Reveal className="pp-block">
            <h2 className="mono">
              <span>04</span> Features
            </h2>
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
            <h2 className="mono">
              <span>05</span> Stack, layer by layer
            </h2>
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

        <Reveal className="pp-cta" data-spot>
          <p className="mono">Want something like this?</p>
          <h2>
            Let's build <em>yours.</em>
          </h2>
          <p className="pp-cta-sub">Fixed written quote, three milestone payments, and the code is yours from day one.</p>
          <div className="hero-ctas">
            <Magnetic>
              <Link to="/#estimate" className="btn btn-primary btn-lg">
                Get a rough estimate <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Link to="/#contact" className="btn btn-ghost btn-lg">
              Talk to me
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
