import {
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGooglecloud,
  siGooglegemini,
  siHuggingface,
  siJavascript,
  siLangchain,
  siLanggraph,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siQdrant,
  siReact,
  siStreamlit,
  siSupabase,
  siTailwindcss,
  siVercel,
  siWhatsapp,
} from 'simple-icons';
import flaskIcon from 'devicon/icons/flask/flask-original.svg?raw';
import mysqlIcon from 'devicon/icons/mysql/mysql-original.svg?raw';
import numpyIcon from 'devicon/icons/numpy/numpy-original.svg?raw';
import pandasIcon from 'devicon/icons/pandas/pandas-original.svg?raw';
import postgresqlIcon from 'devicon/icons/postgresql/postgresql-original.svg?raw';
import pythonIcon from 'devicon/icons/python/python-original.svg?raw';
import './AboutSection.css';

const SvgIcon = ({ icon, title, className = '' }) => (
  <svg
    className={`brand-icon ${className}`.trim()}
    viewBox="0 0 24 24"
    role="img"
    aria-label={`${title} logo`}
    fill="currentColor"
    style={{ color: `#${icon.hex}` }}
  >
    <title>{title}</title>
    <path d={icon.path} />
  </svg>
);

const RawSvgIcon = ({ name, svg, className = '' }) => (
  <span
    className={`brand-icon ${className}`.trim()}
    role="img"
    aria-label={`${name} logo`}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);

const OpenAIIcon = ({ className = '', ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    role="img"
    fill="currentColor"
    {...props}
  >
    <title>OpenAI</title>
    <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.282 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
  </svg>
);

/* ── ROW ONE: AI / ML / LLM Stack ── */
const ROW_ONE = [
  { name: 'Python', icon: <RawSvgIcon name="Python" svg={pythonIcon} /> },
  { name: 'LangChain', icon: <SvgIcon title="LangChain" icon={siLangchain} /> },
  { name: 'LangGraph', icon: <SvgIcon title="LangGraph" icon={siLanggraph} /> },
  { name: 'Qdrant', icon: <SvgIcon title="Qdrant" icon={siQdrant} /> },
  { name: 'OpenAI', icon: <OpenAIIcon className="brand-icon brand-icon-openai" aria-label="OpenAI logo" /> },
  { name: 'Gemini', icon: <SvgIcon title="Google Gemini" icon={siGooglegemini} /> },
  { name: 'Hugging Face', icon: <SvgIcon title="Hugging Face" icon={siHuggingface} /> },
  { name: 'Ollama', icon: <SvgIcon title="Ollama" icon={siOllama} className="brand-icon-light" /> },
  { name: 'WhatsApp', icon: <SvgIcon title="WhatsApp" icon={siWhatsapp} /> },
  { name: 'Streamlit', icon: <SvgIcon title="Streamlit" icon={siStreamlit} /> },
  { name: 'NumPy', icon: <RawSvgIcon name="NumPy" svg={numpyIcon} /> },
  { name: 'Pandas', icon: <RawSvgIcon name="Pandas" svg={pandasIcon} /> },
];

/* ── ROW TWO: Full-Stack / Backend / DevOps / DB ── */
const ROW_TWO = [
  { name: 'JavaScript', icon: <SvgIcon title="JavaScript" icon={siJavascript} /> },
  { name: 'React', icon: <SvgIcon title="React" icon={siReact} /> },
  { name: 'Next.js', icon: <SvgIcon title="Next.js" icon={siNextdotjs} className="brand-icon-light" /> },
  { name: 'Node.js', icon: <SvgIcon title="Node.js" icon={siNodedotjs} /> },
  { name: 'Tailwind CSS', icon: <SvgIcon title="Tailwind CSS" icon={siTailwindcss} /> },
  { name: 'FastAPI', icon: <SvgIcon title="FastAPI" icon={siFastapi} /> },
  { name: 'Flask', icon: <RawSvgIcon name="Flask" svg={flaskIcon} className="brand-icon-invert" /> },
  { name: 'MySQL', icon: <RawSvgIcon name="MySQL" svg={mysqlIcon} /> },
  { name: 'PostgreSQL', icon: <RawSvgIcon name="PostgreSQL" svg={postgresqlIcon} /> },
  { name: 'MongoDB', icon: <SvgIcon title="MongoDB" icon={siMongodb} /> },
  { name: 'Supabase', icon: <SvgIcon title="Supabase" icon={siSupabase} /> },
  { name: 'Docker', icon: <SvgIcon title="Docker" icon={siDocker} /> },
  { name: 'Google Cloud', icon: <SvgIcon title="Google Cloud" icon={siGooglecloud} /> },
  { name: 'Git', icon: <SvgIcon title="Git" icon={siGit} /> },
  { name: 'GitHub', icon: <SvgIcon title="GitHub" icon={siGithub} className="brand-icon-light" /> },
  { name: 'Vercel', icon: <SvgIcon title="Vercel" icon={siVercel} className="brand-icon-light" /> },
];

const MarqueeItem = ({ name, icon }) => (
  <div className="about-mq-item">
    <div className="about-mq-icon">{icon}</div>
    <span className="about-mq-label">{name}</span>
  </div>
);

const MarqueeStrip = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div className="about-mq-outer">
      <div className={`about-mq-inner ${reverse ? 'about-mq-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item.name}-${i}`} name={item.name} icon={item.icon} />
        ))}
      </div>
    </div>
  );
};




export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-left">
          <span className="about-label">About Me</span>
          <h2 className="about-title">
            I build AI systems that connect data, automation, and backend workflows.
          </h2>
          <p className="about-bio">
            I work on AI products that connect language models, backend services,
            and structured data. My focus is simple: take a useful idea from
            prototype to a reliable system people can actually use.
          </p>
          <div className="about-profile-card">
            <div className="profile-card-row">
              <span>Education</span>
              <p>B.Tech 3rd Year - AI &amp; Computer Engineering</p>
            </div>
            <div className="profile-card-row">
              <span>College</span>
              <p>Gramin Technical &amp; Management Science College, Maneeg Campus</p>
            </div>
          </div>
        </div>

        {/* RIGHT — Clean profile photo */}
        <div className="about-right">
          <div className="profile-visual">
            <div className="pv-avatar">
              <img
                src="/cool.jpeg"
                alt="Samay"
                className="pv-avatar-img"
                draggable="false"
              />
            </div>
          </div>
        </div>


        {/* FULL-WIDTH — icon marquee */}
        <div className="about-marquee-section">
          <MarqueeStrip items={ROW_ONE} />
          {/* <div className="mq-center-label">
            <span className="mq-label-line" />
            <span className="mq-label-text">Skills</span>
            <span className="mq-label-line" />
          </div> */}
          <MarqueeStrip items={ROW_TWO} reverse />
        </div>
      </div>
    </section>
  );
}
