(() => {
  "use strict";

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  document.querySelectorAll("[data-nav] a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();

    if (href && href === path) {
      a.setAttribute("aria-current", "page");
    }
    else {
      a.removeAttribute("aria-current");
    }
  });

  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".overlay-nav");

  function updateHeaderCollapse() {
    if (!topbar) {
      return;
    }

    const gapRaw = getComputedStyle(document.documentElement).getPropertyValue("--nav-right-gap");
    const gap = parseFloat(gapRaw);

    if (!Number.isFinite(gap)) {
      return;
    }

    const shouldCollapse = gap <= 1;

    topbar.classList.toggle("is-collapsed", shouldCollapse);

    if (!shouldCollapse && navOverlay) {
      navOverlay.classList.remove("active");
    }
  }

  if (navToggle && navOverlay) {
    navToggle.addEventListener("click", () => {
      navOverlay.classList.toggle("active");
    });

    navOverlay.addEventListener("click", (e) => {
      if (e.target.closest("[data-keep]")) {
        return;
      }

      navOverlay.classList.remove("active");
    });
  }

  window.addEventListener("resize", updateHeaderCollapse);
  updateHeaderCollapse();

  const yearEl = document.getElementById("y");

  /* =========================
   Hero slideshow
   ========================= */

  const heroRoot = document.querySelector("[data-hero]");

  if (heroRoot) {
    const heroImg = heroRoot.querySelector(".hero-img");

    const images =
      [
        "assets/img/hero1.webp",
        "assets/img/hero2.webp",
        "assets/img/hero3.webp"
      ];

    let index = 0;

    function nextHero() {
      if (!heroImg) {
        return;
      }

      heroImg.classList.add("is-fading");

      setTimeout(() => {
        index = (index + 1) % images.length;
        heroImg.src = images[index];

        heroImg.classList.remove("is-fading");
      }, 1200); // matches CSS transition time
    }

    setInterval(nextHero, 5000);
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const projectsRoot = document.querySelector("[data-projects]");

  if (projectsRoot) {
    const projects =
      [
        {
          title: "Project One",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Year: 2025.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        },
        {
          title: "Project Two",
          text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Year: 2024.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        },
        {
          title: "Project Three",
          text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Year: 2023.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        },
        {
          title: "Project Four",
          text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. Year: 2022.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        },
        {
          title: "Project Five",
          text: "Project five placeholder text. Year: 2021.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        },
        {
          title: "Project Six",
          text: "Project six placeholder text. Year: 2020.",
          images:
            [
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp",
              "assets/img/17.webp"
            ]
        }
      ];

    const titleEl = projectsRoot.querySelector("[data-project-title]");
    const imgEl = projectsRoot.querySelector("[data-project-img]");
    const textEl = projectsRoot.querySelector("[data-project-text]");
    const stripEl = projectsRoot.querySelector("[data-project-strip]");
    const tabs = Array.from(projectsRoot.querySelectorAll("[data-project]"));

    let activeProject = 0;
    let activeImage = 0;

    function renderStrip() {
      if (!stripEl) {
        return;
      }

      stripEl.innerHTML = "";

      const imgs = projects[activeProject].images;

      imgs.forEach((src, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "project-thumb";
        btn.setAttribute("aria-label", `Open image ${idx + 1}`);
        btn.setAttribute("aria-current", idx === activeImage ? "true" : "false");

        const im = document.createElement("img");
        im.src = src;
        im.alt = "";
        im.loading = "lazy";

        btn.appendChild(im);

        btn.addEventListener("click", () => {
          setImage(idx);
        });

        stripEl.appendChild(btn);
      });
    }

    function setImage(i) {
      const imgs = projects[activeProject].images;
      const next = Math.max(0, Math.min(imgs.length - 1, i));

      activeImage = next;

      if (imgEl) {
        imgEl.src = imgs[activeImage];
      }

      renderStrip();
    }

    function setActiveProject(i) {
      const p = projects[i];

      if (!p) {
        return;
      }

      activeProject = i;
      activeImage = 0;

      if (titleEl) {
        titleEl.textContent = p.title;
      }

      if (textEl) {
        textEl.textContent = p.text;
      }

      if (imgEl) {
        imgEl.src = p.images[0];
      }

      tabs.forEach((b, idx) => {
        if (idx === i) {
          b.setAttribute("aria-current", "page");
        }
        else {
          b.removeAttribute("aria-current");
        }
      });

      renderStrip();
    }

    tabs.forEach((b) => {
      b.addEventListener("click", () => {
        const i = parseInt(b.getAttribute("data-project") || "0", 10);
        setActiveProject(Math.max(0, Math.min(projects.length - 1, i)));
      });
    });

    setActiveProject(0);
  }
})();
