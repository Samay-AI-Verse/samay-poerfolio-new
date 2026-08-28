import { useState, useEffect, useRef } from 'react';
import './ProfileSection.css';
import samayPhoto from '../../image/samay_professional.jpg';
import { assetPath } from '../../utils/assetPath';

const CENTER_NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
];

const RIGHT_NAV_LINKS = [
  { label: 'Contact', href: '#contact', id: 'contact' },
];

// The words of the headline used for the scroll reveal animation,
// completely plain, elegant, and editorial.
const HEADLINE_WORDS = [
  { text: "I'm", italic: false },
  { text: "Samay", italic: false },
  { text: "Powade.", italic: false },
  { text: "As", italic: false },
  { text: "an", italic: false },
  { text: "AI-driven", italic: true },
  { text: "software", italic: true },
  { text: "engineer,", italic: true },
  { text: "I", italic: false },
  { text: "build", italic: false },
  { text: "intelligent", italic: false },
  { text: "products,", italic: false },
  { text: "automation", italic: false },
  { text: "tools,", italic: false },
  { text: "and", italic: false },
  { text: "real-world", italic: false },
  { text: "project", italic: false },
  { text: "solutions.", italic: true }
];

export default function ProfileSection() {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // 1. Calculate progress of sticky section with smooth progression
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const totalScrollable = elementHeight - viewportHeight;
        if (totalScrollable > 0) {
          const scrolled = scrollY - elementTop;
          const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
          setProgress(currentProgress);

          // 2. Show floating navbar ONLY when user scrolls past the hero profile story
          const shouldShowNav = currentProgress >= 0.85 || scrollY >= elementHeight - viewportHeight * 0.4;
          setNavVisible(shouldShowNav);
        }
      }

      // 3. Real-time ScrollSpy tracker to highlight active navigation link
      const scrollPosition = scrollY + window.innerHeight * 0.45;
      const sections = ['about', 'services', 'projects', 'skills', 'contact'];

      let currentActive = '';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom click handler for smooth, exact scroll targeting bypassed stacking/sticky offsets
  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const topOffset = targetElement.offsetTop;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  // Calculate dynamic style for each word based on scroll progress
  const getWordStyle = (index) => {
    // The first 3 words ("I'm", "Samay", "Powade.") start crisp and readable right away
    if (index < 3) {
      return {
        opacity: 1,
        filter: 'none',
        display: 'inline-block',
        marginRight: '0.28em',
        whiteSpace: 'pre',
      };
    }

    // Subsequent words unblur smoothly as user scrolls down
    const startScroll = 0.03;
    const endScroll = 0.82;
    const remainingWords = HEADLINE_WORDS.length - 3;
    const wordStep = (endScroll - startScroll) / remainingWords;
    const wordStart = startScroll + (index - 3) * wordStep;
    const wordEnd = wordStart + wordStep * 1.8;

    let wordProgress = 0;
    if (progress > wordStart) {
      wordProgress = (progress - wordStart) / (wordEnd - wordStart);
      wordProgress = Math.min(1, Math.max(0, wordProgress));
    }

    // Soft blur transition to crystal clarity
    const blur = 8 - wordProgress * 8;
    const opacity = 0.18 + wordProgress * 0.82;

    return {
      opacity,
      filter: `blur(${blur}px)`,
      display: 'inline-block',
      marginRight: '0.26em',
      whiteSpace: 'pre',
    };
  };

  // Calculate image blur dynamically:
  // Smoothly clears to 0px blur between progress 0.06 and 0.28
  let imageBlur = 10;
  if (progress > 0.06) {
    const blurProgress = (progress - 0.06) / (0.28 - 0.06);
    imageBlur = 10 - Math.min(1, Math.max(0, blurProgress)) * 10;
  }

  return (
    <div className="profile-scroll-track" ref={trackRef}>
      <section className="profile-section-new">

        {/* Navigation Bar - Smooth Scroll Reveal (Hidden during hero portrait, appears on content scroll) */}
        <nav className={`profile-nav ${navVisible ? 'scrolled-visible' : 'hidden-top'}`}>
          <div className="profile-logo-brand-container">
            <a
              href="#"
              className="profile-logo-brand"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span className="profile-logo-text">
                Sam<span>a</span>y
              </span>
            </a>
            <span className="profile-logo-vertical-divider" />
            
            {/* Professional SVG Icons for LinkedIn & GitHub */}
            <div className="profile-social-icons" aria-label="Social profiles">
              <a
                href="https://www.linkedin.com/in/samay-p-103259269/"
                target="_blank"
                rel="noreferrer"
                className="nav-social-icon-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href="https://github.com/Samay-AI-Verse"
                target="_blank"
                rel="noreferrer"
                className="nav-social-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <ul className="profile-nav-links" aria-label="Main navigation">
            {CENTER_NAV_LINKS.map(({ label, href, id }) => (
              <li key={label}>
                <a
                  href={href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="profile-nav-right-links" aria-label="Contact navigation">
            {RIGHT_NAV_LINKS.map(({ label, href, id }) => (
              <li key={label}>
                <a
                  href={href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Container */}
        <div className="profile-container-new">

          {/* Left Area: Clean, Pure Typography */}
          <div className="profile-story-area">
            <div className="profile-story-content">
              <h2 className="profile-headline-main">
                {HEADLINE_WORDS.map((word, idx) => (
                  <span
                    key={idx}
                    style={getWordStyle(idx)}
                    className={word.italic ? 'serif-italic' : ''}
                  >
                    {word.text}
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* Right Area: Clean, Plain Capsule with Professional Suit Photo */}
          <div className="profile-visual-area">
            <div className="profile-capsule-container">
              <div className="profile-capsule-photo">
                <img
                  src={samayPhoto}
                  alt="Samay Powade - Professional Portrait"
                  className="profile-photo-new"
                  style={{
                    transform: `scale(${1.05 - progress * 0.05}) translateY(${progress * 15}px)`,
                    filter: `blur(${imageBlur}px)`,
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Far-Right vertical progress timeline bar */}
        <div className="profile-progress-sidebar">
          <span className="sidebar-label">About</span>
          <div className="sidebar-progress-track">
            <div className="sidebar-progress-fill" style={{ height: `${progress * 100}%` }} />
          </div>
        </div>

      </section>
    </div>
  );
}
