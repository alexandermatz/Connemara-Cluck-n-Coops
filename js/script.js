// ── Navbar scroll effect (home page only) ──────────────────────
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('navbar-solid')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Mobile drawer ──────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navDrawer  = document.getElementById('nav-drawer');
const navOverlay = document.getElementById('nav-overlay');
const navClose   = document.getElementById('nav-close');

function openDrawer() {
  navDrawer.classList.add('open');
  navOverlay.classList.add('show');
  navDrawer.removeAttribute('aria-hidden');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  navDrawer.classList.remove('open');
  navOverlay.classList.remove('show');
  navDrawer.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger)  hamburger.addEventListener('click', openDrawer);
if (navClose)   navClose.addEventListener('click', closeDrawer);
if (navOverlay) navOverlay.addEventListener('click', closeDrawer);

// Close drawer on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('open')) {
    closeDrawer();
    hamburger && hamburger.focus();
  }
});

// Close drawer on link click
navDrawer && navDrawer.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', closeDrawer)
);

// ── Contact form ───────────────────────────────────────────────
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      form.hidden = true;
      formSuccess.hidden = false;
    }, 1000);
  });
}

// ── Scroll reveal ──────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
