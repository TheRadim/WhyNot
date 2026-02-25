(() => {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
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
        if (!heroImg || images.length < 2) {
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
    const tabsRoot = document.querySelector("[data-project-tabs]");
    const titleEl = document.querySelector("[data-project-title]");
    const imgEl = document.querySelector("[data-project-img]");
    const metaEl = document.querySelector("[data-project-meta]");
    const stripEl = document.querySelector("[data-project-strip]");

    if (projectsRoot && tabsRoot && titleEl && imgEl && metaEl && stripEl) {

      const projects =
        [
          {
            title: "CODAN",
            tabLabel: "project 1",
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
            tabLabel: "project 2",
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
            tabLabel: "project 3",
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
            tabLabel: "project 4",
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
            tabLabel: "project 5",
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
            tabLabel: "project 6",
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

      let tabs = [];
      let activeProject = 0;
      let activeImage = 0;

      function ensureMetaLines() {
        for (let i = 0; i < 5; i++) {
          let row = metaEl.querySelector(`[data-meta-${i}]`);

          if (!row) {
            row = document.createElement("div");
            row.className = "meta-line";
            row.setAttribute(`data-meta-${i}`, "");
            metaEl.appendChild(row);
          }
        }
      }

      function renderMeta(lines) {
        ensureMetaLines();

        for (let i = 0; i < 5; i++) {
          const row = metaEl.querySelector(`[data-meta-${i}]`);

          if (row) {
            row.textContent = lines[i] || "";
          }
        }
      }

      function renderStrip() {
        stripEl.innerHTML = "";

        const imgs = projects[activeProject].images || [];

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
        const imgs = projects[activeProject].images || [];

        if (imgs.length === 0) {
          return;
        }

        activeImage = Math.max(0, Math.min(imgs.length - 1, i));
        imgEl.src = imgs[activeImage];

        renderStrip();
      }

      function syncTabs() {
        tabs.forEach((b, idx) => {
          if (idx === activeProject) {
            b.setAttribute("aria-current", "page");
          }
          else {
            b.removeAttribute("aria-current");
          }
        });
      }

      function setActiveProject(i) {
        const p = projects[i];

        if (!p) {
          return;
        }

        activeProject = i;
        activeImage = 0;

        titleEl.textContent = p.title || "";
        renderMeta(p.meta || []);

        imgEl.src = (p.images && p.images[0]) ? p.images[0] : "";

        syncTabs();
        renderStrip();
      }

      function renderTabs() {
        tabsRoot.innerHTML = "";

        projects.forEach((p, idx) => {
          const btn = document.createElement("button");
          btn.className = "project-tab";
          btn.type = "button";
          btn.setAttribute("data-project", String(idx));
          btn.textContent = p.title;

          btn.addEventListener("click", () => {
            setActiveProject(idx);
          });

          tabsRoot.appendChild(btn);
        });

        tabs = Array.from(tabsRoot.querySelectorAll(".project-tab"));
      }

      renderTabs();
      setActiveProject(0);
    }
  });
})();
