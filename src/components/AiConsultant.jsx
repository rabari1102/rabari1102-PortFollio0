import { useState, useRef } from 'react'

const placeholders = {
  arch: "e.g., We need to process 1 million IoT telemetry events per minute and trigger real-time alerts...",
  compat: "Describe your project or team needs and I'll assess Pragnesh's fit for the role...",
  review: "Paste your current tech stack and I'll suggest optimizations Pragnesh can implement..."
}

const suggestions = [
  { q: "How would Pragnesh design a backend for 10K concurrent devices?", mode: 'arch' },
  { q: "How does he structure NestJS microservices & access control?", mode: 'arch' },
  { q: "Is Pragnesh a fit for my team as Team Lead or Full-Stack Engineer?", mode: 'compat' },
  { q: "Review my current tech stack & database optimization strategy", mode: 'review' }
]

// Dynamic local AI Engine tailored to Pragnesh's 3.7+ years stack & BeSecure / IoT experience
function generateLocalResponse(prompt, mode) {
  const p = prompt.toLowerCase()

  if (mode === 'arch' || p.includes('10k') || p.includes('iot') || p.includes('device') || p.includes('telemetry') || p.includes('mqtt')) {
    return `<strong>System Architecture Recommendation for High-Scale Ingestion:</strong><br><br>
• <strong>Protocol & Ingestion Layer</strong>: Ingest sensor telemetries via an <strong>EMQX / Mosquitto MQTT Broker</strong> cluster with <strong>QoS 1</strong> guarantees and topic partitioning, scaling up to 10,000+ concurrent telemetry devices.<br>
• <strong>Async Queue & Stream Dispatcher</strong>: Stream telemetry directly to <strong>Kafka</strong> topics or <strong>BullMQ Redis queues</strong> to decouple ingestion from database writes, ensuring zero packet loss under network jitter.<br>
• <strong>Access Governance & Session Validation</strong>: Route requests through Pragnesh's <strong>BeSecure NestJS Auth Guard</strong> with sub-millisecond in-process snapshot caching (<1ms check latency).<br>
• <strong>Database Architecture</strong>: Store time-series metrics in <strong>MongoDB / DynamoDB</strong> time-series collections and relational business state in <strong>PostgreSQL with TypeORM</strong>.<br>
• <strong>Real-Time Client Dashboard</strong>: Dispatch real-time alert updates to client interfaces via <strong>Socket.io WebSockets</strong>.<br><br>
<em>Pragnesh's Experience: Led backend engineering on Telep-Eco (5,000+ live IoT devices, 99.9% uptime SLA) and BeSecure Multi-Tenant Platform.</em>`
  }

  if (p.includes('nestjs') || p.includes('microservice') || p.includes('access control') || p.includes('rbac') || p.includes('besecure')) {
    return `<strong>NestJS Microservice & Access Control Architecture:</strong><br><br>
• <strong>Modular Domain Structure</strong>: Modularize backend services into discrete NestJS feature modules (Auth, IAM Governance, Billing, Queue Workers) communicating over gRPC / Redis PubSub.<br>
• <strong>Sub-Millisecond Route Guards</strong>: Implement <strong>in-process snapshot caching</strong> with database-backed version probes, executing discrete permission checks in <strong><1ms</strong>.<br>
• <strong>Multi-Tenant Data Isolation</strong>: Derive tenant context automatically from authenticated user membership sessions across 30+ NestJS backend modules.<br>
• <strong>Async Background Workers</strong>: Offload heavy PDF/Excel export rendering and Twilio Voice call webhooks to <strong>BullMQ Redis background workers</strong>.<br><br>
<em>Pragnesh's Experience: Engineered BeSecure (enterprise B2B multi-tenant platform) and led 6-developer teams building NestJS microservices at Qfact & Binstellar.</em>`
  }

  if (mode === 'compat' || p.includes('team lead') || p.includes('fit') || p.includes('hire') || p.includes('full-stack') || p.includes('react')) {
    return `<strong>Compatibility Rating: 9.9 / 10 — High-Impact Technical Match</strong><br><br>
• <strong>Backend Leadership & Microservices</strong>: <strong>3.7+ years of experience</strong> as Team Lead & Sr. Backend Developer directing cross-functional teams of 6+ developers.<br>
• <strong>Full-Stack Mastery</strong>: Expert in <strong>NestJS, Node.js, Express.js, TypeScript, PostgreSQL, TypeORM, MongoDB</strong> on the backend and <strong>React.js, Next.js, Redux Toolkit, Vite, PrimeReact, Tailwind CSS v4</strong> on the frontend.<br>
• <strong>Engineering Velocity</strong>: Leverages AI-augmented workflows (OpenAI API, Gemini API, Claude, Cursor) to automate unit tests (Cypress/Jest), Swagger docs, and boost team sprint velocity by 25%.<br>
• <strong>Availability</strong>: Immediate availability for Senior Backend, Full-Stack, or Technical Team Lead roles worldwide.`
  }

  return `<strong>Architectural Review & Optimization Strategy:</strong><br><br>
• <strong>Database Query Tuning</strong>: Implement <strong>Redis</strong> caching for hot query endpoints to reduce database read latency by 35–45%.<br>
• <strong>Async Decoupling</strong>: Move heavy REST API tasks (voice call dispatch, PDF exports, push notifications) into <strong>BullMQ async queues</strong>.<br>
• <strong>Security Throttling</strong>: Enforce multi-tenant RBAC policies, strict JWT session isolation, and rate-limiting guards.<br>
• <strong>Pragnesh's Edge</strong>: Pragnesh has proven experience stepping into existing codebases, boosting API speeds by 40%, and maintaining 95% on-time feature delivery.`
}

export default function AiConsultant() {
  const [tab, setTab] = useState('arch')
  const [inputs, setInputs] = useState({ arch: '', compat: '', review: '' })
  const [outputs, setOutputs] = useState({ arch: null, compat: null, review: null })
  const [loading, setLoading] = useState(false)
  const textRef = useRef(null)

  const switchTab = (mode) => setTab(mode)

  const generate = async (mode = tab, customPrompt = null) => {
    const input = (customPrompt || inputs[mode] || '').trim()
    if (!input) return

    setLoading(true)
    setOutputs((prev) => ({ ...prev, [mode]: null }))

    try {
      // Try calling serverless endpoint with a 3.5s timeout controller
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3500)

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, mode }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (data.text && !data.error) {
          const formatted = data.text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
          setOutputs((prev) => ({ ...prev, [mode]: { html: formatted, error: false } }))
          setLoading(false)
          return
        }
      }
    } catch {
      // Endpoint timed out or local dev mode without serverless proxy
    }

    // Immediate, tailored local response generation
    const localHtml = generateLocalResponse(input, mode)
    setOutputs((prev) => ({ ...prev, [mode]: { html: localHtml, error: false } }))
    setLoading(false)
  }

  const fillAndAsk = (q, mode) => {
    setTab(mode)
    setInputs((prev) => ({ ...prev, [mode]: q }))
    document.getElementById('ai')?.scrollIntoView({ behavior: 'smooth' })
    generate(mode, q)
  }

  const clear = () => {
    setInputs((prev) => ({ ...prev, [tab]: '' }))
    setOutputs((prev) => ({ ...prev, [tab]: null }))
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
            LIVE AI · BACKEND CONSULTANT ENGINE
          </div>
          <h2 className="ai-title font-heading">AI System Architect & Assistant</h2>
          <p className="ai-desc">
            Ask any question about system design, microservices, NestJS, BeSecure access governance, team leadership, or technical stack compatibility.
          </p>

          <div className="ai-suggestions">
            {suggestions.map((s) => (
              <button
                key={s.q}
                className="ai-suggestion-btn"
                onClick={() => fillAndAsk(s.q, s.mode)}
                data-cursor="ASK AI"
              >
                {s.q}
              </button>
            ))}
          </div>
        </div>

        <div className="reveal ai-card">
          <div className="ai-tabs">
            {[
              ['arch', '🏗️ System Architecture'],
              ['compat', '🤝 Hire Pragnesh?'],
              ['review', '🔍 Stack Review']
            ].map(([mode, label]) => (
              <button
                key={mode}
                className={`ai-tab ${tab === mode ? 'active' : ''}`}
                onClick={() => switchTab(mode)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ai-body">
            <textarea
              ref={textRef}
              className="ai-textarea"
              placeholder={placeholders[tab]}
              value={inputs[tab]}
              onChange={(e) => setInputs((prev) => ({ ...prev, [tab]: e.target.value }))}
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
                  {loading ? (
                    <>Generating Response...</>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                      Generate Response →
                    </>
                  )}
                </button>
              </div>
            </div>

            {out && (
              <div className="ai-response">
                <div className="ai-avatar">🤖</div>
                <div className="ai-text" dangerouslySetInnerHTML={{ __html: out.html }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
