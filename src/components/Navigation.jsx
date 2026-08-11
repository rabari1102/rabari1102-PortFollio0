import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'ai', 'articles', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'ai', label: 'AI Agent' },
    { id: 'articles', label: 'Insights' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <header className={`nav-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); navTo('home') }}>
          <span className="brand-dot"></span>
          PRAGNESH KALOTARA
        </a>

        <ul className="nav-menu">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'is-active' : ''}`}
                onClick={(e) => { e.preventDefault(); navTo(link.id) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a
            href="https://drive.google.com/file/d/1_IHmO_vryoPm7FxL2Gb22nzxygXhOrw9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-btn"
            data-cursor="RESUME ↗"
          >
            Resume ↗
          </a>
          <button
            className="nav-hire-btn"
            onClick={() => navTo('contact')}
            data-cursor="HIRE ME"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  )
}
