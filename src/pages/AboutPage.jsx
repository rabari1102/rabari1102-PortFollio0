import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHead from '../components/ui/PageHead'
import Reveal from '../components/ui/Reveal'
import SectionHead from '../components/ui/SectionHead'
import { AboutFacts } from '../components/AboutTeaser'
import { AiHonesty } from '../components/WhyCheaper'
import Experience from '../components/Experience'
import Toolbox from '../components/Toolbox'
import Island from '../components/ui/Island'
import { LinkedinIcon, GithubIcon } from '../components/ui/Icons'
import { about, profile } from '../data/site'

export default function AboutPage() {
  return (
    <main id="main">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'About' }]}
        label={`${profile.name} · ${profile.city}`}
        title={'Backend at the core,\nthe *whole* product\naround it.'}
        intro={about.lead}
      />

      <section className="section about-full">
        <div className="container about-grid">
          <div className="about-side">
            {profile.photo && <img className="about-photo" src={profile.photo} alt={profile.name} width="320" height="320" />}
            <AboutFacts />
            <div className="about-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <LinkedinIcon width={16} height={16} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <GithubIcon width={16} height={16} /> GitHub
              </a>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Read the CV <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="about-body">
            {about.paragraphs.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 0.04} className={i === 0 ? 'about-lead' : ''}>
                {p}
              </Reveal>
            ))}
            <Reveal className="section-cta">
              <Link to="/#verify" className="link-arrow">
                Do not take my word for it: verify me
                <span className="round-arrow">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section ai-section">
        <div className="container">
          <SectionHead
            label="How I use AI"
            title={'A fast assistant, *never* the engineer.'}
            intro="AI tools take the boring parts off my plate so more of the time you pay for goes into the parts that matter. Here is exactly where the line is."
          />
          <AiHonesty />
        </div>
      </section>

      <Island>
        <Experience />
      </Island>
      <Island>
        <Toolbox />
      </Island>
    </main>
  )
}
