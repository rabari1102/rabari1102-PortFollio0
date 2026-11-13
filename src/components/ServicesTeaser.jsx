import { Link } from 'react-router-dom'
import { AppWindow, ArrowUpRight, Globe, LayoutDashboard, Server, Smartphone, Sparkles } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { services } from '../data/services'

export const serviceIcons = { web: LayoutDashboard, mobile: Smartphone, desktop: AppWindow, website: Globe, backend: Server, ai: Sparkles }

// Home page: each service as the problem it solves, linking to the full description and price.
export default function ServicesTeaser({ num }) {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHead
          num={num}
          label="Services"
          title={'One person, *every* layer.'}
          intro="Design, frontend, backend, database, mobile and deployment. You do not need to hire four people and get them to agree."
        />

        <ul className="svc-grid">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id]
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 0.06} y={20}>
                <Link to={`/services#${s.id}`} className="svc" data-spot>
                  <span className="svc-icon">
                    <Icon size={20} />
                  </span>
                  <h3>{s.title}</h3>
                  <p className="svc-problem">{s.problem}</p>
                  <p className="svc-blurb">{s.blurb}</p>
                  <span className="svc-more mono">
                    What you get <ArrowUpRight size={14} />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="section-cta">
          <Link to="/services" className="btn btn-ghost btn-lg">
            Services and pricing <ArrowUpRight size={18} />
          </Link>
          <Link to="/services#estimate" className="link-arrow">
            Get a rough estimate
            <span className="round-arrow">
              <ArrowUpRight size={17} />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
