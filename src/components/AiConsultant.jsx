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

        const systemPrompts = {
            arch: `You are an expert AI assistant representing Pragnesh Kalotara, a Senior Backend Developer & Team Lead with 3+ years experience. Propose a brief, high-level system architecture using his skills: Node.js, NestJS, TypeScript, MongoDB, PostgreSQL, Redis, Kafka, BullMQ, RabbitMQ, MQTT, WebSockets, Microservices, AWS (DynamoDB, S3, OpenSearch, Elasticsearch), Docker, JWT/RBAC, Twilio Voice, FCM. Keep it concise and highlight why Pragnesh is the right person to build it. Use **bold** for tech names. No markdown headers.`,
            compat: `You are an AI representing Pragnesh Kalotara. Evaluate how well his skills match the user's need: 3+ years Node.js/NestJS, Team Lead (6-person team), real-time systems (MQTT, WebSockets, Kafka, BullMQ), cloud (AWS DynamoDB/S3/OpenSearch/Elasticsearch), microservices event-driven architecture, Twilio Voice integration, security (JWT/OAuth2.0/RBAC), AI tool power user (ChatGPT Pro, Gemini Pro, Claude, Cursor). Be specific and rate compatibility out of 10. Use **bold** for skills.`,
            review: `You are an expert backend architect representing Pragnesh Kalotara. The user shares their current stack. Suggest concrete optimizations and where Pragnesh's experience adds the most value. Be direct, use **bold** for emphasis. No markdown headers.`
        }

        const apiKey = import.meta.env.VITE_GEMINI_KEY || 'AIzaSyBApveNId7LmD1Vjpmpbq96-ea1pJz7eRw'
        const payload = {
            contents: [{
                parts: [{ text: systemPrompts[mode] + '\n\nUser Question: ' + input }]
            }]
        }

        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
            )
            const data = await res.json()
            if (!res.ok) throw new Error(data.error?.message || 'Gemini API Error')
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.'
            const formatted = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>')
            setOutputs(prev => ({ ...prev, [mode]: { html: formatted, error: false } }))
        } catch (err) {
            setOutputs(prev => ({ ...prev, [mode]: { html: `⚠️ AI error: ${err.message}. Check your VITE_GEMINI_KEY in .env.local`, error: true } }))
        }
        setLoading(false)
    }


    const fillAndAsk = (q, mode) => {
        setTab(mode)
        setInputs(prev => ({ ...prev, [mode]: q }))
        document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => generate(mode, q), 400)
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
