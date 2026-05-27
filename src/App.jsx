import { useState, useEffect, useRef } from 'react';

// Global styles
import './styles/global.css';

// Components
import FullscreenPrompt from './components/overlay/FullscreenPrompt';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ProjectGallerySection from './components/sections/ProjectGallerySection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import ProfileSection from './components/sections/ProfileSection';

const FULLSCREEN_PROMPT_KEY = 'samay-fullscreen-prompt-seen';

const markFullscreenPromptSeen = () => {
  try {
    window.localStorage.setItem(FULLSCREEN_PROMPT_KEY, 'true');
  } catch {
    // Storage can be unavailable in restricted browser modes.
  }
};

function App() {
  const [showPrompt, setShowPrompt] = useState(true); // always show on refresh
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted,     setIsMuted]     = useState(true);
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [videoEnded,  setVideoEnded]  = useState(false);
  const [navVisible,  setNavVisible]  = useState(false);   // no longer drives a separate nav
  const videoRef = useRef(null);

  // Keep video paused on load
  useEffect(() => {
    videoRef.current?.pause();
  }, []);

  // Freeze the page while the first-time experience prompt is visible.
  useEffect(() => {
    document.documentElement.classList.toggle('prompt-open', showPrompt);
    document.body.classList.toggle('prompt-open', showPrompt);
    return () => {
      document.documentElement.classList.remove('prompt-open');
      document.body.classList.remove('prompt-open');
    };
  }, [showPrompt]);

  // Sync fullscreen state when user presses Escape etc.
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Show nav only when hero is fully scrolled past (scroll >= 100vh)
  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY >= window.innerHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Enter fullscreen + start video with audio (initial prompt click)
  const handleEnterFullscreen = () => {
    const el = document.documentElement;
    const go = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (go) go.call(el).catch(() => {});
    setIsFullscreen(true);
    setShowPrompt(false);
    markFullscreenPromptSeen();

    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.play()
      .then(() => { setIsPlaying(true); setVideoEnded(false); })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play()
          .then(() => { setIsPlaying(true); setVideoEnded(false); })
          .catch(() => {});
      });
  };

  // Dedicated fullscreen button toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // After video plays through once → pause + show replay overlay
  const handleVideoEnded = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setVideoEnded(true);
  };

  // Toggle play / pause — rewinds if video has fully ended
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      // If the video ended, restart from the beginning
      if (video.ended || video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
      }
      video.play()
        .then(() => { setIsPlaying(true); setVideoEnded(false); })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="site-wrapper">

      {/* Entry overlay */}
      {showPrompt && <FullscreenPrompt onEnter={handleEnterFullscreen} />}

      {/* Hero video section */}
      <HeroSection
        videoRef={videoRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        videoEnded={videoEnded}
        showPrompt={showPrompt}
        onVideoEnded={handleVideoEnded}
        onTogglePlayPause={togglePlayPause}
        onToggleMute={toggleMute}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Stacking content sections */}
      <div className="overlap-sections">
        <ProfileSection showNav={navVisible} />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <ProjectGallerySection />
        <ContactSection />
      </div>

    </div>
  );
}

export default App;
