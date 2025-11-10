// Navigation + scroll + swipe + typing logic
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("main-container");
  const sections = Array.from(document.querySelectorAll(".page"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const scrollDown = document.querySelector(".scroll-down");

  // NAV LINK CLICK -> scroll to section
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(link.dataset.section, 10);
      if (!Number.isNaN(idx) && sections[idx]) {
        sections[idx].scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Update active link on scroll
  function updateActiveNav() {
    const index = Math.round(container.scrollTop / window.innerHeight);
    navLinks.forEach(n => n.classList.remove("active"));
    if (navLinks[index]) navLinks[index].classList.add("active");
  }
  container.addEventListener("scroll", throttle(updateActiveNav, 100));
  updateActiveNav();

  // Scroll down arrow
  if (scrollDown) {
    scrollDown.addEventListener("click", () => {
      const next = document.getElementById("projects");
      if (next) next.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Touch swipe detection (mobile)
  let startY = 0;
  container.addEventListener("touchstart", (e) => startY = e.touches[0].clientY);
  container.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    if (Math.abs(diff) > 60) {
      const currentIndex = Math.round(container.scrollTop / window.innerHeight);
      const nextIndex = diff > 0 ? currentIndex + 1 : currentIndex - 1;
      if (sections[nextIndex]) sections[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  });

  // Typing animation (character by character) - stable width and full text visible
  const typingEl = document.querySelector(".typing");
  const cursorEl = document.querySelector(".cursor");
  const text = "Passionné de code";
  const typingSpeed = 70; // ms per char
  const pauseAfter = 1500; // ms to wait after full text

  if (typingEl) {
    let i = 0;
    function type() {
      if (i <= text.length) {
        typingEl.textContent = text.slice(0, i);
        i++;
        setTimeout(type, typingSpeed);
      } else {
        // keep full text visible; optionally loop after a pause
        setTimeout(() => {
          // optional: erase and retype loop (comment out if you don't want loop)
          // erase();
          // OR keep static cursor blinking; do nothing to keep it static
        }, pauseAfter);
      }
    }
    // if you prefer a loop (type -> erase -> type), uncomment erase/type logic below:
    /*
    function erase() {
      if (i >= 0) {
        typingEl.textContent = text.slice(0, i);
        i--;
        setTimeout(erase, 40);
      } else {
        setTimeout(() => { i = 0; type(); }, 300);
      }
    }
    */
    type();
  }

  // small utility: throttle
  function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }
});

  // ---- Bouton retour vers le haut ----
  const scrollTopBtn = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    // apparaît après la première section
    if (container.scrollTop > window.innerHeight * 0.6) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  container.addEventListener("scroll", throttle(toggleScrollTop, 100));

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      sections[0].scrollIntoView({ behavior: "smooth" });
    });
  }
