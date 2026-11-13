import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { about, profile } from '../data/site'

export function AboutFacts() {
  return (
    <dl className="about-facts">
      {about.facts.map((f) => (
        <div key={f.k}>
          <dt className="mono">{f.k}</dt>
          <dd>{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}

// Home page: a short, plain introduction. The full story lives on /about.
export default function AboutTeaser({ num }) {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div>
          <SectionHead num={num} label="About" title={'Backend at the core, the *whole* product around it.'} />
          {profile.photo && <img className="about-photo" src={profile.photo} alt={profile.name} width="320" height="320" loading="lazy" />}
        </div>
        <div className="about-body">
          <Reveal as="p" className="about-lead">
            {about.lead}
          </Reveal>
          {about.paragraphs.slice(0, 2).map((p, i) => (
            <Reveal as="p" key={i} delay={0.05 + i * 0.05}>
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.15}>
            <AboutFacts />
          </Reveal>
          <Reveal className="section-cta" delay={0.2}>
            <Link to="/about" className="btn btn-ghost btn-lg">
              More about me <ArrowUpRight size={18} />
            </Link>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-arrow">
              Check it on LinkedIn
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
