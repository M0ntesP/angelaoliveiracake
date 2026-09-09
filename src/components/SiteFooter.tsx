import { Link } from "@tanstack/react-router";

import footerLogo from "@/assets/logo-rodape.png.asset.json";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-gold/30 bg-secondary/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <img
            src={footerLogo.url}
            alt="Ângela Oliveira Cake Design"
            width={500}
            height={500}
            loading="lazy"
            className="h-auto w-40 max-w-full object-contain sm:w-48"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Encomendas sob medida para aniversários, casamentos e eventos em{" "}
            {site.city}.
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Navegar</p>
          <ul className="space-y-2">
            <li>
              <Link to="/catalogo" className="text-foreground/80 hover:text-primary">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/portifolio" className="text-foreground/80 hover:text-primary">
                Portfólio
              </Link>
            </li>
            <li>
              <Link to="/contato" className="text-foreground/80 hover:text-primary">
                Contato e entrega
              </Link>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.links}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
              >
                Todos os links
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Pedidos apenas por WhatsApp
          </p>
          <WhatsAppButton />
          <p className="mt-4 text-xs text-muted-foreground">
            Sem carrinho e sem pagamento online: combinamos tudo na conversa.
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name} · {site.city}
      </div>
    </footer>
  );
}
