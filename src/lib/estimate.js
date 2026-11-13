// The estimator's arithmetic, kept free of React so it can be unit-tested (tests/unit).
// All inputs come from `estimator` in src/data/services.js.

// Round to something a human would quote.
export const nice = (n) => Math.round(n / 5000) * 5000

export function estimate(config, { type, size, extras }) {
  const t = config.types.find((x) => x.id === type)
  const s = config.sizes.find((x) => x.id === size)
  if (!t || !s) throw new Error(`Unknown estimator choice: ${type} / ${size}`)

  // An extra marked `only: 'mobile'` is ignored for every other project type.
  const available = config.extras.filter((e) => !e.only || e.only === type)
  const chosen = available.filter((e) => extras.includes(e.id))

  const base = t.base * s.mult
  const mid = base + chosen.reduce((a, e) => a + e.cost, 0)
  const weeks = t.weeks * (0.6 + s.mult * 0.45) + chosen.reduce((a, e) => a + e.weeks, 0)

  return {
    type: t,
    size: s,
    available,
    chosen,
    base,
    mid,
    low: nice(mid * 0.85),
    high: nice(mid * 1.2),
    agency: nice(mid * config.agencyMultiplier),
    weeksLow: Math.max(1, Math.round(weeks * 0.85)),
    weeksHigh: Math.max(2, Math.round(weeks * 1.25)),
  }
}

// What each payment milestone comes to for a given project cost.
export const milestones = (payment, amount) => payment.map((m) => ({ ...m, amount: nice((amount * m.pct) / 100) }))
