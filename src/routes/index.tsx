import { createFileRoute, Link } from "@tanstack/react-router";

import cover from "@/assets/angela-brasil-capa.jpg.asset.json";
import portrait from "@/assets/angela-brasil-retrato.jpg.asset.json";
import { Button } from "@/components/ui/button";
import angelaEquipe from "@/assets/angela-equipe.jpg.asset.json";
import angelaNovaFase from "@/assets/angela-nova-fase.jpg.asset.json";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import { categories, products, site, testimonials } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ângela Oliveira — Confeitaria Brasileira | Bolos e doces em São Paulo" },
      {
        name: "description",
        content:
          "Bolos decorados e doces finos artesanais sob encomenda em São Paulo. A antiga Pimenta Rosa Festas agora é Ângela Oliveira — Confeitaria Brasileira. Peça pelo WhatsApp.",
      },
      { property: "og:title", content: "Ângela Oliveira — Confeitaria Brasileira" },
      {
        property: "og:description",
        content:
          "Confeitaria artesanal em São Paulo: bolos decorados e doces finos de festa. Encomendas pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const destaques = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />

      <main>
        <section aria-label="Brasil Afetivo" className="bg-background">
          <img
            src={cover.url}
            alt="Brasil Afetivo — Ângela Oliveira, Confeitaria Brasileira. Sabores que contam histórias."
            width={1055}
            height={388}
            fetchPriority="high"
            className="mx-auto h-auto w-full max-w-[1440px]"
          />
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-5 py-9 md:flex-row md:items-center md:py-10">
            <div>
              <p className="text-xs font-semibold uppercase text-leaf">Confeitaria Brasileira · {site.city}</p>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl">Ângela Oliveira</h1>
              <p className="mt-3 text-sm text-muted-foreground">Bolos decorados e doces artesanais. Sabores que contam histórias.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:max-w-sm md:justify-end">
              <WhatsAppButton />
              <Button asChild variant="outline" className="rounded-full border-primary/40 px-6 py-3 text-primary h-auto">
                <Link to="/catalogo">Ver catálogo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Nova fase / rebranding */}
        <section className="bg-secondary/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={portrait.url}
                alt="Ângela Oliveira, fundadora, com avental rosa em sua cozinha"
                loading="lazy"
                width={769}
                height={793}
                className="col-span-2 w-full rounded-lg object-cover shadow-[var(--shadow-elegant)] sm:col-span-1 sm:aspect-[3/4]"
              />
              <img
                src={angelaEquipe.url}
                alt="Equipe da Ângela Oliveira — Confeitaria Brasileira preparando doces na cozinha"
                loading="lazy"
                width={640}
                height={853}
                className="col-span-2 w-full rounded-lg object-cover shadow-[var(--shadow-elegant)] sm:col-span-1 sm:aspect-[3/4]"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Brasilidade · afeto · memória
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Nossa história também tem sabor.
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Um novo nome, uma nova identidade, mas a mesma paixão, o mesmo carinho e a mesma
                  dedicação em cada criação.
                </p>
                <p>A história continua. E o melhor ainda está por vir!</p>
                <p className="text-xs">{site.formerName}</p>
                <p>
                  Essa foto representa um pouco da minha trajetória e da mulher que está por trás de
                  cada bolo, cada doce e cada sonho realizado.
                </p>
                <p className="font-display text-2xl text-primary">
                  Sejam bem-vindos à minha nova fase!
                </p>
              </div>
              <div className="mt-8">
                <WhatsAppButton />
              </div>
            </div>
          </div>
        </section>

        {/* Categorias */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-4xl">Categorias</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-3">
            {categories.map((c) => (
              <article
                key={c.slug}
                className="group overflow-hidden rounded-lg border border-border/70 bg-card shadow-[var(--shadow-soft)]"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-[3/4] w-full bg-secondary/40 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="font-display text-2xl text-primary">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                  <Link
                    to="/catalogo"
                    className="mt-4 inline-block text-sm text-primary underline underline-offset-4"
                  >
                    Ver no catálogo
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Vitrine */}
        <section className="bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl">Vitrine de encomendas</h2>
              <Link to="/catalogo" className="text-sm text-primary underline underline-offset-4">
                Ver tudo
              </Link>
            </div>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((p) => (
                <article
                  key={p.name}
                  className="overflow-hidden rounded-lg border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="aspect-[3/4] w-full bg-secondary/40 object-cover object-center"
                  />
                  <div className="space-y-3 p-5">
                    <span className="text-[0.65rem] uppercase tracking-[0.24em] text-primary">
                      {p.category}
                    </span>
                    <h3 className="font-display text-2xl">{p.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
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
          </div>
        </section>

        {/* Depoimentos */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-4xl">Depoimentos</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-lg border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-primary">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-6 py-14 text-center">
            <h2 className="font-display text-4xl">Pronta para adoçar a sua data?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
              Conte a data, o número de convidados e o estilo da festa. O orçamento sai na conversa,
              sem carrinho e sem burocracia.
            </p>
            <div className="mt-7 flex justify-center">
              <WhatsAppButton />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <WhatsAppFloating />
    </div>
  );
}
