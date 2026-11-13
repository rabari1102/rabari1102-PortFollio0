import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileSignature, GitBranch, KeyRound, LifeBuoy, MonitorPlay, PieChart, Quote, ShieldCheck } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { getProject } from '../data/projects'
import { profile, protections, testimonials, verifyChecks } from '../data/site'

const icons = { split: PieChart, git: GitBranch, key: KeyRound, demo: MonitorPlay, doc: FileSignature, fix: LifeBuoy }

const hrefs = {
  linkedin: profile.linkedin,
  github: profile.github,
  resume: profile.resume,
  phone: `https://wa.me/${profile.whatsapp}`,
  call: '/contact',
}

// A checkbox that draws itself: the ring closes, then the tick is written in.
function Tick({ delay }) {
  const view = { once: true, margin: '0px 0px -80px 0px' }
  return (
    <svg className="vtick" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14" className="vtick-bg" />
      <motion.circle
        cx="16"
        cy="16"
        r="14"
        className="vtick-ring"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ delay, duration: 0.7, ease: 'easeInOut' }}
      />
      <motion.path
        d="M10 16.5 L14.4 21 L22.5 11.5"
        className="vtick-mark"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={view}
        transition={{ pathLength: { delay: delay + 0.55, duration: 0.35, ease: 'easeOut' }, opacity: { delay: delay + 0.55, duration: 0.01 } }}
      />
    </svg>
  )
}

function Check({ item, i }) {
  const href = hrefs[item.key]
  const internal = href.startsWith('/')
  const body = (
    <>
      <Tick delay={0.15 + i * 0.22} />
      <span className="vcheck-body">
        <strong>{item.title}</strong>
        <span>{item.text}</span>
      </span>
      <span className="vcheck-cta mono">
        {item.cta} <ArrowUpRight size={15} />
      </span>
    </>
  )
  return (
    <Reveal as="li" delay={i * 0.07} y={20}>
      {internal ? (
        <Link to={href} className="vcheck">
          {body}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer" className="vcheck">
          {body}
        </a>
      )}
    </Reveal>
  )
}

export default function Verify({ num }) {
  return (
    <section className="section verify" id="verify" data-hud="Verify me">
      <div className="container">
        <div className="verify-seal" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="seal-path" d="M50 50 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
            </defs>
            <text>
              <textPath href="#seal-path">check everything · trust nothing · check everything ·</textPath>
            </text>
          </svg>
          <span>
            <ShieldCheck size={26} />
          </span>
        </div>
        <SectionHead
          num={num}
          label="Before you hire me"
          title={"Don't trust me.\n*Verify* me."}
          intro="Hiring a stranger from the internet is a leap of faith, and it should not be. Here is everything you can check on your own, and exactly how your money is protected if you do go ahead."
        />

        <div className="verify-grid">
          <div className="verify-checks">
            <p className="verify-kicker mono">
              <span>A</span> Check me yourself, in five minutes
            </p>
            <ol>
              {verifyChecks.map((c, i) => (
                <Check key={c.key} item={c} i={i} />
              ))}
            </ol>
          </div>

          <div className="verify-protect">
            <p className="verify-kicker mono">
              <span>B</span> How you are protected once we start
            </p>
            <div className="protect-grid">
              {protections.map((p, i) => {
                const Icon = icons[p.icon]
                return (
                  <Reveal key={p.title} className="protect" delay={(i % 2) * 0.08} data-spot>
                    <span className="protect-icon">
                      <Icon size={20} />
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>

        {testimonials.length > 0 ? (
          <div className="quotes">
            {testimonials.map((t, i) => {
              const project = t.project && getProject(t.project)
              return (
                <Reveal as="figure" key={t.name} className="quote" delay={i * 0.08} data-spot>
                  <Quote size={22} aria-hidden="true" />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    {project && (
                      <Link to={`/work/${project.id}`} className="mono">
                        {project.title} <ArrowUpRight size={13} />
                      </Link>
                    )}
                    {t.link && (
                      <a href={t.link} target="_blank" rel="noreferrer" className="mono">
                        Verify <ArrowUpRight size={13} />
                      </a>
                    )}
                  </figcaption>
                </Reveal>
              )
            })}
          </div>
        ) : (
          <Reveal className="verify-note">
            <p>
              You will not find a wall of five-star quotes here. I would rather you <em>check facts</em> than read praise.
            </p>
            <Link to="/contact" className="link-arrow">
              Ask me for a live walkthrough
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
