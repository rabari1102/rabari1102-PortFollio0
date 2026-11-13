# Design system: Ink & Signal

**Date:** 2026-11-13. Replaces the earlier "Midnight Signal" system (still in git history).

The site is designed as a printed page that moves: ink-black and bone, one signal orange, hairline rules, a visible column grid, very large serif headlines and small monospace labels. There are no glows, gradients or drop shadows, and corners are almost square.

All tokens are CSS custom properties at the top of `src/styles/base.css`. The layout lives in `src/styles/edition.css`.

## Colour

| Token | Dark (default) | Light | Used for |
| --- | --- | --- | --- |
| `--bg` | `#0d0d0c` | `#efede6` | The page |
| `--bg-2` | `#131311` | `#e6e3da` | Alternate band (process) |
| `--surface` | `#181816` | `#f6f4ee` | Panels, form |
| `--text` | `#efede6` | `#12120f` | Headings, primary copy |
| `--text-2` | `#bab7ac` | `#45433b` | Supporting copy |
| `--text-3` | `#9c998e` | `#5c5a50` | Labels |
| `--text-dim` | `#72706a` | `#807d73` | Large display type that is "not inked yet" (large text only, at least 3:1) |
| `--line` / `--line-2` | bone at 13% / 26% | ink at 14% / 30% | Hairlines / control outlines |
| `--accent` | `#ff6a2b` | `#a83204` | Accent text, links, italics |
| `--accent-strong` | `#ff6a2b` | `#ff6a2b` | Filled buttons (ink text on top, 7:1) |
| `--ok` | `#a5dc8f` | `#1d6b33` | "Live", "verified" |

The site follows the visitor's system theme until they use the toggle. Contrast is checked by the automated accessibility tests on every page type in both themes.

## Type

| Token | Font | Used for |
| --- | --- | --- |
| `--f-head` | Instrument Serif (roman and italic) | Every large headline; the italic is the accent voice |
| `--f-display`, `--f-body` | Geist | Small headings, figures, body copy |
| `--f-mono` | Geist Mono | Labels, indexes, dates |

Scale: `--fs-hero` 50 → 200px, `--fs-h1` 46 → 152px, `--fs-h2` 38 → 96px, body 17px, labels 11.5px uppercase. Headlines are set tight (line-height 0.88 to 0.95, letter-spacing about -0.03em). Accent words are written with `*asterisks*` in the data and rendered as orange italics.

## Grid and shape

- Content width up to 1680px, gutter 18 → 48px.
- Four columns marked by five fixed hairlines (`.gridlines`); sections are laid out on 12 sub-columns so labels sit in the first column and titles start on the second.
- Sections are separated by full-width rules, not by cards.
- Radii: 2 to 4px. Buttons and the search field are the only pills.

## Layout of each page

| Page | Structure |
| --- | --- |
| Home | Masthead (dateline row, three-line stepped headline, lede, promises, turning ring) → four numbers → selected work as a split page with pinned pictures → statement that inks in on scroll → services as a price list → process as a sideways strip → tool marquee → "verify me" → contact form |
| Work | Page head → text filters → two ruled indexes (client work, team work); the picture floats beside the pointer on desktop and sits in the row on touch |
| Case study | Breadcrumb rule → serif title → facts → cover → numbered sections |
| Services, About, Contact | Page head with the introduction set as a right-hand standfirst, then the sections |
| Footer | Invitation in headline type, the email address as a large link, link columns, the name as a page-wide wordmark |

## Motion

| Effect | Where | Notes |
| --- | --- | --- |
| Masked word rise | Headlines | CSS only at the top of a page, so it never delays the first paint |
| Pinned picture | Selected work | `position: sticky`, no script |
| Ink-in statement | Home, About block | Script only dims words not reached yet; delivered fully readable |
| Row inversion | Services price list | A sheet of the text colour rises behind the row |
| Sideways strip | Process, 1000px and wider | The section pins and the strip moves with the scroll |
| Floating picture | Work index, mouse only | Pointer position is written to two CSS variables |
| Marquee | Tools | Speeds up with scroll velocity |
| Page curtain, cursor ring, magnetic buttons | Site-wide | Mouse-only where it depends on a pointer |

Rules: every effect is an enhancement. With JavaScript off, with reduced motion requested, or on a phone, the same content is present and readable; pinned and sideways sections become ordinary vertical lists.

## Components

Buttons (`.btn-primary` orange with a rising fill, `.btn-ghost` outline), text link (`.tlink`), section head (`SectionHead`), page head (`PageHead`), index row (`WorkIndex`), price row (`ServiceRows`), process strip (`Process`), facts row (`Facts`), command palette (Ctrl/⌘ K).
