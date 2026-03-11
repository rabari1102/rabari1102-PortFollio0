const achievements = [
    {
        cls: 'c-cyan', tc: 't-cyan', metric: '40%', title: 'API Performance Boost', ctx: 'Optimized core backend API performance by 40% through query optimization and caching strategies in distributed systems.',
        icon: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>
    },
    {
        cls: 'c-blue', tc: 't-blue', metric: '5,000+', title: 'Concurrent IoT Devices', ctx: 'Architected Telep-Eco monitoring system scaling to 5,000+ concurrent IoT connections via optimized MQTT protocol.',
        icon: <><rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></>
    },
    {
        cls: 'c-purple', tc: 't-purple', metric: '35%', title: 'Request Efficiency', ctx: 'Implemented Twilio Voice ecosystem and BullMQ for async background processing, boosting overall request efficiency by 35%.',
        icon: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>
    },
    {
        cls: 'c-emerald', tc: 't-emerald', metric: '75%', title: 'Security Improvement', ctx: 'Established JWT/OAuth2.0 security frameworks and RBAC reducing unauthorized access attempts by 75% across production.',
        icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>
    },
    {
        cls: 'c-orange', tc: 't-orange', metric: '25%', title: 'Team Velocity', ctx: 'As Team Lead of 6, established coding standards improving team velocity by 25% and reducing production bugs by 30%.',
        icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>
    },
    {
        cls: 'c-pink', tc: 't-pink', metric: '95%', title: 'On-Time Delivery', ctx: 'Managed agile sprint cycles ensuring 95% on-time delivery of milestones across multiple concurrent projects.',
        icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /></>
    },
]

export default function Impact() {
    return (
        <section id="impact">
            <div className="container">
                <div className="reveal sec-header">
                    <svg className="sec-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    <h2 className="sec-title">Impact &amp; Achievements</h2>
                </div>
                <div className="achievements-grid">
                    {achievements.map((a, i) => (
                        <div className={`reveal ach-card ${a.cls}`} style={{ transitionDelay: `${i * 100}ms` }} key={i}>
                            <div className="ach-icon-wrap">
                                <svg className={a.tc} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{a.icon}</svg>
                            </div>
                            <div className={`ach-metric ${a.tc}`}>{a.metric}</div>
                            <div className="ach-title">{a.title}</div>
                            <div className="ach-ctx">{a.ctx}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
