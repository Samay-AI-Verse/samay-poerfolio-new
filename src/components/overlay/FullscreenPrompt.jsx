import './FullscreenPrompt.css';

export default function FullscreenPrompt({ onEnter }) {
  return (
    <div className="fs-prompt-overlay" aria-hidden="false">
      <button className="fsp-center" type="button" onClick={onEnter}>
        <svg className="fsp-zoom-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20 L4 4 L20 4"   stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M44 4 L60 4 L60 20"  stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M60 44 L60 60 L44 60" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 60 L4 60 L4 44"  stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="fsp-label">Click for Better Experience</p>
      </button>
    </div>
  );
}
