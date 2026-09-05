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
    "privacidade",
    "termos",
  ];

  const VERTICAL_VIEWS = ["ambiental", "industrial", "logistica", "smart-cities"];

  const SITE = "https://www.ecovisa.com.br";

  const pageMeta = {
    "": {
      title: "Ecovisa | Visão computacional e IA para CFTV",
      description:
        "A Ecovisa aplica visão computacional e inteligência artificial para transformar câmeras existentes em dados operacionais, alertas e dashboards para indústria, logística, meio ambiente e cidades inteligentes.",
      ogTitle: "Ecovisa | Inteligência visual com IA",
      ogDescription:
        "Transforme câmeras passivas em uma rede de inteligência ativa com visão computacional aplicada à operação.",
    },
    ambiental: {
      title: "IA visual para gestão de resíduos | Ecovisa",
      description:
        "Visão computacional para coleta, triagem, transbordo e segurança em operações ambientais. Use o CFTV que você já tem.",
      ogTitle: "Ambiental | Ecovisa",
      ogDescription:
        "Compliance e rastreabilidade com visão 24/7 na gestão de resíduos.",
    },
    industrial: {
      title: "IA visual para indústria e OEE | Ecovisa",
      description:
        "Visão computacional para qualidade, produtividade, segurança e prevenção no chão de fábrica — sem trocar o hardware.",
      ogTitle: "Industrial | Ecovisa",
      ogDescription:
        "OEE, qualidade e segurança com IA visual na operação industrial.",
    },
    logistica: {
      title: "IA visual para logística, docas e pátio | Ecovisa",
      description:
        "Monitoramento de pátio, docas, conferência de carga e vigilância de ativos com visão computacional 24/7.",
      ogTitle: "Logística | Ecovisa",
      ogDescription:
        "Pátio, docas e integridade de carga com inteligência visual.",
    },
    "smart-cities": {
      title: "Smart cities e visão computacional | Ecovisa",
      description:
        "IA visual para trânsito, cruzamentos, ocupação e zeladoria urbana — dados acionáveis a partir de câmeras existentes.",
      ogTitle: "Smart Cities | Ecovisa",
      ogDescription:
        "Mobilidade, segurança e zeladoria com dados de vídeo inteligentes.",
    },
    tecnologia: {
      title: "Tecnologia e plataforma de IA visual | Ecovisa",
      description:
        "Como a plataforma Ecovisa captura, analisa e entrega insights a partir do seu CFTV — integração agnóstica e PoC em 90 dias.",
      ogTitle: "Tecnologia | Ecovisa",
      ogDescription:
        "Plataforma de visão computacional simples para operações reais.",
    },
    sobre: {
      title: "Sobre a Ecovisa | Clutch Tecnologia — Curitiba, PR",
      description:
        "A Ecovisa (Clutch Tecnologia), fundada em 2023 em Curitiba, transforma câmeras existentes em inteligência operacional com IA visual.",
      ogTitle: "Sobre | Ecovisa",
      ogDescription:
        "Pragmatismo com inovação para operações reais. Curitiba, Paraná.",
    },
    contato: {
      title: "Agendar PoC | Contato Ecovisa",
      description:
        "Agende um diagnóstico gratuito e uma PoC sem custo. Fale com a Ecovisa em contato@ecovisa.com.br.",
      ogTitle: "Agendar PoC | Ecovisa",
      ogDescription:
        "Diagnóstico gratuito, sem compromisso. Vamos conversar sobre sua operação.",
    },
    privacidade: {
      title: "Política de Privacidade | Ecovisa",
      description:
        "Como a Ecovisa trata dados pessoais coletados pelo site e pelo formulário de contato, em conformidade com a LGPD.",
      ogTitle: "Privacidade | Ecovisa",
      ogDescription: "Política de Privacidade e tratamento de dados da Ecovisa.",
    },
    termos: {
      title: "Termos de Uso | Ecovisa",
      description:
        "Condições de uso do site institucional da Ecovisa (Clutch Tecnologia).",
      ogTitle: "Termos de Uso | Ecovisa",
      ogDescription: "Termos de uso do site da Ecovisa.",
    },
  };

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
    privacidade: "#10c87e",
    termos: "#10c87e",
  };

  function pathToName() {
    const raw = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (!raw) return "";
    return routes.includes(raw) ? raw : null;
  }

  function hrefFor(name) {
    return name === "" ? "/" : "/" + name;
  }

  function setMeta(name) {
    const meta = pageMeta[name] || pageMeta[""];
    const url = SITE + hrefFor(name);

    document.title = meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.ogTitle || meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc)
      ogDesc.setAttribute("content", meta.ogDescription || meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", url);

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", meta.ogTitle || meta.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc)
      twDesc.setAttribute("content", meta.ogDescription || meta.description);
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

    setMeta(name);
    window.scrollTo(0, 0);

    const viewEl = document.querySelector(`[data-view="${name}"]`);
    if (viewEl && VERTICAL_VIEWS.includes(name)) {
      requestAnimationFrame(() => staggerReveal(viewEl));
    }
  }

  function navigate(name, { replace } = {}) {
    const url = hrefFor(name);
    if (replace) {
      history.replaceState({ route: name }, "", url);
    } else {
      history.pushState({ route: name }, "", url);
    }
    showView(name);
  }

  function migrateHashToPath() {
    const hash = window.location.hash.replace(/^#\/?/, "").split("/")[0] || "";
    if (!hash) return false;
    if (!routes.includes(hash)) return false;
    history.replaceState({ route: hash }, "", hrefFor(hash));
    return true;
  }

  window.addEventListener("popstate", () => {
    const name = pathToName();
    if (name === null) {
      window.location.href = "/404.html";
      return;
    }
    showView(name);
  });

  document.addEventListener("DOMContentLoaded", () => {
    migrateHashToPath();

    let name = pathToName();
    if (name === null) {
      // Unknown path served as index only if host misconfigured; prefer 404 page.
      name = "";
    }

    document.querySelectorAll("[data-route]").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (e.button !== 0) return;
        const route = el.getAttribute("data-route") ?? "";
        if (!routes.includes(route)) return;
        e.preventDefault();
        navigate(route);
        const drawer = document.getElementById("mobile-drawer");
        if (drawer) drawer.classList.remove("open");
      });
    });

    const form = document.getElementById("form-contato");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = form.querySelector('[name="nome"]');
        const empresa = form.querySelector('[name="empresa"]');
        const email = form.querySelector('[name="email"]');
        const mensagem = form.querySelector('[name="mensagem"]');
        const msg = document.getElementById("form-feedback");
        const submitButton = form.querySelector('button[type="submit"]');

        let ok = true;

        [nome, empresa, email, mensagem].forEach((f) => {
          if (!f.value.trim()) {
            ok = false;
            f.setAttribute("aria-invalid", "true");
          } else {
            f.removeAttribute("aria-invalid");
          }
        });

        if (!ok) {
          if (msg) {
            msg.style.display = "block";
            msg.className = "form-msg form-msg--warning";
            msg.textContent =
              "Preencha Nome, Empresa, E-mail e Mensagem para enviar.";
          }

          return;
        }

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Enviando...";
        }

        if (msg) {
          msg.style.display = "block";
          msg.className = "form-msg form-msg--info";
          msg.textContent = "Enviando sua mensagem...";
        }

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome.value.trim(),
              empresa: empresa.value.trim(),
              email: email.value.trim(),
              mensagem: mensagem.value.trim(),
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Erro ao enviar mensagem.");
          }

          if (msg) {
            msg.style.display = "block";
            msg.className = "form-msg form-msg--success";
            msg.textContent =
              "Recebemos seu envio. Em breve nossa equipe retorna o contato.";
          }

          form.reset();
        } catch (error) {
          console.error("[contact] error:", error);

          if (msg) {
            msg.style.display = "block";
            msg.className = "form-msg form-msg--error";
            msg.textContent =
              "Não foi possível enviar sua mensagem agora. Tente novamente em alguns minutos.";
          }
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Enviar";
          }
        }
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

    document.querySelectorAll(".carousel").forEach((carousel) => {
      const slides = carousel.querySelectorAll(".carousel__slide");
      const dots = carousel.querySelectorAll(".carousel__dot");
      let current = 0;
      let timer;

      function goTo(index) {
        slides[current].classList.remove("is-active");
        dots[current].classList.remove("is-active");
        current = (index + slides.length) % slides.length;
        slides[current].classList.add("is-active");
        dots[current].classList.add("is-active");
      }

      function startAuto() {
        timer = setInterval(() => goTo(current + 1), 3500);
      }

      function resetAuto() {
        clearInterval(timer);
        startAuto();
      }

      const prev = carousel.querySelector(".carousel__btn--prev");
      const next = carousel.querySelector(".carousel__btn--next");
      if (prev) prev.addEventListener("click", () => { goTo(current - 1); resetAuto(); });
      if (next) next.addEventListener("click", () => { goTo(current + 1); resetAuto(); });
      dots.forEach((dot, i) =>
        dot.addEventListener("click", () => {
          goTo(i);
          resetAuto();
        })
      );
      startAuto();
    });

    showView(name);
  });
})();
