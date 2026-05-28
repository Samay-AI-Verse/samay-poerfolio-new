import { useState, useEffect, useRef } from 'react';
import './ProfileSection.css';
import samayPhoto from '../../image/samayphoto.png';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/Samay-AI-Verse' },
];

const CENTER_NAV_LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Info', href: '#skills' },
];

const RIGHT_NAV_LINKS = [
  { label: 'Contact', href: '#contact' },
];

export default function ProfileSection({ showNav }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable <= 0) return;

      const scrolled = scrollTop - elementTop;
      const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine blur level class for the photo
  let blurClass = 'blur-high';
  if (progress >= 0.35 && progress < 0.65) {
    blurClass = 'blur-med';
  } else if (progress >= 0.65) {
    blurClass = 'blur-none';
  }

  // Active status for the scrolling text blocks
  const isHeadlineActive = progress < 0.5;
  const isBioActive = progress >= 0.5;

  return (
    <div className="profile-scroll-track" ref={trackRef}>
      <section className="profile-section-new">
        
        {/* Navigation Bar at the Top */}
        <nav className={`profile-nav${showNav ? ' visible' : ''}`}>
          <ul className="profile-social-links" aria-label="Social links">
            {SOCIAL_LINKS.map(({ label, href }, index) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer">{label}</a>
                {index < SOCIAL_LINKS.length - 1 && <span className="profile-nav-divider">/</span>}
              </li>
            ))}
          </ul>

          <ul className="profile-nav-links" aria-label="Main navigation">
            {CENTER_NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <ul className="profile-nav-right-links" aria-label="Contact navigation">
            {RIGHT_NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Container */}
        <div className="profile-container-new">
          
          {/* Left Area: Stories & Headlines */}
          <div className="profile-story-area">
            <div 
              className="profile-story-scroller"
              style={{
                transform: `translateY(${isHeadlineActive ? '0' : '-100vh'})`,
              }}
            >
              
              {/* Row 1: Headline Block */}
              <div className={`profile-headline-row ${isHeadlineActive ? 'active' : 'blurred'}`}>
                <div className="profile-row-left">
                  <span className="profile-row-num">(23)</span>
                </div>
                <div className="profile-row-right">
                  <h2 className="profile-headline-main">
                    As a <span className="serif-italic">creative developer</span>, I craft<br />
                    tailor-made web experiences,<br />
                    blending technical precision and<br />
                    <span className="serif-italic">emotion</span>.
                  </h2>
                </div>
              </div>

              {/* Row 2: Bio & Info Block */}
              <div className={`profile-bio-row ${isBioActive ? 'active' : 'blurred'}`}>
                <div className="profile-row-left">
                  <span className="profile-row-num">(26)</span>
                </div>
                <div className="profile-row-right">
                  <p className="profile-bio-text">
                    My name is Samay. A passionate creator and AI/Full-Stack engineer, I build memorable digital experiences, always seeking the symbiosis between art and information.
                  </p>
                  <a href="#skills" className="profile-info-link-btn">INFO</a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Area: Dynamic capsule visual */}
          <div className="profile-visual-area">
            <div className="profile-capsule-container">
              <div className={`profile-capsule-photo ${blurClass}`}>
                <img
                  src={samayPhoto}
                  alt="Samay Powade"
                  className="profile-photo-new"
                  style={{
                    transform: `scale(${1.08 - progress * 0.08})`,
                  }}
                />
                {/* Red tint filter / gradient overlay */}
                <div className="profile-photo-red-overlay" />
              </div>
              
              {/* Dynamic stamp/label overlay */}
              <div className={`profile-version-stamp ${progress >= 0.8 ? 'active' : ''}`}>
                <span className="stamp-arrow">→</span> V3.0
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
