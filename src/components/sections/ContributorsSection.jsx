import React, { useState, useEffect } from 'react';
import './ContributorsSection.css';

// 💡 The main user account
const PRIMARY_ACCOUNT = 'Samay-AI-Verse'; 

// 💡 Orgs discovered from CLI
const ORGANIZATIONS = [
  PRIMARY_ACCOUNT,
  'Sanjeevaniai-in',
  'Shakti-Team',
  'Open-Neuro',
  'TeamSamay',
];

// 💡 Default team accounts to always show (using .png trick for auto avatars)
const TEAM_USERNAMES = [
  'Samay-AI-Verse',
  'Onkarnagargoje',
  'Abh234',
  'shivam-kapate',
  'sujalkhargakharate',
  'rutujadhav96k',
  'Maheshvarii',
  'palkrutwardhanshri-lgtm'
];

const DEFAULT_CONTRIBUTORS = TEAM_USERNAMES.map(username => ({
  login: username,
  avatar_url: `https://github.com/${username}.png`,
  html_url: `https://github.com/${username}`,
  type: 'Core',
  isDefault: true
}));

export default function ContributorsSection() {
  const [activeOrg, setActiveOrg] = useState(PRIMARY_ACCOUNT);
  const [contributors, setContributors] = useState(DEFAULT_CONTRIBUTORS);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchRealContributors = async () => {
      if (cache[activeOrg]) {
        setContributors([...DEFAULT_CONTRIBUTORS, ...cache[activeOrg]]);
        return;
      }

      setLoading(true);
      try {
        const reposRes = await fetch(`https://api.github.com/users/${activeOrg}/repos?sort=pushed&per_page=4`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const repos = await reposRes.json();

        let allContributors = [];
        
        for (const repo of repos) {
          if (repo.fork) continue; 
          
          const contribRes = await fetch(`https://api.github.com/repos/${activeOrg}/${repo.name}/contributors?per_page=15`);
          if (contribRes.ok) {
            const contribs = await contribRes.json();
            if (Array.isArray(contribs)) {
              allContributors = [...allContributors, ...contribs];
            }
          }
        }

        const uniqueContributorsMap = new Map();
        allContributors.forEach(c => {
          if (!uniqueContributorsMap.has(c.login) && c.type === 'User') {
            uniqueContributorsMap.set(c.login, c);
          }
        });
        
        let apiContributors = Array.from(uniqueContributorsMap.values());

        const defaultLogins = DEFAULT_CONTRIBUTORS.map(c => c.login.toLowerCase());
        apiContributors = apiContributors.filter(c => !defaultLogins.includes(c.login.toLowerCase()));
        
        if (isMounted) {
          setCache(prev => ({ ...prev, [activeOrg]: apiContributors }));
          setContributors([...DEFAULT_CONTRIBUTORS, ...apiContributors]);
        }
      } catch (error) {
        console.warn(`Could not fetch GitHub data for ${activeOrg}. Rate limit might be exceeded.`, error);
        if (isMounted) {
          setContributors(DEFAULT_CONTRIBUTORS);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRealContributors();

    return () => { isMounted = false; };
  }, [activeOrg]);

  return (
    <section className="contributors-section" id="contributors">
      <div className="contributors-container">
        
        {/* Left Side: Organization / Text Info */}
        <div className="contributors-content">
          <h2 className="section-title">
            Our <span>Network</span>
          </h2>
          <p className="contributors-desc">
            The incredible minds behind our open-source ecosystem. Real-time contributions powering 
            innovations across our organizations.
          </p>
          
          <div className="org-layout">
            {/* Vertical Organization List */}
            <div className="org-sidebar">
              <p className="org-label">Select Workspace</p>
              <div className="org-vertical-list">
                {ORGANIZATIONS.map(org => (
                  <button 
                    key={org}
                    className={`org-list-item ${activeOrg === org ? 'active' : ''}`}
                    onClick={() => setActiveOrg(org)}
                  >
                    <span className="org-name">{org}</span>
                    {activeOrg === org && <span className="org-indicator"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Block */}
            <div className="org-stats-block">
              <div className="org-stats">
                <div className="stat-item">
                  <span className="stat-number">{loading ? '...' : contributors.length}+</span>
                  <span className="stat-label">Contributors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Live</span>
                  <span className="stat-label">Sync</span>
                </div>
              </div>
              
              <a href={`https://github.com/${activeOrg}`} target="_blank" rel="noreferrer" className="github-btn">
                View {activeOrg} <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Honeycomb Pattern Grid */}
        <div className="honeycomb-wrapper">
          <div className={`honeycomb-grid ${loading ? 'loading' : ''}`}>
            {contributors.map((user, idx) => (
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hex" 
                key={`${user.login}-${idx}`}
                style={{ animationDelay: `${(idx % 10) * 0.1}s` }}
              >
                <div className="hex-inner">
                  <img src={user.avatar_url} alt={user.login} />
                  <div className="hex-overlay">
                    <span>{user.login}</span>
                    {user.isDefault && <small>{user.type}</small>}
                  </div>
                </div>
              </a>
            ))}
            
            {/* Add placeholder empty hexagons to maintain a nice pattern if data is small */}
            {[...Array(Math.max(0, 10 - contributors.length))].map((_, i) => (
              <div className="hex hex-empty" key={`empty-${i}`}>
                <div className="hex-inner"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
