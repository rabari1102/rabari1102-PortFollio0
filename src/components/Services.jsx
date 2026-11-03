import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { inr } from './ui/CountUp'
import { services } from '../data/services'
import { getProject } from '../data/projects'

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHead
          num="03"
          label="What I build"
          title={
            <>
              One person, <em>every</em> layer.
            </>
          }
          intro="Design, frontend, backend, database, mobile, deployment. You don't need to hire four people and get them to agree."
        />

        <ol className="service-list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} className="service" delay={i * 0.05}>
              <span className="service-n mono">0{i + 1}</span>
              <div className="service-main">
                <h3 className="display">{s.title}</h3>
                <p>{s.blurb}</p>
                <div className="chips">
                  {s.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="service-meta">
                <span className="mono">from</span>
                <strong className="display">{inr(s.from)}</strong>
                <span className="mono">{s.weeks} weeks</span>
                <div className="service-examples">
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
          ))}
        </ol>
        <p className="fineprint">
          Starting prices for a small first version. Prices are in INR; for clients outside India I quote in USD or EUR.
        </p>
      </div>
    </section>
  )
}
