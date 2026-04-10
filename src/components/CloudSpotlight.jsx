export default function CloudSpotlight() {
    return (
        <section id="cloud-spotlight">
            <div className="container">
                <div className="reveal cloud-card">
                    <div className="cloud-header">
                        <svg style={{ color: 'var(--orange)' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                        </svg>
                        <div className="cloud-title">Cloud &amp; Search Expertise</div>
                    </div>
                    <div className="cloud-desc">Deep expertise in enterprise-grade AWS-native architecture and distributed search systems at scale.</div>
                    <div className="cloud-grid">
                        {[
                            { name: 'DynamoDB', sub: 'NoSQL at scale', icon: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></> },
                            { name: 'OpenSearch', sub: 'Distributed search', icon: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
                            { name: 'Elasticsearch', sub: 'Analytics & search', icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
                            { name: 'Microservices', sub: 'Distributed arch', icon: <><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></> },
                        ].map(c => (
                            <div key={c.name} className="cloud-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{c.icon}</svg>
                                <div className="cloud-item-name">{c.name}</div>
                                <div className="cloud-item-sub">{c.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
