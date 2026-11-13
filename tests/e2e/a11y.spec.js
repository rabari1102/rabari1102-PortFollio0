import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { mainPaths, ready } from './helpers.js'

// Automated WCAG 2.2 AA checks on every kind of page, in both themes.
// This catches contrast, naming, landmark and ARIA mistakes. It does not replace a manual pass
// with a keyboard and a screen reader (see docs/qa-report.md for what was checked by hand).
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

for (const theme of ['dark', 'light']) {
  for (const path of [...mainPaths, '/work/besecure', '/this-page-does-not-exist']) {
    test(`axe: ${path} (${theme})`, async ({ browser }) => {
      // Reduced motion puts every element in its final state, so contrast is measured on what people read.
      const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } })
      await context.addInitScript((t) => localStorage.setItem('theme', t), theme)
      const page = await context.newPage()
      await page.goto(path)
      if (!path.startsWith('/this')) await ready(page)

      // Bring every scroll-triggered element into view once.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          window.scrollTo(0, y)
          await new Promise((r) => setTimeout(r, 40))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(300)

      const results = await new AxeBuilder({ page }).withTags(tags).analyze()
      const summary = results.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n   ${v.nodes
            .slice(0, 3)
            .map((n) => n.target.join(' '))
            .join('\n   ')}`,
      )
      expect(results.violations, summary.join('\n')).toEqual([])
      await context.close()
    })
  }
}
