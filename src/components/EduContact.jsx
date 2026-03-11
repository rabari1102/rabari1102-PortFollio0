import { useState } from 'react'

export default function EduContact() {
    const [status, setStatus] = useState(null) // null | 'sending' | 'ok' | 'err'
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    access_key: 'e2b0c3a1-5f8d-4a2b-b8c3-1f2e3d4c5b6a',
                    subject: "New Portfolio Contact: Let's Build Together",
                    from_name: form.name,
                    ...form
                })
            })
            const data = await res.json()
            if (res.ok && data.success) { setStatus('ok'); setForm({ name: '', email: '', message: '' }) }
            else setStatus('err')
        } catch { setStatus('err') }
        setTimeout(() => setStatus(null), 5000)
    }

    return (
        <section id="edu-contact">
            <div className="container">
                <div className="two-col">
                    {/* Education */}
                    <div className="reveal">
                        <div className="sec-header" style={{ marginBottom: '28px' }}>
                            <svg style={{ color: 'var(--emerald)' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Education</h2>
                        </div>
                        <div className="edu-card">
                            <div className="edu-date">2018 – 2023</div>
                            <div className="edu-deg">B.Tech – Instrumentation &amp; Control Engineering</div>
                            <div className="edu-school">Shantilal Shah Government Engineering College, Bhavnagar</div>
                            <div className="edu-spi">SPI: 7.00</div>
                        </div>

                        {/* GitHub Activity Card */}
                        <div className="github-activity-card" style={{ marginTop: '24px' }}>
                            <div className="github-activity-header">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                <span>GitHub · pragneshkalotara</span>
                                <a href="https://github.com/pragneshkalotara" target="_blank" rel="noopener noreferrer" className="github-view-link">View →</a>
                            </div>
                            <img
                                src="https://ghchart.rshah.org/22d3ee/pragneshkalotara"
                                alt="GitHub Contribution Chart"
                                className="github-contrib-chart"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <div className="github-stats-row">
                                {[
                                    ['📦', 'Public Repos'],
                                    ['⭐', 'Contributions'],
                                    ['🍴', 'Open Source'],
                                ].map(([icon, label]) => (
                                    <div key={label} className="github-stat-item">
                                        <span>{icon}</span>
                                        <span className="github-stat-label">{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="reveal" style={{ transitionDelay: '150ms' }}>
                        <div className="contact-card">
                            <div className="contact-title">Let's Build Together</div>
                            <p className="contact-p">I'm always keen to connect with engineering leaders and collaborate on projects that demand high availability and architectural excellence. Send me a message below!</p>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <input type="text" className="form-input" placeholder="Your Name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-input" placeholder="Your Email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                                </div>
                                <div className="form-group">
                                    <textarea className="ai-textarea" placeholder="Your Message" required style={{ height: '100px' }} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                                </div>
                                <button type="submit" className="btn-generate" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} disabled={status === 'sending'}>
                                    {status === 'sending' ? (
                                        <><span className="spinner-sm"></span> Sending...</>
                                    ) : (
                                        <>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                            Send Message
                                        </>
                                    )}
                                </button>
                                {status === 'ok' && <div style={{ fontSize: '0.85rem', marginTop: '12px', textAlign: 'center', color: 'var(--emerald)' }}>✅ Message sent! I'll get back to you soon.</div>}
                                {status === 'err' && <div style={{ fontSize: '0.85rem', marginTop: '12px', textAlign: 'center', color: 'var(--pink)' }}>❌ Something went wrong. <a href="mailto:pragneshkalotara110201@gmail.com" style={{ color: 'var(--cyan)' }}>Email me directly</a></div>}
                            </form>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <a href="mailto:pragneshkalotara110201@gmail.com" className="btn-icon-sm" title="Email">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" className="btn-icon-sm" title="LinkedIn">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                                    </svg>
                                </a>
                                <a href="https://github.com/pragneshkalotara" target="_blank" className="btn-icon-sm" title="GitHub">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
