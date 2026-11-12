// kind: 'freelance' = built for my own clients from home.
//       'team'      = built while employed / leading a team.
// platform decides which little device frame the cover draws: 'web' | 'phone' | 'desktop' | 'combo'.
// Only put numbers here that you can back up in a client call.
//
// Two optional fields make a project far more convincing. Add them whenever you can:
//   image:   '/shots/tripkoz.jpg'   a real screenshot in /public (replaces the drawn cover)
//   liveUrl: 'https://…'            a link the visitor can open and click around

export const categories = [
  { id: 'all', label: 'Everything' },
  { id: 'saas', label: 'SaaS & web apps' },
  { id: 'mobile', label: 'Mobile apps' },
  { id: 'desktop', label: 'Desktop software' },
  { id: 'website', label: 'Websites' },
  { id: 'iot', label: 'IoT & real-time' },
  { id: 'ai', label: 'AI' },
]

export const projects = [
  {
    id: 'tripkoz',
    kind: 'freelance',
    title: 'TripKoz',
    tagline: 'School bus & fleet tracking, with a driver app and a parent app',
    sector: 'Transport · Education',
    year: '2026',
    platform: 'combo',
    accent: '#E2552B',
    categories: ['saas', 'mobile', 'iot'],
    summary:
      'A full SaaS for schools and fleet operators: plan routes and stops, assign drivers and vehicles, and let parents watch the bus arrive on a live map.',
    problem:
      'Schools ran transport on phone calls and WhatsApp groups. Parents never knew where the bus was, drivers had no checklist, and the office had no record of who boarded where.',
    solution:
      'I built the whole product end to end: a NestJS API with 30+ modules, a Next.js admin dashboard, and one native Android app that switches between Driver and Guardian mode based on the account role. Live GPS flows over Socket.io and subscriptions are billed through Razorpay.',
    features: [
      'Route, stop and pickup-point planning with vehicle and driver assignment',
      'Driver mode: pre-trip safety checklist, stop-by-stop passenger manifest, turn-by-turn route, one-tap SOS',
      'Guardian mode: bus on a live map, ETA to the stop, boarding alerts, trip history, absence reporting',
      'Live location upload and broadcast with Socket.io and Redis',
      'Inspections, maintenance logs, safety reports and notifications',
      'Multi-organisation SaaS with plans, subscriptions and Razorpay billing',
      'Demo-request funnel and solo-operator onboarding',
    ],
    stack: {
      Web: ['Next.js 15', 'React 19', 'Tailwind CSS 4'],
      Mobile: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Retrofit', 'Google Maps SDK', 'Baseline Profiles'],
      Backend: ['NestJS 11', 'TypeScript', 'Prisma 7', 'Socket.io', 'Razorpay'],
      Data: ['PostgreSQL', 'Redis'],
      Infra: ['Docker Compose', 'Render'],
    },
    numbers: [
      { value: '689', label: 'automated backend tests' },
      { value: '33', label: 'API modules' },
      { value: '2-in-1', label: 'Android app, driver + parent' },
    ],
    note: 'Audited with typecheck, lint and 53 test suites all green before release.',
  },
  {
    id: 'vidyalay',
    kind: 'freelance',
    title: 'Vidyalay',
    tagline: 'School management system for admins, teachers and parents',
    sector: 'Education',
    year: '2026',
    platform: 'web',
    accent: '#2F5D50',
    categories: ['saas', 'mobile'],
    summary:
      'One portal that runs a school: admissions, attendance, fees, exams, timetable, library, transport and parent communication.',
    problem:
      'The school juggled registers, spreadsheets and three separate apps. Fee reminders went out by hand and report cards took a week every term.',
    solution:
      'A typed Express + Prisma API that describes itself with OpenAPI, a React 19 admin portal, and an Android app for teachers and parents that is being built against the same API.',
    features: [
      'Students, guardians, staff and admissions with bulk Excel import and export',
      'Daily attendance for students and staff, leave requests and approvals',
      'Fee structures, online payments, receipts and dues tracking',
      'Exams, marks entry, report cards, promotions and certificates',
      'Timetable, homework, e-content, study material and a school calendar',
      'Library, transport routes, gallery, circulars and in-app messaging',
      'Audit log of every change, roles and device sessions',
    ],
    stack: {
      Web: ['React 19', 'Tailwind CSS 4', 'Vite'],
      Mobile: ['Kotlin', 'Jetpack Compose', 'multi-module'],
      Backend: ['Node.js', 'Express', 'TypeScript', 'Prisma 7', 'OpenAPI'],
      Data: ['PostgreSQL'],
      Infra: ['Docker Compose'],
    },
    numbers: [
      { value: '33', label: 'modules in one portal' },
      { value: '150', label: 'documented API endpoints' },
      { value: '1', label: 'login for the whole school' },
    ],
    note: 'Android app for teachers and parents is in development.',
  },
  {
    id: 'pharmadesk',
    kind: 'freelance',
    title: 'PharmaDesk',
    tagline: 'Desktop billing & stock software for Indian medical stores',
    sector: 'Retail · Healthcare',
    year: '2026',
    platform: 'desktop',
    accent: '#3A6EA5',
    categories: ['desktop'],
    summary:
      'A Windows app a chemist can run at the counter: fast GST billing, batch-wise stock, expiry alerts and the records the drug inspector asks for.',
    problem:
      'Off-the-shelf pharmacy software was expensive, slow and locked the owner into yearly fees. Expired stock was found only when it was too late.',
    solution:
      'An Electron + React app that starts its own local Express API. The screen never talks to the database directly, and Admin and Cashier roles are enforced on the server. GST maths and FEFO allocation live in one shared package used by both sides.',
    features: [
      'Point-of-sale GST billing with keyboard-first flow',
      'Batch-wise stock with FEFO (first expiry, first out) allocation',
      'Purchases, suppliers and expiry alerts before stock goes bad',
      'Schedule H / H1 register for regulated medicines',
      'Daily, GST and stock reports',
      'One-click backup and restore of the whole database',
      'Admin and Cashier roles with JWT on a local-only API',
    ],
    stack: {
      Desktop: ['Electron', 'electron-vite', 'React 18', 'TypeScript', 'Tailwind', 'Radix UI', 'TanStack Query'],
      Backend: ['Express 5', 'Drizzle ORM', 'Zod'],
      Data: ['PostgreSQL', 'Neon', 'PGlite for tests'],
    },
    numbers: [
      { value: 'GST', label: 'compliant billing' },
      { value: 'FEFO', label: 'stock allocation' },
      { value: '0', label: 'yearly licence fee for the owner' },
    ],
  },
  {
    id: 'aarav-hospital',
    kind: 'freelance',
    title: 'Aarav Hospital',
    tagline: "Hospital management for a children's hospital",
    sector: 'Healthcare',
    year: '2026',
    platform: 'web',
    accent: '#C2407A',
    categories: ['saas'],
    summary:
      'Reception, OPD queue, doctor consultations, prescriptions, beds and the full child vaccination schedule, in one fast and simple app.',
    problem:
      'Paper OPD slips, doctors re-asking the same history, and vaccination dates tracked in a notebook. Parents missed doses and nobody noticed.',
    solution:
      'A React SPA on an Express + PostgreSQL API. Each doctor sees only their own patients. I also did a full stability and performance pass: added indexes, made every read a single round trip, and found the real bottleneck was a database hosted in Ohio for a hospital in India.',
    features: [
      'Reception registers the child, picks a doctor and sends them to the OPD queue',
      'Doctor screen for vitals, symptoms, history, investigations, diagnosis, Rx, advice and follow-up',
      'Printable prescriptions',
      'Live bed board: vacant, occupied, cleaning, maintenance, with admit, shift and discharge',
      'IAP immunisation schedule generated from date of birth, with overdue and upcoming doses',
      'Appointments',
    ],
    stack: {
      Web: ['React', 'Vite'],
      Backend: ['Node.js', 'Express'],
      Data: ['PostgreSQL', 'Neon'],
    },
    numbers: [
      { value: '1', label: 'round trip per screen' },
      { value: '6', label: 'new indexes from the perf pass' },
      { value: 'IAP', label: 'vaccine schedule built in' },
    ],
  },
  {
    id: 'genzkrp',
    kind: 'freelance',
    title: 'GenzKRP',
    tagline: 'Bulk automation for bank staff on the government Kisan Rin Portal',
    sector: 'Banking · Agriculture',
    year: '2026',
    platform: 'desktop',
    accent: '#B8860B',
    categories: ['desktop', 'saas'],
    summary:
      'A paid Windows tool that lets bank branch staff upload, approve and download KCC crop loans and interest claims in bulk from Excel, instead of one at a time.',
    problem:
      'Branch staff were entering hundreds of Kisan Credit Card loans and subsidy claims by hand on a slow government portal, one record at a time.',
    solution:
      'A Java desktop app that signs in to the portal as the user and runs the work in bulk from Excel sheets, with maker and checker roles. I also built the business around it: a licensing API on Vercel checks every sign-in against a paid subscription, and an admin portal manages customers, payments and app updates.',
    features: [
      'Bulk upload, approve, delete, fetch and download of loans and claims from Excel',
      'Maker (branch user) and checker (branch head) flows',
      'Interest Subvention and Prompt Repayment Incentive claims',
      'Subscription check on every sign-in, with a sign-in log',
      'Admin portal: customers, payments, stop/resume, publish updates',
      'Auto-update for installed copies',
    ],
    stack: {
      Desktop: ['Java', 'FlatLaf', 'Apache POI', 'SQLite', 'JNA'],
      Backend: ['Node.js', 'Express', 'Vercel'],
      Web: ['React', 'Vite'],
      Data: ['PostgreSQL', 'Neon'],
    },
    numbers: [
      { value: 'Bulk', label: 'instead of one-by-one entry' },
      { value: 'SaaS', label: 'licensed per user' },
      { value: 'Auto', label: 'updates to every install' },
    ],
  },
  {
    id: 'allmarc',
    kind: 'freelance',
    title: 'Allmarc Industries',
    tagline: '3D product website for a heavy engineering company',
    sector: 'Oil & gas · Civil engineering',
    year: '2026',
    platform: 'site',
    accent: '#5B5F97',
    categories: ['website'],
    summary:
      'A fast, cinematic website with interactive 3D models of industrial equipment, generated into hundreds of SEO-ready static pages.',
    problem:
      'Their catalogue lived in PDFs. Buyers could not see the equipment, and the old site was slow and invisible on Google.',
    solution:
      'I wrote a small static site generator that turns content into 237 plain HTML pages, then layered Three.js 3D viewers, GSAP scroll animation and Lenis smooth scrolling on top. A tiny Node server handles Brotli/Gzip, video streaming and caching.',
    features: [
      '237 statically generated, SEO-optimised pages',
      'Interactive Three.js viewers for plant modules, chambers and shoring systems',
      'GSAP ScrollTrigger animation synced with Lenis smooth scroll',
      'Instant client-side search across every page',
      'Brotli / Gzip compression, HTTP 206 video streaming and ETag caching',
    ],
    stack: {
      Web: ['Three.js', 'GSAP', 'Lenis', 'HTML/CSS'],
      Build: ['Node.js', 'Cheerio', 'custom static generator'],
      Infra: ['Vercel'],
    },
    numbers: [
      { value: '237', label: 'static pages' },
      { value: '3D', label: 'equipment viewers' },
      { value: '0', label: 'framework runtime shipped' },
    ],
  },

  // Built while employed
  {
    id: 'besecure',
    kind: 'team',
    title: 'BeSecure',
    tagline: 'Multi-tenant security & access governance platform',
    sector: 'Enterprise B2B · Binstellar',
    year: '2026',
    platform: 'web',
    accent: '#1F7A8C',
    categories: ['saas'],
    summary:
      'An enterprise IAM platform: fine-grained permissions, explicit-deny rules and strict tenant isolation across 30+ backend modules.',
    problem:
      'Enterprise customers need granular permissions, protection against privilege escalation and zero data leakage between tenants.',
    solution:
      'As team lead I designed the access-control engine and the route guards, with in-process snapshot caching backed by database version probes, and built the React admin dashboards.',
    features: [
      'Access-control engine with discrete permission keys and explicit-deny precedence',
      'Sub-millisecond permission checks with snapshot caching',
      'Tenant context derived from authenticated membership across 30+ modules',
      'Time-bound break-glass support access with full state-diff audit',
      'Admin dashboards with PrimeReact and ApexCharts',
      'Excel and PDF audit exports',
    ],
    stack: {
      Web: ['React', 'Vite', 'Redux Toolkit', 'PrimeReact', 'Tailwind CSS'],
      Backend: ['NestJS', 'TypeScript', 'TypeORM', 'SAML 2.0', 'OAuth 2.0'],
      Data: ['PostgreSQL'],
    },
    numbers: [
      { value: '<1ms', label: 'permission check' },
      { value: '30+', label: 'tenant-isolated modules' },
      { value: '100%', label: 'audited support access' },
    ],
  },
  {
    id: 'qfact',
    kind: 'team',
    title: 'QFACT Platform',
    tagline: 'Microservices SaaS with a Twilio voice call centre',
    sector: 'SaaS · Qfact',
    year: '2025',
    platform: 'web',
    accent: '#7A4E9C',
    categories: ['saas'],
    summary:
      'A multi-tenant workflow platform with background queues and inbound / outbound call handling that creates tickets automatically.',
    problem:
      'High-volume workflows and phone support needed async processing and automatic ticketing.',
    solution:
      'I led a team of 6 across backend, frontend and mobile, designed the NestJS microservices, BullMQ queues and the Twilio Voice integration.',
    features: [
      'NestJS microservices with BullMQ background workers',
      'Twilio Voice inbound and outbound call management',
      'Automatic ticket creation and real-time tracking',
      'FCM push notifications',
      'Secure media handling pipeline',
    ],
    stack: {
      Backend: ['NestJS', 'Node.js', 'TypeScript', 'BullMQ', 'Twilio Voice', 'FCM', 'Sequelize'],
      Data: ['MySQL', 'Redis'],
      Infra: ['Docker'],
    },
    numbers: [
      { value: '+40%', label: 'faster API responses' },
      { value: '95%', label: 'sprints delivered on time' },
      { value: '6', label: 'developers led' },
    ],
  },
  {
    id: 'hms-enterprise',
    kind: 'team',
    title: 'Hospital Management System',
    tagline: 'Modular healthcare backend with strict data integrity',
    sector: 'Healthcare · Qfact',
    year: '2025',
    platform: 'web',
    accent: '#3F7D58',
    categories: ['saas'],
    summary: 'Patient records, appointments and billing as modular NestJS services on PostgreSQL.',
    problem: 'Hospitals need transactional consistency across intake, appointments and billing.',
    solution: 'Modular NestJS services, relational PostgreSQL modelling, token auth and Docker for every environment.',
    features: [
      'Patient intake, appointments and billing modules',
      'ACID transactions with TypeORM',
      'Role-based tokens',
      'Dockerised staging and production',
    ],
    stack: {
      Backend: ['NestJS', 'TypeScript', 'TypeORM', 'JWT'],
      Data: ['PostgreSQL'],
      Infra: ['Docker'],
    },
    numbers: [
      { value: '-20%', label: 'patient intake wait' },
      { value: 'ACID', label: 'transactions' },
      { value: 'Docker', label: 'every environment' },
    ],
  },
  {
    id: 'telep-eco',
    kind: 'team',
    title: 'Telep-Eco',
    tagline: 'Real-time IoT telemetry for 5,000+ devices',
    sector: 'IoT · Rapidise',
    year: '2024',
    platform: 'web',
    accent: '#0E7C66',
    categories: ['iot'],
    summary: 'Ingests and monitors sensor streams from thousands of live devices with live dashboards.',
    problem: 'Thousands of devices streaming at once, over unreliable networks, with little bandwidth to spare.',
    solution: 'Optimised MQTT brokers, event-driven services, WebSocket push to dashboards and time-series storage in MongoDB.',
    features: [
      'MQTT ingestion from 5,000+ concurrent devices',
      'WebSocket push to live dashboards',
      'Time-series aggregation in MongoDB',
      'Event-driven microservices',
    ],
    stack: {
      Backend: ['Node.js', 'MQTT', 'Socket.io'],
      Data: ['MongoDB', 'AWS S3'],
    },
    numbers: [
      { value: '5,000+', label: 'live devices' },
      { value: '99.9%', label: 'uptime' },
      { value: '-25%', label: 'transmission overhead' },
    ],
  },
  {
    id: 'telep-ai',
    kind: 'team',
    title: 'Telep-AI',
    tagline: 'AI video analytics with real-time alerts',
    sector: 'AI · Rapidise',
    year: '2024',
    platform: 'desktop',
    accent: '#A44A3F',
    categories: ['ai', 'desktop'],
    summary: 'A cross-platform desktop app that reads IP camera streams and raises AI alerts in real time.',
    problem: 'Camera streams needed AI anomaly detection with alerts in well under a second.',
    solution: 'Designed the Electron app core and the RTSP + GStreamer video pipeline feeding the vision model.',
    features: [
      'RTSP camera ingestion and decoding',
      'GStreamer / OpenCV inference pipeline',
      'Cross-platform Electron runtime',
      'Low-latency alert dispatch',
    ],
    stack: {
      Desktop: ['Electron', 'Node.js'],
      AI: ['GStreamer', 'OpenCV', 'RTSP'],
      Data: ['SQLite'],
    },
    numbers: [
      { value: '-50%', label: 'alert latency' },
      { value: '+40%', label: 'frame throughput' },
      { value: '3 OS', label: 'one codebase' },
    ],
  },
  {
    id: 'helpdesk',
    kind: 'team',
    title: 'Helpdesk System',
    tagline: 'IT ticketing with Slack and Teams integration',
    sector: 'Internal tools · Rapidise',
    year: '2024',
    platform: 'web',
    accent: '#8C6A1F',
    categories: ['saas'],
    summary: 'Role-based IT ticketing with real-time notifications and chat-bot integrations.',
    problem: 'Ticket routing bottlenecks delayed IT incidents across distributed teams.',
    solution: 'REST APIs, role-based access, WebSocket notifications and Slack / MS Teams webhooks.',
    features: ['Role-based ticket governance', 'Real-time WebSocket notifications', 'Slack and MS Teams integration'],
    stack: {
      Backend: ['Node.js', 'TypeScript', 'WebSockets', 'Slack API', 'MS Teams'],
      Data: ['MongoDB'],
    },
    numbers: [
      { value: '-30%', label: 'response time' },
      { value: '+25%', label: 'operational efficiency' },
      { value: '2', label: 'chat integrations' },
    ],
  },
  {
    id: 'bap-tool',
    kind: 'team',
    title: 'BAP-Tool',
    tagline: 'Quotation engine for manufacturing',
    sector: 'Manufacturing · Rapidise',
    year: '2023',
    platform: 'web',
    accent: '#4D6A8A',
    categories: ['saas'],
    summary: 'Automated multi-stage pricing and PDF proposals for a manufacturer.',
    problem: 'Manual pricing across manufacturing stages caused slow quotes and billing mistakes.',
    solution: 'An Express pricing engine with token auth and PDF proposals stored on S3.',
    features: ['Multi-stage cost calculation', 'PDF proposal generation on AWS S3', 'JWT authorisation'],
    stack: {
      Web: ['Angular'],
      Backend: ['Node.js', 'Express', 'TypeScript', 'JWT'],
      Data: ['MongoDB', 'AWS S3'],
    },
    numbers: [
      { value: '+40%', label: 'faster proposals' },
      { value: 'S3', label: 'document vault' },
      { value: 'JWT', label: 'secured' },
    ],
  },
]

export const getProject = (id) => projects.find((p) => p.id === id)
