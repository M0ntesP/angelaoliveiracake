import { site, categories, products, homeFeaturedProducts, clientPhotos, menuSections, menuNotes, gallery, processVideos, partyPlanning } from "./site-data.js";
import imageManifest from "./image-manifest.json";
import { setupAnalytics, trackEvent } from "./analytics.js";
import { openLightbox } from "./lightbox.js";
import { inspirations, saveToggleMarkup, setupSaveToggles, inspirationsMessage } from "./inspirations.js";
import { pricePerKg, suggestedKg, formatKg, formatMoney, daysUntil, leadTimeHint } from "./party-planning.js";

// Elementos compartilhados e interações pequenas do site.
const pageLinks = [
  ["inicio", "Início", "index.html"], ["catalogo", "Catálogo", "catalogo.html"],
  ["cardapio", "Cardápio", "cardapio.html"], ["portfolio", "Portfólio", "portfolio.html"],
  ["feedback", "Feedback", "feedback.html"], ["endereco", "Endereço", "endereco.html"], ["contato", "Contato", "contato.html"],
];
const currentPage = document.body.dataset.page;
const imagePath = (name) => name.startsWith("/images/") ? name : `/images/${name}`;
const productImageSizes = "(max-width: 580px) calc(100vw - 30px), (max-width: 850px) calc((100vw - 66px) / 2), 356px";
const carouselImageSizes = "(max-width: 630px) calc(100vw - 30px), 600px";
const lightboxImageSizes = "(max-width: 900px) 100vw, 640px";
const siteOrigin = "https://angelaoliveira.lovable.app";
function whatsappLink(message) {
  const url = new URL(`https://wa.me/${site.whatsappPhone}`);
  url.searchParams.set("text", message);
  return url.href;
}

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

// Preenche o quadro quando a foto tem quase a mesma proporção dele (corta pouco);
// caso contrário, mostra a foto inteira sobre um fundo desfocado.
const coverTolerance = 0.2;
function framedImageMarkup(name, alt, { frameRatio, forceCover = false, ...options } = {}) {
  const path = imagePath(name);
  const asset = imageManifest[path.split("/").pop()];
  const backdropPath = asset?.sources?.[0]?.url || path;
  const photoRatio = asset ? asset.width / asset.height : null;
  const cover = forceCover || (frameRatio && photoRatio && Math.abs(photoRatio - frameRatio) / frameRatio <= coverTolerance);
  return `<span class="photo-frame${cover ? " photo-frame-cover" : ""}" style="--photo-backdrop: url('${backdropPath}')"><span class="photo-frame-backdrop" aria-hidden="true"></span>${imageMarkup(name, alt, { ...options, imageClass: "photo-frame-image" })}</span>`;
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
      <a class="brand" href="index.html" aria-label="Ângela Oliveira — início"><img src="${site.logo}" data-fallback-src="${site.logoFallback}" alt="Ângela Oliveira — Confeitaria Brasileira" width="360" height="360"></a>
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
      <div><img class="footer-logo" src="${site.footerLogo}" data-fallback-src="${site.logoFallback}" alt="Ângela Oliveira — Confeitaria Brasileira" width="486" height="486" loading="lazy"><p>Confeitaria Brasileira. Sabores que contam histórias. Encomendas sob medida em ${site.city}.</p><div class="footer-social">
        <a href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Ângela (abre em nova aba)"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg></a>
        <a href="${site.whatsapp}" aria-label="WhatsApp da Ângela"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 3C6.9 3 3 6.6 3 11.2c0 2.3 1 4.4 2.7 5.9L5 21l4.2-2c.9.2 1.8.4 2.8.4 5.1 0 9-3.6 9-8.2S17.1 3 12 3Zm-4 9.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg></a>
        <a href="mailto:${site.email}" aria-label="E-mail da Ângela"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></a>
      </div></div>
      <div><p class="eyebrow">Navegar</p><ul>${pageLinks.slice(1).map(([, label, url]) => `<li><a href="${url}">${label}</a></li>`).join("")}<li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a></li><li><a href="${site.links}" target="_blank" rel="noopener">Todos os links</a></li><li><a href="${whatsappLink("Olá, Ângela! Vim pelo site e quero contar como foi a minha encomenda.")}">Deixe seu feedback</a></li></ul></div>
      <div><p class="eyebrow">Pedidos e contato</p><a class="button" href="${site.whatsapp}">Fazer encomenda pelo WhatsApp</a><p>Pedidos combinados pelo WhatsApp, sem carrinho ou pagamento online.</p><p class="eyebrow">Telefone e WhatsApp</p><a class="footer-email" href="tel:+${site.whatsappPhone}">${site.phoneDisplay}</a><p class="eyebrow">E-mail</p><a class="footer-email" href="mailto:${site.email}">${site.email}</a></div>
    </div><p class="footer-wordmark" aria-hidden="true" translate="no">Ângela Oliveira</p><div class="copyright">© ${new Date().getFullYear()} ${site.name} · ${site.city}</div></footer>
    <a class="whatsapp-float" href="${site.whatsapp}" aria-label="Conversar com a Ângela pelo WhatsApp"><svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 3C6.9 3 3 6.6 3 11.2c0 2.3 1 4.4 2.7 5.9L5 21l4.2-2c.9.2 1.8.4 2.8.4 5.1 0 9-3.6 9-8.2S17.1 3 12 3Zm-4 9.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg><span>Encomendar</span></a>`;
}

const productOrderLink = (product) => whatsappLink(`Olá, Ângela! Tenho interesse em um bolo como o “${product.name}” do seu catálogo. Você pode me informar as opções e os valores para a minha data?`);
function productCard(product) {
  return `<article class="product-card" data-product-name="${product.name}"><div class="product-media"><button class="product-photo" type="button" data-zoom="${product.name}" aria-label="Ampliar foto: ${product.name}">${framedImageMarkup(product.image, product.name, { loading: "lazy", sizes: productImageSizes, frameRatio: 4 / 5 })}<span class="zoom-hint" aria-hidden="true">Ampliar</span></button>${saveToggleMarkup(product.name, { compact: true })}</div><div class="card-copy"><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p>${product.detail ? `<p class="muted">${product.detail}</p>` : ""}<a class="button button-outline full-button" data-product-order="${product.name}" href="${productOrderLink(product)}">Quero encomendar</a></div></article>`;
}
function productLightboxItem(product) {
  return {
    imageHtml: imageMarkup(product.image, product.name, { loading: "eager", sizes: lightboxImageSizes }),
    eyebrow: product.category,
    title: product.name,
    description: [product.description, product.detail].filter(Boolean).join(" · "),
    actionsHtml: `<a class="button" data-product-order="${product.name}" href="${productOrderLink(product)}">Quero um assim</a>${saveToggleMarkup(product.name)}`,
  };
}
function renderHome() {
  renderHomeShowcase();
  renderOccasions();
}
// Carrossel compartilhado pela vitrine da home e pela galeria do portfólio.
function setupCarousel({ root, track, dots, counter, pauseButton, photoSelector }) {
  const slides = [...track.children];
  const total = slides.length;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer;
  let pointerStartX = null;
  let swipeInProgress = false;
  let userPaused = false;
  let paused = reducedMotion.matches;

  function show(next) {
    index = (next + total) % total;
    // Carrega já as fotos vizinhas, para a próxima não aparecer vazia ao avançar.
    [index - 1, index + 1].forEach((neighbour) => {
      slides[(neighbour + total) % total].querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = "eager"; });
    });
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle("active", active);
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
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
  function go(next) { show(next); restartTimer(); }
  function updatePauseButton() {
    pauseButton.textContent = paused ? "Retomar apresentação" : "Pausar apresentação";
    pauseButton.setAttribute("aria-pressed", String(paused));
  }
  function updatePaused() {
    paused = userPaused || reducedMotion.matches;
    updatePauseButton();
    restartTimer();
  }

  dots.innerHTML = slides.map((_, dotIndex) => `<button type="button" aria-label="Ir para foto ${dotIndex + 1}"></button>`).join("");
  dots.addEventListener("click", (event) => {
    const dotIndex = [...dots.children].indexOf(event.target.closest("button"));
    if (dotIndex >= 0) go(dotIndex);
  });
  root.querySelector(".gallery-arrow.previous").addEventListener("click", () => go(index - 1));
  root.querySelector(".gallery-arrow.next").addEventListener("click", () => go(index + 1));
  track.addEventListener("click", (event) => {
    if (!event.target.closest(photoSelector)) return;
    if (swipeInProgress) { swipeInProgress = false; event.preventDefault(); return; }
    go(index + 1);
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
    go(index + (distance < 0 ? 1 : -1));
  });
  root.addEventListener("pointercancel", () => { pointerStartX = null; });
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") go(index - 1);
    if (event.key === "ArrowRight") go(index + 1);
  });
  root.addEventListener("mouseenter", () => clearTimeout(timer));
  root.addEventListener("mouseleave", restartTimer);
  root.addEventListener("focusin", () => clearTimeout(timer));
  root.addEventListener("focusout", (event) => { if (!root.contains(event.relatedTarget)) restartTimer(); });
  pauseButton.addEventListener("click", () => { userPaused = !userPaused; updatePaused(); });
  reducedMotion.addEventListener("change", updatePaused);
  document.addEventListener("visibilitychange", restartTimer);
  show(0);
  updatePauseButton();
  restartTimer();
}

function renderHomeShowcase() {
  const root = document.querySelector("#home-showcase");
  const track = document.querySelector("#home-showcase-track");
  if (!root || !track) return;
  track.innerHTML = homeFeaturedProducts.map((item, itemIndex) => `
    <article class="home-showcase-slide">
      <button class="home-showcase-photo" type="button" aria-label="${item.name}. Clique para avançar para a próxima foto.">
        ${framedImageMarkup(item.image, item.name, { loading: itemIndex < 1 ? "eager" : "lazy", sizes: carouselImageSizes, draggable: true })}
      </button>
      <div class="home-showcase-copy"><p class="eyebrow">${item.category}</p><h3>${item.name}</h3><p>${item.description}</p><a class="button button-outline" href="catalogo.html">Ver no catálogo</a></div>
    </article>`).join("");
  setupCarousel({
    root, track,
    dots: document.querySelector("#home-showcase-dots"),
    counter: document.querySelector("#home-showcase-count"),
    pauseButton: document.querySelector("#home-showcase-toggle"),
    photoSelector: ".home-showcase-photo",
  });
}
function clientPhotoCard(item, itemIndex, { sizes, loading }) {
  return `<figure class="feedback-photo-card"><a class="feedback-photo-link" href="${item.image}" data-client-photo="${itemIndex}" aria-label="Ampliar foto: ${item.caption}">${framedImageMarkup(item.image, item.alt, { loading, sizes })}</a><figcaption>${item.caption}</figcaption></figure>`;
}
function renderClientPhotos() {
  const targets = document.querySelectorAll("[data-client-photos]");
  targets.forEach((target) => {
    const limit = Number(target.dataset.clientPhotos) || clientPhotos.length;
    const sizes = "(max-width: 850px) calc((100vw - 52px) / 2), 270px";
    target.innerHTML = clientPhotos.slice(0, limit).map((item, itemIndex) => clientPhotoCard(item, itemIndex, { sizes, loading: itemIndex < 2 && currentPage === "feedback" ? "eager" : "lazy" })).join("");
    target.addEventListener("click", (event) => {
      const link = event.target.closest("[data-client-photo]");
      if (!link) return;
      event.preventDefault();
      openLightbox(clientPhotos.map((item) => ({
        imageHtml: imageMarkup(item.image, item.alt, { loading: "eager", sizes: lightboxImageSizes }),
        eyebrow: "Foto de cliente",
        title: item.caption,
        description: item.alt,
      })), Number(link.dataset.clientPhoto));
    });
  });
}

function renderOccasions() {
  const target = document.querySelector("#home-occasions");
  if (!target) return;
  target.innerHTML = categories.map((item) => {
    const count = products.filter((product) => product.category === item.name).length;
    const url = `catalogo.html?categoria=${encodeURIComponent(item.name)}`;
    return `<a class="occasion-card" href="${url}"><span class="occasion-arch">${framedImageMarkup(item.image, "", { loading: "lazy", sizes: "(max-width: 580px) calc(100vw - 30px), (max-width: 850px) calc((100vw - 56px) / 2), 260px", forceCover: true })}</span><span class="occasion-copy"><span class="occasion-name">${item.name}</span><span class="occasion-count">${count} ${count === 1 ? "modelo" : "modelos"} <span aria-hidden="true">→</span></span></span></a>`;
  }).join("");
}

function setupMarquee() {
  const marquee = document.querySelector(".marquee");
  if (!marquee) return;
  const toggle = marquee.querySelector(".marquee-toggle");
  toggle.addEventListener("click", () => {
    const paused = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Continuar o letreiro" : "Pausar o letreiro");
    toggle.querySelector("span").textContent = paused ? "▶" : "❚❚";
    marquee.classList.toggle("is-paused", paused);
  });
}

function renderCatalog() {
  const savedFilter = "♥ Minhas inspirações";
  const filters = ["Todos", ...categories.map((item) => item.name), savedFilter];
  let activeFilter = "Todos";
  let visibleProducts = products;
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
    activeFilter = active;
    // O filtro fica no endereço (catalogo.html?categoria=...), para a Ângela mandar o link de uma categoria.
    const url = new URL(window.location.href);
    if (active === "Todos") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", active === savedFilter ? "inspiracoes" : active);
    history.replaceState(null, "", url);
    visibleProducts = products.filter((item) => active === "Todos" || item.category === active || (active === savedFilter && inspirations.has(item.name)));
    productBox.innerHTML = visibleProducts.length ? visibleProducts.map(productCard).join("") : `<p class="empty-state">Você ainda não salvou nenhuma inspiração. Toque em <strong>♡ Salvar</strong> nos bolos de que gostar para montar a sua lista.</p>`;
    buttonBox.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", button.textContent === active);
      button.setAttribute("aria-pressed", String(button.textContent === active));
    });
    observeProductCards();
  }
  productBox.addEventListener("click", (event) => {
    const zoom = event.target.closest("[data-zoom]");
    if (!zoom) return;
    const start = visibleProducts.findIndex((item) => item.name === zoom.dataset.zoom);
    openLightbox(visibleProducts.map(productLightboxItem), Math.max(start, 0), {
      onItemShow: (item) => trackEvent("product_zoom", { item_name: item.title }),
      onDialogClose: () => { if (activeFilter === savedFilter) showProducts(savedFilter); },
    });
  });
  inspirations.subscribe(() => {
    // Na lista de inspirações, remover um bolo tira o cartão da tela.
    if (activeFilter === savedFilter && !document.querySelector(".lightbox[open]")) showProducts(savedFilter);
  });
  renderInspirationBar(() => showProducts(savedFilter));
  buttonBox.innerHTML = filters.map((label) => `<button type="button" class="filter-button">${label}</button>`).join("");
  buttonBox.addEventListener("click", (event) => {
    if (event.target.matches("button")) showProducts(event.target.textContent);
  });
  const requested = new URLSearchParams(window.location.search).get("categoria");
  showProducts(requested === "inspiracoes" ? savedFilter : filters.includes(requested) ? requested : "Todos");
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
function renderInspirationBar(showSaved) {
  const bar = document.createElement("aside");
  bar.className = "inspiration-bar";
  bar.setAttribute("aria-label", "Minhas inspirações");
  document.body.append(bar);
  function update() {
    const names = inspirations.list();
    bar.hidden = names.length === 0;
    document.body.classList.toggle("has-inspiration-bar", names.length > 0);
    if (!names.length) return;
    bar.innerHTML = `<p><span aria-hidden="true">♥</span> <strong>${names.length} ${names.length === 1 ? "inspiração salva" : "inspirações salvas"}</strong></p>
      <div class="inspiration-bar-actions"><button class="button button-outline" type="button" data-show-saved>Ver lista</button><a class="button" data-send-inspirations href="${whatsappLink(inspirationsMessage(names, `${siteOrigin}/catalogo.html`))}">Enviar para a Ângela</a></div>`;
  }
  bar.addEventListener("click", (event) => {
    if (event.target.closest("[data-show-saved]")) {
      showSaved();
      document.querySelector("#catalog-filters")?.scrollIntoView({ block: "start" });
    }
    if (event.target.closest("[data-send-inspirations]")) trackEvent("inspirations_send", { items: inspirations.list().length });
  });
  inspirations.subscribe(update);
  update();
}

function renderMenu() {
  const target = document.querySelector("#menu-sections");
  if (!target) return;
  const nav = document.querySelector("#menu-nav");
  if (nav) nav.innerHTML = menuSections.map((section) => `<a class="filter-button" href="#${section.id}">${section.title.replace(/^Bolos /, "")}</a>`).join("");
  target.innerHTML = menuSections.map((section) => `
    <section class="menu-section" id="${section.id}" aria-labelledby="${section.id}-title">
      <h2 id="${section.id}-title">${section.title}</h2>
      ${section.intro ? `<p class="menu-section-intro">${section.intro}</p>` : ""}
      ${section.prices ? `<dl class="menu-unit-prices">${section.prices.map(([label, price]) => `<div><dt>${label}</dt><dd>${price}</dd></div>`).join("")}</dl>` : ""}
      <ul class="menu-list">${section.items.map((item) => `
        <li class="menu-item"><div class="menu-item-head"><h3>${item.name}</h3>${item.price ? `<span class="menu-leader" aria-hidden="true"></span><span class="menu-price">${item.price}</span>` : ""}</div><p>${item.description}</p></li>`).join("")}
      </ul>
    </section>`).join("") + `
    <section class="menu-section menu-notes" aria-labelledby="menu-notes-title">
      <h2 id="menu-notes-title">Observações</h2>
      <ul>${menuNotes.map((note) => `<li>${note}</li>`).join("")}</ul>
    </section>`;
}
function renderPortfolio() {
  const processBox = document.querySelector("#process-videos");
  if (processBox) {
    processBox.innerHTML = processVideos.map((item, index) => `
      <figure class="process-card">
        <video class="process-video" controls preload="none" playsinline${item.muted ? " muted" : ""}${item.poster ? ` poster="${item.poster}"` : ""} width="848" height="478" aria-labelledby="process-video-title-${index + 1}"${item.description ? ` aria-describedby="process-video-description-${index + 1}"` : ""}>
          <source src="${item.src}" type="video/mp4">
          Seu navegador não consegue reproduzir este vídeo.
        </video>
        <figcaption class="card-copy"><p class="eyebrow">Bastidores · ${index + 1} de ${processVideos.length}</p><h3 id="process-video-title-${index + 1}">${item.title}</h3>${item.description ? `<p id="process-video-description-${index + 1}">${item.description}</p>` : ""}</figcaption>
        <p class="process-video-error" role="status" hidden>Não foi possível carregar este vídeo. Tente novamente mais tarde.</p>
      </figure>`).join("");
    processBox.querySelectorAll("video").forEach((video) => {
      const showError = () => { video.closest(".process-card").querySelector(".process-video-error").hidden = false; };
      // Falhas de rede/arquivo disparam "error" no <source>, não no <video>.
      video.addEventListener("error", showError);
      video.querySelector("source")?.addEventListener("error", showError);
    });
  }
  const track = document.querySelector("#gallery-track");
  if (!track || !gallery.length) return;
  track.innerHTML = gallery.map((item, slideIndex) => `
    <button class="gallery-photo" type="button" aria-label="Foto ${slideIndex + 1} de ${gallery.length}: ${item.alt}. Clique para avançar.">
      ${framedImageMarkup(item.image, item.alt, { loading: slideIndex < 1 ? "eager" : "lazy", sizes: carouselImageSizes, draggable: true })}
    </button>`).join("");
  setupCarousel({
    root: document.querySelector("#gallery"),
    track,
    dots: document.querySelector("#gallery-dots"),
    counter: document.querySelector("#gallery-count"),
    pauseButton: document.querySelector("#gallery-toggle"),
    photoSelector: ".gallery-photo",
  });
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

  // Dados vindos da calculadora do cardápio (contato.html?convidados=30&sabor=...).
  const params = new URLSearchParams(window.location.search);
  const guestsInput = form.elements.namedItem("guests");
  const flavorInput = form.elements.namedItem("flavor");
  if (/^\d{1,5}$/.test(params.get("convidados") || "")) guestsInput.value = params.get("convidados");
  if (params.get("sabor")) flavorInput.value = params.get("sabor").slice(0, 120);

  const dateHint = document.querySelector("#quote-date-hint");
  const guestsHint = document.querySelector("#quote-guests-hint");
  function updateHints() {
    const hint = leadTimeHint(daysUntil(dateInput.value));
    if (dateHint) {
      dateHint.textContent = hint?.text || "";
      dateHint.dataset.tone = hint?.tone || "";
    }
    const kg = suggestedKg(Number(guestsInput.value));
    if (guestsHint) guestsHint.textContent = kg ? `Sugestão: cerca de ${formatKg(kg)} de bolo (porção média de ${partyPlanning.gramsPerGuest} g por pessoa).` : "";
  }
  dateInput.addEventListener("input", updateHints);
  dateInput.addEventListener("change", updateHints);
  guestsInput.addEventListener("input", updateHints);
  updateHints();

  // Inspirações salvas no catálogo entram no pedido.
  const savedBox = document.querySelector("#quote-inspirations");
  function renderSaved() {
    if (!savedBox) return;
    const names = inspirations.list();
    savedBox.hidden = names.length === 0;
    savedBox.querySelector("ul").innerHTML = names.map((name) => `<li><span>${name}</span><button type="button" data-remove-inspiration="${name}" aria-label="Tirar do pedido: ${name}">×</button></li>`).join("");
  }
  savedBox?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-inspiration]");
    if (button) inspirations.remove(button.dataset.removeInspiration);
  });
  inspirations.subscribe(renderSaved);
  renderSaved();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const details = [
      ["Nome", values.get("name")],
      ["Data da comemoração", new Date(`${values.get("date")}T12:00:00`).toLocaleDateString("pt-BR")],
      ["Evento", values.get("event")],
      ["Convidados", values.get("guests")],
      suggestedKg(Number(values.get("guests"))) ? ["Tamanho sugerido pelo site", `cerca de ${formatKg(suggestedKg(Number(values.get("guests"))))}`] : null,
      ["Encomenda", values.get("product")],
      values.get("flavor") ? ["Sabor ou recheio", values.get("flavor")] : null,
      ["Entrega ou retirada", values.get("delivery")],
      values.get("neighborhood") ? ["Bairro", values.get("neighborhood")] : null,
      values.get("details") ? ["Detalhes", values.get("details")] : null,
      inspirations.list().length ? ["Inspirações do catálogo", inspirations.list().join("; ")] : null,
    ].filter(Boolean);
    const message = `Olá, Ângela! Gostaria de pedir um orçamento:\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nPodemos conversar sobre disponibilidade e valores?`;
    const link = document.querySelector("#quote-whatsapp-link");
    link.href = whatsappLink(message);
    link.hidden = false;
    document.querySelector("#quote-status").textContent = "Mensagem pronta. Confira as informações e abra o WhatsApp para enviar.";
    link.focus();
    trackEvent("budget_prepared");
  });
}

// Calculadora "Quanto bolo eu preciso?": funciona em qualquer bloco [data-party-calculator]
// (cardápio e página inicial).
function setupPartyCalculators() {
  document.querySelectorAll("[data-party-calculator]").forEach(setupPartyCalculator);
}
function setupPartyCalculator(root) {
  const form = root.querySelector(".calculator-form");
  const flavorSelect = form.elements.namedItem("flavor");
  const guestsInput = form.elements.namedItem("guests");
  const output = root.querySelector(".calculator-result");
  flavorSelect.innerHTML = `<option value="">Ainda não sei o sabor</option>` + menuSections
    .map((section) => ({ section, items: section.items.filter((item) => pricePerKg(item.price)) }))
    .filter(({ items }) => items.length)
    .map(({ section, items }) => `<optgroup label="${section.title}">${items.map((item) => `<option value="${item.name}" data-price="${pricePerKg(item.price)}">${item.name} — ${item.price}</option>`).join("")}</optgroup>`)
    .join("");

  let tracked = false;
  function update() {
    const guests = Number(guestsInput.value);
    const kg = suggestedKg(guests);
    if (!kg) {
      output.innerHTML = `<p class="calculator-empty">Informe o número de convidados para ver a sugestão.</p>`;
      return;
    }
    const option = flavorSelect.selectedOptions[0];
    const price = Number(option?.dataset.price) || null;
    const flavor = flavorSelect.value;
    const estimate = price ? formatMoney(kg * price) : null;
    const message = [
      "Olá, Ângela! Usei a calculadora do site:",
      "",
      `Convidados: ${guests}`,
      `Tamanho sugerido: cerca de ${formatKg(kg)}`,
      flavor ? `Sabor: ${flavor}` : "Sabor: ainda vou escolher",
      estimate ? `Estimativa só do bolo: ${estimate}` : null,
      "",
      "Pode me ajudar com a decoração, a disponibilidade e o valor final?",
    ].filter((line) => line !== null).join("\n");
    const contactUrl = new URL("contato.html", window.location.href);
    contactUrl.searchParams.set("convidados", String(guests));
    if (flavor) contactUrl.searchParams.set("sabor", flavor);
    contactUrl.hash = "quote-title";
    output.innerHTML = `
      <div class="calculator-figures">
        <div><span class="calculator-label">Tamanho sugerido</span><strong>${formatKg(kg)}</strong><span class="calculator-note">para ${guests} ${guests === 1 ? "pessoa" : "pessoas"}, cerca de ${partyPlanning.gramsPerGuest} g cada</span></div>
        ${estimate ? `<div><span class="calculator-label">Estimativa só do bolo</span><strong>${estimate}</strong><span class="calculator-note">${flavor} · ${option.textContent.split(" — ")[1]}</span></div>` : ""}
      </div>
      <p class="calculator-disclaimer">Estimativa pelo preço por quilo do cardápio. Decoração, topo personalizado, andares e entrega são orçados à parte, e a Ângela confirma o tamanho ideal.</p>
      <div class="button-row"><a class="button" data-calculator-send href="${whatsappLink(message)}">Pedir orçamento com esses dados</a><a class="button button-outline" href="${contactUrl.pathname + contactUrl.search + contactUrl.hash}">Preencher pedido completo</a></div>`;
    if (!tracked && trackEvent("calculator_use")) tracked = true;
  }
  form.addEventListener("input", update);
  form.addEventListener("submit", (event) => event.preventDefault());
  update();
}

function setupAddressMap() {
  const frame = document.querySelector("#address-map");
  if (!frame) return;
  frame.querySelector("[data-load-map]")?.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.title = "Mapa com a localização da confeitaria";
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(frame.dataset.mapQuery)}&output=embed`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
    iframe.focus();
  });
}

renderHeader();
renderFooter();
renderHome();
renderCatalog();
renderMenu();
renderPortfolio();
renderClientPhotos();
setupSaveToggles((name, active) => { if (active) trackEvent("inspiration_save", { item_name: name }); });
setupPartyCalculators();
setupMarquee();
setupImageFeedback();
setupQuoteForm();
setupAddressMap();
setupAnalytics();
