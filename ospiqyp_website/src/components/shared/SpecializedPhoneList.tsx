import { SPECIALIZED_PHONES } from "@/content/contact";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { EmailLink } from "@/components/shared/EmailLink";

/**
 * Líneas de atención por área, con el mail del área debajo del teléfono.
 * La usan la home y Contacto: era la misma lista copiada en las dos y ya
 * habían empezado a diferir en los márgenes.
 */
export function SpecializedPhoneList() {
  return (
    <ul className="space-y-5">
      {SPECIALIZED_PHONES.map((p) => (
        <li
          key={p.tel}
          className="pb-4 border-b border-[color:var(--color-border)] last:border-b-0 last:pb-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="font-medium">{p.label}</span>
            <PhoneLink number={p.number} tel={p.tel} label={p.label} />
          </div>
          {p.email && (
            <div className="mt-1.5">
              <EmailLink email={p.email} label={p.label} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
