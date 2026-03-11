import { useEffect, useRef } from 'react'

export default function Nav() {
    const linksRef = useRef(null)

    useEffect(() => {
        const sections = ['home', 'impact', 'experience', 'projects', 'skills', 'ai-mastery', 'ai', 'edu-contact']
        const handleScroll = () => {
            let cur = ''
            sections.forEach(id => {
                const el = document.getElementById(id)
                if (el) { const r = el.getBoundingClientRect(); if (r.top <= 160 && r.bottom >= 160) cur = id }
            })
            document.querySelectorAll('.nav-links a').forEach(a =>
                a.classList.toggle('active', a.getAttribute('href') === '#' + cur)
            )
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav>
            <div className="nav-inner">
                <span className="nav-logo">PK.DEV</span>
                <ul className="nav-links" ref={linksRef}>
                    <li><a href="#home" className="active">About</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#ai-mastery">AI Workflow</a></li>
                    <li><a href="#skills">Tech Stack</a></li>
                    <li><a href="#edu-contact">Contact</a></li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a href="https://github.com/pragneshkalotara" target="_blank" className="btn-icon-sm" aria-label="GitHub Profile" title="GitHub">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="btn-icon-sm" aria-label="LinkedIn Profile" title="LinkedIn">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>
                    <a href="mailto:pragneshkalotara110201@gmail.com" className="nav-contact" aria-label="Send Email">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        Hire Me
                    </a>
                </div>
            </div>
        </nav>
    )
}
