```javascript
(() => {
  const root = document.documentElement;

  // Theme toggle
  const saved = localStorage.getItem('hannah-theme');

  root.dataset.theme =
    saved ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const updateThemeIcon = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.textContent = root.dataset.theme === 'dark' ? '☼' : '☾';
    });
  };

  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      root.dataset.theme =
        root.dataset.theme === 'dark' ? 'light' : 'dark';

      localStorage.setItem('hannah-theme', root.dataset.theme);
      updateThemeIcon();
    });
  });

  updateThemeIcon();

  // Mobile menu
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navlinks');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  // Video loading and diagnostics
  document.querySelectorAll('video[data-video]').forEach(video => {
    const placeholder = video.parentElement.querySelector('.video-placeholder');

    video.addEventListener('loadeddata', () => {
      console.log('Video loaded:', video.currentSrc);
      if (placeholder) placeholder.classList.add('hidden');
    });

    video.addEventListener('error', () => {
      console.error(
        'Video failed:',
        video.currentSrc || video.querySelector('source')?.src,
        'Error code:',
        video.error?.code,
        'Message:',
        video.error?.message
      );

      // Keep the video element visible so its controls remain available.
      // Keep the placeholder visible too, to help identify the failed video.
      if (placeholder) placeholder.classList.remove('hidden');
    });
  });
})();
```
