export const projects = [
  {
    id: 'besecure',
    title: 'BeSecure',
    subtitle: 'Enterprise Multi-Tenant Security & Access Governance Platform',
    category: 'FULL STACK',
    topology: [
      { step: '01. AUTH SESSION', detail: 'Authenticated Membership Context' },
      { step: '02. ROUTE GUARD', detail: 'NestJS In-Process Snapshot Cache (<1ms)' },
      { step: '03. ACCESS ENGINE', detail: 'Explicit Deny Precedence Rules' },
      { step: '04. TENANT DB', detail: 'PostgreSQL Isolated Schema' }
    ],
    architecture: 'NestJS Microservices · Dynamic Access Control Engine · In-Process Snapshot Caching',
    problem: 'Enterprise multi-tenant platforms require granular permission governance, anti-escalation safeguards, explicit Deny priority rules, and zero data leakage across tenant boundaries.',
    role: 'Team Lead & Full-Stack Developer — Engineered the fine-grained Access Control Engine, sub-millisecond route guards, multi-tenant session isolation across 30+ modules, and React administrative security dashboards.',
    outcome: 'Delivered sub-millisecond authorization evaluation, 100% strict multi-tenant data isolation, break-glass support delegation, and automated PDF/Excel diff audit exports.',
    metrics: [
      { label: 'Permission Check Latency', value: '<1ms' },
      { label: 'Multi-Tenant Modules', value: '30+' },
      { label: 'Access Policy Rules', value: 'Explicit Deny' }
    ],
    tags: ['NestJS', 'React', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Redux Toolkit', 'PrimeReact', 'Tailwind CSS v4', 'SAML 2.0', 'OAuth 2.0', 'RBAC'],
    featured: true
  },
  {
    id: 'hospital-system',
    title: 'Hospital Management System',
    subtitle: 'Modular Healthcare Platform & ACID Data Engine',
    category: 'FULL STACK',
    topology: [
      { step: '01. CLIENT REST', detail: 'Granular Role-Based Tokens' },
      { step: '02. NESTJS CORE', detail: 'Patient Intake & Billing Microservices' },
      { step: '03. TYPEORM LAYER', detail: 'ACID Transaction Bounds' },
      { step: '04. DOCKER STACK', detail: 'PostgreSQL Relational DB' }
    ],
    architecture: 'Modular NestJS Architecture · PostgreSQL Relational Model · Containerized Deployments',
    problem: 'Healthcare institutions require modular service architecture for patient records, appointments, and billing with strict data integrity and transactional consistency.',
    role: 'Architected modular NestJS backend with relational PostgreSQL data modeling, token authentication, and Docker containerization for staging and production.',
    outcome: 'Reduced patient intake processing wait time by 20%, ensured 100% transactional ACID compliance, and standardized deployment environments with Docker.',
    metrics: [
      { label: 'Intake Wait Time', value: '-20%' },
      { label: 'Data Integrity', value: '100% ACID' },
      { label: 'Environment Control', value: 'Dockerized' }
    ],
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Docker', 'JWT', 'RBAC', 'REST APIs'],
    featured: true
  },
  {
    id: 'qfact-platform',
    title: 'QFACT Platform',
    subtitle: 'Modular Microservices SaaS & Enterprise Twilio Voice Ecosystem',
    category: 'FULL STACK',
    topology: [
      { step: '01. INBOUND CALL', detail: 'Twilio Telecom Webhook Dispatch' },
      { step: '02. QUEUE WORKER', detail: 'BullMQ Async Redis Queue' },
      { step: '03. NESTJS API', detail: 'Ticket Routing & FCM Push' },
      { step: '04. DATABASE', detail: 'MySQL Sequelize ORM' }
    ],
    architecture: 'NestJS Microservices · BullMQ Queue Processing · Twilio Telecom Engine',
    problem: 'Enterprise workflow systems required async queue processing for high-volume transactions and inbound/outbound automated call dispatch.',
    role: 'Team Lead — Directed 6-engineer development team, architected high-performance RESTful APIs, BullMQ queue integrations, and end-to-end Twilio Voice call management.',
    outcome: 'Increased request processing efficiency by 35%, accelerated API response speeds by 40%, and achieved 95% on-time sprint feature delivery.',
    metrics: [
      { label: 'API Response Boost', value: '+40%' },
      { label: 'Request Efficiency', value: '+35%' },
      { label: 'Engineering Team', value: '6 Devs' }
    ],
    tags: ['Node.js', 'NestJS', 'TypeScript', 'MySQL', 'Twilio Voice', 'BullMQ', 'FCM', 'Sequelize'],
    featured: true
  },
  {
    id: 'telep-eco',
    title: 'Telep-Eco',
    subtitle: 'Real-Time IoT Telemetry Monitoring Platform',
    category: 'IOT',
    topology: [
      { step: '01. SENSOR STREAM', detail: '5,000+ Concurrent IoT Devices' },
      { step: '02. MQTT BROKER', detail: 'EMQX Protocol Optimization' },
      { step: '03. WEBSOCKET', detail: 'Real-Time Dashboard Dispatch' },
      { step: '04. TIME-SERIES', detail: 'MongoDB Aggregation Engine' }
    ],
    architecture: 'MQTT Broker Protocol · Event-Driven Microservices · Time-Series Ingestion',
    problem: 'Ingesting and monitoring sensor streams across 5,000+ active IoT devices in real time with minimal network bandwidth overhead.',
    role: 'Led backend engineering, optimized MQTT protocol brokers, designed WebSocket push channels, and scaled time-series database storage.',
    outcome: 'Reduced transmission overhead by 25%, sustained 99.9% system uptime, and achieved 35% higher device tracking efficiency.',
    metrics: [
      { label: 'Connected Devices', value: '5,000+' },
      { label: 'Transmission Overhead', value: '-25%' },
      { label: 'Tracking Efficiency', value: '+35%' }
    ],
    tags: ['Node.js', 'MQTT', 'MongoDB', 'Socket.io', 'AWS S3', 'Event-Driven'],
    featured: true
  },
  {
    id: 'telep-ai',
    title: 'Telep-AI',
    subtitle: 'AI Video Streaming & Real-Time Anomaly Warning Infrastructure',
    category: 'AI',
    topology: [
      { step: '01. RTSP INPUT', detail: 'IP Camera Video Stream Decoding' },
      { step: '02. GSTREAMER', detail: 'Computer Vision Inference' },
      { step: '03. ELECTRON CORE', detail: 'Cross-Platform Native Runtime' },
      { step: '04. ALERT DISPATCH', detail: 'Sub-100ms Warning Trigger' }
    ],
    architecture: 'Electron Native App · RTSP Video Ingestion · GStreamer AI Inference Pipeline',
    problem: 'Low-latency IP camera streaming required real-time AI anomaly detection with sub-second alert dispatch.',
    role: 'Designed cross-platform Electron app core and video streaming pipelines.',
    outcome: 'Accelerated AI warning alert response times by 50% and boosted video frame processing throughput by 40%.',
    metrics: [
      { label: 'Warning Latency', value: '-50%' },
      { label: 'Inference Boost', value: '+40%' },
      { label: 'Platform Support', value: 'Cross-Platform' }
    ],
    tags: ['Electron.js', 'Node.js', 'SQLite', 'RTSP', 'GStreamer', 'OpenCV'],
    featured: false
  },
  {
    id: 'helpdesk-system',
    title: 'Helpdesk Support System',
    subtitle: 'Enterprise IT Incident & Ticket Governance Engine',
    category: 'SAAS',
    topology: [
      { step: '01. INCIDENT REPORT', detail: 'Slack & MS Teams Webhooks' },
      { step: '02. WEBSOCKET ROUTER', detail: 'Real-Time Notification Layer' },
      { step: '03. ACCESS GUARD', detail: 'Dynamic RBAC Ticket Governance' },
      { step: '04. STORAGE', detail: 'MongoDB Indexed Collections' }
    ],
    architecture: 'Node.js Event Loop · WebSocket Dispatcher · Third-Party Bot Integrations',
    problem: 'Support ticket routing bottlenecks delayed IT incident resolution across distributed enterprise teams.',
    role: 'Engineered role-based access, REST APIs, real-time WebSocket notifications, and Slack/Teams integrations.',
    outcome: 'Reduced ticket response time by 30% and elevated operational efficiency by 25%.',
    metrics: [
      { label: 'Response Time', value: '-30%' },
      { label: 'Operational Gain', value: '+25%' },
      { label: 'Integrations', value: 'Slack & Teams' }
    ],
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'WebSockets', 'Slack API', 'MS Teams'],
    featured: false
  },
  {
    id: 'quotation-manager',
    title: 'Quotation Manager (BAP-TOOL)',
    subtitle: 'Automated Proposal & Manufacturing Quotation Engine',
    category: 'SAAS',
    topology: [
      { step: '01. PRICING INPUT', detail: 'Multi-Stage Manufacturing Config' },
      { step: '02. EXPRESS ENGINE', detail: 'Automated Cost Calculation' },
      { step: '03. S3 PDF VAULT', detail: 'Secure PDF Document Rendering' },
      { step: '04. TOKEN AUTH', detail: 'JWT Authorization Scope' }
    ],
    architecture: 'Express.js Pipeline · AWS S3 Asset Storage · Token Authentication',
    problem: 'Manual pricing calculations across multi-stage manufacturing resulted in quotation delays and billing discrepancies.',
    role: 'Engineered quotation workflow engine with token authentication and automated AWS S3 document rendering.',
    outcome: 'Increased proposal turnaround speed by 40% and improved security compliance scores.',
    metrics: [
      { label: 'Proposal Speed', value: '+40%' },
      { label: 'Document Storage', value: 'AWS S3' },
      { label: 'Security Scope', value: 'Token Auth' }
    ],
    tags: ['Node.js', 'Angular', 'TypeScript', 'MongoDB', 'AWS S3', 'JWT'],
    featured: false
  }
]
