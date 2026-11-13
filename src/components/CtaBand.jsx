import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import Kinetic from './fx/Kinetic'
import Magnetic from './fx/Magnetic'

// The closing invitation on inner pages.
export default function CtaBand({ title = 'Have an idea worth building?\nLet’s make it *real.*', sub, estimate = true }) {
  return (
    <section className="section cta-band">
      <div className="container">
        <Reveal className="cta-card" data-spot>
          <Kinetic text={title} className="cta-title" />
          <p className="cta-sub">{sub || 'The first call is free. You leave with a clearer plan, and a fixed written quote follows it.'}</p>
          <div className="hero-ctas">
            <Magnetic>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Discuss your project <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            {estimate && (
              <Link to="/services#estimate" className="btn btn-ghost btn-lg">
                Get a rough estimate
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
