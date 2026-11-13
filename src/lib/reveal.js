import { useEffect } from 'react'

// Scroll reveals as a progressive enhancement.
//
// The page is delivered with everything visible. Once it is live, anything that is still BELOW
// the screen is quietly hidden and then animated in when it scrolls into view. Anything already
// on screen is never touched. So:
//   - what the visitor sees first never waits for JavaScript (good for speed and for LCP),
//   - with JavaScript off, or for a crawler, nothing is ever hidden,
//   - with "reduce motion" on, nothing moves at all.
export function useScrollReveal(ref, controls, { hidden, shown, margin = '0px 0px -8% 0px' }) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    controls.set(hidden)
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          controls.start(shown)
          io.disconnect()
        }
      },
      // Only shrink the bottom edge. A margin on all four sides would also trim the left and
      // right, and small things near the edge of a phone screen would never "arrive".
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
    // The hidden / shown states are fixed for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
