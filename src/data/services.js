// Prices are starting points in INR. Change them here and the whole site follows.
export const services = [
  {
    id: 'web',
    title: 'Web apps & SaaS',
    blurb: 'Dashboards, portals, booking systems, CRMs, multi-tenant SaaS with subscriptions and payments.',
    stack: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Razorpay / Stripe'],
    from: 60000,
    weeks: '4–8',
    examples: ['tripkoz', 'vidyalay', 'aarav-hospital'],
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    blurb: 'Native Android apps with Kotlin & Compose, or one cross-platform app for Android and iOS.',
    stack: ['Kotlin', 'Jetpack Compose', 'React Native', 'Firebase / FCM', 'Google Maps'],
    from: 80000,
    weeks: '6–10',
    examples: ['tripkoz', 'vidyalay'],
  },
  {
    id: 'desktop',
    title: 'Desktop software',
    blurb: 'Windows apps for shops, clinics and offices: billing, stock, automation. Works offline, installs in a click.',
    stack: ['Electron', 'Java', 'SQLite / PostgreSQL', 'Auto-update'],
    from: 50000,
    weeks: '4–8',
    examples: ['pharmadesk', 'genzkrp'],
  },
  {
    id: 'website',
    title: 'Business websites',
    blurb: 'Fast, good-looking sites that rank on Google: from a 5-page company site to 3D product showcases.',
    stack: ['Next.js', 'Three.js', 'GSAP', 'SEO', 'CMS'],
    from: 15000,
    weeks: '1–3',
    examples: ['allmarc'],
  },
  {
    id: 'backend',
    title: 'APIs & backend',
    blurb: 'The engine behind your app: APIs, auth, roles, queues, real-time, third-party integrations.',
    stack: ['Node.js', 'NestJS', 'Redis', 'BullMQ', 'Socket.io / MQTT'],
    from: 40000,
    weeks: '3–6',
    examples: ['besecure', 'qfact', 'telep-eco'],
  },
  {
    id: 'ai',
    title: 'AI features & automation',
    blurb: 'Chatbots on your own data, document reading, smart search, and scripts that kill repetitive work.',
    stack: ['OpenAI', 'Gemini', 'Claude', 'RAG', 'Python / Node'],
    from: 25000,
    weeks: '1–4',
    examples: ['genzkrp', 'telep-ai'],
  },
]

// The "why is it cheaper" receipt. Agency lines are illustrative of a typical mid-size agency quote.
export const receipt = {
  agency: [
    { item: 'Office rent & electricity', amount: 45000 },
    { item: 'Sales team & commissions', amount: 40000 },
    { item: 'Project manager', amount: 55000 },
    { item: 'Account manager', amount: 30000 },
    { item: 'Junior developers (learning on your project)', amount: 100000 },
    { item: 'Senior review', amount: 50000 },
    { item: 'Agency margin', amount: 60000 },
  ],
  mine: [
    { item: 'Home studio (no rent)', amount: 0 },
    { item: 'You talk to the developer directly', amount: 0 },
    { item: 'AI pair-programmer for boilerplate & tests', amount: 6000 },
    { item: 'Senior developer, start to finish', amount: 150000 },
  ],
}

export const aiHonesty = {
  does: [
    'Boilerplate: forms, CRUD screens, API wiring',
    'First drafts of tests and documentation',
    'Searching big codebases and explaining old code',
    'Turning a design into a first layout',
  ],
  doesnt: [
    'Decide your architecture or database design',
    'Handle security, payments or roles without review',
    'Ship code I have not read line by line',
    'Talk to you. You always get me.',
  ],
}

// Estimator. Numbers are deliberately rough; the real quote comes after a call.
export const estimator = {
  types: [
    { id: 'website', label: 'Website', base: 15000, weeks: 1.5 },
    { id: 'web', label: 'Web app / SaaS', base: 60000, weeks: 5 },
    { id: 'mobile', label: 'Mobile app', base: 80000, weeks: 7 },
    { id: 'desktop', label: 'Desktop software', base: 50000, weeks: 5 },
    { id: 'backend', label: 'API / backend', base: 40000, weeks: 4 },
  ],
  sizes: [
    { id: 's', label: 'Small', hint: '3–5 screens', mult: 1 },
    { id: 'm', label: 'Medium', hint: '6–15 screens', mult: 1.8 },
    { id: 'l', label: 'Large', hint: '15+ screens', mult: 3 },
  ],
  extras: [
    { id: 'auth', label: 'Login & user roles', cost: 8000, weeks: 0.5 },
    { id: 'payments', label: 'Online payments', cost: 12000, weeks: 0.5 },
    { id: 'admin', label: 'Admin dashboard', cost: 20000, weeks: 1.5 },
    { id: 'realtime', label: 'Live tracking / chat', cost: 18000, weeks: 1 },
    { id: 'ai', label: 'AI feature', cost: 20000, weeks: 1 },
    { id: 'both', label: 'Android + iOS', cost: 35000, weeks: 2, only: 'mobile' },
    { id: 'multi', label: 'Multi-language', cost: 8000, weeks: 0.5 },
  ],
  // A typical agency multiplier on the same scope.
  agencyMultiplier: 2.3,
}

export const process = [
  {
    step: 'Free call',
    time: 'Day 0',
    text: '30 minutes on Google Meet or WhatsApp. You explain the idea in your own words, I ask the awkward questions.',
  },
  {
    step: 'Fixed quote',
    time: 'Within 48 hours',
    text: 'A written scope with screens, features, price and dates. No hourly meter running in the background.',
  },
  {
    step: 'Weekly demos',
    time: 'Every week',
    text: 'You get a live link from week one and see real progress, not slides. Change your mind early, when it is cheap.',
  },
  {
    step: 'Launch',
    time: 'Go-live',
    text: 'I deploy to your server, Play Store or customers’ PCs, and stay on call during the first days.',
  },
  {
    step: 'Handover',
    time: '+30 days free fixes',
    text: 'You own 100% of the code and every account. Optional monthly care plan after that.',
  },
]

export const payment = [
  { pct: 30, label: 'to start' },
  { pct: 40, label: 'at the halfway demo' },
  { pct: 30, label: 'on launch' },
]

export const faqs = [
  {
    q: 'How do I know you are not a scam?',
    a: 'Do not take my word for it. Check my LinkedIn and GitHub, get on a free video call, and ask to see a product I have shipped. Then start small: you never pay 100% upfront, and the code sits in your own GitHub from day one, so you can walk away at any milestone with everything you have paid for.',
  },
  {
    q: 'If it is cheaper, is it lower quality?',
    a: 'No. The price is lower because there is no office, no sales team and no layers of managers, not because corners are cut. You get a developer who has led teams and built enterprise systems, writing and reviewing every line.',
  },
  {
    q: 'Does AI write my app?',
    a: 'AI writes the boring parts faster: forms, boilerplate, first drafts of tests. I design the system, write the important logic, and read every line before it ships. Think of it as a very fast junior that I supervise closely.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do, fully. Source code, servers, domain, Play Store and payment accounts are all in your name. No lock-in, no licence fees to me.',
  },
  {
    q: 'What if you get sick or disappear?',
    a: 'Code lives in your GitHub from day one, with a README that another developer can pick up. Weekly demos mean you always know exactly where things stand.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. I work in English and Hindi / Gujarati, overlap with UK and EU mornings and US evenings, and invoice in USD, EUR or INR.',
  },
  {
    q: 'What happens after launch?',
    a: '30 days of free bug fixes. After that, an optional monthly care plan covers updates, backups, small changes and monitoring, or you can take it in-house.',
  },
  {
    q: 'Can you fix or finish an app someone else started?',
    a: 'Usually, yes. I start with a paid audit of a few days, tell you honestly what is worth keeping, then quote the rest.',
  },
]

export const toolbox = [
  { group: 'Web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Redux Toolkit', 'TanStack Query', 'Vite', 'Three.js', 'GSAP', 'Angular'] },
  { group: 'Mobile', items: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Retrofit', 'Google Maps SDK', 'React Native', 'FCM'] },
  { group: 'Desktop', items: ['Electron', 'Java (Swing / FlatLaf)', 'SQLite', 'Auto-update', 'Installers'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Python', 'BullMQ', 'Socket.io', 'MQTT', 'Kafka', 'OpenAPI'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Drizzle', 'TypeORM', 'DynamoDB'] },
  { group: 'Cloud', items: ['AWS (S3, Lambda, SQS, SES)', 'Vercel', 'Render', 'Neon', 'Docker', 'NGINX'] },
  { group: 'Payments & comms', items: ['Razorpay', 'Stripe', 'Twilio', 'SAML / OAuth 2.0', 'Email & SMS'] },
  { group: 'AI in my workflow', items: ['Claude Code', 'Cursor', 'ChatGPT', 'Gemini', 'OpenAI API', 'RAG'] },
]
