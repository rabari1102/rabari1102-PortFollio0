// One source of truth for every URL on the site: its title, description, breadcrumb trail and
// structured data. The browser uses it (components/Seo.jsx), the build uses it to write each
// page's <head> into real HTML (scripts/prerender.mjs), and the sitemap is generated from it.
// Plain JavaScript on purpose, so Node scripts can import it directly.
import { getProject, projects } from '../data/projects.js'
import { profile } from '../data/site.js'

export const SITE = 'https://thepragnesh.in'
export const OG_IMAGE = `${SITE}/og.jpg`
export const NAME = profile.name

const pages = {
  '/': {
    title: `${NAME} | Freelance Full-Stack & Backend Developer`,
    description:
      'Freelance full-stack developer in Ahmedabad, India. I build web apps, SaaS, Android apps, desktop software and backend APIs, end to end. See 16 shipped products.',
    type: 'WebPage',
    crumb: 'Home',
    priority: '1.0',
    changefreq: 'weekly',
  },
  '/work': {
    title: `Work: ${projects.length} shipped products | ${NAME}`,
    description:
      'Case studies from 16 shipped products: school and hospital software, fleet tracking, a paid marketplace, pharmacy billing, bank automation and IoT telemetry.',
    type: 'CollectionPage',
    crumb: 'Work',
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/services': {
    title: `Services & pricing | ${NAME}`,
    description:
      'What I build and what it costs: web apps and SaaS, Android apps, Windows desktop software, websites, APIs and automation. Starting prices and a rough estimate.',
    type: 'WebPage',
    crumb: 'Services',
    priority: '0.9',
    changefreq: 'monthly',
  },
  '/about': {
    title: `About ${NAME}: full-stack developer in Ahmedabad`,
    description:
      'Who I am and how I work: 3.8 years building production software, team lead since 2025, backend at the core. My experience, my toolbox and how AI fits into my work.',
    type: 'ProfilePage',
    crumb: 'About',
    priority: '0.7',
    changefreq: 'monthly',
  },
  '/contact': {
    title: `Contact: discuss your project | ${NAME}`,
    description:
      'Tell me what you want to build. Send a short brief, email me or message me on WhatsApp. The first call is free and you get a fixed written quote after it.',
    type: 'ContactPage',
    crumb: 'Contact',
    priority: '0.8',
    changefreq: 'yearly',
  },
}

const platformLabel = { site: 'Website', web: 'Web app', desktop: 'Desktop app', phone: 'Mobile app', combo: 'Web + Android' }
const clip = (text, max = 158) => (text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '') + '…')
const normalise = (pathname) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname)

// Everything a page's <head> needs. Unknown URLs get a noindex "not found" entry.
export function metaFor(rawPath) {
  const path = normalise(rawPath.split(/[?#]/)[0] || '/')

  if (pages[path]) {
    const page = pages[path]
    return {
      ...page,
      path,
      found: true,
      crumbs:
        path === '/'
          ? []
          : [
              { name: 'Home', path: '/' },
              { name: page.crumb, path },
            ],
    }
  }

  const match = path.match(/^\/work\/([^/]+)$/)
  const project = match && getProject(match[1])
  if (project) {
    return {
      path,
      found: true,
      type: 'WebPage',
      project,
      title: `${project.title}: ${platformLabel[project.platform].toLowerCase()} case study | ${NAME}`,
      description: clip(`${project.tagline}. ${project.summary}`),
      priority: '0.8',
      changefreq: 'monthly',
      crumbs: [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: project.title, path },
      ],
    }
  }

  return {
    path,
    found: false,
    noindex: true,
    type: 'WebPage',
    title: `Page not found | ${NAME}`,
    description: 'This page does not exist. Head back home, or see the work.',
    crumbs: [],
  }
}

// Every indexable URL, in sitemap order.
export const allPaths = () => [...Object.keys(pages), ...projects.map((p) => `/work/${p.id}`)]

const abs = (path) => `${SITE}${path === '/' ? '/' : path}`
export const canonical = (meta) => abs(meta.path)

// schema.org JSON-LD for a page. Only facts that appear on the site itself.
export function jsonLd(meta) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#pragnesh`,
    name: NAME,
    url: `${SITE}/`,
    jobTitle: 'Freelance Full-Stack Developer',
    email: profile.email,
    telephone: profile.phoneHref.replace('tel:', ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', addressCountry: 'IN' },
    sameAs: [profile.linkedin, profile.github],
    knowsLanguage: ['en', 'hi', 'gu'],
    knowsAbout: [
      'Web application development',
      'SaaS',
      'Backend and API engineering',
      'Android app development',
      'Desktop software',
      'Node.js',
      'NestJS',
      'React',
      'Next.js',
      'Kotlin',
      'Electron',
      'PostgreSQL',
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: NAME,
    description: 'Freelance web, mobile, desktop and backend software from one senior engineer in Ahmedabad.',
    publisher: { '@id': person['@id'] },
    inLanguage: 'en',
  }

  const graph = [person, website]
  if (!meta.found) return { '@context': 'https://schema.org', '@graph': graph }

  const page = {
    '@type': meta.type,
    '@id': `${canonical(meta)}#page`,
    url: canonical(meta),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': website['@id'] },
    inLanguage: 'en',
  }
  if (meta.type === 'ProfilePage' || meta.type === 'ContactPage') page.mainEntity = { '@id': person['@id'] }
  else page.about = { '@id': person['@id'] }

  if (meta.crumbs.length) {
    const crumbs = {
      '@type': 'BreadcrumbList',
      '@id': `${canonical(meta)}#breadcrumb`,
      itemListElement: meta.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
    }
    page.breadcrumb = { '@id': crumbs['@id'] }
    graph.push(crumbs)
  }
  graph.push(page)

  if (meta.project) {
    const p = meta.project
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${canonical(meta)}#project`,
      name: p.title,
      headline: p.tagline,
      description: p.summary,
      url: canonical(meta),
      dateCreated: p.year,
      keywords: Object.values(p.stack).flat().join(', '),
      // Client work is credited to me alone; team work names me as a contributor.
      [p.kind === 'freelance' ? 'creator' : 'contributor']: { '@id': person['@id'] },
      mainEntityOfPage: { '@id': page['@id'] },
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

// The tags that differ from page to page, as an HTML string for the build to drop into <head>.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function headHtml(meta) {
  const url = canonical(meta)
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.project ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(NAME)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(NAME)}, freelance full-stack developer. I build software that turns ambitious ideas into real products." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(meta)).replace(/</g, '\\u003c')}</script>`,
  ]
  return lines.filter(Boolean).join('\n    ')
}
