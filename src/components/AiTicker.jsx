import { Fragment } from 'react'

const items = [
    ['ChatGPT Pro', 'Code Review & Debugging'], ['Gemini', 'Architecture Planning'],
    ['Claude', 'Documentation & Analysis'], ['Cursor AI', 'AI-Powered Coding'],
    ['GitHub Copilot', 'Inline Suggestions'], ['v0 by Vercel', 'UI Prototyping'],
    ['Prompt Engineering', 'Power User'], ['AI API Integration', 'Production-Ready'],
]

export default function AiTicker() {
    const doubled = [...items, ...items]
    return (
        <div className="ai-ticker-wrap">
            <div className="ai-ticker" id="ticker">
                {doubled.map(([tool, desc], i) => (
                    <Fragment key={i}>
                        <div className="ai-ticker-item"><span>{tool}</span> · {desc}</div>
                        <div className="ai-ticker-dot"></div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
