import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Seo from './components/Seo'
import Island from './components/ui/Island'
import WhatsAppFab from './components/WhatsAppFab'
import Curtain, { COVER_MS, REVEAL_MS } from './components/fx/Curtain'
import Cursor from './components/fx/Cursor'
import ScrollProgress from './components/fx/ScrollProgress'
import { useSpotlight } from './components/fx/spotlight'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'
import { getProject } from './data/projects'

// Sections that used to live on the one-page home and now have a page of their own.
// Old links such as thepragnesh.in/#estimate keep working.
const MOVED = {
  '#estimate': '/services#estimate',
  '#pricing': '/services#pricing',
  '#why': '/services#pricing',
  '#faq': '/services#faq',
  '#experience': '/about#experience',
}

// Scroll to the #hash after navigation (e.g. "/services#estimate"), otherwise to the top.
function ScrollManager({ location }) {
  // `key` changes on every navigation, so clicking the same link twice scrolls again.
  const { pathname, hash, key } = location
  const navigate = useNavigate()
  const first = useRef(true)

  useEffect(() => {
    if (pathname === '/' && MOVED[hash]) {
      navigate(MOVED[hash], { replace: true })
      return
    }
    const wasFirst = first.current
    first.current = false
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait two frames so the target page has rendered and laid out.
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: wasFirst ? 'instant' : 'smooth' })))
    } else if (!wasFirst) {
      // On the very first load the browser's own scroll position (e.g. after a refresh) is kept.
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key, navigate])
  return null
}

// Downloaded the first time it is opened, so it costs nothing on a normal visit.
const CommandPalette = lazy(() => import('./components/CommandPalette'))

const NAMES = { '/': 'Home', '/work': 'Work', '/services': 'Services', '/about': 'About', '/contact': 'Contact' }
const nameOf = (pathname) => NAMES[pathname] || getProject(pathname.replace('/work/', ''))?.title || 'Not found'

export default function App() {
  const location = useLocation()

  // Page changes go through a curtain: cover the old page, swap, lift off the new one.
  // `shown` is the page currently rendered; it lags `location` by the length of the cover.
  // Visitors who ask for reduced motion, and same-page #anchor jumps, swap at once.
  const [shown, setShown] = useState(location)
  const [phase, setPhase] = useState(null) // null | 'cover' | 'reveal'
  useEffect(() => {
    if (location.pathname === shown.pathname) {
      if (location.key !== shown.key) setShown(location)
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(location)
      return
    }
    setPhase('cover')
    const swap = setTimeout(() => {
      setShown(location)
      setPhase('reveal')
    }, COVER_MS)
    const done = setTimeout(() => setPhase(null), COVER_MS + REVEAL_MS)
    return () => {
      clearTimeout(swap)
      clearTimeout(done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Ctrl / ⌘ + K, or the search button in the header, opens the command palette.
  const [palette, setPalette] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  useEffect(() => {
    if (palette) setPaletteLoaded(true)
  }, [palette])
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((o) => !o)
      }
    }
    const onOpen = () => setPalette(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  useSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <Seo />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <ScrollManager location={shown} />
      <Nav />
      <div className="route">
        <Routes location={shown}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {phase && <Curtain key={phase} phase={phase} label={nameOf(location.pathname)} />}
      <Island>
        <Footer />
      </Island>
      <WhatsAppFab />
      {paletteLoaded && (
        <Suspense fallback={null}>
          <CommandPalette open={palette} onClose={() => setPalette(false)} />
        </Suspense>
      )}
      <div className="gridlines" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
