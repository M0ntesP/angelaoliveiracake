// "Minhas inspirações": o cliente marca os bolos de que gostou no catálogo e envia a lista
// para a Ângela pelo WhatsApp (ou junto com o pedido de orçamento). Fica salvo só no
// navegador da pessoa; se o armazenamento estiver bloqueado, vale enquanto a página estiver aberta.
import { products } from "./site-data.js";
import { saveToggleMarkup as toggleMarkup } from "./render.js";

const storageKey = "inspiracoes-v1";
// Só nomes que ainda existem no catálogo: um bolo renomeado ou removido sai da lista sozinho.
const knownNames = new Set(products.map((item) => item.name));
const listeners = new Set();
let saved = load();

function load() {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(value) ? value.filter((name) => knownNames.has(name)) : [];
  } catch {
    return [];
  }
}

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(saved));
  } catch {
    // Sem armazenamento disponível: a lista continua valendo nesta página.
  }
  listeners.forEach((listener) => listener(saved));
}

export const inspirations = {
  list: () => [...saved],
  has: (name) => saved.includes(name),
  toggle(name) {
    saved = saved.includes(name) ? saved.filter((item) => item !== name) : [...saved, name];
    persist();
    return saved.includes(name);
  },
  remove(name) {
    saved = saved.filter((item) => item !== name);
    persist();
  },
  clear() {
    saved = [];
    persist();
  },
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

// Outra aba alterou a lista: mantém esta página em dia.
window.addEventListener("storage", (event) => {
  if (event.key !== storageKey) return;
  saved = load();
  listeners.forEach((listener) => listener(saved));
});

export function saveToggleMarkup(name, { compact = false } = {}) {
  return toggleMarkup(name, { compact, active: inspirations.has(name) });
}

function syncToggleButtons() {
  document.querySelectorAll("[data-save]").forEach((button) => {
    const name = button.dataset.save;
    const active = inspirations.has(name);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", `${active ? "Remover das" : "Salvar nas"} minhas inspirações: ${name}`);
    button.querySelector(".save-icon").textContent = active ? "♥" : "♡";
    button.querySelector(".save-label").textContent = active ? "Salvo" : "Salvar";
  });
}

export function setupSaveToggles(onToggle) {
  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-save]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const active = inspirations.toggle(button.dataset.save);
    onToggle?.(button.dataset.save, active);
  }, true);
  inspirations.subscribe(syncToggleButtons);
}

export function inspirationsMessage(names, siteUrl) {
  return `Olá, Ângela! Separei estas inspirações no seu catálogo:\n\n${names.map((name) => `• ${name}`).join("\n")}\n\n${siteUrl}\n\nPode me passar opções e valores para a minha data?`;
}
