import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import bgVideo from './videos/intro.mp4';

function App() {
  const [showPrompt, setShowPrompt] = useState(true);   // animated "click" overlay
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);    // track play state
  const [videoEnded, setVideoEnded] = useState(false);  // true after first full play
  const videoRef = useRef(null);

  // Keep video paused until user clicks
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, []);

  // Listen for fullscreen change (e.g. user presses Escape)
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // User clicks the animated prompt → fullscreen + audio + video play
  const handleEnterFullscreen = () => {
    const el = document.documentElement;
    const go = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (go) go.call(el).catch(() => { });
    setIsFullscreen(true);
    setShowPrompt(false);

    // Start video with audio
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      video.play().then(() => {
        setIsPlaying(true);
        setVideoEnded(false);
      }).catch(() => {
        // If autoplay with sound blocked, play muted
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setIsPlaying(true);
          setVideoEnded(false);
        }).catch(() => { });
      });
    }
  };

  // After video ends once → pause it and show the play overlay
  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
      setVideoEnded(true);
    }
  };

  // Play/pause toggle (for the overlay button and the control button)
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      setVideoEnded(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="site-wrapper">

      {/* ── SIMPLE FULLSCREEN PROMPT OVERLAY ── */}
      {showPrompt && (
        <div className="fs-prompt-overlay" onClick={handleEnterFullscreen}>
          <div className="fsp-center">
            {/* Expand icon */}
            <svg className="fsp-zoom-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 20 L4 4 L20 4"   stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M44 4 L60 4 L60 20"  stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M60 44 L60 60 L44 60" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 60 L4 60 L4 44"  stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="fsp-label">Click for Better Experience</p>
          </div>
        </div>
      )}

      {/* ══════════════ SECTION 1 — HERO VIDEO (STICKY) ══════════════ */}
      <div className="sticky-hero-wrapper">
        <section className="hero-section">
          <video
            ref={videoRef}
            muted
            playsInline
            className="bg-video"
            onEnded={handleVideoEnded}
          >
            <source src={bgVideo} type="video/mp4" />
          </video>

          {/* ── VIDEO ENDED OVERLAY — big centered play button ── */}
          {videoEnded && (
            <div className="video-ended-overlay" onClick={togglePlayPause}>
              <div className="video-play-btn">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          <div className="hero-overlay">
            <div className="hero-text">
              <span className="hero-eyebrow">Portfolio</span>
              <h1 className="hero-name">Samay<br />Powade</h1>
              <p className="hero-role">AI Engineer &nbsp;·&nbsp; Full-Stack Developer</p>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
              <span>Scroll</span>
              <div className="scroll-arrow" />
            </div>

            {/* Play / Pause button — visible only after video has started */}
            {!showPrompt && (
              <button className="playpause-btn" onClick={togglePlayPause} title={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}

            {/* Mute button */}
            <button className="mute-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </section>
      </div>

      {/* ══════════════ OVERLAP SECTIONS ══════════════ */}
      <div className="overlap-sections">

        {/* SECTION 2 — ABOUT */}
        <section className="content-section about-section overlap-card">
          <div className="section-inner">
            <span className="section-label">About Me</span>
            <h2 className="section-title">Building the Future<br />with AI & Code</h2>
            <p className="section-body">
              I'm a developer passionate about crafting intelligent systems and beautiful digital experiences.
              From scalable backends to real-time AI pipelines — I bring ideas to life.
            </p>
            <div className="stat-row">
              <div className="stat-card"><h3>15+</h3><p>Projects Shipped</p></div>
              <div className="stat-card"><h3>3+</h3><p>Years Experience</p></div>
              <div className="stat-card"><h3>∞</h3><p>Lines of Code</p></div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SKILLS */}
        <section className="content-section skills-section overlap-card">
          <div className="section-inner">
            <span className="section-label">Skills</span>
            <h2 className="section-title">What I Work With</h2>
            <div className="skills-grid">
              {['React', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'OpenAI', 'Docker'].map(skill => (
                <div className="skill-pill" key={skill}>{skill}</div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — CONTACT */}
        <section className="content-section contact-section overlap-card">
          <div className="section-inner">
            <span className="section-label">Let's Connect</span>
            <h2 className="section-title">Have a project<br />in mind?</h2>
            <p className="section-body">Drop me a message — I'm always open to exciting collaborations.</p>
            <a href="mailto:samay@example.com" className="cta-btn">Get in Touch →</a>
          </div>
        </section>

      </div>

    </div>
  );
}

export default App;