(() => {
  "use strict";

  /* =========================
     Nav active state
     ========================= */

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

  /* =========================
     Header collapse
     ========================= */

  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navOverlay = document.querySelector(".overlay-nav");

  function updateHeaderCollapse() {
    if (!topbar) {
      return;
    }

    const gapRaw = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-right-gap");

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

  /* =========================
     Footer year
     ========================= */

  const yearEl = document.getElementById("y");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

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
      }, 1200);
    }

    setInterval(nextHero, 5000);
  }

  /* =========================
     Projects
     ========================= */

  const projectsRoot = document.querySelector("[data-projects]");

  if (!projectsRoot) {
    return;
  }

  const projects =
    [
      {
        title: "CODAN",
        meta:
          [
            "CODAN",
            "Office and warehouse",
            "Location: Køge, Denmark",
            "Year of construction: 2023",
            "Client: CODAN Companies"
          ],
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
        title: "Nordic Pavilion",
        meta:
          [
            "Nordic Pavilion",
            "Cultural building",
            "Location: Aarhus, Denmark",
            "Year of construction: 2021",
            "Client: Municipality of Aarhus"
          ],
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
        title: "Harbor Offices",
        meta:
          [
            "Harbor Offices",
            "Commercial complex",
            "Location: Copenhagen, Denmark",
            "Year of construction: 2020",
            "Client: Private developer"
          ],
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
        title: "Urban Housing",
        meta:
          [
            "Urban Housing",
            "Residential building",
            "Location: Odense, Denmark",
            "Year of construction: 2019",
            "Client: Housing association"
          ],
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
        title: "Innovation Hub",
        meta:
          [
            "Innovation Hub",
            "Tech campus",
            "Location: Malmö, Sweden",
            "Year of construction: 2018",
            "Client: Startup collective"
          ],
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
        title: "Waterfront Studio",
        meta:
          [
            "Waterfront Studio",
            "Creative workspace",
            "Location: Helsingør, Denmark",
            "Year of construction: 2017",
            "Client: Private investor"
          ],
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
  const metaEl = projectsRoot.querySelector("[data-project-meta]");
  const stripEl = projectsRoot.querySelector("[data-project-strip]");
  const tabs = Array.from(projectsRoot.querySelectorAll("[data-project]"));

  let activeProject = 0;
  let activeImage = 0;

  function renderMeta(lines) {
    if (!metaEl) {
      return;
    }

    for (let i = 0; i < 5; i++) {
      const row = metaEl.querySelector(`[data-meta-${i}]`);

      if (row) {
        row.textContent = lines[i] || "";
      }
    }
  }

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
    activeImage = Math.max(0, Math.min(imgs.length - 1, i));

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

    if (imgEl) {
      imgEl.src = p.images[0];
    }

    renderMeta(p.meta);

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

})();
