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

    ```javascript
// Video loading and diagnostics
document.querySelectorAll('video[data-video]').forEach(video => {
  const placeholder = video.parentElement.querySelector('.video-placeholder');

  const hidePlaceholder = () => {
    if (placeholder) placeholder.classList.add('hidden');
  };

  video.addEventListener('loadeddata', hidePlaceholder);
  video.addEventListener('canplay', hidePlaceholder);

  video.addEventListener('error', () => {
    console.error('Video failed to load:', video.currentSrc, video.error);
    if (placeholder) placeholder.classList.remove('hidden');
  });

  // Handle videos that loaded before the listeners were attached.
  if (video.readyState >= 2) {
    hidePlaceholder();
  }
});
```
