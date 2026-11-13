import { motion } from 'framer-motion'
import SectionHead from './ui/SectionHead'
import { toolbox } from '../data/services'

export default function Toolbox({ num }) {
  return (
    <section className="section toolbox" id="stack">
      <div className="container">
        <SectionHead
          num={num}
          label="Technical expertise"
          title={'The right tool, *not* the trendy one.'}
          intro="I pick the stack for your budget and your team, not my CV. Everything here has gone to production."
        />
        <div className="tool-grid">
          {toolbox.map((g, gi) => (
            <motion.div
              key={g.group}
              className={`tool-group ${g.group.startsWith('AI') ? 'is-ai' : ''}`}
              data-rv
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ delay: (gi % 4) * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mono">
                <span>{String(gi + 1).padStart(2, '0')}</span> {g.group}
              </h3>
              <div className="chips">
                {g.items.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
