// Build-time only. scripts/prerender.mjs calls render() once per URL and writes the result to
// dist/, so every page ships as real HTML with its own <head>.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export { allPaths, headHtml, metaFor } from './seo/routes'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}
