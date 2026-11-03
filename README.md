# Pragnesh Kalotara · Freelance portfolio

Freelance site: web, mobile and desktop software built from a home studio in Ahmedabad.

React 18 + Vite + Framer Motion, with a three.js hero (`src/components/HeroScene.jsx`) that draws the floating home-studio island in code. Deployed on Vercel.

```bash
npm install
npm run dev
npm run build
```

## Where to change things

All content lives in `src/data`, so you rarely need to touch a component.

| File | What it holds |
| --- | --- |
| `src/data/site.js` | Name, email, phone, WhatsApp, links, availability line, hero numbers, marquee words |
| `src/data/projects.js` | Every project: story, features, stack, numbers, accent colour, cover style |
| `src/data/services.js` | Services and starting prices, the agency-vs-me receipt, estimator maths, process, payment split, FAQ, toolbox |
| `src/data/experience.js` | Job history |

Each project gets its own page at `/work/<id>`.

## Contact form

Set `VITE_WEB3FORMS_KEY` in Vercel (free key from web3forms.com) to receive the form by email.
Without it, the form opens WhatsApp with the brief already written.
