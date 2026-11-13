import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import PageHead from '../components/ui/PageHead'
import ServiceList from '../components/ServiceList'
import WhyCheaper from '../components/WhyCheaper'
import Estimator from '../components/Estimator'
import Process from '../components/Process'
import Faq from '../components/Faq'
import Island from '../components/ui/Island'

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHead
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Services' }]}
        label="Services & pricing"
        title={'One person,\n*every* layer.'}
        intro="Design, frontend, backend, database, mobile and deployment, from one senior engineer. Below is what I build, who it is for, what you receive and what it starts at."
      >
        <div className="hero-ctas">
          <Link to="/services#estimate" className="btn btn-primary btn-lg">
            Estimate my project <ArrowDownRight size={18} />
          </Link>
          <Link to="/contact" className="btn btn-ghost btn-lg">
            Discuss a project <ArrowUpRight size={18} />
          </Link>
        </div>
      </PageHead>

      <section className="section services-full">
        <div className="container">
          <ServiceList />
          <p className="fineprint">Starting prices for a small first version. Prices are in INR; for clients outside India I quote in USD or EUR.</p>
        </div>
      </section>

      <Island>
        <WhyCheaper />
      </Island>
      <Island>
        <Estimator />
      </Island>
      <Island>
        <Process />
      </Island>
      <Island>
        <Faq />
      </Island>
    </main>
  )
}
