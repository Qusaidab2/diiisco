(() => {
  const root = document.documentElement;

  // Light and dark theme
  const saved = localStorage.getItem('hannah-theme');

  root.dataset.theme =
    saved ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  const updateThemeIcon = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.textContent =
        root.dataset.theme === 'dark' ? '☼' : '☾';
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

  // Mobile navigation
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navlinks');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');

      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute(
        'aria-label',
        open ? 'Close menu' : 'Open menu'
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Video loading and placeholder handling
  document.querySelectorAll('video[data-video]').forEach(video => {
    const placeholder =
      video.parentElement.querySelector('.video-placeholder');

    const hidePlaceholder = () => {
      if (placeholder) {
        placeholder.classList.add('hidden');
      }
    };

    const showPlaceholder = () => {
      if (placeholder) {
        placeholder.classList.remove('hidden');
      }
    };

    video.addEventListener('loadeddata', hidePlaceholder);
    video.addEventListener('canplay', hidePlaceholder);

    video.addEventListener('error', () => {
      console.error(
        'Video failed to load:',
        video.currentSrc || video.src,
        video.error
      );

      showPlaceholder();
    });

    if (video.readyState >= 2) {
      hidePlaceholder();
    }
  });
})();
