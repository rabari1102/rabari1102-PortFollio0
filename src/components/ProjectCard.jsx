import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      className="proj-compact-card card-spotlight"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      data-cursor="HOVER FOR DETAILS"
    >
      {/* Top Header Row */}
      <div className="compact-card-header">
        <span className="compact-cat-badge">0{index + 1} · {project.category}</span>
        <span className="compact-status-dot" title="Production System"></span>
      </div>

      {/* Title & Subtitle */}
      <h3 className="compact-card-title">{project.title}</h3>
      <p className="compact-card-sub">{project.subtitle}</p>

      {/* Main Metric Banner */}
      {project.metrics && project.metrics[0] && (
        <div className="compact-metric-banner">
          <span className="metric-highlight-val">{project.metrics[0].value}</span>
          <span className="metric-highlight-lbl">{project.metrics[0].label}</span>
        </div>
      )}

      {/* Compact Core Summary */}
      <p className="compact-summary-text">
        {project.problem ? project.problem.slice(0, 110) + '...' : project.role}
      </p>

      {/* Tech Tags */}
      <div className="compact-tags-row">
        {project.tags.slice(0, 3).map((t) => (
          <span key={t} className="compact-tech-tag">{t}</span>
        ))}
        {project.tags.length > 3 && (
          <span className="compact-tech-tag">+{project.tags.length - 3} more</span>
        )}
      </div>

      <div className="hover-hint-bar">
        <span>Hover for Full System Spec ↗</span>
      </div>

      {/* ON HOVER FULL DATA POPUP OVERLAY */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="proj-hover-popup"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="popup-header">
              <div>
                <span className="popup-cat-tag">0{index + 1} · {project.category}</span>
                <h4 className="popup-title">{project.title}</h4>
              </div>
              <span className="popup-live-badge">PRODUCTION SPEC</span>
            </div>

            <div className="popup-sub">{project.subtitle}</div>
            <div className="popup-arch">// {project.architecture}</div>

            {/* Topology Flow in Popup */}
            {project.topology && (
              <div className="popup-topology-wrap">
                <div className="popup-top-label">SYSTEM TOPOLOGY PIPELINE</div>
                <div className="popup-top-flow">
                  {project.topology.map((t, i) => (
                    <div key={t.step} className="popup-top-step">
                      <span className="top-step-num">{t.step}:</span>
                      <span className="top-step-val">{t.detail}</span>
                      {i < project.topology.length - 1 && <span className="top-arrow">➔</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics Chips */}
            <div className="popup-metrics-row">
              {project.metrics.map((m) => (
                <div key={m.label} className="popup-metric-chip">
                  <div className="chip-v">{m.value}</div>
                  <div className="chip-l">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Problem & Role */}
            <div className="popup-body-block">
              <p><strong>Challenge:</strong> {project.problem}</p>
              <p><strong>Role & Action:</strong> {project.role}</p>
            </div>

            {/* System Impact */}
            <div className="popup-outcome">
              ⚡ <strong>Impact:</strong> {project.outcome}
            </div>

            {/* Full Tech Tags */}
            <div className="popup-tags-wrap">
              {project.tags.map((t) => (
                <span key={t} className="popup-tag-pill">{t}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
