const testimonials = [
    {
        name: 'Trupal Patel',
        role: 'Project Manager · Qfact (TreeRoot Informatics)',
        text: "Pragnesh brought real architecture maturity to the team. He didn't just write code — he owned the entire backend design. His NestJS microservices for our ticketing + voice system were bulletproof in production, and he kept 6 devs aligned and unblocked every sprint.",
        initials: 'TP',
        color: 'var(--blue)',
    },
    {
        name: 'Dhruv Shah',
        role: 'CTO · Rapidise (Teksun Inc.)',
        text: "Building Telep-Eco to handle 5,000+ concurrent IoT connections was a hard problem. Pragnesh's MQTT architecture delivered 99.9% uptime from day one. He also introduced async processing patterns that cut our API response times by 40% across the board.",
        initials: 'DS',
        color: 'var(--cyan)',
    },
    {
        name: 'Keval Nakrani',
        role: 'Full-Stack Developer · Qfact Team',
        text: "Working under Pragnesh as team lead was a great learning experience. He had a clear vision for every feature, reviewed PRs with AI tools to catch edge cases, and always made time to explain the 'why' behind architectural decisions. Sprint delivery was consistently on track.",
        initials: 'KN',
        color: 'var(--purple)',
    },
]

export default function Testimonials() {
    return (
        <section id="testimonials" style={{ padding: '80px 0' }}>
            <div className="container">
                <div className="reveal sec-header">
                    <svg style={{ color: 'var(--yellow)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                    <h2 className="sec-title">What Colleagues Say</h2>
                </div>
                <div className="testimonials-grid reveal">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card" style={{ '--t-color': t.color, transitionDelay: `${i * 120}ms` }}>
                            <div className="testimonial-quote">"</div>
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar" style={{ background: `color-mix(in srgb, ${t.color} 20%, transparent)`, border: `1.5px solid ${t.color}` }}>
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="testimonial-name">{t.name}</div>
                                    <div className="testimonial-role">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
