import { Link, useLocation } from 'react-router-dom'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import Kinetic from './fx/Kinetic'
import { WhatsappIcon } from './ui/Icons'
import { profile } from '../data/site'
import { useClock } from '../lib/hooks'

const cols = [
  {
    title: 'Site',
    links: [
      { to: '/work', label: 'Work' },
      { to: '/services', label: 'Services' },
      { to: '/services#estimate', label: 'Estimate' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Check me',
    links: [
      { href: profile.linkedin, label: 'LinkedIn' },
      { href: profile.github, label: 'GitHub' },
      { href: profile.resume, label: 'CV' },
    ],
  },
  {
    title: 'Reach me',
    links: [
      { href: `https://wa.me/${profile.whatsapp}`, label: 'WhatsApp' },
      { href: profile.phoneHref, label: profile.phone, same: true },
    ],
  },
]

// The last page of the edition: one more invitation in the biggest type on the site, the email
// address as a link you cannot miss, then the small print and the name as a wordmark.
export default function Footer() {
  const clock = useClock(profile.timezone)
  // The home page and /contact already end on the contact form, so the invitation is not repeated.
  const { pathname } = useLocation()
  const invite = pathname !== '/' && pathname !== '/contact'
  return (
    <footer className="footer">
      <div className="container">
        {invite && (
          <div className="footer-cta">
            <p className="section-label mono">
              <span className="sl-rule" aria-hidden="true" />
              Next step
            </p>
            <Kinetic as="h2" text={'Have a product in mind?\n*Let’s* *build* *it.*'} className="footer-title" />
            <div className="footer-reach">
              <a href={`mailto:${profile.email}`} className="footer-mail" data-cursor="Write">
                {profile.email}
                <ArrowUpRight size={34} strokeWidth={1.2} aria-hidden="true" />
              </a>
              <div className="footer-btns">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Send a brief <ArrowUpRight size={18} />
                </Link>
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">
                  <WhatsappIcon width={18} height={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="footer-mid">
          <p className="footer-line">One senior engineer in {profile.city.split(',')[0]}. Fixed quotes, weekly demos, and the code is yours.</p>
          <nav className="footer-cols" aria-label="Footer">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="mono">{c.title}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to}>{l.label}</Link>
                      ) : (
                        <a href={l.href} {...(l.same ? {} : { target: '_blank', rel: 'noreferrer' })}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <Link to="/" className="footer-mark" aria-label={`${profile.name}, home`}>
        <span aria-hidden="true">Pragnesh</span>
      </Link>

      <div className="container footer-bottom mono">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>
          {profile.city}
          {clock && ` · ${clock.time} IST`}
        </span>
        <button className="footer-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  )
}
