# Portfolio audit

**Date:** 2026-11-12
**Baseline audited:** commit `ae29852` on `main`, which is what thepragnesh.in was serving (confirmed from the Vercel production deployment record).
**Stack:** React 18, Vite 6, React Router 6, Framer Motion 13, plain CSS with custom properties, deployed on Vercel. JavaScript, no TypeScript. Content in `src/data/*`.

## How the audit was done, and its limits

- Read every source file, config file and script in the repository.
- Built the baseline commit and loaded it in headless Chromium at phone, tablet and desktop sizes.
- Fetched the production deployment through the Vercel API to check real status codes and the HTML that is actually served.
- **Limit:** the audit machine could not open `https://thepragnesh.in` directly (outbound proxy refused it). Production was checked through its Vercel deployment URL and by building the identical commit locally. Anything that depends on the custom domain itself (DNS, redirects from `www`) was not checked.
- **Limit:** only Chromium was available. Firefox and Safari were not tested. See `qa-report.md`.

## Route inventory

### Before

| URL | Source | Purpose | Problems found |
| --- | --- | --- | --- |
| `/` | `pages/Home.jsx` + 12 section components | Everything: hero, work, trust, pricing, services, estimator, process, toolbox, experience, FAQ, contact | 21,500 px tall on desktop. Services, about and contact had no URL of their own. Mobile performance 55/100. |
| `/work/:id` (13) | `pages/ProjectPage.jsx` | Case study | Served the home page's `<head>`: same title, description and canonical (`/`) for all 13 until JavaScript ran. |
| anything else | `pages/NotFound.jsx` | 404 | Returned **HTTP 200** with the home page shell. |

### After

| URL | Source | Purpose | What it holds |
| --- | --- | --- | --- |
| `/` | `pages/Home.jsx` | The story in one scroll | Hero, credibility strip, 4 featured projects, services, technical expertise, process, about, "Verify me", contact form |
| `/work` | `pages/WorkPage.jsx` | All 13 projects | Category filter, client projects grid, team projects list |
| `/work/:id` (13) | `pages/ProjectPage.jsx` | Case study | Breadcrumb, overview, challenge, what I built, features, stack, results, related projects, pager |
| `/services` | `pages/ServicesPage.jsx` | The offer | Six services (problem, deliverables, audience, price, proof), pricing explained, estimator, process, FAQ |
| `/about` | `pages/AboutPage.jsx` | Who and how | Biography, facts, how AI is used, experience, toolbox |
| `/contact` | `pages/ContactPage.jsx` | Start a project | Form, direct channels, what happens next |
| anything else | `dist/404.html` | Not found | Real **404** status, `noindex`, no canonical |

Every page is now written to disk as HTML at build time (`scripts/prerender.mjs`). The existing URLs `/` and `/work/<id>` are unchanged. Old one-page anchors (`/#estimate`, `/#pricing`, `/#why`, `/#faq`, `/#experience`) redirect in the browser to their new home.

`/insights` was **not** created: there are no articles, and the brief rules out filler content.

## Issues, by priority

Status: ✅ fixed and verified · ⚠️ needs the owner · ➖ not done, with reason.

### Critical

| # | Issue | Evidence | Status |
| --- | --- | --- | --- |
| C1 | Unknown URLs answered 200 with the home page (soft 404) | Production fetch of `/this-page-does-not-exist` returned `200 OK` | ✅ `404.html` is generated; the SPA catch-all rewrite is removed from `vercel.json`. Verified locally with a server that mimics Vercel. **Confirm once on the Vercel preview after pushing.** |
| C2 | Every URL shipped the home page's `<head>`; canonical always pointed to `/` | Production HTML for any path | ✅ Each page has its own title, description, canonical, Open Graph tags and JSON-LD in the HTML |
| C3 | No content in the HTML without JavaScript (`<div id="root"></div>`) | Production HTML | ✅ Prerendered. Home page HTML is 90 kB (16.6 kB gzipped) of real content |

### High

| # | Issue | Evidence | Status |
| --- | --- | --- | --- |
| H1 | Mobile performance: Lighthouse 55, LCP 5.7 s, blocking time 880 ms | `performance-report.md` | ✅ 94–98, LCP 1.0 s. Causes removed: opening curtain, headline hidden until script ran, WebGL on phones, one long hydration task |
| H2 | Contact form accepted anything: no format check, no length limits, no spam trap | Code review of `Contact.jsx` | ✅ Validation (shared, unit-tested), `maxlength`, honeypot, double-submit guard, per-field errors announced to screen readers |
| H3 | No automated tests of any kind | Repository | ✅ 25 unit tests, 67 browser tests |
| H4 | 11 known vulnerabilities in dependencies (6 high, all in the build toolchain) | `npm audit` | ✅ 9 fixed with non-breaking updates. 2 moderate remain in React Router 6; see `qa-report.md` for why they do not apply here |
| H5 | Services, about and contact existed only as anchors on one very long page | Route inventory | ✅ Dedicated pages; home page is 38% shorter (21,500 → 13,300 px) |

### Medium

| # | Issue | Status |
| --- | --- | --- |
| M1 | Phone menu was not a dialog: no focus trap, page behind still reachable | ✅ `role="dialog"`, focus trap, `inert` background, Escape, focus returns to the button |
| M2 | Theme ignored the visitor's system setting | ✅ Saved choice first, system setting otherwise, followed live until a choice is made |
| M3 | Header controls were 40 px; nav links 38 px tall | ✅ 44 px minimum |
| M4 | Hover feedback took 300–600 ms and some of it animated `padding` (layout work) | ✅ 180–220 ms, transforms only |
| M5 | The project category filter had been dropped in the previous redesign | ✅ Restored on `/work` |
| M6 | `ProfessionalService` schema with a `priceRange` guess | ✅ Replaced with `Person`, `WebSite`, `WebPage` / `ProfilePage` / `ContactPage` / `CollectionPage`, `BreadcrumbList`, `CreativeWork` |
| M7 | `dist/` was committed and went stale between builds | ✅ Untracked and ignored. Vercel builds from source |
| M8 | `vercel.json` rewrote `/api/*` to a folder that does not exist | ✅ Removed |
| M9 | "Usually replies within a few hours" and "I will reply within a day" | ✅ Removed: unverifiable response-time promises |
| M10 | Two card grids back to back (services, then toolbox) | ✅ Technical expertise is now a table |

### Low

| # | Issue | Status |
| --- | --- | --- |
| L1 | `<meta name="keywords">` (ignored by search engines) | ✅ Removed |
| L2 | Three font families plus an accent; no preload | ✅ Geist for headings and body, Geist Mono, one serif italic accent. Body font preloaded |
| L3 | Hashed assets had no long-lived cache header | ✅ `immutable`, one year |
| L4 | All JavaScript in a single file | ✅ React and the animation library are separate, separately cached files |
| L5 | No security headers | ✅ `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |

## Content decisions, and where the brief was adapted

The brief's suggestions were treated as candidates and checked against what the project and experience data can support.

| Brief suggested | What was done | Why |
| --- | --- | --- |
| Headline "I build scalable software that turns ambitious ideas into real products." | "I turn ambitious ideas into real products." | Same idea, short enough to set at 88 px in three lines |
| Four services: Backend & API, AI Integration, Custom Web Apps, System Modernization | Kept the six real ones: web apps & SaaS, mobile, desktop, websites, APIs & backend, AI & automation | Mobile and desktop are backed by shipped client projects. Dropping them would hide real work. Each service is now written as problem → what you get → who it is for |
| Title "Freelance Backend & AI Developer" | "Freelance Full-Stack & Backend Developer" | Backend is the verified core. AI is offered, but only one project (Telep-AI, a team project) is AI in the strict sense, so "AI developer" would overstate it |
| Testimonials section | Not added | There are none. The "Don't trust me. Verify me." section stands in as the trust component. A slot exists in `src/data/site.js` and appears when real quotes are added |
| `/insights` | Not added | No articles exist |
| Credibility metrics | 13 products, 3.8 years, team of 6 led, 5,000+ IoT devices | Each figure is taken from `projects.js` or `experience.js` |

**Kept from the owner's existing positioning:** INR starting prices, the "why it costs less" receipts and the estimator. They moved to `/services`.

## What only the owner can supply

1. **Real screenshots, live links, a photo, client quotes.** The covers are drawn mock-ups. Slots exist for all four (see README).
2. **`VITE_WEB3FORMS_KEY` in Vercel.** Without it the form opens WhatsApp instead of sending email.
3. **Confirm the public email** `pkb110201@gmail.com` is the inbox you watch.
4. **Keep "Taking 2 new projects for December" true**, or set `available: false` in `src/data/site.js`.
5. **Two promises in the copy:** the first call is a video call, and you will walk the client through a shipped product on it.
6. **Search Console** (see `seo-audit.md`).
7. **Case-study depth.** No project has architecture diagrams, a "challenges and how I solved them" section or measured business results beyond the three numbers already in the data. Nothing was invented to fill those gaps.
