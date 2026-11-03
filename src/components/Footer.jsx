import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { profile } from '../data/site'

const NAME = 'pragnesh'
const lastName = profile.name.split(' ').slice(1).join(' ')

const drop = {
  hidden: { y: '110%', rotate: 8 },
  show: (i) => ({ y: '0%', rotate: 0, transition: { delay: i * 0.06, type: 'spring', stiffness: 150, damping: 17 } }),
}

// The name is drawn twice: a hairline outline, and a gradient copy on top that only shows
// through a spotlight. The spotlight follows the cursor, or drifts on its own when nobody is pointing.
function FooterName() {
  const ref = useRef(null)
  const [tracking, setTracking] = useState(false)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const layer = (cls) => (
    <span className={cls} aria-hidden="true">
      {NAME.split('').map((ch, i) => (
        <motion.span key={i} className="fname-ch" variants={drop} custom={i}>
          <span className="fname-in" style={{ '--i': i, '--n': NAME.length }}>
            {ch}
          </span>
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
      <Link to="/#top" className="fname-link" aria-label={`${profile.name}, back to the top`}>
        {layer('fname-outline')}
        {layer('fname-fill')}
      </Link>
      <motion.span
        className="fname-tag mono"
        variants={{
          hidden: { opacity: 0, scale: 0.5, rotate: -40 },
          show: { opacity: 1, scale: 1, rotate: -9, transition: { delay: 0.75, type: 'spring', stiffness: 220, damping: 13 } },
        }}
      >
        {lastName} <i>✦</i> {profile.city.split(',')[0]}
      </motion.span>
      <motion.span
        className="fname-hand hand"
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.6 } } }}
      >
        a real human made this, promise ↑
      </motion.span>
    </motion.div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-line">
            Built at home in Ahmedabad with React, a lot of chai
            <br />
            and a little help from AI. Like everything else here.
          </p>
          <button className="btn btn-ghost btn-sm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={16} />
          </button>
        </div>
        <FooterName />
        <div className="footer-bottom mono">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a> ·{' '}
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> ·{' '}
            <a href={`mailto:${profile.email}`}>Email</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
