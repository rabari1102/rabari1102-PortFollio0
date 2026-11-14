// Everything personal lives here, so updating the site never means hunting through components.
export const profile = {
  name: 'Pragnesh Kalotara',
  short: 'Pragnesh',
  role: 'Freelance full-stack developer',
  city: 'Ahmedabad, India',
  timezone: 'Asia/Kolkata',
  languages: 'English, Hindi and Gujarati',
  yearsExperience: '3.8',
  email: 'pkb110201@gmail.com',
  phone: '+91 74360 61528',
  phoneHref: 'tel:+917436061528',
  // WhatsApp uses the same number. Change it here if you use a different one.
  whatsapp: '917436061528',
  github: 'https://github.com/rabari1102',
  linkedin: 'https://www.linkedin.com/in/pragnesh-kalotara-23870116a',
  resume: 'https://drive.google.com/file/d/1_IHmO_vryoPm7FxL2Gb22nzxygXhOrw9/view?usp=sharing',
  // Shown as a quiet note beside the contact form, and only while `available` is true.
  // Keep it honest: update it when your calendar fills up, or set `available` to false to hide it.
  availability: 'Taking 2 new projects for December',
  available: true,
  // Optional: a real photo of you (put the file in /public and set e.g. '/pragnesh.jpg').
  // A face is the single strongest trust signal on a freelancer site. Leave '' to hide it.
  photo: '',
}

// The hero. Wrap the accent words in *asterisks*; "\n" starts a new line on wide screens.
export const hero = {
  title: 'I turn ambitious\nideas into\n*real* *products.*',
  sub: 'Web applications, Android apps, desktop software and the backends behind them. I design, build and launch the whole product myself, so one person is accountable from the first call to the day it goes live.',
}

// The credibility strip under the hero. Every number here comes from the project and
// experience data below it in this folder. Only keep figures you can back up on a call.
export const heroFacts = [
  { value: '16', label: 'products shipped across web, mobile and desktop' },
  { value: '3.8 yrs', label: 'building production software, team lead since 2025' },
  { value: '6', label: 'developers led across backend, frontend and mobile' },
  { value: '5,000+', label: 'live IoT devices on a platform I architected' },
]

// The short biography. Plain facts only: who, what, how. Used on the home page and /about.
export const about = {
  lead: 'I am Pragnesh, a full-stack developer in Ahmedabad who builds the whole product, not one slice of it.',
  paragraphs: [
    'I have spent 3.8 years building production software inside product companies, as a team lead since 2025, and I build complete products for my own clients.',
    'My core is backend engineering: APIs, access control, real-time systems and the data behind them, mostly in Node.js, NestJS and PostgreSQL. Around that core I build the parts people actually touch: React and Next.js web apps, native Android apps in Kotlin, and Windows desktop software.',
    'Most of what I build is operations software, the system a school, a clinic, a pharmacy or a bank branch runs on every day. It has to be fast, hard to break and easy for non-technical staff to use.',
    'I work in the open. You get a fixed written quote, a live link every week and the code in your own GitHub from day one. I use AI tools to get through boilerplate faster, and I read every line before it ships.',
  ],
  facts: [
    { k: 'Based in', v: 'Ahmedabad, India (IST, UTC+5:30)' },
    { k: 'Works with', v: 'Clients in India and abroad' },
    { k: 'Languages', v: 'English, Hindi, Gujarati' },
    { k: 'Invoices in', v: 'INR, USD or EUR' },
  ],
}

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
