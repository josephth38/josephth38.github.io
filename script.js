// ============================
// 🌌 Animation du fond (étoiles + lune)
// ============================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 120;
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: 0.05 + Math.random() * 0.05
    });
  }
}

function drawMoon() {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 90;

  // Halo doux
  const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius * 2);
  gradient.addColorStop(0, "rgba(255,255,220,0.3)");
  gradient.addColorStop(1, "rgba(11,22,34,0)");

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
  ctx.fill();

  // Lune principale
  const moonGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius);
  moonGradient.addColorStop(0, "#fff9e6");
  moonGradient.addColorStop(1, "#bfbba5");

  ctx.beginPath();
  ctx.fillStyle = moonGradient;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Cratères légers (fixes)
  const craters = [
    { x: -30, y: -20, r: 8 },
    { x: 25, y: 10, r: 10 },
    { x: 10, y: -30, r: 6 },
  ];
  ctx.fillStyle = "rgba(200,200,180,0.3)";
  craters.forEach(c => {
    ctx.beginPath();
    ctx.arc(centerX + c.x, centerY + c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  // Étoiles
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // Mouvement doux
    star.y += star.speed;
    if (star.y > height) star.y = 0;
  });

  // Lune
  drawMoon();

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();


// ============================
// 🖱️ Navigation entre sections (sidebar + onglets)
// ============================

// Gérer la navigation
const navItems = document.querySelectorAll(".nav li");
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");

function showSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle("visible", i === index);
  });

  navItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  tabs.forEach((tab, i) => {
    tab.classList.toggle("active", i === index);
  });
}

// Ajouter les événements
navItems.forEach((item, index) => {
  item.addEventListener("click", () => showSection(index));
});

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showSection(index));
});

// Affiche la première section par défaut
showSection(0);
