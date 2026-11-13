// Generates public/sitemap.xml from the route list, so the two can never drift apart.
// Runs automatically before `vite build` (see package.json).
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, allPaths, metaFor } from '../src/seo/routes.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths()
  .map((path) => {
    const m = metaFor(path)
    return `  <url>
    <loc>${SITE}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${m.changefreq}</changefreq>
    <priority>${m.priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>
`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${allPaths().length} URLs`)
