(() =>
{
  "use strict";

  // Mark active nav link based on current file name.
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll('[data-nav] a').forEach((a) =>
  {
    const href = (a.getAttribute('href') || '').toLowerCase();

    if (href && href === path)
    {
      a.setAttribute('aria-current', 'page');
    }
    else
    {
      a.removeAttribute('aria-current');
    }
  });

  // Optional: simple "repeat hero" helper on the landing page.
  // If a container has data-repeat="N", it will duplicate its first <img> N times.
  document.querySelectorAll('[data-repeat]').forEach((wrap) =>
  {
    const n = Math.max(1, parseInt(wrap.getAttribute('data-repeat') || '1', 10));
    const img = wrap.querySelector('img');

    if (!img || n === 1)
    {
      return;
    }

    for (let i = 1; i < n; i++)
    {
      const clone = img.cloneNode(true);
      clone.loading = 'lazy';
      wrap.appendChild(clone);
    }
  });
})();
