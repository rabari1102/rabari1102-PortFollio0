import { useState } from 'react'

const tiers = [
    {
        level: 'Expert',
        color: 'var(--cyan)',
        dot: '#22d3ee',
        groups: [
            { cat: 'Node.js Ecosystem', tags: ['Node.js', 'NestJS', 'Express.js', 'TypeScript', 'JavaScript', 'Electron.js'] },
            { cat: 'Databases', tags: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite'] },
            { cat: 'Architecture', tags: ['Microservices', 'Event-Driven', 'WebSockets', 'RESTful APIs', 'MQTT'] },
            { cat: 'Security & Auth', tags: ['JWT', 'OAuth2.0', 'RBAC', 'FCM'] },
        ]
    },
    {
        level: 'Proficient',
        color: 'var(--blue)',
        dot: '#60a5fa',
        groups: [
            { cat: 'Message Queues', tags: ['Kafka', 'BullMQ', 'RabbitMQ', 'Node-RED'] },
            { cat: 'Cloud & DevOps', tags: ['AWS S3', 'AWS EC2', 'DynamoDB', 'Docker', 'Jenkins', 'Firebase'] },
            { cat: 'ORM & Tools', tags: ['TypeORM', 'Mongoose', 'Sequelize', 'Swagger', 'Postman', 'Git'] },
            { cat: 'APIs & Protocols', tags: ['GraphQL', 'Redis Pub/Sub', 'Twilio'] },
        ]
    },
    {
        level: 'Familiar',
        color: 'var(--purple)',
        dot: '#a78bfa',
        groups: [
            { cat: 'Search & Analytics', tags: ['OpenSearch', 'Elasticsearch'] },
            { cat: 'AI Integration', tags: ['Gemini API', 'OpenAI API', 'RTSP', 'GStreamer'] },
        ]
    },
]

export default function Skills() {
    const [activeLevel, setActiveLevel] = useState('Expert')

    return (
        <section id="skills">
            <div className="container">
                <div className="reveal sec-header">
                    <svg className="sec-icon" style={{ color: 'var(--purple)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                    </svg>
                    <h2 className="sec-title">Technical Arsenal</h2>
                </div>

                {/* Tier filter tabs */}
                <div className="reveal skills-tier-tabs">
                    {tiers.map(t => (
                        <button
                            key={t.level}
                            className={`tier-tab${activeLevel === t.level ? ' active' : ''}`}
                            style={{ '--tier-color': t.color }}
                            onClick={() => setActiveLevel(t.level)}
                        >
                            <span className="tier-dot" style={{ background: t.dot }}></span>
                            {t.level}
                        </button>
                    ))}
                </div>

                {tiers.map(tier => (
                    <div
                        key={tier.level}
                        className={`reveal skills-tier-section${activeLevel === tier.level ? ' tier-visible' : ' tier-hidden'}`}
                    >
                        <div className="skills-grid">
                            {tier.groups.map((g, i) => (
                                <div
                                    key={i}
                                    className="skill-card"
                                    style={{ transitionDelay: `${i * 80}ms`, '--skill-accent': tier.color }}
                                >
                                    <div className="skill-cat">{g.cat}</div>
                                    <div className="tags">
                                        {g.tags.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Currently Learning */}
                <div className="reveal currently-learning">
                    <span className="learning-label">📚 Currently deepening:</span>
                    {['Kubernetes', 'Apache Kafka at scale', 'System Design patterns'].map(item => (
                        <span key={item} className="learning-pill">{item}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}
