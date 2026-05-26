import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import './ServicesSection.css';

const SERVICES = [
  {
    id: 1,
    title: 'AI Applications',
    kicker: 'INTELLIGENT SYSTEMS',
    desc: 'I build LLM-powered products, RAG pipelines, smart agents, and automation layers that connect real data with useful workflows. The focus is on practical AI tools that feel fast, reliable, and easy to use.',
  },
  {
    id: 2,
    title: 'Full Stack Development',
    kicker: 'PRODUCT ENGINEERING',
    desc: 'I create React interfaces, backend APIs, dashboards, and cloud-ready platforms with clean structure from front to back. Every build is shaped for performance, maintainability, and a smooth user experience.',
  },
  {
    id: 3,
    title: 'Software Development',
    kicker: 'CUSTOM SOFTWARE',
    desc: 'I develop custom tools, scalable services, integrations, microservices, and data pipelines that support daily operations. The goal is software that solves a real problem and stays simple to operate.',
  },
  {
    id: 4,
    title: 'Windows Applications',
    kicker: 'DESKTOP BUILDS',
    desc: 'I build modern Windows applications with smooth UI, local data handling, automation hooks, and system integrations. These apps are designed for focused desktop workflows where speed and stability matter.',
  },
  {
    id: 5,
    title: 'Android Development',
    kicker: 'MOBILE PRODUCTS',
    desc: 'I design and develop Android apps with sharp UX, API integrations, real-time sync, and useful mobile flows. The result is a clean app experience that works well across everyday screens.',
  },
  {
    id: 6,
    title: 'WhatsApp Chatbot',
    kicker: 'CHAT AUTOMATION',
    desc: 'I build AI-powered WhatsApp bots for voice, text, bookings, support, ordering, and customer automation. They can answer common questions, collect details, trigger workflows, and hand off complex cases when needed.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [sceneProgress, setSceneProgress] = useState(0);
  const serviceProgress = sceneProgress * (SERVICES.length - 1);
  const activeIndex = Math.min(
    SERVICES.length - 1,
    Math.max(0, Math.floor(serviceProgress + 0.48))
  );
  const activeService = SERVICES[activeIndex];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.82,
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1.08,
      touchMultiplier: 1.35,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, -rect.top / scrollable));
      setSceneProgress(next);
      section.style.setProperty('--srv-progress', next.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      className="srv-section"
      id="services"
      ref={sectionRef}
      style={{ '--srv-count': SERVICES.length }}
    >
      <div className="srv-sticky">
        <div className="srv-noise" aria-hidden="true" />

        <div className="srv-brand" aria-hidden="true">
          <span>samay</span>
        </div>

        <div className="srv-grid">
          <aside className="srv-menu" aria-label="Services">
            <span className="srv-menu-label">SERVICES</span>
            <div className="srv-menu-list">
              {SERVICES.map((service, index) => (
                <a
                  href="#services"
                  className={`srv-menu-item${index === activeIndex ? ' is-active' : ''}`}
                  key={service.id}
                  onClick={(event) => {
                    event.preventDefault();
                    const section = sectionRef.current;
                    if (!section) return;

                    const scrollable = section.offsetHeight - window.innerHeight;
                    const target = section.offsetTop + scrollable * (index / (SERVICES.length - 1));
                    window.scrollTo({ top: target, behavior: 'smooth' });
                  }}
                >
                  <span>{index === activeIndex ? '->' : ''}</span>
                  {service.title}
                </a>
              ))}
            </div>
          </aside>

          <div className="srv-stage" aria-live="polite">
            <h2 className="srv-counter">
              06+<br />
              Services
            </h2>
          </div>

          <article className="srv-copy" key={activeService.id}>
            <div className="srv-love" aria-hidden="true">
              <span>WHAT I BUILD</span>
              <span>IS WHAT I LOVE</span>
              <b>/</b>
            </div>
            <p className="srv-desc">{activeService.desc}</p>
            <a className="srv-cta" href="#projects">
              See my work
            </a>
          </article>
        </div>

        <footer className="srv-footer" aria-hidden="true">
          <div>
            <span>SERVICES SNAP</span>
            <i />
            <i />
            <i />
          </div>
          <strong>{activeService.title}</strong>
        </footer>

        <div className="srv-mobile-list">
          {SERVICES.map((service, index) => (
            <article className="srv-mobile-card" key={service.id} style={{ '--i': index }}>
              <span>{service.kicker}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
