import { motion } from 'framer-motion'

// A headline that rises into place word by word from behind a mask.
// Wrap a word in *asterisks* to set it in the serif-italic ember accent:
//   <Kinetic text="Things I've *actually* shipped." />
// Screen readers get the plain sentence through aria-label; the animated spans are hidden from them.

const EASE = [0.22, 1, 0.36, 1]

export const plain = (text) => text.replace(/\*/g, '').replace(/\n/g, ' ')

export default function Kinetic({ text, as = 'h2', className = '', delay = 0, stagger = 0.06, play, once = true }) {
  const Tag = motion[as]
  const lines = text.split('\n')
  let n = 0

  // `play` (true/false) drives it by hand; left undefined, it plays when scrolled into view.
  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once, margin: '-12% 0px -8% 0px' } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={`kinetic ${className}`} aria-label={plain(text)} {...trigger}>
      {lines.map((line, li) => (
        <span className="k-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, all) => {
            const accent = /^\*.+\*[.,!?]?$/.test(word)
            const i = n++
            return [
              <span className="k-word" key={wi}>
                <motion.span
                  className={`k-in ${accent ? 'is-accent' : ''}`}
                  variants={{
                    hidden: { y: '112%', rotate: 5 },
                    show: { y: '0%', rotate: 0, transition: { delay: delay + i * stagger, duration: 0.95, ease: EASE } },
                  }}
                >
                  {accent ? <em>{word.replace(/\*/g, '')}</em> : word}
                </motion.span>
              </span>,
              wi < all.length - 1 ? ' ' : null,
            ]
          })}
        </span>
      ))}
    </Tag>
  )
}
