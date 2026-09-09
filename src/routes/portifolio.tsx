import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import pascoa1 from "@/assets/pascoa-1.jpg.asset.json";
import pascoa10 from "@/assets/pascoa-10.jpg.asset.json";
import pascoa2 from "@/assets/pascoa-2.jpg.asset.json";
import pascoa3 from "@/assets/pascoa-3.jpg.asset.json";
import pascoa4 from "@/assets/pascoa-4.jpg.asset.json";
import pascoa5 from "@/assets/pascoa-5.jpg.asset.json";
import pascoa6 from "@/assets/pascoa-6.jpg.asset.json";
import pascoa7 from "@/assets/pascoa-7.jpg.asset.json";
import pascoa8 from "@/assets/pascoa-8.jpg.asset.json";
import pascoa9 from "@/assets/pascoa-9.jpg.asset.json";
import novaFase from "@/assets/nova-fase.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton, WhatsAppFloating } from "@/components/WhatsAppButton";
import { site, testimonials } from "@/lib/site";

export const Route = createFileRoute("/portifolio")({
  head: () => ({
    meta: [
      { title: "Portfólio | Ângela Oliveira Cake Design" },
      {
        name: "description",
        content:
          "Portfólio da Ângela Oliveira Cake Design: bolos decorados, ovos de Páscoa artesanais e doces feitos à mão em São Paulo. A antiga Pimenta Rosa Festas.",
      },
      { property: "og:title", content: "Portfólio | Ângela Oliveira Cake Design" },
      {
        property: "og:description",
        content: "Criações artesanais: bolos, ovos de Páscoa e doces feitos à mão em São Paulo.",
      },
    ],
  }),
  component: PortifolioPage,
});

const gallery: { src: string; alt: string }[] = [
  { src: pascoa1.url, alt: "Bolo de cenoura com casca de chocolate, raspas e farofa crocante" },
  { src: pascoa2.url, alt: "Bolo vulcão de Páscoa com coelhinho de chocolate e confeitos coloridos" },
  { src: pascoa3.url, alt: "Ovo de Páscoa de chocolate branco embalado com laço dourado" },
  { src: pascoa4.url, alt: "Ovo de Páscoa ao leite com relevo de corações e laço rosa" },
  { src: pascoa5.url, alt: "Ovo de colher com chocolate ao leite e crocantes cobertos de chocolate branco" },
  { src: pascoa6.url, alt: "Cascas de ovo de Páscoa de chocolate branco com corações em relevo" },
  { src: pascoa7.url, alt: "Ovo de Páscoa de chocolate branco embalado com laços rosa e dourado" },
  { src: pascoa8.url, alt: "Ovos de Páscoa artesanais de chocolate branco com relevo de corações" },
  { src: pascoa9.url, alt: "Casca de ovo de Páscoa de chocolate branco com pedaços crocantes" },
  { src: pascoa10.url, alt: "Ovo de colher com brigadeiro e massa amanteigada" },
];

function PortifolioPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Portfólio</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Criações que adoçam momentos</h1>

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
          <h2 className="font-display text-3xl">Galeria de criações</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Um pouco do que sai da cozinha: ovos de Páscoa artesanais, bolos vulcão e doces feitos
            à mão para cada temporada.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <figure
                key={g.src}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-soft)]"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full bg-secondary/40 object-cover object-center"
                />
              </figure>
            ))}
          </div>
        </section>

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
