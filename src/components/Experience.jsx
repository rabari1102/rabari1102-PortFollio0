import { useState } from 'react'

const jobs = [
    {
        company: 'Apotec', badges: [{ cls: 'badge-current', label: 'Current' }],
        meta: 'Sr. Backend Developer · Dec 2025 – Present · Ahmedabad',
        bullets: [
            'Working on existing Node.js + TypeScript production codebase, contributing to ongoing feature development and maintenance',
            'Identifying and resolving bugs across the backend, improving system stability and code quality',
            'Integrating and maintaining third-party APIs within distributed microservices architecture',
            'Gaining hands-on experience with OpenSearch and Elasticsearch for search and analytics use cases',
            'Working with AWS DynamoDB as the primary NoSQL data store in a cloud-native environment',
        ],
        tags: ['Node.js', 'TypeScript', 'AWS DynamoDB', 'OpenSearch', 'Elasticsearch', 'Microservices'],
    },
    {
        company: 'Qfact (Treeroot Informatics)', badges: [{ cls: 'badge-lead', label: 'Team Lead' }],
        meta: 'Team Lead & Sr. Backend Developer · Mar 2025 – Present · Work from home',
        bullets: [
            'Led, mentored, and guided a team of 6 backend, frontend & Flutter developers — full development lifecycle from sprint planning to deployment',
            'Established coding standards and design patterns, improving team velocity by 25% and reducing production bugs by 30%',
            'Managed agile sprint cycles, coordinating with PMs and frontend leads to ensure 95% on-time milestone delivery',
            'Directed architecture of scalable NestJS microservices for a complex multi-tenant enterprise workflow platform',
            'Designed complete Twilio Voice ecosystem: inbound/outbound/missed calls, auto ticket creation & FCM live notifications',
            'Integrated BullMQ queues for async background processing, image resizing & secure file upload workflows',
            'Developed advanced search & filtering with Sequelize ORM and RBAC for stakeholder/project management modules',
            'Contributed to Hospital Management System with NestJS, TypeScript, PostgreSQL, and Docker-based deployments',
        ],
        tags: ['NestJS', 'TypeScript', 'MySQL', 'PostgreSQL', 'Twilio', 'BullMQ', 'FCM', 'Docker', 'Sequelize', 'RBAC'],
    },
    {
        company: 'Rapidise (Teksun Inc.)', badges: [],
        meta: 'Backend Developer · Sep 2023 – Mar 2025 · 1 yr 7 months · On-site, Ahmedabad',
        bullets: [
            'Architected Telep-Eco: real-time MQTT monitoring system for 5,000+ concurrent IoT devices, improving tracking efficiency by 35%',
            'Developed Telep-AI streaming solution reducing AI model warning response time by 50% via optimized real-time data processing',
            'Built Helpdesk Management System, reducing ticket response time by 30%; implemented RBAC & WebSocket real-time notifications',
            'Implemented BAP-TOOL (Quotation Management) with workflow automation, increasing quotation generation speed by 40%',
            'Designed event-driven microservices architecture supporting 99.9% system uptime under high-volume data streams',
            'Established JWT authentication framework, reducing unauthorized access attempts by 75%',
            'Created comprehensive API documentation and monitoring using Swagger, Winston, and Morgan',
        ],
        tags: ['Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'MQTT', 'WebSockets', 'JWT', 'AWS S3', 'Electron.js', 'Socket.io'],
    },
    {
        company: 'TUVOC Technology', badges: [],
        meta: 'Backend Developer · Jan 2023 – Aug 2023 · 8 months · On-site, Ahmedabad',
        bullets: [
            'Developed RESTful APIs using Express.js, improving backend response times by 30% with detailed Swagger documentation',
            'Optimized MongoDB schemas with strategic indexing, reducing database query times by 45%',
            'Implemented real-time data synchronization using WebSockets for live tracking capabilities',
        ],
        tags: ['Express.js', 'MongoDB', 'WebSockets', 'Swagger'],
    },
]


const ChevronSvg = () => (
    <svg className="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m6 9 6 6 6-6" />
    </svg>
)

export default function Experience() {
    const [openIdx, setOpenIdx] = useState(0)

    return (
        <section id="experience">
            <div className="container">
                <div className="reveal sec-header">
                    <svg className="sec-icon" style={{ color: 'var(--blue)' }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <h2 className="sec-title">Experience</h2>
                </div>

                {jobs.map((job, i) => (
                    <div key={i} className={`exp-item${openIdx === i ? ' open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                        <div className="exp-header">
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                                <div className="exp-dot"></div>
                                <div>
                                    <div className="exp-company">
                                        {job.company}
                                        {job.badges.map(b => <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>)}
                                    </div>
                                    <div className="exp-meta">{job.meta}</div>
                                </div>
                            </div>
                            <ChevronSvg />
                        </div>
                        {openIdx === i && (
                            <div className="exp-body">
                                <ul className="exp-bullets">
                                    {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                                <div className="tags">
                                    {job.tags.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Compact CTA */}
                <div className="container reveal" style={{ padding: 0, marginTop: '24px' }}>
                    <div className="compact-cta">
                        <div>
                            <div className="compact-cta-text">🚀 Want to work with an engineer who owns architecture end-to-end?</div>
                            <div className="compact-cta-sub">Available for senior backend &amp; team lead roles · Remote or Ahmedabad</div>
                        </div>
                        <div className="compact-cta-btns">
                            <a href="mailto:pragneshkalotara110201@gmail.com" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 22px', fontSize: '0.875rem' }}>Email Me</a>
                            <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="btn-secondary" style={{ textDecoration: 'none', padding: '10px 22px', fontSize: '0.875rem' }}>LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
