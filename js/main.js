/* ============================================================
   SKY BAR — Motion Engine v2
   Lenis smooth scroll + GSAP ScrollTrigger
   Rispetta prefers-reduced-motion: nessuna animazione se richiesto
   ============================================================ */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';

  /* ---------- Header: stato compatto allo scroll ---------- */
  const header = document.querySelector('.site-header');
  const logoMedal = document.querySelector('.header__logo img');
  let lastY = 0;
  function onScroll(y) {
    // Logo-medaglia: torna gradualmente alle dimensioni originali scendendo
    if (logoMedal) {
      const prog = Math.min(Math.max(y / 280, 0), 1);
      logoMedal.style.setProperty('--logo-s', (1 - prog).toFixed(3));
    }
    if (!header) return;
    header.classList.toggle('is-scrolled', y > 40);
    // nasconde in discesa veloce, rivela in salita
    if (y > 300 && y > lastY + 6) header.classList.add('is-hidden');
    else if (y < lastY - 6 || y < 120) header.classList.remove('is-hidden');
    lastY = y;
  }

  /* ---------- Menu mobile ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      const open = navDrawer.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', String(open));
      document.documentElement.classList.toggle('nav-lock', open);
    });
    navDrawer.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navDrawer.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('nav-lock');
      })
    );
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  const lightboxCap = lightbox ? lightbox.querySelector('.lightbox__caption') : null;
  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img) return;
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt || '';
        if (lightboxCap) lightboxCap.textContent = img.alt || '';
        lightbox.classList.add('is-open');
        document.documentElement.classList.add('nav-lock');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });
    const close = () => {
      lightbox.classList.remove('is-open');
      document.documentElement.classList.remove('nav-lock');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    lightbox.querySelector('.lightbox__close')?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------- ScrollSpy ---------- */
  const spyLinks = document.querySelectorAll('a[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        spyLinks.forEach((l) =>
          l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id)
        );
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
  }

  /* ============================================================
     MOTION (saltato se prefers-reduced-motion)
     ============================================================ */
  if (prefersReduced || !hasGsap || !hasST) {
    // Fallback: tutto visibile subito, niente smooth scroll
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
    window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    // anchor links via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: -70, duration: 1.4 });
      });
    });
  } else {
    window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
  }

  /* ---------- Hero: ingresso coreografico ---------- */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.hero__line span');
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo(lines,
      { yPercent: 115, rotate: 3 },
      { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12, delay: 0.25 })
      .fromTo('.hero__meta > *',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 }, '-=0.7')
      .fromTo('.hero__frame',
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, 0);
  }

  /* ---------- Reveal generico: [data-reveal] ---------- */
  const groups = new Map();
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const key = el.dataset.revealGroup || el.parentElement;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  });
  groups.forEach((els) => {
    gsap.fromTo(els,
      { y: 42, autoAlpha: 0 },
      {
        y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out',
        stagger: parseFloat(els[0].dataset.revealStagger || 0.08),
        scrollTrigger: { trigger: els[0], start: 'top 85%', once: true },
      });
  });

  /* ---------- Parallax leggeri: [data-parallax] ---------- */
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.dataset.parallax || 12);
    gsap.fromTo(el,
      { yPercent: -amt / 2 },
      { yPercent: amt / 2, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Galleria pellicola: scroll verticale -> striscia orizzontale (desktop) ---------- */
  const strip = document.querySelector('.filmstrip__track');
  if (strip && window.matchMedia('(min-width: 861px)').matches) {
    const getAmount = () => Math.max(0, strip.scrollWidth - window.innerWidth + 96);
    gsap.to(strip, {
      x: () => -getAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.filmstrip',
        start: 'top top',
        end: () => '+=' + getAmount(),
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  }

  /* ---------- Marquee (fascia testo scorrevole): pausa fuori schermo ---------- */
  document.querySelectorAll('.marquee__inner').forEach((m) => {
    gsap.to(m, {
      xPercent: -50, repeat: -1, duration: parseFloat(m.dataset.speed || 26),
      ease: 'none',
      scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' }
    });
  });

  /* ---------- Oro progress ---------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress && hasST) {
    gsap.to(progress, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    });
  }

  /* ---------- Refresh su load immagini ---------- */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
