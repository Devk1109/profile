const { useEffect, useMemo, useRef, useState } = React;

const themes = {
  cybersecurity: {
    title: 'Cybersecurity Professional',
    desc: 'Blue-team mindset, threat intelligence, SOC workflows and secure architecture.',
    accent: '#31a0ff',
  },
  ethical: {
    title: 'Ethical Hacker',
    desc: 'Adversarial testing, exploitation simulation, and remediation-first reporting.',
    accent: '#4bb6ff',
  },
  developer: {
    title: 'Software Developer',
    desc: 'Building reliable products with clean code, modern UI, and scalable systems.',
    accent: '#6d8eff',
  },
};

function TouchReactiveModel() {
  const node = useRef(null);
  const [pressed, setPressed] = useState(false);

  const onMove = (x, y, rect) => {
    const rx = ((y - rect.top) / rect.height - 0.5) * -28;
    const ry = ((x - rect.left) / rect.width - 0.5) * 30;
    node.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${pressed ? 1.08 : 1})`;
  };

  const handlePointerMove = (e) => {
    const rect = node.current.parentElement.getBoundingClientRect();
    onMove(e.clientX, e.clientY, rect);
  };

  const handleTouchMove = (e) => {
    const t = e.touches[0];
    const rect = node.current.parentElement.getBoundingClientRect();
    onMove(t.clientX, t.clientY, rect);
  };

  const reset = () => (node.current.style.transform = 'rotateX(0) rotateY(0) scale(1)');

  return (
    <div className="model-wrap" onPointerMove={handlePointerMove} onPointerLeave={reset} onTouchMove={handleTouchMove}>
      <div
        ref={node}
        className="avatar"
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
      >
        <div className="avatar-core"></div>
      </div>
      <p>Touch / drag to interact with the 3D model</p>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('cybersecurity');
  const current = useMemo(() => themes[theme], [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', current.accent);
  }, [current]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.2 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="container">
      <header className="nav">
        <div className="brand">YOUR <span>PROFILE</span></div>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#focus">Focus</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn" href="assets/resume-template.txt" download>⬇ Resume</a>
      </header>

      <section className="hero">
        <div className="reveal visible">
          <div className="kicker">React Portfolio • Hacker Vibes</div>
          <h1>{current.title}</h1>
          <p>{current.desc}</p>
          <div className="theme-buttons">
            {Object.keys(themes).map((name) => (
              <button key={name} className={theme === name ? 'active' : ''} onClick={() => setTheme(name)}>{name}</button>
            ))}
          </div>
        </div>
        <TouchReactiveModel />
      </section>

      <section id="about" className="panel reveal">
        <h2>About</h2>
        <p>
          This React-based portfolio is inspired by modern showcase websites with immersive hero sections,
          dark neon-blue cyber styling, smooth scroll reveals, and an interactive 3D touch-reactive model.
        </p>
      </section>

      <section id="focus" className="panel grid3 reveal">
        <article className="card"><h3>Cybersecurity</h3><p>Defense strategy, monitoring, incident response.</p></article>
        <article className="card"><h3>Ethical Hacking</h3><p>Controlled attack simulation and vulnerability assessments.</p></article>
        <article className="card"><h3>Software Development</h3><p>Product-focused engineering for web applications.</p></article>
      </section>

      <section id="contact" className="panel reveal">
        <h2>Contact & Links</h2>
        <div className="links">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">🔗 LinkedIn</a>
          <a href="https://example.com/certificates" target="_blank" rel="noreferrer">🎓 Certificates</a>
          <a href="mailto:yourmail@example.com">✉ yourmail@example.com</a>
          <a href="tel:+1234567890">☎ +1 234 567 890</a>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
