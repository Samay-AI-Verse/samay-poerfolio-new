import { useEffect, useRef, useState } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: '01',
    title: 'Sanjeevani',
    category: 'Healthcare AI Ecosystem',
    desc: 'A multi-tenant healthcare delivery dashboard optimizing pharmaceutical supply chains with AI-driven inventory, WhatsApp ordering, and RAG-powered medicine recommendations.',
    tags: ['React', 'FastAPI', 'LangChain', 'PostgreSQL'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse',
    image: '/proj_sanjeevani_new.png',
  },
  {
    id: '02',
    title: 'ChetanaLabs',
    category: 'Voice AI / HR Tech',
    desc: 'AI-powered HR voice assistant automating candidate screening, outbound calling workflows, and intelligent interview scheduling at scale.',
    tags: ['Vapi AI', 'NLP', 'LangChain', 'FastAPI'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse/ChetanaLabs-',
    image: '/proj_chetanalabs.png',
  },
  {
    id: '03',
    title: 'Trinetra System',
    category: 'Drone Tech / Surveillance',
    desc: 'AI-enabled drone ecosystem with real-time telemetry, live video streaming, object detection, and autonomous surveillance capabilities.',
    tags: ['Python', 'YOLO', 'OpenCV', 'Edge AI'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse',
    image: '/proj_trinetra.png',
  },
  {
    id: '04',
    title: 'Sarathi Astra',
    category: 'RAG / Document Intelligence',
    desc: 'Advanced NotebookLM-style RAG system for document intelligence. Interacts with PDFs via contextual Q&A and semantic data extraction.',
    tags: ['LangChain', 'Pinecone', 'FastAPI', 'LLMs'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse/Sarthi-Astra',
    image: '/proj_sarathi.png',
  },
  {
    id: '05',
    title: 'SHAKTI',
    category: 'Women Safety AI',
    desc: 'AI-powered women safety platform with emergency triggers, real-time situational awareness, and automated community alert system.',
    tags: ['Python', 'YOLO', 'Edge AI', 'React'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse/Chatbot-Women-Sefty',
    image: '/proj_loan.png',
  },
  {
    id: '06',
    title: 'BugSentry',
    category: 'VS Code Extension / DevTools',
    desc: 'A VS Code extension that uses AI to detect bugs in real-time as you write code — pinpoints issues, explains root causes, and suggests intelligent fixes.',
    tags: ['TypeScript', 'VS Code API', 'OpenAI', 'LLMs'],
    live: '#',
    github: 'https://github.com/Samay-AI-Verse',
    image: '/proj_bugsentry.png',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        // Show fixed panel only when the section's TOP edge has crossed the viewport top
        // AND the section's bottom is still visible → fully "inside" the section
        const isFullyIn = sectionTop <= 0 && sectionBottom > window.innerHeight * 0.3;
        setPanelVisible(isFullyIn);

        // Find the closest item to 40% down the viewport
        const items = section.querySelectorAll('.proj-item');
        if (!items.length) return;

        const viewportTarget = window.innerHeight * 0.4;
        let closestIndex = 0;
        let closestDist = Infinity;

        items.forEach((item, i) => {
          const r = item.getBoundingClientRect();
          const itemMid = r.top + r.height / 2;
          const dist = Math.abs(itemMid - viewportTarget);
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        setActiveIndex(closestIndex);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>

      {/*
        Fixed panel + sidebar are rendered INSIDE the section element.
        They use position:fixed so they stay on screen while scrolling
        through the section, but are hidden (opacity-0 / pointer-events-none)
        when the section isn't fully in view — preventing bleed onto Services.
      */}

      {/* ── Right-edge vertical label + progress bar ── */}
      <aside
        className={`proj-aside${panelVisible ? ' proj-aside--on' : ''}`}
        aria-hidden="true"
      >
        <span className="proj-aside-label">Projects</span>
        <div className="proj-aside-rail">
          <div
            className="proj-aside-fill"
            style={{ height: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }}
          />
        </div>
      </aside>

      {/* ── Floating preview card ── */}
      <div
        className={`proj-preview${panelVisible ? ' proj-preview--on' : ''}`}
        aria-hidden="true"
      >
        <div className="proj-preview-meta">
          <span className="proj-preview-badge">PREVIEW</span>
        </div>
        <div className="proj-preview-frame">
          {PROJECTS.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt={p.title}
              draggable="false"
              className={
                'proj-preview-img' +
                (i === activeIndex ? ' is-active' : i < activeIndex ? ' is-past' : '')
              }
            />
          ))}
        </div>
        <div className="proj-preview-tags">
          {activeProject.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* ── Left: header + list ── */}
      <div className="proj-inner">
        <header className="proj-header">
          <span className="proj-header-eyebrow">Selected Work</span>
          <div className="proj-header-count">{PROJECTS.length.toString().padStart(2, '0')}+</div>
        </header>

        <div className="proj-list" role="list">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={`proj-item${index === activeIndex ? ' is-active' : ''}`}
              role="listitem"
            >
              <div className="proj-item-rule" />
              <div className="proj-item-row">
                <span className="proj-item-num">({project.id})</span>
                <div className="proj-item-body">
                  <h3 className="proj-item-title">{project.title}</h3>
                  <p className="proj-item-cat">{project.category}</p>
                </div>
                <div className="proj-item-actions">
                  <a
                    href={project.live}
                    className="proj-item-link"
                    aria-label={`Live demo — ${project.title}`}
                  >
                    Live
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={project.github}
                    className="proj-item-link"
                    aria-label={`GitHub — ${project.title}`}
                  >
                    GitHub
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="proj-item-expand">
                <p>{project.desc}</p>
              </div>
            </article>
          ))}
          <div className="proj-item-rule" />
        </div>
      </div>

    </section>
  );
}
