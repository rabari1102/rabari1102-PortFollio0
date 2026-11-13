import { Suspense } from 'react'

// Wraps a section so React attaches to it separately from the rest of the page.
//
// The HTML for every section is already on screen (the pages are prerendered). Without this,
// React wakes the whole page up in one long, uninterruptible task. Inside a Suspense boundary it
// does each section on its own, at lower priority and in small slices, and starts with the one
// the visitor touches first. The page becomes responsive sooner; nothing looks different.
export default function Island({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>
}
