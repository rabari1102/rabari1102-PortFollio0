import { Link } from 'react-router-dom'
import { AppWindow, ArrowUpRight, Globe, LayoutDashboard, Server, Smartphone, Sparkles } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { inr } from './ui/CountUp'
import { services } from '../data/services'
import { getProject } from '../data/projects'

const icons = { web: LayoutDashboard, mobile: Smartphone, desktop: AppWindow, website: Globe, backend: Server, ai: Sparkles }

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHead
          num="04"
          label="What I build"
          title={'One person, *every* layer.'}
          intro="Design, frontend, backend, database, mobile, deployment. You do not need to hire four people and get them to agree."
        />

        <ol className="service-list">
          {services.map((s, i) => {
            const Icon = icons[s.id]
            return (
              <Reveal as="li" key={s.id} className="service" delay={i * 0.05} y={22}>
                <span className="service-n mono">0{i + 1}</span>
                <div className="service-main">
                  <h3>
                    <span className="service-icon">
                      <Icon size={20} />
                    </span>
                    {s.title}
                  </h3>
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
                  <p className="service-price">
                    <span className="mono">from</span>
                    <strong>{inr(s.from)}</strong>
                  </p>
                  <span className="mono service-weeks">{s.weeks} weeks</span>
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
            )
          })}
        </ol>
        <p className="fineprint">Starting prices for a small first version. Prices are in INR; for clients outside India I quote in USD or EUR.</p>
      </div>
    </section>
  )
}
