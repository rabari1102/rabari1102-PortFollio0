import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Seo from './components/Seo'
import Island from './components/ui/Island'
import WhatsAppFab from './components/WhatsAppFab'
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
function ScrollManager() {
  // `key` changes on every navigation, so clicking the same link twice scrolls again.
  const { pathname, hash, key } = useLocation()
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

export default function App() {
  const location = useLocation()
  // The page the visitor lands on is already painted, so it must not fade in from nothing.
  // Only pages reached by clicking a link get the entrance.
  const landed = useRef(location.pathname)
  const isLanding = landed.current === location.pathname
  if (!isLanding) landed.current = null
  useSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <Seo />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <ScrollManager />
      <Nav />
      <motion.div
        key={location.pathname}
        className="route"
        initial={isLanding ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
      {!isLanding && (
        <motion.span
          key={`wipe-${location.pathname}`}
          className="route-wipe"
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 0.5, duration: 0.3 } }}
        />
      )}
      <Island>
        <Footer />
      </Island>
      <WhatsAppFab />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
