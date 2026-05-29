import { useState, useEffect, useRef } from 'react';
import './MaxAssistantOverlay.css';
import samayPhoto from '../../image/samayphoto.png';

const SERVICES = [
  { id: 1, title: 'AI Applications', kicker: 'INTELLIGENT SYSTEMS', desc: 'LLM products, RAG pipelines, and smart automation agents.' },
  { id: 2, title: 'Full Stack Dev', kicker: 'PRODUCT ENGINEERING', desc: 'React, node APIs, fast dashboards, and scalable database systems.' },
  { id: 3, title: 'Software Dev', kicker: 'CUSTOM SOFTWARE', desc: 'Scalable services, custom system tools, and smart data pipelines.' },
  { id: 4, title: 'Windows Apps', kicker: 'DESKTOP BUILDS', desc: 'Desktop workflow utilities, custom local databases, and automation.' },
  { id: 5, title: 'Android Dev', kicker: 'MOBILE PRODUCTS', desc: 'Native app experiences with offline support and real-time syncing.' },
  { id: 6, title: 'WhatsApp Bots', kicker: 'CHAT AUTOMATION', desc: 'AI automated booking, customer support, and multi-agent voice/text bots.' },
];

const PROJECTS = [
  { id: '01', title: 'Sanjeevani', category: 'Healthcare AI Ecosystem', desc: 'Healthcare dashboard optimizing supply chains with AI and RAG.' },
  { id: '02', title: 'ChetanaLabs', category: 'Voice AI / HR Tech', desc: 'AI-powered HR voice assistant screening candidates at scale.' },
  { id: '03', title: 'Trinetra System', category: 'Drone Tech / Surveillance', desc: 'AI drone surveillance system with real-time YOLO object detection.' },
  { id: '04', title: 'Sarathi Astra', category: 'RAG / Document Intelligence', desc: 'NotebookLM-style advanced RAG system for contextual PDF Q&A.' },
  { id: '05', title: 'SHAKTI', category: 'Women Safety AI', desc: 'Situation awareness and emergency triggers alert platform.' },
  { id: '06', title: 'BugSentry', category: 'VS VS Code Extension / DevTools', desc: 'Real-time AI developer companion identifying bugs inside IDE.' },
];

const SUGGESTIONS = [
  'Who is Samay?',
  'What are his services?',
  'Show me his projects',
  'How do I hire him?',
];

export default function MaxAssistantOverlay({ isOpen, triggerCoords, onClose, onViewProject, onContact }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Continuous voice tracking states
  const [voiceActive, setVoiceActive] = useState(false);
  
  // Motion timeline states: 'intro-center' | 'idle-center' | 'showcase-right'
  const [animationPhase, setAnimationPhase] = useState('intro-center');
  const [showcaseType, setShowcaseType] = useState(null); // null | 'services' | 'projects'
  
  // HUD Subtitles & Terminal Pane visibility states (both hidden by default!)
  const [showText, setShowText] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  
  const [inputText, setInputText] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Settings / Gemini API Key
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('samay-max-gemini-key') || '');
  const [showApiKey, setShowApiKey] = useState(false);

  // Refs for Speech Recognition / Synthesis
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const speechUtteranceRef = useRef(null);
  const textTimerRef = useRef(null);
  const overlayRef = useRef(null);

  // State Refs to prevent stale closures inside speech recognition events
  const voiceActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isOpenRef = useRef(false);

  // Sync refs with state
  useEffect(() => { voiceActiveRef.current = voiceActive; }, [voiceActive]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Trigger starting coords style
  const [sphereStyle, setSphereStyle] = useState({});

  // 1. Voice-first cinematic timeline sequencer
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.classList.add('max-active');
      setAnimationPhase('intro-center');
      setShowcaseType(null);
      setVoiceActive(false); // Do not capture voice during intro
      setShowConsole(false); // Hide console initially
      setShowText(false); // Hide subtitles initially
      
      // Coordinate morph setup
      if (triggerCoords) {
        setSphereStyle({
          position: 'fixed',
          top: triggerCoords.top + 'px',
          left: triggerCoords.left + 'px',
          width: triggerCoords.width + 'px',
          height: triggerCoords.height + 'px',
          transform: 'none',
          transition: 'none',
        });
      } else {
        setSphereStyle({
          position: 'fixed',
          top: '80%',
          left: '50%',
          width: '80px',
          height: '80px',
          transform: 'translate(-50%, -50%)',
          transition: 'none',
        });
      }

      // Morph to center
      const morphTimer = setTimeout(() => {
        setSphereStyle({}); // CSS centers
      }, 50);

      // Intro voice command
      const introVoiceTimer = setTimeout(() => {
        handleMaxResponse(
          "Hey, I am MAX, assistant of Samay Sir. So this is my sir, Samay Powade. Do you have any questions for me?"
        );
      }, 950);

      // Transition to centered idle & activate continuous voice loops
      const idleTimer = setTimeout(() => {
        setAnimationPhase('idle-center');
        setVoiceActive(true); // Automatically engage continuous voice listening!
      }, 5500);

      return () => {
        clearTimeout(morphTimer);
        clearTimeout(introVoiceTimer);
        clearTimeout(idleTimer);
      };
    } else {
      document.body.classList.remove('max-active');
      setIsMounted(false);
      setAnimationPhase('intro-center');
      setIsSpeaking(false);
      setIsListening(false);
      setShowcaseType(null);
      setVoiceActive(false);
      setShowConsole(false);
      setShowText(false);
      if (synthRef.current) synthRef.current.cancel();
    }
  }, [isOpen, triggerCoords]);

  // 2. Initialize continuous speech recognition loops
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setSubtitle('Listening...');
      };

      rec.onresult = (event) => {
        const query = event.results[0][0].transcript;
        setSubtitle('Heard: "' + query + '"');
        processUserQuery(query);
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      // Continuous Listening Loop integration
      rec.onend = () => {
        // Restart immediately if voice is active, MAX is not speaking, and overlay is open
        if (voiceActiveRef.current && !isSpeakingRef.current && isOpenRef.current) {
          try {
            rec.start();
            setIsListening(true);
          } catch (err) {
            // Already started
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Sync mic triggers on voiceActive shifts
  useEffect(() => {
    if (voiceActive && !isSpeaking && isOpen) {
      startListening();
    } else {
      stopListening();
    }
  }, [voiceActive, isSpeaking, isOpen]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      // ignore
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (e) {
      // ignore
    }
  };

  // 3. Exit overlay handler
  const handleClose = () => {
    setVoiceActive(false);
    if (synthRef.current) synthRef.current.cancel();
    setIsSpeaking(false);
    setIsListening(false);
    setAnimationPhase('intro-center');
    setShowcaseType(null);
    setShowConsole(false);
    setShowText(false);

    // Shrink back to glossy footer spot
    if (triggerCoords) {
      setSphereStyle({
        position: 'fixed',
        top: triggerCoords.top + 'px',
        left: triggerCoords.left + 'px',
        width: triggerCoords.width + 'px',
        height: triggerCoords.height + 'px',
        transform: 'none',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      });
    }

    setTimeout(() => {
      document.body.classList.remove('max-active');
      onClose();
    }, 600);
  };

  // 4. Voice narrator synthesis
  const speakVoice = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    
    try {
      // Mute listening while talking to prevent loopback echoes
      stopListening();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synthRef.current.getVoices();
      
      const idealVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India') || v.name.includes('Rishi') || v.name.includes('Heera')) || 
                         voices.find(v => v.lang.includes('en-US')) || 
                         voices[0];
                         
      if (idealVoice) utterance.voice = idealVoice;
      
      utterance.rate = 1.02;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        // Automatically resume listening after speaking completes
        if (voiceActiveRef.current && isOpenRef.current) {
          startListening();
        }
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        if (voiceActiveRef.current && isOpenRef.current) {
          startListening();
        }
      };

      speechUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis blocked:', e);
      setIsSpeaking(false);
      if (voiceActiveRef.current && isOpenRef.current) {
        startListening();
      }
    }
  };

  // 5. Types subtitles typewriter
  const animateSubtitle = (text) => {
    if (textTimerRef.current) clearInterval(textTimerRef.current);
    
    setSubtitle('');
    setIsTyping(true);
    
    let index = 0;
    const words = text.split(' ');
    
    textTimerRef.current = setInterval(() => {
      if (index < words.length) {
        setSubtitle(prev => (prev ? prev + ' ' : '') + words[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(textTimerRef.current);
      }
    }, 180);
  };

  // 6. Max Response dispatcher
  const handleMaxResponse = (text, showWidget = null) => {
    speakVoice(text);
    animateSubtitle(text);
    if (showWidget) {
      setAnimationPhase('showcase-right');
      setShowcaseType(showWidget);
    }
  };

  // Toggle return to center idle
  const handleBackToCenter = () => {
    setAnimationPhase('idle-center');
    setShowcaseType(null);
    handleMaxResponse("Returning to center voice idle mode.");
  };

  // 7. Core Query matcher
  const processUserQuery = async (queryText) => {
    if (!queryText.trim()) return;
    setInputText('');
    
    const query = queryText.toLowerCase().trim();

    if (apiKey) {
      setSubtitle('Querying Gemini brain...');
      try {
        await fetchGeminiResponse(queryText);
        return;
      } catch (err) {
        console.error('Gemini query failed, loading fallback local engine:', err);
      }
    }

    // A. BIO / BIOGRAPHY
    if (query.includes('who') || query.includes('samay') || query.includes('sir') || query.includes('assistant') || query.includes('intro') || query.includes('about')) {
      setAnimationPhase('intro-center');
      setShowcaseType(null);
      handleMaxResponse(
        "Samay Powade is a highly skilled AI developer based in India, specialized in creating advanced LLM systems, full-stack React utilities, WhatsApp automation, and custom web products. I am MAX, his customized AI companion designed to navigate you through his craft!"
      );
      
      setTimeout(() => {
        setAnimationPhase('idle-center');
      }, 5500);
      return;
    }

    // B. SERVICES SHOWCASE
    if (query.includes('service') || query.includes('what') || query.includes('expert') || query.includes('skill') || query.includes('offer')) {
      handleMaxResponse(
        "Samay Sir builds high-performance tools, RAG document systems, Android apps, custom Windows utilities, and AI-enabled WhatsApp chatbots. Let me slide open his core services panel.",
        'services'
      );
      return;
    }

    // C. PROJECTS SHOWCASE
    if (query.includes('project') || query.includes('work') || query.includes('portfolio') || query.includes('build') || query.includes('made')) {
      handleMaxResponse(
        "He has engineered amazing builds like Sanjeevani healthcare ecosystem, ChetanaLabs voice screening, Trinetra drones, and BugSentry VS extension. Here are his highlighted works on screen. Select one to navigate directly!",
        'projects'
      );
      return;
    }

    // D. SINGLE PROJECT COMMANDS
    if (query.includes('sanjeevani') || query.includes('healthcare') || query.includes('supply') || query.includes('pharmaceutical')) {
      handleMaxResponse("Navigating directly to Sanjeevani Healthcare System! Prepare to view the live dashboard in 3, 2, 1...");
      setTimeout(() => {
        handleClose();
        onViewProject('01');
      }, 3500);
      return;
    }

    if (query.includes('chetana') || query.includes('voice') || query.includes('screening') || query.includes('hr')) {
      handleMaxResponse("Redirecting you to ChetanaLabs Voice AI! Closing HUD console now...");
      setTimeout(() => {
        handleClose();
        onViewProject('02');
      }, 3500);
      return;
    }

    if (query.includes('trinetra') || query.includes('drone') || query.includes('surveillance') || query.includes('yolo')) {
      handleMaxResponse("Engaging Trinetra drone surveillance preview card! Moving viewport now...");
      setTimeout(() => {
        handleClose();
        onViewProject('03');
      }, 3500);
      return;
    }

    if (query.includes('sarathi') || query.includes('sarthi') || query.includes('astra') || query.includes('notebooklm') || query.includes('pdf')) {
      handleMaxResponse("Locating Sarathi Astra Document intelligence RAG setup on the portfolio grid...");
      setTimeout(() => {
        handleClose();
        onViewProject('04');
      }, 3500);
      return;
    }

    if (query.includes('shakti') || query.includes('women') || query.includes('safety')) {
      handleMaxResponse("Unfolding SHAKTI Women Safety platform project page...");
      setTimeout(() => {
        handleClose();
        onViewProject('05');
      }, 3500);
      return;
    }

    if (query.includes('bugsentry') || query.includes('vscode') || query.includes('extension') || query.includes('bug')) {
      handleMaxResponse("Launching BugSentry VS Code assistant preview...");
      setTimeout(() => {
        handleClose();
        onViewProject('06');
      }, 3500);
      return;
    }

    // E. HIRE / CONTACT DIRECTIVE
    if (query.includes('hire') || query.includes('contact') || query.includes('email') || query.includes('connect') || query.includes('collaborate') || query.includes('job') || query.includes('internship')) {
      handleMaxResponse("Right away! Launching Samay Sir's secure direct communication portal. Let's start the dialogue!");
      setTimeout(() => {
        handleClose();
        onContact();
      }, 2500);
      return;
    }

    // F. DEFAULT FALLBACK
    handleMaxResponse(
      "I'm keeping track of your request. Ask me about his projects, services, or select one of the suggesting chips. To unlock dynamic chatting, you can configure a Gemini API key.",
      null
    );
  };

  // 8. Dynamic Google Gemini API Caller
  const fetchGeminiResponse = async (userPrompt) => {
    const systemPrompt = `You are MAX, a professional, super intelligent, futuristic, and friendly voice-enabled AI assistant for Samay Powade, a brilliant AI Engineer from India.
    Your main job is to answer questions about Samay, his work, his skills, and help recruiters or clients get in touch with him.
    Keep your responses short, natural, conversational, and energetic so they can be spoken and read easily (max 2-3 sentences per reply).
    Mix a tiny bit of polite Hinglish where appropriate.
    
    ABOUT SAMAY:
    - Specialization: AI engineering, LLM systems, RAG pipelines, WhatsApp bots, and full-stack software development.
    - Skills: LangChain, FastAPI, React, Node.js, Python, PostgreSQL, YOLO, NLP.
    - Style: Practical, fast-loading, state-of-the-art visual animations.
    
    HIS CORE SERVICES:
    1. AI Applications: Intelligent LLM pipelines and RAG automation.
    2. Full Stack Dev: Responsive React frontends and Node/Python backends.
    3. Software Dev: Scaleable integrations and microservices.
    4. Windows Apps: Desktop tools and native automations.
    5. Android Dev: Clean mobile app products.
    6. WhatsApp Bots: Smart customer flow and agent scheduling systems.
    
    HIS PROJECTS:
    - Sanjeevani (id: '01'): Healthcare RAG delivery inventory tracker.
    - ChetanaLabs (id: '02'): Outbound HR voice AI screening system.
    - Trinetra System (id: '03'): Live video telemetry drone surveillance using YOLO.
    - Sarathi Astra (id: '04'): NotebookLM document query system.
    - SHAKTI (id: '05'): Emergency community alert women safety app.
    - BugSentry (id: '06'): Real-time code debugger VS Code extension.

    TRIGGERS:
    - If the user explicitly asks you to open or show a project, end your response with a tag so the system can auto-trigger it, for example: [ACTION:VIEW_PROJECT:01] (replace 01 with the respective project id).
    - If the user wants to hire, email, or contact Samay, end your response with: [ACTION:CONTACT]
    
    Query: "${userPrompt}"`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }]
      })
    });

    if (!res.ok) {
      throw new Error('Gemini API call failed.');
    }

    const data = await res.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    let actionTrigger = null;
    let cleanText = text;

    if (text.includes('[ACTION:VIEW_PROJECT:')) {
      const match = text.match(/\[ACTION:VIEW_PROJECT:(\d+)\]/);
      if (match) {
        actionTrigger = { type: 'project', id: match[1] };
        cleanText = text.replace(/\[ACTION:VIEW_PROJECT:\d+\]/, '');
      }
    } else if (text.includes('[ACTION:CONTACT]')) {
      actionTrigger = { type: 'contact' };
      cleanText = text.replace(/\[ACTION:CONTACT\]/, '');
    }

    let wType = null;
    const lowerText = cleanText.toLowerCase();
    if (lowerText.includes('project') || lowerText.includes('build') || lowerText.includes('work')) wType = 'projects';
    else if (lowerText.includes('service') || lowerText.includes('expert') || lowerText.includes('skill')) wType = 'services';

    handleMaxResponse(cleanText.trim(), wType);

    if (actionTrigger) {
      setTimeout(() => {
        handleClose();
        if (actionTrigger.type === 'project') {
          onViewProject(actionTrigger.id);
        } else if (actionTrigger.type === 'contact') {
          onContact();
        }
      }, 4000);
    }
  };

  // 10. Input dispatcher
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    processUserQuery(inputText);
  };

  // 11. Toggle voice mic
  const toggleMic = () => {
    setVoiceActive(!voiceActive);
  };

  // 12. Save API key in browser
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('samay-max-gemini-key', apiKey);
      setShowSettings(false);
      handleMaxResponse("Gemini API connected successfully! Ask me anything, my knowledge is now dynamic.");
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('samay-max-gemini-key');
    setShowSettings(false);
    handleMaxResponse("Gemini key disconnected. Restored local portfolio guides.");
  };

  if (!isMounted) return null;

  // Determine active visual layout classes based on phase states
  const isCenteredState = animationPhase === 'intro-center' || animationPhase === 'idle-center';
  const isChatbotState = animationPhase === 'showcase-right';
  const isPhotoVisible = animationPhase === 'intro-center';
  const isShowcaseVisible = animationPhase === 'showcase-right';

  return (
    <div className={`max-overlay${animationPhase !== 'initializing' ? ' is-open' : ''}`} ref={overlayRef}>
      
      {/* Subtle Close 'x' at Top Right */}
      <button 
        className="max-close-btn" 
        onClick={handleClose} 
        aria-label="Close MAX"
        title="Close MAX"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Settings drawer Modal */}
      <div className={`max-settings-drawer${showSettings ? ' is-open' : ''}`}>
        <h3>Gemini Core Settings</h3>
        <p>Input a Google Gemini API Key to enable unrestricted dynamic conversations with MAX about Samay sir!</p>
        
        <div className="max-api-input-wrapper">
          <input 
            type={showApiKey ? 'text' : 'password'}
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button 
            type="button" 
            className="max-api-toggle-visibility"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            )}
          </button>
        </div>

        <div className="max-api-actions">
          <button className="max-btn max-btn-save" onClick={handleSaveApiKey}>Connect</button>
          <button className="max-btn max-btn-clear" onClick={handleClearApiKey}>Disconnect</button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="max-viewport">
        
        {/* Anti-Overlap Split Panes Grid */}
        <div className="max-split-layout">
          
          {/* Left Visualizer Pane */}
          <div className="max-left-pane">
            
            {/* THE BLUE ORB Visualizer Sphere - clean, borderless, glossy (LARGER SIZE) */}
            <button
              className={`max-interactive-sphere${isCenteredState ? ' is-centered' : ''}${isChatbotState ? ' is-chatbot' : ''}${isSpeaking ? ' is-speaking' : ''}${isListening ? ' is-listening' : ''}`}
              style={sphereStyle}
              onClick={toggleMic}
              aria-label="MAX AI Voice Visualizer"
              title={isListening ? "Voice Listening Active" : "Click to activate microphone"}
            />

          </div>

          {/* Right Showcase & Profile Presentation Pane */}
          <div className="max-right-pane">
            
            {/* CINEMATIC Large Profile Photo display during introduction */}
            <div className={`max-photo-aside${isPhotoVisible ? ' is-visible' : ''}`}>
              <div className="max-photo-frame">
                <img src={samayPhoto} alt="Samay Powade" className="max-profile-img" />
              </div>
              <span className="max-nameplate">SAMAY POWADE</span>
            </div>

            {/* Gorgeous Glassmorphic 3D-Effect Panel for Services Showcase */}
            <div className={`max-showcase-panel${isShowcaseVisible && showcaseType === 'services' ? ' is-visible' : ''}`}>
              <div className="max-showcase-header">
                <span className="max-showcase-title">Core Services</span>
                <button className="max-showcase-back-btn" onClick={handleBackToCenter}>
                  Back to Center
                </button>
              </div>
              <div className="max-showcase-scroll">
                <div className="max-3d-perspective-wrapper">
                  {SERVICES.map(s => (
                    <div 
                      key={s.id} 
                      className="max-service-card-3d"
                      onClick={() => processUserQuery(s.title + ' service')}
                      style={{ marginBottom: '12px' }}
                    >
                      <span>0{s.id}// SERVICES</span>
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gorgeous Glassmorphic 3D-Effect Panel for Project Portfolio Showcase */}
            <div className={`max-showcase-panel${isShowcaseVisible && showcaseType === 'projects' ? ' is-visible' : ''}`}>
              <div className="max-showcase-header">
                <span className="max-showcase-title">Selected Projects</span>
                <button className="max-showcase-back-btn" onClick={handleBackToCenter}>
                  Back to Center
                </button>
              </div>
              <div className="max-showcase-scroll">
                <div className="max-3d-perspective-wrapper">
                  {PROJECTS.map(p => (
                    <div 
                      key={p.id} 
                      className="max-project-card-3d"
                      onClick={() => processUserQuery('sanjeevani chetana trinetra sarathi shakti bugsentry'.split(' ')[parseInt(p.id)-1])}
                      style={{ marginBottom: '12px' }}
                    >
                      <div className="max-project-info-3d">
                        <span className="max-project-num-3d">[{p.id}]</span>
                        <span className="max-project-title-3d">{p.title}</span>
                        <span className="max-project-cat-3d">/ {p.category}</span>
                      </div>
                      <div className="max-project-link-3d">
                        Launch
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Floating compact speech subtitles balloon - Hides by default, floats above button hub */}
        <div className={`max-speech-balloon${showText ? ' is-visible' : ''}${showConsole ? ' console-open' : ''}`}>
          <span className="max-assistant-name">BROADCAST://MAX_VOICE</span>
          <p className={`max-speech-text${isTyping ? ' is-typing' : ''}`}>
            {subtitle || 'Voice connection active... Ask me anything.'}
          </p>
          
          <button 
            type="button"
            className="max-subtle-settings-trigger"
            onClick={() => setShowSettings(!showSettings)}
          >
            [Configure Gemini AI core settings]
          </button>
        </div>

        {/* Pane 2: Dedicated Bottom Console Area (Guarantees zero overlapping, hidden by default!) */}
        <div className={`max-console-pane${showConsole ? ' is-visible' : ''}`}>
          
          <div className={`max-console-hud${animationPhase !== 'initializing' ? ' is-visible' : ''}`}>
            
            {/* Bottom Left Quick Action buttons bar */}
            {animationPhase === 'idle-center' && (
              <div className="max-idle-actions-bar is-visible">
                <button 
                  type="button" 
                  className="max-action-chip-btn"
                  onClick={() => processUserQuery('What are his services?')}
                >
                  Services
                </button>
                <button 
                  type="button" 
                  className="max-action-chip-btn"
                  onClick={() => processUserQuery('Show me his projects')}
                >
                  Explore Projects
                </button>
                <button 
                  type="button" 
                  className="max-action-chip-btn"
                  onClick={() => processUserQuery('How do I hire him?')}
                >
                  Hire Samay Sir
                </button>
              </div>
            )}

            {/* Suggestion Chips */}
            <div className="max-suggestions-bar">
              {SUGGESTIONS.map(s => (
                <button 
                  key={s} 
                  className="max-suggestion-chip"
                  onClick={() => processUserQuery(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Sleek Terminal input bar */}
            <form className="max-input-area" onSubmit={handleInputSubmit}>
              <div className="max-input-bar-wrapper">
                <span className="max-terminal-prefix">MAX&gt;</span>
                <input 
                  type="text"
                  className="max-input-bar"
                  placeholder={isListening ? "Listening to your voice..." : "Voice loop muted. Tap mic or speak..."}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isListening}
                />
              </div>
              <button 
                type="button" 
                className={`max-mic-btn-main${voiceActive ? ' is-listening' : ''}`}
                onClick={toggleMic}
                aria-label="Microphone"
                title={voiceActive ? "Voiceactive: Listening continuously" : "Click to start continuous listening"}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                </svg>
                <div className="max-mic-pulse-ring max-mic-pulse-ring-1" />
                <div className="max-mic-pulse-ring max-mic-pulse-ring-2" />
              </button>
            </form>

            {/* Technical HUD status bar */}
            <div className="max-status-bar">
              <div className="max-status-lbl">
                <div className={`max-status-dot${isListening ? ' is-listening' : ''}`} />
                <span>{voiceActive ? 'CONTINUOUS VOICE LOOPING ACTIVE' : 'VOICE MUTED'}</span>
              </div>
              <span>{apiKey ? 'GEMINI COGNITIVE NETWORK ONLINE' : 'LOCAL CACHE RESPONDER ACTIVE'}</span>
            </div>

          </div>

        </div>

        {/* FLOATING QUICK CONTACTS HUB: WhatsApp, Call, Subtitles (💬), and Console Toggles (>_) */}
        <div className={`max-floating-contacts${(animationPhase === 'idle-center' || animationPhase === 'showcase-right') ? ' is-visible' : ''}`}>
          
          {/* 1. WhatsApp Button (Green) */}
          <a 
            href="https://wa.me/919322007479" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="max-contact-circle max-contact-whatsapp"
            title="WhatsApp Samay"
          >
            <svg viewBox="0 0 448 512">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
          </a>

          {/* 2. Call Button (Blue) */}
          <a 
            href="tel:+919322007479" 
            className="max-contact-circle max-contact-call"
            title="Call Samay"
          >
            <svg viewBox="0 0 512 512">
              <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 48.5c-35.1 72-93.7 130.6-165.7 165.7l-48.5-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C13.9 375.1 8 386.7 10.6 398l24 104C37.1 508.3 43.9 512 56 512c251.8 0 456-204.2 456-456 0-12.1-3.7-18.9-18.6-21.4z"/>
            </svg>
          </a>

          {/* 3. Subtitles Toggle Button (💬 Icon-only) */}
          <button
            type="button"
            className={`max-contact-circle max-toggle-circle${showText ? ' is-active' : ''}`}
            onClick={() => setShowText(!showText)}
            title={showText ? "Hide subtitles" : "Show subtitles log"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>

          {/* 4. Console Input Keyboard Toggle (Keyboard / Terminal Icon-only) */}
          <button
            type="button"
            className={`max-contact-circle max-toggle-circle${showConsole ? ' is-active' : ''}`}
            onClick={() => setShowConsole(!showConsole)}
            title={showConsole ? "Hide terminal input" : "Open terminal console keyboard"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <line x1="6" y1="8" x2="6" y2="8"></line>
              <line x1="10" y1="8" x2="10" y2="8"></line>
              <line x1="14" y1="8" x2="14" y2="8"></line>
              <line x1="18" y1="8" x2="18" y2="8"></line>
              <line x1="6" y1="12" x2="6" y2="12"></line>
              <line x1="10" y1="12" x2="10" y2="12"></line>
              <line x1="14" y1="12" x2="14" y2="12"></line>
              <line x1="18" y1="12" x2="18" y2="12"></line>
              <line x1="7" y1="16" x2="17" y2="16"></line>
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
}
