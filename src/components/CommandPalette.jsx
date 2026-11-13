import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Calculator, CornerDownLeft, FileText, Home, Mail, Moon, Search, Sun, User, Wrench } from 'lucide-react'
import { WhatsappIcon } from './ui/Icons'
import { projects } from '../data/projects'
import { profile } from '../data/site'
import { useTheme } from '../lib/hooks'

// Ctrl / ⌘ + K: jump to any page or project, or run a quick action, from the keyboard.
// Opened from the search button in the header too. A proper dialog: focus is trapped in the
// input, arrow keys move through the list, Enter runs, Escape closes and restores focus.
export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const [theme, toggleTheme] = useTheme()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const input = useRef(null)
  const list = useRef(null)
  const opener = useRef(null)

  const items = useMemo(() => {
    const go = (to) => () => navigate(to)
    const out = (href) => () => window.open(href, '_blank', 'noopener')
    return [
      { group: 'Pages', label: 'Home', icon: Home, run: go('/') },
      { group: 'Pages', label: 'Work', hint: `${projects.length} projects`, icon: ArrowUpRight, run: go('/work') },
      { group: 'Pages', label: 'Services & pricing', icon: Wrench, run: go('/services') },
      { group: 'Pages', label: 'Rough estimate', icon: Calculator, run: go('/services#estimate') },
      { group: 'Pages', label: 'About', icon: User, run: go('/about') },
      { group: 'Pages', label: 'Contact', icon: Mail, run: go('/contact') },
      ...projects.map((p) => ({ group: 'Projects', label: p.title, hint: p.tagline, icon: ArrowUpRight, run: go(`/work/${p.id}`) })),
      { group: 'Actions', label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme', icon: theme === 'dark' ? Sun : Moon, run: toggleTheme },
      { group: 'Actions', label: 'Message on WhatsApp', icon: WhatsappIcon, run: out(`https://wa.me/${profile.whatsapp}`) },
      { group: 'Actions', label: 'Send an email', hint: profile.email, icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { group: 'Actions', label: 'Open the CV', icon: FileText, run: out(profile.resume) },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const q = query.trim().toLowerCase()
  const shown = q ? items.filter((it) => `${it.label} ${it.hint || ''} ${it.group}`.toLowerCase().includes(q)) : items

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    if (!open) return
    opener.current = document.activeElement
    setQuery('')
    const behind = document.querySelectorAll('.route, .footer, header.nav, [data-behind-menu]')
    behind.forEach((el) => el.setAttribute('inert', ''))
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => input.current?.focus())
    return () => {
      behind.forEach((el) => el.removeAttribute('inert'))
      document.body.style.overflow = ''
      opener.current?.focus?.()
    }
  }, [open])

  // Keep the highlighted row in view.
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [index, open])

  const run = (it) => {
    onClose()
    it?.run()
  }

  const onKey = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % Math.max(1, shown.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i - 1 + shown.length) % Math.max(1, shown.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(shown[index])
    } else if (e.key === 'Tab') e.preventDefault() // focus stays in the field; arrows move the list
  }

  let lastGroup = null
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="cmdk"
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cmdk-field">
              <Search size={18} aria-hidden="true" />
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder="Jump to a page, a project or an action…"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={shown[index] ? `cmdk-${index}` : undefined}
                aria-label="Search pages, projects and actions"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="cmdk-list" id="cmdk-list" role="listbox" aria-label="Results" ref={list}>
              {shown.length === 0 && <li className="cmdk-empty">Nothing matches “{query}”.</li>}
              {shown.map((it, i) => {
                const head = it.group !== lastGroup ? it.group : null
                lastGroup = it.group
                const Icon = it.icon
                return (
                  <li key={it.group + it.label} role="presentation">
                    {head && <p className="cmdk-group mono">{head}</p>}
                    <div
                      id={`cmdk-${i}`}
                      role="option"
                      aria-selected={i === index}
                      className="cmdk-item"
                      onMouseEnter={() => setIndex(i)}
                      onClick={() => run(it)}
                    >
                      <span className="cmdk-icon">
                        <Icon size={16} width={16} height={16} />
                      </span>
                      <span className="cmdk-label">{it.label}</span>
                      {it.hint && <span className="cmdk-hint">{it.hint}</span>}
                      <CornerDownLeft size={14} className="cmdk-enter" aria-hidden="true" />
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="cmdk-foot mono">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> move
              </span>
              <span>
                <kbd>↵</kbd> open
              </span>
              <span>{shown.length} results</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
