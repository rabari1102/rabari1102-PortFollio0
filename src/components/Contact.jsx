import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, FileText, Mail, Phone, Send } from 'lucide-react'
import Reveal from './ui/Reveal'
import Kinetic from './fx/Kinetic'
import Scramble from './fx/Scramble'
import Magnetic from './fx/Magnetic'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './ui/Icons'
import { profile } from '../data/site'
import { LIMITS, onPendingBrief, takePendingBrief, validateBrief } from '../lib/brief'
import { useClock } from '../lib/hooks'

const types = ['Website', 'Web app / SaaS', 'Mobile app', 'Desktop software', 'API / backend', 'AI feature', 'Not sure yet']
const budgets = ['Under ₹50k', '₹50k – 1.5L', '₹1.5L – 5L', '₹5L +', "Let's discuss"]
const timelines = ['As soon as possible', 'Within 1–3 months', '3 months or later', 'Just exploring']

// Set VITE_WEB3FORMS_KEY in Vercel to receive the form by email. Without it, the form opens
// WhatsApp with the brief written out, and says so. It never claims a message was sent
// unless the email service has confirmed it.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const EMPTY = { name: '', reach: '', type: '', budget: '', timeline: '', message: '' }

function Chips({ id, label, options, value, onPick }) {
  return (
    <div className="field">
      <span className="mono" id={id}>
        {label} <i>optional</i>
      </span>
      <div className="choice-row" role="group" aria-labelledby={id}>
        {options.map((o) => (
          <button
            type="button"
            key={o}
            className={`choice is-sm ${value === o ? 'is-on' : ''}`}
            onClick={() => onPick(value === o ? '' : o)}
            aria-pressed={value === o}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Contact({ num, title = 'Have an idea worth building?\nLet’s make it *real.*', showHead = true }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | sending | ok | whatsapp | invalid | err
  const [copied, setCopied] = useState(false)
  const [trap, setTrap] = useState('') // honeypot: real people never see or fill this
  const busy = useRef(false)
  const formRef = useRef(null)
  const clock = useClock(profile.timezone)

  // A draft sent over from the estimator lands here, whichever page it was started on.
  useEffect(() => {
    const apply = () => {
      const b = takePendingBrief()
      if (b) setForm((f) => ({ ...f, type: b.type ?? f.type, message: b.brief }))
    }
    apply()
    return onPendingBrief(apply)
  }, [])

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const briefText = () =>
    `Hi Pragnesh, I'm ${form.name}.\nProject: ${form.type || '—'}\nBudget: ${form.budget || '—'}\nTimeline: ${form.timeline || '—'}\nReach me at: ${form.reach}\n\n${form.message}`

  const submit = async (e) => {
    e.preventDefault()
    if (busy.current) return // a second click while the first is still in flight

    const found = validateBrief(form)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('invalid')
      // Take the visitor straight to the first thing that needs fixing.
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    if (trap) return // a bot filled the hidden field: drop it without a word

    if (!FORM_KEY) {
      window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(briefText())}`, '_blank', 'noopener')
      setStatus('whatsapp')
      return
    }

    busy.current = true
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `New project enquiry: ${form.type || 'General'} (${form.budget || 'budget not set'})`,
          from_name: form.name.trim(),
          botcheck: '',
          name: form.name.trim(),
          reach: form.reach.trim(),
          type: form.type,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error('rejected')
      setStatus('ok')
      setForm(EMPTY)
    } catch {
      setStatus('err')
    } finally {
      busy.current = false
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

  const field = (name) => ({
    name,
    value: form[name],
    onChange: set(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `err-${name}` : undefined,
  })
  const Err = ({ name }) =>
    errors[name] ? (
      <span className="field-error" id={`err-${name}`}>
        {errors[name]}
      </span>
    ) : null

  return (
    <section className="section contact" id="contact">
      <span className="contact-glow" aria-hidden="true" />
      <div className="container">
        {showHead && (
          <header className="contact-head">
            <p className="section-label mono">
              {num && <span className="sl-num">{num}</span>}
              <span className="sl-rule" aria-hidden="true" />
              <Scramble text="Start a project" />
            </p>
            <Kinetic text={title} className="contact-title" />
            <Reveal as="p" className="section-intro" delay={0.1}>
              Tell me what you want to build, in your own words. The first call is free, and a fixed written quote follows it.
            </Reveal>
          </header>
        )}

        <div className="contact-grid">
          <Reveal className="brief" delay={0.05}>
            <form ref={formRef} onSubmit={submit} noValidate aria-label="Project brief">
              <div className="field-row">
                <label className="field">
                  <span className="mono">Your name</span>
                  <input {...field('name')} autoComplete="name" maxLength={LIMITS.name} placeholder="Priya Shah" required />
                  <Err name="name" />
                </label>
                <label className="field">
                  <span className="mono">Email or WhatsApp number</span>
                  <input {...field('reach')} autoComplete="email" inputMode="email" maxLength={LIMITS.reach} placeholder="you@company.com" required />
                  <Err name="reach" />
                </label>
              </div>

              <Chips id="lbl-type" label="What is it?" options={types} value={form.type} onPick={set('type')} />
              <Chips id="lbl-budget" label="Rough budget" options={budgets} value={form.budget} onPick={set('budget')} />
              <Chips id="lbl-timeline" label="When do you need it?" options={timelines} value={form.timeline} onPick={set('timeline')} />

              <label className="field">
                <span className="mono">The idea, in your own words</span>
                <textarea
                  {...field('message')}
                  rows={5}
                  maxLength={LIMITS.message}
                  placeholder="We run 3 clinics and want patients to book appointments online and get reminders on WhatsApp…"
                  required
                />
                <Err name="message" />
              </label>

              {/* Honeypot. Hidden from people and from assistive technology; bots fill it in. */}
              <div className="hp" aria-hidden="true">
                <label>
                  Leave this empty
                  <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
                </label>
              </div>

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

              <div role="status" aria-live="polite">
                <AnimatePresence>
                  {status && status !== 'sending' && (
                    <motion.p className={`form-status is-${status}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      {status === 'ok' && 'Thank you, your brief has been sent. I will reply to the contact you gave.'}
                      {status === 'whatsapp' && 'WhatsApp has opened with your brief written out. Press send there to deliver it.'}
                      {status === 'invalid' && 'Please check the highlighted fields above.'}
                      {status === 'err' && 'That did not go through. Please use WhatsApp or email instead, both are on this page.'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p className="form-note">Your details are used only to reply to this enquiry. Nothing is added to a mailing list.</p>
            </form>
          </Reveal>

          <Reveal className="channels" delay={0.12}>
            {profile.photo && (
              <div className="me">
                <img src={profile.photo} alt={profile.name} width="64" height="64" loading="lazy" />
                <p>
                  <strong>{profile.name}</strong>
                  <span>The person who reads this, and replies.</span>
                </p>
              </div>
            )}
            <p className="local-time mono">
              <i className="signal-dot" />
              <span>{clock ? `${clock.time} in Ahmedabad right now (IST, UTC+5:30)` : 'Ahmedabad, India (IST, UTC+5:30)'}</span>
            </p>
            <button type="button" className="channel" onClick={copyEmail} data-spot>
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
            {profile.available && <p className="avail">{profile.availability}.</p>}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
