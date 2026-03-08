/* ============================================================
   StringsByKorn — Main JS
   ============================================================ */

// ---- Mobile nav --------------------------------------------
(function () {
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelector('.bar-top').style.transform    = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    hamburger.querySelector('.bar-mid').style.opacity      = isOpen ? '0' : '';
    hamburger.querySelector('.bar-bot').style.transform    = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      hamburger.querySelector('.bar-top').style.transform = '';
      hamburger.querySelector('.bar-mid').style.opacity   = '';
      hamburger.querySelector('.bar-bot').style.transform = '';
    })
  );
})();

// ---- Active nav link ---------------------------------------
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- FAQ accordion -----------------------------------------
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ---- Contact form (Formspree) ------------------------------
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please try again or DM @stringsbykorn on Instagram.');
      }
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Could not send message. Check your connection and try again.');
    }
  });
})();

// ---- Scroll reveal (lightweight) ---------------------------
(function () {
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  els.forEach(el => observer.observe(el));
})();

// ---- Smooth counter animation (stats) ----------------------
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 35);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();
