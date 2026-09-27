/**
 * Arma el `href` de un link para llamar a partir de un teléfono tal como está
 * cargado en el contenido: "(011) 4961-4917 / 4962-5949", "02226-15-471010".
 *
 * Marca el PRIMER número. La barra separa alternativas, así que hay que cortar
 * ANTES de limpiar: si se limpia primero, la barra desaparece y los dos números
 * quedan pegados en uno que no existe (pasó con 115 prestadores).
 */
export function telHref(phone: string): string {
  const primerNumero = phone.split("/")[0];
  return `tel:${primerNumero.replace(/[^\d+]/g, "")}`;
}
