// Generates public/sitemap.xml from the project data so the two never drift.
// Runs automatically before `vite build` (see package.json).
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const SITE = 'https://thepragnesh.in'

// Import the data module directly so new projects appear in the sitemap automatically.
const { projects } = await import(pathToFileURL(resolve(root, 'src/data/projects.js')).href)

const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
  ...projects.map((p) => ({ loc: `${SITE}/work/${p.id}`, priority: '0.8', changefreq: 'monthly' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${urls.length} URLs`)
