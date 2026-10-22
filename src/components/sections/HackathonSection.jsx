import { useState, useEffect, useRef } from 'react';
import './HackathonSection.css';

// Kurukshetra MIT Pune Hackathon Images
import mitImg1 from '../../image/hackathon_kurukshetra/1789412029936.jpg';
import mitImg2 from '../../image/hackathon_kurukshetra/1789412030435.jpg';
import mitImg3 from '../../image/hackathon_kurukshetra/1789412032962.jpg';

// National Hackathon Champion Images
import natImg1 from '../../image/hackthone Winner/img1.jpeg';
import natImg2 from '../../image/hackthone Winner/img2.jpeg';
import natImg3 from '../../image/hackthone Winner/img3.jpeg';
import natImg4 from '../../image/hackthone Winner/img4.jpeg';
import natImg5 from '../../image/hackthone Winner/img5.jpeg';

const HACKATHONS = [
  {
    id: 'kurukshetra',
    eventTitle: 'Kurukshetra',
    institution: 'MIT Pune',
    badge: 'National Level Hackathon',
    rank: '2nd Place Winner',
    trophy: '🏆',
    description: 'Secured 2nd Place at Kurukshetra, the flagship National Level Hackathon hosted at MIT Pune. Built, optimized, and pitched an AI-driven innovation under high-stakes competitive time constraints alongside top engineering talents.',
    stats: [
      { value: '2nd', label: 'Place Winner' },
      { value: 'MIT', label: 'Pune Venue' },
      { value: '36H', label: 'High-Stakes Sprint' },
    ],
    media: [
      { type: 'image', src: mitImg1, caption: 'Kurukshetra Hackathon at MIT Pune' },
      { type: 'image', src: mitImg2, caption: 'MIT Pune Hackathon Winner Moment' },
      { type: 'image', src: mitImg3, caption: 'Team & Award Presentation' },
    ],
  },
  {
    id: 'national-winner',
    eventTitle: 'National Level Hackathon',
    institution: 'National Arena',
    badge: 'National Level Hackathon',
    rank: '1st Place Champion',
    trophy: '🥇',
    description: 'Secured 1st Place after 24 hours of non-stop coding, competitive problem solving, and building a full-stack product from scratch to production readiness.',
    stats: [
      { value: '1st', label: 'Place Champion' },
      { value: '24H', label: 'Continuous Coding' },
      { value: '50+', label: 'Competing Teams' },
    ],
    media: [
      { type: 'image', src: natImg1, caption: 'National Level Hackathon Champions' },
      { type: 'image', src: natImg2, caption: 'Award Ceremony Showcase' },
      { type: 'image', src: natImg3, caption: 'Hackathon Project Pitch' },
      { type: 'image', src: natImg4, caption: 'Development & Prototyping' },
      { type: 'image', src: natImg5, caption: 'Victory Celebration' },
    ],
  },
];

export default function HackathonSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedHackathon, setSelectedHackathon] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentEvent = HACKATHONS[selectedHackathon];
  const totalSlides = currentEvent.media.length;

  const handleSelectHackathon = (index) => {
    setSelectedHackathon(index);
    setActiveIndex(0);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide logic for current event's photos
  useEffect(() => {
    const timer = setTimeout(nextSlide, 4200);
    return () => clearTimeout(timer);
  }, [activeIndex, selectedHackathon, totalSlides]);

  // Parallax / Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
      const clampedProgress = Math.max(0, Math.min(1, progress));
      sectionRef.current.style.setProperty('--hackathon-progress', clampedProgress.toFixed(4));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hackathon-section" ref={sectionRef} id="achievements">
      <div className="hackathon-container">
        
        {/* Left Column: Details & Event Switcher */}
        <div className="hackathon-text-area">
          <div className="hackathon-eyebrow-row">
            <span className="hackathon-eyebrow">Milestone Achievements</span>
            <span className="hackathon-badge-count">2x National Winner</span>
          </div>

          <h2 className="hackathon-title">
            2x National Level <br />
            <span className="hackathon-highlight">Hackathon Winner</span>
          </h2>

          {/* Event Switcher Pills */}
          <div className="hackathon-tabs" role="tablist" aria-label="Hackathon wins">
            {HACKATHONS.map((event, idx) => (
              <button
                key={event.id}
                role="tab"
                aria-selected={selectedHackathon === idx}
                className={`hackathon-tab-btn ${selectedHackathon === idx ? 'active' : ''}`}
                onClick={() => handleSelectHackathon(idx)}
              >
                <span className="hackathon-tab-trophy">{event.trophy}</span>
                <span className="hackathon-tab-info">
                  <strong>{event.eventTitle}</strong>
                  <small>{event.institution} • {event.rank}</small>
                </span>
              </button>
            ))}
          </div>

          {/* Event description */}
          <p className="hackathon-description">
            {currentEvent.description}
          </p>

          {/* Dynamic Stats for current event */}
          <div className="hackathon-stats">
            {currentEvent.stats.map((stat, sIdx) => (
              <div className="stat-box" key={sIdx}>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Image Slider */}
        <div className="hackathon-slider-area">
          <div className="hackathon-slider-viewport">
            
            {/* Top Bar inside Viewport */}
            <div className="hackathon-slider-topbar">
              <span className="hackathon-slider-tag">
                {currentEvent.trophy} {currentEvent.rank} — {currentEvent.institution}
              </span>
              <span className="hackathon-slider-counter">
                {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            {/* Slider Track */}
            <div 
              className="hackathon-slider-track" 
              ref={trackRef}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {currentEvent.media.map((item, index) => (
                <div className="hackathon-slide" key={`${selectedHackathon}-${index}`}>
                  <img 
                    src={item.src} 
                    alt={`${currentEvent.eventTitle} showcase ${index + 1}`} 
                    draggable="false" 
                  />
                  <div className="hackathon-slide-overlay">
                    {item.caption && (
                      <span className="hackathon-caption-text">{item.caption}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <button 
              className="hackathon-nav-arrow hackathon-nav-prev" 
              onClick={prevSlide}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
            <button 
              className="hackathon-nav-arrow hackathon-nav-next" 
              onClick={nextSlide}
              aria-label="Next photo"
            >
              &#8250;
            </button>
            
            {/* Slider Dots */}
            <div className="hackathon-slider-nav">
              {currentEvent.media.map((_, index) => (
                <button 
                  key={index} 
                  className={`hackathon-slider-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
