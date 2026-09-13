import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";

import cardapio from "@/assets/cardapio-angela-oliveira.pdf.asset.json";
import pagina1 from "@/assets/cardapio-pagina-1.jpg.asset.json";
import pagina2 from "@/assets/cardapio-pagina-2.jpg.asset.json";
import pagina3 from "@/assets/cardapio-pagina-3.jpg.asset.json";
import pagina4 from "@/assets/cardapio-pagina-4.jpg.asset.json";
import pagina5 from "@/assets/cardapio-pagina-5.jpg.asset.json";
import pagina6 from "@/assets/cardapio-pagina-6.jpg.asset.json";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio de bolos | Ângela Oliveira Cake Design" },
      {
        name: "description",
        content:
          "Conheça os sabores, recheios e valores dos bolos artesanais da Ângela Oliveira Cake Design em São Paulo.",
      },
      { property: "og:title", content: "Cardápio de bolos | Ângela Oliveira Cake Design" },
      {
        property: "og:description",
        content: "Sabores que contam histórias. Consulte o cardápio e faça sua encomenda pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CardapioPage,
});

const paginas = [pagina1, pagina2, pagina3, pagina4, pagina5, pagina6];

function CardapioPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Sabores que contam histórias</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Cardápio de bolos</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Conheça nossos sabores artesanais, recheios e opções para cada momento especial.
            Confirme valores e disponibilidade ao fazer seu pedido.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={cardapio.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Abrir cardápio
            </a>
            <a
              href={cardapio.url}
              download="Cardapio-Angela-Oliveira-Cake-Design.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Baixar PDF
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5">
          <div className="space-y-6" aria-label="Páginas do cardápio">
            {paginas.map((pagina, index) => (
              <img
                key={pagina.url}
                src={pagina.url}
                alt={`Cardápio da Ângela Oliveira Cake Design — página ${index + 1} de ${paginas.length}`}
                width={992}
                height={1403}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-auto w-full rounded-lg border border-border/70 shadow-[var(--shadow-soft)]"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <WhatsAppButton>Fazer encomenda no WhatsApp</WhatsAppButton>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloating />
    </div>
  );
}