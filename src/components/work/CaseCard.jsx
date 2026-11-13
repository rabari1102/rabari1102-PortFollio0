import { Link } from 'react-router-dom'
import { motion, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '../ProjectCover'

export const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android' }
export const pad = (n) => String(n).padStart(2, '0')

// One client project as a large editorial card: the story on one side, the product on the other,
// swapping sides from card to card. On roomy desktop screens the cards pin near the top and
// stack: each new one slides over the last, which shrinks back a little like a deck.
export default function CaseCard({ project, i, total, progress, stacked }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.032])
  const dim = useTransform(progress, [(i + 0.35) / total, (i + 1) / total], [0, 0.55])
  const numbers = project.numbers.slice(0, 3)
  const stack = Object.values(project.stack).flat().slice(0, 4)
  const to = `/work/${project.id}`

  return (
    <div className="case-slot" style={{ '--i': i }}>
      <motion.article className={`case ${i % 2 ? 'is-flipped' : ''}`} style={{ '--c': project.accent, scale: stacked ? scale : 1 }} data-spot>
        <div className="case-info">
          <p className="case-meta mono">
            <span className="case-idx">
              {pad(i + 1)} <i>/ {pad(total)}</i>
            </span>
            <span>{project.sector}</span>
            <span>{platformLabel[project.platform]}</span>
            {project.liveUrl && <b className="live-tag">Live</b>}
          </p>
          <h3 className="case-title">
            <Link to={to}>{project.title}</Link>
          </h3>
          <p className="case-tagline">{project.tagline}</p>
          <p className="case-problem">{project.problem}</p>
          <dl className="case-numbers">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt>{n.value}</dt>
                <dd>{n.label}</dd>
              </div>
            ))}
          </dl>
          <div className="case-foot">
            <div className="chips">
              {stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <Link to={to} className="link-arrow" aria-label={`Read the ${project.title} case study`}>
              Case study
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>
        </div>
        <Link to={to} className="case-cover" data-cursor="View" tabIndex={-1} aria-hidden="true">
          <ProjectCover project={project} />
        </Link>
        {/* Cards fade back as the next one covers them; the last card is never covered. */}
        {stacked && i < total - 1 && <motion.span className="case-dim" style={{ opacity: dim }} aria-hidden="true" />}
      </motion.article>
    </div>
  )
}
