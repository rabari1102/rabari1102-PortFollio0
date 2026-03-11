import { Fragment } from 'react'

export default function AiMastery() {
    const tools = [
        { cls: 'chatgpt', logo: '🟢', name: 'ChatGPT Pro', maker: 'OpenAI · Pro Plan', desc: 'Primary AI for code debugging, architecture design & technical docs.', uses: ['Code Review', 'Debugging', 'Documentation', 'Architecture'] },
        { cls: 'gemini', logo: '🔵', name: 'Gemini Pro', maker: 'Google · Pro Plan', desc: 'Multimodal analysis, large context understanding & API integration.', uses: ['Research', 'API Integration', 'Large Context', 'Planning'] },
        { cls: 'claude', logo: '🟠', name: 'Claude', maker: 'Anthropic', desc: 'Go-to for nuanced code analysis, refactoring & careful reasoning.', uses: ['Refactoring', 'Analysis', 'Long Context', 'Writing'] },
        { cls: 'cursor', logo: '⚫', name: 'Cursor AI', maker: 'Anysphere · IDE', desc: 'AI-first code editor for intelligent autocomplete & multi-file edits.', uses: ['Autocomplete', 'Multi-file Edits', 'Codebase Chat', 'Refactor'] },
        { cls: 'copilot', logo: '🔮', name: 'GitHub Copilot', maker: 'GitHub · Microsoft', desc: 'Always-on pair programmer for boilerplate, tests & inline suggestions.', uses: ['Inline Suggest', 'Test Gen', 'Boilerplate', 'Comments'] },
        { cls: 'v0', logo: '🟡', name: 'v0 by Vercel', maker: 'Vercel · UI Generation', desc: 'Generates production-ready React + Tailwind UI components in seconds.', uses: ['UI Prototyping', 'React Gen', 'Design → Code', 'Rapid MVP'] },
    ]
    const workflow = [
        { icon: '💡', label: 'Ideation', sub: 'ChatGPT + Gemini' },
        { icon: '🏗️', label: 'Architecture', sub: 'Claude + ChatGPT' },
        { icon: '⌨️', label: 'Coding', sub: 'Cursor + Copilot' },
        { icon: '🐛', label: 'Debug & Review', sub: 'Claude + ChatGPT' },
        { icon: '📄', label: 'Docs & Deploy', sub: 'Gemini + ChatGPT' },
    ]
    const integrations = [
        { cls: 'card-a', num: '01 / PRODUCTION', title: 'AI Camera Streaming Backend', desc: 'Built the backend for Telep-AI — a real-time AI inference pipeline using RTSP/GStreamer streams piped into an AI model. Reduced warning response time by 50% with async Node.js processing.', tool: '🎥 Telep-AI · Electron.js + Node.js' },
        { cls: 'card-b', num: '02 / INTEGRATION', title: 'AI Consultant API (This Portfolio!)', desc: "Integrated Gemini API as a serverless Vercel function to power this portfolio's AI Consultant feature — demonstrating real production API integration with rate limiting and error handling.", tool: '🤖 Gemini API · Vercel Serverless' },
        { cls: 'card-c', num: '03 / WORKFLOW', title: 'AI-Assisted Code Reviews', desc: "As Team Lead at Qfact, standardized AI-assisted PR reviews using ChatGPT + Claude to catch bugs, suggest patterns, and maintain code quality across a 6-person team — boosted velocity by 25%.", tool: '👥 ChatGPT + Claude · Team Workflow' },
        { cls: 'card-d', num: '04 / SKILLS', title: 'Prompt Engineering for Developers', desc: 'Deep knowledge of prompt crafting for technical tasks — few-shot examples, chain-of-thought for architecture problems, system prompts for specialized AI assistants, and RAG pattern understanding.', tool: '🧠 Advanced Prompting · All Major LLMs' },
    ]

    return (
        <section id="ai-mastery">
            <div className="container">
                <div className="reveal ai-mastery-intro">
                    <div className="ai-mastery-badge">🤖 AI-AUGMENTED DEVELOPER</div>
                    <div className="ai-mastery-title">I Don't Just Write Code.<br />I Work With AI to Build Better.</div>
                    <div className="ai-mastery-sub">In 2026, the best engineers leverage AI to move faster and think deeper. Here's my daily AI stack and how I integrate it into every part of my workflow.</div>
                </div>

                <div className="ai-workflow-title" style={{ marginBottom: '18px', textAlign: 'left' }}>⚡ DAILY AI STACK</div>
                <div className="ai-tools-grid reveal">
                    {tools.map(t => (
                        <div key={t.name} className={`ai-tool-card ${t.cls}`}>
                            <div className="ai-tool-logo">{t.logo}</div>
                            <div className="ai-tool-name">{t.name}</div>
                            <div className="ai-tool-maker">{t.maker}</div>
                            <div className="ai-tool-desc">{t.desc}</div>
                            <div className="ai-tool-uses">{t.uses.map(u => <span key={u} className="ai-use-chip">{u}</span>)}</div>
                        </div>
                    ))}
                </div>

                <div className="reveal" style={{ margin: '50px 0 30px' }}>
                    <div className="ai-workflow-title">⚡ My AI-Augmented Development Workflow</div>
                    <div className="ai-workflow">
                        {workflow.map((w, i) => (
                            <Fragment key={w.label}>
                                <div className="ai-wf-step">
                                    <div className="ai-wf-step-icon">{w.icon}</div>
                                    <div className="ai-wf-step-label">{w.label}</div>
                                    <div className="ai-wf-step-sub">{w.sub}</div>
                                </div>
                                {i < workflow.length - 1 && <div className="ai-wf-arrow">→</div>}
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="reveal">
                    <div className="ai-workflow-title" style={{ marginBottom: '24px' }}>🔌 AI INTEGRATIONS I'VE BUILT</div>
                    <div className="ai-integrations">
                        {integrations.map(int => (
                            <div key={int.num} className={`ai-int-card ${int.cls}`}>
                                <div className="ai-int-num">{int.num}</div>
                                <div className="ai-int-title">{int.title}</div>
                                <div className="ai-int-desc">{int.desc}</div>
                                <div className="ai-int-tool">{int.tool}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="reveal" style={{ marginTop: '50px' }}>
                    <div className="ai-workflow-title" style={{ textAlign: 'left', marginBottom: '20px' }}>💼 HOW I WORK WITH AI</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                        <ul className="how-i-work">
                            <li>I clarify SLAs and data volume targets <em>before</em> choosing architecture — AI helps me model edge cases early.</li>
                            <li>I use Claude/ChatGPT to run AI-assisted PR reviews across my team, catching bugs before they hit production.</li>
                            <li>I design for observability from day one — AI helps me write structured logging templates fast.</li>
                        </ul>
                        <ul className="how-i-work">
                            <li>I use AI to speed up experiments and prototypes, but I never skip code reviews or tests.</li>
                            <li>I integrate AI APIs directly in production apps (Gemini powers the consultant feature on this very page).</li>
                            <li>I prompt-engineer for technical tasks: few-shot, chain-of-thought, and system prompts for specialized AI assistants.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
