import React from 'react';
import './sections.css';

const STATS = [
  { value: '10+', label: 'AI Projects Shipped' },
  { value: '3+',  label: 'Years of Coding'     },
  { value: '5+',  label: 'Cloud Deployments'   },
  { value: '∞',   label: 'Lines of Python'     },
];

export default function SkillsSection() {
  return (
    <section className="content-section skills-section">
      <div className="section-inner">
        <span className="section-label">By The Numbers</span>
        <h2 className="section-title">Building Things That Work</h2>
        <p className="section-body">
          I focus on shipping complete, production-ready AI systems — from data pipelines to deployment.
          Every project is an opportunity to solve a real problem with clean code and reliable architecture.
        </p>
        <div className="stat-row">
          {STATS.map(({ value, label }) => (
            <div className="stat-card" key={label}>
              <h3>{value}</h3>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
