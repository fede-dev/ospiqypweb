import { permanentRedirect } from "next/navigation";

/**
 * La sección PMO se movió a /programa-medico-obligatorio (ruta propia en el
 * menú). Mantenemos esta ruta con un redirect permanente para no romper enlaces
 * existentes.
 */
export default function PmoLegacyRedirect() {
  permanentRedirect("/programa-medico-obligatorio");
}
