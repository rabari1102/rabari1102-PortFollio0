import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <main className="notfound">
      <Seo title="Page not found · Pragnesh Kalotara" description="This page doesn't exist. Head back home." path="/404" noindex />
      <div className="container notfound-inner">
        <p className="mono notfound-code">404</p>
        <h1 className="display">This page wandered off.</h1>
        <p className="notfound-sub">
          The link is broken or the page has moved. Everything else is one click away.
        </p>
        <div className="hero-ctas">
          <Link to="/" className="btn btn-accent">
            <ArrowLeft size={18} /> Back home
          </Link>
          <Link to="/#work" className="btn btn-ghost">
            See the work
          </Link>
        </div>
      </div>
    </main>
  )
}
