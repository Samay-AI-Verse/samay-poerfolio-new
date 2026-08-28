import { useEffect, useMemo, useRef, useState } from 'react';
import { assetPath } from '../../utils/assetPath';
import './ProjectGallerySection.css';

const GALLERY_IMAGES = [
  { src: assetPath('/proj_shakti.png'), alt: 'SHAKTI Prime project preview', wide: true },
  { src: assetPath('/proj_sanjeevani_new.png'), alt: 'Sanjeevani project preview', wide: true },
  { src: assetPath('/proj_chetanalabs.png'), alt: 'ChetanaLabs project preview' },
  { src: assetPath('/proj_trinetra.png'), alt: 'Trinetra project preview' },
  { src: assetPath('/proj_sarathi.png'), alt: 'Sarathi Astra project preview', wide: true },
  { src: assetPath('/proj_bugsentry.png'), alt: 'BugSentry project preview' },
  { src: assetPath('/proj_voice.png'), alt: 'Voice project preview' },
  { src: assetPath('/proj_whatsapp.png'), alt: 'WhatsApp automation project preview' },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (start, end, amount) => start + (end - start) * amount;
const easeOut = (value) => 1 - Math.pow(1 - clamp(value), 3);
const easeInOut = (value) => {
  const t = clamp(value);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

function getImageStyle(index, progress, total) {
  const entry = easeOut((progress - index * 0.035) / 0.34);
  const groupSpin = easeInOut((progress - 0.38) / 0.42) * Math.PI * 1.05;
  const exit = easeInOut((progress - 0.86 - index * 0.012) / 0.12);

  const baseAngle = (index / total) * Math.PI * 2 - Math.PI * 0.86;
  const angle = baseAngle + groupSpin;
  const orbitX = Math.cos(angle) * 39;
  const orbitY = Math.sin(angle) * 35;
  const startX = -58 + (index % 4) * 10;
  const startY = 58 + (index % 3) * 5;
  const exitX = 68 + index * 2;
  const exitY = 6 + ((index + 1) % 4) * 9;

  const currentX = lerp(lerp(startX, orbitX, entry), exitX, exit);
  const currentY = lerp(lerp(startY, orbitY, entry), exitY, exit);
  const depth = Math.sin(angle);
  const tangent = Math.cos(angle) * 9;
  const rotateZ = lerp(8 - index * 1.1, tangent + index * 0.7 - 4, entry);
  const rotateY = lerp(-18, depth * 22, entry);
  const rotateX = lerp(8, -depth * 4, entry);
  const translateZ = lerp(-100, lerp(-70, 130, (depth + 1) / 2), entry) * (1 - exit);
  const scale = lerp(0.58, lerp(0.76, 0.96, (depth + 1) / 2), entry) * lerp(1, 0.84, exit);
  const opacity = clamp((entry - 0.24) / 0.76) * (1 - exit * 0.96);

  return {
    '--gallery-x': `${currentX}vw`,
    '--gallery-y': `${currentY}vh`,
    '--gallery-z': `${translateZ}px`,
    '--gallery-rx': `${rotateX}deg`,
    '--gallery-rz': `${rotateZ}deg`,
    '--gallery-ry': `${rotateY}deg`,
    '--gallery-scale': scale.toFixed(3),
    '--gallery-opacity': opacity.toFixed(3),
    '--gallery-depth': Math.round(20 + depth * 20 + (total - index)),
  };
}

/* ── Word-reveal config ──────────────────────────────────────────
   The copy is visible while progress is roughly 0.5 → 0.88.
   We spread the word reveal across that window.
   Each word gets a threshold; once progress crosses it the word
   becomes fully visible.  Words below threshold stay dim + blurred.
──────────────────────────────────────────────────────────────── */

// Segments: { text, italic }
const COPY_SEGMENTS = [
  { text: 'Each',       italic: false },
  { text: 'project',    italic: false },
  { text: 'is',         italic: false },
  { text: 'a',          italic: false },
  { text: 'chance',     italic: false },
  { text: 'to',         italic: false },
  { text: 'learn,',     italic: true  },
  { text: 'experiment', italic: true  },
  { text: 'and',        italic: false },
  { text: 'push',       italic: false },
  { text: 'my',         italic: false },
  { text: 'limits.',    italic: false },
];

// Line breaks after these word indices (0-based)
const LINE_BREAKS_AFTER = new Set([5, 8]);

const REVEAL_START = 0.50; // progress when first word lights up
const REVEAL_END   = 0.84; // progress when last word lights up

function getWordOpacity(wordIndex, totalWords, progress) {
  const t = wordIndex / (totalWords - 1);
  const threshold = REVEAL_START + t * (REVEAL_END - REVEAL_START);
  // How far past the threshold are we?  Ramp over ~0.04 of progress
  return clamp((progress - threshold) / 0.045);
}

export default function ProjectGallerySection() {
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
      section.style.setProperty('--gallery-progress', next.toFixed(4));
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

  const imageStyles = useMemo(
    () => GALLERY_IMAGES.map((_, index) => getImageStyle(index, progress, GALLERY_IMAGES.length)),
    [progress]
  );

  const copyOpacity = easeInOut((progress - 0.5) / 0.16) * (1 - easeInOut((progress - 0.88) / 0.08));

  const totalWords = COPY_SEGMENTS.length;

  return (
    <section className="gallery-section" ref={sectionRef} aria-label="Project gallery">
      <div className="gallery-sticky">
        <div className="gallery-copy" style={{ '--gallery-copy-opacity': copyOpacity.toFixed(3) }}>
          <p>
            {COPY_SEGMENTS.map((seg, i) => {
              const wordProgress = getWordOpacity(i, totalWords, progress);
              const opacity  = lerp(0.18, 1, wordProgress);
              const blur     = lerp(5, 0, wordProgress);

              const wordEl = (
                <span
                  key={i}
                  className="gallery-word"
                  style={{
                    opacity,
                    filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none',
                    fontStyle: seg.italic ? 'italic' : 'normal',
                    fontFamily: seg.italic ? "Georgia, 'Times New Roman', serif" : 'inherit',
                    fontSize:   seg.italic ? '0.94em' : 'inherit',
                    fontWeight: seg.italic ? 400 : 'inherit',
                  }}
                >
                  {seg.text}
                </span>
              );

              return (
                <span key={`w-${i}`}>
                  {wordEl}
                  {/* Insert line break after specific words */}
                  {LINE_BREAKS_AFTER.has(i) ? <br /> : ' '}
                </span>
              );
            })}
          </p>
        </div>

        <div className="gallery-stage" aria-hidden="true">
          {GALLERY_IMAGES.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt=""
              draggable="false"
              className={`gallery-card${image.wide ? ' gallery-card--wide' : ''}`}
              style={imageStyles[index]}
            />
          ))}
        </div>

        <aside className="gallery-aside" aria-hidden="true">
          <div className="gallery-rail">
            <span />
          </div>
        </aside>
      </div>
    </section>
  );
}
