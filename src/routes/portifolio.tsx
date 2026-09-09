import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import novaFase from "@/assets/nova-fase.jpg";
import { site, testimonials } from "@/lib/site";

export const Route = createFileRoute("/portifolio")({
  head: () => ({
    meta: [
      { title: "Sobre a Ângela Oliveira Cake Design | Nova fase" },
      {
        name: "description",
        content:
          "A antiga Pimenta Rosa Festas agora é Ângela Oliveira Cake Design: mesma paixão artesanal em bolos, doces e salgados feitos em São Paulo.",
      },
      { property: "og:title", content: "Sobre | Ângela Oliveira Cake Design" },
      {
        property: "og:description",
        content: "Uma nova fase começa: novo nome, mesma dedicação em cada criação.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Sobre</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">A mulher por trás de cada bolo</h1>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <img
            src={novaFase}
            alt="Ângela Oliveira decorando um bolo com buttercream rosa"
            loading="lazy"
            width={1200}
            height={1408}
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-elegant)]"
          />
          <div className="space-y-5 text-muted-foreground">
            <p className="text-base leading-relaxed">
              Cada encomenda começa com uma conversa. Entender a festa, as cores, o sabor preferido
              e o que a data significa é o que transforma um bolo em lembrança.
            </p>
            <p className="text-base leading-relaxed">
              A confeitaria é 100% artesanal: massas feitas na hora, recheios equilibrados e
              decoração modelada à mão, sem atalhos industriais.
            </p>
            <p className="text-base leading-relaxed">
              Atendemos aniversários, casamentos, chás e eventos corporativos em {site.city} e
              região, com entrega combinada.
            </p>
            <p className="text-sm italic text-foreground/70">{site.formerName}.</p>
            <WhatsAppButton />
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-3xl">Quem já provou</h2>
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
      </main>
      <SiteFooter />
      <WhatsAppFloating />
    </div>
  );
}
