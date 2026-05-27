import './CertificationsSection.css';

const CERTIFICATIONS = [
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.34 AM.jpeg',
    title: 'Kratos 2026',
    shape: 'portrait',
  },
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.40 AM.jpeg',
    title: 'Lab Session',
    shape: 'wide',
  },
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.41.26 AM.jpeg',
    title: 'Development Lab',
    shape: 'portrait',
  },
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.44 AM.jpeg',
    title: 'Project Showcase',
    shape: 'wide',
  },
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.40.45 AM.jpeg',
    title: 'Team Build',
    shape: 'wide',
  },
  {
    src: '/highlights/WhatsApp Image 2026-05-28 at 12.41.25 AM.jpeg',
    title: 'Certification Work',
    shape: 'wide',
  },
  {
    src: '/highlights/hackfusion.jpeg',
    title: 'Hackfusion',
    shape: 'wide',
  },
  {
    src: '/highlights/depex_main.jpeg',
    title: 'Depex',
    shape: 'square',
  },
];

const tracks = [
  CERTIFICATIONS.slice(0, 6),
  CERTIFICATIONS.slice(2, 8),
  [...CERTIFICATIONS.slice(4), ...CERTIFICATIONS.slice(0, 4)],
];

function CertificationCard({ item }) {
  return (
    <figure className={`cert-card cert-card--${item.shape}`}>
      <img src={item.src} alt={item.title} loading="lazy" />
    </figure>
  );
}

export default function CertificationsSection() {
  return (
    <section className="cert-section" id="certifications" aria-label="Certifications">
      <div className="cert-shell">
        <div className="cert-marquee" aria-hidden="true">
          {tracks.map((track, trackIndex) => {
            const loop = [...track, ...track];
            return (
              <div className={`cert-rail cert-rail--${trackIndex + 1}`} key={trackIndex}>
                <div className="cert-track">
                  {loop.map((item, index) => (
                    <CertificationCard
                      item={item}
                      key={`${trackIndex}-${item.src}-${index}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
