import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import { categories, products, type Category } from "@/lib/site";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de bolos, doces e salgados | Ângela Oliveira" },
      {
        name: "description",
        content:
          "Vitrine de bolos decorados, doces finos e salgados de festa da Ângela Oliveira Cake Design em São Paulo. Encomendas pelo WhatsApp.",
      },
      { property: "og:title", content: "Catálogo | Ângela Oliveira Cake Design" },
      {
        property: "og:description",
        content: "Bolos decorados, doces finos e salgados artesanais para festas em São Paulo.",
      },
    ],
  }),
  component: CatalogoPage,
});

const filters: ("Todos" | Category)[] = ["Todos", "Bolos", "Doces", "Salgados"];

function CatalogoPage() {
  const [active, setActive] = useState<"Todos" | Category>("Todos");
  const list = active === "Todos" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Vitrine</p>
        <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
          Nosso catálogo artesanal
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tudo é feito sob encomenda, com sabores e cores escolhidos junto com você. Escolha o que
          combina com a sua festa e chame no WhatsApp para o orçamento.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={
                "rounded-full border px-5 py-2 text-sm transition-colors " +
                (active === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/75 hover:border-primary/50 hover:text-primary")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                width={1200}
                height={1200}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="space-y-3 p-5">
                <span className="text-[0.65rem] uppercase tracking-[0.24em] text-primary">
                  {p.category}
                </span>
                <h2 className="font-display text-2xl">{p.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                <p className="text-xs text-foreground/60">{p.detail}</p>
                <WhatsAppButton
                  variant="outline"
                  className="w-full px-4 py-2 text-xs"
                  message={`Olá! Gostaria de um orçamento para: ${p.name}.`}
                >
                  Encomendar no WhatsApp
                </WhatsAppButton>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 grid gap-6 sm:grid-cols-3">
          {categories.map((c) => (
            <div key={c.slug} className="rounded-2xl bg-secondary/60 p-6">
              <h3 className="font-display text-2xl text-primary">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloating />
    </div>
  );
}
