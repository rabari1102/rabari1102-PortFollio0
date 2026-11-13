import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useMediaQuery } from '../../lib/hooks'

// The instrument frame: a ruler down the right edge with one tick per section and a marker that
// rides the scroll, plus a readout in the bottom-left corner naming the section on screen.
// Decoration for wide screens with a mouse. It reads the page; it never controls it.
// Phones and tablets never mount the frame at all: no scroll tracking, no observers.
export default function Hud() {
  const wide = useMediaQuery('(min-width: 1180px) and (hover: hover) and (pointer: fine)')
  return wide ? <Frame /> : null
}

function Frame() {
  const wide = true
  const { pathname } = useLocation()
  const [sections, setSections] = useState([])
  const [active, setActive] = useState(0)
  const pct = useRef(null)

  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  const top = useTransform(smooth, (v) => `${v * 100}%`)

  // Find the labelled sections of the current page and where each one starts.
  useEffect(() => {
    if (!wide) return
    let els = []
    const measure = () => {
      els = [...document.querySelectorAll('[data-hud]')]
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setSections(els.map((el) => ({ label: el.dataset.hud, at: Math.min(1, Math.max(0, (el.getBoundingClientRect().top + window.scrollY) / total)) })))
    }
    // The new page's sections exist only after the route has rendered and laid out.
    const t = setTimeout(measure, 700)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4
      let i = 0
      els.forEach((el, n) => {
        if (el.getBoundingClientRect().top + window.scrollY <= y) i = n
      })
      setActive(i)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [wide, pathname])

  // The percentage is written straight to the DOM: it changes every frame and needs no re-render.
  useEffect(() => smooth.on('change', (v) => pct.current && (pct.current.textContent = String(Math.round(v * 100)).padStart(3, '0'))), [smooth])

  if (!wide || sections.length < 2) return null
  const current = sections[Math.min(active, sections.length - 1)]

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-ruler">
        {sections.map((s, i) => (
          <span key={s.label + i} className={`hud-tick ${i === active ? 'is-on' : ''}`} style={{ top: `${s.at * 100}%` }}>
            <i>{s.label}</i>
          </span>
        ))}
        <motion.span className="hud-marker" style={{ top }} />
      </div>
      <p className="hud-read mono">
        <span className="hud-idx">
          {String(active + 1).padStart(2, '0')}
          <i>/{String(sections.length).padStart(2, '0')}</i>
        </span>
        <span className="hud-label" key={current.label}>
          {current.label}
        </span>
        <span className="hud-pct">
          <b ref={pct}>000</b>%
        </span>
      </p>
    </div>
  )
}
