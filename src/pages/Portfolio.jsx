import { useEffect } from 'react'
import ScrollProgress from '../components/ScrollProgress'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import AiTicker from '../components/AiTicker'
import Impact from '../components/Impact'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

import AiMastery from '../components/AiMastery'
import AiConsultant from '../components/AiConsultant'
import Testimonials from '../components/Testimonials'
import EduContact from '../components/EduContact'
import Footer from '../components/Footer'

function MobileNav() {
    const navTo = (id, btn) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        document.querySelectorAll('.mobile-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
    }
    const navItems = [
        { id: 'home', label: 'Home', icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
        { id: 'impact', label: 'Impact', icon: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></> },
        { id: 'experience', label: 'Work', icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></> },
        { id: 'ai-mastery', label: 'AI', icon: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /> },
        { id: 'skills', label: 'Skills', icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
    ]
    return (
        <div className="mobile-nav">
            <div className="mobile-nav-inner">
                {navItems.map((n, i) => (
                    <button key={n.id} className={`mobile-btn${i === 0 ? ' active' : ''}`} onClick={e => navTo(n.id, e.currentTarget)}>
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{n.icon}</svg>
                        {n.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function Portfolio() {
    useEffect(() => {
        const canvas = document.getElementById('bg-canvas')
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const follower = document.getElementById('mouse-follower')
        let particles = [], raf
        let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2
        let folX = mouseX, folY = mouseY

        const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
        window.addEventListener('mousemove', onMouseMove)

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const initParticles = () => {
            particles = []
            if (reduced) return
            const n = window.innerWidth < 768 ? 30 : 65
            for (let i = 0; i < n; i++) {
                particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.4 + 0.3 })
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles()
        }

        const drawBg = () => {
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            g.addColorStop(0, '#03040a'); g.addColorStop(0.5, '#060810'); g.addColorStop(1, '#020307')
            ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height)
            folX += (mouseX - folX) * 0.15; folY += (mouseY - folY) * 0.15
            if (follower) follower.style.transform = `translate(${folX}px, ${folY}px)`
            if (!reduced) {
                particles.forEach((p, i) => {
                    p.x += p.vx; p.y += p.vy
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1
                    const mDx = p.x - mouseX, mDy = p.y - mouseY, mDist = Math.sqrt(mDx * mDx + mDy * mDy)
                    if (mDist < 150) { p.x += mDx * 0.01; p.y += mDy * 0.01 }
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                    ctx.fillStyle = mDist < 120 ? 'rgba(255,255,255,0.8)' : 'rgba(34,211,238,.3)'; ctx.fill()
                    for (let j = i + 1; j < particles.length; j++) {
                        const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy)
                        if (d < 130) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(34,211,238,${0.07 - (d / 130) * 0.07})`; ctx.lineWidth = 0.4; ctx.stroke() }
                    }
                })
            }
            raf = requestAnimationFrame(drawBg)
        }

        window.addEventListener('resize', resize)
        resize(); drawBg()

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } })
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(raf)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <ScrollProgress />
            <canvas id="bg-canvas"></canvas>
            <div id="mouse-follower"></div>
            <Nav />
            <main>
                <Hero />
                <AiTicker />
                <Impact />
                <Experience />
                <Projects />
                <Skills />
                <AiMastery />
                <AiConsultant />
                <Testimonials />
                <EduContact />
            </main>
            <Footer />
            <MobileNav />
        </>
    )
}
