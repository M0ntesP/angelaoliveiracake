import brandLogo from "@/assets/angela-logo-oficial-completa.png.asset.json";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <img
      src={brandLogo.url}
      alt="Ângela Oliveira — Confeitaria Brasileira"
      width={271}
      height={220}
      className={cn(
        "object-contain",
        compact ? "h-auto w-28 sm:w-32" : "h-auto w-56",
        className,
      )}
    />
  );
}
