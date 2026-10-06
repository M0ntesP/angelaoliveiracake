import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = {
  message?: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.22-8.23 8.22z" />
    </svg>
  );
}

export function WhatsAppButton({
  message = "Olá! Vim pelo site da Ângela Oliveira e gostaria de fazer uma encomenda.",
  children = "Fazer encomenda no WhatsApp",
  variant = "solid",
  className,
}: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variant === "solid"
          ? "bg-leaf text-leaf-foreground shadow-[var(--shadow-soft)] hover:bg-foreground hover:text-background hover:-translate-y-0.5"
          : "border border-gold/70 text-foreground hover:bg-gold hover:text-accent-foreground",
        className,
      )}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export function WhatsAppFloating() {
  return (
    <a
      href={whatsappLink(
        "Olá! Vim pelo site da Ângela Oliveira e gostaria de fazer uma encomenda.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer encomenda no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-leaf-foreground shadow-[var(--shadow-elegant)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <WhatsAppIcon />
      <span className="hidden sm:inline">Encomendar</span>
    </a>
  );
}
