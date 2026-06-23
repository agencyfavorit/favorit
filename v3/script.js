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

  /* ── Magnetic buttons (desktop only) ───────────────────── */
  if (finePointer && !reduced && hasGSAP) {
    document.querySelectorAll('.btn-solid, .btn-brass').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' }));
    });
  }

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

  /* ── Form feedback ─────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = document.getElementById('submitBtn');
      const original = btn.textContent;
      btn.textContent = 'Отправлено ✓';
      btn.style.background = '#7bb86a';
      btn.style.color = '#0a0a0b';
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.style.background = ''; btn.style.color = ''; }, 3500);
    });
  }

})();
