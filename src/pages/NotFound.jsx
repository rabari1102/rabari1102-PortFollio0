import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Seo from '../components/Seo'
import Kinetic from '../components/fx/Kinetic'
import Magnetic from '../components/fx/Magnetic'

export default function NotFound() {
  return (
    <main id="main" className="notfound">
      <Seo title="Page not found · Pragnesh Kalotara" description="This page doesn't exist. Head back home." path="/404" noindex />
      <span className="notfound-glow" aria-hidden="true" />
      <div className="container notfound-inner">
        <p className="notfound-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </p>
        <Kinetic as="h1" className="notfound-title" text={'This page *wandered* off.'} play />
        <p className="notfound-sub">The link is broken or the page has moved. Everything else is one click away.</p>
        <div className="hero-ctas">
          <Magnetic>
            <Link to="/" className="btn btn-primary btn-lg">
              <ArrowLeft size={18} /> Back home
            </Link>
          </Magnetic>
          <Link to="/#work" className="btn btn-ghost btn-lg">
            See the work <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  )
}
