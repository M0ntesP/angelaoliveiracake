import brandLogo from "@/assets/logo-circular.png.asset.json";
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
      width={500}
      height={500}
      className={cn(
        "rounded-full bg-background object-contain",
        compact ? "h-14 w-14 sm:h-16 sm:w-16" : "h-32 w-32",
        className,
      )}
    />
  );
}
