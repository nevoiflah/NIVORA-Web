const header = document.querySelector('[data-header]');
const button = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

const downloadDialog = document.querySelector('#app-download');
const mobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (downloadDialog && typeof downloadDialog.showModal === 'function' && !mobileDevice) {
  document.querySelectorAll('[data-app-download]').forEach((link) => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-controls', downloadDialog.id);
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      downloadDialog.showModal();
    });
  });
  downloadDialog.addEventListener('click', (event) => {
    if (event.target !== downloadDialog) return;
    const bounds = downloadDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      downloadDialog.close();
    }
  });
}

document.querySelectorAll('[data-support-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const topic = String(data.get('topic') || 'Support').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Nivora - ${topic}`;
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

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const heroMedia = document.querySelector('.hero-media');
const connection = document.querySelector('.connect');
const paperStack = document.querySelector('.paper-stack');
const trendChart = document.querySelector('.trend-chart');
const closingScene = document.querySelector('.closing-scene');
const stories = [...document.querySelectorAll('.story')];
const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
let ticking = false;

const updateScrollEffects = () => {
  ticking = false;
  header?.classList.toggle('scrolled', scrollY > 24);
  if (motionPreference.matches) return;
  const compact = !matchMedia('(min-width: 1000px) and (min-height: 900px)').matches;
  if (heroMedia) heroMedia.style.setProperty('--parallax-y', `${Math.min(scrollY * 0.06, 32)}px`);
  if (connection) {
    const rect = connection.getBoundingClientRect();
    // The desktop scene stays in view while the signal travels to the phone.
    // Smaller screens use the same sequence during ordinary document scrolling.
    const progress = compact
      ? ease((innerHeight * 0.8 - connection.querySelector('.signal').getBoundingClientRect().top) / (innerHeight * 0.65))
      : ease((64 - rect.top) / Math.max(1, rect.height - innerHeight));
    connection.style.setProperty('--connection-progress', progress.toFixed(4));
    connection.querySelectorAll('.signal i').forEach((dot, index) => {
      dot.style.setProperty('--signal-light', ease(progress * 3 - index * 0.65).toFixed(4));
    });
  }
  stories.forEach((story) => {
    const rect = story.getBoundingClientRect();
    const progress = ease((innerHeight * 0.9 - rect.top) / Math.min(rect.height, innerHeight * 0.65));
    story.style.setProperty('--story-progress', progress.toFixed(4));
  });
  if (trendChart) {
    const rect = trendChart.getBoundingClientRect();
    const progress = ease((innerHeight * 0.95 - rect.top) / (innerHeight * 0.5));
    trendChart.style.setProperty('--trend-progress', progress.toFixed(4));
  }
  if (closingScene) {
    const rect = closingScene.getBoundingClientRect();
    const depth = ease((innerHeight - rect.top) / (innerHeight + rect.height));
    closingScene.style.setProperty('--lake-drift', `${((depth - 0.5) * (compact ? 24 : 48)).toFixed(2)}px`);
  }
  if (paperStack) {
    const rect = paperStack.getBoundingClientRect();
    const progress = ease((innerHeight * 0.95 - rect.top) / (innerHeight * 0.65));
    paperStack.style.setProperty('--paper-spread', progress.toFixed(4));
  }
};
const scheduleScrollEffects = () => {
  if (!ticking) { ticking = true; requestAnimationFrame(updateScrollEffects); }
};
const syncMotionPreference = () => {
  document.documentElement.classList.toggle('motion', !motionPreference.matches);
  scheduleScrollEffects();
};
addEventListener('scroll', scheduleScrollEffects, { passive: true });
addEventListener('resize', scheduleScrollEffects, { passive: true });
motionPreference.addEventListener('change', syncMotionPreference);
syncMotionPreference();
