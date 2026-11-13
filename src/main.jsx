import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Tells the safety net in index.html that the app is alive.
window.__app = true

const container = document.getElementById('root')
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// Production pages arrive as real HTML (see scripts/prerender.mjs), so React attaches to what is
// already on screen. In `npm run dev` the root is empty and React renders from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
