import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './ui/MagneticButton'

const roles = [
  'Team Lead & Full-Stack Developer',
  'NestJS & Access Control Architect',
  'Multi-Tenant SaaS Builder',
  'IoT Telemetry Architect',
  'AI-Augmented Developer'
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [copied, setCopied] = useState(false)
  const heroRef = useRef(null)
  const bgGradRef = useRef(null)

  useEffect(() => {
    const full = roles[roleIdx]
    let timer

    if (!deleting && displayed.length < full.length) {
      timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55)
    } else if (!deleting && displayed.length === full.length) {
      timer = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, roleIdx])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY
    let rafId

    const onMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }

    const loop = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      if (bgGradRef.current) {
        bgGradRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`
      }
      rafId = requestAnimationFrame(loop)
    }

    hero.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(loop)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('pkb110201@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const navTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const titleWordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section ref={heroRef} id="home" className="hero-section">
      <div ref={bgGradRef} className="hero-interactive-grad" aria-hidden="true"></div>

      <div className="container">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-content">
            <motion.div variants={itemVariants} className="hero-eyebrow-row">
              <div className="hero-badge-emerald">
                <span className="pulse-dot"></span>
                AVAILABLE FOR OPPORTUNITIES · WORLDWIDE
              </div>
              <div className="hero-badge-violet">
                <span className="ai-spark">🤖</span>
                AI-AUGMENTED DEVELOPER
              </div>
            </motion.div>

            <motion.h1 className="hero-main-title">
              <motion.span variants={titleWordVariants} className="title-part-1">
                PRAGNESH
              </motion.span>
              <br />
              <motion.span variants={titleWordVariants} className="title-part-2">
                KALOTARA
              </motion.span>
            </motion.h1>

            <motion.div variants={itemVariants} className="hero-typing-box">
              <span className="typing-text">{displayed}</span>
              <span className="typing-cursor">|</span>
            </motion.div>

            <motion.p variants={itemVariants} className="hero-description">
              Results-driven <strong className="text-highlight">Team Lead & Full-Stack Engineer</strong> with <strong className="text-highlight">3.7+ years of experience</strong> architecting multi-tenant SaaS platforms, sub-millisecond access governance engines, and IoT telemetry streams using <strong className="text-highlight">NestJS, React, TypeScript & PostgreSQL</strong>.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-metric-strip">
              <div className="metric-chip">👑 <strong>Team Lead</strong> @ Binstellar</div>
              <div className="chip-sep">·</div>
              <div className="metric-chip">🔒 <strong>BeSecure</strong> Authorizer</div>
              <div className="chip-sep">·</div>
              <div className="metric-chip">📡 <strong>5,000+</strong> IoT Devices</div>
              <div className="chip-sep">·</div>
              <div className="metric-chip">⚡ <strong>99.9%</strong> Uptime SLA</div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-btn-group">
              <MagneticButton
                className="btn-hero-primary"
                onClick={() => navTo('contact')}
                data-cursor="HIRE ME"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Hire Me
              </MagneticButton>

              <a
                href="https://drive.google.com/file/d/1_IHmO_vryoPm7FxL2Gb22nzxygXhOrw9/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-secondary"
                data-cursor="DOWNLOAD ↗"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume ↗
              </a>

              <button
                className="btn-hero-ghost"
                onClick={copyEmail}
                data-cursor="COPY"
              >
                {copied ? 'Copied ✓' : 'Copy Email'}
              </button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="hero-terminal-wrapper">
            <div className="terminal-card card-spotlight">
              <div className="terminal-header">
                <span className="term-dot dot-red"></span>
                <span className="term-dot dot-yellow"></span>
                <span className="term-dot dot-green"></span>
                <span className="term-title">zsh — pragnesh@dev</span>
              </div>
              <div className="terminal-body">
                <div className="term-line">
                  <span className="term-prompt">➜</span>
                  <span className="term-path">~</span>
                  <span className="term-cmd">whoami</span>
                </div>
                <div className="term-output-cyan">pragnesh_kalotara</div>

                <div className="term-line term-space">
                  <span className="term-prompt">➜</span>
                  <span className="term-path">~</span>
                  <span className="term-cmd">cat profile.json</span>
                </div>
                <div className="term-json-block">
                  <span className="term-brace">{'{'}</span>
                  <div className="term-json-row"><span className="json-key">"current_role"</span>: <span className="json-str">"Team Lead & Full-Stack Dev @ Binstellar"</span>,</div>
                  <div className="term-json-row"><span className="json-key">"flagship_system"</span>: <span className="json-str">"BeSecure Multi-Tenant IAM Platform"</span>,</div>
                  <div className="term-json-row"><span className="json-key">"primary_stack"</span>: <span className="json-str">["NestJS", "React", "TypeScript", "Postgres"]</span>,</div>
                  <div className="term-json-row"><span className="json-key">"total_exp"</span>: <span className="json-str">"3.7+ years"</span>,</div>
                  <div className="term-json-row"><span className="json-key">"teams_led"</span>: <span className="json-str">"Binstellar & Qfact (6+ Devs)"</span>,</div>
                  <div className="term-json-row"><span className="json-key">"permission_check_speed"</span>: <span className="json-str">"&lt;1ms"</span>,</div>
                  <div className="term-json-row"><span className="json-key">"available"</span>: <span className="json-bool">true</span></div>
                  <span className="term-brace">{'}'}</span>
                </div>

                <div className="term-line term-space">
                  <span className="term-prompt">➜</span>
                  <span className="term-path">~</span>
                  <span className="term-cmd">./get_in_touch.sh</span>
                </div>
                <div className="term-output-emerald">✅ System online. Ready to architect high-scale software!</div>
                <div className="term-cursor-row">
                  <span className="term-prompt">➜</span>
                  <span className="term-path">~</span>
                  <span className="term-blink">▋</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
