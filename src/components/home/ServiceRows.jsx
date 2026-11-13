import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from '../ui/SectionHead'
import { inr } from '../ui/CountUp'
import { services } from '../../data/services'

const pad = (n) => String(n).padStart(2, '0')

// What I build, as a price list: one ruled row per service. The row inverts under the pointer.
export default function ServiceRows({ num }) {
  return (
    <section className="section srows" id="services">
      <div className="container">
        <SectionHead
          num={num}
          label="Services"
          title={'One engineer,\nthe *whole* product.'}
          intro="Pick the row that sounds like your situation. Every price is a starting point; the fixed quote comes in writing after one call."
        />

        <ul className="srow-list">
          {services.map((s, i) => (
            <li key={s.id}>
              <Link to={`/services#${s.id}`} className="srow" data-cursor="Details">
                <span className="srow-idx mono">{pad(i + 1)}</span>
                <span className="srow-title">{s.title}</span>
                <span className="srow-problem">{s.problem}</span>
                <span className="srow-price mono">
                  from <b>{inr(s.from)}</b>
                  <span>{s.weeks} weeks</span>
                </span>
                <ArrowUpRight className="srow-arrow" size={30} strokeWidth={1.2} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <p className="section-cta">
          <Link to="/services#estimate" className="btn btn-ghost">
            Get a rough price in a minute
          </Link>
          <Link to="/services" className="tlink">
            Everything each service includes
          </Link>
        </p>
      </div>
    </section>
  )
}
