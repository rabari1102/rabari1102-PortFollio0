import { Star } from './ui/Scribbles'
import { marqueeWords } from '../data/site'

function Row({ words, reverse }) {
  // Rendered twice so the CSS loop is seamless.
  const items = [...words, ...words]
  return (
    <div className={`marquee-row ${reverse ? 'is-reverse' : ''}`}>
      {items.map((w, i) => (
        <span key={i} className="marquee-item" aria-hidden={i >= words.length}>
          {w}
          <Star className="marquee-star" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const half = Math.ceil(marqueeWords.length / 2)
  return (
    <section className="marquee" aria-label="Technologies I work with">
      <Row words={marqueeWords.slice(0, half)} />
      <Row words={marqueeWords.slice(half)} reverse />
    </section>
  )
}
