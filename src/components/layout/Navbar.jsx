import './Navbar.css';

const NAV_LINKS = [
  { label: 'Projects',       href: '#projects'       },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Participations', href: '#participations' },
  { label: 'Contact',        href: '#contact', cta: true },
];

export default function Navbar({ visible }) {
  return (
    <nav className={`navbar${visible ? ' visible' : ''}`}>
      {/* Logo */}
      <a href="#" className="nav-logo">
        Sam<span>a</span>y
      </a>

      {/* Navigation links */}
      <ul className="nav-links">
        {NAV_LINKS.map(({ label, href, cta }) => (
          <li key={label}>
            <a href={href} className={cta ? 'nav-cta' : ''}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
