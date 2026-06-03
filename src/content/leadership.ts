/**
 * Comisión Directiva de OSPIQYP. Datos verificados contra el sitio actual
 * (mayo 2026). El cliente puede actualizar este archivo cuando cambie la
 * composición de la comisión.
 */

export type LeadershipMember = {
  id: string;
  role: string;
  name: string;
};

export const LEADERSHIP: LeadershipMember[] = [
  { id: "presidente", role: "Presidente", name: "Ricardo David Gallardo" },
  { id: "vicepresidente", role: "Vicepresidente", name: "Ricardo García" },
  { id: "tesorero", role: "Tesorero", name: "Eduardo Aunkudowicz" },
];
