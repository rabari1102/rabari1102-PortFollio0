import { articles } from '../data/articles'
import Reveal from './ui/Reveal'

export default function Articles() {
  return (
    <section id="articles" className="articles-section">
      <div className="container">
        <Reveal direction="up" className="sec-header-center">
          <span className="sec-label">THOUGHT LEADERSHIP</span>
          <h2 className="sec-title">Technical Insights</h2>
          <div className="sec-divider"></div>
        </Reveal>

        <div className="articles-editorial-list">
          {articles.map((art, idx) => (
            <Reveal key={art.id} direction="up" delay={idx * 0.12}>
              <a
                href={art.link}
                target="_blank"
                rel="noopener noreferrer"
                className="article-row card-spotlight"
                data-cursor="READ ARTICLE ↗"
              >
                <div className="article-meta-col">
                  <span className="article-category">{art.category}</span>
                  <span className="article-date">{art.date} · {art.readTime}</span>
                </div>

                <div className="article-main-col">
                  <h3 className="article-title">{art.title}</h3>
                  <p className="article-excerpt">{art.excerpt}</p>
                </div>

                <div className="article-arrow-col">
                  <span className="article-arrow">Read Article →</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
