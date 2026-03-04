const profileThemes = {
  cybersecurity: {
    role: 'Cybersecurity Analyst',
    description: 'Designing defense-first architectures, monitoring risks, and protecting digital assets end to end.',
  },
  ethical: {
    role: 'Ethical Hacker',
    description: 'Simulating attacks with responsibility to expose weaknesses and strengthen security posture.',
  },
  developer: {
    role: 'Software Developer',
    description: 'Engineering scalable products with clean code, automation, and thoughtful user experience.',
  },
};

const themeButtons = document.querySelectorAll('.theme-btn');
const roleNode = document.getElementById('hero-role');
const descriptionNode = document.getElementById('hero-description');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const config = profileThemes[theme];
  roleNode.textContent = config.role;
  descriptionNode.textContent = config.description;

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === theme);
  });
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));

const parallaxCards = document.querySelectorAll('[data-speed]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty('--hero-offset', `${Math.min(scrollY * -0.06, 0)}px`);

  parallaxCards.forEach((card) => {
    const speed = Number(card.dataset.speed);
    card.style.transform = `translateY(${scrollY * speed * 0.22}px)`;
  });
});

// Canvas animation for subtle hacker vibe
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let columns;
let drops;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const fontSize = 16;
  columns = Math.floor(canvas.width / fontSize);
  drops = new Array(columns).fill(1);
}

function drawRain() {
  ctx.fillStyle = 'rgba(5, 9, 19, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#63a3ff';
  ctx.font = '14px monospace';

  drops.forEach((drop, i) => {
    const char = String.fromCharCode(0x30a0 + Math.random() * 96);
    ctx.fillText(char, i * 16, drop * 16);
    drops[i] = drop * 16 > canvas.height && Math.random() > 0.975 ? 0 : drop + 1;
  });

  requestAnimationFrame(drawRain);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawRain();

const yearNode = document.getElementById('year');
yearNode.textContent = new Date().getFullYear();
applyTheme('cybersecurity');
