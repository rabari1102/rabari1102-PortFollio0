import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { profile } from '../data/site'
import { useClock, useTheme } from '../lib/hooks'

const links = [
  { href: '/#work', id: 'work', label: 'Work' },
  { href: '/#verify', id: 'verify', label: 'Verify me' },
  { href: '/#pricing', id: 'pricing', label: 'Pricing' },
  { href: '/#services', id: 'services', label: 'Services' },
  { href: '/#process', id: 'process', label: 'Process' },
  { href: '/#faq', id: 'faq', label: 'FAQ' },
]

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button className="icon-btn theme-toggle" onClick={toggle} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const lastY = useRef(0)
  const location = useLocation()
  const { time } = useClock(profile.timezone)

  // Slide the bar away on the way down, bring it back on the way up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 500)
        lastY.current = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section being read.
  useEffect(() => {
    if (location.pathname !== '/') {
      setActive('')
      return
    }
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
          // Leaving a section without entering another (e.g. back up to the hero) clears the highlight.
          else setActive((a) => (a === e.target.id ? '' : a))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="Pragnesh Kalotara, home">
          pragnesh
          <i />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className={active === l.id ? 'is-active' : ''}>
              {active === l.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <span className="nav-clock mono" title="Local time in Ahmedabad">
            <i className="pulse-dot" /> {time} IST
          </span>
          <ThemeToggle />
          <Link to="/#contact" className="btn btn-primary btn-sm nav-cta">
            Start a project <ArrowUpRight size={16} />
          </Link>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              {links.map((l, i) => (
                <div className="mobile-link-wrap" key={l.href}>
                  <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.18 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Link to={l.href} className="mobile-link">
                      <span className="mono">0{i + 1}</span> {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div className="mobile-foot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <Link to="/#contact" className="btn btn-primary">
                Get a free quote <ArrowUpRight size={18} />
              </Link>
              <p className="mono">
                <i className="pulse-dot" /> {profile.availability}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
