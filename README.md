# Pragnesh Kalotara · Freelance portfolio

thepragnesh.in: web, mobile, desktop and backend software from one senior engineer.

React 18 + Vite + React Router + Framer Motion. Every page is prerendered to real HTML at build time, so it is fast, readable without JavaScript and has its own metadata. Deployed on Vercel.

```bash
npm install
npm run dev        # develop at localhost:5173
npm run build      # sitemap → build → prerender every page + 404 into dist/
npm run preview    # serve dist/ the way production does (clean URLs, real 404) at localhost:4173
npm test           # 25 unit tests
npm run test:e2e   # 74 browser tests (run `npm run build` first)
```

## Pages

| URL | File |
| --- | --- |
| `/` | `src/pages/Home.jsx` |
| `/work` | `src/pages/WorkPage.jsx` |
| `/work/<id>` | `src/pages/ProjectPage.jsx` |
| `/services` | `src/pages/ServicesPage.jsx` |
| `/about` | `src/pages/AboutPage.jsx` |
| `/contact` | `src/pages/ContactPage.jsx` |

To add a page: add the route in `src/App.jsx` and its title and description in `src/seo/routes.js`. The sitemap, the prerender step and the `<head>` all follow from that one file.

## Where to change things

All content lives in `src/data`, so you rarely need to touch a component.

| File | What it holds |
| --- | --- |
| `src/data/site.js` | Name, contact details, links, hero headline, credibility figures, biography, the "Verify me" checklist, testimonials |
| `src/data/projects.js` | Every project, and which four are featured on the home page |
| `src/data/services.js` | Services and prices, the receipts, estimator maths, process, payment split, FAQ, toolbox |
| `src/data/experience.js` | Job history |
| `src/seo/routes.js` | Page titles, descriptions and structured data |

## Four things that make the site more trustworthy (only you can add them)

Nothing on the site is invented, so these stay hidden until you fill them in:

1. **Your photo:** put a file in `public/` and set `profile.photo` in `src/data/site.js`.
2. **Real screenshots:** add `image: '/shots/tripkoz.jpg'` to a project. It replaces the drawn cover.
3. **Live links:** add `liveUrl: 'https://…'` to a project.
4. **Client quotes:** add real ones to `testimonials` in `src/data/site.js`.

## Design

The design system is called Ink & Signal: see `docs/design-system.md`. Colours, fonts, sizes and radii are CSS variables at the top of `src/styles/base.css`; the page layout is in `src/styles/edition.css`. There is a dark theme and a light theme; the site follows the visitor's system setting until they use the toggle.

## Contact form

Set `VITE_WEB3FORMS_KEY` in Vercel (free key from web3forms.com) to receive the form by email. Without it, the form opens WhatsApp with the brief already written.

## Reports

`docs/portfolio-audit.md` · `docs/design-system.md` · `docs/seo-audit.md` · `docs/performance-report.md` · `docs/qa-report.md`
