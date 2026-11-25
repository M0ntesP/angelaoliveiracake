import { defineConfig } from "vite";
import { resolve } from "node:path";
import { prerenderedSections, clientPhotosMarkup } from "./js/render.js";

// Grava no HTML o conteúdo que antes só aparecia depois do JavaScript (cabeçalho, rodapé,
// catálogo, cardápio, vitrine). Assim buscadores e quem está sem JavaScript veem a página
// completa. O main.js monta o mesmo HTML de novo no navegador e liga as interações.
function prerenderSiteContent() {
  return {
    name: "prerender-site-content",
    transformIndexHtml(html) {
      const page = /<body[^>]*\bdata-page="([^"]+)"/.exec(html)?.[1];
      if (!page) return html;
      const sections = prerenderedSections(page);
      return html
        .replace(/<(div|section|nav)(\s[^>]*?)?\bid="([\w-]+)"([^>]*)><\/\1>/g, (match, tag, before = "", id, after) =>
          id in sections ? `<${tag}${before}id="${id}"${after}>${sections[id]}</${tag}>` : match)
        .replace(/(<div\s[^>]*\bdata-client-photos(?:="(\d*)")?[^>]*>)(<\/div>)/g, (match, open, limit, close) =>
          `${open}${clientPhotosMarkup(Number(limit) || undefined, page)}${close}`);
    },
  };
}

// Cada arquivo HTML é uma página independente do site.
export default defineConfig({
  plugins: [prerenderSiteContent()],
  build: {
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
        catalogo: resolve(import.meta.dirname, "catalogo.html"),
        cardapio: resolve(import.meta.dirname, "cardapio.html"),
        portfolio: resolve(import.meta.dirname, "portfolio.html"),
        portfolioAntigo: resolve(import.meta.dirname, "portifolio.html"),
        feedback: resolve(import.meta.dirname, "feedback.html"),
        endereco: resolve(import.meta.dirname, "endereco.html"),
        contato: resolve(import.meta.dirname, "contato.html"),
        naoEncontrado: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
