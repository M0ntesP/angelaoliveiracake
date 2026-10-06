import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato e entrega em São Paulo | Ângela Oliveira — Confeitaria Brasileira" },
      {
        name: "description",
        content:
          "Fale com a Ângela Oliveira — Confeitaria Brasileira pelo WhatsApp: encomendas, prazos e entrega de bolos e doces em São Paulo.",
      },
      { property: "og:title", content: "Contato | Ângela Oliveira — Confeitaria Brasileira" },
      {
        property: "og:description",
        content: "Encomendas pelo WhatsApp, com entrega combinada em São Paulo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContatoPage,
});

const infos = [
  {
    title: "Como encomendar",
    text: "Todo o pedido é feito pelo WhatsApp: você conta a data, o número de convidados e o estilo da festa, e enviamos o orçamento.",
  },
  {
    title: "Prazos",
    text: "Bolos decorados: reserva ideal com 7 dias de antecedência. Doces: 3 a 5 dias. Datas comemorativas fecham antes.",
  },
  {
    title: "Entrega",
    text: `Retirada combinada ou entrega em ${site.city} e região, com taxa calculada por bairro no momento do orçamento.`,
  },
  {
    title: "Pagamento",
    text: "Sem carrinho e sem pagamento pelo site. Formas de pagamento e sinal são combinados direto na conversa.",
  },
];

function ContatoPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Contato</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Vamos combinar a sua festa</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Atendimento por WhatsApp de segunda a sábado. Responder rápido é parte do carinho.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppButton />
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-primary/40 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary/10"
          >
            Instagram
          </a>
          <a
            href={site.links}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary"
          >
            Todos os links
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {infos.map((i) => (
            <section
              key={i.title}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <h2 className="font-display text-2xl text-primary">{i.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          {site.name} — {site.formerName} · {site.city}
        </p>
      </main>
      <SiteFooter />
      <WhatsAppFloating />
    </div>
  );
}
