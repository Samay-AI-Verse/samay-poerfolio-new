import React from 'react';
import './AboutSection.css';

const CAPABILITIES = [
  {
    title: 'AI Systems',
    desc: 'RAG pipelines, LLM workflows, vector search, and applied automation.',
  },
  {
    title: 'Backend Engineering',
    desc: 'FastAPI, Python services, API orchestration, and production logic.',
  },
  {
    title: 'Agentic Workflows',
    desc: 'Voice and chat agents that connect tools, data, and business processes.',
  },
  {
    title: 'Deployment',
    desc: 'Docker, cloud hosting, monitoring basics, and release-ready delivery.',
  },
];

const SKILL_STRIP = ['Python', 'FastAPI', 'LangChain', 'Docker', 'AWS', 'React', 'PostgreSQL', 'OpenAI'];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-left">
          <span className="about-label">About Me</span>

          <h2 className="about-title">
            I build AI systems that connect data, automation, and backend workflows.
          </h2>

          <p className="about-bio">
            I work on AI products that connect language models, backend services,
            and structured data. My focus is simple: take a useful idea from
            prototype to a reliable system people can actually use.
          </p>

          <div className="about-profile-card">
            <div className="profile-card-row">
              <span>Education</span>
              <p>B.Tech 3rd Year - AI &amp; Computer Engineering</p>
            </div>
            <div className="profile-card-row">
              <span>College</span>
              <p>Gramin Technical &amp; Management Science College, Maneeg Campus</p>
            </div>
          </div>
        </div>

        <div className="about-right">
          <span className="block-label">What I Work On</span>
          <div className="spec-list">
            {CAPABILITIES.map(({ title, desc }) => (
              <div className="spec-item" key={title}>
                <span className="spec-index" />
                <div>
                  <p className="spec-title">{title}</p>
                  <p className="spec-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skill-marquee" aria-label="Core skills">
          <div className="skill-marquee-track">
            {[...SKILL_STRIP, ...SKILL_STRIP].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
