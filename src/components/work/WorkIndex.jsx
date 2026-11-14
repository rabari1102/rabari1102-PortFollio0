import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '../ProjectCover'

const pad = (n) => String(n).padStart(2, '0')

// The work, as an index: one ruled row per project.
// With a mouse, the project's picture floats beside the pointer while a row is hovered (the
// list only writes the pointer position into two CSS variables; the rest is CSS). On touch
// screens the same picture sits inside the row instead.
export default function WorkIndex({ items, start = 0 }) {
  const list = useRef(null)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    list.current.style.setProperty('--px', `${e.clientX}px`)
    list.current.style.setProperty('--py', `${e.clientY}px`)
  }

  return (
    <ul className="index" ref={list} onPointerMove={onMove}>
      {items.map((p, i) => (
        <li key={p.id}>
          <Link to={`/work/${p.id}`} className="irow" style={{ '--c': p.accent }}>
            <span className="irow-idx mono">{pad(start + i + 1)}</span>
            <span className="irow-title">
              {p.title}
              {p.liveUrl && (
                <span className="live-tag mono">
                  <i className="signal-dot" aria-hidden="true" /> Live
                </span>
              )}
            </span>
            <span className="irow-tag">{p.tagline}</span>
            <span className="irow-sector mono">{p.sector}</span>
            <span className="irow-year mono">{p.year}</span>
            <ArrowUpRight className="irow-arrow" size={26} strokeWidth={1.2} aria-hidden="true" />
            <span className="irow-cover" aria-hidden="true">
              <ProjectCover project={p} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
