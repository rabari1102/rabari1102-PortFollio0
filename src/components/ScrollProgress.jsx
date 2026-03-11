import { useEffect, useState } from 'react'

export default function ScrollProgress() {
    const [pct, setPct] = useState(0)

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement
            const scrolled = el.scrollTop || document.body.scrollTop
            const total = el.scrollHeight - el.clientHeight
            setPct(total > 0 ? (scrolled / total) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: `${pct}%`,
            height: '3px', background: 'linear-gradient(90deg, var(--cyan), var(--indigo), var(--purple))',
            zIndex: 200, transition: 'width 0.1s linear',
            boxShadow: '0 0 8px rgba(34,211,238,0.6)'
        }} />
    )
}
