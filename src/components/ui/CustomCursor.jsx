import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [hoverState, setHoverState] = useState({ active: false, label: '' })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Enable custom cursor only on desktop fine-pointer devices and when reduced motion is disabled
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!finePointer || reducedMotion) {
      setEnabled(false)
      return
    }

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY
    let rafId

    const onPointerMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      setPosition({ x: targetX, y: targetY })
    }

    // Smooth lerp loop for trailing ring
    const loop = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      setTrail({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(loop)
    }

    const onPointerOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, .card-spotlight, .interactive-tag')
      if (target) {
        const label = target.getAttribute('data-cursor') || ''
        setHoverState({ active: true, label })
      }
    }

    const onPointerOut = (e) => {
      const target = e.target.closest('[data-cursor], a, button, .card-spotlight, .interactive-tag')
      if (target) {
        setHoverState({ active: false, label: '' })
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      cancelAnimationFrame(rafId)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Center dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        aria-hidden="true"
      />
      {/* Trailing ring */}
      <div
        className={`cursor-ring ${hoverState.active ? 'is-hover' : ''}`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`
        }}
        aria-hidden="true"
      >
        {hoverState.label && <span className="cursor-label">{hoverState.label}</span>}
      </div>
    </>
  )
}
