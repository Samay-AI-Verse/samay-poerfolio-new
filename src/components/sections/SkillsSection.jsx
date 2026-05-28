import { useEffect, useRef, useState } from 'react';
import './SkillsSection.css';

const SKILLS_DATA = [
  {
    id: 'ai-development',
    category: 'AI & Agentic',
    skills: [
      'Gemini & OpenAI',
      'Claude & Ollama',
      'LangChain & LangGraph',
      'RAG Pipelines',
      'Qdrant & Vector DBs',
      'Agentic Workflows',
      'Structured Outputs',
      'Streamlit Interfaces'
    ]
  },
  {
    id: 'frontend',
    category: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP Animations',
      'Electron Apps'
    ]
  },
  {
    id: 'backend',
    category: 'Backend',
    skills: [
      'Python',
      'FastAPI',
      'Flask',
      'Node.js',
      'Express.js',
      'WebSockets',
      'JWT Security'
    ]
  },
  {
    id: 'databases',
    category: 'Databases',
    skills: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Supabase',
      'Redis Caching',
      'Vector Search'
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Tools',
    skills: [
      'Docker',
      'Git & GitHub',
      'GitHub Actions',
      'Vercel & Netlify',
      'Google Cloud (GCP)',
      'Linux & Bash'
    ]
  }
];

export default function SkillsSection({ onContactClick }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Recalculates the scroll track height dynamically when layout shifts (e.g. accordion open/close)
  const updateTrackDimensions = () => {
    if (trackRef.current && sectionRef.current) {
      const height = trackRef.current.scrollHeight;
      sectionRef.current.style.setProperty('--track-height', `${height}px`);
    }
  };

  useEffect(() => {
    updateTrackDimensions();
  }, [activeIndex]);

  useEffect(() => {
    const handleScrollAndProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      // Only calculate if the section is in viewport or scrolled past
      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min(-rect.top / Math.max(scrollableHeight, 1), 1);
      }

      // Sync progress value as a CSS property for hardware-accelerated scrolls
      section.style.setProperty('--skills-progress', progress.toFixed(4));

      // Dynamic scroll percentage state (0 to 100)
      const percent = Math.min(Math.round(progress * 100), 100);
      setScrollPercent(percent);

      // Map progress to the active highlighted index
      const count = SKILLS_DATA.length;
      const activeIdx = Math.min(Math.floor(progress * count), count - 1);
      setActiveIndex(activeIdx);
    };

    const triggerRafUpdate = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScrollAndProgress);
    };

    // Calculate dimensions on mount
    updateTrackDimensions();
    handleScrollAndProgress();

    window.addEventListener('scroll', triggerRafUpdate, { passive: true });
    window.addEventListener('resize', () => {
      updateTrackDimensions();
      triggerRafUpdate();
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', triggerRafUpdate);
      window.removeEventListener('resize', () => {
        updateTrackDimensions();
        triggerRafUpdate();
      });
    };
  }, []);

  // Smooth scroll handler to jump the viewport directly to the active progress section
  const handleCategoryClick = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth > 1024) {
      const rect = section.getBoundingClientRect();
      const sectionAbsoluteTop = window.pageYOffset + rect.top;
      const scrollableHeight = rect.height - window.innerHeight;
      
      const targetProgress = index / SKILLS_DATA.length;
      // scroll and center the clicked category
      const targetScrollPosition = sectionAbsoluteTop + (targetProgress * scrollableHeight) + 15;

      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    } else {
      // Mobile behavior: Manual toggling
      setActiveIndex(index);
    }
  };

  return (
    <section className="skills-scroll-section" id="skills" ref={sectionRef}>
      <div className="skills-sticky-wrapper">
        <div className="skills-inner-layout">
          
          {/* LEFT COLUMN: Sticky Context Info */}
          <div className="skills-left-col">
            <div className="skills-left-percentage" aria-hidden="true">
              ({scrollPercent.toString().padStart(2, '0')})
            </div>
            
            <div className="skills-left-content">
              <span className="skills-eyebrow-label">Skills</span>
              <h2 className="skills-main-desc">
                AI ENGINEER &amp; FULL STACK DEVELOPER, SPECIALIZED IN AGENTIC AI &amp; LARGE LANGUAGE MODELS, PASSIONATE ABOUT BUILDING INTELLIGENT APPLICATIONS AND SEAMLESS WEB EXPERIENCE.
              </h2>
              <a href="#contact" className="skills-contact-link" onClick={onContactClick}>
                CONTACT ME <span className="sparkle">✦</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Focusing Scroll Track */}
          <div className="skills-right-col">
            <div className="skills-scroll-track" ref={trackRef}>
              {SKILLS_DATA.map((group, index) => {
                const isOpen = index === activeIndex;
                return (
                  <div
                    key={group.id}
                    className={`skills-category-row ${isOpen ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(index)}
                  >
                    <div className="skills-category-header">
                      <h3 className="skills-category-title">{group.category}</h3>
                      <span className="skills-toggle-icon" aria-hidden="true">
                        {isOpen ? '—' : '+'}
                      </span>
                    </div>

                    <div className={`skills-list-container ${isOpen ? 'open' : ''}`}>
                      <div className="skills-list-inner">
                        {group.skills.map((skill, sIdx) => (
                          <div key={sIdx} className="skill-item">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC SCROLL BAR ON THE EXTREME RIGHT EDGE */}
          <div className="skills-vertical-scrollbar" aria-hidden="true">
            <span className="skills-vertical-label">Skills</span>
            <div className="skills-vertical-track">
              <div
                className="skills-vertical-thumb"
                style={{ height: `${scrollPercent}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
