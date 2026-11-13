import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AboutFacts } from '../AboutTeaser'
import { about } from '../../data/site'

const TEXT = `${about.lead} ${about.paragraphs[2]}`
const WORDS = TEXT.split(' ')

// A statement that "inks in" word by word as it is scrolled through.
// It is delivered fully inked. Script only dims the words that have not been reached yet, and
// does nothing at all for visitors who ask for reduced motion.
export default function Manifesto({ num }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const words = [...el.querySelectorAll('.mf-w')]
    let lit = -1
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the top of the text reaches 85% of the screen, 1 when its bottom reaches 45%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)))
      const n = Math.round(p * words.length)
      if (n === lit) return
      words.forEach((w, i) => w.classList.toggle('is-off', i >= n))
      lit = n
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
      words.forEach((w) => w.classList.remove('is-off'))
    }
  }, [])

  return (
    <section className="section manifesto" id="about">
      <div className="container mf-grid">
        <p className="section-label mono">
          {num && <span className="sl-num">{num}</span>}
          <span className="sl-rule" aria-hidden="true" />
          About
        </p>

        <h2 className="mf-text" ref={ref} aria-label={TEXT}>
          {WORDS.map((w, i) => (
            <span className="mf-w" key={i} aria-hidden="true">
              {w}{' '}
            </span>
          ))}
        </h2>

        <div className="mf-side">
          <AboutFacts />
          <Link to="/about" className="tlink">
            More about me and my experience <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
