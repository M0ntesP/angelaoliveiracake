// Visualizador de fotos em tela cheia, usado no catálogo e nas fotos de clientes.
// Cada item: { imageHtml, eyebrow?, title, description?, actionsHtml? }.
let dialog;
let items = [];
let index = 0;
let returnFocus = null;
let pointerStartX = null;
let onShow = null;
let onClose = null;

function ensureDialog() {
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-labelledby", "lightbox-title");
  dialog.innerHTML = `
    <div class="lightbox-panel">
      <button class="lightbox-close" type="button" aria-label="Fechar foto ampliada">×</button>
      <div class="lightbox-stage">
        <button class="lightbox-arrow previous" type="button" aria-label="Foto anterior">‹</button>
        <div class="lightbox-image"></div>
        <button class="lightbox-arrow next" type="button" aria-label="Próxima foto">›</button>
      </div>
      <div class="lightbox-copy">
        <p class="eyebrow lightbox-eyebrow"></p>
        <h2 id="lightbox-title" class="lightbox-title"></h2>
        <p class="lightbox-description"></p>
        <div class="lightbox-actions"></div>
        <p class="lightbox-count" aria-live="polite"></p>
      </div>
    </div>`;
  document.body.append(dialog);

  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lightbox-arrow.previous").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lightbox-arrow.next").addEventListener("click", () => show(index + 1));
  // Clicar no fundo escuro (fora do painel) fecha.
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (event) => {
    if (event.target.closest?.("input, textarea, select")) return;
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
  const stage = dialog.querySelector(".lightbox-stage");
  stage.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".lightbox-arrow")) pointerStartX = event.clientX;
  });
  stage.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) >= 45) show(index + (distance < 0 ? 1 : -1));
  });
  stage.addEventListener("pointercancel", () => { pointerStartX = null; });
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
    onClose?.();
    returnFocus?.focus?.();
  });
  return dialog;
}

function show(next) {
  index = (next + items.length) % items.length;
  const item = items[index];
  dialog.querySelector(".lightbox-image").innerHTML = item.imageHtml;
  dialog.querySelector(".lightbox-eyebrow").textContent = item.eyebrow || "";
  dialog.querySelector(".lightbox-eyebrow").hidden = !item.eyebrow;
  dialog.querySelector(".lightbox-title").textContent = item.title;
  dialog.querySelector(".lightbox-description").textContent = item.description || "";
  dialog.querySelector(".lightbox-description").hidden = !item.description;
  dialog.querySelector(".lightbox-actions").innerHTML = item.actionsHtml || "";
  dialog.querySelector(".lightbox-count").textContent = items.length > 1 ? `Foto ${index + 1} de ${items.length}` : "";
  dialog.querySelectorAll(".lightbox-arrow").forEach((arrow) => { arrow.hidden = items.length < 2; });
  onShow?.(item);
}

export function openLightbox(list, startIndex = 0, { onItemShow, onDialogClose } = {}) {
  if (!list.length) return;
  ensureDialog();
  items = list;
  onShow = onItemShow || null;
  onClose = onDialogClose || null;
  returnFocus = document.activeElement;
  show(startIndex);
  document.documentElement.classList.add("lightbox-open");
  dialog.showModal();
  dialog.querySelector(".lightbox-close").focus();
}
