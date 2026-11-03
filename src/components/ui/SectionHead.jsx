import Reveal from './Reveal'

export default function SectionHead({ num, label, title, intro, align = 'left' }) {
  return (
    <Reveal className={`section-head is-${align}`}>
      <p className="section-label mono">
        <span>§ {num}</span> {label}
      </p>
      <h2 className="section-title display">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  )
}
