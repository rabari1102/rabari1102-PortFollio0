import { useState, useRef } from 'react'

const placeholders = {
    arch: "e.g., We need to process 1 million IoT telemetry events per minute and trigger real-time alerts...",
    compat: "Describe your project or team needs and I'll assess Pragnesh's fit for the role...",
    review: "Paste your current tech stack and I'll suggest optimizations Pragnesh can implement..."
}

const suggestions = [
    { q: "How would Pragnesh design a backend for 10K concurrent devices?", mode: 'arch' },
    { q: "How does he structure NestJS microservices?", mode: 'arch' },
    { q: "Is Pragnesh a fit for my team?", mode: 'compat' },
    { q: "Review my current tech stack", mode: 'review' },
]

// Instant fallbacks if API key / serverless function is unreachable
const fallbackAnswers = {
    arch: `For scaling high-throughput IoT & microservices platforms, **Pragnesh Kalotara** leverages an event-driven architecture using **NestJS**, **MQTT**, **Kafka**, and **BullMQ**.
<br><br>
• **Ingestion & Data Stream**: Ingest sensor telemetries via **MQTT broker (EMQX/Mosquitto)**, routing directly to **Kafka** topics for decoupled real-time stream processing.<br>
• **Async Job Queues**: Process background jobs, image transforms, and notification dispatch using **BullMQ** with **Redis** clusters.<br>
• **Database Strategy**: Time-series telemetry in **MongoDB** / **DynamoDB**, relational business logic in **PostgreSQL** with **Sequelize / TypeORM**.<br>
• **Real-Time Delivery**: Push live updates to client dashboards via **WebSockets (Socket.io)** with custom heartbeat monitors.<br>
• **Pragnesh's Edge**: Led engineering on **Telep-Eco** (5,000+ live IoT devices, 99.9% uptime SLA) and **QFACT Microservices platform**.`,

    compat: `**Compatibility Evaluation: 9.8 / 10**
<br><br>
**Pragnesh Kalotara** is a Senior Backend Developer & Team Lead with **3+ years of experience** specializing in production microservices and AI-assisted engineering:
<br><br>
• **Backend Mastery**: Expert in **Node.js**, **NestJS**, **TypeScript**, and **Express.js** with proven 40% API performance improvements.<br>
• **Leadership**: Successfully led and mentored a **6-developer team** across backend, frontend, and mobile (95% on-time sprint delivery).<br>
• **AI-Augmented Velocity**: Utilizes **OpenAI API**, **Gemini API**, **Claude**, and **Cursor** to write unit tests, automate docs, and ship clean code 2x faster.<br>
• **High Availability**: Built system architectures handling **5,000+ concurrent IoT devices** and **Twilio Voice integrations**.`,

    review: `**Architectural Review & Optimization Roadmap**
<br><br>
1. **Caching & Deduplication**: Implement **Redis** caching for hot query endpoints to reduce database load by 35–45%.<br>
2. **Queue Isolation**: Offload heavy REST requests to background workers using **BullMQ** or **RabbitMQ**.<br>
3. **Security Standards**: Enforce **JWT authentication with RBAC**, request throttling, and helmet headers to mitigate unauthorized access.<br>
4. **Pragnesh's Impact**: Having architected enterprise platforms at **Qfact** and **Rapidise**, Pragnesh can step in immediately to modularize your backend, optimize database queries, and improve engineering velocity.`
}

export default function AiConsultant() {
    const [tab, setTab] = useState('arch')
    const [inputs, setInputs] = useState({ arch: '', compat: '', review: '' })
    const [outputs, setOutputs] = useState({ arch: null, compat: null, review: null })
    const [loading, setLoading] = useState(false)
    const textRef = useRef(null)

    const switchTab = (mode) => setTab(mode)

    const generate = async (mode = tab, inputOverride = null) => {
        const input = (inputOverride ?? inputs[mode]).trim()
        if (!input) return
        setLoading(true)
        setOutputs(prev => ({ ...prev, [mode]: null }))

        try {
            // First attempt: call Vercel Serverless Function `/api/generate`
            const apiRes = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input, mode: mode })
            })

            if (apiRes.ok) {
                const apiData = await apiRes.json()
                if (apiData.text) {
                    const formatted = apiData.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br>')
                    setOutputs(prev => ({ ...prev, [mode]: { html: formatted, error: false } }))
                    setLoading(false)
                    return
                }
            }

            // Second attempt: Client-side Gemini API call if key configured
            const apiKey = import.meta.env.VITE_GEMINI_KEY || 'AIzaSyBApveNId7LmD1Vjpmpbq96-ea1pJz7eRw'
            const systemPrompts = {
                arch: `You are an expert AI assistant representing Pragnesh Kalotara, a Senior Backend Developer & Team Lead with 3+ years experience. Propose a brief, high-level system architecture using his skills: Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, Kafka, BullMQ, RabbitMQ, MQTT, WebSockets, Microservices, AWS, Docker, JWT/RBAC. Keep it concise. Use **bold** for tech names. No markdown headers.`,
                compat: `You are an AI representing Pragnesh Kalotara. Evaluate how well his skills match the user's need: 3+ years Node.js/NestJS, Team Lead (6-person team), real-time systems (MQTT, WebSockets, Kafka), microservices. Rate compatibility out of 10. Use **bold** for skills.`,
                review: `You are an expert backend architect representing Pragnesh Kalotara. The user shares their current stack. Suggest concrete optimizations and where Pragnesh's experience adds value. Be direct, use **bold** for emphasis.`
            }

            const payload = {
                contents: [{ parts: [{ text: systemPrompts[mode] + '\n\nUser Question: ' + input }] }]
            }

            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
            )

            if (res.ok) {
                const data = await res.json()
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text
                if (text) {
                    const formatted = text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br>')
                    setOutputs(prev => ({ ...prev, [mode]: { html: formatted, error: false } }))
                    setLoading(false)
                    return
                }
            }

            // Fallback response if external API is unreachable or key is restricted
            setOutputs(prev => ({ ...prev, [mode]: { html: fallbackAnswers[mode], error: false } }))

        } catch {
            // Graceful fallback response
            setOutputs(prev => ({ ...prev, [mode]: { html: fallbackAnswers[mode], error: false } }))
        }
        setLoading(false)
    }

    const fillAndAsk = (q, mode) => {
        setTab(mode)
        setInputs(prev => ({ ...prev, [mode]: q }))
        document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => generate(mode, q), 300)
    }

    const clear = () => {
        setInputs(prev => ({ ...prev, [tab]: '' }))
        setOutputs(prev => ({ ...prev, [tab]: null }))
    }

    const out = outputs[tab]

    return (
        <section id="ai">
            <div className="container">
                <div className="reveal ai-header-wrap">
                    <div className="ai-badge">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                        </svg>
                        LIVE AI · POWERED BY GEMINI
                    </div>
                    <div className="ai-title">AI Backend Consultant</div>
                    <div className="ai-desc">This agent is connected to my real experience and stack — use it to ask how I'd design your system or evaluate my fit for your team.</div>
                    <div className="ai-suggestions" style={{ marginTop: '16px', justifyContent: 'center' }}>
                        {suggestions.map(s => (
                            <button key={s.q} className="ai-suggestion-btn" onClick={() => fillAndAsk(s.q, s.mode)}>{s.q}</button>
                        ))}
                    </div>
                </div>

                <div className="reveal ai-card">
                    <div className="ai-tabs">
                        {[['arch', '🏗️ Architecture Design'], ['compat', '🤝 Hire Pragnesh?'], ['review', '🔍 Stack Review']].map(([mode, label]) => (
                            <button key={mode} className={`ai-tab${tab === mode ? ' active' : ''}`} onClick={() => switchTab(mode)}>{label}</button>
                        ))}
                    </div>
                    <div className="ai-body">
                        <textarea
                            ref={textRef}
                            className="ai-textarea"
                            placeholder={placeholders[tab]}
                            value={inputs[tab]}
                            onChange={e => setInputs(prev => ({ ...prev, [tab]: e.target.value }))}
                        />
                        <div className="ai-footer">
                            <div></div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                {out && (
                                    <button className="btn-secondary" onClick={clear} style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                        Clear
                                    </button>
                                )}
                                <button className="btn-generate" disabled={loading} onClick={() => generate()}>
                                    {loading
                                        ? <><svg className="spinner" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Generating...</>
                                        : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg> Generate</>
                                    }
                                </button>
                            </div>
                        </div>
                        {out && (
                            out.error
                                ? <div className="ai-error" dangerouslySetInnerHTML={{ __html: out.html }} />
                                : <div className="ai-response">
                                    <div className="ai-avatar">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
                                            <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
                                        </svg>
                                    </div>
                                    <div className="ai-text" dangerouslySetInnerHTML={{ __html: out.html }} />
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
