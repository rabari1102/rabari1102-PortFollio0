import { useEffect, useState, useRef } from 'react'

// ── DATA ──────────────────────────────────────────────────────────────────────
const ROLES = [
  'Senior Backend Engineer',
  'NestJS / Node.js Architect',
  'Team Lead · 6 Devs',
  'IoT Systems Builder',
  'AI-Augmented Developer',
]

const IMPACTS = [
  { num: '3+',    label: 'Years Experience', sub: 'Production systems' },
  { num: '6',     label: 'Team Lead',        sub: 'Backend & Flutter devs' },
  { num: '5K+',   label: 'IoT Devices',      sub: 'Concurrent, real-time' },
  { num: '99.9%', label: 'Uptime SLA',       sub: 'Achieved consistently' },
  { num: '40%',   label: 'API Speedup',      sub: 'Via cache & refactoring' },
  { num: '95%',   label: 'On-Time Delivery', sub: 'Sprint milestone rate' },
  { num: '30%',   label: 'Bug Reduction',    sub: 'After coding standards' },
  { num: '75%',   label: 'Less Breaches',    sub: 'JWT auth framework' },
]

const EXPERIENCE = [
  {
    company: 'Apotec',
    current: true,
    badges: [{ cls: 'badge-current', label: 'Current' }],
    meta: 'Sr. Backend Developer · Dec 2025 – Present · Ahmedabad',
    bullets: [
      'Working on Node.js + TypeScript production codebase, contributing to ongoing features and maintenance',
      'Identifying and resolving bugs across the backend, improving system stability and code quality',
      'Integrating and maintaining third-party APIs within distributed microservices architecture',
      'Gaining hands-on experience with OpenSearch and Elasticsearch for search and analytics use cases',
      'Working with AWS DynamoDB as the primary NoSQL data store in a cloud-native environment',
    ],
    tags: ['Node.js', 'TypeScript', 'AWS DynamoDB', 'OpenSearch', 'Elasticsearch', 'Microservices'],
  },
  {
    company: 'Qfact (Treeroot Informatics)',
    current: false,
    badges: [{ cls: 'badge-lead', label: 'Team Lead' }],
    meta: 'Team Lead & Sr. Backend Developer · Mar 2025 – Present · Remote',
    bullets: [
      'Led, mentored, and guided a team of 6 backend, frontend & Flutter developers — full development lifecycle',
      'Established coding standards and design patterns, improving team velocity by 25% and reducing production bugs by 30%',
      'Directed architecture of scalable NestJS microservices for a complex multi-tenant enterprise workflow platform',
      'Designed complete Twilio Voice ecosystem: inbound/outbound/missed calls, auto ticket creation & FCM notifications',
      'Integrated BullMQ queues for async background processing, image resizing & secure file upload workflows',
      'Developed advanced RBAC for stakeholder/project management modules with Sequelize ORM',
    ],
    tags: ['NestJS', 'TypeScript', 'MySQL', 'PostgreSQL', 'Twilio', 'BullMQ', 'FCM', 'Docker', 'RBAC'],
  },
  {
    company: 'Rapidise (Teksun Inc.)',
    current: false,
    badges: [],
    meta: 'Backend Developer · Sep 2023 – Mar 2025 · On-site, Ahmedabad',
    bullets: [
      'Architected Telep-Eco: real-time MQTT monitoring for 5,000+ concurrent IoT devices (35% tracking efficiency gain)',
      'Developed Telep-AI streaming solution reducing AI model warning response time by 50%',
      'Built Helpdesk Management System, reducing ticket response time by 30% with real-time WebSocket notifications',
      'Implemented BAP-TOOL (Quotation Management), increasing quotation generation speed by 40%',
      'Designed event-driven microservices supporting 99.9% uptime under high-volume data streams',
      'Established JWT authentication framework reducing unauthorized access attempts by 75%',
      'Created comprehensive API documentation and monitoring systems to ensure high system reliability',
    ],
    tags: ['Node.js', 'MQTT', 'MongoDB', 'Socket.io', 'Electron.js', 'AWS S3', 'JWT', 'NestJS'],
  },
  {
    company: 'TUVOC Technology',
    current: false,
    badges: [],
    meta: 'Backend Developer · Jan 2023 – Aug 2023 · On-site',
    bullets: [
      'Developed RESTful APIs using Express.js, improving backend response times by 30% with detailed Swagger documentation',
      'Optimized MongoDB schemas with strategic indexing, reducing database query times by 45%',
      'Implemented real-time data synchronization system using WebSockets, enhancing live data tracking capabilities',
    ],
    tags: ['Express.js', 'Node.js', 'MongoDB', 'WebSockets', 'Swagger', 'TypeScript'],
  },
]

const PROJECTS = [
  {
    tag: 'IoT Platform',
    title: 'Telep-Eco',
    sub: 'Real-time IoT Monitoring Platform',
    arch: 'MQTT · Event-Driven · Microservices',
    problem: 'Handle 5,000+ IoT devices in real time with low latency',
    role: 'Architected MQTT backend & microservices solo',
    tags: ['Node.js', 'MQTT', 'MongoDB', 'Socket.io', 'AWS S3'],
    outcome: '✅ 99.9% uptime · 25% lower bandwidth · 5,000+ concurrent devices',
    pills: ['5,000+ devices', '25% less overhead', '99.9% uptime'],
  },
  {
    tag: 'Enterprise SaaS',
    title: 'QFACT Platform',
    sub: 'Modular Enterprise Workflow Platform',
    arch: 'NestJS Microservices · BullMQ · Queue-Driven',
    problem: 'Enterprise platform needing async workflows & voice integration',
    role: 'Led 6-dev team, designed full microservices architecture',
    tags: ['NestJS', 'TypeScript', 'MySQL', 'Twilio', 'BullMQ', 'FCM'],
    outcome: '✅ 40% faster APIs · 35% efficiency gain · 95% on-time delivery',
    pills: ['40% faster APIs', '35% efficiency gain', '6-dev team'],
  },
  {
    tag: 'AI Desktop App',
    title: 'Telep-AI',
    sub: 'AI-Powered Desktop Streaming App',
    arch: 'Electron.js · RTSP Pipeline · Real-time AI',
    problem: 'Real-time AI camera monitoring with low detection latency',
    role: 'Designed cross-platform app + RTSP streaming pipeline',
    tags: ['Electron.js', 'Node.js', 'SQLite', 'RTSP', 'GStreamer'],
    outcome: '✅ 50% faster warning response · 40% inference boost · Multi-platform',
    pills: ['50% faster response', '40% inference boost', 'Multi-platform'],
  },
  {
    tag: 'Healthcare Backend',
    title: 'Hospital System',
    sub: 'Comprehensive Hospital Management Platform',
    arch: 'NestJS Modular · ACID-compliant · Dockerized',
    problem: 'Complex modular healthcare platform for patients, appointments & billing',
    role: 'Solo architect — NestJS modular backend with full ACID compliance',
    tags: ['NestJS', 'PostgreSQL', 'TypeORM', 'Docker', 'JWT', 'RBAC'],
    outcome: '✅ 20% less patient wait time · ACID-compliant · Fully Dockerized',
    pills: ['20% less wait time', 'ACID compliant', 'Dockerized'],
  },
  {
    tag: 'IT Support Tool',
    title: 'Helpdesk System',
    sub: 'Employee Ticket Management & Support Platform',
    arch: 'Node.js · WebSockets · RBAC · Real-time Notifications',
    problem: 'Streamline employee ticket generation, assignment and resolution workflows',
    role: 'Designed full backend — APIs, RBAC, real-time notifications, integrations',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'WebSockets', 'Slack API', 'MS Teams'],
    outcome: '✅ 30% faster response time · 25% efficiency gain · SLA automation',
    pills: ['30% faster response', '25% efficiency gain', 'SLA met'],
  },
  {
    tag: 'Workflow Automation',
    title: 'Quotation Manager',
    sub: 'BAP-TOOL — Quotation Management System',
    arch: 'Express.js · JWT · AWS S3 · Workflow Automation',
    problem: 'Automate quotation generation across multiple manufacturing phases',
    role: 'Built end-to-end workflow automation with JWT auth and AWS S3 storage',
    tags: ['Node.js', 'Angular', 'TypeScript', 'MongoDB', 'AWS S3', 'JWT'],
    outcome: '✅ 40% faster quotation speed · 60% security improvement · Fault-tolerant',
    pills: ['40% faster', '60% more secure', 'AWS S3'],
  },
]

const SKILL_BARS = [
  { cat: 'Backend Core', sub: 'Primary expertise', bars: [
    { name: 'Node.js', pct: 98 }, { name: 'NestJS', pct: 95 },
    { name: 'TypeScript', pct: 93 }, { name: 'Express.js', pct: 90 },
  ]},
  { cat: 'Databases', sub: 'Data layer mastery', bars: [
    { name: 'MongoDB', pct: 92 }, { name: 'PostgreSQL', pct: 90 },
    { name: 'MySQL', pct: 88 }, { name: 'Redis', pct: 85 },
  ]},
  { cat: 'Architecture', sub: 'System design', bars: [
    { name: 'Microservices', pct: 90 }, { name: 'Event-Driven', pct: 88 },
    { name: 'WebSockets', pct: 87 }, { name: 'MQTT / IoT', pct: 85 },
  ]},
  { cat: 'Cloud & DevOps', sub: 'Infrastructure', bars: [
    { name: 'AWS (S3/EC2/DDB)', pct: 83 }, { name: 'Docker', pct: 88 },
    { name: 'CI/CD (Jenkins)', pct: 80 }, { name: 'Firebase', pct: 82 },
  ]},
  { cat: 'AI Integration', sub: 'AI-augmented systems', bars: [
    { name: 'OpenAI API', pct: 88 }, { name: 'Gemini API', pct: 83 },
    { name: 'LLM Pipelines', pct: 80 }, { name: 'RTSP / GStreamer', pct: 78 },
  ]},
  { cat: 'Message Queues', sub: 'Async & streaming', bars: [
    { name: 'Kafka', pct: 85 }, { name: 'BullMQ', pct: 90 },
    { name: 'RabbitMQ', pct: 80 }, { name: 'Node-RED', pct: 75 },
  ]},
]

const ALL_SKILLS = [
  'Node.js', 'NestJS', 'Express.js', 'TypeScript', 'JavaScript', 'Electron.js',
  'MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB', 'Redis', 'SQLite', 'OpenSearch', 'Elasticsearch',
  'Microservices', 'Event-Driven', 'WebSockets', 'REST APIs', 'GraphQL', 'MQTT',
  'JWT', 'OAuth2.0', 'RBAC', 'FCM', 'Twilio',
  'Kafka', 'BullMQ', 'RabbitMQ', 'Node-RED',
  'AWS S3', 'AWS EC2', 'Docker', 'Jenkins', 'Firebase',
  'TypeORM', 'Mongoose', 'Sequelize', 'Prisma', 'Swagger', 'Git',
  'OpenAI API', 'Gemini API', 'RTSP', 'GStreamer', 'LangChain',
]

const AI_CARDS = [
  { icon: '🤖', title: 'LLM Integration', desc: 'Production-grade integration of OpenAI and Gemini APIs into backend services with streaming, rate limiting, and error handling.' },
  { icon: '🔍', title: 'AI-Powered Search', desc: 'Semantic search pipelines using vector embeddings and RAG architecture on top of Elasticsearch/OpenSearch.' },
  { icon: '📹', title: 'Computer Vision', desc: 'Real-time AI inference pipelines using RTSP streams and GStreamer for IoT camera monitoring platforms.' },
  { icon: '⚡', title: 'Async AI Queues', desc: 'BullMQ-powered background AI processing jobs for batch inference, model outputs, and report generation.' },
  { icon: '🛡️', title: 'AI Safety Layers', desc: 'Content moderation, output validation, and guardrails for AI-generated content in production APIs.' },
  { icon: '📊', title: 'Prompt Engineering', desc: 'System prompt design, few-shot examples, and chain-of-thought patterns for reliable structured outputs.' },
]

const TESTIMONIALS = [
  { quote: 'Pragnesh delivered the IoT backend well ahead of schedule. His MQTT architecture was clean, scalable, and exactly what we needed for 5,000+ devices.', name: 'Senior Engineer', role: 'Teksun Inc.', init: 'S' },
  { quote: 'As a Team Lead, Pragnesh raised the entire team\'s velocity. His coding standards and architecture reviews meaningfully reduced production issues.', name: 'Product Manager', role: 'Treeroot Informatics', init: 'P' },
  { quote: 'His NestJS microservices expertise is top-tier. He designed our entire voice platform with Twilio from scratch — robust and well-documented.', name: 'CTO', role: 'Qfact Platform', init: 'C' },
]

const TICKER_ITEMS = [
  'Node.js', 'NestJS', 'TypeScript', 'Microservices', 'IoT · MQTT', 'AI Integration',
  'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Docker', 'AWS', 'Team Lead',
  'WebSockets', 'GraphQL', 'BullMQ', 'Elasticsearch', 'OpenAI API', 'RBAC · JWT',
]

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const h = () => {
      const el = document.documentElement
      setW(((el.scrollTop || document.body.scrollTop) / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="scroll-progress" style={{ width: w + '%' }} />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['home','impact','experience','projects','skills','ai-mastery','edu-contact']
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); navTo('home') }}>
        KP<span>.DEV</span>
      </a>
      <ul className="nav-links">
        {[['home','Home'],['impact','Impact'],['experience','Experience'],['projects','Projects'],['skills','Skills'],['ai-mastery','AI']].map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={e => { e.preventDefault(); navTo(id) }}>{label}</a>
          </li>
        ))}
        <li><a href="#edu-contact" className="nav-cta" onClick={e => { e.preventDefault(); navTo('edu-contact') }}>Hire Me</a></li>
      </ul>
      <div className="nav-hamburger" onClick={() => navTo('edu-contact')}>
        <span /><span /><span />
      </div>
    </nav>
  )
}

function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const full = ROLES[roleIdx]
    if (!deleting && displayed.length < full.length) {
      timeout.current = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === full.length) {
      timeout.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timeout.current)
  }, [displayed, deleting, roleIdx])

  const navTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home">
      <div className="container">
        <div className="hero-layout">
          <div className="reveal">
            <div className="hero-available">
              <div className="pulse-dot" />
              AVAILABLE FOR OPPORTUNITIES · WORLDWIDE
            </div>

            <h1 className="hero-name">
              PRAGNESH<br /><span className="accent">KALOTARA</span>
            </h1>

            <div className="hero-typing-wrap">
              <span>{displayed}</span>
              <span className="hero-typing-cursor">|</span>
            </div>

            <p className="hero-desc">
              Results-driven Team Lead & Backend Developer with <strong>3+ years</strong> designing scalable microservices
              and real-time platforms. Specialized in <strong>Node.js, NestJS & TypeScript</strong> — optimized performance
              by 40%, led teams of 6, shipped production systems with 99.9% uptime.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navTo('edu-contact')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Hire Me
              </button>
              <a href="https://drive.google.com/file/d/1-sj2u70gfamVeGHpOp8MrB5rkuvipjwE/view?usp=sharing" target="_blank" className="btn-resume" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
              <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="btn-secondary" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/rabari1102" target="_blank" className="btn-secondary" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                GitHub
              </a>
            </div>

            <div className="hero-metrics">
              {[['3+','Years Exp'],['6','Team Lead'],['5K+','IoT Devices'],['99.9%','Uptime']].map(([v,l]) => (
                <div key={l}><div className="metric-val">{v}</div><div className="metric-lbl">{l}</div></div>
              ))}
            </div>
          </div>

          <div className="hero-terminal reveal" style={{ transitionDelay: '200ms', marginTop: '-2rem', marginLeft: '1.5rem' }}>
            <div className="terminal-card">
              <div className="terminal-bar">
                <span className="t-dot t-red" /><span className="t-dot t-yellow" /><span className="t-dot t-green" />
                <span className="t-title">bash — pragnesh@dev</span>
              </div>
              <div className="terminal-body">
                <div className="t-line"><span className="t-prompt">➜</span><span className="t-tilde">~</span><span className="t-cmd">whoami</span></div>
                <div className="t-out-cyan">pragnesh_kalotara</div>
                <div className="t-line t-gap"><span className="t-prompt">➜</span><span className="t-tilde">~</span><span className="t-cmd">cat about.json</span></div>
                <div className="t-json-block">
                  <span className="t-brace">{'{'}</span>
                  <div className="t-json-line"><span className="t-key">"role"</span><span className="t-colon">:</span><span className="t-str">"Sr. Backend Engineer & Team Lead"</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"stack"</span><span className="t-colon">:</span><span className="t-str">["NestJS","Node.js","TypeScript"]</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"experience"</span><span className="t-colon">:</span><span className="t-str">"3+ years"</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"team_led"</span><span className="t-colon">:</span><span className="t-num">6</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"iot_devices"</span><span className="t-colon">:</span><span className="t-num">5000</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"uptime"</span><span className="t-colon">:</span><span className="t-str">"99.9%"</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"location"</span><span className="t-colon">:</span><span className="t-str">"Ahmedabad, India"</span><span className="t-comma">,</span></div>
                  <div className="t-json-line"><span className="t-key">"available"</span><span className="t-colon">:</span><span className="t-bool">true</span></div>
                  <span className="t-brace">{'}'}</span>
                </div>
                <div className="t-line t-gap"><span className="t-prompt">➜</span><span className="t-tilde">~</span><span className="t-cmd">./get_in_touch.sh</span></div>
                <div className="t-out-emerald">✅ Ready to build great systems together!</div>
                <div className="t-cursor-line"><span className="t-prompt">➜</span><span className="t-tilde">~</span><span className="t-cursor-blink">▋</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AiTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ai-ticker">
      <div className="ai-ticker-track">
        {items.map((item, i) => (
          <span className="ticker-item" key={i}>
            <span className="ticker-dot" />
            <strong>{item}</strong>
          </span>
        ))}
      </div>
    </div>
  )
}

function Impact() {
  return (
    <section id="impact">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="sec-label">By The Numbers</p>
          <h2 className="sec-title">Real-World Impact</h2>
          <div className="sec-divider" style={{ margin: '0.8rem auto 0' }} />
        </div>
        <div className="impact-grid">
          {IMPACTS.map((m, i) => (
            <div className="impact-card reveal" key={m.label} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="impact-num">{m.num}</div>
              <div className="impact-label">{m.label}</div>
              <div className="impact-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="sec-label">Career</p>
          <h2 className="sec-title">Work Experience</h2>
          <div className="sec-divider" style={{ margin: '0.8rem auto 0' }} />
        </div>
        <div className="timeline-centered">
          {/* Center spine */}
          <div className="timeline-spine" />
          {EXPERIENCE.map((job, i) => {
            const isRight = i % 2 === 0
            return (
              <div className={`tl-row reveal ${isRight ? 'tl-right' : 'tl-left'}`} key={job.company} style={{ transitionDelay: `${i * 150}ms` }}>
                {/* Empty spacer for the opposite side */}
                <div className="tl-spacer" />
                {/* Center dot */}
                <div className={`tl-dot ${job.current ? 'tl-dot-current' : ''}`}>
                  <div className="tl-dot-inner" />
                </div>
                {/* Card */}
                <div className="tl-card">
                  <div className="tl-badges">
                    {job.badges.map(b => <span key={b.label} className={`tl-badge ${b.cls}`}>{b.label}</span>)}
                  </div>
                  <div className="tl-company">{job.company}</div>
                  <div className="tl-meta">{job.meta}</div>
                  <ul className="tl-bullets">
                    {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <div className="tl-tags">
                    {job.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="reveal">
          <p className="sec-label">Portfolio</p>
          <h2 className="sec-title">Featured Projects</h2>
          <div className="sec-divider" />
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className="proj-card reveal" key={p.title} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="proj-tag">{p.tag}</span>
              <h3 className="proj-title">{p.title}</h3>
              <div className="proj-sub">{p.sub}</div>
              <div className="proj-arch">{p.arch}</div>
              <p className="proj-desc">
                <strong>Problem:</strong> {p.problem}<br />
                <strong>Role:</strong> {p.role}
              </p>
              <div className="proj-outcome">{p.outcome}</div>
              <div className="proj-pills">
                {p.pills.map(pill => <span key={pill} className="proj-pill">{pill}</span>)}
              </div>
              <div className="proj-stack">
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
              <a href="https://github.com/rabari1102" target="_blank" className="proj-link" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%'
          })
        }
      })
    }, { threshold: 0.2 })
    document.querySelectorAll('.skill-cat').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills">
      <div className="container">
        <div className="reveal">
          <p className="sec-label">Technical Expertise</p>
          <h2 className="sec-title">Skills & Proficiency</h2>
          <div className="sec-divider" />
        </div>
        <div className="skills-display">
          {SKILL_BARS.map((cat, i) => (
            <div className="skill-cat reveal" key={cat.cat} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="skill-cat-title">{cat.cat}</div>
              <div className="skill-cat-sub">{cat.sub}</div>
              {cat.bars.map(bar => (
                <div className="skill-bar-row" key={bar.name}>
                  <div className="skill-bar-label"><span>{bar.name}</span><span>{bar.pct}%</span></div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" data-width={bar.pct} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="skill-tags-section reveal">
          <div className="skill-tags-group">
            <div className="skill-tags-title">Complete Technical Arsenal</div>
            <div className="skill-tags-sub">// Every technology I work with in production</div>
            <div className="skill-tags">
              {ALL_SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AiMastery() {
  return (
    <section id="ai-mastery">
      <div className="container">
        <div className="reveal">
          <p className="sec-label">AI-Augmented Development</p>
          <h2 className="sec-title">AI Capabilities</h2>
          <div className="sec-divider" />
        </div>
        <div className="ai-grid">
          {AI_CARDS.map((card, i) => (
            <div className="ai-card reveal" key={card.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="ai-card-icon">{card.icon}</div>
              <div className="ai-card-title">{card.title}</div>
              <p className="ai-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="sec-label">Social Proof</p>
          <h2 className="sec-title">What People Say</h2>
          <div className="sec-divider" style={{ margin: '0.8rem auto 0' }} />
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card reveal" key={t.name} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="testi-quote">"</div>
              <p className="testi-text">{t.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.init}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText('pkb110201@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="edu-contact">
      <div className="container">
        <div className="contact-inner">
          <div className="reveal">
            <p className="sec-label">Get In Touch</p>
            <h2 className="sec-title">Let's Build<br />Something Great</h2>
            <div className="sec-divider" style={{ margin: '0.8rem auto 2rem' }} />
          </div>
          <p className="reveal" style={{ color: 'var(--muted)', marginBottom: '1rem' }}>
            Whether you have a complex backend to architect, an AI feature to integrate,
            or just want to talk tech — I'm always open.
          </p>
          <a href="mailto:pkb110201@gmail.com" className="contact-email-big reveal">
            pkb110201@gmail.com
          </a>
          <div className="contact-links reveal">
            <button className="contact-link" onClick={copy}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
            <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="contact-link" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://github.com/rabari1102" target="_blank" className="contact-link" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://drive.google.com/file/d/1-sj2u70gfamVeGHpOp8MrB5rkuvipjwE/view?usp=sharing" target="_blank" className="contact-link" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Resume
            </a>
          </div>
          <button className="btn-primary reveal" onClick={() => window.open('mailto:pkb110201@gmail.com')}>
            Say Hello →
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-logo">KP.DEV</div>
      <span>Pragnesh Kalotara · Backend & AI Developer</span>
      <span>© 2026</span>
    </footer>
  )
}

function MobileNav() {
  const navTo = (id, btn) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    document.querySelectorAll('.mobile-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
  }
  const items = [
    { id: 'home', label: 'Home', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
    { id: 'impact', label: 'Impact', icon: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></> },
    { id: 'experience', label: 'Work', icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></> },
    { id: 'projects', label: 'Projects', icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
    { id: 'skills', label: 'Skills', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
  ]
  return (
    <div className="mobile-nav">
      <div className="mobile-nav-inner">
        {items.map((n, i) => (
          <button key={n.id} className={`mobile-btn${i === 0 ? ' active' : ''}`} onClick={e => navTo(n.id, e.currentTarget)}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{n.icon}</svg>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────────
export default function Portfolio() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const follower = document.getElementById('mouse-follower')
    let particles = [], raf
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2
    let folX = mouseX, folY = mouseY

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouseMove)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const codeSnippets = ['async', 'await', 'const', '=>', '{ }', '[]', 'return', 'export', 'import', '.then()', 'null', 'void', 'class', 'type', 'interface', 'NestJS', 'Node', 'Docker']

    const initParticles = () => {
      particles = []
      if (reduced) return
      const n = window.innerWidth < 768 ? 30 : 65
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.4 + 0.3,
          isCode: Math.random() < 0.2,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          codeVy: -0.25 - Math.random() * 0.3,
          alpha: 0.04 + Math.random() * 0.07,
        })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(34,211,238,0.03)'
      ctx.lineWidth = 1
      const s = 70
      for (let x = 0; x < canvas.width; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke() }
      for (let y = 0; y < canvas.height; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke() }
    }

    const drawBg = () => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      g.addColorStop(0, '#03040a'); g.addColorStop(0.5, '#060810'); g.addColorStop(1, '#020307')
      ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      folX += (mouseX - folX) * 0.12; folY += (mouseY - folY) * 0.12
      if (follower) { follower.style.left = folX + 'px'; follower.style.top = folY + 'px' }

      if (!reduced) {
        ctx.font = "12px 'Fira Code', monospace"
        particles.forEach((p, i) => {
          if (p.isCode) {
            p.y += p.codeVy
            if (p.y < -20) { p.y = canvas.height + 20; p.x = Math.random() * canvas.width }
            ctx.fillStyle = `rgba(34,211,238,${p.alpha})`
            ctx.fillText(p.text, p.x, p.y)
          } else {
            p.x += p.vx; p.y += p.vy
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1
            const mDx = p.x - mouseX, mDy = p.y - mouseY, mDist = Math.sqrt(mDx * mDx + mDy * mDy)
            if (mDist < 150) { p.x += mDx * 0.01; p.y += mDy * 0.01 }
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
            ctx.fillStyle = mDist < 120 ? 'rgba(255,255,255,0.8)' : 'rgba(34,211,238,.3)'; ctx.fill()
            for (let j = i + 1; j < particles.length; j++) {
              const q = particles[j]
              if (q.isCode) continue
              const dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy)
              if (d < 130) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(34,211,238,${0.07 - (d / 130) * 0.07})`; ctx.lineWidth = 0.4; ctx.stroke() }
            }
          }
        })
      }
      raf = requestAnimationFrame(drawBg)
    }

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles() }
    window.addEventListener('resize', resize)
    resize(); drawBg()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <canvas id="bg-canvas" />
      <div id="mouse-follower" />
      <Nav />
      <main>
        <Hero />
        <AiTicker />
        <Impact />
        <Experience />
        <Projects />
        <Skills />
        <AiMastery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}
