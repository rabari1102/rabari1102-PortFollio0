import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHead from '../components/ui/PageHead'
import Reveal from '../components/ui/Reveal'
import Contact from '../components/Contact'
import { process } from '../data/services'

export default function ContactPage() {
  return (
    <main id="main">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Contact' }]}
        label="Contact"
        title={'Have an idea worth building?\nLet’s make it *real.*'}
        intro="Send a short brief, email me, or message me on WhatsApp. The first call is free, and a fixed written quote follows it."
      />

      <Contact showHead={false} />

      <section className="section next-steps">
        <div className="container">
          <h2 className="group-label mono">
            <b>What happens next</b>
            <span className="rule" aria-hidden="true" />
            <span>the first three steps</span>
          </h2>
          <ol className="next-grid">
            {process.slice(0, 3).map((p, i) => (
              <Reveal as="li" key={p.step} className="next" delay={i * 0.06} data-spot>
                <span className="next-n">{i + 1}</span>
                <p className="mono">{p.time}</p>
                <h3>{p.step}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="section-cta">
            <Link to="/services#faq" className="link-arrow">
              Questions first? Read the FAQ
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </Link>
            <Link to="/services#estimate" className="link-arrow">
              Get a rough estimate
              <span className="round-arrow">
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
