import React from 'react';
import './ContributorsSection.css';

// ==========================================
// MOCK DATA (Realistic & Fast for Showcase)
// ==========================================

const ORGANIZATIONS = [
  { id: 'Samay-AI-Verse', name: 'Samay-AI-Verse', desc: 'AI Healthcare Platform' },
  { id: 'Sanjeevaniai-in', name: 'Sanjeevaniai-in', desc: 'Pharmacy Ecosystem' },
  { id: 'Shakti-Team', name: 'Shakti-Team', desc: 'Research Organization' },
  { id: 'Open-Neuro', name: 'Open-Neuro', desc: 'Neuro-Tech Projects' },
  { id: 'TeamSamay', name: 'TeamSamay', desc: 'Developer Community' }
];

const TIMELINE_EVENTS = [
  { id: 1, user: 'Onkarnagargoje', action: 'pushed to', repo: 'Samay-AI-Verse/frontend', time: '2 min ago', type: 'push' },
  { id: 2, user: 'Abh234', action: 'merged PR #124 in', repo: 'Sanjeevaniai-in/api', time: '12 min ago', type: 'merge' },
  { id: 3, user: 'shivam-kapate', action: 'opened Issue #89 in', repo: 'Shakti-Team/core', time: '35 min ago', type: 'issue' },
  { id: 4, user: 'sujalkhargakharate', action: 'created repository', repo: 'TeamSamay/AI-Agent', time: '1 hour ago', type: 'repo' },
  { id: 5, user: 'rutujadhav96k', action: 'starred', repo: 'Open-Neuro/brain-scan', time: '3 hours ago', type: 'star' },
];

const MOCK_CONTRIBUTORS = [
  'Samay-AI-Verse', 'Onkarnagargoje', 'Abh234', 'shivam-kapate', 
  'sujalkhargakharate', 'rutujadhav96k', 'Maheshvarii', 'palkrutwardhanshri-lgtm',
  'torvalds', 'gaearon', 'yyx990803', 'addyosmani', 'sindresorhus', 
  'tj', 'danabramov', 'bradtraversy', 'ryanflorence', 'kentcdodds', 'Rich-Harris'
].map(username => ({
  login: username,
  avatar_url: `https://github.com/${username}.png`,
  html_url: `https://github.com/${username}`,
  role: 'Core Contributor',
  org: 'Samay-AI-Verse',
  repos: Math.floor(Math.random() * 8) + 1,
  commits: Math.floor(Math.random() * 150) + 10,
}));

// ==========================================
// ICONS (Raw SVG to avoid dependencies)
// ==========================================
const IconExternal = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconPush = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg>;
const IconMerge = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>;
const IconIssue = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/></svg>;
const IconRepo = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IconStar = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

export default function ContributorsSection() {

  // Diamond Honeycomb Pattern: 3, 4, 5, 4, 3
  const pattern = [3, 4, 5, 4, 3];
  const hexRows = [];
  let currentIndex = 0;
  for (let count of pattern) {
    hexRows.push(MOCK_CONTRIBUTORS.slice(currentIndex, currentIndex + count));
    currentIndex += count;
  }

  return (
    <section className="network-dashboard" id="network">
      {/* Premium Minimal Background */}
      <div className="network-bg-grid" />
      <div className="network-bg-particles" />
      
      <div className="network-container">
        
        {/* ================= COLUMN 1: Organizations ================= */}
        <div className="network-col-left">
          <div className="org-explorer-header">
            <h3>GitHub Organizations</h3>
            <p>Browse all public organizations.</p>
          </div>

          <div className="org-list">
            {ORGANIZATIONS.map((org) => (
              <a 
                key={org.id} 
                href={`https://github.com/${org.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="org-card"
              >
                <div className="org-card-header">
                  <img src={`https://github.com/${org.id}.png`} alt={org.name} className="org-avatar" />
                  <div className="org-title-area">
                    <h4>{org.name}</h4>
                    <span>{org.desc}</span>
                  </div>
                </div>
                <div className="org-external-icon">
                  <IconExternal />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ================= COLUMN 2: Hero & Timeline ================= */}
        <div className="network-col-center">
          <div className="network-hero">
            <h2 className="hero-title">Connected<br/>Builders</h2>
            <p className="hero-subtitle">
              Explore organizations, contributors, repositories, and live development activity powering our open-source ecosystem.
            </p>
          </div>

          <div className="timeline-feed">
            {TIMELINE_EVENTS.map(event => (
              <div key={event.id} className="timeline-item">
                <div className="timeline-icon">
                  {event.type === 'push' && <IconPush />}
                  {event.type === 'merge' && <IconMerge />}
                  {event.type === 'issue' && <IconIssue />}
                  {event.type === 'repo' && <IconRepo />}
                  {event.type === 'star' && <IconStar />}
                </div>
                <div className="timeline-content">
                  <p>
                    <span className="timeline-user">{event.user}</span> {event.action} <span className="timeline-repo">{event.repo}</span>
                  </p>
                  <span className="timeline-time">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= COLUMN 3: Hexagon Network ================= */}
        <div className="network-col-right">
          {/* Animated Connecting Lines SVG */}
          <svg className="network-lines" aria-hidden="true" width="100%" height="100%" style={{position:'absolute', top:0, left:0, zIndex: 0, pointerEvents: 'none'}}>
            <g stroke="#2EA043" strokeOpacity="0.15" strokeWidth="1" fill="none">
              <path d="M 120 120 L 250 220" className="animated-line" />
              <path d="M 380 120 L 250 220" className="animated-line" style={{animationDelay: '1s'}} />
              <path d="M 250 320 L 250 220" className="animated-line" style={{animationDelay: '2s'}} />
              <path d="M 120 420 L 250 320" className="animated-line" />
              <path d="M 380 420 L 250 320" className="animated-line" style={{animationDelay: '1s'}} />
            </g>
          </svg>

          <div className="hex-network-grid">
            {hexRows.map((row, rowIndex) => (
              <div className="hex-row" key={`row-${rowIndex}`}>
                {row.map((user, idx) => (
                  <div className="hex-wrapper" key={`${user.login}-${idx}`}>
                    <a 
                      href={user.html_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hex-premium" 
                    >
                      <div className="hex-inner">
                        <img src={user.avatar_url} alt={user.login} />
                      </div>
                    </a>

                    {/* Premium Vercel/Linear Style Tooltip */}
                    <div className="premium-tooltip">
                      <div className="tooltip-header">
                        <img src={user.avatar_url} alt="" />
                        <div className="tooltip-title">
                          <strong>{user.login}</strong>
                          <span>{user.role}</span>
                        </div>
                      </div>
                      <div className="tooltip-body">
                        <div className="tooltip-stat">
                          <span>Organization</span>
                          <b>{user.org}</b>
                        </div>
                        <div className="tooltip-stat">
                          <span>Repositories</span>
                          <b>{user.repos}</b>
                        </div>
                        <div className="tooltip-stat">
                          <span>Commits This Week</span>
                          <b>{user.commits}</b>
                        </div>
                        <div className="tooltip-stat">
                          <span>Last Active</span>
                          <b>Just now</b>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
