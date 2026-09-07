import brandLogo from "@/assets/angela-oliveira-logo.png.asset.json";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <img
      src={brandLogo.url}
      alt="Ângela Oliveira Cake Design"
      width={690}
      height={355}
      className={cn(
        "mix-blend-multiply object-contain",
        compact ? "h-14 w-auto sm:h-16" : "h-auto w-full",
        className,
      )}
    />
  );
}