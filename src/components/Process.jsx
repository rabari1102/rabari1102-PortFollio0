import { useEffect, useRef } from 'react'
import SectionHead from './ui/SectionHead'
import { payment, process } from '../data/services'

const pad = (n) => String(n).padStart(2, '0')

// How a project runs, as a strip of panels.
// On a phone, with JavaScript off, or with reduced motion it is an ordinary vertical list.
// On wide screens the section pins and the strip travels sideways as the page is scrolled
// (the CSS switches the layout; this effect only moves the strip).
export default function Process({ num }) {
  const wrap = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useEffect(() => {
    const el = wrap.current
    const tr = track.current
    if (!el || !tr) return
    let raf = 0
    const update = () => {
      raf = 0
      // The CSS decides whether the strip is pinned; when it is not, leave it alone.
      if (getComputedStyle(tr).display !== 'flex') {
        tr.style.transform = ''
        return
      }
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0
      const max = Math.max(0, tr.scrollWidth - tr.parentElement.clientWidth)
      tr.style.transform = `translate3d(${-p * max}px, 0, 0)`
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="process" id="process" ref={wrap} style={{ '--n': process.length + 1 }}>
      <div className="proc-pin">
        <div className="container">
          <SectionHead num={num} label="Process" title={'From first call to launch,\n*no* *surprises.*'} />
        </div>

        <div className="proc-window">
          <ol className="proc-track" ref={track}>
            {process.map((s, i) => (
              <li className="proc-step" key={s.step}>
                <p className="proc-n" aria-hidden="true">
                  {pad(i + 1)}
                </p>
                <p className="proc-time mono">{s.time}</p>
                <h3>{s.step}</h3>
                <p className="proc-text">{s.text}</p>
              </li>
            ))}
            <li className="proc-step is-pay">
              <p className="proc-time mono">How you pay</p>
              <h3>Three milestones, never all upfront</h3>
              <ul className="proc-pay">
                {payment.map((m) => (
                  <li key={m.label} style={{ '--w': m.pct }}>
                    <b>{m.pct}%</b>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </div>

        <div className="container proc-progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  )
}
