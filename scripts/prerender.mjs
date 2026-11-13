// Turns the single-page app into real pages.
//
// `vite build` produces one index.html with an empty <div id="root">. This script renders every
// URL of the site with React on the server and writes the result to dist/, so that:
//   - each page arrives as readable HTML, with its own title, description, canonical URL,
//     social-share tags and structured data (search engines and WhatsApp / LinkedIn previews
//     do not have to run JavaScript to see them),
//   - the main text is on screen before any script has loaded,
//   - a URL that does not exist gets dist/404.html, which hosts serve with a real 404 status.
//
// Runs as the last step of `npm run build`. The list of URLs comes from src/seo/routes.js.
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssr = resolve(root, 'dist-ssr')

const { render, allPaths, headHtml, metaFor } = await import(pathToFileURL(resolve(ssr, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html lost its <!--seo--> markers or its empty #root; prerender cannot fill it in.')
}

// The body font is needed for the very first paint, so ask for it early.
const assets = await readdir(resolve(dist, 'assets'))
const bodyFont = assets.find((f) => /^geist-latin-wght-normal-.+\.woff2$/.test(f))
const preload = bodyFont ? `\n    <link rel="preload" href="/assets/${bodyFont}" as="font" type="font/woff2" crossorigin />` : ''

function page(url) {
  const head = headHtml(metaFor(url)) + preload
  // Function replacers, so "$" in the rendered HTML is never read as a replacement pattern.
  return template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, () => head).replace('<div id="root"></div>', () => `<div id="root">${render(url)}</div>`)
}

const paths = allPaths()
for (const path of paths) {
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, path.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(path))
}

// Any URL that matches no route renders the "not found" page (noindex, no canonical).
await writeFile(resolve(dist, '404.html'), page('/404'))

await rm(ssr, { recursive: true, force: true })
console.log(`prerendered ${paths.length} pages + 404.html`)
