import Reveal from './Reveal'
import Kinetic from '../fx/Kinetic'
import Scramble from '../fx/Scramble'

// The heading of a section further down a page: it animates when scrolled into view.
// title: a string for Kinetic, e.g. "Things I've *actually* shipped." (asterisks mark the accent word).
export default function SectionHead({ num, label, title, intro, as = 'h2', children }) {
  return (
    <header className="section-head">
      <p className="section-label mono">
        {num && <span className="sl-num">{num}</span>}
        <span className="sl-rule" aria-hidden="true" />
        <Scramble text={label} />
      </p>
      <Kinetic as={as} text={title} className="section-title" />
      {intro && (
        <Reveal as="p" className="section-intro" delay={0.1}>
          {intro}
        </Reveal>
      )}
      {children}
    </header>
  )
}
