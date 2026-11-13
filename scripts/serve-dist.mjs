// A tiny static server for dist/ that behaves like the production host (Vercel with clean URLs):
//   /work/tripkoz        → dist/work/tripkoz/index.html
//   /work/tripkoz/       → 308 redirect to /work/tripkoz
//   /anything-unknown    → dist/404.html with a real 404 status
// Text files are gzip-compressed, as any real host would do (Vercel uses Brotli, which is smaller still).
// `vite preview` cannot be used for this: it answers every unknown URL with index.html and 200.
// Used by `npm run preview` and by the end-to-end tests.
import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.env.PORT || process.argv[2] || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const compressible = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg'])
const gzipped = new Map() // path + modified time → compressed bytes (a rebuild is picked up at once)

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile()
  } catch {
    return false
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  let path = decodeURIComponent(url.pathname)

  if (path.length > 1 && path.endsWith('/')) {
    res.writeHead(308, { Location: path.slice(0, -1) + url.search })
    return res.end()
  }

  // Never serve anything outside dist/.
  const safe = normalize(path).replace(/^(\.\.[/\\])+/, '')
  const candidates = extname(safe) ? [join(dist, safe)] : [join(dist, safe, 'index.html'), join(dist, `${safe}.html`)]

  let file = null
  for (const c of candidates) {
    if (c.startsWith(dist) && (await isFile(c))) {
      file = c
      break
    }
  }

  const status = file ? 200 : 404
  file ??= join(dist, '404.html')
  const headers = {
    'Content-Type': types[extname(file)] || 'application/octet-stream',
    'Cache-Control': safe.startsWith('/assets/') && status === 200 ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    Vary: 'Accept-Encoding',
  }

  if (compressible.has(extname(file)) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    const key = `${file}:${(await stat(file)).mtimeMs}`
    if (!gzipped.has(key)) gzipped.set(key, gzipSync(await readFile(file)))
    const body = gzipped.get(key)
    res.writeHead(status, { ...headers, 'Content-Encoding': 'gzip', 'Content-Length': body.length })
    return res.end(body)
  }

  res.writeHead(status, headers)
  createReadStream(file).pipe(res)
}).listen(port, '127.0.0.1', () => console.log(`dist/ served at http://127.0.0.1:${port}`))
