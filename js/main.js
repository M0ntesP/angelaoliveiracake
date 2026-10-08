import { site, categories, products, testimonials, menuPages, gallery } from "./site-data.js";
import imageManifest from "./image-manifest.json";
import { setupAnalytics, trackEvent } from "./analytics.js";

// Elementos compartilhados e interações pequenas do site.
const pageLinks = [
  ["inicio", "Início", "index.html"], ["catalogo", "Catálogo", "catalogo.html"],
  ["cardapio", "Cardápio", "cardapio.html"], ["portifolio", "Portfólio", "portifolio.html"],
  ["endereco", "Endereço", "endereco.html"], ["contato", "Contato", "contato.html"],
];
const currentPage = document.body.dataset.page;
const imagePath = (name) => name.startsWith("/images/") ? name : `/images/${name}`;
const productImageSizes = "(max-width: 580px) calc(100vw - 30px), (max-width: 850px) calc((100vw - 66px) / 2), 356px";
const carouselImageSizes = "(max-width: 630px) calc(100vw - 30px), 600px";

function imageMarkup(name, alt, { loading = "lazy", sizes = "100vw", imageClass = "", draggable = false } = {}) {
  const path = imagePath(name);
  const asset = imageManifest[path.split("/").pop()];
  const sourceSet = asset?.sources?.map(({ url, width }) => `${url} ${width}w`).join(", ");
  const responsive = sourceSet ? ` srcset="${sourceSet}" sizes="${sizes}"` : "";
  const dimensions = asset ? ` width="${asset.width}" height="${asset.height}"` : "";
  const fallback = asset?.sources?.length ? ` data-fallback-src="${path}"` : "";
  const className = imageClass ? ` class="${imageClass}"` : "";
  const dragAttribute = draggable ? ' draggable="false"' : "";
  return `<img${className} src="${path}"${responsive}${fallback} alt="${alt}"${dimensions} loading="${loading}" decoding="async"${dragAttribute}>`;
}

function setupImageFeedback() {
  const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 1200"><rect width="960" height="1200" fill="#fbf6ee"/><path d="M330 450h300v250H330z" fill="none" stroke="#c99e53" stroke-width="18" stroke-linejoin="round"/><circle cx="410" cy="520" r="24" fill="#52765e"/><path d="m350 660 95-95 65 64 50-45 50 76" fill="none" stroke="#713c55" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><text x="480" y="780" text-anchor="middle" fill="#746967" font-family="Arial,sans-serif" font-size="30">Imagem temporariamente indisponível</text></svg>';
  const fallbackUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`;

  function showFallback(image) {
    if (image.dataset.imageFallback === "true") return;
    if (image.dataset.fallbackSrc && image.dataset.fallbackTried !== "true") {
      image.dataset.fallbackTried = "true";
      image.dataset.imageState = "loading";
      image.removeAttribute("srcset");
      image.removeAttribute("sizes");
      image.src = image.dataset.fallbackSrc;
      return;
    }
    image.dataset.imageFallback = "true";
    image.dataset.imageState = "error";
    image.alt = "Imagem temporariamente indisponível: " + image.alt;
    image.src = fallbackUrl;
  }

  function initialize(image) {
    if (image.dataset.imageState) return;
    if (!image.complete) {
      image.dataset.imageState = "loading";
      return;
    }
    if (image.naturalWidth > 0) image.dataset.imageState = "loaded";
    else showFallback(image);
  }

  document.addEventListener("load", (event) => {
    if (!(event.target instanceof HTMLImageElement)) return;
    event.target.dataset.imageState = event.target.dataset.imageFallback === "true" ? "error" : "loaded";
  }, true);
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) showFallback(event.target);
  }, true);

  document.querySelectorAll("img").forEach(initialize);
  const observer = new MutationObserver((records) => {
    records.forEach(({ addedNodes }) => addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      if (node.matches("img")) initialize(node);
      node.querySelectorAll("img").forEach(initialize);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function renderHeader() {
  document.querySelector("#site-header").innerHTML = `
    <a class="skip-link" href="#main-content">Pular para o conteúdo</a>
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Ângela Oliveira — início"><img src="${site.logo}" alt="Ângela Oliveira — Confeitaria Brasileira"></a>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="main-navigation" aria-expanded="false">☰</button>
      <nav class="main-nav" id="main-navigation" aria-label="Navegação principal">${pageLinks.map(([id, label, url]) => `<a ${currentPage === id ? 'aria-current="page"' : ""} href="${url}">${label}</a>`).join("")}<a class="button nav-order" href="${site.whatsapp}">Encomendar</a></nav>
    </div></header>`;
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  function setMenuOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    toggle.textContent = isOpen ? "×" : "☰";
    navigation.classList.toggle("is-open", isOpen);
  }
  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  navigation.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

function renderFooter() {
  document.querySelector("#site-footer").innerHTML = `
    <footer class="site-footer"><div class="container footer-grid">
      <div><img class="footer-logo" src="${site.footerLogo}" alt="Ângela Oliveira — Confeitaria Brasileira" width="486" height="486" loading="lazy"><p>Confeitaria Brasileira. Sabores que contam histórias. Encomendas sob medida em ${site.city}.</p></div>
      <div><p class="eyebrow">Navegar</p><ul>${pageLinks.slice(1).map(([, label, url]) => `<li><a href="${url}">${label}</a></li>`).join("")}<li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a></li><li><a href="${site.links}" target="_blank" rel="noopener">Todos os links</a></li></ul></div>
      <div><p class="eyebrow">Pedidos e contato</p><a class="button" href="${site.whatsapp}">Fazer encomenda pelo WhatsApp</a><p>Pedidos combinados pelo WhatsApp, sem carrinho ou pagamento online.</p><p class="eyebrow">E-mail</p><a class="footer-email" href="mailto:${site.email}">${site.email}</a></div>
    </div><div class="copyright">© ${new Date().getFullYear()} ${site.name} · ${site.city}</div></footer>`;
}

function productCard(product) {
  const orderUrl = new URL("https://wa.me/" + site.whatsappPhone);
  orderUrl.searchParams.set("text", "Olá, Ângela! Tenho interesse em " + product.name + ". Você pode me informar as opções e os valores para a minha data?");
  return `<article class="product-card" data-product-name="${product.name}">${imageMarkup(product.image, product.name, { loading: "lazy", sizes: productImageSizes })}<div class="card-copy"><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p>${product.detail ? `<p class="muted">${product.detail}</p>` : ""}<a class="button button-outline full-button" data-product-order="${product.name}" href="${orderUrl.href}">Quero este bolo</a></div></article>`;
}
function testimonialCard(item) {
  return `<figure class="testimonial"><blockquote>“${item.text}”</blockquote><figcaption>${item.name}</figcaption></figure>`;
}
function renderHome() {
  renderHomeShowcase();
  const reviewTarget = document.querySelector("#home-testimonials");
  if (reviewTarget) reviewTarget.innerHTML = testimonials.map(testimonialCard).join("");
}
function renderHomeShowcase() {
  const root = document.querySelector("#home-showcase");
  const track = document.querySelector("#home-showcase-track");
  if (!root || !track) return;

  const items = [
    ...categories.map((item) => ({ eyebrow: "Categoria", name: item.name, description: item.description, image: item.image, action: "Ver no catálogo", href: "catalogo.html" })),
    ...products.slice(0, 6).map((item) => ({ eyebrow: item.category, name: item.name, description: item.description, image: item.image, action: "Encomendar no WhatsApp", href: site.whatsapp })),
  ];
  const dots = document.querySelector("#home-showcase-dots");
  const counter = document.querySelector("#home-showcase-count");
  const pauseButton = document.querySelector("#home-showcase-toggle");
  let index = 0;
  let timer;
  let pointerStartX = null;
  let swipeInProgress = false;
  let userPaused = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reducedMotion.matches;

  track.innerHTML = items.map((item, itemIndex) => `
    <article class="home-showcase-slide" ${itemIndex > 1 ? 'inert aria-hidden="true"' : ""}>
      <button class="home-showcase-photo" type="button" aria-label="${item.name}. Clique para avançar para a próxima foto.">
        ${imageMarkup(item.image, item.name, { loading: itemIndex < 2 ? "eager" : "lazy", sizes: carouselImageSizes, draggable: true })}
      </button>
      <div class="home-showcase-copy"><p class="eyebrow">${item.eyebrow}</p><h3>${item.name}</h3><p>${item.description}</p><a class="button button-outline" href="${item.href}">${item.action}</a></div>
    </article>`).join("");
  const slides = [...track.children];

  function show(next) {
    index = (next + items.length) % items.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    dots.querySelectorAll("button").forEach((button, dotIndex) => {
      const active = dotIndex === index;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }
  function restartTimer() {
    clearTimeout(timer);
    if (!paused && !document.hidden && !root.matches(":hover, :focus-within")) {
      timer = setTimeout(() => { show(index + 1); restartTimer(); }, 4500);
    }
  }
  function updatePauseButton() {
    pauseButton.textContent = paused ? "Retomar apresentação" : "Pausar apresentação";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }

  dots.innerHTML = items.map((_, dotIndex) => `<button type="button" aria-label="Ir para foto ${dotIndex + 1}"></button>`).join("");
  dots.addEventListener("click", (event) => {
    const dotIndex = [...dots.children].indexOf(event.target);
    if (dotIndex >= 0) { show(dotIndex); restartTimer(); }
  });
  root.querySelector(".previous").addEventListener("click", () => { show(index - 1); restartTimer(); });
  root.querySelector(".next").addEventListener("click", () => { show(index + 1); restartTimer(); });
  track.addEventListener("click", (event) => {
    if (!event.target.closest(".home-showcase-photo")) return;
    if (swipeInProgress) { swipeInProgress = false; event.preventDefault(); return; }
    show(index + 1);
    restartTimer();
  });
  root.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".gallery-arrow")) return;
    pointerStartX = event.clientX;
  });
  root.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 45) return;
    swipeInProgress = true;
    show(index + (distance < 0 ? 1 : -1));
    restartTimer();
  });
  root.addEventListener("pointercancel", () => { pointerStartX = null; });
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { show(index - 1); restartTimer(); }
    if (event.key === "ArrowRight") { show(index + 1); restartTimer(); }
  });
  root.addEventListener("mouseenter", () => clearTimeout(timer));
  root.addEventListener("mouseleave", restartTimer);
  root.addEventListener("focusin", () => clearTimeout(timer));
  root.addEventListener("focusout", (event) => { if (!root.contains(event.relatedTarget)) restartTimer(); });
  pauseButton.addEventListener("click", () => {
    userPaused = !userPaused;
    paused = userPaused || reducedMotion.matches;
    updatePauseButton();
    restartTimer();
  });
  reducedMotion.addEventListener("change", () => {
    paused = userPaused || reducedMotion.matches;
    updatePauseButton();
    restartTimer();
  });
  document.addEventListener("visibilitychange", restartTimer);
  show(0);
  updatePauseButton();
  restartTimer();
}
function renderCatalog() {
  const filters = ["Todos", ...categories.map((item) => item.name)];
  const buttonBox = document.querySelector("#catalog-filters");
  if (!buttonBox) return;
  const productBox = document.querySelector("#catalog-products");
  let productObserver;
  if ("IntersectionObserver" in window) {
    productObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const tracked = trackEvent("product_view", { item_name: entry.target.dataset.productName });
        if (tracked) {
          entry.target.dataset.viewTracked = "true";
          productObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  }
  function observeProductCards() {
    productBox.querySelectorAll(".product-card:not([data-view-tracked])").forEach((card) => productObserver?.observe(card));
  }
  function showProducts(active) {
    productBox.innerHTML = products.filter((item) => active === "Todos" || item.category === active).map(productCard).join("");
    buttonBox.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.textContent === active);
      button.setAttribute("aria-pressed", String(button.textContent === active));
    });
    observeProductCards();
  }
  buttonBox.innerHTML = filters.map((label) => `<button type="button" class="filter-button">${label}</button>`).join("");
  buttonBox.addEventListener("click", (event) => {
    if (event.target.matches("button")) showProducts(event.target.textContent);
  });
  showProducts("Todos");
  if (productObserver) {
    window.addEventListener("analytics-consent-granted", () => {
      productBox.querySelectorAll(".product-card:not([data-view-tracked])").forEach((card) => {
        productObserver.unobserve(card);
        productObserver.observe(card);
      });
    });
  }
  document.querySelector("#catalog-categories").innerHTML = categories.map((item) => `<article class="category-note"><h2>${item.name}</h2><p>${item.description}</p></article>`).join("");
}
function renderMenu() {
  const target = document.querySelector("#menu-pages");
  if (target) target.innerHTML = menuPages.map((url, index) => imageMarkup(url, "Cardápio — página " + (index + 1) + " de " + menuPages.length, { loading: index === 0 ? "eager" : "lazy", sizes: "(max-width: 850px) calc(100vw - 40px), 850px" })).join("");
}
function renderPortfolio() {
  const track = document.querySelector("#gallery-track");
  if (!track || !gallery.length) return;
  const dots = document.querySelector("#gallery-dots");
  const counter = document.querySelector("#gallery-count");
  let index = 0;
  let timer;
  let userPaused = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pointerStartX = null;
  let swipeInProgress = false;
  let paused = reducedMotion.matches;
  const pauseButton = document.querySelector("#gallery-toggle");
  track.innerHTML = gallery.map((item, slideIndex) => `
    <button class="gallery-photo" type="button" aria-label="Foto ${slideIndex + 1} de ${gallery.length}: ${item.alt}. Clique para avançar." ${slideIndex > 1 ? 'tabindex="-1" inert' : ""}>
      ${imageMarkup(item.image, item.alt, { loading: slideIndex < 2 ? "eager" : "lazy", sizes: carouselImageSizes, draggable: true })}
    </button>`).join("");
  const slides = [...track.children];
  function show(next) {
    index = (next + gallery.length) % gallery.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("active", active);
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(gallery.length).padStart(2, "0")}`;
    dots.querySelectorAll("button").forEach((button, dotIndex) => {
      const active = dotIndex === index;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }
  function restartTimer() {
    clearTimeout(timer);
    if (!paused && !document.hidden && !document.querySelector("#gallery:hover") && !document.querySelector("#gallery:focus-within")) {
      timer = setTimeout(() => { show(index + 1); restartTimer(); }, 4500);
    }
  }
  function updatePauseButton() {
    pauseButton.textContent = paused ? "Retomar apresentação" : "Pausar apresentação";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }
  pauseButton.addEventListener("click", () => {
    userPaused = !userPaused;
    paused = userPaused || reducedMotion.matches;
    updatePauseButton();
    restartTimer();
  });
  document.addEventListener("visibilitychange", () => {
    restartTimer();
  });
  const galleryElement = document.querySelector("#gallery");
  galleryElement.addEventListener("mouseenter", () => clearTimeout(timer));
  galleryElement.addEventListener("mouseleave", restartTimer);
  galleryElement.addEventListener("focusin", () => clearTimeout(timer));
  galleryElement.addEventListener("focusout", (event) => {
    if (!galleryElement.contains(event.relatedTarget)) restartTimer();
  });
  galleryElement.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { show(index - 1); restartTimer(); }
    if (event.key === "ArrowRight") { show(index + 1); restartTimer(); }
  });
  galleryElement.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".gallery-arrow")) return;
    pointerStartX = event.clientX;
  });
  galleryElement.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 45) return;
    swipeInProgress = true;
    show(index + (distance < 0 ? 1 : -1));
    restartTimer();
  });
  galleryElement.addEventListener("pointercancel", () => { pointerStartX = null; });
  track.addEventListener("click", (event) => {
    if (!event.target.closest(".gallery-photo")) return;
    if (swipeInProgress) {
      swipeInProgress = false;
      event.preventDefault();
      return;
    }
    show(index + 1);
    restartTimer();
  });
  reducedMotion.addEventListener("change", () => {
    paused = userPaused || reducedMotion.matches;
    updatePauseButton();
    restartTimer();
  });
  dots.innerHTML = gallery.map((_, dotIndex) => `<button type="button" aria-label="Ir para foto ${dotIndex + 1}"></button>`).join("");
  dots.addEventListener("click", (event) => {
    const dotIndex = [...dots.children].indexOf(event.target);
    if (dotIndex >= 0) { show(dotIndex); restartTimer(); }
  });
  document.querySelector(".gallery .previous").addEventListener("click", () => { show(index - 1); restartTimer(); });
  document.querySelector(".gallery .next").addEventListener("click", () => { show(index + 1); restartTimer(); });
  document.querySelector("#portfolio-testimonials").innerHTML = testimonials.map(testimonialCard).join("");
  show(0);
  updatePauseButton();
  restartTimer();
}

function setupQuoteForm() {
  const form = document.querySelector("#quote-form");
  if (!form) return;

  const dateInput = form.elements.namedItem("date");
  let startTracked = false;
  form.addEventListener("input", () => {
    if (!startTracked && trackEvent("budget_start")) startTracked = true;
  });
  const now = new Date();
  dateInput.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const details = [
      ["Nome", values.get("name")],
      ["Data da comemoração", new Date(`${values.get("date")}T12:00:00`).toLocaleDateString("pt-BR")],
      ["Evento", values.get("event")],
      ["Convidados", values.get("guests")],
      ["Encomenda", values.get("product")],
      values.get("flavor") ? ["Sabor ou recheio", values.get("flavor")] : null,
      ["Entrega ou retirada", values.get("delivery")],
      values.get("neighborhood") ? ["Bairro", values.get("neighborhood")] : null,
      values.get("details") ? ["Detalhes", values.get("details")] : null,
    ].filter(Boolean);
    const message = `Olá, Ângela! Gostaria de pedir um orçamento:\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nPodemos conversar sobre disponibilidade e valores?`;
    const whatsappUrl = new URL(`https://wa.me/${site.whatsappPhone}`);
    whatsappUrl.searchParams.set("text", message);

    const link = document.querySelector("#quote-whatsapp-link");
    link.href = whatsappUrl.href;
    link.hidden = false;
    document.querySelector("#quote-status").textContent = "Mensagem pronta. Confira as informações e abra o WhatsApp para enviar.";
    link.focus();
    trackEvent("budget_prepared");
  });
}

renderHeader();
renderFooter();
renderHome();
renderCatalog();
renderMenu();
renderPortfolio();
setupImageFeedback();
setupQuoteForm();
setupAnalytics();
