import Reveal from '../ui/Reveal'
import { heroFacts } from '../../data/site'

// Four figures, set like the statistics line under a newspaper masthead.
export default function Facts() {
  return (
    <section className="facts" aria-label="In numbers">
      <div className="container">
        <dl className="facts-row">
          {heroFacts.map((f, i) => (
            <Reveal className="fact" key={f.label} delay={i * 0.06}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
