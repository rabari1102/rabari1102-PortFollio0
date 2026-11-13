# QA report

**Date:** 2026-11-12, on this branch after the final build.

## Commands and results

| Command | What it does | Result |
| --- | --- | --- |
| `npm install` | Dependencies | ✅ |
| `npm run build` | Sitemap → client build → server build → prerender 18 pages + 404 | ✅ |
| `npm test` | 25 unit tests (Node's built-in runner) | ✅ 25 / 25 |
| `npm run test:e2e` | 67 browser tests (Playwright, Chromium) against the built site | ✅ 67 / 67 |
| `npm run format:check` | Prettier | ✅ |
| `npm audit` | Known vulnerabilities | ⚠️ 2 moderate remain, see below |

There is **no type checking** (the project is JavaScript) and **no linter** (none was configured; adding ESLint was left out to avoid new tooling the owner did not ask for).

## Unit tests (`tests/unit`)

| File | Covers |
| --- | --- |
| `estimate.test.mjs` | Estimator arithmetic: the published default figures, every type × size × extras combination gives a sane range, mobile-only extras, unknown input throws, payment split sums to 100% |
| `brief.test.mjs` | Contact form rules: required fields, email or phone formats, length limits, the estimator-to-form hand-off |
| `content.test.mjs` | Content integrity: unique URL-safe project ids, required fields, valid categories, services point at real projects, the "13 products" figure matches the project list |
| `routes.test.mjs` | Metadata: a URL for every page, unique titles and descriptions within length limits, canonical rules, 404 handling, structured-data types, HTML escaping |

## Browser tests (`tests/e2e`)

**Routes (24 tests).** All 18 URLs load with status 200, their own title, description, canonical and `og:url`, exactly one visible `h1`, no console errors and no sideways scroll. The raw HTML carries content and metadata. Unknown URLs give 404 and `noindex`. Trailing slash redirects. Sitemap and robots are correct. Old `/#estimate` and `/#faq` links land on the right section. Every internal link on the main pages resolves.

**Responsive (14 tests).** At 320, 360, 375, 390, 430, 600, 768, 900, 1024, 1280, 1440 and 1920 px, on six page types each: no horizontal overflow at the top or the bottom of the page, and the headline sits fully inside the screen. Plus landscape phone (844 × 390) and 44 px header touch targets.

**Interactions (13 tests).**

| Flow | Checked |
| --- | --- |
| Main navigation | Reaches all four pages, sets `aria-current`, no errors |
| Hero buttons | Go to `/work` and `/contact` |
| Phone menu | Opens as a dialog, page behind is `inert`, focus stays inside through 14 Tab presses, Escape closes, focus returns to the button, a link navigates and closes it, scroll lock is released |
| Theme | Follows a light system setting on first visit, toggles, persists across pages and reload |
| Work filter | 13 → 3 projects for "Desktop software", announces the count, resets, cards open the case study |
| Case study | Breadcrumb, three related projects, next/previous, head tags update on in-app navigation |
| Estimator | Default ₹1,15,000 – ₹1,65,000; changes to ₹2,60,000 – ₹3,65,000 for a large mobile app on both platforms; draft is carried to the contact form on another page |
| Contact form | Missing fields explained and focused, bad contact rejected, never shows "sent" on its own, `maxlength` set |
| Accordions | Open and close with the keyboard |
| Skip link | First Tab stop, visible when focused |
| No JavaScript | Headline and buttons visible, nothing left hidden, receipts show real totals |
| Reduced motion | Headline is at rest immediately, no cursor ring |

**Accessibility (16 tests).** axe-core with WCAG 2.0 A/AA, 2.1 A/AA, 2.2 AA and best-practice rules, on 8 page types × 2 themes: **0 violations.**

## Browsers and devices

| Browser | Status |
| --- | --- |
| Chromium 153 (desktop and emulated phone) | ✅ Tested |
| Firefox | ❌ Not tested: not installed on the test machine |
| WebKit / Safari | ❌ Not tested: not installed on the test machine |
| Real phones | ❌ Not tested |

The test config is ready for the others: `npx playwright install firefox webkit`, then `ALL_BROWSERS=1 npm run test:e2e`.

**Things most likely to differ in Safari or Firefox**, worth a manual look: container-query units in the product mocks, `mask-composite` on the card glow, `@property` animation of the footer spotlight (falls back to a static spotlight), `color-mix()`, the `inert` attribute, `backdrop-filter`. All are supported in current versions of both; none are needed to read or use the page.

## Accessibility: what was and was not checked by hand

Checked through automated keyboard tests: skip link, menu focus trap and return, Escape, accordions, form error focus.

**Not done:** a full pass with a screen reader (VoiceOver, NVDA, TalkBack), 200% and 400% zoom, Windows high-contrast mode, and a manual check of every hover state by keyboard. Automated checks find perhaps a third to a half of real accessibility problems, so "0 violations" is not a conformance claim.

## Regression: what the old site did, and whether it still does

| Feature | Status |
| --- | --- |
| 13 case-study pages at `/work/<id>` | ✅ Same URLs |
| Estimator and "send draft to contact" | ✅ Now crosses pages |
| Agency-vs-me receipts, reasons, AI honesty | ✅ `/services` and `/about` |
| Process, payment split | ✅ Home and `/services` |
| Toolbox, experience accordion, FAQ accordion | ✅ |
| "Verify me" section | ✅ Home |
| Contact form: Web3Forms when the key is set, WhatsApp otherwise, "Email instead" | ✅ Plus validation, timeline field, spam trap |
| Copy-email button, WhatsApp, phone, LinkedIn, GitHub, CV links | ✅ |
| Live Ahmedabad clock | ✅ |
| Dark and light themes | ✅ New palette |
| WhatsApp shortcut button | ✅ |
| Project category filter (removed in the previous redesign) | ✅ Restored on `/work` |
| Opening curtain animation | ❌ Removed on purpose: it delayed the first paint by 850 ms |
| "Usually replies within a few hours" | ❌ Removed on purpose: an unverifiable promise |

## Not verified, or known open

1. **Real 404 on Vercel.** Simulated locally. Check one made-up URL on the preview deployment.
2. **Contact form email delivery.** `VITE_WEB3FORMS_KEY` is not available in the test environment, so only the WhatsApp fallback and validation were exercised. With the key set, send one real test message. The form talks to Web3Forms from the browser; there is no server-side validation of our own, and the access key is public by design of that service.
3. **Two moderate advisories in React Router 6** (`GHSA-wrjc-x8rr-h8h6`, open redirect through a backslash in a link target; `GHSA-337j-9hxr-rhxg`, error deserialisation in data-router server hydration). The fix is a major upgrade to v7. Neither applies as the site is written: every link and `navigate()` target is a fixed string, and the data-router hydration API is not used. Upgrading to v7 is a sensible follow-up.
4. **Cross-browser and real-device testing**, as above.
5. **Structured data** not run through Google's Rich Results Test.
