import { createFileRoute, Link } from "@tanstack/react-router";

import angelaEquipe from "@/assets/angela-equipe.jpg.asset.json";
import angelaNovaFase from "@/assets/angela-nova-fase.jpg.asset.json";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import { categories, heroImage, products, site, testimonials } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ângela Oliveira Cake Design | Bolos e doces em São Paulo" },
      {
        name: "description",
        content:
          "Bolos decorados e doces finos artesanais sob encomenda em São Paulo. A antiga Pimenta Rosa Festas agora é Ângela Oliveira Cake Design. Peça pelo WhatsApp.",
      },
      { property: "og:title", content: "Ângela Oliveira Cake Design" },
      {
        property: "og:description",
        content:
          "Confeitaria artesanal em São Paulo: bolos decorados e doces finos de festa. Encomendas pelo WhatsApp.",
      },
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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:py-20">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Confeitaria artesanal · {site.city}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl">
                Bolos decorados e doces feitos à mão
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                Cada criação nasce de uma conversa e termina em festa. Encomendas sob medida, com
                sabor de casa e acabamento delicado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton />
                <Link
                  to="/catalogo"
                  className="inline-flex items-center rounded-full border border-primary/40 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary/10"
                >
                  Ver catálogo
                </Link>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {site.formerName}
              </p>
            </div>

            <img
              src={heroImage}
              alt="Bolo pink de 15 anos com rosas e nome personalizado em dourado"
              width={1200}
              height={1600}
              className="aspect-[4/5] w-full rounded-[2rem] object-cover object-center shadow-[var(--shadow-elegant)]"
            />
          </div>
        </section>

        {/* Nova fase / rebranding */}
        <section className="bg-secondary/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={angelaNovaFase.url}
                alt="Ângela Oliveira em sua cozinha, de touca e avental, conferindo encomendas no celular"
                loading="lazy"
                width={640}
                height={960}
                className="col-span-2 w-full rounded-[2rem] object-cover shadow-[var(--shadow-elegant)] sm:col-span-1 sm:aspect-[3/4]"
              />
              <img
                src={angelaEquipe.url}
                alt="Equipe da Ângela Oliveira Cake Design preparando doces na cozinha"
                loading="lazy"
                width={640}
                height={853}
                className="col-span-2 w-full rounded-[2rem] object-cover shadow-[var(--shadow-elegant)] sm:col-span-1 sm:aspect-[3/4]"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">
                Uma nova fase começa
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                A Pimenta Rosa Festas agora é Ângela Oliveira Cake Design
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Um novo nome, uma nova identidade, mas a mesma paixão, o mesmo carinho e a mesma
                  dedicação em cada criação.
                </p>
                <p>A história continua. E o melhor ainda está por vir!</p>
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
                className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)]"
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
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
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
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]"
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
        <section className="mx-auto max-w-6xl px-5">
          <div className="rounded-[2rem] bg-primary/10 px-6 py-14 text-center">
            <h2 className="font-display text-4xl">Pronta para adoçar a sua data?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
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
