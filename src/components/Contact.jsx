import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, FileText, Mail, Phone, Send } from 'lucide-react'
import Reveal from './ui/Reveal'
import Kinetic from './fx/Kinetic'
import Scramble from './fx/Scramble'
import Magnetic from './fx/Magnetic'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './ui/Icons'
import { profile } from '../data/site'
import { useClock } from '../lib/hooks'

const types = ['Website', 'Web app / SaaS', 'Mobile app', 'Desktop software', 'API / backend', 'AI feature', 'Not sure yet']
const budgets = ['Under ₹50k', '₹50k – 1.5L', '₹1.5L – 5L', '₹5L +', "Let's discuss"]

// Set VITE_WEB3FORMS_KEY in Vercel to receive the form by email. Without it, the form opens WhatsApp instead.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY

function LocalTime() {
  const { time, hour } = useClock(profile.timezone)
  const awake = hour >= 9 && hour < 23
  return (
    <p className="local-time mono">
      <i className={awake ? 'pulse-dot' : 'sleep-dot'} />
      <span>
        {time} in Ahmedabad · {awake ? 'usually replies within a few hours' : 'asleep, will reply in the morning'}
      </span>
    </p>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', reach: '', type: '', budget: '', message: '' })
  const [status, setStatus] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onPrefill = (e) => setForm((f) => ({ ...f, type: e.detail.type ?? f.type, message: e.detail.brief }))
    window.addEventListener('prefill-brief', onPrefill)
    return () => window.removeEventListener('prefill-brief', onPrefill)
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }))

  const briefText = () =>
    `Hi Pragnesh, I'm ${form.name}.\nProject: ${form.type || '—'}\nBudget: ${form.budget || '—'}\nReach me at: ${form.reach}\n\n${form.message}`

  const openWhatsApp = () => window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(briefText())}`, '_blank', 'noopener')

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.reach || !form.message) {
      setStatus('missing')
      return
    }
    if (!FORM_KEY) {
      openWhatsApp()
      setStatus('whatsapp')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `New project enquiry: ${form.type || 'General'} (${form.budget || 'budget not set'})`,
          from_name: form.name,
          ...form,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error()
      setStatus('ok')
      setForm({ name: '', reach: '', type: '', budget: '', message: '' })
    } catch {
      setStatus('err')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section contact" id="contact">
      <span className="contact-glow" aria-hidden="true" />
      <div className="container">
        <header className="contact-head">
          <p className="section-label mono">
            <span className="sl-num">10</span>
            <span className="sl-rule" aria-hidden="true" />
            <Scramble text="Say hello" />
          </p>
          <Kinetic text={'Tell me what you\nwant to *build.*'} className="contact-title" />
          <Reveal as="p" className="section-intro" delay={0.2}>
            The first call is free and there is no pressure. Worst case, you leave with a clearer plan and a rough number.
          </Reveal>
        </header>

        <div className="contact-grid">
          <Reveal className="brief" delay={0.1} data-spot>
            <form onSubmit={submit} noValidate>
              <div className="field-row">
                <label className="field">
                  <span className="mono">Your name</span>
                  <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Priya Shah" />
                </label>
                <label className="field">
                  <span className="mono">Email or WhatsApp</span>
                  <input value={form.reach} onChange={set('reach')} autoComplete="email" placeholder="you@company.com" />
                </label>
              </div>

              <div className="field">
                <span className="mono" id="lbl-type">
                  What is it?
                </span>
                <div className="choice-row" role="group" aria-labelledby="lbl-type">
                  {types.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`choice is-sm ${form.type === t ? 'is-on' : ''}`}
                      onClick={() => set('type')(t)}
                      aria-pressed={form.type === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <span className="mono" id="lbl-budget">
                  Rough budget
                </span>
                <div className="choice-row" role="group" aria-labelledby="lbl-budget">
                  {budgets.map((b) => (
                    <button
                      type="button"
                      key={b}
                      className={`choice is-sm ${form.budget === b ? 'is-on' : ''}`}
                      onClick={() => set('budget')(b)}
                      aria-pressed={form.budget === b}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <label className="field">
                <span className="mono">The idea, in your own words</span>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="We run 3 clinics and want patients to book appointments online and get reminders on WhatsApp…"
                />
              </label>

              <div className="brief-actions">
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : FORM_KEY ? 'Send my brief' : 'Send on WhatsApp'} <Send size={17} />
                  </button>
                </Magnetic>
                <a
                  className="btn btn-ghost btn-lg"
                  href={`mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(briefText())}`}
                >
                  Email instead
                </a>
              </div>

              <div aria-live="polite">
                <AnimatePresence>
                  {status && status !== 'sending' && (
                    <motion.p className={`form-status is-${status}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {status === 'ok' && 'Got it! I will reply within a day, usually much sooner.'}
                      {status === 'whatsapp' && 'WhatsApp opened with your brief. Just press send.'}
                      {status === 'missing' && 'Just need your name, a way to reach you and a line about the idea.'}
                      {status === 'err' && 'Something went wrong. Please use WhatsApp or email on the right.'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>

          <Reveal className="channels" delay={0.2}>
            {profile.photo && (
              <div className="me">
                <img src={profile.photo} alt={`${profile.name}`} width="64" height="64" loading="lazy" />
                <p>
                  <strong>{profile.name}</strong>
                  <span>The person who reads this, and replies.</span>
                </p>
              </div>
            )}
            <LocalTime />
            <button className="channel" onClick={copyEmail} data-spot>
              <span className="channel-icon">
                <Mail size={19} />
              </span>
              <span className="channel-text">
                <small className="mono">Email · click to copy</small>
                {profile.email}
              </span>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <a className="channel" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" data-spot>
              <span className="channel-icon">
                <WhatsappIcon width={19} height={19} />
              </span>
              <span className="channel-text">
                <small className="mono">WhatsApp</small>
                {profile.phone}
              </span>
              <ArrowUpRight size={18} />
            </a>
            <a className="channel" href={profile.phoneHref} data-spot>
              <span className="channel-icon">
                <Phone size={19} />
              </span>
              <span className="channel-text">
                <small className="mono">Call</small>
                {profile.phone}
              </span>
              <ArrowUpRight size={18} />
            </a>
            <div className="channel-row">
              <a className="channel is-small" href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
              <a className="channel is-small" href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
              <a className="channel is-small" href={profile.resume} target="_blank" rel="noreferrer">
                <FileText size={18} /> CV
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
