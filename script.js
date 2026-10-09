/* ==============================
   MELODY GROUP – SCRIPT.JS
   Standard Corporate Profile
================================= */

// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    initAOS();
    initCounters('.hero-stat-num', '[data-count]');
  }, 600);
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });
}

// ── SMOOTH SCROLL ──
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth'
    });
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#' || !href) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});

// ── AOS (Intersection Observer Animations) ──
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1600) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters(heroSelector) {
  document.querySelectorAll(heroSelector).forEach(el => {
    const target = parseInt(el.dataset.count);
    if (!isNaN(target)) {
      setTimeout(() => animateCounter(el, target), 300);
    }
  });
}

// Section counters (stats section)
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        if (!isNaN(target)) animateCounter(counter, target, 1800);
      });
    }
  });
}, { threshold: 0.25 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// ── FORM SUBMIT ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalContent = btn.innerHTML;

  btn.innerHTML = '<span>Mengirim...</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.disabled = false;
    e.target.reset();

    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }
  }, 1200);
}

// ── TIMELINE ENTRY ANIMATION ──
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  timelineItems.forEach(item => observer.observe(item));
}

window.addEventListener('load', () => {
  setTimeout(initTimelineAnimation, 700);
});
