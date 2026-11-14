import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Moon, Search, Sun } from 'lucide-react'
import { profile } from '../data/site'
import { projects } from '../data/projects'
import { useClock, useMounted, useTheme } from '../lib/hooks'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const isActive = (pathname, to) => pathname === to || pathname.startsWith(`${to}/`)

function ThemeToggle() {
  const [theme, toggle] = useTheme()
  const mounted = useMounted()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button className="icon-btn theme-toggle" onClick={toggle} aria-label={mounted ? `Switch to ${next} theme` : 'Switch colour theme'}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const header = useRef(null)
  const burger = useRef(null)
  const { pathname } = useLocation()
  const location = useLocation()
  const clock = useClock(profile.timezone)

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

  useEffect(() => setOpen(false), [location])

  // While the menu is open it behaves like a dialog: the page behind cannot be scrolled or
  // tabbed into, Tab cycles inside the header, Escape closes, and focus returns to the button.
  useEffect(() => {
    if (!open) return
    const behind = document.querySelectorAll('.route, .footer, [data-behind-menu]')
    behind.forEach((el) => el.setAttribute('inert', ''))
    document.body.style.overflow = 'hidden'

    const focusables = () => [...header.current.querySelectorAll('a[href], button:not([disabled])')].filter((el) => el.offsetParent !== null)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const els = focusables()
      const first = els[0]
      const last = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    const toRestore = burger.current

    return () => {
      behind.forEach((el) => el.removeAttribute('inert'))
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      // Only pull focus back if it would otherwise be lost inside the closed menu.
      if (!document.activeElement || document.activeElement === document.body || header.current?.contains(document.activeElement)) toRestore?.focus()
    }
  }, [open])

  return (
    <header ref={header} className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-name">
            {profile.name}
            <span className="sr-only">, home</span>
          </span>
          <span className="logo-role mono">Full-stack developer</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => {
            const active = isActive(pathname, l.to)
            return (
              <Link key={l.to} to={l.to} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>
                <span>{l.label}</span>
                {l.to === '/work' && (
                  <sup className="mono" aria-hidden="true">
                    {projects.length}
                  </sup>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="nav-actions">
          {clock && (
            <span className="nav-clock mono" title="Local time in Ahmedabad">
              <i className="signal-dot" /> {clock.time} IST
            </span>
          )}
          <button
            className="nav-search"
            onClick={() => window.dispatchEvent(new Event('open-palette'))}
            title="Search and quick navigation"
            aria-keyshortcuts="Control+K Meta+K"
          >
            <Search size={16} />
            <span>Search</span>
            <kbd aria-hidden="true">Ctrl K</kbd>
          </button>
          <ThemeToggle />
          <Link to="/contact" className="nav-cta">
            <i className="signal-dot" aria-hidden="true" /> Start a project
          </Link>
          <button
            ref={burger}
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="burger-word mono" aria-hidden="true">
              {open ? 'Close' : 'Menu'}
            </span>
            <span className="burger-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
                <div className="mobile-link-wrap" key={l.to}>
                  <motion.div initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: 0.14 + i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                    <Link to={l.to} className="mobile-link" aria-current={pathname === l.to ? 'page' : undefined}>
                      <span className="mono">0{i + 1}</span> {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div className="mobile-foot" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Discuss a project <ArrowUpRight size={18} />
              </Link>
              <a href={`mailto:${profile.email}`} className="mobile-mail">
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
