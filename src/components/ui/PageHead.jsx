import { Link } from 'react-router-dom'
import Kinetic from '../fx/Kinetic'

// The top of an inner page: a ruled line of breadcrumbs, one very large serif title, and the
// introduction set to the right like a standfirst. Its entrance is pure CSS (the "in" class),
// so the heading is painted with the HTML and never waits for JavaScript.
export default function PageHead({ crumbs = [], label, title, intro, children }) {
  return (
    <header className="page-head">
      <div className="container">
        <div className="page-bar mono in" style={{ '--d': '0ms' }}>
          {crumbs.length > 0 && (
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                {crumbs.map((c, i) => (
                  <li key={c.to || c.label}>{i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
                ))}
              </ol>
            </nav>
          )}
          {label && <p className="page-label">{label}</p>}
        </div>
        <Kinetic as="h1" mode="css" text={title} className="page-title" />
        {(intro || children) && (
          <div className="page-stand">
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
        )}
      </div>
    </header>
  )
}
