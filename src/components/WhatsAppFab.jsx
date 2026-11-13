import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { WhatsappIcon } from './ui/Icons'
import { profile } from '../data/site'

// A quiet shortcut to WhatsApp that appears once the visitor has scrolled a screen down,
// and steps aside when a contact section (which has the same link) is on screen.
export default function WhatsAppFab() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      const r = contact?.getBoundingClientRect()
      const contactOnScreen = r ? r.top < window.innerHeight * 0.9 && r.bottom > 0 : false
      setShow(window.scrollY > window.innerHeight * 0.9 && !contactOnScreen)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const text = encodeURIComponent("Hi Pragnesh, I found your website and I'd like to talk about a project.")

  return (
    <aside aria-label="Quick contact" data-behind-menu>
      <AnimatePresence>
        {show && (
          <motion.a
            className="fab"
            href={`https://wa.me/${profile.whatsapp}?text=${text}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Pragnesh on WhatsApp"
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          >
            <WhatsappIcon width={22} height={22} />
            <span>Chat on WhatsApp</span>
          </motion.a>
        )}
      </AnimatePresence>
    </aside>
  )
}
