import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import Kinetic from './fx/Kinetic'
import Magnetic from './fx/Magnetic'
import { hero, heroPromises, profile } from '../data/site'
import { useClock } from '../lib/hooks'

const RING = 'Selected work · Scroll down · Selected work · Scroll down · '

// The masthead. Nothing but type: a row of facts set like a newspaper's dateline, one very large
// serif sentence, and the two ways forward. Every entrance is CSS, so the headline is painted
// with the HTML and never waits for JavaScript.
export default function Hero() {
  const clock = useClock(profile.timezone)
  return (
    <section className="hero">
      <div className="container">
        <ul className="hero-meta mono in" style={{ '--d': '0ms' }}>
          <li>{profile.role}</li>
          <li>
            {profile.city}
            {clock && <span className="hero-clock"> · {clock.time} IST</span>}
          </li>
          {profile.available && (
            <li>
              <i className="signal-dot" aria-hidden="true" /> {profile.availability}
            </li>
          )}
          <li className="hero-meta-end">Web · Android · Desktop · Backend</li>
        </ul>

        <Kinetic as="h1" mode="css" text={hero.title} className="hero-title" />

        <div className="hero-foot">
          <div className="hero-lede">
            <p className="hero-sub in" style={{ '--d': '420ms' }}>
              {hero.sub}
            </p>
            <div className="hero-cta in" style={{ '--d': '500ms' }}>
              <Magnetic>
                <Link to="/contact" className="btn btn-primary btn-lg" data-cursor="Let’s talk">
                  Discuss a project <ArrowUpRight size={18} />
                </Link>
              </Magnetic>
              <Link to="/work" className="btn btn-ghost btn-lg">
                See all the work
              </Link>
            </div>
          </div>

          <ul className="hero-promises in" style={{ '--d': '580ms' }}>
            {heroPromises.map((p, i) => (
              <li key={p}>
                <span className="mono" aria-hidden="true">
                  0{i + 1}
                </span>
                {p}
              </li>
            ))}
          </ul>

          <a href="#work" className="hero-ring pop" style={{ '--d': '640ms' }}>
            <span className="sr-only">Scroll down to selected work</span>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="hero-ring-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#hero-ring-path" textLength="286">
                  {RING}
                </textPath>
              </text>
            </svg>
            <ArrowDown size={26} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
