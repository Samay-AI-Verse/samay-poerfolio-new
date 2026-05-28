import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CertificationsSection.css';

const CERTIFICATIONS = [
  {
    id: 1,
    src: '/certifications/1.png',
    title: 'Data Analysis Essentials',
    issuer: 'Cognitive Class',
    details: 'Verified expertise in data handling, cleaning, and essential exploratory analysis.',
  },
  {
    id: 2,
    src: '/certifications/2.png',
    title: 'GenAI Foundations',
    issuer: 'Google Cloud',
    details: 'Foundational concepts of Generative AI, Large Language Models, and Google Cloud AI services.',
  },
  {
    id: 3,
    src: '/certifications/3.png',
    title: 'LLM Orchestration',
    issuer: 'IBM Watsonx',
    details: 'Advanced architecture for orchestrating language models, prompt engineering, and context pipelines.',
  },
  {
    id: 4,
    src: '/certifications/4.png',
    title: 'Vector Database Mastery',
    issuer: 'Milvus / Linux Foundation',
    details: 'Vector indexing, high-performance semantic search implementation, and embeddings management.',
  },
  {
    id: 5,
    src: '/certifications/5.png',
    title: 'Cloud Deployment',
    issuer: 'IBM Cloud',
    details: 'Deploying secure, scalable microservices, managing container orchestration and serverless systems.',
  },
  {
    id: 6,
    src: '/certifications/6.png',
    title: 'Full Stack Development',
    issuer: 'IBM Academic',
    details: 'End-to-end full-stack software development using modern reactive frameworks and database engines.',
  },
  {
    id: 7,
    src: '/certifications/7.png',
    title: 'Machine Learning',
    issuer: 'Cognitive Class',
    details: 'Supervised and unsupervised algorithm implementations, regression, classification, and model tuning.',
  },
  {
    id: 8,
    src: '/certifications/8.png',
    title: 'Deep Learning',
    issuer: 'Cognitive Class',
    details: 'Neural networks, multi-layered perceptrons, backpropagation, and specialized learning architectures.',
  },
  {
    id: 9,
    src: '/certifications/9.png',
    title: 'NLP Specialization',
    issuer: 'IBM Watson',
    details: 'Natural Language Processing, syntactic/semantic analysis, transformers, and sequence modeling.',
  },
  {
    id: 10,
    src: '/certifications/10.png',
    title: 'Computer Vision',
    issuer: 'Cognitive Class',
    details: 'Image processing, CNN implementation, object detection, and visual recognition algorithms.',
  },
  {
    id: 11,
    src: '/certifications/11.png',
    title: 'Azure AI Engineering',
    issuer: 'Microsoft',
    details: 'Building, deploying, and managing cognitive AI solutions across the Microsoft Azure ecosystem.',
  },
];

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  // Divide certificates into two balanced rows of 6 items each
  const row1 = CERTIFICATIONS.slice(0, 6);
  const row2 = [...CERTIFICATIONS.slice(6), CERTIFICATIONS[0]]; 

  // Duplicate for seamless infinite loop scroll
  const loopRow1 = [...row1, ...row1];
  const loopRow2 = [...row2, ...row2];

  return (
    <section className="cert-section" id="certifications" aria-label="Certifications">
      {/* Decorative premium silver glows */}
      <div className="cert-bg-glow cert-glow-silver-1" />
      <div className="cert-bg-glow cert-glow-silver-2" />

      <div className="cert-container">
        <header className="cert-header">
          <h2 className="cert-title">Certifications</h2>
        </header>

        {/* ROW 1: Scrolling Left (Westbound) */}
        <div className="cert-marquee-container">
          <div className="cert-marquee-rail">
            <div className="cert-marquee-track cert-track-left">
              {loopRow1.map((cert, index) => (
                <div
                  key={`r1-${cert.id}-${index}`}
                  className="cert-card-item"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="cert-card-inner">
                    <div className="cert-image-container">
                      <img
                        src={cert.src}
                        alt={cert.title}
                        loading="lazy"
                        className="cert-card-img"
                      />
                      <div className="cert-card-overlay">
                        <span className="cert-overlay-action">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Scrolling Right (Eastbound) */}
        <div className="cert-marquee-container cert-row-spacing">
          <div className="cert-marquee-rail">
            <div className="cert-marquee-track cert-track-right">
              {loopRow2.map((cert, index) => (
                <div
                  key={`r2-${cert.id}-${index}`}
                  className="cert-card-item"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="cert-card-inner">
                    <div className="cert-image-container">
                      <img
                        src={cert.src}
                        alt={cert.title}
                        loading="lazy"
                        className="cert-card-img"
                      />
                      <div className="cert-card-overlay">
                        <span className="cert-overlay-action">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cert-footer-tip">
          <span>💡 Click any certificate to inspect in fullscreen view</span>
        </div>
      </div>

      {/* Premium Lightbox Modal using Framer Motion (Silver/White Theme) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-modal-backdrop"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                <span>&times;</span>
              </button>

              <div className="cert-modal-layout">
                {/* Certificate Display Area */}
                <div className="cert-modal-media">
                  <img
                    src={selectedCert.src}
                    alt={selectedCert.title}
                    className="cert-modal-img"
                  />
                </div>

                {/* Certificate Meta Details */}
                <div className="cert-modal-info">
                  <div className="cert-modal-badge">
                    <span className="cert-badge-dot" />
                    <span>Verified Academic Credential</span>
                  </div>
                  <h3 className="cert-modal-title">{selectedCert.title}</h3>
                  <span className="cert-modal-issuer-tag">{selectedCert.issuer}</span>
                  
                  <div className="cert-modal-divider" />
                  
                  <p className="cert-modal-description">
                    {selectedCert.details}
                  </p>
                  
                  <div className="cert-modal-meta-grid">
                    <div className="cert-meta-item">
                      <span className="cert-meta-label">Credential Verification</span>
                      <span className="cert-meta-value cert-status-active">Passed</span>
                    </div>
                    <div className="cert-meta-item">
                      <span className="cert-meta-label">Domain</span>
                      <span className="cert-meta-value">Expertise Validated</span>
                    </div>
                  </div>

                  <button
                    className="cert-modal-btn-close"
                    onClick={() => setSelectedCert(null)}
                  >
                    Dismiss View
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
