const header = document.querySelector('[data-header]');
const button = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-support-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const topic = String(data.get('topic') || 'Support').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Health Ring - ${topic}`;
    const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
    const note = form.querySelector('[data-form-note]');
    if (note) note.textContent = 'Opening your email application...';
    window.location.href = `mailto:nevo.iflah6@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

button?.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  button?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
}));

if (!reduced) {
  document.documentElement.classList.add('motion');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);

  document.querySelectorAll('.spark i,.activity-bars i,.report-bars i').forEach((bar, index) => bar.style.setProperty('--i', index % 7));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  }), { threshold: 0, rootMargin: '-8% 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  const heroMedia = document.querySelector('.hero-media');
  const finalMedia = document.querySelector('.final-media');
  const paperStack = document.querySelector('.paper-stack');
  let ticking = false;
  const updateScrollEffects = () => {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    document.documentElement.style.setProperty('--scroll', (maxScroll > 0 ? scrollY / maxScroll : 0).toFixed(4));
    header?.classList.toggle('scrolled', scrollY > 24);
    const mobile = matchMedia('(max-width: 700px)').matches;
    if (heroMedia) heroMedia.style.setProperty('--parallax-y', `${Math.min(scrollY * (mobile ? 0.07 : 0.16), mobile ? 44 : 110)}px`);
    if (finalMedia) {
      const rect = finalMedia.parentElement.getBoundingClientRect();
      finalMedia.style.setProperty('--parallax-y', `${(rect.top - innerHeight) * (mobile ? 0.035 : 0.08)}px`);
    }
    if (paperStack) {
      const rect = paperStack.getBoundingClientRect();
      const localProgress = Math.max(-1, Math.min(1, (innerHeight * 0.55 - rect.top) / innerHeight));
      paperStack.style.setProperty('--section-progress', localProgress.toFixed(3));
    }
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }, { passive: true });
  addEventListener('resize', updateScrollEffects, { passive: true });
  updateScrollEffects();

  document.querySelectorAll('.stats-panel').forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      panel.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.setProperty('--pointer-x', '50%');
      panel.style.setProperty('--pointer-y', '50%');
    });
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 24), { passive: true });
}
