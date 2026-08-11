import Reveal from './ui/Reveal'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="container">
        <Reveal direction="up" className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-brand-title font-heading">
              PRAGNESH <span>KALOTARA</span>
            </div>
            <div className="footer-brand-tag">
              Senior Backend Engineer · Full-Stack Developer · AI-Augmented Developer
            </div>
          </div>

          <div className="footer-links-col">
            <a href="https://github.com/rabari1102" target="_blank" rel="noopener noreferrer" data-cursor="GITHUB ↗">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/pragnesh-kalotara-23870116a" target="_blank" rel="noopener noreferrer" data-cursor="LINKEDIN ↗">LinkedIn ↗</a>
            <a href="mailto:pkb110201@gmail.com" data-cursor="EMAIL">Email ↗</a>
            <a href="https://drive.google.com/file/d/1_IHmO_vryoPm7FxL2Gb22nzxygXhOrw9/view?usp=sharing" target="_blank" rel="noopener noreferrer" data-cursor="RESUME ↗">Resume ↗</a>
          </div>

          <div className="footer-copy-col">
            <span>© {currentYear} Pragnesh Kalotara. All rights reserved.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
