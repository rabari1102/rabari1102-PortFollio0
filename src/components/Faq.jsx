import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHead from './ui/SectionHead'
import Reveal from './ui/Reveal'
import { faqs } from '../data/services'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <SectionHead
          num="09"
          label="Questions"
          title={'Fair *questions.*'}
          intro="The things clients usually ask on the first call, including the awkward ones. If yours is not here, just ask."
        />
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} className={`faq-item ${isOpen ? 'is-open' : ''}`} delay={i * 0.04} y={18}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}>
                  <span className="faq-n mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="faq-icon">
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
