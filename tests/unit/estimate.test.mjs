import { test } from 'node:test'
import assert from 'node:assert/strict'
import { estimate, milestones, nice } from '../../src/lib/estimate.js'
import { estimator, payment } from '../../src/data/services.js'

test('nice() rounds to the nearest 5,000', () => {
  assert.equal(nice(112400), 110000)
  assert.equal(nice(112600), 115000)
  assert.equal(nice(0), 0)
})

test('the default estimate (medium web app with login and admin) matches the published figures', () => {
  const r = estimate(estimator, { type: 'web', size: 'm', extras: ['auth', 'admin'] })
  assert.equal(r.base, 108000) // 60,000 × 1.8
  assert.equal(r.mid, 136000) // + 8,000 + 20,000
  assert.equal(r.low, 115000)
  assert.equal(r.high, 165000)
  assert.equal(r.agency, 315000)
  assert.deepEqual([r.weeksLow, r.weeksHigh], [8, 11])
})

test('every combination gives a sane range', () => {
  for (const t of estimator.types) {
    for (const s of estimator.sizes) {
      const all = estimator.extras.map((e) => e.id)
      for (const extras of [[], all]) {
        const r = estimate(estimator, { type: t.id, size: s.id, extras })
        assert.ok(r.low > 0, `${t.id}/${s.id} low`)
        assert.ok(r.low < r.high, `${t.id}/${s.id} low < high`)
        assert.ok(r.high < r.agency, `${t.id}/${s.id} agency is the highest figure`)
        assert.ok(r.weeksLow >= 1 && r.weeksLow <= r.weeksHigh, `${t.id}/${s.id} weeks`)
        assert.equal(r.low % 5000, 0)
        assert.equal(r.high % 5000, 0)
      }
    }
  }
})

test('an extra that only applies to mobile is ignored for other project types', () => {
  const web = estimate(estimator, { type: 'web', size: 's', extras: ['both'] })
  const mobile = estimate(estimator, { type: 'mobile', size: 's', extras: ['both'] })
  assert.equal(web.chosen.length, 0)
  assert.equal(web.mid, web.base)
  assert.equal(mobile.chosen.length, 1)
  assert.equal(mobile.mid, mobile.base + 35000)
})

test('an unknown choice is an error, not a silent zero', () => {
  assert.throws(() => estimate(estimator, { type: 'spaceship', size: 'm', extras: [] }))
})

test('the payment split adds up to 100% and the milestones follow it', () => {
  assert.equal(
    payment.reduce((a, m) => a + m.pct, 0),
    100,
  )
  const ms = milestones(payment, 200000)
  assert.deepEqual(
    ms.map((m) => m.amount),
    [60000, 80000, 60000],
  )
})
