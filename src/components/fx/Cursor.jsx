import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotionPref } from '../../lib/hooks'

// A soft ring that trails the real cursor. The system cursor stays visible, this is decoration:
// it grows over anything clickable, and shows a word over elements that carry data-cursor="View".
export default function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotionPref()
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (!fine || reduced) return
    const el = ring.current
    const pos = { x: -100, y: -100, tx: -100, ty: -100 }
    let raf = 0
    let shown = false

    const onMove = (e) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
      if (!shown) {
        shown = true
        pos.x = pos.tx
        pos.y = pos.ty
        el.classList.add('is-on')
      }
      const hit = e.target.closest?.('[data-cursor], a, button, summary, input, textarea, [role="button"]')
      const word = hit?.closest('[data-cursor]')?.dataset.cursor || ''
      el.classList.toggle('is-hover', !!hit && !word)
      el.classList.toggle('is-label', !!word)
      el.classList.toggle('is-text', !!hit && hit.matches('input, textarea'))
      if (word && label.current.textContent !== word) label.current.textContent = word
    }
    const onLeave = () => {
      shown = false
      el.classList.remove('is-on')
    }
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')

    const tick = () => {
      pos.x += (pos.tx - pos.x) * 0.2
      pos.y += (pos.ty - pos.y) * 0.2
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return (
    <div ref={ring} className="cursor" aria-hidden="true">
      <span className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </span>
    </div>
  )
}
