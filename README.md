# Pragnesh Kalotara · Freelance portfolio

Freelance site for web, mobile and desktop software, built to answer one question a stranger always has: _"is this person real, and is my money safe?"_

React 18 + Vite + Framer Motion + React Router. No 3D library: the glowing hero backdrop is a small hand-written WebGL shader. Deployed on Vercel.

```bash
npm install
npm run dev
npm run build
```

## Where to change things

All content lives in `src/data`, so you rarely need to touch a component.

| File | What it holds |
| --- | --- |
| `src/data/site.js` | Name, email, phone, WhatsApp, links, availability line, hero numbers, the "Verify me" checklist, the client-protection promises, testimonials |
| `src/data/projects.js` | Every project: story, features, stack, numbers, accent colour, cover style |
| `src/data/services.js` | Services and starting prices, the agency-vs-me receipt, estimator maths, process, payment split, FAQ, toolbox |
| `src/data/experience.js` | Job history |

Each project gets its own page at `/work/<id>`.

## Four things that make the site more trustworthy (only you can add them)

The site never shows anything invented, so these stay hidden until you fill them in:

1. **Your photo** – put a file in `public/` and set `profile.photo` in `src/data/site.js` (e.g. `'/pragnesh.jpg'`). It appears in the contact section.
2. **Real screenshots** – add `image: '/shots/tripkoz.jpg'` to a project in `src/data/projects.js`. It replaces the drawn cover.
3. **Live links** – add `liveUrl: 'https://…'` to a project. A "Open the live product" button appears on its page.
4. **Client quotes** – add real ones to `testimonials` in `src/data/site.js` (name, role, and ideally a link). The quote wall appears by itself. Never make these up.

## Look and feel

- Colours, fonts and radii are CSS variables at the top of `src/styles/base.css`. There is a dark theme (default) and a light theme; the toggle in the nav remembers the visitor's choice.
- Styles are split by area: `base.css` (tokens, buttons, shared bits), `layout.css` (nav, hero, product mocks, footer), `sections.css` (home page sections), `project.css` (case-study page, 404).
- Animation pieces live in `src/components/fx`: the WebGL backdrop, the cursor ring, magnetic buttons, word-by-word headlines, the opening curtain. All of them switch off for visitors who ask their device for reduced motion.
- Fonts are self-hosted from `node_modules` (`src/styles/fonts.css`), so there is no request to Google Fonts.

## Contact form

Set `VITE_WEB3FORMS_KEY` in Vercel (free key from web3forms.com) to receive the form by email.
Without it, the form opens WhatsApp with the brief already written.
