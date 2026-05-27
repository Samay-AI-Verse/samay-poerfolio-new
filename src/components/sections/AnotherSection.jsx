import { useEffect, useRef, useState } from 'react';
import './AnotherSection.css';

const COLUMN_1 = [
  { src: '/covers/mario_kart_64.png', alt: 'Mario Kart 64' },
  { src: '/covers/goldeneye_007.png', alt: 'GoldenEye 007' },
  { src: '/covers/super_mario_64.png', alt: 'Super Mario 64' },
  { src: '/covers/zelda_oot.png', alt: 'The Legend of Zelda: Ocarina of Time' },
  { src: '/covers/goemon.png', alt: 'Ganbare Goemon' },
  { src: '/covers/perfect_dark.png', alt: 'Perfect Dark' },
];

const COLUMN_2 = [
  { src: '/covers/goemon.png', alt: 'Ganbare Goemon' },
  { src: '/covers/zelda_majora.png', alt: 'The Legend of Zelda: Majora\'s Mask' },
  { src: '/covers/perfect_dark.png', alt: 'Perfect Dark' },
  { src: '/covers/goemon_sugoroku.png', alt: 'Goemon Mononoke Sugoroku' },
  { src: '/covers/smash_bros.png', alt: 'Super Smash Bros.' },
  { src: '/covers/super_mario_64.png', alt: 'Super Mario 64' },
];

const COLUMN_3 = [
  { src: '/covers/zelda_oot.png', alt: 'The Legend of Zelda: Ocarina of Time' },
  { src: '/covers/smash_bros.png', alt: 'Super Smash Bros.' },
  { src: '/covers/1080_snowboarding.png', alt: '1080° Snowboarding' },
  { src: '/covers/mario_kart_64.png', alt: 'Mario Kart 64' },
  { src: '/covers/goldeneye_007.png', alt: 'GoldenEye 007' },
  { src: '/covers/zelda_majora.png', alt: 'The Legend of Zelda: Majora\'s Mask' },
];

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

  const count = Math.round(64 + progress * 34);

  return (
    <section className="another-gallery-section" ref={sectionRef} aria-label="Another Retro Gallery">
      <div className="another-gallery-sticky">
        <div className="another-gallery-vignette" />

        <div className="another-gallery-counter" aria-hidden="true">
          N64_JP_{count}
        </div>

        <div className="another-gallery-copy">
          <p>
            Retro <em>Aesthetics</em>
            <br />
            inspiring modern
            <br />
            <strong>innovations</strong>.
          </p>
        </div>

        {/* 3D Tilted Column Stage */}
        <div className="another-gallery-stage" aria-hidden="true">
          
          <div className="another-gallery-column another-column-left">
            {COLUMN_1.map((image, index) => (
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

          <div className="another-gallery-column another-column-center">
            {COLUMN_2.map((image, index) => (
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

          <div className="another-gallery-column another-column-right">
            {COLUMN_3.map((image, index) => (
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

        <aside className="another-gallery-aside" aria-hidden="true">
          <div className="another-gallery-rail">
            <span />
          </div>
          <strong>Retro Gallery</strong>
        </aside>
      </div>
    </section>
  );
}
