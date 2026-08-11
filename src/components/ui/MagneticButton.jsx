import { useRef, useEffect } from 'react'

export default function MagneticButton({ children, className = '', strength = 0.35, onClick, ...props }) {
  const btnRef = useRef(null)

  useEffect(() => {
    const el = btnRef.current
    if (!el) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || reducedMotion) return

    const onPointerMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength
      // Clamp magnetic pull to max 10px
      const clampedX = Math.max(-10, Math.min(10, x))
      const clampedY = Math.max(-10, Math.min(10, y))
      el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`
    }

    const onPointerLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', onPointerLeave)

    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [strength])

  return (
    <button ref={btnRef} className={`magnetic-btn ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
