import { motion } from 'framer-motion'

export default function TextReveal({ text, className = '', mode = 'words', delay = 0, as: Tag = 'h2' }) {
  if (!text) return null

  if (mode === 'chars') {
    const characters = text.split('')
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.035,
          delayChildren: delay
        }
      }
    }
    const charVariants = {
      hidden: { opacity: 0, y: 40, rotateX: 60 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }

    return (
      <Tag className={`text-reveal-wrap ${className}`}>
        <motion.span
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          style={{ display: 'inline-block' }}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  // Word-by-word reveal mode
  const words = text.split(' ')
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay
      }
    }
  }
  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <Tag className={`text-reveal-wrap ${className}`}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{ display: 'inline-block' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.28em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}
