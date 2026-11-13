import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { profile } from '../data/site'

const NAME = 'pragnesh'

const drop = {
  hidden: { y: '110%', rotate: 8 },
  show: (i) => ({ y: '0%', rotate: 0, transition: { delay: i * 0.06, type: 'spring', stiffness: 150, damping: 17 } }),
}

// The name is drawn twice: a hairline outline, and a lit copy on top that only shows through a
// spotlight. The spotlight follows the cursor, or drifts on its own when nobody is pointing.
function FooterName() {
  const ref = useRef(null)
  const [tracking, setTracking] = useState(false)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const layer = (cls, asText) => (
    <span className={cls} aria-hidden="true">
      {NAME.split('').map((ch, i) => (
        <motion.span key={i} className="fname-ch" data-rv data-ch={asText ? undefined : ch} variants={drop} custom={i}>
          {asText ? ch : null}
        </motion.span>
      ))}
    </span>
  )

  return (
    <motion.div
      ref={ref}
      className={`fname${tracking ? ' is-tracking' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setTracking(true)}
      onPointerLeave={() => setTracking(false)}
      onPointerMove={onMove}
    >
      <Link to="/" className="fname-link" aria-label={`${profile.name}, home`}>
        {layer('fname-outline', true)}
        {layer('fname-fill', false)}
      </Link>
    </motion.div>
  )
}

const cols = [
  {
    title: 'Site',
    links: [
      { to: '/work', label: 'Work' },
      { to: '/services', label: 'Services' },
      { to: '/services#estimate', label: 'Estimate' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Check me',
    links: [
      { href: profile.linkedin, label: 'LinkedIn' },
      { href: profile.github, label: 'GitHub' },
      { href: profile.resume, label: 'CV' },
    ],
  },
  {
    title: 'Reach me',
    links: [
      { href: `mailto:${profile.email}`, label: profile.email, same: true },
      { href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp' },
      { href: profile.phoneHref, label: profile.phone, same: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-line">
            One senior engineer in {profile.city.split(',')[0]}.
            <br />
            Fixed quotes, weekly demos, and the code is <em>yours.</em>
          </p>
          <nav className="footer-cols" aria-label="Footer">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="mono">{c.title}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to}>{l.label}</Link>
                      ) : (
                        <a href={l.href} {...(l.same ? {} : { target: '_blank', rel: 'noreferrer' })}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <FooterName />

        <div className="footer-bottom mono">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {profile.name} · {profile.city}
          </span>
          <span>Built at home with React, a lot of chai and a little help from AI.</span>
          <button className="footer-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
