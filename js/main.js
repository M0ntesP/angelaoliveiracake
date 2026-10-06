// Elementos compartilhados e interações pequenas do site.
const pageLinks = [
  ["inicio", "Início", "index.html"], ["catalogo", "Catálogo", "catalogo.html"],
  ["cardapio", "Cardápio", "cardapio.html"], ["portifolio", "Portfólio", "portifolio.html"],
  ["contato", "Contato", "contato.html"],
];
const currentPage = document.body.dataset.page;
const imageUrl = (name) => `/images/${name}`;

function renderHeader() {
  document.querySelector("#site-header").innerHTML = `
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Ângela Oliveira — início"><img src="${site.logo}" alt="Ângela Oliveira — Confeitaria Brasileira"></a>
      <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
      <nav class="main-nav" aria-label="Navegação principal">${pageLinks.map(([id, label, url]) => `<a ${currentPage === id ? 'aria-current="page"' : ""} href="${url}">${label}</a>`).join("")}<a class="button nav-order" href="${site.whatsapp}">Encomendar</a></nav>
    </div></header>`;
  const toggle = document.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    document.querySelector(".main-nav").classList.toggle("is-open", !isOpen);
  });
}

function renderFooter() {
  document.querySelector("#site-footer").innerHTML = `
    <footer class="site-footer"><div class="container footer-grid">
      <div><img class="footer-logo" src="${site.logo}" alt="Ângela Oliveira — Confeitaria Brasileira" loading="lazy"><p>Confeitaria Brasileira. Sabores que contam histórias. Encomendas sob medida em ${site.city}.</p></div>
      <div><p class="eyebrow">Navegar</p><ul>${pageLinks.slice(1).map(([, label, url]) => `<li><a href="${url}">${label}</a></li>`).join("")}<li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a></li><li><a href="${site.links}" target="_blank" rel="noopener">Todos os links</a></li></ul></div>
      <div><p class="eyebrow">Pedidos apenas por WhatsApp</p><a class="button" href="${site.whatsapp}">Fazer encomenda</a><p>Sem carrinho e sem pagamento online: combinamos tudo na conversa.</p></div>
    </div><div class="copyright">© ${new Date().getFullYear()} ${site.name} · ${site.city}</div></footer>
    <a class="floating-order button" href="${site.whatsapp}" aria-label="Fazer encomenda no WhatsApp">WhatsApp</a>`;
}

function productCard(product) {
  return `<article class="product-card"><img src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy"><div class="card-copy"><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p>${product.detail ? `<p class="muted">${product.detail}</p>` : ""}<a class="button button-outline full-button" href="${site.whatsapp}">Encomendar no WhatsApp</a></div></article>`;
}
function testimonialCard(item) {
  return `<figure class="testimonial"><blockquote>“${item.text}”</blockquote><figcaption>${item.name}</figcaption></figure>`;
}
function renderHome() {
  const categoryTarget = document.querySelector("#home-categories");
  if (categoryTarget) categoryTarget.innerHTML = categories.map((item) => `<article class="category-card"><img src="${imageUrl(item.image)}" alt="${item.name}" loading="lazy"><div class="card-copy"><h3>${item.name}</h3><p>${item.description}</p><a href="catalogo.html">Ver no catálogo</a></div></article>`).join("");
  const productTarget = document.querySelector("#home-products");
  if (productTarget) productTarget.innerHTML = products.slice(0, 6).map(productCard).join("");
  const reviewTarget = document.querySelector("#home-testimonials");
  if (reviewTarget) reviewTarget.innerHTML = testimonials.map(testimonialCard).join("");
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
  if (target) target.innerHTML = menuPages.map((url, index) => `<img src="${url}" alt="Cardápio — página ${index + 1} de ${menuPages.length}" loading="${index === 0 ? "eager" : "lazy"}">`).join("");
}
function renderPortfolio() {
  const image = document.querySelector("#gallery-image");
  if (!image) return;
  const dots = document.querySelector("#gallery-dots");
  let index = 0;
  let timer;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pauseButton = document.querySelector("#gallery-toggle");
  function show(next) {
    index = (next + gallery.length) % gallery.length;
    image.src = gallery[index].image;
    image.alt = gallery[index].alt;
    dots.querySelectorAll("button").forEach((button, dotIndex) => button.classList.toggle("active", dotIndex === index));
  }
  function restartTimer() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => show(index + 1), 4000);
  }
  function updatePauseButton() {
    pauseButton.textContent = paused ? "Retomar rotação" : "Pausar rotação";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    updatePauseButton();
    restartTimer();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else restartTimer();
  });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
    if (event.matches) {
      paused = true;
      updatePauseButton();
      restartTimer();
    }
  });
  dots.innerHTML = gallery.map((_, dotIndex) => `<button aria-label="Ir para foto ${dotIndex + 1}"></button>`).join("");
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

renderHeader();
renderFooter();
renderHome();
renderCatalog();
renderMenu();
renderPortfolio();
