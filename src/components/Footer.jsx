export default function Footer() {
    return (
        <footer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className="footer-open-badge">
                    <span className="pulse-dot" style={{ width: '7px', height: '7px', flexShrink: 0 }}></span>
                    Open to Work
                </div>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                <a href="https://github.com/pragneshkalotara" target="_blank" aria-label="GitHub">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" aria-label="LinkedIn">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                </a>
                <a href="mailto:pragneshkalotara110201@gmail.com" aria-label="Email">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email
                </a>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', textAlign: 'center', marginBottom: '6px' }}>
                © 2026 Pragnesh Kalotara · Senior Backend Engineer &amp; AI-Augmented Developer · Node.js · NestJS · Microservices
            </div>
            <div style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.7rem', textAlign: 'center' }}>
                Built with React + Vite · Deployed on Vercel
            </div>
        </footer>
    )
}
