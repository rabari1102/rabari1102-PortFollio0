import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from '../ui/SectionHead'
import Reveal from '../ui/Reveal'
import CaseCard from './CaseCard'
import { featured, projects } from '../../data/projects'
import { useMediaQuery } from '../../lib/hooks'

// The home page's centrepiece: the strongest client projects, shown large.
export default function SelectedWork() {
  const ref = useRef(null)
  // Keep this query in step with the stacking media query in sections.css.
  const stacked = useMediaQuery('(min-width: 1180px) and (min-height: 760px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const client = projects.filter((p) => p.kind === 'freelance').length
  const team = projects.length - client

  return (
    <section className="section work" id="work">
      <div className="container">
        <SectionHead
          num="01"
          label="Selected work"
          title={"Things I've *actually* shipped."}
          intro="Four products I designed and built on my own for clients. Each one replaced paper, spreadsheets or a tool that was holding the business back."
        />
      </div>

      <div className="container case-stack" ref={ref}>
        {featured.map((p, i) => (
          <CaseCard key={p.id} project={p} i={i} total={featured.length} progress={scrollYProgress} stacked={stacked} />
        ))}
      </div>

      <div className="container">
        <Reveal className="work-more">
          <p>
            <b>{projects.length} projects in all.</b> {client} built solo for my own clients, {team} built or led inside product teams. The two are always
            labelled, so you know which is which.
          </p>
          <Link to="/work" className="btn btn-ghost btn-lg">
            See all {projects.length} projects <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
