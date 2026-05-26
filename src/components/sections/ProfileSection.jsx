import React from 'react';
import './ProfileSection.css';
import samayPhoto from '../../image/samayphoto.png';

const NAV_LINKS = [
  { label: 'Skills',         href: '#skills'         },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Participations', href: '#participations' },
];

export default function ProfileSection({ showNav }) {
  return (
    <section className="profile-section">

      {/* ── NAV built into this section ── */}
      <nav className={`profile-nav${showNav ? ' visible' : ''}`}>
        {/* Left — Logo */}
        <a href="#" className="profile-nav-logo">
          Sam<span>a</span>y
        </a>

        {/* Center — links */}
        <ul className="profile-nav-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        {/* Right — Contact CTA */}
        <a href="#contact" className="pnav-cta">Contact</a>
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
