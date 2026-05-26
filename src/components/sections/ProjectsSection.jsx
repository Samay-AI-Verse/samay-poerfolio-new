import { useEffect, useRef, useState, useCallback } from 'react';
import './ProjectsSection.css';

const PROJECTS = [
  {
    id: '01',
    year: '2024',
    title: 'Sanjeevani',
    category: 'AI Pharmacy OS',
    desc: 'A pharmacy intelligence system with WhatsApp ordering, voice flows, medicine recommendations, RAG search, and operating dashboards.',
    tags: ['React', 'FastAPI', 'LangChain', 'PostgreSQL'],
    live: '#',
    github: '#',
    image: '/proj_sanjeevani.png',
  },
  {
    id: '02',
    year: '2024',
    title: 'Voice AI Agent',
    category: 'Conversational AI',
    desc: 'A real-time agent for multi-turn speech, tool calls, workflow automation, and intent-aware customer journeys.',
    tags: ['OpenAI', 'ElevenLabs', 'LangGraph', 'WebSocket'],
    live: '#',
    github: '#',
    image: '/proj_voice.png',
  },
  {
    id: '03',
    year: '2024',
    title: 'RAG Knowledge Engine',
    category: 'Knowledge Intelligence',
    desc: 'A retrieval platform that turns documents, sites, and structured records into grounded answers and semantic operations.',
    tags: ['Qdrant', 'Embeddings', 'FastAPI', 'Pinecone'],
    live: '#',
    github: '#',
    image: '/proj_rag.png',
  },
  {
    id: '04',
    year: '2024',
    title: 'WhatsApp AI Bot',
    category: 'Messaging Automation',
    desc: 'An LLM-powered support and ordering assistant with escalation, structured automations, and a clean backend API layer.',
    tags: ['WhatsApp API', 'Redis', 'React', 'PostgreSQL'],
    live: '#',
    github: '#',
    image: '/proj_whatsapp.png',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageVisible, setImageVisible] = useState(false);
  const [imageStyle, setImageStyle] = useState({});
  const rafRef = useRef(null);
  const targetActiveRef = useRef(0);
  const currentActiveRef = useRef(0);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveItem);
    };

    const updateActiveItem = () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll('.proj-item');
      if (!items.length) return;

      const viewportMid = window.innerHeight * 0.42;
      let closestIndex = 0;
      let closestDist = Infinity;

      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemMid = rect.top + rect.height / 2;
        const dist = Math.abs(itemMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveItem();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Image panel visibility based on section in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setImageVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="proj-section" ref={sectionRef}>

      {/* Right side vertical label */}
      <div className="proj-side-label" aria-hidden="true">Projects</div>

      {/* Vertical progress bar */}
      <div className="proj-progress-rail" aria-hidden="true">
        <div
          className="proj-progress-fill"
          style={{ height: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }}
        />
      </div>

      {/* Sticky image preview panel */}
      <div className={`proj-preview-panel${imageVisible ? ' is-visible' : ''}`} aria-hidden="true">
        <div className="proj-preview-meta">
          <span className="proj-preview-id">{PROJECTS[activeIndex].id} {PROJECTS[activeIndex].year}</span>
          <span className="proj-preview-label">PREVIEW</span>
        </div>
        <div className="proj-preview-frame">
          {PROJECTS.map((project, i) => (
            <img
              key={project.id}
              src={project.image}
              alt={project.title}
              className={`proj-preview-img${i === activeIndex ? ' is-active' : ''}`}
              draggable="false"
            />
          ))}
        </div>
        <div className="proj-preview-tags">
          {PROJECTS[activeIndex].tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div className="proj-header">
        <div className="proj-header-left">
          <span className="proj-header-eyebrow">Selected Work</span>
        </div>
        <div className="proj-header-right">
          <h2 className="proj-header-title">Projects</h2>
          <p className="proj-header-count">({PROJECTS.length.toString().padStart(2, '0')})</p>
        </div>
      </div>

      {/* Projects list */}
      <div className="proj-list" ref={listRef}>
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className={`proj-item${index === activeIndex ? ' is-active' : ''}`}
          >
            <div className="proj-item-divider" />
            <div className="proj-item-inner">
              <div className="proj-item-left">
                <span className="proj-item-num">({parseInt(project.id, 10).toString().padStart(2, '0')})</span>
              </div>
              <div className="proj-item-center">
                <h3 className="proj-item-title">{project.title}</h3>
                <p className="proj-item-category">{project.category}</p>
              </div>
              <div className="proj-item-right">
                <div className="proj-item-links">
                  <a href={project.live} className="proj-item-link" aria-label={`Live demo for ${project.title}`}>
                    <span>Live</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href={project.github} className="proj-item-link" aria-label={`GitHub for ${project.title}`}>
                    <span>GitHub</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            {/* Expanded description when active */}
            <div className="proj-item-desc">
              <p>{project.desc}</p>
            </div>
          </div>
        ))}
        <div className="proj-item-divider" />
      </div>

    </section>
  );
}
