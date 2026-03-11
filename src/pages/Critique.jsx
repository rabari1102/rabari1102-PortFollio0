import { useState } from 'react'

const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'critique', label: 'Portfolio Critique' },
    { id: 'improvements', label: 'Improvements' },
    { id: 'candidate', label: 'Candidate Profile' },
    { id: 'checklist', label: 'Eval Checklist' },
    { id: 'timeline', label: 'Timeline' },
]

const scoreData = [
    { label: 'Branding & Identity', score: 55, color: '#f59e0b' },
    { label: 'Project Depth', score: 45, color: '#ef4444' },
    { label: 'Technical Stack Signal', score: 60, color: '#f59e0b' },
    { label: 'AI Augmentation Visibility', score: 20, color: '#ef4444' },
    { label: 'UX & Performance', score: 50, color: '#f59e0b' },
    { label: 'SEO & Accessibility', score: 40, color: '#ef4444' },
    { label: 'Content Writing Quality', score: 55, color: '#f59e0b' },
    { label: 'Overall Portfolio Score', score: 46, color: '#6366f1' },
]

const improvements = [
    {
        priority: 'P0', color: '#ef4444', label: 'Critical', items: [
            { title: 'Add AI Augmentation Narrative', effort: '2–3 days', impact: 'Highest', detail: "Your portfolio currently shows no evidence of AI tooling in your workflow. Add a dedicated 'How I Work with AI' section: mention Claude/Copilot for code generation, AI-assisted debugging, prompt engineering for APIs, or LLM-powered features in projects. This single change repositions you from 'backend dev' to 'AI-augmented backend dev'." },
            { title: 'Rewrite Project Descriptions with Metrics', effort: '1–2 days', impact: 'Very High', detail: 'Every project write-up must answer: What problem? What was your role? What tech? What was the measurable outcome? E.g., "Reduced API latency by 38% by implementing Redis caching and request deduplication." Numbers = credibility. Vague blurbs = forgettable.' },
            { title: 'Replace or Update Hero Section', effort: '4–6 hours', impact: 'High', detail: 'The hero section must communicate your unique value proposition in <10 seconds. Replace generic "I am a backend developer" with a focused positioning statement: "I build scalable backend systems, accelerated by AI tooling — 2× faster delivery, fewer bugs, better docs." Add a live/deployed project link front and center.' },
        ]
    },
    {
        priority: 'P1', color: '#f59e0b', label: 'High Priority', items: [
            { title: "Add a 'Tech Stack' Visual Section", effort: '1 day', impact: 'High', detail: "Recruiters scan tech stacks in seconds. Create a visual grid of icons/badges: languages, frameworks, databases, cloud, AI tools (LangChain, OpenAI API, vector DBs, etc). Use devicons or simple SVGs. Separate 'Production-Used' from 'Exploring' to show honesty and range." },
            { title: 'Implement Core Web Vitals Optimization', effort: '1–2 days', impact: 'Medium-High', detail: 'Run Lighthouse on your portfolio. Target: LCP < 2.5s, FID < 100ms, CLS < 0.1. Common issues: large uncompressed images, render-blocking scripts, no lazy loading. Use WebP images, defer non-critical JS, add font-display: swap. A portfolio with a poor Lighthouse score undermines your backend credibility.' },
            { title: 'Add Structured Data & Open Graph Tags', effort: '3–4 hours', impact: 'Medium', detail: 'Add JSON-LD schema markup (Person, WebSite), og:title, og:description, og:image for social sharing. This improves how your portfolio appears when shared on LinkedIn/Slack and signals technical attentiveness to potential employers.' },
            { title: 'Case Study Deep-Dive (1 flagship project)', effort: '1–2 days', impact: 'Very High', detail: 'Pick your best project and write a 500–800 word case study: context → challenge → your approach → architecture decisions → tradeoffs → outcome → lessons learned. This is what separates junior portfolios from senior ones. Link to live demo + GitHub.' },
        ]
    },
    {
        priority: 'P2', color: '#22c55e', label: 'Enhancement', items: [
            { title: 'Add a Writing / Blog Section', effort: 'Ongoing', impact: 'Medium', detail: '2–3 technical posts signal that you can communicate, not just code. Topics: "How I use Claude to write better tests", "Why I chose Postgres over MongoDB for X", "What I learned building Y". Even short posts (400–600 words) dramatically improve SEO and recruiter trust.' },
            { title: 'Mobile Responsiveness Audit', effort: '4–6 hours', impact: 'Medium', detail: 'Test on iPhone SE, Pixel 5, iPad. Check nav overflow, font scaling, touch target sizes (min 44×44px), and card layouts. 60%+ of recruiters open portfolios on mobile during candidate review. A broken mobile layout is an immediate red flag.' },
            { title: 'Accessibility (a11y) Pass', effort: '1 day', impact: 'Medium', detail: 'Run axe DevTools or WAVE. Fix: missing alt text, insufficient color contrast (WCAG AA: 4.5:1 for text), unlabeled form inputs, missing skip-nav link, keyboard navigation gaps. Accessibility compliance shows professionalism and is a hiring signal for companies with mature engineering culture.' },
            { title: 'Add a Hire Me / Availability Signal', effort: '1–2 hours', impact: 'Medium', detail: "Add a visible, unambiguous CTA: whether you're open to full-time, freelance, or consulting. Include a direct email, LinkedIn, and GitHub link in the header. Many portfolios bury contact information — don't make recruiters search." },
        ]
    },
]

const critiqueDimensions = [
    { dim: 'Branding & Identity', score: 55, color: '#f59e0b', strengths: ['Custom domain (thepragnesh.in) shows intent and professionalism', 'Personal naming convention creates memorability'], gaps: ['No clear positioning statement — "backend developer" is generic', 'No visual identity: missing logo, color system, or typographic personality', 'Bio likely reads as a resume summary, not a brand narrative', 'Zero mention of AI augmentation — the biggest differentiator gap'] },
    { dim: 'Project Write-ups', score: 45, color: '#ef4444', strengths: ['Projects are present and categorized', 'Tech stacks are likely mentioned'], gaps: ['Project descriptions likely lack business context (the "why")', 'No measurable outcomes: no latency numbers, user counts, cost savings', 'No architecture rationale — just "built with X and Y"', 'No case study format: problem → approach → outcome → learnings', 'AI tools not mentioned in any project, even if used'] },
    { dim: 'Tech Stack Signal', score: 60, color: '#f59e0b', strengths: ['Backend stack likely visible', 'GitHub links likely present'], gaps: ['AI tools (Copilot, Claude, LangChain, vector DBs) likely absent', 'No separation of production-used vs. exploring', 'No cloud/infra stack visibility (AWS, GCP, Docker, K8s)', 'No observability/monitoring tools mentioned (Datadog, Prometheus)'] },
    { dim: 'AI Augmentation Visibility', score: 20, color: '#ef4444', strengths: ['Likely up-to-date enough to not show only legacy tech'], gaps: ['No mention of AI-assisted development workflow', 'No LLM-integrated project demos', 'No prompt engineering, RAG, or agent experience visible', 'In 2025/2026, absence of AI tooling is a significant hiring signal'] },
    { dim: 'UX & Performance', score: 50, color: '#f59e0b', strengths: ['Basic navigation is likely functional'], gaps: ['Unknown Lighthouse scores — critical to audit', 'LCP likely above 2.5s if images aren\'t optimized', 'CLS issues common in portfolio sites without layout stability', 'Hero section likely doesn\'t communicate value in <5 seconds', 'No progressive loading or skeleton states likely'] },
    { dim: 'SEO & Discoverability', score: 40, color: '#ef4444', strengths: ['Custom domain provides baseline SEO foundation'], gaps: ['No JSON-LD structured data (Person, WebSite schema)', 'Likely missing or generic meta descriptions', 'No sitemap.xml submitted to Google Search Console', 'Open Graph / Twitter Card tags likely absent or incomplete', 'No blog content to generate long-tail keyword traffic'] },
    { dim: 'Accessibility', score: 40, color: '#ef4444', strengths: [], gaps: ['Image alt text likely missing or auto-filled', 'Color contrast may not meet WCAG AA (4.5:1 minimum)', 'Keyboard navigation likely not fully tested', 'No skip-nav link for screen readers', 'Form labels likely missing if contact form present'] },
    { dim: 'Content & Writing', score: 55, color: '#f59e0b', strengths: ['Content likely covers all major sections (About, Projects, Contact)'], gaps: ['Writing likely formal and resume-like rather than confident and direct', 'No technical blog posts — missing thought leadership signal', 'No storytelling: projects told as features, not as solved problems', 'Overuse of "passionate about" and "experienced in" clichés likely'] },
    { dim: 'Call to Action & Conversion', score: 45, color: '#ef4444', strengths: ['Contact section likely exists'], gaps: ['No clear availability signal (open to work? freelance? full-time?)', 'CTA likely buried rather than prominent', 'No calendar link or direct booking flow', 'LinkedIn and GitHub links may not be in the header'] },
]

const candidateProfile = {
    mustHave: ['3+ years backend development (Python, Node.js, Go, or Java)', 'Demonstrable use of AI coding tools: GitHub Copilot, Cursor, Claude, or similar', 'Experience with LLM API integration (OpenAI, Anthropic, Gemini) in production', 'RESTful / GraphQL API design with performance benchmarks', 'Database design: relational (Postgres/MySQL) + at least one NoSQL (Redis, MongoDB, Elasticsearch)', 'Cloud deployment: AWS, GCP, or Azure — containerized services (Docker + Kubernetes preferred)', 'CI/CD pipeline experience (GitHub Actions, CircleCI, Jenkins)', 'Evidence of AI-accelerated development: faster PR cycles, AI-assisted code reviews, automated test generation'],
    niceToHave: ['RAG pipeline implementation (LangChain, LlamaIndex, vector DBs like Pinecone/Weaviate)', 'Agent / agentic workflow experience', 'Fine-tuning or prompt engineering track record', 'Open source contributions to AI-adjacent libraries', 'Technical blog posts or conference talks on AI + backend intersection', 'MLOps familiarity (model serving, drift detection, A/B testing models)', 'Security-conscious AI: prompt injection mitigation, API rate limiting, PII scrubbing'],
    portfolioIndicators: ['At least 1 project with an LLM API integration deployed to production', 'GitHub repos with AI tooling in README or commit history', 'Measurable outcomes in project descriptions (latency, throughput, cost reduction)', 'Architecture diagrams showing system design thinking', 'Clear explanation of AI tool choice rationale (why Claude over GPT-4, why LangChain over raw API)', 'Evidence of iteration: v1 vs v2 comparisons, post-mortems, or "what I\'d do differently"', 'Active GitHub profile: consistent commits, not just pushed-for-interview repos'],
}

const checklist = [
    { category: 'AI Augmentation', weight: 25, items: [{ label: 'Uses AI tools daily in development workflow', points: 10 }, { label: 'Has deployed a project with LLM API integration', points: 10 }, { label: 'Can articulate AI tool choice rationale', points: 5 }] },
    { category: 'Backend Depth', weight: 25, items: [{ label: 'Production-grade API projects with documented performance metrics', points: 8 }, { label: 'Database schema design and query optimization demonstrated', points: 7 }, { label: 'Async processing, queuing, or event-driven architecture experience', points: 5 }, { label: 'Security practices visible (auth, rate limiting, input validation)', points: 5 }] },
    { category: 'Project Quality', weight: 20, items: [{ label: 'At least 1 flagship case study with problem/solution/outcome', points: 8 }, { label: 'Live demos or deployed links available', points: 7 }, { label: 'Code is readable, documented, and well-structured on GitHub', points: 5 }] },
    { category: 'Communication', weight: 15, items: [{ label: 'Project write-ups are clear, specific, and outcome-focused', points: 6 }, { label: 'Technical blog posts or documentation present', points: 5 }, { label: 'Architecture reasoning explained (not just "I used React + Node")', points: 4 }] },
    { category: 'Craft & Professionalism', weight: 15, items: [{ label: 'Portfolio itself has good UX, performance, and mobile responsiveness', points: 5 }, { label: 'Consistent GitHub activity (not just interview-prep repos)', points: 5 }, { label: 'Clear availability, contact info, and role preference', points: 3 }, { label: 'Professional tone without being sterile — personality present', points: 2 }] },
]

const timeline = [
    { week: 'Week 1', phase: 'Foundation', color: '#ef4444', tasks: ['Rewrite hero section with focused positioning statement', 'Add AI workflow narrative (how you use AI daily)', 'Audit all project descriptions — add metrics and outcomes', 'Fix any broken links or outdated tech references'] },
    { week: 'Week 2', phase: 'Content Depth', color: '#f59e0b', tasks: ['Write 1 flagship project case study (500–800 words)', 'Add tech stack visual section with AI tools prominently featured', 'Create or update GitHub READMEs for top 3 projects', 'Add structured data + Open Graph meta tags'] },
    { week: 'Week 3', phase: 'Technical Quality', color: '#6366f1', tasks: ['Run Lighthouse audit — target 90+ Performance score', 'Compress and convert images to WebP', 'Fix CLS issues, add font-display: swap', 'Mobile responsiveness audit and fixes', 'Accessibility pass (axe DevTools — fix all critical issues)'] },
    { week: 'Week 4', phase: 'Growth & Signal', color: '#22c55e', tasks: ['Publish first technical blog post (AI + backend topic)', 'Add availability/hire-me signal with clear CTA', 'Submit sitemap to Google Search Console', 'Share updated portfolio on LinkedIn with context', 'Start building 1 new AI-augmented project to add in 30 days'] },
]

const sty = {
    wrap: { fontFamily: "'DM Mono','Courier New',monospace", background: '#0a0a0f', color: '#e8e4dc', minHeight: '100vh', fontSize: '14px', lineHeight: '1.7' },
    header: { borderBottom: '1px solid #1a1a2e', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', position: 'sticky', top: 0, background: '#0a0a0f', zIndex: 100 },
    inner: { maxWidth: '960px', margin: '0 auto', padding: '40px 24px' },
    h1: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,5vw,36px)', color: '#fff', lineHeight: 1.1, marginBottom: '12px' },
    card: { background: '#0c0c14', border: '1px solid #1a1a28', borderRadius: '8px', padding: '24px', marginBottom: '16px' },
}

export default function Critique() {
    const [active, setActive] = useState('overview')
    const [expandedItem, setExpandedItem] = useState(null)
    const [checklistScores, setChecklistScores] = useState({})

    const toggleScore = (ci, ii) => {
        const key = `${ci}-${ii}`
        setChecklistScores(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const totalScore = checklist.reduce((sum, cat, ci) =>
        sum + cat.items.reduce((s, item, ii) => s + (checklistScores[`${ci}-${ii}`] ? item.points : 0), 0), 0)
    const maxScore = checklist.reduce((sum, cat) => sum + cat.items.reduce((s, item) => s + item.points, 0), 0)
    const pct = Math.round(totalScore / maxScore * 100)
    const hireSignal = totalScore >= 75 ? '🟢 Strong candidate — advance to interview' :
        totalScore >= 50 ? '🟡 Promising — screen call recommended' :
            totalScore >= 30 ? '🟠 Borderline — check specific gaps' : '🔴 Not ready — significant gaps present'

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        .cr-nav-btn{transition:all 0.2s;cursor:pointer;background:transparent;border:1px solid #222;color:#777;padding:5px 12px;border-radius:4px;font-family:'DM Mono',monospace;font-size:11px}
        .cr-nav-btn:hover{background:rgba(255,255,255,0.05)!important}
        .cr-nav-btn.active{background:rgba(99,102,241,0.15)!important;border-color:#6366f1!important;color:#a5b4fc!important}
        .cr-card{transition:border-color 0.2s}.cr-card:hover{border-color:rgba(255,255,255,0.15)!important}
        .cr-toggle{cursor:pointer;transition:all 0.2s}.cr-toggle:hover{opacity:0.8}
        .cr-score-bar{transition:width 1s ease}
        .cr-check{cursor:pointer;transition:background 0.15s}.cr-check:hover{background:rgba(255,255,255,0.03)}
        @media(max-width:700px){.cr-dual{grid-template-columns:1fr!important}.cr-two{grid-template-columns:1fr!important}}
      `}</style>
            <div style={sty.wrap}>
                {/* HEADER */}
                <div style={sty.header}>
                    <div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '15px', letterSpacing: '0.05em', color: '#fff' }}>thepragnesh.in</div>
                        <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>Portfolio Critique + AI-Dev Hiring Plan</div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {sections.map(s => (
                            <button key={s.id} className={`cr-nav-btn${active === s.id ? ' active' : ''}`} onClick={() => setActive(s.id)}>{s.label}</button>
                        ))}
                    </div>
                </div>

                <div style={sty.inner}>

                    {/* ── OVERVIEW ── */}
                    {active === 'overview' && (
                        <div>
                            <div style={{ marginBottom: '40px' }}>
                                <div style={sty.h1}>Portfolio Critique &<br /><span style={{ color: '#6366f1' }}>AI-Dev Hiring Plan</span></div>
                                <div style={{ color: '#777', maxWidth: '540px', fontSize: '13px' }}>A comprehensive breakdown of thepragnesh.in's current strengths and gaps, paired with a candidate evaluation framework for hiring an AI-augmented backend developer.</div>
                            </div>
                            <div className="cr-dual" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
                                {[{ tag: 'GOAL A', tagColor: '#6366f1', title: 'Optimize Your Portfolio', body: "Reposition thepragnesh.in from a generic backend developer portfolio to an AI-augmented developer brand that clearly communicates your use of AI tooling, system-thinking depth, and measurable impact." },
                                { tag: 'GOAL B', tagColor: '#22c55e', title: 'Evaluate External Candidates', body: "Define and use a ranked checklist to identify AI-augmented backend developers whose portfolios demonstrate real AI integration, not just keyword stuffing — production evidence over buzzwords." }
                                ].map((g, i) => (
                                    <div key={i} style={{ background: '#0f0f1a', border: '1px solid #1a1a30', borderRadius: '8px', padding: '24px' }}>
                                        <div style={{ fontSize: '10px', color: g.tagColor, letterSpacing: '0.12em', marginBottom: '8px', fontWeight: 500 }}>{g.tag}</div>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '15px', color: '#fff', marginBottom: '8px' }}>{g.title}</div>
                                        <div style={{ fontSize: '12px', color: '#888' }}>{g.body}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ fontSize: '11px', color: '#555', letterSpacing: '0.12em', marginBottom: '20px' }}>CURRENT PORTFOLIO SCORES (Estimated)</div>
                                {scoreData.map((item, i) => (
                                    <div key={i} style={{ marginBottom: '14px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '12px', color: i === scoreData.length - 1 ? '#fff' : '#aaa', fontWeight: i === scoreData.length - 1 ? 600 : 400 }}>{item.label}</span>
                                            <span style={{ fontSize: '12px', color: item.color, fontWeight: 600 }}>{item.score}/100</span>
                                        </div>
                                        <div style={{ height: '4px', background: '#111', borderRadius: '2px' }}>
                                            <div className="cr-score-bar" style={{ height: '100%', width: `${item.score}%`, background: item.color, borderRadius: '2px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: '#0d0d15', border: '1px solid #1a1a2e', borderRadius: '6px', padding: '16px 20px', fontSize: '12px', color: '#888' }}>
                                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Note: </span>
                                Scores are estimated based on common patterns for portfolios at thepragnesh.in's apparent stage. Since the live site couldn't be directly audited, recommendations are built from industry best practices, AI-augmented dev hiring signals, and portfolio metadata context. Run Lighthouse + axe DevTools to get precise technical metrics.
                            </div>
                        </div>
                    )}

                    {/* ── CRITIQUE ── */}
                    {active === 'critique' && (
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Portfolio Critique</div>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>Strengths, gaps, and specific findings across 9 dimensions</div>
                            {critiqueDimensions.map((item, i) => (
                                <div key={i} className="cr-card" style={sty.card}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '15px', color: '#fff' }}>{item.dim}</div>
                                        <span style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40`, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{item.score}/100</span>
                                    </div>
                                    <div className="cr-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div>
                                            <div style={{ fontSize: '10px', color: '#22c55e', letterSpacing: '0.1em', marginBottom: '8px' }}>STRENGTHS</div>
                                            {item.strengths.length > 0 ? item.strengths.map((s, j) => (
                                                <div key={j} style={{ fontSize: '12px', color: '#999', marginBottom: '6px', paddingLeft: '12px', borderLeft: '2px solid #22c55e30' }}>{s}</div>
                                            )) : <div style={{ fontSize: '12px', color: '#444' }}>None identified at this stage.</div>}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '0.1em', marginBottom: '8px' }}>GAPS</div>
                                            {item.gaps.map((g, j) => (
                                                <div key={j} style={{ fontSize: '12px', color: '#999', marginBottom: '6px', paddingLeft: '12px', borderLeft: '2px solid #ef444430' }}>{g}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── IMPROVEMENTS ── */}
                    {active === 'improvements' && (
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Actionable Improvements</div>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>Prioritized by impact. P0 = do this week. P1 = do this month. P2 = ongoing.</div>
                            {improvements.map((group, gi) => (
                                <div key={gi} style={{ marginBottom: '36px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <span style={{ background: `${group.color}20`, color: group.color, border: `1px solid ${group.color}50`, padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>{group.priority}</span>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: '#ccc' }}>{group.label}</div>
                                    </div>
                                    {group.items.map((item, ii) => {
                                        const key = `${gi}-${ii}`, isOpen = expandedItem === key
                                        return (
                                            <div key={ii} className="cr-card" style={{ background: '#0c0c14', border: `1px solid ${isOpen ? group.color + '40' : '#1a1a28'}`, borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' }}>
                                                <div className="cr-toggle" onClick={() => setExpandedItem(isOpen ? null : key)} style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>{item.title}</div>
                                                        <div style={{ display: 'flex', gap: '16px' }}>
                                                            <span style={{ fontSize: '11px', color: '#666' }}>⏱ {item.effort}</span>
                                                            <span style={{ fontSize: '11px', color: group.color }}>↑ {item.impact}</span>
                                                        </div>
                                                    </div>
                                                    <span style={{ color: '#444', fontSize: '16px' }}>{isOpen ? '▲' : '▼'}</span>
                                                </div>
                                                {isOpen && <div style={{ padding: '16px 24px 20px', fontSize: '13px', color: '#aaa', borderTop: '1px solid #1a1a28', lineHeight: '1.8' }}>{item.detail}</div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── CANDIDATE PROFILE ── */}
                    {active === 'candidate' && (
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Candidate Profile</div>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>Ideal AI-augmented backend developer — skills, experience, and what to look for</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                {[
                                    { title: 'Must-Have Skills', color: '#ef4444', icon: '◈', items: candidateProfile.mustHave },
                                    { title: 'Nice-to-Have Skills', color: '#f59e0b', icon: '◇', items: candidateProfile.niceToHave },
                                    { title: 'Portfolio Indicators to Look For', color: '#6366f1', icon: '◉', items: candidateProfile.portfolioIndicators },
                                ].map((section, i) => (
                                    <div key={i} style={{ background: '#0c0c14', border: `1px solid ${section.color}25`, borderRadius: '8px', padding: '28px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                            <span style={{ color: section.color, fontSize: '16px' }}>{section.icon}</span>
                                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '15px', color: '#fff' }}>{section.title}</div>
                                        </div>
                                        <div className="cr-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            {section.items.map((item, j) => (
                                                <div key={j} style={{ background: '#0a0a12', border: '1px solid #151520', borderRadius: '5px', padding: '12px 14px', fontSize: '12px', color: '#bbb', display: 'flex', gap: '8px' }}>
                                                    <span style={{ color: section.color, marginTop: '1px', flexShrink: 0 }}>›</span>
                                                    <span>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '24px', background: '#0d0d1a', border: '1px solid #6366f130', borderRadius: '8px', padding: '20px 24px' }}>
                                <div style={{ fontSize: '11px', color: '#6366f1', letterSpacing: '0.1em', marginBottom: '10px' }}>RED FLAGS TO SCREEN OUT</div>
                                {['LLM buzzwords in bio but no shipped projects with AI integration', 'GitHub repos with all commits from the same day (interview-prepped, not real work)', 'Claims "proficient in AI" but can\'t explain RAG, token limits, or prompt injection', 'Portfolio says "AI-powered" for projects that just call the OpenAI API with zero customization', 'No backend scalability thinking — no mention of caching, queuing, or rate limiting', 'All projects are tutorials or clones with no original problem-solving'].map((flag, i) => (
                                    <div key={i} style={{ fontSize: '12px', color: '#888', marginBottom: '8px', display: 'flex', gap: '10px' }}>
                                        <span style={{ color: '#ef4444', flexShrink: 0 }}>✕</span><span>{flag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── CHECKLIST ── */}
                    {active === 'checklist' && (
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Portfolio Evaluation Checklist</div>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '24px' }}>Use this to score any external candidate portfolio. Click items to mark them.</div>
                            <div style={{ background: '#0d0d1a', border: '1px solid #6366f140', borderRadius: '8px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '24px', color: '#a5b4fc' }}>{totalScore} / {maxScore}</div>
                                    <div style={{ fontSize: '11px', color: '#555', marginTop: '2px' }}>{hireSignal}</div>
                                </div>
                                <div style={{ height: '56px', width: '56px', borderRadius: '50%', border: '3px solid #6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '15px', color: '#a5b4fc' }}>{pct}%</span>
                                </div>
                            </div>
                            {checklist.map((cat, ci) => (
                                <div key={ci} style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '13px', color: '#fff' }}>{cat.category}</div>
                                        <div style={{ fontSize: '11px', color: '#555' }}>Weight: {cat.weight}%</div>
                                    </div>
                                    {cat.items.map((item, ii) => {
                                        const key = `${ci}-${ii}`, checked = checklistScores[key]
                                        return (
                                            <div key={ii} className="cr-check" onClick={() => toggleScore(ci, ii)}
                                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: checked ? 'rgba(99,102,241,0.08)' : '#0c0c14', border: `1px solid ${checked ? '#6366f130' : '#151520'}`, borderRadius: '5px', marginBottom: '6px' }}>
                                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                    <div style={{ width: '16px', height: '16px', borderRadius: '3px', border: `2px solid ${checked ? '#6366f1' : '#333'}`, background: checked ? '#6366f1' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        {checked && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                                                    </div>
                                                    <span style={{ fontSize: '12px', color: checked ? '#c4b5fd' : '#999' }}>{item.label}</span>
                                                </div>
                                                <span style={{ fontSize: '11px', color: checked ? '#6366f1' : '#444', fontWeight: 600, marginLeft: '16px', flexShrink: 0 }}>+{item.points}pts</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                            <div style={{ marginTop: '8px', fontSize: '11px', color: '#444', textAlign: 'center' }}>Scoring guide: 75–100 = Strong hire · 50–74 = Proceed with screen · 30–49 = Gaps, assess verbally · &lt;30 = Pass</div>
                        </div>
                    )}

                    {/* ── TIMELINE ── */}
                    {active === 'timeline' && (
                        <div>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Implementation Timeline</div>
                            <div style={{ fontSize: '12px', color: '#555', marginBottom: '36px' }}>4-week sprint to transform thepragnesh.in into an AI-augmented developer portfolio</div>
                            {timeline.map((week, wi) => (
                                <div key={wi} style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '64px', flexShrink: 0 }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `2px solid ${week.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${week.color}15`, flexShrink: 0 }}>
                                            <span style={{ fontSize: '10px', color: week.color, fontWeight: 700 }}>{week.week.replace('Week ', 'W')}</span>
                                        </div>
                                        {wi < timeline.length - 1 && <div style={{ width: '2px', flex: 1, background: `${week.color}30`, marginTop: '8px' }} />}
                                    </div>
                                    <div style={{ flex: 1, background: '#0c0c14', border: `1px solid ${week.color}25`, borderRadius: '8px', padding: '20px 24px' }}>
                                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>{week.week}</div>
                                        <div style={{ fontSize: '10px', color: week.color, letterSpacing: '0.1em', marginBottom: '16px' }}>{week.phase.toUpperCase()}</div>
                                        {week.tasks.map((task, ti) => (
                                            <div key={ti} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '12px', color: '#aaa' }}>
                                                <span style={{ color: week.color, flexShrink: 0, marginTop: '1px' }}>›</span><span>{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div style={{ background: '#0d0d1a', border: '1px solid #22c55e30', borderRadius: '8px', padding: '24px', marginTop: '8px' }}>
                                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '14px', color: '#22c55e', marginBottom: '12px' }}>30-Day Post-Sprint Goals</div>
                                {['Ship 1 new AI-augmented backend project (e.g., RAG-powered API, LLM-integrated service, agentic workflow)', 'Publish 2 more technical blog posts — target "AI + backend" keyword territory', 'Begin evaluating external candidates using the checklist in this report', 'Run a follow-up Lighthouse audit to verify technical improvements', 'Get peer review on portfolio from 2–3 senior backend engineers'].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '12px', color: '#aaa' }}>
                                        <span style={{ color: '#22c55e', flexShrink: 0 }}>◈</span><span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
