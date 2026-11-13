import Reveal from './ui/Reveal'
import Marquee from './Marquee'
import { heroFacts } from '../data/site'

// The credibility strip: four figures taken from the project and experience data,
// then the technologies those projects were built with.
export default function Cred() {
  return (
    <section className="cred" aria-label="At a glance">
      <div className="container">
        <dl className="cred-facts">
          {heroFacts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.06} y={16}>
              <dt>{f.value}</dt>
              <dd>{f.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
      <Marquee />
    </section>
  )
}
