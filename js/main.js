import { products, homeFeaturedProducts, clientPhotos, menuSections, gallery, processVideos, partyPlanning } from "./site-data.js";
import { setupAnalytics, trackEvent } from "./analytics.js";
import { openLightbox } from "./lightbox.js";
import { inspirations, saveToggleMarkup, setupSaveToggles, inspirationsMessage } from "./inspirations.js";
import { pricePerKg, suggestedKg, formatKg, formatMoney, daysUntil, leadTimeHint } from "./party-planning.js";
import {
  siteOrigin, savedFilter, heartIcon, catalogFilters, lightboxImageSizes, whatsappLink, imageMarkup, framedImageMarkup,
  headerMarkup, footerMarkup, productOrderLink, productCard, catalogFiltersMarkup, categoryNotesMarkup,
  occasionsMarkup, showcaseMarkup, clientPhotosMarkup, menuNavMarkup, menuSectionsMarkup,
} from "./render.js";

// Elementos compartilhados e interações pequenas do site. O HTML de cabeçalho, rodapé, catálogo,
// cardápio e vitrine já vem pronto do build (render.js); aqui ele é montado de novo e ganha as interações.
const currentPage = document.body.dataset.page;
const carouselImageSizes = "(max-width: 630px) calc(100vw - 30px), 600px";

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
  document.querySelector("#site-header").innerHTML = headerMarkup(currentPage);
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  function setMenuOpen(isOpen) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
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
  document.querySelector("#site-footer").innerHTML = footerMarkup();
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
// Carrossel da galeria de Páscoa do portfólio.
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
  const target = document.querySelector("#home-showcase");
  if (!target) return;
  target.innerHTML = showcaseMarkup();
  target.addEventListener("click", (event) => {
    const photo = event.target.closest("[data-showcase]");
    if (!photo) return;
    openLightbox(homeFeaturedProducts.map(productLightboxItem), Number(photo.dataset.showcase), {
      onItemShow: (item) => trackEvent("product_zoom", { item_name: item.title }),
    });
  });
}
function renderClientPhotos() {
  const targets = document.querySelectorAll("[data-client-photos]");
  targets.forEach((target) => {
    const limit = Number(target.dataset.clientPhotos) || clientPhotos.length;
    target.innerHTML = clientPhotosMarkup(limit, currentPage);
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
  if (target) target.innerHTML = occasionsMarkup();
}

function setupMarquee() {
  const marquee = document.querySelector(".marquee");
  if (!marquee) return;
  const toggle = marquee.querySelector(".marquee-toggle");
  toggle.addEventListener("click", () => {
    const paused = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.setAttribute("aria-label", paused ? "Continuar o letreiro" : "Pausar o letreiro");
    marquee.classList.toggle("is-paused", paused);
  });
}

function renderCatalog() {
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
    productBox.innerHTML = visibleProducts.length ? visibleProducts.map((item) => productCard(item, { saved: inspirations.has(item.name) })).join("") : `<p class="empty-state">Você ainda não salvou nenhuma inspiração. Toque em <strong>Salvar</strong> nos bolos de que gostar para montar a sua lista.</p>`;
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
  buttonBox.innerHTML = catalogFiltersMarkup();
  buttonBox.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) showProducts(button.textContent);
  });
  const requested = new URLSearchParams(window.location.search).get("categoria");
  showProducts(requested === "inspiracoes" ? savedFilter : catalogFilters.includes(requested) ? requested : "Todos");
  if (productObserver) {
    window.addEventListener("analytics-consent-granted", () => {
      productBox.querySelectorAll(".product-card:not([data-view-tracked])").forEach((card) => {
        productObserver.unobserve(card);
        productObserver.observe(card);
      });
    });
  }
  document.querySelector("#catalog-categories").innerHTML = categoryNotesMarkup();
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
    bar.innerHTML = `<p>${heartIcon} <strong>${names.length} ${names.length === 1 ? "inspiração salva" : "inspirações salvas"}</strong></p>
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
  if (nav) nav.innerHTML = menuNavMarkup();
  target.innerHTML = menuSectionsMarkup();
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
