// Carries a draft from the estimator (on /services) to the contact form (on /contact or the
// home page). The estimator stores it, the form picks it up once when it mounts or is on screen.
let pending = null
const listeners = new Set()

export function setPendingBrief(brief) {
  pending = brief
  listeners.forEach((fn) => fn())
}

export function takePendingBrief() {
  const b = pending
  pending = null
  return b
}

export function onPendingBrief(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// ── Form rules, shared by the form and its unit tests ───────────────────────
export const LIMITS = { name: 80, reach: 120, message: 3000 }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// A phone / WhatsApp number: optional +, then 7 to 15 digits, spaces and dashes allowed.
const PHONE = /^\+?[\d\s()-]{7,20}$/

export const isEmail = (v) => EMAIL.test(v.trim())
export const isPhone = (v) => PHONE.test(v.trim()) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15

// Returns a map of field → message. An empty object means the form can be sent.
export function validateBrief(form) {
  const errors = {}
  const name = form.name.trim()
  const reach = form.reach.trim()
  const message = form.message.trim()

  if (!name) errors.name = 'Please tell me your name.'
  else if (name.length > LIMITS.name) errors.name = `Keep the name under ${LIMITS.name} characters.`

  if (!reach) errors.reach = 'I need an email address or a WhatsApp number to reply to.'
  else if (!isEmail(reach) && !isPhone(reach)) errors.reach = 'That does not look like an email address or a phone number.'

  if (!message) errors.message = 'A line or two about the idea is enough to start.'
  else if (message.length < 10) errors.message = 'Tell me a little more, a sentence is fine.'
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters. We can cover the rest on a call.`

  return errors
}
