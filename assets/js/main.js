(() =>
{
  "use strict";

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("[data-nav] a").forEach((a) =>
  {
    const href = (a.getAttribute("href") || "").toLowerCase();

    if (href && href === path)
    {
      a.setAttribute("aria-current", "page");
    }
    else
    {
      a.removeAttribute("aria-current");
    }
  });

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

  const projectsRoot = document.querySelector("[data-projects]");

  if (projectsRoot)
  {
    const projects =
    [
      { title: "Project One", img: "assets/img/17.webp", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Year: 2025." },
      { title: "Project Two", img: "assets/img/17.webp", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Year: 2024." },
      { title: "Project Three", img: "assets/img/17.webp", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Year: 2023." },
      { title: "Project Four", img: "assets/img/17.webp", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. Year: 2022." },
      { title: "Project Five", img: "assets/img/17.webp", text: "Project five placeholder text. Year: 2021." },
      { title: "Project Six", img: "assets/img/17.webp", text: "Project six placeholder text. Year: 2020." }
    ];

    const titleEl = projectsRoot.querySelector("[data-project-title]");
    const imgEl = projectsRoot.querySelector("[data-project-img]");
    const textEl = projectsRoot.querySelector("[data-project-text]");
    const tabs = Array.from(projectsRoot.querySelectorAll("[data-project]"));

    function setActive(i)
    {
      const p = projects[i];

      if (!p)
      {
        return;
      }

      if (titleEl)
      {
        titleEl.textContent = p.title;
      }

      if (imgEl)
      {
        imgEl.src = p.img;
      }

      if (textEl)
      {
        textEl.textContent = p.text;
      }

      tabs.forEach((b, idx) =>
      {
        if (idx === i)
        {
          b.setAttribute("aria-current", "page");
        }
        else
        {
          b.removeAttribute("aria-current");
        }
      });
    }

    tabs.forEach((b) =>
    {
      b.addEventListener("click", () =>
      {
        const i = parseInt(b.getAttribute("data-project") || "0", 10);
        setActive(Math.max(0, Math.min(projects.length - 1, i)));
      });
    });

    setActive(0);
  }
})();
