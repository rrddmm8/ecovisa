(function () {
  const routes = [
    "",
    "ambiental",
    "industrial",
    "logistica",
    "smart-cities",
    "tecnologia",
    "sobre",
    "contato",
  ];

  const VERTICAL_VIEWS = ["ambiental", "industrial", "logistica", "smart-cities"];

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function staggerReveal(container) {
    if (!container) return;
    const items = container.querySelectorAll(".reveal");
    if (prefersReducedMotion()) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    items.forEach((el) => el.classList.remove("is-visible"));
    items.forEach((el, i) => {
      window.setTimeout(() => el.classList.add("is-visible"), 45 + i * 48);
    });
  }

  const verticalAccent = {
    "": null,
    ambiental: "#013220",
    industrial: "#002366",
    logistica: "#ff8c00",
    "smart-cities": "#6200ee",
    tecnologia: "#10c87e",
    sobre: "#10c87e",
    contato: "#10c87e",
  };

  function pathToName() {
    const raw = window.location.hash.replace(/^#\/?/, "").split("/")[0] || "";
    return routes.includes(raw) ? raw : "";
  }

  function showView(name) {
    document.querySelectorAll("[data-view]").forEach((el) => {
      el.hidden = el.getAttribute("data-view") !== name;
    });

    const accent = verticalAccent[name] || "#10c87e";
    document.documentElement.style.setProperty("--nav-accent", accent);

    document.querySelectorAll("[data-nav]").forEach((el) => {
      const n = el.getAttribute("data-nav");
      const isHome = name === "" && (n === "home" || n === "");
      const match = n === name || isHome;
      el.classList.toggle("is-active", match);
    });

    document.querySelectorAll(".section--vertical").forEach((sec) => {
      const v = sec.getAttribute("data-vertical");
      if (v && v === name) {
        sec.style.setProperty("--accent", verticalAccent[name] || "#10c87e");
      }
    });

    window.scrollTo(0, 0);

    const viewEl = document.querySelector(`[data-view="${name}"]`);
    if (viewEl && VERTICAL_VIEWS.includes(name)) {
      requestAnimationFrame(() => staggerReveal(viewEl));
    }
  }

  function navigate(name) {
    window.location.hash = name === "" ? "#/" : "#/" + name;
  }

  window.addEventListener("hashchange", () => {
    showView(pathToName());
  });

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.hash || window.location.hash === "#") {
      window.location.hash = "#/";
    }

    document.querySelectorAll("[data-route]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const name = el.getAttribute("data-route") ?? "";
        e.preventDefault();
        navigate(name);
        const drawer = document.getElementById("mobile-drawer");
        if (drawer) drawer.classList.remove("open");
      });
    });

    const form = document.getElementById("form-contato");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nome = form.querySelector('[name="nome"]');
        const empresa = form.querySelector('[name="empresa"]');
        const email = form.querySelector('[name="email"]');
        const mensagem = form.querySelector('[name="mensagem"]');
        let ok = true;
        [nome, empresa, email, mensagem].forEach((f) => {
          if (!f.value.trim()) {
            ok = false;
            f.setAttribute("aria-invalid", "true");
          } else {
            f.removeAttribute("aria-invalid");
          }
        });
        const msg = document.getElementById("form-feedback");
        if (!ok) {
          if (msg) {
            msg.style.display = "block";
            msg.className = "form-msg";
            msg.textContent =
              "Preencha Nome, Empresa, E-mail e Mensagem para enviar.";
          }
          return;
        }
        if (msg) {
          msg.style.display = "block";
          msg.className = "form-msg ok";
          msg.textContent =
            "Recebemos seu envio. Em breve nossa equipe retorna o contato.";
        }
        form.reset();
      });
    }

    const toggle = document.getElementById("mobile-nav-toggle");
    const drawer = document.getElementById("mobile-drawer");
    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        drawer.classList.toggle("open");
        const expanded = drawer.classList.contains("open");
        toggle.setAttribute("aria-expanded", expanded);
      });
    }

    document.querySelectorAll(".faq__trigger").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq__item");
        const panel = item && item.querySelector(".faq__panel");
        if (!item || !panel) return;
        const expanded = btn.getAttribute("aria-expanded") === "true";
        if (!expanded) {
          document.querySelectorAll(".faq__item").forEach((it) => {
            const b = it.querySelector(".faq__trigger");
            const p = it.querySelector(".faq__panel");
            if (it !== item && b && p) {
              b.setAttribute("aria-expanded", "false");
              p.hidden = true;
              it.classList.remove("is-open");
            }
          });
        }
        btn.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
        item.classList.toggle("is-open", !expanded);
      });
    });

    showView(pathToName());
  });

  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroDots = document.querySelectorAll(".hero-dots button");

  let heroCurrent = 0;
  let heroInterval = null;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    heroCurrent = index;
  }

  function startHeroCarousel() {
    if (!heroSlides.length) return;

    heroInterval = window.setInterval(() => {
      const next = (heroCurrent + 1) % heroSlides.length;
      showHeroSlide(next);
    }, 5000);
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);

      if (heroInterval) {
        window.clearInterval(heroInterval);
        startHeroCarousel();
      }
    });
  });

  startHeroCarousel();
})();
