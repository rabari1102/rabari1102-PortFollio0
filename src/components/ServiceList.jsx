import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from './ui/Reveal'
import { inr } from './ui/CountUp'
import { serviceIcons } from './ServicesTeaser'
import { services } from '../data/services'
import { getProject } from '../data/projects'

// The full description of every service, on /services. Each one has its own #anchor.
export default function ServiceList() {
  return (
    <ol className="service-list">
      {services.map((s, i) => {
        const Icon = serviceIcons[s.id]
        return (
          <Reveal as="li" key={s.id} id={s.id} className="service" y={22}>
            <span className="service-n mono">0{i + 1}</span>
            <div className="service-main">
              <h2>
                <span className="service-icon">
                  <Icon size={20} />
                </span>
                {s.title}
              </h2>
              <p className="service-problem">{s.problem}</p>
              <p>{s.blurb}</p>

              <div className="service-cols">
                <div>
                  <h3 className="mono">What you get</h3>
                  <ul className="service-gets">
                    {s.deliverables.map((d) => (
                      <li key={d}>
                        <span className="tick">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mono">Usually for</h3>
                  <p className="service-for">{s.audience}</p>
                  <h3 className="mono">Built with</h3>
                  <div className="chips">
                    {s.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="service-meta">
              <p className="service-price">
                <span className="mono">from</span>
                <strong>{inr(s.from)}</strong>
              </p>
              <span className="mono service-weeks">{s.weeks} weeks</span>
              <div className="service-examples">
                <span className="mono">Proof</span>
                {s.examples.map((id) => {
                  const p = getProject(id)
                  return (
                    <Link key={id} to={`/work/${id}`} className="example-link">
                      {p.title} <ArrowUpRight size={14} />
                    </Link>
                  )
                })}
              </div>
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}
