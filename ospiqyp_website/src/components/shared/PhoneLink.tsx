import { PhoneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/cn";

interface PhoneLinkProps {
  number: string;
  tel: string;
  label?: string;
  highlight?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Link telefónico clickeable, grande y accesible.
 * - Tamaño ≥24px en versión lg (target accesibilidad para mayores).
 * - aria-label expone número completo legible por screen readers.
 * - highlight=true → estilo rojo (emergencias).
 */
export function PhoneLink({
  number,
  tel,
  label,
  highlight = false,
  size = "md",
  className,
}: PhoneLinkProps) {
  const sizeClasses = {
    sm: "text-base gap-2",
    md: "text-lg gap-2.5",
    lg: "text-2xl md:text-3xl gap-3 font-semibold",
  };

  const colorClasses = highlight
    ? "text-alert-600 hover:text-alert-700"
    : "text-brand-700 hover:text-brand-800";

  return (
    <a
      href={`tel:${tel}`}
      aria-label={label ? `${label}: ${number}` : `Llamar al ${number}`}
      className={cn(
        "inline-flex items-center transition-colors no-underline",
        sizeClasses[size],
        colorClasses,
        className,
      )}
    >
      <PhoneIcon className={cn(size === "lg" ? "size-6" : "size-5")} aria-hidden="true" />
      <span>{number}</span>
    </a>
  );
}
