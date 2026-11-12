import Reveal from './Reveal'
import Kinetic from '../fx/Kinetic'
import Scramble from '../fx/Scramble'

// title: a string for Kinetic, e.g. "Things I've *actually* shipped." (asterisks mark the accent word).
export default function SectionHead({ num, label, title, intro, align = 'left' }) {
  return (
    <header className={`section-head is-${align}`}>
      <p className="section-label mono">
        <span className="sl-num">{num}</span>
        <span className="sl-rule" aria-hidden="true" />
        <Scramble text={label} />
      </p>
      <Kinetic text={title} className="section-title" />
      {intro && (
        <Reveal as="p" className="section-intro" delay={0.15}>
          {intro}
        </Reveal>
      )}
    </header>
  )
}
