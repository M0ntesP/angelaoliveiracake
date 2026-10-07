import { site, categories, products, testimonials, menuPages, gallery } from "./site-data.js";
import { setupAnalytics, trackEvent } from "./analytics.js";

// Elementos compartilhados e interações pequenas do site.
const pageLinks = [
  ["inicio", "Início", "index.html"], ["catalogo", "Catálogo", "catalogo.html"],
  ["cardapio", "Cardápio", "cardapio.html"], ["portifolio", "Portfólio", "portifolio.html"],
  ["endereco", "Endereço", "endereco.html"], ["contato", "Contato", "contato.html"],
];
const currentPage = document.body.dataset.page;
const imageUrl = (name) => `/images/${name}`;

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
      <div><p class="eyebrow">Pedidos apenas por WhatsApp</p><a class="button" href="${site.whatsapp}">Fazer encomenda</a><p>Sem carrinho e sem pagamento online: combinamos tudo na conversa.</p></div>
    </div><div class="copyright">© ${new Date().getFullYear()} ${site.name} · ${site.city}</div></footer>`;
}

function productCard(product) {
  return `<article class="product-card"><img src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy" decoding="async"><div class="card-copy"><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p>${product.detail ? `<p class="muted">${product.detail}</p>` : ""}<a class="button button-outline full-button" href="${site.whatsapp}">Encomendar no WhatsApp</a></div></article>`;
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
        <img src="${imageUrl(item.image)}" alt="${item.name}" draggable="false" loading="${itemIndex < 2 ? "eager" : "lazy"}" decoding="async">
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
  function showProducts(active) {
    productBox.innerHTML = products.filter((item) => active === "Todos" || item.category === active).map(productCard).join("");
    buttonBox.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.textContent === active);
      button.setAttribute("aria-pressed", String(button.textContent === active));
    });
  }
  buttonBox.innerHTML = filters.map((label) => `<button type="button" class="filter-button">${label}</button>`).join("");
  buttonBox.addEventListener("click", (event) => {
    if (event.target.matches("button")) showProducts(event.target.textContent);
  });
  showProducts("Todos");
  document.querySelector("#catalog-categories").innerHTML = categories.map((item) => `<article class="category-note"><h2>${item.name}</h2><p>${item.description}</p></article>`).join("");
}
function renderMenu() {
  const target = document.querySelector("#menu-pages");
  if (target) target.innerHTML = menuPages.map((url, index) => `<img src="${url}" alt="Cardápio — página ${index + 1} de ${menuPages.length}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">`).join("");
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
      <img src="${item.image}" alt="${item.alt}" draggable="false" loading="${slideIndex < 2 ? "eager" : "lazy"}" decoding="async">
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
  const now = new Date();
  dateInput.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const details = [
      ["Nome", values.get("name")],
      ["Data da comemoração", new Date(`${values.get("date")}T12:00:00`).toLocaleDateString("pt-BR")],
      ["Convidados", values.get("guests")],
      ["Encomenda", values.get("product")],
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
    trackEvent("quote_form_prepared");
  });
}

renderHeader();
renderFooter();
renderHome();
renderCatalog();
renderMenu();
renderPortfolio();
setupQuoteForm();
setupAnalytics();
