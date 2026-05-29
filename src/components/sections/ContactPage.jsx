import { useEffect, useRef } from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import './ContactPage.css';

const CONTACT_LINKS = [
  { label: 'WhatsApp', href: 'https://wa.me/919764096358' },
  { label: 'Direct mail', href: 'mailto:samaypowade9@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/Samay-AI-Verse' },
  { label: 'Hugging Face', href: 'https://huggingface.co/Samay-AI-Verse' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/' },
];

const BRIEF_ITEMS = [
  'Product goal',
  'Target deadline',
  'Tech stack',
  'Expected deliverables',
];

export default function ContactPage({ origin, onBack }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <aside
      className="contact-page-shell"
      style={{
        '--contact-page-origin-x': `${origin?.x ?? 50}%`,
        '--contact-page-origin-y': `${origin?.y ?? 50}%`,
      }}
      aria-label="Contact page"
    >
      <button className="contact-page-back" type="button" onClick={onBack} ref={closeButtonRef}>
        BACK
      </button>

      <div className="contact-page-layout">
        <section className="contact-page-aside" aria-label="Contact details">
          <h1>Contact</h1>

          <div className="contact-page-card">
            <h2>Let&apos;s talk about your project.</h2>
            <p>
              I respond quickly to internship requests, freelance missions and collaborations around AI products,
              full-stack systems and interactive web experiences.
            </p>
          </div>

          <dl className="contact-page-facts">
            <div>
              <dt>Based in</dt>
              <dd>India</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Student / Freelance</dd>
            </div>
            <div>
              <dt>Avg. response</dt>
              <dd>48h</dd>
            </div>
          </dl>

          <a className="contact-page-email" href="mailto:samaypowade9@gmail.com">
            samaypowade9@gmail.com
          </a>
          <a className="contact-page-whatsapp" href="https://wa.me/919764096358" target="_blank" rel="noreferrer">
            WhatsApp: +91 9764096358
          </a>
        </section>

        <section className="contact-page-main" aria-label="Start a project">
          <p className="contact-page-kicker">Contact</p>
          <h2>Let&apos;s build together.</h2>
          <p className="contact-page-lead">
            AI engineer and full-stack developer focused on agentic AI, RAG pipelines, automation,
            animation, interaction and tailor-made web experiences.
          </p>
          <p className="contact-page-copy">
            If you have a project in mind, an ambitious idea, or a product problem to solve, I&apos;d be glad
            to discuss it with you and explore a practical collaboration.
          </p>

          <div className="contact-page-bottom">
            <div>
              <h3>Shortcuts</h3>
              <nav aria-label="Contact shortcuts">
                {CONTACT_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <h3>Live AI Demos</h3>
              <nav aria-label="Interactive AI systems" className="contact-page-ai-demos">
                <a
                  href="https://wa.me/919764096358?text=Hi%20Samay,%20I%20saw%20your%20portfolio%20and%20wanted%20to%20try%20your%20WhatsApp%20AI%20Assistant!"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-page-ai-link whatsapp-demo-link"
                >
                  <span className="demo-pulse-indicator"></span>
                  <MessageCircle size={18} className="demo-icon" />
                  <span>WhatsApp Bot</span>
                </a>
                <a
                  href="https://github.com/Samay-AI-Verse/ChetanaLabs-"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-page-ai-link voice-demo-link"
                >
                  <span className="demo-pulse-indicator"></span>
                  <PhoneCall size={18} className="demo-icon" />
                  <span>Voice Agent</span>
                </a>
              </nav>
            </div>

            <div>
              <h3>Brief format</h3>
              <ul>
                {BRIEF_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <span className="contact-page-availability">Available 2026</span>
        </section>
      </div>
    </aside>
  );
}
