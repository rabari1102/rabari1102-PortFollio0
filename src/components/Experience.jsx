import { experience } from '../data/experience'
import Reveal from './ui/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <Reveal direction="up" className="sec-header-center">
          <span className="sec-label">CAREER ROADMAP</span>
          <h2 className="sec-title">Work Experience</h2>
          <div className="sec-divider"></div>
        </Reveal>

        <div className="timeline-container">
          <div className="timeline-spine"></div>

          {experience.map((item, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div key={item.company} className={`timeline-row ${isLeft ? 'row-left' : 'row-right'}`}>
                {/* Timeline Center Node Dot */}
                <div className={`timeline-node ${item.current ? 'is-current' : ''}`}>
                  <div className="node-pulse"></div>
                </div>

                {/* Timeline Card Container */}
                <div className="timeline-card-wrap">
                  <Reveal direction={isLeft ? 'right' : 'left'} delay={idx * 0.15}>
                    <article className="timeline-card card-spotlight">
                      <div className="card-badge-row">
                        {item.current && <span className="badge-current">Present Role</span>}
                        {item.badges.map((b) => (
                          <span key={b} className="badge-tech">{b}</span>
                        ))}
                      </div>

                      <div className="card-period">{item.period} · {item.location}</div>
                      <h3 className="card-role">{item.role}</h3>
                      <div className="card-company">{item.company}</div>

                      <ul className="card-highlights">
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>

                      <div className="card-tags">
                        {item.technologies.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
