/* ============================================================
   ФАВОРИТ — v3 motion layer
   Native scroll · IntersectionObserver reveals · GSAP core (intro + magnetic)
   progressive, reduced-motion safe
   ============================================================ */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGSAP = typeof gsap !== 'undefined';

  /* ── Anchor scroll (native) ────────────────────────────── */
  const scrollTo = (target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ── Anchor + data-scroll buttons ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.length < 2) return;
    a.addEventListener('click', (e) => { e.preventDefault(); scrollTo(href); });
  });
  document.querySelectorAll('[data-scroll]').forEach((b) => {
    b.addEventListener('click', () => scrollTo(b.getAttribute('data-scroll')));
  });

  /* ── Nav scrolled state ────────────────────────────────── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ───────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const mClose = document.getElementById('mClose');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(true));
  mClose.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('.m-link').forEach((l) =>
    l.addEventListener('click', () => { setMenu(false); setTimeout(() => scrollTo(l.getAttribute('href')), 320); })
  );
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ── Contact form → serverless function (Telegram) ─────── */
  const form = document.getElementById('contactForm');
  if (form) {
    const btn = document.getElementById('submitBtn');
    const en = document.documentElement.lang === 'en';
    const T = en
      ? { sending: 'Sending…', sent: 'Sent ✓', err: 'Something went wrong, try again' }
      : { sending: 'Отправляем…', sent: 'Отправлено ✓', err: 'Не отправилось, попробуйте ещё раз' };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = T.sending;
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then((res) => { if (!res.ok) throw new Error('bad status'); })
        .then(() => {
          btn.textContent = T.sent;
          btn.style.background = '#7bb86a'; btn.style.color = '#0a0a0b';
          form.reset();
        })
        .catch(() => {
          btn.textContent = T.err;
          btn.style.background = '#c0563f'; btn.style.color = '#fff';
        })
        .finally(() => {
          setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 4000);
        });
    });
  }

  /* ── Hero guilloché — generated rosette (banknote-grade detail) ── */
  document.querySelectorAll('.orbit-svg .guilloche').forEach((g) => {
    const C = 200, TWO_PI = Math.PI * 2;
    const rose = (petals, baseR, amp, cycles, precess, cls) => {
      const steps = 132;
      let d = '';
      for (let c = 0; c < cycles; c++) {
        const ph = c * precess;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * TWO_PI;
          const rr = baseR + amp * Math.cos(petals * t);
          const x = C + rr * Math.cos(t + ph);
          const y = C + rr * Math.sin(t + ph);
          d += (c === 0 && i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
      }
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      p.setAttribute('pathLength', '1');
      p.setAttribute('class', 'g-line ' + cls);
      g.appendChild(p);
    };
    rose(7, 108, 44, 28, TWO_PI / 28, 'g-bone');
    rose(7, 108, 44, 28, TWO_PI / 28 + 0.05, 'g-brass');
  });

  /* ── Reduced motion: show everything, skip animation ───── */
  if (reduced || !hasGSAP) {
    document.querySelectorAll('.reveal').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; el.style.clipPath = 'none'; });
    document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = el.dataset.count; });
    return;
  }

  /* ── Page-load orchestration ───────────────────────────── */
  gsap.set('[data-line]', { yPercent: 115 });
  gsap.set('[data-hero]', { opacity: 0, y: 18 });

  const intro = gsap.timeline({ delay: 0.12, defaults: { ease: 'power4.out' } });
  intro
    .to('[data-line]', { yPercent: 0, duration: 1.15, stagger: 0.09 })
    .to('.hero-foot[data-hero]', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');

  /* ── Scroll reveals (IntersectionObserver + CSS) ───────── */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
  document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

  /* ── Counters (IntersectionObserver-triggered) ─────────── */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      countIO.unobserve(el);
      gsap.to({ v: 0 }, {
        v: +el.dataset.count, duration: 1.7, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].v); }
      });
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el));

})();
