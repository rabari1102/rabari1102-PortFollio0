import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { about, profile } from '../data/site'
import { projects } from '../data/projects'
import { useClock } from '../lib/hooks'

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

// Home page: a headline, two short paragraphs and a bento panel of facts. Every tile is a fact
// from the data files; the clock is live. The full story lives on /about.
function Bento() {
  const clock = useClock(profile.timezone)
  const client = projects.filter((p) => p.kind === 'freelance').length
  const live = projects.filter((p) => p.liveUrl)
  return (
    <div className="bento">
      <Reveal className="tile is-clock" data-spot>
        <p className="mono">Local time</p>
        <p className="tile-big">{clock ? clock.time : '--:--'}</p>
        <p className="tile-sub">{profile.city} · IST, UTC+5:30</p>
        <span className="tile-orbit" aria-hidden="true" />
      </Reveal>
      <Reveal className="tile is-count" delay={0.05} data-spot>
        <p className="mono">Shipped</p>
        <p className="tile-big">{projects.length}</p>
        <p className="tile-sub">
          {client} solo · {projects.length - client} in teams
        </p>
      </Reveal>
      <Reveal className="tile is-years" delay={0.1} data-spot>
        <p className="mono">Experience</p>
        <p className="tile-big">
          {profile.yearsExperience}
          <small>yrs</small>
        </p>
        <p className="tile-sub">Team lead since 2025</p>
      </Reveal>
      <Reveal className="tile is-live" delay={0.05} data-spot>
        <p className="mono">Live right now</p>
        <ul>
          {live.map((p) => (
            <li key={p.id}>
              <a href={p.liveUrl} target="_blank" rel="noreferrer">
                <i className="signal-dot" />
                {p.liveUrl.replace(/^https?:\/\/(www\.)?/, '')}
                <ArrowUpRight size={14} />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal className="tile is-core" delay={0.1} data-spot>
        <p className="mono">Core stack</p>
        <div className="chips">
          {['Node.js', 'NestJS', 'PostgreSQL', 'React', 'Next.js', 'Kotlin'].map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal className="tile is-terms" delay={0.15} data-spot>
        <p className="mono">Works with</p>
        <p className="tile-mid">Clients in India and abroad</p>
        <p className="tile-sub">{profile.languages} · INR, USD or EUR</p>
      </Reveal>
    </div>
  )
}

export default function AboutTeaser({ num }) {
  return (
    <section className="section about" id="about" data-hud="About">
      <div className="container">
        <div className="about-top">
          <SectionHead num={num} label="About" title={'Backend at the core, the *whole* product around it.'} />
          <div className="about-body">
            <Reveal as="p" className="about-lead">
              {about.lead}
            </Reveal>
            <Reveal as="p" delay={0.05}>
              {about.paragraphs[1]}
            </Reveal>
            <Reveal className="section-cta" delay={0.1}>
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
        <Bento />
      </div>
    </section>
  )
}
