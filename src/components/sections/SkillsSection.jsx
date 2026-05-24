import React from 'react';
import './sections.css';

const SKILLS = ['React', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'OpenAI', 'Docker'];

export default function SkillsSection() {
  return (
    <section className="content-section skills-section">
      <div className="section-inner">
        <span className="section-label">Skills</span>
        <h2 className="section-title">What I Work With</h2>
        <div className="skills-grid">
          {SKILLS.map(skill => (
            <div className="skill-pill" key={skill}>{skill}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
