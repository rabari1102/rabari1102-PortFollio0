import Reveal from './ui/Reveal'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-editorial-grid">
          <Reveal direction="up">
            <div className="about-num-badge">01 · ABOUT STORY</div>
            <h2 className="about-statement font-heading">
              I don't just write code.<br />
              <span className="gradient-text">I architect resilient systems.</span>
            </h2>
          </Reveal>

          <div className="about-story-col">
            <Reveal direction="up" delay={0.1}>
              <p className="about-lead">
                I am a <strong>Full-Stack Engineer & Team Lead</strong> based in Ahmedabad, India, specializing in enterprise B2B multi-tenant platforms, high-throughput microservices, sub-millisecond access governance, and AI-augmented developer workflows.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="about-body">
                Over the past <strong>3.7+ years</strong>, I’ve engineered platforms like <strong>BeSecure</strong> (multi-tenant security & IAM governance), architected IoT systems handling <strong>5,000+ live telemetry sensors</strong> with 99.9% uptime SLA, and led engineering teams of 6+ developers to boost application performance by 40%.
              </p>
            </Reveal>

            <div className="about-pillars-grid">
              <Reveal direction="up" delay={0.3} className="pillar-card card-spotlight">
                <div className="pillar-num">01</div>
                <h3 className="pillar-title">Multi-Tenant IAM Security</h3>
                <p className="pillar-desc">Architecting fine-grained RBAC access control engines, explicit Deny rules, and sub-ms authorization route guards.</p>
              </Reveal>

              <Reveal direction="up" delay={0.4} className="pillar-card card-spotlight">
                <div className="pillar-num">02</div>
                <h3 className="pillar-title">Scalable Microservices</h3>
                <p className="pillar-desc">Building NestJS & Express microservices with PostgreSQL, MongoDB, Redis caching, and BullMQ async queues.</p>
              </Reveal>

              <Reveal direction="up" delay={0.5} className="pillar-card card-spotlight">
                <div className="pillar-num">03</div>
                <h3 className="pillar-title">Real-Time Telemetry</h3>
                <p className="pillar-desc">Scaling MQTT & WebSocket streaming pipelines serving 5,000+ concurrent IoT devices with 35% higher tracking efficiency.</p>
              </Reveal>

              <Reveal direction="up" delay={0.6} className="pillar-card card-spotlight">
                <div className="pillar-num">04</div>
                <h3 className="pillar-title">Engineering Leadership</h3>
                <p className="pillar-desc">Leading teams of 6+ developers, technical mentorship, code reviews, agile sprints, and 95% on-time milestone delivery.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
