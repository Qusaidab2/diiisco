(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('hannah-theme');
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const updateThemeIcon = () => document.querySelectorAll('[data-theme-toggle]').forEach(b => b.textContent = root.dataset.theme === 'dark' ? '☼' : '☾');
  document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('hannah-theme', root.dataset.theme); updateThemeIcon();
  }));
  updateThemeIcon();
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navlinks');
  if (menuButton && nav) menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('video[data-video]').forEach(video => {
    const placeholder = video.parentElement.querySelector('.video-placeholder');
    video.addEventListener('loadeddata', () => { if (placeholder) placeholder.classList.add('hidden'); });
    video.addEventListener('error', () => { video.classList.add('hidden'); if (placeholder) placeholder.classList.remove('hidden'); });
  });
})();
