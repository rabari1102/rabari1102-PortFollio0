import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Kinetic from '../components/fx/Kinetic'

export default function NotFound() {
  return (
    <main id="main" className="notfound">
      <span className="page-glow" aria-hidden="true" />
      <div className="container notfound-inner">
        <p className="notfound-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </p>
        <Kinetic as="h1" mode="css" className="notfound-title" text={'This page *wandered* off.'} />
        <p className="notfound-sub in" style={{ '--d': '300ms' }}>
          The link is broken or the page has moved. Everything else is one click away.
        </p>
        <div className="hero-ctas in" style={{ '--d': '380ms' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <ArrowLeft size={18} /> Back home
          </Link>
          <Link to="/work" className="btn btn-ghost btn-lg">
            See the work <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  )
}
