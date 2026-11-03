import { motion } from 'framer-motion'
import SectionHead from './ui/SectionHead'
import { toolbox } from '../data/services'

export default function Toolbox() {
  return (
    <section className="section toolbox" id="stack">
      <div className="container">
        <SectionHead
          num="06"
          label="Toolbox"
          title={
            <>
              The right tool, <em>not</em> the trendy one.
            </>
          }
          intro="I pick the stack for your budget and your team, not my CV. Everything here has gone to production."
        />
        <div className="tool-grid">
          {toolbox.map((g, gi) => (
            <motion.div
              key={g.group}
              className={`tool-group ${g.group.startsWith('AI') ? 'is-ai' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: (gi % 4) * 0.07, duration: 0.6 }}
            >
              <h3 className="mono">{g.group}</h3>
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
