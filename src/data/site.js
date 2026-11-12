// Everything personal lives here, so updating the site never means hunting through components.
export const profile = {
  name: 'Pragnesh Kalotara',
  short: 'Pragnesh',
  city: 'Ahmedabad, India',
  timezone: 'Asia/Kolkata',
  yearsExperience: '3.8',
  email: 'pkb110201@gmail.com',
  phone: '+91 74360 61528',
  phoneHref: 'tel:+917436061528',
  // WhatsApp uses the same number. Change it here if you use a different one.
  whatsapp: '917436061528',
  github: 'https://github.com/rabari1102',
  linkedin: 'https://www.linkedin.com/in/pragnesh-kalotara-23870116a',
  resume: 'https://drive.google.com/file/d/1_IHmO_vryoPm7FxL2Gb22nzxygXhOrw9/view?usp=sharing',
  // Shown in the nav and hero. Keep it honest, update it when your calendar fills up.
  availability: 'Taking 2 new projects for December',
  available: true,
  // Optional: a real photo of you (put the file in /public and set e.g. '/pragnesh.jpg').
  // A face is the single strongest trust signal on a freelancer site. Leave '' to hide it.
  photo: '',
}

export const heroFacts = [
  { value: '13', label: 'products shipped across web, mobile & desktop' },
  { value: '3.8 yrs', label: 'building production software, team lead since 2025' },
  { value: '30 / 40 / 30', label: 'paid in three milestones, never all upfront' },
]

// The three promises under the hero buttons. Each one is repeated, with detail, further down the page.
export const heroPromises = ['Fixed quote, in writing', 'Pay in 3 milestones', 'Code in your GitHub from day one']

export const marqueeWords = [
  'React', 'Next.js', 'Node.js', 'NestJS', 'TypeScript', 'Kotlin', 'Jetpack Compose', 'Electron',
  'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Drizzle', 'Socket.io', 'MQTT', 'Three.js',
  'GSAP', 'Docker', 'AWS', 'Vercel', 'Razorpay', 'Twilio', 'OpenAI', 'Gemini', 'Claude',
]

// ── "Don't trust me. Verify me." ─────────────────────────────────────────────
// Things a stranger can check on their own, without taking my word for anything.
// `href` values are filled from `profile` in the component (by `key`).
export const verifyChecks = [
  {
    key: 'linkedin',
    title: 'My work history, with dates',
    text: 'Four companies since January 2023, the last two as team lead. Colleagues and employers are right there to ask.',
    cta: 'Open LinkedIn',
  },
  {
    key: 'github',
    title: 'My code, in public',
    text: 'A real GitHub profile you can browse: repositories, commits, activity.',
    cta: 'Open GitHub',
  },
  {
    key: 'resume',
    title: 'My CV, unedited',
    text: 'Roles, dates and projects on one page. Compare it with what you read here.',
    cta: 'Read the CV',
  },
  {
    key: 'phone',
    title: 'A phone number that I answer',
    text: 'Call or WhatsApp. Same number, same person, no call centre in between.',
    cta: 'Call or WhatsApp',
  },
  {
    key: 'call',
    title: 'My face, before any money',
    text: 'The first 30 minutes are a free video call. You see who you are hiring and I walk you through a product I have shipped.',
    cta: 'Ask for a call',
  },
]

// How the client is protected once work starts. Every line here is a promise made elsewhere on
// the site too (process, payment split, FAQ), so keep them in sync if you change one.
export const protections = [
  {
    icon: 'split',
    title: 'Never 100% upfront',
    text: '30% to start, 40% at the halfway demo, 30% on launch. You only pay the next part after you have seen the last one working.',
  },
  {
    icon: 'git',
    title: 'Code in your GitHub from day one',
    text: 'Every commit lands in a repository you own. If I vanished tomorrow, another developer could open the README and carry on.',
  },
  {
    icon: 'key',
    title: 'Every account in your name',
    text: 'Servers, domain, Play Store, payment gateway. I work inside your accounts, I never hold your product hostage.',
  },
  {
    icon: 'demo',
    title: 'A live link, every week',
    text: 'You click through real, working software each week. No slides, no "it works on my machine".',
  },
  {
    icon: 'doc',
    title: 'A fixed quote, in writing',
    text: 'Scope, screens, price and dates on paper within 48 hours of our call. No hourly meter running in the background.',
  },
  {
    icon: 'fix',
    title: '30 days of free fixes',
    text: 'Anything that breaks in the first month after launch is on me.',
  },
]

// Real client words only. Add entries like the commented example and the section appears by itself.
// Never invent these: one made-up quote costs more trust than an empty wall.
export const testimonials = [
  // { quote: '…', name: 'Full name', role: 'Principal, XYZ School', project: 'vidyalay', link: 'https://…' },
]
