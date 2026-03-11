const GITHUB_URL = 'https://github.com/pragneshkalotara'

const projects = [
    {
        icon: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
        name: 'Telep-Eco', sub: 'Real-time IoT Monitoring Platform',
        arch: 'MQTT · Event-Driven · Microservices',
        problem: 'Handle 5,000+ IoT devices in real time with low latency',
        role: 'Architected MQTT backend & microservices solo',
        tags: ['Node.js', 'MQTT', 'MongoDB', 'Socket.io', 'AWS S3'],
        outcome: '✅ 99.9% uptime · 25% lower bandwidth · 5,000+ concurrent devices',
        pills: ['5,000+ devices', '25% less overhead', '99.9% uptime'],
        color: 'var(--cyan)',
        link: GITHUB_URL,
    },
    {
        icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></>,
        name: 'QFACT Platform', sub: 'Modular Enterprise Workflow Platform',
        arch: 'NestJS Microservices · BullMQ · Queue-Driven',
        problem: 'Enterprise platform needing async workflows & voice integration',
        role: 'Led 6-dev team, designed microservices architecture',
        tags: ['NestJS', 'TypeScript', 'MySQL', 'Twilio', 'BullMQ'],
        outcome: '✅ 40% faster APIs · 35% efficiency gain · 95% on-time delivery',
        pills: ['40% faster APIs', '35% efficiency gain', '6-dev team'],
        color: 'var(--blue)',
        link: GITHUB_URL,
    },
    {
        icon: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
        name: 'Telep-AI', sub: 'AI-Powered Desktop Streaming App',
        arch: 'Electron.js · RTSP Pipeline · Real-time AI',
        problem: 'Real-time AI camera monitoring with low detection latency',
        role: 'Designed cross-platform app + RTSP streaming pipeline',
        tags: ['Electron.js', 'Node.js', 'SQLite', 'RTSP', 'GStreamer'],
        outcome: '✅ 50% faster warning response · 40% inference boost · Multi-platform',
        pills: ['50% faster response', '40% inference boost', 'Multi-platform'],
        color: 'var(--purple)',
        link: GITHUB_URL,
    },
    {
        icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
        name: 'Hospital Management', sub: 'Healthcare Backend Platform',
        arch: 'NestJS Modular · ACID-compliant · Dockerized',
        problem: 'Complex modular healthcare platform for patients & billing',
        role: 'Solo architect — NestJS modular backend with full ACID compliance',
        tags: ['NestJS', 'PostgreSQL', 'TypeORM', 'Docker'],
        outcome: '✅ 20% less wait time · ACID-compliant · Fully Dockerized',
        pills: ['20% less wait time', 'ACID compliant', 'Dockerized'],
        color: 'var(--emerald)',
        link: GITHUB_URL,
    },
]

export default function Projects() {
    return (
        <section id="projects">
            <div className="container">
                <div className="reveal sec-header">
                    <svg className="sec-icon" style={{ color: 'var(--emerald)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                    </svg>
                    <h2 className="sec-title">Key Projects</h2>
                </div>
                <div className="projects-grid">
                    {projects.map((p, i) => (
                        <div className="reveal proj-card" style={{ transitionDelay: `${i * 100}ms`, '--proj-accent': p.color }} key={i}>
                            <div className="proj-card-top">
                                <div className="proj-icon-wrap" style={{ color: p.color }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{p.icon}</svg>
                                </div>
                                <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="proj-github-link"
                                    title="View on GitHub"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                </a>
                            </div>
                            <div className="proj-arch-label">{p.arch}</div>
                            <div className="proj-name">{p.name}</div>
                            <div className="proj-sub">{p.sub}</div>
                            <div className="proj-case-row">
                                <div className="proj-case-item"><span className="proj-case-label">🔴 Problem</span><span className="proj-case-val">{p.problem}</span></div>
                                <div className="proj-case-item"><span className="proj-case-label">🏗️ Role</span><span className="proj-case-val">{p.role}</span></div>
                            </div>
                            <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                            <div className="proj-outcome">{p.outcome}</div>
                            <div className="proj-metrics">{p.pills.map(pl => <span key={pl} className="metric-pill">{pl}</span>)}</div>
                        </div>
                    ))}
                </div>
                <div className="reveal" style={{ marginTop: '40px' }}>
                    <div className="compact-cta">
                        <div>
                            <div className="compact-cta-text">🧠 Impressed by the results? Let's talk architecture.</div>
                            <div className="compact-cta-sub">I'm open to senior backend, platform engineering &amp; tech lead roles.</div>
                        </div>
                        <div className="compact-cta-btns">
                            <a href="mailto:pragneshkalotara110201@gmail.com" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 22px', fontSize: '0.875rem' }}>Get in Touch</a>
                            <a href={GITHUB_URL} target="_blank" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 22px', fontSize: '0.875rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                                View All on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
