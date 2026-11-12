import { useEffect } from 'react'

// One listener for the whole page: any element marked data-spot gets --mx / --my set to the
// pointer position inside it, which the CSS uses to draw a glow that follows the cursor.
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let last = null
    const onMove = (e) => {
      const el = e.target.closest?.('[data-spot]')
      if (last && last !== el) last.classList.remove('is-lit')
      last = el
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
      el.classList.add('is-lit')
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}
