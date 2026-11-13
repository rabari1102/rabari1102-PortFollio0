import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { OG_IMAGE, canonical, jsonLd, metaFor } from '../seo/routes'

// Keeps <head> in step with the URL during in-app navigation. On a fresh page load the right
// tags are already in the HTML (the build writes them, see scripts/prerender.mjs); this only
// has work to do after the visitor clicks a link.
function meta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const m = metaFor(pathname)
    const url = canonical(m)
    document.title = m.title
    meta('name', 'description', m.description)
    meta('name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')

    let link = document.head.querySelector('link[rel="canonical"]')
    if (m.noindex) link?.remove()
    else {
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', url)
    }

    meta('property', 'og:title', m.title)
    meta('property', 'og:description', m.description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', OG_IMAGE)
    meta('name', 'twitter:title', m.title)
    meta('name', 'twitter:description', m.description)

    const ld = document.head.querySelector('script[type="application/ld+json"]')
    if (ld) ld.textContent = JSON.stringify(jsonLd(m))
  }, [pathname])

  return null
}
