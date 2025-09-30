// ================================
// 🌌 FADE-IN + SLIDE DES SECTIONS
// ================================
const sections = document.querySelectorAll('.section');

function revealSections() {
  const windowHeight = window.innerHeight;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
revealSections();


// ================================
// ⭐ CANVAS ÉTOILES + LUNE RÉALISTE
// ================================
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Génération étoiles
const stars = [];
const numStars = 200;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.2 + 0.05
  });
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Position et caractéristiques de la lune
const moonX = width / 2;
const moonY = height / 2;
const moonRadius = 80;

// Cratères fixes sur la lune
const craters = [];
for (let i = 0; i < 15; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * moonRadius * 0.6;
  const craterX = moonX + radius * Math.cos(angle);
  const craterY = moonY + radius * Math.sin(angle);
  const craterRadius = Math.random() * 5;
  craters.push({ x: craterX, y: craterY, r: craterRadius });
}

function drawMoon() {
  // 🌌 Halo plus petit
  const gradient = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 6);
  gradient.addColorStop(0, 'rgba(255, 255, 230, 0.35)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 230, 0.15)');
  gradient.addColorStop(1, 'rgba(18, 25, 35, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius * 6, 0, Math.PI * 2);
  ctx.fill();

  // 🌙 Lune solide
  ctx.fillStyle = '#ffffee';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
  ctx.fill();

  // Cratères fixes
  craters.forEach(crater => {
    ctx.fillStyle = 'rgba(200,200,180,0.4)';
    ctx.beginPath();
    ctx.arc(crater.x, crater.y, crater.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  drawMoon();

  // ⭐ Étoiles
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 2;

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // Déplacement lent des étoiles
    star.x += star.speed;
    if (star.x > width) star.x = 0;
  });

  requestAnimationFrame(animate);
}

animate();
