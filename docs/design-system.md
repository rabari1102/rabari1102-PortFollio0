# Midnight Signal design system

A deep midnight-blue studio with one violet light and a thin cyan signal. Crisp borders, large type, restrained glow. A light theme flips the same tokens to warm paper and ink.

All tokens live at the top of `src/styles/base.css`. Components never hard-code a colour; the only literal colours outside the token block are `#000` in CSS masks.

## Colour

### Dark (default)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#090e1a` | Page background |
| `--bg-2` | `#0c1322` | Alternate band |
| `--surface` | `#151d30` | Cards, navigation |
| `--surface-2` | `#1c2640` | Raised, hover |
| `--text` | `#f5f7fc` | Headings, primary copy |
| `--text-2` | `#afbbd0` | Supporting copy |
| `--text-3` | `#9da9c1` | Low-emphasis labels |
| `--line` | `#313b51` at 72% | Subtle separators |
| `--line-2` | `#3b4661` | Card and control outlines |
| `--line-3` | `#65718f` | Form-field boundaries |
| `--accent` | `#a78bfa` | Accent **text**, icons, links |
| `--accent-strong` | `#8b5cf6` | Glows, focus rings, non-text fills |
| `--grad` | `#6d3ae6 → #8452f2` | Filled buttons and badges (white text) |
| `--grad-text` | `#a78bfa → #c4b5fd → #67e8f9` | The accent word in a headline |
| `--cyan` / `--ok` | `#67e8f9` | Technical detail, ticks, "verified" |
| `--danger` | `#fda4af` | Errors, "never" lists |

### Light

| Token | Value |
| --- | --- |
| `--bg` | `#f6f4ef` |
| `--text` | `#17212e` |
| `--accent` (text) | `#2456d4` |
| `--accent-strong` (fills) | `#316bee` |
| `--accent-soft` | `#d4e5ff` |
| `--cyan` / `--ok` | `#0e7490` |

### Where the brief's tokens were adjusted for contrast

The brief said the palette was a starting point and asked for contrast to be validated. Two adjustments were needed. Ratios are computed with the WCAG formula.

| Pair | Ratio | Verdict |
| --- | --- | --- |
| White on `#8b5cf6` (brief's CTA colour) | 4.23:1 | Fails AA for button text. Buttons use `--grad` instead |
| White on `--grad`, lightest stop `#8452f2` | 4.70:1 | Passes |
| `#8b5cf6` as text on `--surface` | 3.97:1 | Fails. Text uses `#a78bfa` |
| `#a78bfa` on `--bg` / `--surface` | 7.08 / 6.17:1 | Passes |
| `#316bee` as text on light `--bg` | 4.28:1 | Fails. Text uses `#2456d4` (5.69:1) |
| White on `#316bee` | 4.70:1 | Passes |

### Measured contrast, everything else

| Theme | Pair | Ratio |
| --- | --- | --- |
| Dark | Primary text on bg / surface | 17.99 / 15.67:1 |
| Dark | Secondary text on bg / surface | 9.95 / 8.67:1 |
| Dark | Muted text on bg / surface | 8.15 / 7.10:1 |
| Dark | Cyan on bg / surface | 13.30 / 11.59:1 |
| Dark | Danger on surface | 8.88:1 |
| Dark | Form-field border on bg (needs 3:1) | 3.96:1 |
| Light | Primary / secondary / muted text on bg | 14.77 / 7.31 / 5.28:1 |
| Light | Muted text on alternate band | 4.91:1 |
| Light | Teal signal on bg | 4.87:1 |
| Light | Form-field border on bg (needs 3:1) | 3.30:1 |
| Paper | Ink / secondary ink | 14.77 / 6.55:1 |
| Paper | Stamp red / green | 5.95 / 6.05:1 |

Card outlines (`--line-2`, 2.05:1) are decorative: every card is also separated by a surface colour and spacing, so they are not the only cue.

Each project has its own accent colour (`accent` in `projects.js`). It is mixed towards white by 42% in the dark theme and towards black by 26% in the light theme (`--tint`, `--tint-amt`) so it stays readable on either background.

## Type

| Role | Family | Notes |
| --- | --- | --- |
| Headings | Geist, 600 | Tracking −0.045 to −0.052em |
| Body | Geist, 400–500 | 17 px, line height 1.6 |
| Labels | Geist Mono | 12 px, uppercase, +0.05em |
| Accent word | Instrument Serif italic | One word per headline, in `--grad-text`. The one decorative voice on the site |

All fonts are self-hosted, Latin and Latin-extended subsets only.

| Token | Range |
| --- | --- |
| `--fs-hero` | 40 → 88 px |
| `--fs-h1` | 38 → 84 px |
| `--fs-h2` | 32 → 60 px |
| `--fs-h3` | 20 → 26 px |
| `--fs-lead` | 17 → 19 px |
| `--fs-body` | 17 px |
| `--fs-small` | 14.4 px |
| `--fs-label` | 12 px |

## Layout

- Content width `--max` 1280 px. Gutter `--gutter` 20 → 44 px, never less than the device's safe-area inset.
- Section rhythm `--section` 80 → 150 px.
- Radii: `--radius-sm` 12, `--radius` 18, `--radius-lg` 26, pills 999.
- Breakpoints are placed where each layout breaks, not at device sizes. The common ones: 560, 640, 760, 900, 1000, 1180 px.
- The hero is a 61 / 39 split on desktop and stacks on phones in this order: identity, headline, description, primary button, secondary button, promises, visual.

## Components

| Pattern | Class | Notes |
| --- | --- | --- |
| Primary button | `.btn-primary` | Gradient fill, white text, a band of light crosses on hover |
| Secondary button | `.btn-ghost` | Outline that fills from the bottom |
| Text link with arrow | `.link-arrow` + `.round-arrow` | Arrow rolls 45° |
| Chip | `.chip` | Technology names |
| Choice | `.choice` | Toggle buttons with `aria-pressed` (estimator, form, filter) |
| Card with pointer glow | `[data-spot]` | One page-level listener sets `--mx` / `--my` |
| Section heading | `SectionHead` | Number, label, kinetic title, intro |
| Page heading | `PageHead` | Breadcrumb, label, `h1`, intro. CSS-only entrance |
| Case card | `CaseCard` | Story one side, product the other, sides alternate |
| Paper | `.paper` | Receipts and the draft quote: always light, in both themes |
| Product mock | `Mocks.jsx` | Drawn in CSS, sized in container-query units so one drawing works from 90 to 600 px wide |

## Motion

One animation library (Framer Motion) plus CSS keyframes. No scroll hijacking.

| Kind | Duration | How |
| --- | --- | --- |
| Hover, focus, press | 180–220 ms | CSS transitions on `transform`, `opacity`, colour |
| Larger hover moves (card lift, row sweep) | 400 ms | `transform` only |
| Things entering the page | 500–700 ms | `opacity` + `transform` |
| Ambient (hero glow, floating mocks) | 7–24 s loops | `transform` only; WebGL on wide screens |

Rules:

1. **The top of every page animates with CSS only** (`.in`, `.pop`, `mode="css"` headlines), so the headline is painted with the HTML.
2. **Scroll reveals are an enhancement.** Content ships visible. After the page is live, only what is still below the screen is hidden and then revealed (`src/lib/reveal.js`). Nothing a visitor can already see is ever hidden.
3. **`prefers-reduced-motion`** turns off every animation and transition, zeroes delays, holds the WebGL backdrop on one frame and removes the cursor ring.
4. **No JavaScript:** everything is visible. If the script fails to start within five seconds, the same fallback applies.
5. The WebGL backdrop runs only on screens 900 px and wider, starts when the browser is idle, renders at about half resolution, pauses off-screen and respects the data-saver setting. Phones get a CSS gradient.
6. The cursor ring is decoration. The system cursor is never hidden.

## Accessibility rules

- One `h1` per page; headings never skip a level.
- Every interactive element is a real `<a>` or `<button>`, reachable by keyboard, with a visible focus ring (`2px solid var(--accent)`).
- Touch targets are at least 44 × 44 px on touch devices.
- Colour is never the only signal: errors have text, ticks and crosses have icons, current nav item has `aria-current`.
- Animated headlines expose their plain text through `aria-label`.
- Form errors are tied to their field with `aria-describedby` and announced through a live region.
- The phone menu is a modal dialog: focus is trapped, the page behind is `inert`, Escape closes, focus returns.
