import React from 'react';
import './projects.css';

const PROJECTS = [
  {
    num: '01',
    title: 'Sanjeevani',
    subtitle: 'AI-Powered Pharmacy Platform',
    desc: 'Full-stack pharmacy ecosystem with WhatsApp chatbot, voice ordering assistant, real-time delivery tracking, and an AI-driven medicine recommendation engine built on RAG pipelines.',
    tags: ['FastAPI', 'LangChain', 'WhatsApp API', 'React', 'PostgreSQL', 'Docker'],
    link: '#',
    color: '#f5a623',
  },
  {
    num: '02',
    title: 'Voice AI Agent',
    subtitle: 'Conversational Agentic System',
    desc: 'A multi-modal AI agent that handles voice calls and WhatsApp messages — understands intent, queries live databases, books appointments, and escalates to human agents seamlessly.',
    tags: ['ElevenLabs', 'LangGraph', 'Twilio', 'OpenAI', 'Python', 'FastAPI'],
    link: '#',
    color: '#3b82f6',
  },
  {
    num: '03',
    title: 'RAG Knowledge Engine',
    subtitle: 'Document Intelligence Pipeline',
    desc: 'A production-grade retrieval-augmented generation system that ingests PDFs, websites, and structured data — enabling semantic search and context-aware Q&A over enterprise knowledge bases.',
    tags: ['Pinecone', 'LangChain', 'OpenAI', 'FastAPI', 'Qdrant', 'Python'],
    link: '#',
    color: '#a78bfa',
  },
];

export default function SkillsSection() {
  return (
    <section id="projects" className="projects-section">
      {/* Sticky header */}
      <div className="projects-header">
        <span className="projects-label">Selected Work</span>
        <h2 className="projects-title">Projects</h2>
      </div>

      {/* Stacked scroll cards */}
      <div className="projects-stack">
        {PROJECTS.map((project, i) => (
          <div
            className="project-card"
            key={project.num}
            style={{ '--accent': project.color, '--stack-index': i }}
          >
            <div className="project-card-inner">
              {/* Left: number */}
              <div className="project-num">{project.num}</div>

              {/* Center: info */}
              <div className="project-info">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: link */}
              <div className="project-actions">
                <a
                  href={project.link}
                  className="project-link-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Project ↗
                </a>
              </div>
            </div>

            {/* Accent line */}
            <div className="project-accent-line" />
          </div>
        ))}
      </div>
    </section>
  );
}
