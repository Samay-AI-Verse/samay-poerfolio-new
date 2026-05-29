import { useState, useEffect, useRef } from 'react';
import './ProfileSection.css';
import samayPhoto from '../../image/samayphoto.png';
import { assetPath } from '../../utils/assetPath';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/Samay-AI-Verse' },
];

const CENTER_NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
];

const RIGHT_NAV_LINKS = [
  { label: 'Contact', href: '#contact', id: 'contact' },
];

// The words of the headline used for the scroll reveal animation.
const HEADLINE_WORDS = [
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

export default function ProfileSection({ showNav }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate progress of sticky section
      if (trackRef.current) {
        const rect = trackRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const viewportHeight = window.innerHeight;

        const totalScrollable = elementHeight - viewportHeight;
        if (totalScrollable > 0) {
          const scrolled = scrollTop - elementTop;
          const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
          setProgress(currentProgress);
        }
      }

      // 2. Real-time ScrollSpy tracker to highlight active navigation link
      const scrollPosition = window.scrollY + window.innerHeight * 0.45; // trigger halfway
      const sections = ['about', 'services', 'projects', 'skills', 'contact'];
      
      if (scrollPosition < window.innerHeight) {
        setActiveSection('');
        return;
      }

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
    // The entire reveal animation occurs between scroll progress 0.08 and 0.85
    const startScroll = 0.08;
    const endScroll = 0.82;
    const totalRange = endScroll - startScroll;

    const wordStep = totalRange / HEADLINE_WORDS.length;
    const wordStart = startScroll + index * wordStep;
    // Each word has an overlapping active range to create a wave feel
    const wordEnd = wordStart + wordStep * 1.8;

    let wordProgress = 0;
    if (progress > wordStart) {
      wordProgress = (progress - wordStart) / (wordEnd - wordStart);
      wordProgress = Math.min(1, Math.max(0, wordProgress));
    }

    // Smooth blur from 10px down to 0px
    const blur = 10 - wordProgress * 10;
    // Smooth opacity from 0.12 up to 1.0
    const opacity = 0.12 + wordProgress * 0.88;

    return {
      opacity,
      filter: `blur(${blur}px)`,
      display: 'inline-block',
      marginRight: '0.26em',
      whiteSpace: 'pre',
    };
  };

  // Calculate image blur dynamically:
  // Stays blurred (16px) until progress hits 0.16 (approx 3-4 words unblurred)
  // Then smoothly clears to 0px blur between progress 0.16 and 0.36
  let imageBlur = 16;
  if (progress > 0.16) {
    const blurProgress = (progress - 0.16) / (0.36 - 0.16);
    imageBlur = 16 - Math.min(1, Math.max(0, blurProgress)) * 16;
  }

  return (
    <div className="profile-scroll-track" ref={trackRef}>
      <section className="profile-section-new">
        
        {/* Navigation Bar at the Top */}
        <nav className={`profile-nav${showNav ? ' visible' : ''}`}>
          <div className="profile-logo-brand-container">
            <a 
              href="#" 
              className="profile-logo-brand" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img 
                src={assetPath('favicon.svg')} 
                alt="Samay Logo" 
                className="profile-logo-icon" 
              />
              <span className="profile-logo-text">
                Sam<span>a</span>y
              </span>
            </a>
            <span className="profile-logo-vertical-divider" />
            <ul className="profile-social-links" aria-label="Social links">
              {SOCIAL_LINKS.map(({ label, href }, index) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">{label}</a>
                  {index < SOCIAL_LINKS.length - 1 && <span className="profile-nav-divider">/</span>}
                </li>
              ))}
            </ul>
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
          
          {/* Left Area: Dynamic Word-by-Word Headline */}
          <div className="profile-story-area">
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

          {/* Right Area: Large, smooth capsule visual (original photo, no filter) */}
          <div className="profile-visual-area">
            <div className="profile-capsule-container">
              <div className="profile-capsule-photo">
                <img
                  src={samayPhoto}
                  alt="Samay Powade"
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
