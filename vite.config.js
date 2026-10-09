import { defineConfig } from "vite";
import { resolve } from "node:path";

// Cada arquivo HTML é uma página independente do site.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        inicio: resolve(import.meta.dirname, "index.html"),
        catalogo: resolve(import.meta.dirname, "catalogo.html"),
        cardapio: resolve(import.meta.dirname, "cardapio.html"),
        portifolio: resolve(import.meta.dirname, "portifolio.html"),
        feedback: resolve(import.meta.dirname, "feedback.html"),
        endereco: resolve(import.meta.dirname, "endereco.html"),
        contato: resolve(import.meta.dirname, "contato.html"),
        naoEncontrado: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
