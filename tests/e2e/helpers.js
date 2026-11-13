import { expect } from '@playwright/test'
import { allPaths, metaFor } from '../../src/seo/routes.js'

export const paths = allPaths()
export const mainPaths = ['/', '/work', '/work/tripkoz', '/services', '/about', '/contact']
export { metaFor }

// Collects anything the page logs as an error, so a test can assert there was none.
export function watchErrors(page) {
  const errors = []
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  return errors
}

// The page is ready to use once React has attached to the server-rendered HTML.
export async function ready(page) {
  await page.waitForFunction(() => window.__app === true)
  await page.waitForLoadState('networkidle')
}

export async function expectNoHorizontalOverflow(page) {
  const { scroll, inner } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: window.innerWidth }))
  expect(scroll, `page is ${scroll}px wide in a ${inner}px viewport`).toBeLessThanOrEqual(inner)
}
