import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow, metaFor, paths, ready, watchErrors } from './helpers.js'

// Every URL in the sitemap: loads, has the right <head>, one <h1>, and no errors.
for (const path of paths) {
  test(`${path} loads with its own metadata`, async ({ page }) => {
    const errors = watchErrors(page)
    const response = await page.goto(path)
    expect(response.status()).toBe(200)
    await ready(page)

    const meta = metaFor(path)
    await expect(page).toHaveTitle(meta.title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', meta.description)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://thepragnesh.in${path === '/' ? '/' : path}`)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://thepragnesh.in${path === '/' ? '/' : path}`)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index, follow/)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main#main')).toBeVisible()
    await expectNoHorizontalOverflow(page)
    expect(errors, errors.join('\n')).toEqual([])
  })
}

test('the HTML itself carries the content and metadata, before any JavaScript', async ({ request }) => {
  for (const path of ['/', '/work/pharmadesk', '/services', '/about']) {
    const html = await (await request.get(path)).text()
    const meta = metaFor(path)
    expect(html, path).toContain(`<link rel="canonical" href="https://thepragnesh.in${path === '/' ? '/' : path}" />`)
    expect(html, path).toContain('application/ld+json')
    expect(html, path).toMatch(/<h1[^>]*aria-label="[^"]{5,}"/)
    expect(html.length, `${path} should be real HTML, not an empty shell`).toBeGreaterThan(20_000)
    expect(html, path).toContain(meta.description.replace(/&/g, '&amp;').replace(/"/g, '&quot;'))
  }
})

test('a URL that does not exist answers 404 and is not indexable', async ({ page }) => {
  for (const path of ['/this-page-does-not-exist', '/work/not-a-project']) {
    const response = await page.goto(path)
    expect(response.status(), path).toBe(404)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    await expect(page.locator('h1')).toHaveAttribute('aria-label', 'This page wandered off.')
    await expect(page.getByRole('link', { name: 'Back home' })).toBeVisible()
  }
})

test('a trailing slash redirects to the clean URL', async ({ request }) => {
  const response = await request.get('/work/tripkoz/', { maxRedirects: 0 })
  expect(response.status()).toBe(308)
  expect(response.headers().location).toBe('/work/tripkoz')
})

test('robots.txt and the sitemap list the real pages', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toContain('Sitemap: https://thepragnesh.in/sitemap.xml')
  expect(robots).not.toMatch(/Disallow: \/\s*$/m)

  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const path of paths) expect(sitemap).toContain(`<loc>https://thepragnesh.in${path === '/' ? '/' : path}</loc>`)
  expect(sitemap.match(/<url>/g)).toHaveLength(paths.length)
})

test('old one-page links still land on the right section', async ({ page }) => {
  await page.goto('/#estimate')
  await expect(page).toHaveURL(/\/services#estimate$/)
  await expect(page.locator('#estimate')).toBeInViewport()

  await page.goto('/#faq')
  await expect(page).toHaveURL(/\/services#faq$/)
})

test('every internal link on every main page points at a page that exists', async ({ page, request }) => {
  const seen = new Set()
  for (const path of ['/', '/work', '/services', '/about', '/contact', '/work/tripkoz']) {
    await page.goto(path)
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))
    hrefs.forEach((h) => seen.add(h.split('#')[0] || '/'))
  }
  for (const href of seen) {
    const response = await request.get(href)
    expect(response.status(), href).toBe(200)
  }
  expect(seen.size).toBeGreaterThan(15)
})
