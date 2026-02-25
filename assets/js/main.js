(() =>
{
  "use strict";

  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".overlay-nav");

  function updateHeaderCollapse()
  {
    if (!topbar)
    {
      return;
    }

    const gapRaw = getComputedStyle(document.documentElement).getPropertyValue("--nav-right-gap");
    const gap = parseFloat(gapRaw);

    if (!Number.isFinite(gap))
    {
      return;
    }

    const shouldCollapse = gap <= 1;

    topbar.classList.toggle("is-collapsed", shouldCollapse);

    if (!shouldCollapse && navOverlay)
    {
      navOverlay.classList.remove("active");
    }
  }

  if (navToggle && navOverlay)
  {
    navToggle.addEventListener("click", () =>
    {
      navOverlay.classList.toggle("active");
    });

    navOverlay.addEventListener("click", (e) =>
    {
      if (e.target.closest("[data-keep]"))
      {
        return;
      }

      navOverlay.classList.remove("active");
    });
  }

  window.addEventListener("resize", updateHeaderCollapse);
  updateHeaderCollapse();

  const yearEl = document.getElementById("y");

  if (yearEl)
  {
    yearEl.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll("[data-repeat]").forEach((wrap) =>
  {
    const n = Math.max(1, parseInt(wrap.getAttribute("data-repeat") || "1", 10));
    const img = wrap.querySelector("img");

    if (!img || n === 1)
    {
      return;
    }

    for (let i = 1; i < n; i++)
    {
      const clone = img.cloneNode(true);
      clone.loading = "lazy";
      wrap.appendChild(clone);
    }
  });
})();
