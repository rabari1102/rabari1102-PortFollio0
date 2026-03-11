import { useEffect, useState, useRef } from 'react'

const roles = [
    'Senior Backend Engineer',
    'NestJS / Node.js Architect',
    'Team Lead · 6 Devs',
    'IoT Systems Builder',
    'AI-Augmented Developer',
]

export default function Hero() {
    const [roleIdx, setRoleIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [copied, setCopied] = useState(false)
    const timeout = useRef(null)

    useEffect(() => {
        const full = roles[roleIdx]
        if (!deleting && displayed.length < full.length) {
            timeout.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60)
        } else if (!deleting && displayed.length === full.length) {
            timeout.current = setTimeout(() => setDeleting(true), 2200)
        } else if (deleting && displayed.length > 0) {
            timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setRoleIdx(i => (i + 1) % roles.length)
        }
        return () => clearTimeout(timeout.current)
    }, [displayed, deleting, roleIdx])

    const copyEmail = () => {
        navigator.clipboard.writeText('pkb110201@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="home">
            <div className="container">
                <div className="hero-layout">
                    {/* ── LEFT: Main content ── */}
                    <div className="reveal hero-main">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
                            <div className="hero-badge" style={{ marginBottom: 0 }}>
                                <div className="pulse-dot"></div>
                                AVAILABLE FOR OPPORTUNITIES · ALL OVER THE WORLD
                            </div>
                            <div className="hero-ai-badge" style={{ marginBottom: 0 }}>
                                <span className="ai-spark">🤖</span>
                                AI-AUGMENTED DEVELOPER
                            </div>
                        </div>

                        <h1 className="hero-name">Pragnesh <span>Kalotara</span></h1>

                        <div className="hero-typing-wrap">
                            <span className="hero-typing-text">{displayed}</span>
                            <span className="hero-typing-cursor">|</span>
                        </div>

                        <p className="hero-summary">
                            Results-driven Team Lead & Backend Developer with <strong style={{ color: 'var(--cyan)' }}>3+ years of experience</strong> designing scalable microservices and real-time communication platforms. Specialized in <strong style={{ color: 'var(--cyan)' }}>Node.js, NestJS & TypeScript</strong> — optimized performance by 40%, led teams of 6 developers, and shipped production-grade solutions with 99.9% uptime.
                        </p>

                        <div className="metrics-strip reveal">
                            <span className="metric-item">📡 <strong>5,000+</strong> IoT devices</span>
                            <span className="metric-sep">·</span>
                            <span className="metric-item">⚡ <strong>99.9%</strong> uptime</span>
                            <span className="metric-sep">·</span>
                            <span className="metric-item">🚀 <strong>40%</strong> API speedup</span>
                            <span className="metric-sep">·</span>
                            <span className="metric-item">👥 Led <strong>6</strong> devs</span>
                            <span className="metric-sep">·</span>
                            <span className="metric-item">✅ <strong>95%</strong> on-time delivery</span>
                        </div>

                        <div className="hero-btns">
                            <button className="btn-primary" onClick={() => document.getElementById('edu-contact').scrollIntoView({ behavior: 'smooth' })}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                Hire Me
                            </button>
                            <a
                                href="https://drive.google.com/file/d/1-sj2u70gfamVeGHpOp8MrB5rkuvipjwE/view?usp=sharing"
                                target="_blank"
                                className="btn-resume"
                                rel="noopener noreferrer"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                Resume
                            </a>
                            <button className="btn-secondary" onClick={copyEmail} title="Copy email">
                                {copied
                                    ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Copied!</>
                                    : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg> Email</>
                                }
                            </button>
                            <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="btn-secondary" style={{ textDecoration: 'none' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                                LinkedIn
                            </a>
                            <a href="https://github.com/rabari1102" target="_blank" className="btn-secondary" style={{ textDecoration: 'none' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                GitHub
                            </a>
                        </div>

                        <div className="stats-grid">
                            {[['3+', 'Years Exp'], ['6', 'Team Lead'], ['5K+', 'IoT Devices'], ['99.9%', 'Uptime']].map(([n, l]) => (
                                <div className="stat-card" key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Terminal card ── */}
                    <div className="reveal hero-terminal" style={{ transitionDelay: '200ms' }}>
                        <div className="terminal-card">
                            {/* macOS-style top bar */}
                            <div className="terminal-bar">
                                <span className="t-dot t-red"></span>
                                <span className="t-dot t-yellow"></span>
                                <span className="t-dot t-green"></span>
                                <span className="t-title">bash — pragnesh@dev</span>
                            </div>

                            {/* Terminal body */}
                            <div className="terminal-body">
                                {/* whoami */}
                                <div className="t-line">
                                    <span className="t-prompt">➜</span>
                                    <span className="t-tilde">~</span>
                                    <span className="t-cmd">whoami</span>
                                </div>
                                <div className="t-out-cyan">pragnesh_kalotara</div>

                                {/* cat about.json */}
                                <div className="t-line t-gap">
                                    <span className="t-prompt">➜</span>
                                    <span className="t-tilde">~</span>
                                    <span className="t-cmd">cat about.json</span>
                                </div>
                                <div className="t-json-block">
                                    <span className="t-brace">{'{'}</span>
                                    <div className="t-json-line"><span className="t-key">"role"</span><span className="t-colon">:</span> <span className="t-str">"Sr. Backend Engineer &amp; Team Lead"</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"stack"</span><span className="t-colon">:</span> <span className="t-str">["NestJS", "Node.js", "TypeScript"]</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"experience"</span><span className="t-colon">:</span> <span className="t-str">"3+ years"</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"team_led"</span><span className="t-colon">:</span> <span className="t-num">6</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"iot_devices"</span><span className="t-colon">:</span> <span className="t-num">5000</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"uptime_sla"</span><span className="t-colon">:</span> <span className="t-str">"99.9%"</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"location"</span><span className="t-colon">:</span> <span className="t-str">"Ahmedabad, India"</span><span className="t-comma">,</span></div>
                                    <div className="t-json-line"><span className="t-key">"available"</span><span className="t-colon">:</span> <span className="t-bool">true</span></div>
                                    <span className="t-brace">{'}'}</span>
                                </div>

                                {/* ./get_in_touch.sh */}
                                <div className="t-line t-gap">
                                    <span className="t-prompt">➜</span>
                                    <span className="t-tilde">~</span>
                                    <span className="t-cmd">./get_in_touch.sh</span>
                                </div>
                                <div className="t-out-emerald">✅ Ready to build great systems together!</div>
                                <div className="t-cursor-line">
                                    <span className="t-prompt">➜</span>
                                    <span className="t-tilde">~</span>
                                    <span className="t-cursor-blink">▋</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
