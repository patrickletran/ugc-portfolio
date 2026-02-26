/* ============================================================
   UGC Portfolio — script.js
   ============================================================ */

// --- Nav scroll shadow ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// --- Close mobile menu when a nav link is clicked ---
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navToggle) navToggle.checked = false;
  });
});

// --- Active nav link highlighting via Intersection Observer ---
const sections = document.querySelectorAll('section[id]');

const observerOptions = {
  root: null,
  // Trigger when section top is within the top 30% of the viewport
  rootMargin: `-${getNavHeight()}px 0px -60% 0px`,
  threshold: 0
};

function getNavHeight() {
  return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 68;
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;

    if (entry.isIntersecting) {
      // Remove active from all links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// --- Pause other videos when one starts playing ---
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

// --- Auto-update footer year ---
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
