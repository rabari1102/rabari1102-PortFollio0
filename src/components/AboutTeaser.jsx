import { about } from '../data/site'

// The four practical facts a client asks first. Used on the home page and on /about.
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
