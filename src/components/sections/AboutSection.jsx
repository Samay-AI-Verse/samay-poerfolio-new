import React from 'react';
import './AboutSection.css';
import bgPhoto from '../../assets/SGGS.jpeg';

const SPECIALIZATIONS = [
  {
    tag: 'Intelligence',
    title: 'AI Engineering',
    desc: 'Specializing in LLM Fine-tuning, RAG pipelines, and Vector Database integration for intelligent systems.',
  },
  {
    tag: 'Architecture',
    title: 'Backend & Infrastructure',
    desc: 'Building robust server-side logic with Python and FastAPI, ensuring high-performance API orchestration.',
  },
  {
    tag: 'Systems',
    title: 'Agentic Workflows',
    desc: 'Designing multi-agent systems that automate complex business processes via voice and chat.',
  },
  {
    tag: 'DevOps',
    title: 'Full-Stack Deployment',
    desc: 'Managing the full lifecycle from Dockerization to Cloud deployment (AWS / Hugging Face) for scalable apps.',
  },
];

const PROJECTS = [
  {
    name: 'RAG Intel Engine',
    desc: 'High-density document system for querying private data with context-aware retrieval.',
  },
  {
    name: 'Voice AI Pipeline',
    desc: 'End-to-end speech and NLP automation for real-time conversational agents.',
  },
  {
    name: 'Sanjeevani AI OS',
    desc: 'Integrated pharmacy operating system for managing orders, refills, and inventory.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="about-section">

      {/* SGGS backdrop */}
      <div className="about-bg-photo" style={{ backgroundImage: `url(${bgPhoto})` }} />

      <div className="about-inner">

        {/* ── TOP STATUS BAR ── */}
        <div className="about-statusbar">
          <span className="sb-item">CONTACT</span>
          <span className="sb-sep">·</span>
          <span className="sb-item sb-name">Samay™</span>
          <span className="sb-sep">·</span>
          <span className="sb-item">AI Engineer</span>
          <div className="sb-right">
            <span className="sb-code">NS-ACT: 664 / 453</span>
            <span className="sb-sep">|</span>
            <span className="sb-code">SENS_INIT_TRUE</span>
          </div>
        </div>

        {/* ── HERO HEADLINE ── */}
        <div className="about-hero">
          <p className="about-precision">Precision in Data. Innovation in AI.</p>
          <h2 className="about-headline">
            Building<br />Intelligence.<br />
            <span>Engineered for Scale.</span>
          </h2>
          <p className="about-tagline">
            Crafting intelligent solutions — for a smarter future.
          </p>
        </div>

        {/* ── BIO + TAGS ── */}
        <div className="about-bio-row">
          <div className="about-bio">
            <p>
              I specialize in building production-ready systems with LLMs and Agentic Workflows.
              From scalable backend pipelines to real-world deployments, I turn complex AI research
              into tangible business impact.
            </p>
            <div className="about-tags">
              <span>Backend Architecture</span>
              <span>AI Integration</span>
              <span>Cloud Deployment</span>
            </div>
            <div className="about-engine">
              <span className="engine-dot" />
              Core Engine Active
            </div>
          </div>
        </div>

        {/* ── SPECIALIZATIONS GRID ── */}
        <div className="spec-grid">
          {SPECIALIZATIONS.map(({ tag, title, desc }) => (
            <div className="spec-card" key={title}>
              <span className="spec-tag">{tag}</span>
              <h3 className="spec-title">{title}</h3>
              <p className="spec-desc">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── DIVIDER ── */}
        <div className="about-divider">
          <span>Presence Hub</span>
        </div>

        {/* ── ORIGIN + PROJECTS ── */}
        <div className="about-bottom-row">

          {/* LEFT — Origin */}
          <div className="origin-col">
            <h3 className="origin-title">Samay Powade</h3>
            <p className="origin-sub">Origin &amp; Focus</p>
            <div className="origin-detail">
              <p className="origin-fullname">Samay Santosh Powade</p>
              <p className="origin-bio">
                B.Tech 3rd Year · AI &amp; Computer Engineering<br />
                <span className="origin-college">Gramin Technical &amp; Management Science College</span><br />
                <span className="origin-campus">Maneeg Campus</span>
              </p>
              <p className="origin-bio" style={{ marginTop: '18px' }}>
                I'm an AI Engineer focused on building real-world AI systems using LLMs and
                retrieval-based workflows. I develop applications that connect conversational AI
                with structured data, turning prototypes into production-ready systems.
              </p>
              <div className="origin-meta">
                <div><span>Focus:</span> Agentic Workflows &amp; Backend Reliability</div>
                <div><span>Stack:</span> FastAPI · Python · AWS · Docker</div>
              </div>
              <p className="origin-note">
                I work across the full pipeline — from designing AI workflows to building the
                high-concurrency backend systems that support real-world use.
              </p>
            </div>
          </div>

          {/* RIGHT — Projects */}
          <div className="projects-col">
            <h3 className="projects-label">My Core Work</h3>
            {PROJECTS.map(({ name, desc }) => (
              <div className="project-card" key={name}>
                <h4 className="project-name">{name}</h4>
                <p className="project-desc">{desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
