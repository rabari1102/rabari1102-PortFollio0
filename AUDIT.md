# AUDIT.md — Portfolio / freelance site

**Last updated:** 2026-11-12 (full redesign, "Ember" theme)
**Live reference:** https://thepragnesh.in/
**Stack:** React 18 + Vite 6 + React Router 6 + Framer Motion 13, deployed on Vercel. Client-rendered SPA. All content is data-driven from `src/data/*`.

The 2026-11-03 audit of the previous light "home studio" design is in git history. This file describes the site as it is now.

---

## 1. What the redesign changed

| Area | Before | Now |
| --- | --- | --- |
| Positioning | "Software, grown at home", led with *40–60% cheaper* | "I build the whole product. You hold the keys.", led with ownership and accountability. Price is still explained (the two receipts), but as a consequence, not the headline |
| Trust | Spread across FAQ and process | A dedicated **"Don't trust me. Verify me."** section: five things a stranger can check alone, six ways their money is protected. Built only from promises the site already made |
| Theme | White page, pastel aurora | Warm black + ember gradient, cream "paper" for receipts and quotes, plus a light theme with a toggle |
| Hero | three.js low-poly island (537 kB, desktop only) | A small hand-written WebGL shader + CSS device stage, on every screen size |
| Work | Card grid with filters | Client projects as a pinned, stacking deck; team projects as a hover list with a cursor-following preview. Client vs team work is labelled everywhere |
| Estimator | Price range | Live itemised **draft quote** with the three milestone amounts worked out |
| Fonts | Google Fonts (third-party request) | Self-hosted, Latin subsets only |
| Motion | Fade-ins | Opening curtain, word-by-word headlines, magnetic buttons, cursor ring, spotlight cards, scroll-velocity marquee, scroll-drawn timeline, route wipe. All disabled under `prefers-reduced-motion` |

## 2. Verified in this pass

- `npm run build` succeeds. JS 427 kB (139 kB gzip), CSS 74 kB (16 kB gzip). three.js is gone, so total JS weight is under half of what desktop visitors downloaded before.
- Loaded in a real browser at 1440×900, 1024×768 and 390×844, dark and light: no console errors, no horizontal overflow.
- Automated accessibility scan (axe-core, WCAG 2.1 AA + best practice) on `/`, `/work/tripkoz` and the 404, both themes: **0 violations**.
- Exercised: opening curtain, theme toggle (persists), mobile menu, estimator → "send draft" prefill, contact validation, FAQ and experience accordions, project pager, unknown URL → 404 with `noindex`, per-page title/canonical.

## 3. Factual tightening

- "2 as team lead" → **"team lead since 2025"** (the dates say March 2025, so "two years" was rounded up).
- "led teams of 6" → **"led a team of 6"**.
- The fake-looking "Quote #4471" on the agency receipt is gone; both receipts say *Illustrative*.
- New copy makes two promises that were only implied before. Keep them only if you will honour them:
  - the free first call is a **video** call, and
  - you will **walk the client through a shipped product** on that call.

## 4. Still open (needs the owner)

1. **Real proof beats drawn proof.** The project covers are drawn mock-ups. Real screenshots, live links, a photo and client quotes are the biggest remaining trust gap. The data files have slots for all four; see README.
2. **Contact form backend.** Without `VITE_WEB3FORMS_KEY` the form falls back to WhatsApp. That works, but email delivery needs the key set in Vercel. `vercel.json` still rewrites `/api/*` although there is no `api/` directory.
3. **Public email.** The site uses `pkb110201@gmail.com`. Confirm it is the inbox you actually watch.
4. **Availability line.** "Taking 2 new projects for December" is in `src/data/site.js`. Update it when it stops being true; stale scarcity reads as a sales trick.
5. **`dist/` is committed.** Vercel builds from source (`vercel.json`), so the tracked `dist/` is redundant and has to be rebuilt by hand to stay in sync. Consider removing it from git and adding it to `.gitignore`.

## 5. Not recommended

Invented testimonials, client logos without permission, "100% satisfaction" badges, countdown timers, a blog with no real articles, a CMS for a one-person site.
