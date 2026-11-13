import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '../ProjectCover'
import { pad } from './CaseCard'
import { useFinePointer } from '../../lib/hooks'

// The cover that follows the cursor while it hovers the list. Mouse only; decoration, not content.
function HoverPreview({ project, x, y }) {
  return (
    <motion.div className="team-preview" style={{ x, y }} aria-hidden="true">
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.id}
            className="team-preview-card"
            initial={{ opacity: 0, scale: 0.86, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCover project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Projects built inside product teams, as a compact list. Each row opens its case study.
export default function TeamList({ items }) {
  const fine = useFinePointer()
  const [hover, setHover] = useState(null)
  const mx = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const my = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const onMove = (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  return (
    <>
      <ul className="team-list" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setHover(null)}>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((p, i) => (
            <motion.li key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Link
                to={`/work/${p.id}`}
                className="team-row"
                style={{ '--c': p.accent }}
                onPointerEnter={() => fine && setHover(p)}
                onFocus={() => setHover(null)}
              >
                <span className="team-idx mono">{pad(i + 1)}</span>
                <span className="team-title">{p.title}</span>
                <span className="team-tag">{p.tagline}</span>
                <span className="team-sector mono">{p.sector}</span>
                <span className="team-year mono">{p.year}</span>
                <span className="round-arrow">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {fine && <HoverPreview project={hover} x={mx} y={my} />}
    </>
  )
}
