import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight text-primary sm:text-2xl">
            {site.name}
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
            Confeitaria artesanal
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton className="px-5 py-2 text-xs">Encomendar</WhatsAppButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
          className="rounded-full border border-border p-2 text-foreground md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.6">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-lg px-2 py-2.5 text-sm text-foreground/80"
              >
                {item.label}
              </Link>
            ))}
            <WhatsAppButton className="mt-2 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
