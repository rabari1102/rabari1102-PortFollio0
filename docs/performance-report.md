# Performance report

**Date:** 2026-11-12

## How this was measured

| | |
| --- | --- |
| Tool | Lighthouse 13.6.0, lab run, one page load each |
| Browser | Headless Chromium 153 |
| Mobile profile | Lighthouse default: Moto G Power emulation, 4× CPU slowdown, simulated slow 4G (150 ms RTT, 1.6 Mbps) |
| Desktop profile | Lighthouse desktop preset |
| Server | Local static server with gzip, same machine |
| Before | commit `ae29852` (what was live) |
| After | this branch |

**Read these numbers as a comparison, not as field data.** They come from one container with no GPU (WebGL runs in software, which inflates script time), a local server with no network distance, and single runs. Scores moved by 2–4 points between runs of the same build; blocking time by ±80 ms. There is no real-user data for this site yet, so the Core Web Vitals "75th percentile" targets cannot be evaluated. See "Getting field data" below.

## Before and after

| Page | Profile | Performance | LCP | Blocking time | CLS |
| --- | --- | --- | --- | --- | --- |
| Home | mobile | **55 → 94–98** | 5.7 s → 1.0 s | 880 ms → 160–280 ms | 0 → 0.001 |
| Home | desktop | 94 → 99 | 1.3 s → 0.3 s | 60 ms → 0 ms | 0 → 0.003 |
| Case study | mobile | 97 → 99 | 2.6 s → 0.9 s | 90 ms → 120 ms | 0 → 0 |

The home page on mobile was run three times after the change: 94, 98, 97.

### After, pages that did not exist before

| Page | Mobile | LCP | Blocking time | Desktop |
| --- | --- | --- | --- | --- |
| `/work` | 94 | 0.9 s | 300 ms | 100 |
| `/services` | 96 | 0.9 s | 220 ms | 100 |
| `/about` | 99 | 0.9 s | 130 ms | not run |
| `/contact` | 99 | 0.9 s | 100 ms | not run |

Accessibility, Best Practices and SEO are 100 on every page and profile tested, before and after.

Against the targets in the brief: LCP ≤ 2.5 s ✅, CLS ≤ 0.1 ✅, Lighthouse performance 90+ ✅. INP cannot be measured in a lab run; blocking time is the closest proxy and is within Lighthouse's "good" band (under 200 ms) on most pages and slightly over on the home and work pages under 4× CPU throttling.

## What caused the old mobile score, and what fixed it

| Cause | Fix |
| --- | --- |
| An 850 ms opening curtain covered the page on first visit | Removed |
| The headline and all hero text were invisible until JavaScript had downloaded, parsed and run | Pages are prerendered to HTML; the hero animates with CSS alone |
| Content further down was rendered hidden and revealed by script | Content ships visible; only what is below the screen is hidden after load, then revealed on scroll |
| The WebGL backdrop ran on phones | Only on screens ≥ 900 px, and it starts when the browser is idle. Phones get a CSS gradient |
| React woke the whole page up in one long task | Each section sits in its own Suspense boundary, so React hydrates them separately, at low priority, in small slices |
| One 427 kB script | Split into app (137 kB), animation library (147 kB) and React (164 kB), so a deploy that changes site code does not re-download the libraries |
| Body font discovered late | Preloaded |
| Hashed assets revalidated on every visit | `Cache-Control: immutable`, one year |
| Three font families | Two, plus one italic accent |

## What a visitor downloads

| File | Raw | Gzip |
| --- | --- | --- |
| Home page HTML | 89.9 kB | 16.6 kB |
| Case study HTML | 23.3 kB | 6.5 kB |
| CSS | 85.5 kB | 17.6 kB |
| App script | 137.4 kB | 43.9 kB |
| React + router | 164.0 kB | 53.4 kB |
| Animation library | 147.4 kB | 48.7 kB |
| Geist (body and headings) | 29.4 kB | woff2 |
| Geist Mono | 23.1 kB | woff2 |
| Instrument Serif italic | 22.1 kB | woff2 |

No images are loaded: the product pictures are drawn in CSS. No third-party scripts, fonts or trackers.

Total script is 5% larger than before (449 vs 427 kB raw) because there are four new pages, a filter, form validation and the related-projects logic. It no longer blocks the first paint.

## Remaining bottlenecks

1. **The animation library is 49 kB gzipped**, a third of all script. It could be cut roughly in half with Framer Motion's `LazyMotion`, at the cost of the layout animations (nav pill, filter pill, estimator lines). Not done: scores are already in the 90s.
2. **Route-level code splitting** would take about 10–15 kB off the first load. Not done: with prerendered pages it adds a loading state on navigation for a small gain.
3. **Blocking time on the home page** is still the largest number in the report. It is mostly React attaching to a long page under 4× CPU throttling.
4. **Real screenshots**, when added, must be sized, in AVIF or WebP, with `width` and `height` set, and lazy-loaded below the fold. `ProjectCover` already sets `loading="lazy"`; the hero has no image.

## Getting field data

Lab numbers say what is possible; field data says what visitors get.

- **Vercel Speed Insights:** enable it for the project in the Vercel dashboard and add the `@vercel/speed-insights` package. This is a third-party script and was not added without asking.
- **PageSpeed Insights** (pagespeed.web.dev) shows Chrome field data once the site has enough traffic.
- **Search Console → Core Web Vitals**, after the property is verified.

## Update after the Ink & Signal redesign (2026-11-13)

The WebGL backdrop, the device stage and the instrument frame were removed; the hero is now type only. Same lab setup as above.

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | Blocking time | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Mobile | 92 | 100 | 100 | 100 | 0.9 s | 340 ms | 0.002 |
| Home | Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0 ms | 0.014 |
| Work | Mobile | 93 | 100 | 100 | 100 | 0.9 s | 310 ms | 0 |
| Services | Mobile | 98 | 100 | 100 | 100 | 0.9 s | 160 ms | 0.001 |
| Case study | Mobile | 94 | 100 | 100 | 100 | 0.9 s | 290 ms | 0 |

The headline serif (Instrument Serif roman, about 22 kB) is now preloaded alongside the body font, because the largest element on every page is set in it.
