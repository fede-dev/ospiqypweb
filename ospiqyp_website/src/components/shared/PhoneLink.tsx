import { PhoneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

interface PhoneLinkProps {
  number: string;
  tel: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Link telefónico clickeable, grande y accesible.
 * - Tamaño ≥24px en versión lg (target accesibilidad para mayores).
 * - aria-label expone número completo legible por screen readers.
 */
export function PhoneLink({ number, tel, label, size = "md", className }: PhoneLinkProps) {
  const sizeClasses = {
    md: "text-lg gap-2.5",
    lg: "text-2xl md:text-3xl gap-3 font-semibold",
  };

  return (
    <a
      href={`tel:${tel}`}
      aria-label={label ? `${label}: ${number}` : `Llamar al ${number}`}
      className={cn(
        "inline-flex items-center transition-colors no-underline",
        sizeClasses[size],
        "text-brand-700 hover:text-brand-800",
        className,
      )}
    >
      <PhoneIcon className={cn(size === "lg" ? "size-6" : "size-5")} aria-hidden="true" />
      <span>{number}</span>
    </a>
  );
}
