# AUDIT.md — Portfolio / freelance site

**Date:** 2026-11-03
**Branch audited:** `freelance-redesign`
**Live reference:** https://thepragnesh.in/
**Stack:** React 18 + Vite 6 + React Router 6 + Framer Motion 13 + three.js 0.170, deployed on Vercel. Fully client-rendered SPA. All content is data-driven from `src/data/*`.

---

## 0. The most important finding (read this first)

The master brief assumes the **old live site** — an engineering portfolio with a terminal, an "AI System Architect" chatbot, skill percentages (NestJS 98%…), a technical-insights blog, and projects named BeSecure / HMS / QFACT / Telep-Eco / Telep-AI / Helpdesk.

**The repository is not that site.** The `freelance-redesign` branch (committed today) is already a substantially rebuilt, well-executed **freelance business site**. A large share of the brief's 24 phases is *already done here*, and several of the brief's own rules are already satisfied:

| Brief asks for | State in this repo |
| --- | --- |
| Remove arbitrary skill percentages | ✅ Done — replaced by grouped `Toolbox` |
| No fabricated testimonials | ✅ None invented; uses project outcomes instead |
| Distinguish freelance vs team/employer work | ✅ `kind: 'freelance' \| 'team'` drives labels & copy |
| Respect employer confidentiality | ✅ Team projects phrased without confidential detail |
| Freelance services section | ✅ `Services` (6 services, starting prices) |
| Case-study pages at `/work/<slug>` | ✅ 13 projects, each a real page |
| Work process "idea → production" | ✅ `Process` |
| FAQ, contact with project-type/budget fields | ✅ `Faq`, `Contact` |
| Data-driven, maintainable content | ✅ `src/data/site.js`, `projects.js`, `services.js`, `experience.js` |
| Build succeeds, no console errors | ✅ Verified below |

So this is **not** a from-scratch rebuild. It is a polish-and-close-the-gaps job on an already-strong site.

### The one strategic conflict that needs the owner's decision
The brief (Phase 2) wants to **drop the "cheaper than an agency" angle** and reposition as a premium engineer ("reliable, scalable digital products"), on a dark editorial theme.

This repo does the **opposite on purpose**: it is built around *"home studio, 40–60% less than an agency, AI does the boring parts,"* on a warm light theme, with a whole `WhyCheaper` cost-receipt section and an agency-vs-me `Estimator`.

These are opposite brand strategies. Following the brief literally would tear out deliberate, recent, good work. **This decision is the owner's and blocks all P1 copy/section work.** It is raised back in chat rather than guessed.

---

## 1. Method & evidence
- Read every component, page and data file.
- `npm run build` → success, 2241 modules, built in ~7.6s (output sizes in §4).
- Ran `npm run dev`, loaded in a real browser.
  - **Console errors: none** (`onlyErrors` filter returned nothing).
  - **Desktop (1280):** hero renders, polished, premium.
  - **Mobile (375):** no horizontal overflow (`scrollWidth === innerWidth === 375`), but see D1.

Severity legend: **P0** critical · **P1** business/SEO/a11y · **P2** polish/perf · **Verify** needs owner.

---

## 2. Confirmed defects & UX weaknesses

### D1 — Three.js hero scene loads on mobile where it is purely decorative — **P2 (was flagged P1, corrected)**
A first screenshot suggested the mobile hero showed only "Software," with a large blank band. **Re-tested and disproven:** on 375px the copy is `order:1` (above the scene), computed opacity of the sub-paragraph, CTAs and headline line 2 are all `1`, and the primary CTA sits at `top: 494px` — above the 812px fold. The earlier "blank" was a browser-pane screenshot capture artifact (stale paint), not a site defect. Content renders correctly on mobile.
**Residual (genuine):** the three.js scene (141 kB gzip) still downloads on phones and reserves a ~380px decorative band *below* the CTAs. **Fix (perf, not bug):** skip loading the scene on small screens and under `prefers-reduced-motion`.

### D2 — Social preview image missing — **P1**
`index.html` declares `twitter:card = summary_large_image` and `og:*` tags but there is **no `og:image` and no `twitter:image`** (`grep` count = 0). Shares on WhatsApp/LinkedIn/X render a blank or stripped card. **Fix:** add a 1200×630 OG image and reference it (+ `og:image:width/height`, `twitter:image`).

### D3 — No `robots.txt`, no `sitemap.xml`, no `public/` dir — **P1**
Nothing tells crawlers what to index or lists the `/work/<slug>` pages. **Fix:** add `public/robots.txt` (+ sitemap ref) and a generated `public/sitemap.xml` covering `/` and all 13 project URLs.

### D4 — Per-page metadata is client-side only — **P1**
`index.html` carries a single static title/description for the whole SPA. Project pages set only `document.title` in a `useEffect`; they have **no unique description, canonical, or OG tags** in the initial HTML. Link unfurlers and some crawlers see the generic home metadata for every `/work/<slug>`. **Fix:** a lightweight per-route head manager (title + description + canonical + OG) — no framework migration required.

### D5 — No real 404 — **P1→P2**
`App.jsx` routes `*` → `Home`, and `ProjectPage` redirects unknown ids to `/#work`. Any unknown URL returns a 200 with the homepage, which is bad for crawlers and users. **Fix:** a proper `NotFound` route/page.

### D6 — Contact form has no server endpoint — **P1 (owner input)**
`Contact.jsx` posts directly to `api.web3forms.com` when `VITE_WEB3FORMS_KEY` is set, else opens WhatsApp. `vercel.json` rewrites `/api/*` but **there is no `api/` directory** — a dead rewrite. There is no server-side validation, spam protection, or rate limiting. For a solo site the client+web3forms path is acceptable **if** the key is configured; a Vercel serverless function would be the robust option. **Needs owner decision** (see owner checklist).

### D7 — Hero CTA / headline rely on entrance animations for first paint — **P2**
Hero copy uses `initial opacity:0`. With `reducedMotion="user"` Framer still resolves to visible, so this is acceptable, but first paint can briefly show empty text. Low risk; noted for the perf/a11y pass.

---

## 3. Content / factual items to verify — **Verify**
- **Public email mismatch:** site + JSON-LD use `pkb110201@gmail.com`; the account on file is `pragneshkalotara110201@gmail.com`. Confirm which is the real contact address.
- **`yearsExperience: '3.8'`** and hero "3.8 yrs / 2 as team lead" — consistent with the dated experience (Jan 2023 → now), good. Keep it derived from dates, don't hardcode in new copy.
- **Hero facts** ("13 products shipped", "40–60% lower") — ensure every public number is defensible on a client call (the data file already comments this).

---

## 4. Performance (baseline)
Production build output:

| Asset | Raw | Gzip |
| --- | --- | --- |
| `index.html` | 3.41 kB | 1.46 kB |
| CSS | 48.1 kB | 11.1 kB |
| main JS | 392.9 kB | 128.5 kB |
| **HeroScene (three.js)** | **537.5 kB** | **141.2 kB** |

- three.js is the single heaviest asset and more than doubles JS weight. It is already `lazy()`-loaded after text paint (good). On mobile it mostly reserves blank space (D1), so it is a candidate to **skip on small screens / reduced-motion** — a real win with no visual loss where it isn't seen.
- Main bundle bundles Framer Motion + Router + lucide + all sections; route-level code-splitting for `ProjectPage` is a cheap follow-up.
- Targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. Reserve the hero band to avoid CLS when collapsing it on mobile.

---

## 5. Strengths to preserve (do not regress)
- Clean, documented data layer — content edits never require touching components.
- Honest positioning: no fake reviews, no self-rated percentages, clear AI-honesty ("does / doesn't"), freelance-vs-team labelling.
- Real case-study depth, interactive estimator, cost receipt, process, payment split, FAQ.
- Accessible touches already present: `aria-label`s, `aria-expanded` on the burger, `aria-pressed` on choices, `MotionConfig reducedMotion="user"`, body-scroll lock on mobile menu.

---

## 6. Gaps vs the brief that are enhancements, not defects (owner decides scope)
- No `/insights` blog (Phase 11). Absent entirely; only build it if there is real content to publish — do **not** fabricate articles.
- No separate `/about`, `/services`, `/experience` routes — the site is single-page with anchors + project pages. Works well; splitting into routes is optional and mainly an SEO/landing-page play.
- No AI chat assistant (Phase 10). The redesign intentionally reframed "AI" as an honesty section + an AI *service*, not a chatbot. Optional.
- No CMS / lead dashboard (Phases 13–14). **Not justified** for a solo portfolio; the data-file approach is the right call. Recommend not building these.

---

## 6.5 Implemented in this pass (2026-11-03)
Direction-independent P1/P2 fixes shipped on `freelance-redesign` (build verified, live-tested):
- **D3** `public/robots.txt` + **auto-generated `public/sitemap.xml`** (14 URLs: home + 13 projects) via `scripts/gen-sitemap.mjs`, wired into `npm run build` so it never drifts.
- **D4** `src/components/Seo.jsx` — per-route `<head>` manager (title, description, canonical, OG, Twitter, robots). Wired into Home and every `/work/<slug>` page. Verified: each project now emits its own canonical + description + OG.
- **D5** Real `NotFound` page + route; unknown URLs and unknown project ids render it (was: silently serving the homepage). Carries `noindex, follow`.
- **D1/perf** three.js hero scene now loads only at ≥961px and when motion is allowed; phones and reduced-motion users skip the 141 kB download. Verified canvas loads at 1024px, skipped on mobile.

**Still open — needs the owner (see §0 and owner checklist):** D2 `og.png` image (content depends on the positioning decision), D6 contact backend path, and all copy/section rework.

## 7. Prioritised fix plan
**P0 / P1 — do now, independent of the positioning decision:**
1. Fix mobile hero blank-band (D1).
2. Add `og:image` / `twitter:image` + 1200×630 card (D2).
3. Add `robots.txt` + `sitemap.xml` via `public/` (D3).
4. Per-route head manager for title/description/canonical/OG (D4).
5. Real 404 page (D5).
6. Skip three.js hero scene on mobile / reduced-motion (D1+perf).

**P1 — needs owner input first:**
7. Positioning decision (premium vs cheaper-than-agency) → then any copy/section rework.
8. Contact backend path (web3forms key vs Vercel function) (D6).

**P2 — polish:** route code-splitting, accessibility sweep (focus-visible, contrast on the faded ghost buttons), Lighthouse pass.

**Not recommended:** CMS, lead dashboard, fabricated blog content.
