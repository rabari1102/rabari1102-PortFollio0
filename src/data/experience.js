export const experience = [
  {
    company: 'Binstellar Technologies',
    role: 'Team Lead & Full-Stack Developer (NestJS / React)',
    period: '15 Jan 2026 – Present',
    location: 'Hybrid',
    current: true,
    badges: ['Team Lead', 'Full-Stack', 'Access Governance', 'RBAC Architecture'],
    highlights: [
      'Serving as Team Lead & Full-Stack Developer, directing engineering design, code reviews, and architectural strategy for enterprise multi-tenant B2B applications.',
      'Engineered BeSecure, an enterprise B2B multi-tenant (RBAC) security and access governance platform built with NestJS, TypeScript, PostgreSQL, TypeORM, and React (Vite, Redux Toolkit).',
      'Architected a fine-grained Access Control Engine supporting discrete permission keys, explicit Deny precedence rules, and automated route authorization guards.',
      'Delivered sub-millisecond permission checks utilizing in-process snapshot caching with database-backed authorization version probes.',
      'Enforced strict Multi-Tenant Data Isolation by deriving context from authenticated user membership sessions across 30+ backend modules.',
      'Developed interactive administration dashboards with React, PrimeReact, Tailwind CSS, and ApexCharts for user provisioning, role assignments, and real-time security analytics.',
      'Implemented compliance capabilities including time-bounded break-glass Support Access Delegation with full state diff auditing and automated data exports via ExcelJS and pdfmake.'
    ],
    technologies: ['NestJS', 'React.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Vite', 'Redux Toolkit', 'PrimeReact', 'Tailwind CSS', 'SAML 2.0', 'OAuth 2.0', 'RBAC']
  },
  {
    company: 'Qfact (Treeroot Informatics)',
    role: 'Team Lead & Sr. Backend Developer',
    period: 'Mar 2025 – 15 Dec 2025',
    location: 'Remote',
    current: false,
    badges: ['Team Lead (6 Devs)', 'Microservices'],
    highlights: [
      'Led a cross-functional team of 6 backend, frontend, and mobile developers, directing sprint execution, code quality, technical design, and deployments.',
      'Established standardized development practices, boosting team velocity by 25% and reducing production defects by 30%.',
      'Managed agile sprint cycles achieving 95% on-time feature delivery in coordination with product management and technical leads.',
      'Architected NestJS microservices for a multi-tenant platform, integrating BullMQ background queues and secure media handling pipelines.',
      'Designed an enterprise Twilio Voice ecosystem for inbound and outbound call management with automated ticket creation and real-time tracking.',
      'Contributed to a Hospital Management System built with NestJS, TypeScript, and PostgreSQL utilizing Docker containerization.'
    ],
    technologies: ['NestJS', 'Node.js', 'TypeScript', 'MySQL', 'PostgreSQL', 'Twilio Voice', 'BullMQ', 'FCM', 'Docker', 'Sequelize']
  },
  {
    company: 'Rapidise (Teksun Inc.)',
    role: 'Backend Developer',
    period: 'Sep 2023 – Mar 2025',
    location: 'On-site, Ahmedabad',
    current: false,
    badges: ['IoT Architect', 'Microservices'],
    highlights: [
      'Developed an IT Helpdesk Management System with role-based access, reducing support response times by 30% and elevating operational efficiency by 25%.',
      'Architected Telep-Eco, a real-time IoT monitoring platform handling 5,000+ concurrent device connections with 35% higher tracking efficiency.',
      'Engineered Telep-AI streaming infrastructure, accelerating AI model warning response times by 50% through optimized data pipelines.',
      'Built BAP-TOOL for quotation workflow automation, increasing proposal turnaround speeds by 40%.',
      'Designed event-driven microservices maintaining 99.9% system uptime while securing endpoints with token authentication.'
    ],
    technologies: ['Node.js', 'MQTT', 'MongoDB', 'Socket.io', 'Electron.js', 'AWS S3', 'JWT', 'NestJS']
  },
  {
    company: 'TUVOC Technology',
    role: 'Backend Developer',
    period: 'Jan 2023 – Aug 2023',
    location: 'On-site, Ahmedabad',
    current: false,
    badges: ['REST APIs', 'Database Tuning'],
    highlights: [
      'Developed high-performance RESTful APIs with Express.js and Swagger documentation, improving API response speeds by 30%.',
      'Optimized MongoDB database schemas and indexes, cutting database query latency by 45%.',
      'Implemented real-time data synchronization using WebSockets for live data monitoring interfaces.'
    ],
    technologies: ['Express.js', 'Node.js', 'MongoDB', 'WebSockets', 'Swagger', 'TypeScript']
  }
]
