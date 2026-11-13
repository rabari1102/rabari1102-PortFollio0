import { expect, test } from '@playwright/test'
import { ready, watchErrors } from './helpers.js'

test('the main navigation reaches every page and marks the current one', async ({ page }) => {
  const errors = watchErrors(page)
  await page.goto('/')
  await ready(page)
  const nav = page.getByRole('navigation', { name: 'Main' })

  for (const [label, url, heading] of [
    ['Work', '/work', /Sixteen products/],
    ['Services', '/services', /One person/],
    ['About', '/about', /Backend at the core/],
    ['Contact', '/contact', /Have an idea worth building/],
  ]) {
    await nav.getByRole('link', { name: label }).click()
    await expect(page).toHaveURL(url)
    await expect(page.locator('h1')).toHaveAttribute('aria-label', heading)
    await expect(nav.getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page')
    await expect(page).toHaveTitle(/Pragnesh Kalotara/)
  }

  await page.getByRole('link', { name: 'Pragnesh Kalotara, home' }).first().click()
  await expect(page).toHaveURL('/')
  expect(errors, errors.join('\n')).toEqual([])
})

test('the hero buttons go where they say', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  await page.getByRole('link', { name: 'Explore my work' }).click()
  await expect(page).toHaveURL('/work')
  await page.goBack()
  await page.locator('.hero').getByRole('link', { name: 'Discuss a project' }).click()
  await expect(page).toHaveURL('/contact')
})

test.describe('phone menu', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  test('opens as a dialog, traps focus, closes on Escape and returns focus', async ({ page }) => {
    await page.goto('/')
    await ready(page)
    const open = page.getByRole('button', { name: 'Open menu' })
    await expect(open).toHaveAttribute('aria-expanded', 'false')
    await open.click()

    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    // The page behind cannot be reached.
    await expect(page.locator('.route')).toHaveAttribute('inert', '')

    // Tab many times: focus never leaves the header.
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => !!document.activeElement.closest('header.nav'))).toBe(true)
    }

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(page.locator('.route')).not.toHaveAttribute('inert', '')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  })

  test('a link in the menu navigates and closes it', async ({ page }) => {
    await page.goto('/')
    await ready(page)
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page
      .getByRole('dialog', { name: 'Menu' })
      .getByRole('link', { name: /Services/ })
      .click()
    await expect(page).toHaveURL('/services')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
    await expect(page.locator('h1')).toBeVisible()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  })
})

test('the theme switch works, is remembered, and follows the system until used', async ({ browser }) => {
  // A visitor whose system is set to light sees the light theme first.
  const light = await browser.newContext({ colorScheme: 'light' })
  const p1 = await light.newPage()
  await p1.goto('/')
  await expect(p1.locator('html')).toHaveAttribute('data-theme', 'light')
  await light.close()

  const dark = await browser.newContext({ colorScheme: 'dark' })
  const page = await dark.newPage()
  await page.goto('/')
  await ready(page)
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible()

  // Remembered on the next page and after a reload, even though the system says dark.
  await page.goto('/services')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await dark.close()
})

test('the work page filter narrows the list', async ({ page }) => {
  await page.goto('/work')
  await ready(page)
  const cards = page.locator('.pcard')
  const rows = page.locator('.team-row')
  await expect(cards).toHaveCount(9)
  await expect(rows).toHaveCount(7)

  await page.getByRole('button', { name: /Desktop software/ }).click()
  await expect(page.getByRole('button', { name: /Desktop software/ })).toHaveAttribute('aria-pressed', 'true')
  await expect(cards).toHaveCount(2)
  await expect(rows).toHaveCount(1)
  await expect(page.getByRole('status')).toContainText('Showing 3 of 16 projects')

  await page.getByRole('button', { name: /Everything/ }).click()
  await expect(cards).toHaveCount(9)

  await cards.first().click()
  await expect(page).toHaveURL(/\/work\/tripkoz$/)
  await expect(page.locator('h1')).toHaveAttribute('aria-label', 'TripKoz')
})

test('a case study links to related projects, the next project and back to the list', async ({ page }) => {
  await page.goto('/work/tripkoz')
  await ready(page)
  await expect(page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work')
  await expect(page.locator('.related')).toHaveCount(3)
  await page.getByRole('navigation', { name: 'More projects' }).getByRole('link', { name: /Next/ }).click()
  await expect(page).toHaveURL(/\/work\/vidyalay$/)
  await expect(page).toHaveTitle(/Vidyalay/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://thepragnesh.in/work/vidyalay')
})

test('the estimator recalculates and carries its draft to the contact form', async ({ page }) => {
  await page.goto('/services#estimate')
  await ready(page)
  const price = page.locator('.est-price')
  await expect(price).toContainText('₹1,15,000')
  await expect(price).toContainText('₹1,65,000')

  await page.getByRole('button', { name: 'Mobile app', exact: true }).click()
  await page.getByRole('button', { name: /Large/ }).click()
  await page.getByRole('button', { name: 'Android + iOS' }).click()
  await expect(page.getByRole('button', { name: 'Android + iOS' })).toHaveAttribute('aria-pressed', 'true')
  await expect(price).toContainText('₹2,60,000')
  await expect(price).toContainText('₹3,65,000')
  await expect(page.locator('.est-lines li')).toHaveCount(4)

  await page.getByRole('button', { name: /Send this draft/ }).click()
  await expect(page).toHaveURL(/\/contact#contact$/)
  const message = page.getByLabel('The idea, in your own words')
  await expect(message).toHaveValue(/Type: Mobile app/)
  await expect(message).toHaveValue(/Android \+ iOS/)
  await expect(page.getByRole('button', { name: 'Mobile app', exact: true })).toHaveAttribute('aria-pressed', 'true')
})

test('the contact form explains what is missing and never claims success on its own', async ({ page }) => {
  await page.goto('/contact')
  await ready(page)
  const form = page.getByRole('form', { name: 'Project brief' })
  const submit = form.getByRole('button', { name: /Send/ })

  await submit.click()
  await expect(form.getByText('Please tell me your name.')).toBeVisible()
  await expect(form.getByText(/email address or a WhatsApp number/)).toBeVisible()
  await expect(form.getByLabel('Your name')).toHaveAttribute('aria-invalid', 'true')
  await expect(form.getByLabel('Your name')).toBeFocused()
  await expect(form.getByRole('status')).toContainText('Please check the highlighted fields')

  await form.getByLabel('Your name').fill('Test Visitor')
  await form.getByLabel('Email or WhatsApp number').fill('not-an-email')
  await form.getByLabel('The idea, in your own words').fill('A booking system for three clinics with reminders.')
  await submit.click()
  await expect(form.getByText(/does not look like an email address or a phone number/)).toBeVisible()
  await expect(form.getByText('Please tell me your name.')).toBeHidden()

  // Nothing has been sent, so nothing may say it was.
  await expect(form.getByText(/has been sent/)).toHaveCount(0)

  // Length limits are enforced by the browser too.
  await expect(form.getByLabel('Your name')).toHaveAttribute('maxlength', '80')
  await expect(form.getByLabel('The idea, in your own words')).toHaveAttribute('maxlength', '3000')
})

test('accordions open and close with the keyboard', async ({ page }) => {
  await page.goto('/services#faq')
  await ready(page)
  const question = page.getByRole('button', { name: /Who owns the code/ })
  await expect(question).toHaveAttribute('aria-expanded', 'false')
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText(/You do, fully/)).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('aria-expanded', 'false')
})

test('keyboard users can skip straight to the content', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the pages are still readable from top to bottom', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Explore my work' })).toBeVisible()

    // Nothing that normally fades in on scroll is left invisible.
    const hidden = await page.locator('[data-rv]').evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity !== '1').length)
    expect(hidden).toBe(0)
    await expect(page.getByRole('heading', { name: "Don't trust me. Verify me." })).toBeVisible()
    await expect(page.getByText('Never 100% upfront')).toBeVisible()

    await page.goto('/services')
    await expect(page.getByRole('heading', { name: 'Web apps & SaaS' })).toBeVisible()
    await expect(page.locator('.receipt-total').first()).toContainText('₹3,80,000')
  })
})

test.describe('with reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('content is in place straight away and the backdrop holds still', async ({ page }) => {
    await page.goto('/')
    await ready(page)
    // The headline words are not mid-animation: they sit at their final position.
    const offset = await page
      .locator('h1 .k-in')
      .first()
      .evaluate((el) => {
        const a = el.getBoundingClientRect()
        const b = el.parentElement.getBoundingClientRect()
        return Math.abs(a.top - b.top)
      })
    expect(offset).toBeLessThan(40)
    await expect(page.locator('.cursor')).toHaveCount(0)
  })
})
