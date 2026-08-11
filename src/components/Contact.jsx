import { useState } from 'react'
import Reveal from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'e2b0c3a1-5f8d-4a2b-b8c3-1f2e3d4c5b6a',
          subject: "New Portfolio Message: Let's Build Together",
          from_name: form.name,
          ...form
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('ok')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    }
    setTimeout(() => setStatus(null), 6000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('pkb110201@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <Reveal direction="up" className="contact-editorial-header">
          <span className="sec-label">START A CONVERSATION</span>
          <h2 className="contact-big-title font-heading">
            LET'S BUILD SOMETHING <span className="gradient-text">GREAT.</span>
          </h2>
          <p className="contact-sub-text">
            Have an enterprise multi-tenant platform to architect, a high-throughput microservices system to scale, or an engineering team to lead? Let's connect and deliver robust distributed software.
          </p>

          <a
            href="mailto:pkb110201@gmail.com"
            className="contact-email-hero font-heading"
            data-cursor="EMAIL ME"
          >
            pkb110201@gmail.com ↗
          </a>
        </Reveal>

        <div className="contact-two-col">
          <Reveal direction="right" delay={0.2} className="contact-info-col">
            <div className="contact-card card-spotlight">
              <h3 className="card-heading">Direct Channels</h3>
              <p className="card-p">Feel free to call, email directly, explore my GitHub repositories, or connect on LinkedIn.</p>

              <div className="contact-links-stack">
                <a href="tel:+917436061528" className="channel-btn" data-cursor="CALL">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+91-7436061528</span>
                </a>

                <button className="channel-btn" onClick={copyEmail} data-cursor="COPY">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>{copied ? 'Copied ✓ (pkb110201@gmail.com)' : 'pkb110201@gmail.com'}</span>
                </button>

                <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" rel="noopener noreferrer" className="channel-btn" data-cursor="LINKEDIN ↗">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn Profile ↗</span>
                </a>

                <a href="https://github.com/rabari1102" target="_blank" rel="noopener noreferrer" className="channel-btn" data-cursor="GITHUB ↗">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  <span>GitHub Repositories ↗</span>
                </a>
              </div>

              <div className="education-box">
                <div className="edu-header">
                  <span className="edu-icon">🎓</span>
                  <span className="edu-title">Education</span>
                </div>
                <div className="edu-deg">B.Tech — Instrumentation & Control Engineering</div>
                <div className="edu-school">Shantilal Shah Government Engineering College, Bhavnagar (2018–2023, SPI: 7.00)</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.2} className="contact-form-col">
            <div className="contact-card card-spotlight">
              <h3 className="card-heading">Send a Message</h3>
              <p className="card-p">Drop a line directly into my inbox for technical consulting, architecture reviews, or engineering leadership opportunities.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Jane Doe"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="jane@company.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message / System Requirement</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="Tell me about your software architecture or engineering position..."
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="btn-send-message"
                  disabled={status === 'sending'}
                  data-cursor="SEND"
                >
                  {status === 'sending' ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      Send Message →
                    </>
                  )}
                </MagneticButton>

                {status === 'ok' && (
                  <div className="form-status status-ok">
                    ✅ Message sent! I'll get back to you shortly.
                  </div>
                )}
                {status === 'err' && (
                  <div className="form-status status-err">
                    ❌ Unable to send via form. <a href="mailto:pkb110201@gmail.com">Email directly</a>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
