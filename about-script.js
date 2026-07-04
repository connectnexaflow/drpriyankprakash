// ============================================================
// BRITE SMILE DENTAL CARE — shared behaviour (About / Services)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav: slide-in panel ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  function closeNav(){
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openNav(){
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && navLinks && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('active');
      isOpen ? closeNav() : openNav();
    });
    overlay.addEventListener('click', closeNav);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeNav(); });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // close any other open items in the same group
      document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  /* ---------- Navbar shrink-on-scroll shadow ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(15,23,42,.08)' : 'none';
    });
  }
});

