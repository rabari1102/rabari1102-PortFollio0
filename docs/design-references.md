# Design references and the one idea they became

**Date:** 2026-11-13

## How this research was done, honestly

The brief was to study 15–25 award-level portfolio designs and combine them into one idea.

The working environment could not open awwwards.com or the portfolio sites themselves (its network only allows a fixed list of hosts). So **no site was looked at directly.** What was available:

- search results, which return award listings and short summaries of published write-ups (Codrops case studies, Awwwards case studies, a juror's guide), and
- general knowledge of how well-known portfolio patterns work.

The table marks which is which. Nothing below copies a layout, asset or line of code from any of these sites; each entry is a *pattern*, rebuilt from scratch for this site.

## Update: the full redesign (Ink & Signal)

The first pass added effects to the existing layout. That was not what was asked for, so the site was then rebuilt with a new layout, type system and palette (see `docs/design-system.md`).

Awwwards was tried again for this pass. The host was added to the environment's allowed list, but awwwards.com resets connections from this machine, so the gallery still could not be viewed. The redesign therefore draws on the same pattern list below, weighted differently: the type-led black-and-white direction (9), the Swiss grid with visible lines (6), the project index with a floating preview (2), pinned media beside scrolling text, a statement that fills in on scroll, a sideways process strip, and a page-wide wordmark footer. These are widely used editorial patterns, rebuilt from scratch here; nothing was copied from any site.

## References

| # | Reference | What it is known for | Source of the claim | Used here as |
| --- | --- | --- | --- | --- |
| 1 | Dennis Snellenberg | Curved curtain between pages; magnetic buttons | Search summary of third-party breakdowns | The curved page curtain; magnetic buttons (already present) |
| 2 | Olivier Larose tutorials | Project list with a preview that follows the cursor | Search listing | Team-projects hover preview (already present) |
| 3 | Eduard Bodak (SOTD) | Cards that react to scroll and to the mouse | Codrops write-up summary | Pointer-reactive cards with a moving glow |
| 4 | Stas Bondar (SOTD) | Physics-flavoured motion, GSAP + Three.js | Codrops / Awwwards summary | Spring-driven motion on the cursor, frame marker and stage |
| 5 | Joffrey Spitzer | Minimal build; reveals; leaving a page reverses the entrance | Codrops summary | Cover-then-reveal page change |
| 6 | Corentin Bernadou | Swiss grid with geometry | Search summary | Visible grid lines; strict column alignment; mono labels |
| 7 | Thibault Guignand | One animation system driving clip-path wipes and text reveals | Codrops summary | Masked word reveals; clip-path payment bar |
| 8 | Arnaud Rocca | A reusable motion system, not one-off effects | Codrops title | Motion tokens and three shared primitives (`Reveal`, `Kinetic`, `.in`) |
| 9 | Vincent Saïsset | Black and white, type-led, WebGL kept quiet | Roundup summary | Type-first hero; WebGL as backdrop only |
| 10 | Hon Tran (Awwwards juror) | "One opinionated idea, executed with craft"; judged on design, usability, creativity, content | Search summary of his guide | The decision to have a single concept (below) |
| 11 | Awwwards judging criteria | Design, usability, creativity, content | Search result | Why usability and content were not traded for effects |
| 12 | 2026 trend reviews | Bento grids are now the default for portfolios | Trend articles via search | The bento panel in About |
| 13 | 2026 trend reviews | Kinetic type works as one hero moment, not everywhere | Trend articles via search | Weight-reactive type in the hero only |
| 14 | Variable-font hover type | Letters change weight near the pointer | General knowledge | The hero headline |
| 15 | Linear, Raycast, Vercel | Command palette (Ctrl/⌘ K) as primary navigation for power users | General knowledge | The command palette |
| 16 | Rauno Freiberg | Small, exact interaction details; restraint | General knowledge | 180–220 ms feedback; nothing moves without a reason |
| 17 | Brittany Chiang | Section-aware side navigation | General knowledge | The frame's section ruler |
| 18 | Game and instrument HUDs | Corner readouts, tick rulers, coordinates | General knowledge | The instrument frame |
| 19 | Stacking-card case studies | Cards that pin and stack as you scroll | General knowledge | Selected-work deck (already present) |
| 20 | Scroll-velocity marquees | A ticker that speeds up with the scroll | General knowledge | Technology marquee (already present) |
| 21 | Oversized footer wordmarks | The name as a full-width closing image | General knowledge | Footer name with a moving spotlight (already present) |

Award listings seen in search results while researching (names only, not studied): Jesper Landberg, Pacôme Pertant, Gavin Schneider Productions, AUGE Experience, Léo Parpeix.

## The one idea: the portfolio as an instrument panel

Pragnesh builds the systems behind products: backends, real-time tracking, access control. So the site behaves like the console of a running system, not a brochure.

| Part of the idea | What the visitor sees | Where it lives |
| --- | --- | --- |
| **Frame** | A ruler on the right edge with a tick per section and a marker that rides the scroll; a readout bottom-left: section number, name, scroll percentage | `fx/Hud.jsx` |
| **Signal in the type** | The hero headline thickens under the pointer, as if a signal were passing through the letters | `Hero.jsx`, `Kinetic` with `letters` |
| **Curtain** | Changing page: a panel with a curved edge covers the screen, names the destination, lifts | `fx/Curtain.jsx`, `App.jsx` |
| **Console** | Ctrl/⌘ K, or the Search button: jump to any page or project, switch theme, open WhatsApp | `CommandPalette.jsx` |
| **Live panel** | A bento grid of real, current facts: local time, projects shipped, the four live links, core stack | `AboutTeaser.jsx` |

## Rules it was built under

- Every new piece is an enhancement. With JavaScript off, reduced motion on, or on a phone, the page is complete without it.
- The frame and the weight-reactive type only run on wide screens with a mouse. The frame is not mounted at all on phones.
- The command palette is downloaded the first time it is opened (2.6 kB gzipped).
- The curtain is skipped under reduced motion and for same-page anchor jumps.
- The palette and the phone menu are real dialogs: focus is held inside, the page behind is inert, Escape closes and focus returns.
- Every tile in the bento is a fact from the data files; nothing is invented.

## Measured after the change

Lighthouse, lab, same machine as `performance-report.md`: home page desktop 100, mobile 91–92 (three runs; it was 94–98 before this round). Accessibility, Best Practices and SEO remain 100. axe: 0 violations on 8 page types in both themes.

## Not done, and why

- **Horizontal scroll section, 3D flip cards, cursor image trail:** each fights either readability or the keyboard, and the brief ranks usability above effects.
- **Sound, a preloader, scroll hijacking:** all three cost first-paint time or control.
- **Looking at the sites themselves:** allow `awwwards.com` (and any specific portfolio domains) in this environment's network settings and the comparison can be redone against the real thing.
