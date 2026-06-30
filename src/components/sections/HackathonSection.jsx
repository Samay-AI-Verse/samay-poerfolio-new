import { useState, useEffect, useRef } from 'react';
import './HackathonSection.css';

import img1 from '../../image/hackthone Winner/img1.jpeg';
import img2 from '../../image/hackthone Winner/img2.jpeg';
import img3 from '../../image/hackthone Winner/img3.jpeg';
import img4 from '../../image/hackthone Winner/img4.jpeg';
import img5 from '../../image/hackthone Winner/img5.jpeg';
import vid1 from '../../image/hackthone Winner/vid1.mp4';
import vid2 from '../../image/hackthone Winner/vid2.mp4';

const HACKATHON_MEDIA = [
  { type: 'video', src: vid1 },
  { type: 'image', src: img1 },
  { type: 'image', src: img2 },
  { type: 'image', src: img3 },
  { type: 'video', src: vid2 },
  { type: 'image', src: img4 },
  { type: 'image', src: img5 },
];

export default function HackathonSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % HACKATHON_MEDIA.length);
  };

  // Auto-slide logic for images
  useEffect(() => {
    const currentMedia = HACKATHON_MEDIA[activeIndex];
    let timer;
    if (currentMedia.type === 'image') {
      timer = setTimeout(nextSlide, 4000); // Slide images after 4 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [activeIndex]);

  // Play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex]);

  // Parallax / Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled into view
      // 0 = just entered bottom, 1 = just left top
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
        
        {/* Text Area */}
        <div className="hackathon-text-area">
          <span className="hackathon-eyebrow">Milestone Achievement</span>
          <h2 className="hackathon-title">
            National Level <br />
            <span className="hackathon-highlight">Hackathon Winners</span>
          </h2>

          <div className="hackathon-stats">
            <div className="stat-box">
              <span className="stat-value">1st</span>
              <span className="stat-label">Place</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">24</span>
              <span className="stat-label">Hours of Coding</span>
            </div>
          </div>
        </div>

        {/* Image Slider Area */}
        <div className="hackathon-slider-area">
          <div className="hackathon-slider-viewport">
            <div 
              className="hackathon-slider-track" 
              ref={trackRef}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {HACKATHON_MEDIA.map((item, index) => (
                <div className="hackathon-slide" key={index}>
                  {item.type === 'video' ? (
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      src={item.src} 
                      muted 
                      playsInline 
                      className="hackathon-video"
                      onEnded={nextSlide}
                    />
                  ) : (
                    <img src={item.src} alt={`Hackathon showcase ${index + 1}`} draggable="false" />
                  )}
                  <div className="hackathon-slide-overlay"></div>
                </div>
              ))}
            </div>
            
            {/* Slider Dots */}
            <div className="hackathon-slider-nav">
              {HACKATHON_MEDIA.map((_, index) => (
                <button 
                  key={index} 
                  className={`hackathon-slider-dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
