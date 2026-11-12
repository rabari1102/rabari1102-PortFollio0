import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Cursor from './components/fx/Cursor'
import Preloader, { shouldPlayIntro } from './components/fx/Preloader'
import ScrollProgress from './components/fx/ScrollProgress'
import { useSpotlight } from './components/fx/spotlight'
import { IntroContext } from './lib/intro'
import Home from './pages/Home'
import ProjectPage from './pages/ProjectPage'
import NotFound from './pages/NotFound'

// Scroll to the #hash after navigation (e.g. "/#work" from a project page), otherwise to the top.
function ScrollManager() {
  // `key` changes on every navigation, so clicking the same "#work" link twice scrolls again.
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Wait two frames so the target page has rendered and laid out.
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })))
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])
  return null
}

export default function App() {
  const location = useLocation()
  // Only the home page gets the opening curtain; deep links to a case study open straight away.
  const [intro, setIntro] = useState(() => location.pathname === '/' && shouldPlayIntro())
  // `ready` flips as the curtain starts to lift, so the hero animates in underneath it.
  const [ready, setReady] = useState(!intro)
  useSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={ready}>
        {intro && <Preloader onLift={() => setReady(true)} onDone={() => setIntro(false)} />}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <Cursor />
        <ScrollManager />
        <Nav />
        {/* Keyed by path: each page fades in, and a thin ember wipe marks the change. */}
        <motion.div key={location.pathname} className="route" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:id" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
        <motion.span
          key={`wipe-${location.pathname}`}
          className="route-wipe"
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 0.6, duration: 0.3 } }}
        />
        <Footer />
        <WhatsAppFab />
        <div className="grain" aria-hidden="true" />
      </IntroContext.Provider>
    </MotionConfig>
  )
}
