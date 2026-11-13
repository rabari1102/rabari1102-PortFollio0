import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '../ProjectCover'
import { platformLabel } from './CaseCard'

// A client project in the /work grid: cover on top, the essentials underneath.
export default function ProjectCard({ project }) {
  const stack = Object.values(project.stack).flat().slice(0, 4)
  return (
    <Link to={`/work/${project.id}`} className="pcard" style={{ '--c': project.accent }} data-spot data-cursor="View">
      <ProjectCover project={project} />
      <div className="pcard-body">
        <p className="pcard-meta mono">
          <span>{project.sector}</span>
          <span>
            {platformLabel[project.platform]}
            {project.liveUrl && <b className="live-tag">Live</b>}
          </span>
        </p>
        <h3>{project.title}</h3>
        <p className="pcard-tag">{project.tagline}</p>
        <div className="pcard-foot">
          <div className="chips">
            {stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <span className="round-arrow" aria-hidden="true">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </Link>
  )
}
