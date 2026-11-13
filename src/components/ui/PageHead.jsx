import { Link } from 'react-router-dom'
import Kinetic from '../fx/Kinetic'

// The top of an inner page. Its entrance is pure CSS (the "in" class), so the heading is painted
// with the HTML and never waits for JavaScript. That keeps the largest-contentful-paint fast.
export default function PageHead({ crumbs = [], label, title, intro, children }) {
  return (
    <header className="page-head">
      <span className="page-glow" aria-hidden="true" />
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs mono in" aria-label="Breadcrumb" style={{ '--d': '0ms' }}>
            <ol>
              {crumbs.map((c, i) => (
                <li key={c.to || c.label}>{i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        {label && (
          <p className="section-label mono in" style={{ '--d': '40ms' }}>
            <span className="sl-rule" aria-hidden="true" />
            {label}
          </p>
        )}
        <Kinetic as="h1" mode="css" text={title} className="page-title" />
        {intro && (
          <p className="page-intro in" style={{ '--d': '380ms' }}>
            {intro}
          </p>
        )}
        {children && (
          <div className="page-head-extra in" style={{ '--d': '460ms' }}>
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
