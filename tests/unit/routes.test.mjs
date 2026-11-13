import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SITE, allPaths, canonical, headHtml, jsonLd, metaFor } from '../../src/seo/routes.js'
import { projects } from '../../src/data/projects.js'

test('there is a URL for every page and every project', () => {
  const paths = allPaths()
  assert.equal(paths.length, 5 + projects.length)
  for (const p of ['/', '/work', '/services', '/about', '/contact']) assert.ok(paths.includes(p), p)
})

test('titles and descriptions are unique and a sensible length', () => {
  const metas = allPaths().map(metaFor)
  assert.equal(new Set(metas.map((m) => m.title)).size, metas.length)
  assert.equal(new Set(metas.map((m) => m.description)).size, metas.length)
  for (const m of metas) {
    assert.ok(m.title.length >= 20 && m.title.length <= 70, `${m.path} title is ${m.title.length} chars`)
    assert.ok(m.description.length >= 70 && m.description.length <= 165, `${m.path} description is ${m.description.length} chars`)
  }
})

test('canonical URLs are absolute, without a trailing slash (except the home page)', () => {
  assert.equal(canonical(metaFor('/')), `${SITE}/`)
  assert.equal(canonical(metaFor('/work/tripkoz/')), `${SITE}/work/tripkoz`)
  assert.equal(canonical(metaFor('/services?utm=x#estimate')), `${SITE}/services`)
})

test('unknown URLs are "not found": noindex and no canonical', () => {
  for (const path of ['/nope', '/work/not-a-project', '/work/tripkoz/extra']) {
    const m = metaFor(path)
    assert.equal(m.found, false, path)
    assert.equal(m.noindex, true, path)
    const head = headHtml(m)
    assert.match(head, /noindex/)
    assert.doesNotMatch(head, /rel="canonical"/)
  }
})

test('structured data describes the page and only uses supported types', () => {
  const types = (path) => jsonLd(metaFor(path))['@graph'].map((g) => g['@type'])
  assert.deepEqual(types('/'), ['Person', 'WebSite', 'WebPage'])
  assert.deepEqual(types('/about'), ['Person', 'WebSite', 'BreadcrumbList', 'ProfilePage'])
  assert.deepEqual(types('/work/tripkoz'), ['Person', 'WebSite', 'BreadcrumbList', 'WebPage', 'CreativeWork'])
  // Client work credits a creator; team work only a contributor.
  const work = (path) => jsonLd(metaFor(path))['@graph'].find((g) => g['@type'] === 'CreativeWork')
  assert.ok(work('/work/tripkoz').creator)
  assert.ok(work('/work/besecure').contributor)
  assert.equal(work('/work/besecure').creator, undefined)
})

test('breadcrumbs lead back to the home page', () => {
  const crumbs = jsonLd(metaFor('/work/pharmadesk'))['@graph'].find((g) => g['@type'] === 'BreadcrumbList')
  assert.deepEqual(
    crumbs.itemListElement.map((i) => i.item),
    [`${SITE}/`, `${SITE}/work`, `${SITE}/work/pharmadesk`],
  )
})

test('head tags are escaped', () => {
  const head = headHtml({ ...metaFor('/'), title: 'A "quoted" <title> & more' })
  assert.match(head, /<title>A &quot;quoted&quot; &lt;title&gt; &amp; more<\/title>/)
  assert.doesNotMatch(head.split('<script')[0], /<title> & more/)
})
