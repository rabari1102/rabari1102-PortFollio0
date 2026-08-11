export const skillCategories = [
  {
    id: 'backend',
    name: 'Backend Architecture',
    sub: 'Core Systems & Microservices',
    skills: [
      { name: 'NestJS', pct: 98, level: 'Expert', desc: 'Enterprise B2B modular architecture, dependency injection, custom route guards, and TypeORM/Sequelize ORMs.' },
      { name: 'Node.js', pct: 96, level: 'Expert', desc: 'Event-loop optimization, async concurrency, stream processing, and high-volume REST/gRPC endpoints.' },
      { name: 'TypeScript', pct: 95, level: 'Expert', desc: 'Strict static typing, DTO validation schemas, generic abstractions, and type-safe permission key contracts.' },
      { name: 'Python', pct: 85, level: 'Advanced', desc: 'Backend service scripting, automated data processing pipelines, and AI model integration.' },
      { name: 'Express.js', pct: 92, level: 'Advanced', desc: 'Middleware pipelines, authentication guards, rate limiting, and OpenAPI / Swagger documentation.' }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend & UI Systems',
    sub: 'Modern Web Interfaces',
    skills: [
      { name: 'React.js', pct: 94, level: 'Expert', desc: 'Single-page applications, custom hooks, component architecture, state management, and virtualized tables.' },
      { name: 'Next.js', pct: 90, level: 'Expert', desc: 'App router, Server-Side Rendering (SSR), API routes, and optimized web performance.' },
      { name: 'Redux Toolkit', pct: 90, level: 'Advanced', desc: 'Global state slices, async thunks, RTK Query caching, and session membership state.' },
      { name: 'PrimeReact / Tailwind CSS v4', pct: 92, level: 'Advanced', desc: 'Interactive security dashboards, ApexCharts analytics, dark-mode design systems, and responsive layouts.' },
      { name: 'Vite', pct: 92, level: 'Advanced', desc: 'Fast HMR dev setups, bundle optimization, and production build tooling.' }
    ]
  },
  {
    id: 'databases',
    name: 'Databases & Security Governance',
    sub: 'Data Isolation, IAM & Storage',
    skills: [
      { name: 'PostgreSQL', pct: 95, level: 'Expert', desc: 'Multi-tenant relational schemas, ACID transactions, TypeORM models, indexing, and sub-ms authorization version probes.' },
      { name: 'MongoDB', pct: 92, level: 'Expert', desc: 'Aggregation pipelines, Mongoose models, time-series IoT telemetry indexes, and document query tuning.' },
      { name: 'Redis', pct: 92, level: 'Expert', desc: 'In-process snapshot caching, session stores, rate-limiting counters, and Pub/Sub queue channels.' },
      { name: 'Security (SAML 2.0 / OAuth 2.0 / RBAC)', pct: 95, level: 'Expert', desc: 'Multi-tenant Role-Based Access Control, explicit Deny precedence, TOTP/Email OTP MFA, and break-glass support delegation.' },
      { name: 'MySQL & DynamoDB', pct: 88, level: 'Advanced', desc: 'Sequelize ORM integration, normalized schema design, and AWS DynamoDB key partition models.' }
    ]
  },
  {
    id: 'messaging',
    name: 'Messaging & Realtime Systems',
    sub: 'Async Processing & Telecom',
    skills: [
      { name: 'BullMQ', pct: 95, level: 'Expert', desc: 'Redis-backed background job queues, async worker concurrency, failure retries, and media handling pipelines.' },
      { name: 'MQTT / IoT', pct: 94, level: 'Expert', desc: 'Protocol optimization for 5,000+ concurrent telemetry sensors with 25% lower transmission overhead.' },
      { name: 'WebSockets', pct: 92, level: 'Expert', desc: 'Socket.io bidirectional channels, live presence tracking, and real-time dashboard notifications.' },
      { name: 'Kafka & RabbitMQ', pct: 86, level: 'Advanced', desc: 'Distributed event streaming topics, message queue routing, and subscriber event handling.' },
      { name: 'Twilio Voice & FCM', pct: 90, level: 'Advanced', desc: 'Inbound/outbound call webhook dispatch, automated ticket creation, and mobile push notifications.' }
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud, Infrastructure & QA',
    sub: 'AWS, Containers & Quality',
    skills: [
      { name: 'AWS Cloud Services', pct: 88, level: 'Advanced', desc: 'Lambda, API Gateway, S3 asset vaults, SQS, SNS, SES, and CloudWatch log monitoring.' },
      { name: 'Docker & NGINX', pct: 90, level: 'Advanced', desc: 'Containerized staging/production environments, reverse proxy routing, and multi-stage builds.' },
      { name: 'Testing (Cypress, Jest, Postman)', pct: 88, level: 'Advanced', desc: 'Integration test suites, unit testing, Postman/Swagger API contracts, and Winston logging.' },
      { name: 'Engineering Leadership', pct: 95, level: 'Expert', desc: 'Leading 6+ developer teams, technical mentorship, code reviews, sprint planning, and 95% on-time feature delivery.' }
    ]
  }
]

export const allSkillsList = [
  'NestJS', 'Node.js', 'Python', 'TypeScript', 'Express.js', 'React.js', 'Next.js', 'Redux Toolkit',
  'Vite', 'PrimeReact', 'Tailwind CSS v4', 'PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB',
  'TypeORM', 'Mongoose', 'Sequelize', 'SAML 2.0', 'OAuth 2.0', 'Multi-Tenant RBAC', 'MFA (TOTP / OTP)',
  'BullMQ', 'MQTT', 'WebSockets', 'Kafka', 'RabbitMQ', 'Twilio Voice', 'FCM',
  'AWS Lambda', 'AWS API Gateway', 'AWS S3', 'AWS SQS/SNS', 'CloudWatch', 'Docker', 'NGINX',
  'Cypress', 'Jest', 'Mocha / Chai', 'Winston', 'Swagger', 'Git / GitHub', 'Postman', 'Jira / Agile'
]
