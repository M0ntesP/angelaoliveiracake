import brandLogo from "@/assets/angela-brasil-logo.png.asset.json";
import brandSignature from "@/assets/angela-brasil-assinatura-final.png.asset.json";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <img
      src={compact ? brandSignature.url : brandLogo.url}
      alt="Ângela Oliveira — Confeitaria Brasileira"
      width={compact ? 425 : 268}
      height={compact ? 80 : 204}
      className={cn(
        "object-contain",
        compact ? "h-auto w-[180px]" : "h-auto w-56",
        className,
      )}
    />
  );
}
