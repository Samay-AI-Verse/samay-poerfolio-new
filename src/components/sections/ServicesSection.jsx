import { useEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import './ServicesSection.css';

const SERVICES = [
  {
    id: 1,
    title: 'AI Applications',
    kicker: 'INTELLIGENT SYSTEMS',
    desc: 'I build LLM-powered products, RAG pipelines, agents, and automation layers that turn rough workflows into usable software.',
    cta: 'More about AI Apps',
    image: '/service_ai.png',
  },
  {
    id: 2,
    title: 'Full Stack Development',
    kicker: 'PRODUCT ENGINEERING',
    desc: 'React interfaces, backend APIs, dashboards, and cloud-ready platforms designed to feel fast, polished, and practical.',
    cta: 'More about Full Stack',
    image: '/service_fullstack.png',
  },
  {
    id: 3,
    title: 'Software Development',
    kicker: 'CUSTOM SOFTWARE',
    desc: 'Custom tools, scalable services, integrations, microservices, and data pipelines made for daily work instead of demos.',
    cta: 'More about Software',
    image: '/service_software.png',
  },
  {
    id: 4,
    title: 'Windows Applications',
    kicker: 'DESKTOP BUILDS',
    desc: 'Modern Windows applications with smooth UI, local data handling, automation hooks, and system integrations.',
    cta: 'More about Windows Apps',
    image: '/service_windows.png',
  },
  {
    id: 5,
    title: 'Android Development',
    kicker: 'MOBILE PRODUCTS',
    desc: 'Android apps with sharp UX, API integrations, real-time sync, useful flows, and reliable release builds.',
    cta: 'More about Android',
    image: '/service_android.png',
  },
  {
    id: 6,
    title: 'WhatsApp Chatbot',
    kicker: 'CHAT AUTOMATION',
    desc: 'AI-powered WhatsApp bots for voice, text, bookings, support, ordering, and smart customer automation.',
    cta: 'More about Chatbots',
    image: '/service_whatsapp.png',
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
  const imageLayers = useMemo(() => {
    const baseIndex = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(serviceProgress)));
    const nextIndex = Math.min(SERVICES.length - 1, baseIndex + 1);
    const phase = Math.min(1, Math.max(0, serviceProgress - baseIndex));

    if (baseIndex === nextIndex) {
      return [
        {
          service: SERVICES[baseIndex],
          state: 'current',
          progress: 0,
          style: {
            '--img-y': '0px',
            '--img-scale': 1,
            '--img-opacity': 1,
            '--img-rotate': '0deg',
            '--img-blur': '0px',
            '--img-z': 16,
          },
        },
      ];
    }

    return [
      {
        service: SERVICES[baseIndex],
        state: 'current',
        progress: phase,
        style: {
          '--img-y': `${phase * -72}px`,
          '--img-scale': 1 - phase * 0.035,
          '--img-opacity': 1 - phase * 0.38,
          '--img-rotate': `${phase * 2.2}deg`,
          '--img-blur': `${phase * 4}px`,
          '--img-z': 15,
        },
      },
      {
        service: SERVICES[nextIndex],
        state: 'next',
        progress: phase,
        style: {
          '--img-y': `${(1 - phase) * 148}px`,
          '--img-scale': 0.93 + phase * 0.07,
          '--img-opacity': 0.18 + phase * 0.82,
          '--img-rotate': `${-4 + phase * 4}deg`,
          '--img-blur': `${(1 - phase) * 6}px`,
          '--img-z': 16,
        },
      },
    ];
  }, [serviceProgress]);

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
            <div className="srv-image-stack">
              <div className="srv-image-shadow" />
              <div className="srv-scan" aria-hidden="true" />
              <div className="srv-pixel-row" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              {imageLayers.map(({ service, state, style }) => (
                <img
                  key={`${service.id}-${state}`}
                  src={service.image}
                  alt={`${service.title} preview`}
                  className={`srv-image is-${state}`}
                  style={style}
                  draggable="false"
                />
              ))}
            </div>
          </div>

          <article className="srv-copy" key={activeService.id}>
            <div className="srv-love" aria-hidden="true">
              <span>WHAT I BUILD</span>
              <span>IS WHAT I LOVE</span>
              <b>/</b>
            </div>
            <p className="srv-desc">{activeService.desc}</p>
            <a className="srv-cta" href="#contact">
              {activeService.cta}
              <span />
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
              <img src={service.image} alt={`${service.title} preview`} loading="lazy" />
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
