import { test } from 'node:test'
import assert from 'node:assert/strict'
import { LIMITS, isEmail, isPhone, onPendingBrief, setPendingBrief, takePendingBrief, validateBrief } from '../../src/lib/brief.js'

const good = { name: 'Priya Shah', reach: 'priya@example.com', type: '', budget: '', timeline: '', message: 'We need a booking system for three clinics.' }

test('a complete brief has no errors', () => {
  assert.deepEqual(validateBrief(good), {})
})

test('name, contact and message are required', () => {
  const e = validateBrief({ ...good, name: '  ', reach: '', message: '' })
  assert.deepEqual(Object.keys(e).sort(), ['message', 'name', 'reach'])
})

test('the contact field accepts an email address or a phone number, nothing else', () => {
  for (const ok of ['a@b.co', 'first.last+tag@sub.example.org', '+91 74360 61528', '07436061528', '(079) 2658-1234']) {
    assert.deepEqual(validateBrief({ ...good, reach: ok }), {}, ok)
  }
  for (const bad of ['priya', 'priya@', '@example.com', 'a@b', '12345', 'call me maybe', '+91 74360 61528 99999 00000']) {
    assert.ok(validateBrief({ ...good, reach: bad }).reach, bad)
  }
  assert.equal(isEmail('a@b.co'), true)
  assert.equal(isPhone('a@b.co'), false)
})

test('length limits are enforced', () => {
  assert.ok(validateBrief({ ...good, name: 'x'.repeat(LIMITS.name + 1) }).name)
  assert.ok(validateBrief({ ...good, message: 'x'.repeat(LIMITS.message + 1) }).message)
  assert.ok(validateBrief({ ...good, message: 'too short' }).message)
})

test('a draft from the estimator is delivered once', () => {
  let calls = 0
  const off = onPendingBrief(() => calls++)
  setPendingBrief({ brief: 'Estimate…', type: 'Mobile app' })
  assert.equal(calls, 1)
  assert.deepEqual(takePendingBrief(), { brief: 'Estimate…', type: 'Mobile app' })
  assert.equal(takePendingBrief(), null)
  off()
  setPendingBrief({ brief: 'again' })
  assert.equal(calls, 1)
  takePendingBrief()
})
