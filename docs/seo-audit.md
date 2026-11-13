# SEO audit

**Date:** 2026-11-12. Baseline: commit `ae29852` (what thepragnesh.in was serving).

## What was wrong

Checked by fetching the production deployment and reading the HTML it returned.

| Finding | Evidence |
| --- | --- |
| Every URL returned the same HTML shell with an empty `<div id="root">` | Production response body |
| Every URL had the home page's title, description and `<link rel="canonical" href="https://thepragnesh.in/">` until JavaScript ran | Production response body |
| A URL that does not exist returned `200 OK` | `/this-page-does-not-exist` → 200 |
| Link previews (WhatsApp, LinkedIn, X) showed the home page's card for every case study, because those services do not run JavaScript | Follows from the above |
| Services, about and contact had no URL: they were anchors on `/` | Route inventory |
| `ProfessionalService` structured data with a guessed `priceRange` | `index.html` |

Already fine and kept: `robots.txt`, a generated `sitemap.xml`, `lang="en"`, one `h1` per page, real `<a>` links.

## What changed

1. **Every page is real HTML.** `npm run build` renders all 18 URLs with React on the server and writes them to `dist/` (`scripts/prerender.mjs`). No framework migration: still Vite and React Router.
2. **One source of truth for metadata**, `src/seo/routes.js`. The build, the in-browser head updater and the sitemap all read from it, so they cannot disagree.
3. **Per-page `<head>`:** unique title and description, canonical, robots, Open Graph, Twitter card, JSON-LD.
4. **Real 404.** `dist/404.html` is served with a 404 status. It is `noindex` and has no canonical. The catch-all rewrite that caused the soft 404 is gone from `vercel.json`.
5. **Clean URLs:** no trailing slash; `/work/tripkoz/` redirects (308) to `/work/tripkoz`.
6. **New indexable pages:** `/work`, `/services`, `/about`, `/contact`.
7. **Internal linking:** breadcrumbs on every inner page, related projects on every case study, services link to the projects that prove them.
8. **New 1200×630 share image.**

## Page metadata

| URL | Title | Title length | Description length |
| --- | --- | --- | --- |
| `/` | Pragnesh Kalotara | Freelance Full-Stack & Backend Developer | 60 | 161 |
| `/work` | Work: 13 shipped products | Pragnesh Kalotara | 45 | 153 |
| `/services` | Services & pricing | Pragnesh Kalotara | 38 | 159 |
| `/about` | About Pragnesh Kalotara: full-stack developer in Ahmedabad | 58 | 163 |
| `/contact` | Contact: discuss your project | Pragnesh Kalotara | 49 | 154 |
| `/work/tripkoz` | TripKoz: web + android case study | Pragnesh Kalotara | 53 | 152 |
| `/work/vidyalay` | Vidyalay: web app case study | Pragnesh Kalotara | 48 | 157 |
| `/work/pharmadesk` | PharmaDesk: desktop app case study | Pragnesh Kalotara | 54 | 158 |
| `/work/aarav-hospital` | Aarav Hospital: web app case study | Pragnesh Kalotara | 54 | 155 |
| `/work/genzkrp` | GenzKRP: desktop app case study | Pragnesh Kalotara | 51 | 153 |
| `/work/allmarc` | Allmarc Industries: website case study | Pragnesh Kalotara | 58 | 157 |
| `/work/besecure` | BeSecure: web app case study | Pragnesh Kalotara | 48 | 154 |
| `/work/qfact` | QFACT Platform: web app case study | Pragnesh Kalotara | 54 | 158 |
| `/work/hms-enterprise` | Hospital Management System: web app case study | Pragnesh Kalotara | 66 | 138 |
| `/work/telep-eco` | Telep-Eco: web app case study | Pragnesh Kalotara | 49 | 132 |
| `/work/telep-ai` | Telep-AI: desktop app case study | Pragnesh Kalotara | 52 | 134 |
| `/work/helpdesk` | Helpdesk System: web app case study | Pragnesh Kalotara | 55 | 126 |
| `/work/bap-tool` | BAP-Tool: web app case study | Pragnesh Kalotara | 48 | 103 |

All 18 titles and all 18 descriptions are unique (enforced by a unit test).

## Structured data

| Page | Types |
| --- | --- |
| All | `Person`, `WebSite` |
| `/`, `/services` | + `WebPage` |
| `/work` | + `CollectionPage`, `BreadcrumbList` |
| `/about` | + `ProfilePage` (main entity: the person), `BreadcrumbList` |
| `/contact` | + `ContactPage`, `BreadcrumbList` |
| `/work/<id>` | + `WebPage`, `BreadcrumbList`, `CreativeWork` |

Only facts that are on the site: name, job title, city, email, phone, LinkedIn, GitHub, languages, skills. Client projects name the person as `creator`; team projects only as `contributor`. No `Organization`, `Review`, `AggregateRating`, `Offer` or price data.

**Validation done:** the JSON parses on every page; types, breadcrumb order and the creator/contributor rule are covered by unit tests.
**Validation not done:** Google's Rich Results Test and the Schema.org validator need the public URL and were not reachable from the audit machine. Run both once after deploying.

## Search intent

The copy uses the phrases people search for where they describe the work truthfully: freelance full-stack developer, backend and API developer, web app and SaaS development, Android app developer, desktop software, Ahmedabad / India. No keyword lists, no near-duplicate landing pages, no `keywords` meta tag.

"AI developer" is deliberately not in the title. AI is offered as a service and explained on `/about`, but the shipped work is mostly web, mobile, desktop and backend.

## Verified

| Check | Result |
| --- | --- |
| All 18 URLs return 200 with their own title, description, canonical, `og:url` and one `h1` | ✅ automated |
| The HTML contains the content and metadata before any JavaScript | ✅ automated |
| Unknown URLs return 404, `noindex`, no canonical | ✅ automated (local, Vercel-like server) |
| Trailing slash → 308 to the clean URL | ✅ automated |
| `sitemap.xml` lists exactly the 18 indexable URLs; `robots.txt` points to it and blocks nothing | ✅ automated |
| Every internal link on the main pages resolves to 200 | ✅ automated |
| Lighthouse SEO | 100 on every page tested |

## Still to do (needs the owner)

1. **Confirm the 404 on Vercel.** Open the preview deployment at a made-up path and check the status is 404. Vercel serves `404.html` for unmatched paths in a static output; this could only be simulated locally.
2. **Google Search Console.** Not connected, and nothing was submitted.
   - Go to search.google.com/search-console and add `thepragnesh.in` as a *Domain* property.
   - Add the TXT record it gives you at your domain registrar.
   - Under *Sitemaps*, submit `https://thepragnesh.in/sitemap.xml`.
   - Use *URL Inspection* on `/`, `/work`, `/services` and one case study, and request indexing.
   - Check *Pages* after a week for anything "Crawled, not indexed".
3. **Indexing status today** is unknown: no public tool was reachable from the audit machine.
4. **Bing Webmaster Tools:** import the site from Search Console.
5. **Backlinks that you control:** put the site URL on your LinkedIn and GitHub profiles. Both are already referenced from the site (`sameAs`).
6. **Real screenshots** would let each case study have its own share image instead of the shared one.
