import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import Reveal from './ui/Reveal'

const categories = ['ALL', 'FULL STACK', 'AI', 'IOT', 'SAAS']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <Reveal direction="up" className="sec-header-center">
          <span className="sec-label">FLAGSHIP PORTFOLIO</span>
          <h2 className="sec-title">Featured Projects</h2>
          <div className="sec-divider"></div>
        </Reveal>

        {/* Dynamic Category Filter Bar */}
        <Reveal direction="up" delay={0.1} className="filter-bar-container">
          <div className="filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                data-cursor="FILTER"
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    className="filter-active-pill"
                    layoutId="filterPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Projects List Container */}
        <div className="projects-list">
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter} className="projects-grid-wrap">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
