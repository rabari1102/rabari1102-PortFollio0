import { useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { useScrollReveal } from '../../lib/reveal'

// A headline that rises into place word by word from behind a mask.
// Wrap a word in *asterisks* to set it in the serif-italic accent:
//   <Kinetic text="Things I've *actually* shipped." />
// Screen readers get the plain sentence through aria-label; the animated spans are hidden from them.
//
// mode="scroll" (default) plays when scrolled into view. It is rendered visible and only
//   hidden-then-revealed if it starts below the screen (see lib/reveal.js).
// mode="css" plays as soon as the HTML is painted, with no JavaScript. Use it for the heading
//   at the top of a page, which is usually the largest thing on screen.

const EASE = [0.22, 1, 0.36, 1]

export const plain = (text) => text.replace(/\*/g, '').replace(/\n/g, ' ')

// letters: also wrap every character of the plain words in its own span (class "k-ch"), so an
//   effect can address single letters. Used by the hero's weight-reactive headline.
export default function Kinetic({ text, as = 'h2', className = '', mode = 'scroll', delay = 0, stagger = 0.05, letters = false }) {
  const ref = useRef(null)
  const controls = useAnimationControls()
  useScrollReveal(ref, controls, { hidden: 'hidden', shown: 'show', margin: '0px 0px -10% 0px' })

  const lines = text.split('\n')
  let n = 0

  const words = (render) =>
    lines.map((line, li) => (
      <span className="k-line" key={li} aria-hidden="true">
        {line.split(' ').map((word, wi, all) => {
          const accent = /^\*.+\*[.,!?]?$/.test(word)
          const i = n++
          const body = accent ? (
            <em>{word.replace(/\*/g, '')}</em>
          ) : letters ? (
            [...word].map((ch, ci) => (
              <span className="k-ch" key={ci}>
                {ch}
              </span>
            ))
          ) : (
            word
          )
          return [
            <span className="k-word" key={wi}>
              {render(body, i, accent)}
            </span>,
            wi < all.length - 1 ? ' ' : null,
          ]
        })}
        {/* A real space between lines, so copied or machine-read text does not run words together. */}
        {li < lines.length - 1 ? ' ' : null}
      </span>
    ))

  if (mode === 'css') {
    const Tag = as
    return (
      <Tag className={`kinetic is-css ${className}`} aria-label={plain(text)}>
        {words((body, i, accent) => (
          <span className={`k-in ${accent ? 'is-accent' : ''}`} style={{ '--i': i }}>
            {body}
          </span>
        ))}
      </Tag>
    )
  }

  const Tag = motion[as]
  return (
    <Tag ref={ref} className={`kinetic ${className}`} aria-label={plain(text)} initial={false} animate={controls}>
      {words((body, i, accent) => (
        <motion.span
          className={`k-in ${accent ? 'is-accent' : ''}`}
          variants={{
            hidden: { y: '112%' },
            show: { y: '0%', transition: { delay: delay + i * stagger, duration: 0.55, ease: EASE } },
          }}
        >
          {body}
        </motion.span>
      ))}
    </Tag>
  )
}
