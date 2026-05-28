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
  return (
    <section className="profile-section">

      {/* ── NAV built into this section ── */}
      <nav className={`profile-nav${showNav ? ' visible' : ''}`}>
        {/* Left — Logo */}
        <ul className="profile-social-links" aria-label="Social links">
          {SOCIAL_LINKS.map(({ label, href }, index) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">{label}</a>
              {index < SOCIAL_LINKS.length - 1 && <span className="profile-nav-divider">/</span>}
            </li>
          ))}
        </ul>

        {/* Center — links */}
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

        {/* Right — Contact CTA */}
      </nav>

      {/* ── LEFT — text ── */}
      <div className="profile-left">
        <span className="profile-eyebrow">AI Engineer · Full-Stack Developer</span>
        <h2 className="profile-name">
          Samay<br />Powade
        </h2>
        <p className="profile-role">Building the Future with AI &amp; Code</p>
        <p className="profile-desc">
          AI Engineer | Building LLM-Based Systems, RAG Pipelines &amp; AI Applications
          | Python Backend for AI Systems | DIPEX 2K26
        </p>
      </div>

      {/* ── RIGHT — photo ── */}
      <div className="profile-right">
        <img
          src={samayPhoto}
          alt="Samay Powade"
          className="profile-photo"
        />
      </div>

    </section>
  );
}
