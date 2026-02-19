/* ============================================
   SAFEPAGE01-YOUTUBE | Euronutry
   Scripts Globais
   ============================================ */

(function () {
  'use strict';

  /* ─── AGE GATE ─── */
  const AGE_GATE_KEY = 'en_age_verified';

  function initAgeGate() {
    const overlay = document.getElementById('age-gate');
    if (!overlay) return;

    const verified = sessionStorage.getItem(AGE_GATE_KEY);
    if (!verified) {
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } else {
      overlay.remove();
    }

    const btnAccept = document.getElementById('age-confirm');
    const btnDeny = document.getElementById('age-deny');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        sessionStorage.setItem(AGE_GATE_KEY, '1');
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s';
        setTimeout(function () {
          overlay.remove();
          document.body.style.overflow = '';
        }, 400);
      });
    }

    if (btnDeny) {
      btnDeny.addEventListener('click', function () {
        window.location.href = 'https://www.google.com';
      });
    }
  }

  /* ─── COOKIE BANNER ─── */
  const COOKIE_KEY = 'en_cookies_accepted';

  function initCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      banner.style.display = 'block';
    }

    const btnAccept = document.getElementById('cookie-accept');
    const btnDecline = document.getElementById('cookie-decline');

    if (btnAccept) {
      btnAccept.addEventListener('click', function () {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        banner.style.display = 'none';
      });
    }

    if (btnDecline) {
      btnDecline.addEventListener('click', function () {
        localStorage.setItem(COOKIE_KEY, 'declined');
        banner.style.display = 'none';
      });
    }
  }

  /* ─── CONTACT FORM ─── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      // Simulate async send (replace with real endpoint if needed)
      setTimeout(function () {
        const successEl = document.getElementById('form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = 'block';
        }
      }, 1200);
    });
  }

  /* ─── SMOOTH SCROLL FOR ANCHORS ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── SCROLL ANIMATIONS ─── */
  function initScrollAnimations() {
    if (!window.IntersectionObserver) return;

    const elements = document.querySelectorAll('.card, .benefit-item, .testimonial, .mission-card, .about-stat');
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ─── INIT ─── */
  document.addEventListener('DOMContentLoaded', function () {
    initAgeGate();
    initCookieBanner();
    initContactForm();
    initSmoothScroll();
    initScrollAnimations();
  });
})();
