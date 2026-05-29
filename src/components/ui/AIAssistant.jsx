import { useState, useEffect, useRef } from 'react';
import './AIAssistant.css';

const KNOWLEDGE_BASE = {
  dipex: {
    reply: "🏆 **DIPEX 2026 Innovation Competition Winner!**\n\nSamay won **First Prize** at DIPEX 2026, a prestigious state-level project exhibition. \n- **Exhibited Project**: MIT innovation pavilion prototype.\n- **Jury Review**: Honored by visitations and panel reviews for coding, robust database workflows, and real-world system design.",
    chips: ["🛠️ Sanjeevani Project", "💻 Tech Stack", "📞 Contact Samay"]
  },
  sanjeevani: {
    reply: "🛠️ **Sanjeevani: Healthcare AI Ecosystem**\n\nSanjeevani is a comprehensive pharmaceutical and medical delivery solution built by Samay:\n- **Ecosystem**: Multi-tenant pharmacies, AI-driven inventory tracking, and RAG-powered medicine recommendations.\n- **Calling & WhatsApp**: Integrated directly with Outbound screening calls and a WhatsApp-based conversational medicine ordering bot.\n- **Tech Stack**: React, FastAPI, PostgreSQL, LangChain.",
    chips: ["🏆 DIPEX 2026 Award", "📞 Voice Agent Demo", "📞 Contact Samay"]
  },
  voice: {
    reply: "📞 **ChetanaLabs Voice AI Assistant**\n\nChetanaLabs is a premium **Conversational Voice AI Agent** designed by Samay:\n- **HR Automation**: Automates candidate screening interviews, outbound calling sequences, and booking scheduling via phone calls.\n- **Live Call Tech**: Powered by Vapi AI, LangChain, and FastAPI to deliver hyper-realistic human conversations with low latency.\n- **GitHub**: You can check his Voice Agent implementation at [ChetanaLabs GitHub](https://github.com/Samay-AI-Verse/ChetanaLabs-).",
    chips: ["💬 WhatsApp AI Bot", "🛠️ Sanjeevani Project", "📞 Contact Samay"]
  },
  whatsapp: {
    reply: "💬 **WhatsApp Conversational Bot**\n\nSamay has engineered active WhatsApp AI chatbots that support conversational flows, order management, and document querying:\n- **Sanjeevani Bot**: Handles medicine lookups, price quotes, and order placements directly in WhatsApp chat.\n- **Direct Test**: Try launching his live chatbot at [Chat on WhatsApp](https://wa.me/919764096358?text=Hi%20Samay,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20try%20your%20WhatsApp%20AI%20Assistant!).",
    chips: ["📞 Voice Agent Demo", "💻 Tech Stack", "🏆 DIPEX 2026 Award"]
  },
  stack: {
    reply: "💻 **Core AI & Full-Stack Capabilities**\n\nSamay Powade's stack is built around production-grade AI applications:\n- **AI & Agentic Frameworks**: LangChain, LangGraph, RAG pipelines, Prompt engineering, Semantic indexing.\n- **Backend**: Python, FastAPI, WebSockets, Node.js, Express.js.\n- **Frontend & Database**: React.js, Next.js, PostgreSQL, MongoDB, Pinecone / Vector DBs.",
    chips: ["🏆 DIPEX 2026 Award", "🛠️ Sanjeevani Project", "📞 Contact Samay"]
  },
  contact: {
    reply: "📞 **Collaborate & Contact Samay**\n\nI would love to help you build smart agentic tools, RAG dashboards, or custom full-stack solutions!\n- **Email**: [samaypowade9@gmail.com](mailto:samaypowade9@gmail.com)\n- **WhatsApp**: [+91 9764096358](https://wa.me/919764096358)\n\n👉 *Opening priority red-themed contact form right now...*",
    chips: ["🏆 DIPEX 2026 Award", "🛠️ Sanjeevani Project", "💻 Tech Stack"],
    action: "openContact"
  }
};

const INITIAL_MESSAGE = {
  id: 'init',
  sender: 'ai',
  text: "👋 Hi there! I'm **Samay's portfolio assistant**, an interactive AI Agent built to answer questions about his AI systems, awards, and experience.\n\nAsk me anything, or select a quick topic below!",
  chips: ["🏆 DIPEX 2026 Winner Info", "📞 Chetana Voice AI Agent", "💬 WhatsApp Chatbot", "💻 Tech Stack"]
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const messageIdRef = useRef(0);

  const createMessageId = () => {
    messageIdRef.current += 1;
    return `message-${messageIdRef.current}`;
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const streamMessage = (fullText, nextChips, action) => {
    setIsTyping(true);
    const newMsgId = createMessageId();
    
    // Add empty message first
    setMessages(prev => [...prev, { id: newMsgId, sender: 'ai', text: '', chips: [] }]);
    
    let index = 0;
    const words = fullText.split(' ');
    
    const interval = setInterval(() => {
      if (index < words.length) {
        setMessages(prev => prev.map(msg => {
          if (msg.id === newMsgId) {
            return { ...msg, text: words.slice(0, index + 1).join(' ') };
          }
          return msg;
        }));
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        // Add final chips
        setMessages(prev => prev.map(msg => {
          if (msg.id === newMsgId) {
            return { ...msg, chips: nextChips };
          }
          return msg;
        }));

        // Execute special actions (like programmatically launching the red contact page!)
        if (action === "openContact") {
          setTimeout(() => {
            const footerContactBtn = document.querySelector('a[href="#contact"]');
            if (footerContactBtn) {
              footerContactBtn.click();
            }
          }, 1200);
        }
      }
    }, 45); // simulated typing delay
  };

  const handleQuery = (queryText) => {
    if (!queryText.trim() || isTyping) return;

    // User message
    const userMsg = { id: createMessageId(), sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const query = queryText.toLowerCase();
    let match = KNOWLEDGE_BASE.stack; // default fallback

    if (query.includes('dipex') || query.includes('award') || query.includes('winner') || query.includes('prize') || query.includes('particip')) {
      match = KNOWLEDGE_BASE.dipex;
    } else if (query.includes('voice') || query.includes('call') || query.includes('vapi') || query.includes('chetana') || query.includes('hr')) {
      match = KNOWLEDGE_BASE.voice;
    } else if (query.includes('whatsapp') || query.includes('bot') || query.includes('chat')) {
      match = KNOWLEDGE_BASE.whatsapp;
    } else if (query.includes('sanjeevani') || query.includes('health') || query.includes('pharmacy')) {
      match = KNOWLEDGE_BASE.sanjeevani;
    } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('collaborat')) {
      match = KNOWLEDGE_BASE.contact;
    } else if (query.includes('stack') || query.includes('skill') || query.includes('tech') || query.includes('python') || query.includes('fastapi')) {
      match = KNOWLEDGE_BASE.stack;
    } else {
      // generic fallback response
      match = {
        reply: "I am Samay's RAG-based portfolio agent. I can guide you through:\n- His **First Prize** win at **DIPEX 2026**\n- His production-grade **Voice calling HR assistant (ChetanaLabs)**\n- His active **WhatsApp Conversational Bot**\n- His core LangChain, FastAPI, and React tech stack.\n\nChoose one of the suggestions below to try!",
        chips: ["🏆 DIPEX 2026 Winner Info", "📞 Chetana Voice AI Agent", "💬 WhatsApp Chatbot", "💻 Tech Stack"]
      };
    }

    // Stream AI response after brief visual typing indicator delay
    setTimeout(() => {
      streamMessage(match.reply, match.chips, match.action);
    }, 450);
  };

  const handleChipClick = (chipText) => {
    let cleanText = chipText;
    if (chipText.includes("DIPEX")) cleanText = "DIPEX 2026 Award details";
    if (chipText.includes("Chetana")) cleanText = "ChetanaLabs Voice Calling Agent";
    if (chipText.includes("WhatsApp")) cleanText = "WhatsApp Conversational Bot";
    if (chipText.includes("Tech")) cleanText = "Tell me about your Tech Stack";
    if (chipText.includes("Contact")) cleanText = "How can I contact Samay?";
    if (chipText.includes("Sanjeevani")) cleanText = "Sanjeevani Healthcare AI Ecosystem";
    if (chipText.includes("Voice Agent")) cleanText = "Voice Calling Assistant details";

    handleQuery(cleanText);
  };

  const parseMarkdown = (text) => {
    // Basic bold markdown parser
    return text.split('\n').map((line, idx) => {
      let parsed = line;
      // Handle bold **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      parsed = parsed.replace(boldRegex, '<strong>$1</strong>');

      // Handle markdown links [label](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      parsed = parsed.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      return (
        <p key={idx} dangerouslySetInnerHTML={{ __html: parsed }} />
      );
    });
  };

  return (
    <div className={`ai-agent-wrapper${isOpen ? ' is-open' : ''}`} aria-label="Interactive AI Agent Portfolio Assistant">
      {/* Floating Toggle Button */}
      <button 
        className="ai-agent-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle AI Portfolio Assistant"
      >
        {isOpen ? (
          <span className="toggle-close-icon">✕</span>
        ) : (
          <span className="toggle-open-spark">✦</span>
        )}
        {!isOpen && <span className="ai-agent-toggle-tooltip">Chat with AI</span>}
      </button>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="ai-agent-window">
          {/* Header */}
          <header className="ai-agent-header">
            <div className="header-status">
              <span className="status-dot"></span>
              <div>
                <h4>Samay&apos;s AI Agent</h4>
                <p>Online • Active</p>
              </div>
            </div>
            <button className="header-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </header>

          {/* Messages Area */}
          <div className="ai-agent-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}-row`}>
                <div className="message-bubble">
                  {parseMarkdown(msg.text)}
                </div>

                {/* Suggestion Chips rendered below the text if present */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="chip-container">
                    {msg.chips.map((chip, cIdx) => (
                      <button 
                        key={cIdx} 
                        className="suggestion-chip" 
                        onClick={() => handleChipClick(chip)}
                        disabled={isTyping}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message-row ai-row typing-indicator-row">
                <div className="message-bubble typing-bubble">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form 
            className="ai-agent-input-form" 
            onSubmit={(e) => {
              e.preventDefault();
              handleQuery(inputText);
            }}
          >
            <input
              type="text"
              placeholder="Ask about DIPEX, WhatsApp, Voice bot..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={!inputText.trim() || isTyping}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
