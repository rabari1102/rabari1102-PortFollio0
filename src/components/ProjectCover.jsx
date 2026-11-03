// Drawn project covers. No screenshots needed: each one is a little abstract mock of the product,
// in the project's accent colour, with bars and rows seeded from its id so no two look alike.

function seeded(id) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0
    return h / 2 ** 32
  }
}

function WebMock({ p, rnd }) {
  const bars = Array.from({ length: 9 }, () => 18 + rnd() * 62)
  return (
    <div className="mock mock-web">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>{p.id}.app</span>
      </div>
      <div className="mock-web-body">
        <div className="mock-side">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={i === 1 ? 'is-on' : ''} />
          ))}
        </div>
        <div className="mock-main">
          <div className="mock-kpis">
            {[0, 1, 2].map((i) => (
              <div key={i} className="mock-kpi">
                <b style={{ width: `${30 + rnd() * 50}%` }} />
                <span style={{ width: `${40 + rnd() * 40}%` }} />
              </div>
            ))}
          </div>
          <div className="mock-chart">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mock-rows">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: `${55 + rnd() * 40}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SiteMock({ p }) {
  // A marketing site: big headline, a wireframe "3D" box and a row of product tiles.
  return (
    <div className="mock mock-web mock-site">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>{p.id}.com</span>
      </div>
      <div className="site-hero">
        <div className="site-copy">
          <b />
          <b className="is-short" />
          <span />
          <span />
          <i />
        </div>
        <svg viewBox="0 0 100 100" className="site-cube" aria-hidden="true">
          <g>
            <path d="M50 12 L84 30 L84 70 L50 88 L16 70 L16 30 Z" />
            <path d="M16 30 L50 48 L84 30 M50 48 V88" />
          </g>
        </svg>
      </div>
      <div className="site-tiles">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  )
}

function PhoneMock() {
  return (
    <div className="mock mock-phone">
      <svg viewBox="0 0 100 150" aria-hidden="true">
        <path d="M0 40 H100 M0 95 H100 M30 0 V150 M72 0 V150" className="mk-road" />
        <path d="M30 140 V95 H72 V40 H95" className="mk-route" />
        <circle cx="72" cy="70" r="5" className="mk-dot" />
      </svg>
      <div className="mock-phone-sheet">
        <b />
        <span />
      </div>
    </div>
  )
}

function DesktopMock({ p, rnd }) {
  return (
    <div className="mock mock-desktop">
      <div className="mock-bar is-win">
        <span>{p.title}</span>
        <i />
        <i />
        <i />
      </div>
      <div className="mock-table">
        <div className="mock-tr is-head">
          <span />
          <span />
          <span />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mock-tr">
            <span style={{ width: `${50 + rnd() * 40}%` }} />
            <span style={{ width: `${30 + rnd() * 40}%` }} />
            <span style={{ width: `${40 + rnd() * 30}%` }} />
          </div>
        ))}
      </div>
      <div className="mock-total">
        <span />
        <b />
      </div>
    </div>
  )
}

export default function ProjectCover({ project, large = false }) {
  const rnd = seeded(project.id)
  return (
    <div className={`cover is-${project.platform} ${large ? 'is-large' : ''}`} style={{ '--c': project.accent }}>
      <span className="cover-title display" aria-hidden="true">
        {project.title}
      </span>
      {project.platform === 'web' && <WebMock p={project} rnd={rnd} />}
      {project.platform === 'site' && <SiteMock p={project} />}
      {project.platform === 'desktop' && <DesktopMock p={project} rnd={rnd} />}
      {project.platform === 'phone' && <PhoneMock />}
      {project.platform === 'combo' && (
        <>
          <WebMock p={project} rnd={rnd} />
          <PhoneMock />
        </>
      )}
    </div>
  )
}
