import { useEffect, useState, useSyncExternalStore } from 'react'

// ── Media queries ────────────────────────────────────────────────────────────
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false))
  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])
  return matches
}

export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)')
// A real mouse or trackpad. Touch screens never get cursor effects.
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

// ── Theme ────────────────────────────────────────────────────────────────────
// The theme lives on <html data-theme>. index.html sets it before first paint.
const themeListeners = new Set()
const readTheme = () => document.documentElement.dataset.theme || 'dark'

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* private mode: the choice just does not persist */
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f1e8' : '#0c0b0a')
  themeListeners.forEach((fn) => fn())
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (fn) => {
      themeListeners.add(fn)
      return () => themeListeners.delete(fn)
    },
    readTheme,
    () => 'dark',
  )
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}

// ── Live clock in a given time zone ──────────────────────────────────────────
export function useClock(timeZone) {
  const read = () => {
    const now = new Date()
    return {
      time: new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone }).format(now),
      hour: Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone }).format(now)),
    }
  }
  const [clock, setClock] = useState(read)
  useEffect(() => {
    const id = setInterval(() => setClock(read()), 20000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])
  return clock
}
