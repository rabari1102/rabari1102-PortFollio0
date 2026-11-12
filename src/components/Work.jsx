import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import Scramble from './fx/Scramble'
import ProjectCover from './ProjectCover'
import { projects } from '../data/projects'
import { useFinePointer, useMediaQuery } from '../lib/hooks'

export const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android' }
const pad = (n) => String(n).padStart(2, '0')

// One client project as a big "case file" card. On tall desktop screens the cards pin near the
// top and stack: each new one slides over the last, which shrinks back a little like a deck.
function CaseCard({ project, i, total, progress, stacked }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.032])
  const dim = useTransform(progress, [(i + 0.35) / total, (i + 1) / total], [0, 0.5])
  const numbers = project.numbers.slice(0, 3)
  const stack = Object.values(project.stack).flat().slice(0, 4)
  const to = `/work/${project.id}`

  return (
    <div className="case-slot" style={{ '--i': i }}>
      <motion.article className="case" style={{ '--c': project.accent, scale: stacked ? scale : 1 }} data-spot>
        <div className="case-info">
          <p className="case-meta mono">
            <span className="case-idx">
              {pad(i + 1)} <i>/ {pad(total)}</i>
            </span>
            <span>{project.sector}</span>
            <span>{platformLabel[project.platform]}</span>
          </p>
          <h3 className="case-title">
            <Link to={to}>{project.title}</Link>
          </h3>
          <p className="case-tagline">{project.tagline}</p>
          <dl className="case-numbers">
            {numbers.map((n) => (
              <div key={n.label}>
                <dt>{n.value}</dt>
                <dd>{n.label}</dd>
              </div>
            ))}
          </dl>
          <div className="case-foot">
            <div className="chips">
              {stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <Link to={to} className="link-arrow" aria-label={`Read the ${project.title} case study`}>
              Read the case study
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </div>
        </div>
        <Link to={to} className="case-cover" data-cursor="View" tabIndex={-1} aria-hidden="true">
          <ProjectCover project={project} />
        </Link>
        {/* Cards fade back as the next one covers them; the last card is never covered. */}
        {stacked && i < total - 1 && <motion.span className="case-dim" style={{ opacity: dim }} aria-hidden="true" />}
      </motion.article>
    </div>
  )
}

// The cover that follows the cursor while it hovers the team list.
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCover project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Work() {
  const freelance = projects.filter((p) => p.kind === 'freelance')
  const team = projects.filter((p) => p.kind === 'team')

  const stackRef = useRef(null)
  const stacked = useMediaQuery('(min-width: 1180px) and (min-height: 760px)')
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  const fine = useFinePointer()
  const [hover, setHover] = useState(null)
  const mx = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const my = useSpring(useMotionValue(0), { stiffness: 260, damping: 26 })
  const onListMove = (e) => {
    mx.set(e.clientX)
    my.set(e.clientY)
  }

  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionHead
          num="01"
          label="Selected work"
          title={"Things I've *actually* shipped."}
          intro="Six products I built on my own for clients, from a children's hospital to a bank automation tool. Then seven systems I built or led inside product companies. The two are kept apart on purpose, so you always know which is which."
        />

        <h3 className="group-label mono">
          <b>Client work</b>
          <span className="rule" aria-hidden="true" />
          <Scramble text="designed, built and shipped solo" />
        </h3>
      </div>

      <div className="container case-stack" ref={stackRef}>
        {freelance.map((p, i) => (
          <CaseCard key={p.id} project={p} i={i} total={freelance.length} progress={scrollYProgress} stacked={stacked} />
        ))}
      </div>

      <div className="container">
        <h3 className="group-label mono is-team">
          <b>Inside teams</b>
          <span className="rule" aria-hidden="true" />
          <Scramble text="as engineer or team lead · 2023–2026" />
        </h3>

        <ul className="team-list" onPointerMove={fine ? onListMove : undefined} onPointerLeave={() => setHover(null)}>
          {team.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 0.04} y={18}>
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
            </Reveal>
          ))}
        </ul>
        {fine && <HoverPreview project={hover} x={mx} y={my} />}
        <p className="fineprint">
          Team projects were built for employers and their customers. I describe my own part in them and leave the confidential details out.
        </p>
      </div>
    </section>
  )
}
