import { useEffect, useRef } from 'react';
import './ContactSection.css';
import { ShaderAnimation } from '../background/sideranimation';

const smoothStep = (value) => {
  const clamped = Math.min(1, Math.max(0, value));
  return clamped * clamped * (3 - 2 * clamped);
};

const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Samay-AI-Verse' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Email', href: 'mailto:samaypowade9@gmail.com' },
];

export default function ContactSection({ onContactClick }) {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const footerRef = useRef(null);

  // Mouse cursor parallax tracking for background aurora blobs
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e) => {
      const rect = footer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
      footer.style.setProperty('--mouse-x', x.toFixed(3));
      footer.style.setProperty('--mouse-y', y.toFixed(3));
    };

    const handleMouseLeave = () => {
      footer.style.setProperty('--mouse-x', '0');
      footer.style.setProperty('--mouse-y', '0');
    };

    footer.addEventListener('mousemove', handleMouseMove);
    footer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      footer.removeEventListener('mousemove', handleMouseMove);
      footer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      section.style.setProperty('--contact-progress', progress.toFixed(4));
      section.style.setProperty('--contact-intro', (1 - smoothStep(progress / 0.2)).toFixed(4));
      section.style.setProperty('--contact-reveal', smoothStep((progress - 0.03) / 0.27).toFixed(4));
      section.style.setProperty('--contact-panel', smoothStep((progress - 0.28) / 0.16).toFixed(4));
      section.style.setProperty('--contact-title', smoothStep((progress - 0.22) / 0.18).toFixed(4));
      section.style.setProperty('--contact-story', smoothStep((progress - 0.47) / 0.16).toFixed(4));
      section.style.setProperty('--contact-content-scroll', smoothStep((progress - 0.50) / 0.28).toFixed(4));
      section.style.setProperty('--contact-footer', smoothStep((progress - 0.82) / 0.16).toFixed(4));
      section.style.setProperty('--footer-meta', smoothStep((progress - 0.82) / 0.07).toFixed(4));
      section.style.setProperty('--footer-social', smoothStep((progress - 0.84) / 0.08).toFixed(4));
      section.style.setProperty('--footer-nav', smoothStep((progress - 0.86) / 0.08).toFixed(4));
      section.style.setProperty('--footer-name', smoothStep((progress - 0.84) / 0.12).toFixed(4));
      
      // Calculate staggered progress for each character (5 in "Samay", 6 in "Powade", 1 for the dot = 12 total)
      const firstNameLength = 5;
      const lastNameLength = 6;
      const totalChars = firstNameLength + lastNameLength + 1;
      for (let i = 0; i < totalChars; i++) {
        const start = 0.82 + i * 0.012;
        const charProgress = smoothStep((progress - start) / 0.05);
        section.style.setProperty(`--char-progress-${i}`, charProgress.toFixed(4));
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="contact-reveal-section" id="contact" ref={sectionRef}>
      <div className="contact-reveal-sticky">
        <div className="contact-intro" aria-hidden="true">
          <div className="contact-intro-copy">
            <h2>
              AI engineer
              <br />
              in India,
              <br />
              building LLM systems,
              <br />
              RAG pipelines,
              <br />
              AI apps and
              <br />
              full-stack tools.
            </h2>
            <a 
              href="mailto:samaypowade9@gmail.com"
              onClick={(e) => {
                if (onContactClick) {
                  onContactClick(e);
                }
              }}
            >
              Contact me<span>*</span>
            </a>
          </div>
          <div className="contact-scroll-rail">
            <span />
          </div>
          <div className="contact-red-arrow" />
        </div>

        <div className="contact-white-disc" aria-hidden="true" />

        <div className="contact-panel">
          <div className="contact-title-screen">
            <h2 aria-label="Contact">
              {'Contact'.split('').map((letter, index) => (
                <span key={`${letter}-${index}`} style={{ '--i': index }}>
                  {letter}
                </span>
              ))}
            </h2>
          </div>

          <div className="contact-content">
            <div className="contact-spread contact-spread-top">
              <div className="contact-links">
                {CONTACT_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                    {label}
                  </a>
                ))}
              </div>
              <p className="contact-note contact-note-primary">
                Looking for an <em>internship</em> or project collaboration. Open to building AI products, full-stack systems, and practical tools with ambitious teams.
              </p>
              <div className="contact-statement">
                <span>Available for</span>
                <strong>AI products</strong>
                <strong>full-stack builds</strong>
                <strong>collaborations</strong>
              </div>
            </div>

            <div className="contact-spread contact-spread-bottom">
              <h3>GitHub</h3>
              <a className="contact-direct-link" href="https://github.com/Samay-AI-Verse" target="_blank" rel="noreferrer">
                Samay-AI-Verse
              </a>
              <p className="contact-note contact-note-secondary">
                I&apos;m available for <em>freelance missions</em>, experiments, and real-world collaborations where AI can move from idea to usable product.
              </p>
            </div>
          </div>
        </div>

        <footer className="contact-footer" ref={footerRef}>
          {/* Animated Three.js ShaderAnimation background */}
          <div className="footer-aurora-container" aria-hidden="true" style={{ pointerEvents: 'none' }}>
            <ShaderAnimation />
          </div>

          <div className="contact-footer-meta">
            <a href="mailto:samaypowade9@gmail.com">
              {'samaypowade9@gmail.com'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
            <span>
              {'© 2026'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </div>
          <nav className="contact-footer-social" aria-label="Social links">
            <a href="https://github.com/Samay-AI-Verse" target="_blank" rel="noreferrer">
              {'GitHub'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              {'LinkedIn'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
            <a href="mailto:samaypowade9@gmail.com">
              {'Email'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
          </nav>
          <nav className="contact-footer-nav" aria-label="Footer navigation">
            <a href="#projects">
              {'Work'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
            <a href="#skills">
              {'Info'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
            <a 
              href="#contact"
              onClick={(e) => {
                if (onContactClick) {
                  onContactClick(e);
                }
              }}
            >
              {'Contact'.split('').map((char, index) => (
                <span key={index} className="footer-char-reveal" style={{ '--char-idx': index }}>
                  {char}
                </span>
              ))}
            </a>
          </nav>
          <div className="contact-footer-name" aria-hidden="true">
            <span className="footer-name-word footer-name-first">
              {'Samay'.split('').map((char, index) => (
                <span
                  key={`first-${index}`}
                  className="footer-char"
                  style={{ '--char-index': index, '--char-progress': `var(--char-progress-${index})` }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="footer-name-word footer-name-last">
              {'Powade'.split('').map((char, index) => {
                const globalIndex = 5 + index; // 'Samay' has 5 letters
                return (
                  <span
                    key={`last-${index}`}
                    className="footer-char"
                    style={{ '--char-index': globalIndex, '--char-progress': `var(--char-progress-${globalIndex})` }}
                  >
                    {char}
                  </span>
                );
              })}
              <b
                className="footer-name-dot footer-char"
                style={{
                  '--char-index': 11,
                  '--char-progress': 'var(--char-progress-11)'
                }}
              >
                .
              </b>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
