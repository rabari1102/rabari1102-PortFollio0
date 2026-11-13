import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionHead from '../ui/SectionHead'
import ProjectCover from '../ProjectCover'
import { featured, projects } from '../../data/projects'

const pad = (n) => String(n).padStart(2, '0')

// Selected work as a split page. On wide screens each project's picture pins to the left while
// its story scrolls past on the right, then hands over to the next one. It is plain CSS
// (position: sticky), so it works without JavaScript and simply stacks on a phone.
export default function Showcase() {
  return (
    <section className="section showcase" id="work">
      <div className="container">
        <SectionHead num="01" label="Selected work" title={'Products I built\n*alone,* end to end.'} />
      </div>

      <ol className="show-list">
        {featured.map((p, i) => (
          <li className="show" key={p.id} style={{ '--c': p.accent }}>
            <div className="container show-grid">
              <div className="show-media">
                <Link to={`/work/${p.id}`} tabIndex={-1} aria-hidden="true" data-cursor="Open">
                  <ProjectCover project={p} large />
                </Link>
              </div>

              <div className="show-body">
                <p className="show-idx mono">
                  <b>{pad(i + 1)}</b> / {pad(featured.length)}
                  <span>{p.sector}</span>
                  <span>{p.year}</span>
                </p>
                <h3 className="show-title">
                  <Link to={`/work/${p.id}`}>{p.title}</Link>
                </h3>
                <p className="show-tag">{p.tagline}</p>
                <p className="show-sum">{p.summary}</p>

                {p.numbers?.length > 0 && (
                  <dl className="show-nums">
                    {p.numbers.slice(0, 3).map((n) => (
                      <div key={n.label}>
                        <dt>{n.label}</dt>
                        <dd>{n.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <p className="show-links">
                  <Link to={`/work/${p.id}`} className="tlink">
                    Read the case study <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="tlink is-live">
                      <i className="signal-dot" aria-hidden="true" /> Open the live product <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="container">
        <Link to="/work" className="bigrow" data-cursor="Index">
          <span className="mono">Index</span>
          <span className="bigrow-title">All {projects.length} projects</span>
          <ArrowRight className="bigrow-arrow" size={40} strokeWidth={1.2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
