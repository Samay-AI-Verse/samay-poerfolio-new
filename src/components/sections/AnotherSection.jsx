import { useEffect, useRef, useState } from 'react';
import './AnotherSection.css';

const COLUMN_1 = [
  { src: '/highlights/depex_main.jpeg', alt: 'DIPEX 2026 Innovation Hub' },
  { src: '/highlights/depex_1.jpeg', alt: 'DIPEX 2026 Showcase - MIT Nanded' },
  { src: '/highlights/hackfusion.jpeg', alt: 'Hackfusion 3.0 - SGGS Nanded' },
  { src: '/highlights/depex_mit.jpeg', alt: 'Innovation Pavilion - MIT (DIPEX 2026)' },
];

const COLUMN_2 = [
  { src: '/highlights/depex_2.jpeg', alt: 'Technical Exhibit - DIPEX 2026' },
  { src: '/highlights/itm_collage.jpeg', alt: 'Project Competition - ITM College Nanded' },
  { src: '/highlights/sggs.jpeg', alt: 'Campus Highlights - SGGS Nanded' },
  { src: '/highlights/depex_main.jpeg', alt: 'DIPEX 2026 Innovation Hub' },
];

const COLUMN_3 = [
  { src: '/highlights/depex_3.jpeg', alt: 'State-Level Project Competition' },
  { src: '/highlights/depex_mit.jpeg', alt: 'Innovation Pavilion - MIT (DIPEX 2026)' },
  { src: '/highlights/hackfusion.jpeg', alt: 'Hackfusion 3.0 - SGGS Nanded' },
  { src: '/highlights/depex_1.jpeg', alt: 'DIPEX 2026 Showcase - MIT Nanded' },
];

// Repeat 3 times for seamless looping
const LOOPED_COL_1 = [...COLUMN_1, ...COLUMN_1, ...COLUMN_1];
const LOOPED_COL_2 = [...COLUMN_2, ...COLUMN_2, ...COLUMN_2];
const LOOPED_COL_3 = [...COLUMN_3, ...COLUMN_3, ...COLUMN_3];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function AnotherSection() {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const next = clamp(-rect.top / scrollable);
      setProgress(next);
      section.style.setProperty('--another-progress', next.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const count = Math.round(10 + progress * 16);

  return (
    <section className="another-gallery-section" ref={sectionRef} aria-label="Achievements Showcase Gallery">
      <div className="another-gallery-sticky">
        <div className="another-gallery-vignette" />

        <div className="another-gallery-counter" aria-hidden="true">
          DIPEX_2K26_{count}
        </div>

        <div className="another-gallery-copy">
          <p>
            Exhibitions &amp; <em>Hackathons</em>
            <br />
            representing real-world
            <br />
            <strong>innovations</strong>.
          </p>
        </div>

        {/* 3D Tilted Stage */}
        <div className="another-gallery-stage" aria-hidden="true">
          
          {/* Column 1 Wrapper */}
          <div className="another-column-wrapper column-left-wrapper">
            <div className="another-gallery-column another-column-left">
              {LOOPED_COL_1.map((image, index) => (
                <div className="another-card-wrapper" key={`another1-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    className="another-card"
                  />
                  <span className="another-card-glare" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 Wrapper */}
          <div className="another-column-wrapper column-center-wrapper">
            <div className="another-gallery-column another-column-center">
              {LOOPED_COL_2.map((image, index) => (
                <div className="another-card-wrapper" key={`another2-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    className="another-card"
                  />
                  <span className="another-card-glare" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 Wrapper */}
          <div className="another-column-wrapper column-right-wrapper">
            <div className="another-gallery-column another-column-right">
              {LOOPED_COL_3.map((image, index) => (
                <div className="another-card-wrapper" key={`another3-${index}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    className="another-card"
                  />
                  <span className="another-card-glare" />
                </div>
              ))}
            </div>
          </div>

        </div>

        <aside className="another-gallery-aside" aria-hidden="true">
          <div className="another-gallery-rail">
            <span />
          </div>
          <strong>Achievements</strong>
        </aside>
      </div>
    </section>
  );
}
