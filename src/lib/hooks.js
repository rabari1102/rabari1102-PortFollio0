import { useEffect, useState, useSyncExternalStore } from 'react'

// Every hook here returns the same value on the server and on the first client render,
// then updates after mount. That keeps the prerendered HTML and the hydrated page identical.

// ── Media queries ────────────────────────────────────────────────────────────
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
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
// The theme lives on <html data-theme>. An inline script in index.html sets it before first
// paint: the visitor's saved choice if there is one, otherwise their system preference.
const THEME_COLOR = { dark: '#090e1a', light: '#f6f4ef' }
const themeListeners = new Set()
const readTheme = () => document.documentElement.dataset.theme || 'dark'

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
  themeListeners.forEach((fn) => fn())
}

export function setTheme(theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* private mode: the choice just does not persist */
  }
  applyTheme(theme)
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

  // Until the visitor picks a theme themselves, keep following the system setting live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const follow = () => {
      let saved = null
      try {
        saved = localStorage.getItem('theme')
      } catch {
        /* ignore */
      }
      if (saved !== 'light' && saved !== 'dark') applyTheme(mq.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', follow)
    return () => mq.removeEventListener('change', follow)
  }, [])

  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}

// ── Live clock in a given time zone ──────────────────────────────────────────
// null until mounted: a build-time clock would never match the visitor's.
export function useClock(timeZone) {
  const [clock, setClock] = useState(null)
  useEffect(() => {
    const read = () => {
      const now = new Date()
      return {
        time: new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone }).format(now),
        hour: Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone }).format(now)),
      }
    }
    setClock(read())
    const id = setInterval(() => setClock(read()), 20000)
    return () => clearInterval(id)
  }, [timeZone])
  return clock
}

// ── Has this component mounted in a browser yet? ─────────────────────────────
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
