import './sections.css';

export default function ContactSection() {
  return (
    <section className="content-section contact-section">
      <div className="section-inner">
        <span className="section-label">Let's Connect</span>
        <h2 className="section-title">Have a project<br />in mind?</h2>
        <p className="section-body">Drop me a message — I'm always open to exciting collaborations.</p>
        <a href="mailto:samay@example.com" className="cta-btn">Get in Touch →</a>
      </div>
    </section>
  );
}
