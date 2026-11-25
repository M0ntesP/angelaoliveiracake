// Montagem do HTML a partir dos dados do site. Sem acesso ao navegador (window/document):
// o mesmo código roda no build (vite.config.js grava o conteúdo já pronto nas páginas)
// e no navegador (main.js monta de novo e liga as interações).
import { site, categories, products, homeFeaturedProducts, clientPhotos, menuSections, menuNotes } from "./site-data.js";
import imageManifest from "./image-manifest.json" with { type: "json" };

export const pageLinks = [
  ["inicio", "Início", "index.html"], ["catalogo", "Catálogo", "catalogo.html"],
  ["cardapio", "Cardápio", "cardapio.html"], ["portfolio", "Portfólio", "portfolio.html"],
  ["feedback", "Feedback", "feedback.html"], ["endereco", "Endereço", "endereco.html"], ["contato", "Contato", "contato.html"],
];
export const siteOrigin = "https://angelaoliveira.lovable.app";
export const savedFilter = "♥ Minhas inspirações";
export const catalogFilters = ["Todos", ...categories.map((item) => item.name), savedFilter];
const productImageSizes = "(max-width: 580px) calc(100vw - 30px), (max-width: 850px) calc((100vw - 66px) / 2), 356px";
const showcaseImageSizes = "(max-width: 850px) calc((100vw - 52px) / 2), 356px";
export const lightboxImageSizes = "(max-width: 900px) 100vw, 640px";

const imagePath = (name) => name.startsWith("/images/") ? name : `/images/${name}`;

export function whatsappLink(message) {
  const url = new URL(`https://wa.me/${site.whatsappPhone}`);
  url.searchParams.set("text", message);
  return url.href;
}

export function imageMarkup(name, alt, { loading = "lazy", sizes = "100vw", imageClass = "", draggable = false } = {}) {
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
export function framedImageMarkup(name, alt, { frameRatio, forceCover = false, ...options } = {}) {
  const path = imagePath(name);
  const asset = imageManifest[path.split("/").pop()];
  const backdropPath = asset?.sources?.[0]?.url || path;
  const photoRatio = asset ? asset.width / asset.height : null;
  const cover = forceCover || (frameRatio && photoRatio && Math.abs(photoRatio - frameRatio) / frameRatio <= coverTolerance);
  return `<span class="photo-frame${cover ? " photo-frame-cover" : ""}" style="--photo-backdrop: url('${backdropPath}')"><span class="photo-frame-backdrop" aria-hidden="true"></span>${imageMarkup(name, alt, { ...options, imageClass: "photo-frame-image" })}</span>`;
}

export function headerMarkup(currentPage) {
  return `
    <a class="skip-link" href="#main-content">Pular para o conteúdo</a>
    <header class="site-header"><div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Ângela Oliveira — início"><img src="${site.logo}" data-fallback-src="${site.logoFallback}" alt="Ângela Oliveira — Confeitaria Brasileira" width="360" height="360"></a>
      <button class="menu-toggle" type="button" aria-label="Abrir menu" aria-controls="main-navigation" aria-expanded="false">☰</button>
      <nav class="main-nav" id="main-navigation" aria-label="Navegação principal">${pageLinks.map(([id, label, url]) => `<a ${currentPage === id ? 'aria-current="page"' : ""} href="${url}">${label}</a>`).join("")}<a class="button nav-order" href="${site.whatsapp}">Encomendar</a></nav>
    </div></header>`;
}

export function footerMarkup() {
  return `
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

// Botão "Salvar" das inspirações; quem chama informa se o bolo já está salvo.
export function saveToggleMarkup(name, { compact = false, active = false } = {}) {
  return `<button class="save-toggle${compact ? " save-toggle-compact" : ""}" type="button" data-save="${name}" aria-pressed="${active}" aria-label="${active ? "Remover das" : "Salvar nas"} minhas inspirações: ${name}"><span class="save-icon" aria-hidden="true">${active ? "♥" : "♡"}</span><span class="save-label">${active ? "Salvo" : "Salvar"}</span></button>`;
}

export const productOrderLink = (product) => whatsappLink(`Olá, Ângela! Tenho interesse em um bolo como o “${product.name}” do seu catálogo. Você pode me informar as opções e os valores para a minha data?`);

export function productCard(product, { saved = false } = {}) {
  return `<article class="product-card" data-product-name="${product.name}"><div class="product-media"><button class="product-photo" type="button" data-zoom="${product.name}" aria-label="Ampliar foto: ${product.name}">${framedImageMarkup(product.image, product.name, { loading: "lazy", sizes: productImageSizes, frameRatio: 4 / 5 })}<span class="zoom-hint" aria-hidden="true">Ampliar</span></button>${saveToggleMarkup(product.name, { compact: true, active: saved })}</div><div class="card-copy"><div><p class="eyebrow">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p>${product.detail ? `<p class="muted">${product.detail}</p>` : ""}</div><a class="button button-outline full-button" data-product-order="${product.name}" href="${productOrderLink(product)}">Quero encomendar</a></div></article>`;
}

export function catalogFiltersMarkup(active = "Todos") {
  return catalogFilters.map((label) => `<button type="button" class="filter-button${label === active ? " active" : ""}" aria-pressed="${label === active}">${label}</button>`).join("");
}

export function categoryNotesMarkup() {
  return categories.map((item) => `<article class="category-note"><h2>${item.name}</h2><p>${item.description}</p></article>`).join("");
}

export function occasionsMarkup() {
  return categories.map((item) => {
    const count = products.filter((product) => product.category === item.name).length;
    const url = `catalogo.html?categoria=${encodeURIComponent(item.name)}`;
    return `<a class="occasion-card" href="${url}"><span class="occasion-arch">${framedImageMarkup(item.image, "", { loading: "lazy", sizes: "(max-width: 580px) calc(100vw - 30px), (max-width: 850px) calc((100vw - 56px) / 2), 260px", forceCover: true })}</span><span class="occasion-copy"><span class="occasion-name">${item.name}</span><span class="occasion-count">${count} ${count === 1 ? "modelo" : "modelos"} <span aria-hidden="true">→</span></span></span></a>`;
  }).join("");
}

// Vitrine da página inicial: grade de fotos; cada uma abre o visualizador.
export function showcaseMarkup() {
  return homeFeaturedProducts.map((item, itemIndex) => `<article class="showcase-card"><button class="showcase-photo" type="button" data-showcase="${itemIndex}" aria-label="Ampliar foto: ${item.name}">${framedImageMarkup(item.image, item.name, { loading: "lazy", sizes: showcaseImageSizes, frameRatio: 4 / 5 })}<span class="zoom-hint" aria-hidden="true">Ampliar</span></button><div class="showcase-copy"><p class="eyebrow">${item.category}</p><h3>${item.name}</h3></div></article>`).join("");
}

export function clientPhotosMarkup(limit = clientPhotos.length, currentPage = "") {
  const sizes = "(max-width: 850px) calc((100vw - 52px) / 2), 270px";
  return clientPhotos.slice(0, limit).map((item, itemIndex) => {
    const loading = itemIndex < 2 && currentPage === "feedback" ? "eager" : "lazy";
    return `<figure class="feedback-photo-card"><a class="feedback-photo-link" href="${item.image}" data-client-photo="${itemIndex}" aria-label="Ampliar foto: ${item.caption}">${framedImageMarkup(item.image, item.alt, { loading, sizes })}</a><figcaption>${item.caption}</figcaption></figure>`;
  }).join("");
}

export function menuNavMarkup() {
  return menuSections.map((section) => `<a class="filter-button" href="#${section.id}">${section.title.replace(/^Bolos /, "")}</a>`).join("");
}

export function menuSectionsMarkup() {
  return menuSections.map((section) => `
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

// Conteúdo gravado no HTML durante o build, por id do contêiner vazio na página.
export function prerenderedSections(currentPage) {
  return {
    "site-header": headerMarkup(currentPage),
    "site-footer": footerMarkup(),
    "home-occasions": occasionsMarkup(),
    "home-showcase": showcaseMarkup(),
    "catalog-filters": catalogFiltersMarkup(),
    "catalog-products": products.map((product) => productCard(product)).join(""),
    "catalog-categories": categoryNotesMarkup(),
    "menu-nav": menuNavMarkup(),
    "menu-sections": menuSectionsMarkup(),
  };
}
