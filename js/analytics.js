const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const consentKey = "analytics-consent-v1";
let analyticsStarted = false;
let consentAllowed = false;

function getSavedConsent() {
  try {
    return localStorage.getItem(consentKey);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    localStorage.setItem(consentKey, value);
  } catch {
    // The visitor's choice still applies for this page if storage is unavailable.
  }
}

function startAnalytics() {
  if (!measurementId || analyticsStarted) return;
  analyticsStarted = true;
  consentAllowed = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args) => window.dataLayer.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  if (document.body.dataset.page === "catalogo") {
    window.gtag("event", "catalog_view", { transport_type: "beacon" });
  }
  window.dispatchEvent(new Event("analytics-consent-granted"));

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
}

export function trackEvent(name, parameters = {}) {
  if (!measurementId || !consentAllowed || typeof window.gtag !== "function") return false;
  window.gtag("event", name, { ...parameters, transport_type: "beacon" });
  return true;
}

function showConsentBanner() {
  if (document.querySelector(".analytics-consent")) return;
  const banner = document.createElement("aside");
  banner.className = "analytics-consent";
  banner.setAttribute("aria-label", "Preferências de cookies de análise");
  banner.innerHTML = `
    <p><strong>Ajude a melhorar o site?</strong> Com sua autorização, usamos o Google Analytics para contar visitas e cliques. Nenhuma medição é carregada antes da sua escolha.</p>
    <div class="analytics-consent-actions">
      <button class="button button-outline" type="button" data-analytics-choice="rejected">Agora não</button>
      <button class="button" type="button" data-analytics-choice="accepted">Aceitar análise</button>
    </div>`;

  banner.addEventListener("click", (event) => {
    const choiceButton = event.target.closest("[data-analytics-choice]");
    if (!choiceButton) return;
    const choice = choiceButton.dataset.analyticsChoice;
    saveConsent(choice);
    banner.remove();
    if (choice === "accepted") startAnalytics();
    else {
      consentAllowed = false;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
    }
  });
  document.body.append(banner);
}

function addPreferencesLink() {
  const copyright = document.querySelector(".copyright");
  if (!copyright) return;
  const control = document.createElement("button");
  control.className = "analytics-preferences";
  control.type = "button";
  control.textContent = "Preferências de análise";
  control.addEventListener("click", showConsentBanner);
  copyright.append(document.createTextNode(" · "), control);
}

export function setupAnalytics() {
  if (!measurementId) return;

  addPreferencesLink();
  const consent = getSavedConsent();
  if (consent === "accepted") startAnalytics();
  else if (consent !== "rejected") showConsentBanner();

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;

    const url = new URL(link.href, window.location.href);
    if (link.dataset.productOrder) {
      trackEvent("product_order_click", { item_name: link.dataset.productOrder });
    }
    if (url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com")) {
      trackEvent("whatsapp_click");
    }
    if (url.hostname === "www.instagram.com") {
      trackEvent("instagram_click");
    }
    if (url.pathname.toLowerCase().endsWith("/catalogo.html")) {
      trackEvent("catalog_click");
    }
  });
}
