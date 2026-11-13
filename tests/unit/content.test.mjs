// Guards the content files: a typo in an id here would otherwise only show up as a broken page.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { categories, featured, featuredIds, getProject, projects, relatedProjects } from '../../src/data/projects.js'
import { faqs, process as steps, services, toolbox } from '../../src/data/services.js'
import { heroFacts, protections, verifyChecks } from '../../src/data/site.js'
import { experience } from '../../src/data/experience.js'

test('project ids are unique and safe to use in a URL', () => {
  const ids = projects.map((p) => p.id)
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/)
})

test('every project has what its page needs', () => {
  const cats = new Set(categories.map((c) => c.id))
  for (const p of projects) {
    for (const key of ['title', 'tagline', 'sector', 'year', 'summary', 'problem', 'solution']) assert.ok(p[key], `${p.id}.${key}`)
    assert.ok(['freelance', 'team'].includes(p.kind), `${p.id}.kind`)
    assert.ok(['web', 'site', 'desktop', 'phone', 'combo'].includes(p.platform), `${p.id}.platform`)
    assert.match(p.accent, /^#[0-9a-f]{6}$/i, `${p.id}.accent`)
    assert.ok(p.features.length >= 3, `${p.id}.features`)
    assert.ok(p.numbers.length >= 2, `${p.id}.numbers`)
    assert.ok(Object.keys(p.stack).length >= 1, `${p.id}.stack`)
    for (const c of p.categories) assert.ok(cats.has(c), `${p.id} has unknown category "${c}"`)
  }
})

test('the home page features real client projects', () => {
  assert.equal(featured.length, featuredIds.length)
  for (const p of featured) assert.equal(p.kind, 'freelance')
})

test('related projects never include the project itself', () => {
  for (const p of projects) {
    const related = relatedProjects(p)
    assert.ok(related.length <= 3)
    assert.ok(!related.includes(p))
  }
})

test('each service points at projects that exist and says what the client gets', () => {
  for (const s of services) {
    for (const id of s.examples) assert.ok(getProject(id), `${s.id} → ${id}`)
    for (const key of ['title', 'problem', 'blurb', 'audience', 'weeks']) assert.ok(s[key], `${s.id}.${key}`)
    assert.ok(s.deliverables.length >= 3, `${s.id}.deliverables`)
    assert.ok(s.from > 0)
  }
})

test('the headline number of products matches the project list', () => {
  assert.equal(heroFacts[0].value, String(projects.length))
})

test('supporting content is present', () => {
  assert.ok(faqs.length >= 5)
  assert.equal(steps.length, 5)
  assert.ok(toolbox.length >= 6)
  assert.equal(verifyChecks.length, 5)
  assert.equal(protections.length, 6)
  assert.equal(experience.filter((e) => e.current).length, 1)
})
