// Little drawn mock-ups of each kind of product. They are abstract on purpose: no fake data,
// no fake brand, just the shape of a dashboard, a phone map, a billing window or a website,
// tinted with the project's accent colour (--c). Bars and rows are seeded so no two look alike.

export function seeded(id) {
  let h = 0
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0
    return h / 2 ** 32
  }
}

export function WebMock({ label, rnd = Math.random }) {
  const bars = Array.from({ length: 9 }, () => 22 + rnd() * 70)
  const hot = Math.floor(rnd() * 9)
  return (
    <div className="mock mock-web">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>{label}</span>
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
                <b style={{ width: `${34 + rnd() * 46}%` }} />
                <span style={{ width: `${40 + rnd() * 40}%` }} />
              </div>
            ))}
          </div>
          <div className="mock-chart">
            {bars.map((h, i) => (
              <span key={i} className={i === hot || i === (hot + 4) % 9 ? 'is-hot' : ''} style={{ '--h': `${h}%`, '--d': `${i * 70}ms` }} />
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

export function SiteMock({ label }) {
  // A marketing site: big headline, a slowly turning wireframe solid and a row of product tiles.
  return (
    <div className="mock mock-web mock-site">
      <div className="mock-bar">
        <i />
        <i />
        <i />
        <span>{label}</span>
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
            <path d="M33 21 L67 39 M67 21 L33 39" opacity=".5" />
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

export function PhoneMock() {
  return (
    <div className="mock mock-phone">
      <span className="mock-notch" />
      <svg viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M0 40 H100 M0 95 H100 M30 0 V150 M72 0 V150" className="mk-road" />
        <path d="M30 140 V95 H72 V40 H95" className="mk-route" pathLength="1" />
        <circle r="4.5" className="mk-dot">
          <animateMotion dur="7s" repeatCount="indefinite" path="M30 140 V95 H72 V40 H95" keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </circle>
        <circle cx="95" cy="40" r="3.2" className="mk-pin" />
      </svg>
      <div className="mock-phone-sheet">
        <b />
        <span />
        <i />
      </div>
    </div>
  )
}

export function DesktopMock({ title, rnd = Math.random }) {
  return (
    <div className="mock mock-desktop">
      <div className="mock-bar is-win">
        <span>{title}</span>
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
          <div key={i} className="mock-tr" style={{ '--d': `${i * 0.5}s` }}>
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
