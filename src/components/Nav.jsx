import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/site'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#why', label: 'Why cheaper' },
  { href: '/#services', label: 'Services' },
  { href: '/#estimate', label: 'Estimate' },
  { href: '/#process', label: 'Process' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo" aria-label="Pragnesh Kalotara, home">
          pragnesh<span>.</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} to={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/#contact" className="btn btn-ink btn-sm nav-cta">
            Start a project
          </Link>
          <button className="icon-btn nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <Link to={l.href} className="mobile-link">
                  <span className="mono">0{i + 1}</span> {l.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/#contact" className="btn btn-accent mobile-cta">
              Get a free quote
            </Link>
            <p className="mobile-note hand">{profile.availability} ✌︎</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
