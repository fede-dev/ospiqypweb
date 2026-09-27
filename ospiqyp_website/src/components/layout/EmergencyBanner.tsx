import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { EMERGENCY_PHONES } from "@/content/contact";

/**
 * Banner top con teléfono de emergencias 24/7.
 * Siempre visible, color rojo, contraste AAA para usuarios mayores.
 */
export function EmergencyBanner() {
  const [primary, secondary] = EMERGENCY_PHONES;

  return (
    <div className="bg-alert-600 text-white" role="alert" aria-label="Emergencias 24/7">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm md:text-base flex-wrap">
        <ExclamationTriangleIcon className="size-5 flex-shrink-0" aria-hidden="true" />
        <span className="font-medium">Emergencias 24/7:</span>
        <a
          href={`tel:${primary.tel}`}
          className="font-bold underline underline-offset-2 hover:no-underline"
          aria-label={`Llamar a emergencias 24/7 al ${primary.number}`}
        >
          {primary.number}
        </a>
        <span className="hidden sm:inline opacity-80">/</span>
        <a
          href={`tel:${secondary.tel}`}
          className="font-bold underline underline-offset-2 hover:no-underline hidden sm:inline"
          aria-label={`Llamar a emergencias 24/7 al ${secondary.number}`}
        >
          {secondary.number}
        </a>
      </div>
    </div>
  );
}
