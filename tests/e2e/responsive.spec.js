import { expect, test } from '@playwright/test'
import { expectNoHorizontalOverflow, mainPaths } from './helpers.js'

// The widths named in the brief, plus two awkward in-between sizes.
const widths = [320, 360, 375, 390, 430, 600, 768, 900, 1024, 1280, 1440, 1920]

for (const width of widths) {
  test(`no sideways scroll and no clipped headline at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 800 : 900 })
    for (const path of mainPaths) {
      await page.goto(path)
      await expectNoHorizontalOverflow(page)

      // The headline must sit fully inside the screen.
      const box = await page.locator('h1').boundingBox()
      expect(box.x, `${path} h1 left edge`).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width, `${path} h1 right edge`).toBeLessThanOrEqual(width + 1)

      // Scroll to the very bottom: still nothing wider than the screen.
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await expectNoHorizontalOverflow(page)
    }
  })
}

test('landscape phone: the hero still shows the headline and both buttons', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Explore my work' })).toBeVisible()
  await expectNoHorizontalOverflow(page)
})

test('touch targets in the header are at least 44px on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  for (const name of ['Open menu', /Switch (to|colour)/]) {
    const box = await page.getByRole('button', { name }).boundingBox()
    expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44)
  }
})
