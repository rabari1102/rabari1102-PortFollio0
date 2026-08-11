import { useState } from 'react'
import { skillCategories, allSkillsList } from '../data/skills'
import Reveal from './ui/Reveal'

export default function Skills() {
  const [activeCat, setActiveCat] = useState(skillCategories[0].id)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const selectedCategory = skillCategories.find((c) => c.id === activeCat) || skillCategories[0]

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <Reveal direction="up" className="sec-header-center">
          <span className="sec-label">TECHNICAL MATRIX</span>
          <h2 className="sec-title">Skills & Proficiency</h2>
          <div className="sec-divider"></div>
        </Reveal>

        {/* Skill Category Tabs */}
        <Reveal direction="up" delay={0.1} className="skills-tab-row">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-tab-btn ${activeCat === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
              data-cursor="SELECT"
            >
              {cat.name}
            </button>
          ))}
        </Reveal>

        {/* Selected Category Skill Matrix */}
        <Reveal direction="up" delay={0.2} className="skills-matrix-card card-spotlight">
          <div className="matrix-header">
            <h3 className="matrix-cat-title">{selectedCategory.name}</h3>
            <div className="matrix-cat-sub">// {selectedCategory.sub}</div>
          </div>

          <div className="matrix-bars-grid">
            {selectedCategory.skills.map((skill) => (
              <div
                key={skill.name}
                className={`skill-item-card ${hoveredSkill === skill.name ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="item-header">
                  <span className="item-name">{skill.name}</span>
                  <span className="item-badge">{skill.level} · {skill.pct}%</span>
                </div>
                <div className="item-bar-track">
                  <div
                    className="item-bar-fill"
                    style={{ width: `${skill.pct}%` }}
                  ></div>
                </div>
                <p className="item-desc">{skill.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Complete Technology Arsenal Field */}
        <Reveal direction="up" delay={0.3} className="skills-field-card card-spotlight">
          <h3 className="field-title">Complete Production Arsenal</h3>
          <div className="field-sub">// All tools, databases, protocols & cloud services deployed in production</div>
          <div className="field-tags-wrap">
            {allSkillsList.map((skill) => (
              <span
                key={skill}
                className="interactive-tag"
                data-cursor="TECH"
              >
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
