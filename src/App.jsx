import { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Global styles
import './styles/global.css';

// Components
import ProfileSection from './components/sections/ProfileSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ProjectGallerySection from './components/sections/ProjectGallerySection';
import AnotherSection from './components/sections/AnotherSection';
import ContributorsSection from './components/sections/ContributorsSection';
import HackathonSection from './components/sections/HackathonSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import ContactPage from './components/sections/ContactPage';
import MaxAssistantOverlay from './components/overlay/MaxAssistantOverlay';

function App() {
  const [contactPageOpen, setContactPageOpen] = useState(false);
  const [contactPageOrigin, setContactPageOrigin] = useState({ x: 50, y: 50 });
  const [isMaxOpen, setIsMaxOpen] = useState(false);
  const [maxTriggerCoords, setMaxTriggerCoords] = useState(null);

  // Initialize smooth, buttery Lenis momentum scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleMaxOpen = (coords) => {
    setMaxTriggerCoords(coords);
    setIsMaxOpen(true);
  };

  const handleViewProject = (projectId) => {
    const projectSection = document.getElementById('projects');
    if (projectSection) {
      const items = projectSection.querySelectorAll('.proj-item');
      let targetItem = null;
      items.forEach(item => {
        const numText = item.querySelector('.proj-item-num')?.textContent;
        if (numText && numText.includes(projectId)) {
          targetItem = item;
        }
      });

      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetItem.classList.add('max-highlight-project');
        setTimeout(() => {
          targetItem.classList.remove('max-highlight-project');
        }, 4000);
      } else {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMaxContact = () => {
    setContactPageOrigin({ x: 50, y: 50 });
    setContactPageOpen(true);
  };

  useEffect(() => {
    document.body.classList.toggle('contact-page-open', contactPageOpen);
    return () => document.body.classList.remove('contact-page-open');
  }, [contactPageOpen]);

  const handleSkillsContactClick = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      setContactPageOrigin({
        x: ((rect.left + rect.width / 2) / window.innerWidth) * 100,
        y: ((rect.top + rect.height / 2) / window.innerHeight) * 100,
      });
      event.currentTarget.classList.add('is-launching');
      window.setTimeout(() => {
        event.currentTarget.classList?.remove('is-launching');
      }, 520);
      window.setTimeout(() => {
        setContactPageOpen(true);
      }, 340);
    } else {
      setContactPageOrigin({ x: 50, y: 50 });
      setContactPageOpen(true);
    }
  };

  return (
    <div className="site-wrapper">

      {/* Main Profile Storytelling Section at Top (Word Reveal + Capsule Photo) */}
      <ProfileSection onContactClick={handleSkillsContactClick} />

      {/* Stacking content sections */}
      <div className="overlap-sections">
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProjectGallerySection />
        <HackathonSection />
        <SkillsSection onContactClick={handleSkillsContactClick} />
        <AnotherSection />
        <ContributorsSection />
        <ContactSection 
          onContactClick={handleSkillsContactClick} 
        />
      </div>

      {contactPageOpen && (
        <ContactPage
          origin={contactPageOrigin}
          onBack={() => setContactPageOpen(false)}
        />
      )}

      {isMaxOpen && (
        <MaxAssistantOverlay
          isOpen={isMaxOpen}
          triggerCoords={maxTriggerCoords}
          onClose={() => setIsMaxOpen(false)}
          onViewProject={handleViewProject}
          onContact={handleMaxContact}
        />
      )}

    </div>
  );
}

export default App;
