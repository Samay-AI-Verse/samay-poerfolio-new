import { useEffect, useRef } from 'react';
import './AnotherSection.css';

/* 
  ========================================================================
  💡 HOW TO ADD NEW IMAGES IN THE FUTURE:
  ========================================================================
  To add more achievement images:
  1. Upload your new image to the folder: public/highlights/
  2. Add a new object to HIGHLIGHT_MEDIA below.
     Example: { src: '/highlights/your_new_image.jpeg', alt: 'Your Image Description' }
  3. The code automatically splits them into 3 different looping columns.
  ========================================================================
*/

const HIGHLIGHT_MEDIA = [
  { src: '/highlights/20260411_111955 (1).jpg', alt: 'Exhibition floor prototype showcase' },
  { src: '/highlights/WhatsApp Image 2026-04-21 at 10.10.17 AM.jpeg', alt: 'Hackathon hardware setup' },
  { src: '/highlights/WhatsApp Image 2026-04-21 at 10.10.17 AM (1).jpeg', alt: 'Team prototype discussion' },
  { src: '/highlights/WhatsApp Image 2026-04-21 at 11.33.18 AM.jpeg', alt: 'Hardware prototype setup' },
  { src: '/highlights/depex_main.jpeg', alt: 'DIPEX 2026 Innovation Hub' },
  { src: '/highlights/depex_1.jpeg', alt: 'Prototype Demonstration MIT' },
  { src: '/highlights/depex_2.jpeg', alt: 'State-Level Project Exhibit' },
  { src: '/highlights/depex_3.jpeg', alt: 'State-Level Award Winner' },
  { src: '/highlights/depex_mit.jpeg', alt: 'Innovation Pavilion - MIT' },
  { src: '/highlights/hackfusion.jpeg', alt: 'Hackfusion 3.0 - SGGS Nanded' },
  { src: '/highlights/itm_collage.jpeg', alt: 'Project Competition - ITM College Nanded' },
  { src: '/highlights/sggs.jpeg', alt: 'Campus Highlights - SGGS Nanded' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.34 AM.jpeg', alt: 'Technical Project Presentation' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.38 AM.jpeg', alt: 'Active Robotics Team' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.39 AM.jpeg', alt: 'Technical Jury Assessment' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.40 AM.jpeg', alt: 'Visitors and panel review' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.44 AM.jpeg', alt: 'Interactive Exhibition Showcase' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.45 AM.jpeg', alt: 'Winner Team Celebration' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.41.25 AM.jpeg', alt: 'Electronics and coding implementation' },
  { src: '/highlights/WhatsApp Image 2026-05-28 at 12.41.26 AM.jpeg', alt: 'Grand Finale Showcase' },
  { src: '/highlights/WhatsApp Video 2026-05-28 at 12.41.12 AM.mp4', alt: 'Innovation Pitch Video', isVideo: true },
  { src: '/highlights/WhatsApp Video 2026-05-28 at 12.41.29 AM.mp4', alt: 'Live Project Demonstration Video', isVideo: true },
];

const COLUMN_MEDIA = [0, 1, 2].map((columnIndex) =>
  HIGHLIGHT_MEDIA.filter((_, index) => index % 3 === columnIndex)
);

const LOOPED_COLUMNS = COLUMN_MEDIA.map((items) => [...items, ...items, ...items]);

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function HighlightCard({ item }) {
  return (
    <div className="another-card-wrapper">
      {item.isVideo ? (
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className="another-card"
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          draggable="false"
          className="another-card"
        />
      )}
      <span className="another-card-glare" />
    </div>
  );
}

export default function AnotherSection() {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const next = clamp(-rect.top / scrollable);
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

  return (
    <section className="another-gallery-section" ref={sectionRef} aria-label="Achievements Showcase Gallery">
      <div className="another-gallery-sticky">
        <div className="another-gallery-vignette" />

        {/* Elegant horizontal typography text block in bottom-left */}
        <div className="another-gallery-copy">
          <p>
            Exhibitions &amp; <em>Hackathons</em>
            <br />
            representing real-world
            <br />
            <strong>innovations</strong>.
          </p>
        </div>

        {/* 3D Tilted Fullscreen Stage */}
        <div className="another-gallery-stage" aria-hidden="true">
          
          {/* Column 1 Wrapper */}
          <div className="another-column-wrapper column-left-wrapper">
            <div className="another-gallery-column another-column-left">
              {LOOPED_COLUMNS[0].map((item, index) => (
                <HighlightCard item={item} key={`another1-${item.src}-${index}`} />
              ))}
            </div>
          </div>

          {/* Column 2 Wrapper */}
          <div className="another-column-wrapper column-center-wrapper">
            <div className="another-gallery-column another-column-center">
              {LOOPED_COLUMNS[1].map((item, index) => (
                <HighlightCard item={item} key={`another2-${item.src}-${index}`} />
              ))}
            </div>
          </div>

          {/* Column 3 Wrapper */}
          <div className="another-column-wrapper column-right-wrapper">
            <div className="another-gallery-column another-column-right">
              {LOOPED_COLUMNS[2].map((item, index) => (
                <HighlightCard item={item} key={`another3-${item.src}-${index}`} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
