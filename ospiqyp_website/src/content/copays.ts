/**
 * Coseguros (copagos) de OSPIQYP — Bonos On-line.
 * Fuente: sitio oficial, "Actualización de Coseguros" (RESOL-2021-6-APN-CNEPYSMVYM#MT).
 * Vigencia declarada por la obra social. Montos en pesos; "Exento" = sin copago.
 */

export type CopayRow = {
  concept: string;
  amount: string; // monto formateado o "Exento"
  note?: string;
};

export type CopayGroup = {
  id: string;
  title: string;
  rows: CopayRow[];
};

export const COPAYS_EFFECTIVE = "Febrero 2026";

export const COPAYS_INTRO =
  "De acuerdo al compromiso con nuestros afiliados y conscientes de la situación económica que atravesamos, unificamos copagos (RESOL-2021-6-APN-CNEPYSMVYM#MT). Estos son los valores máximos de coseguro.";

export const COPAYS_FOOTNOTE =
  "Los mismos son abonados por los afiliados al momento de su atención y se descuentan de la facturación mensual.";

export const COPAY_GROUPS: CopayGroup[] = [
  {
    id: "consultas",
    title: "Consultas",
    rows: [
      { concept: "Médicos de Familia / Generalistas / Pediatras / Tocoginecólogo", amount: "$8.500" },
      { concept: "Médicos Especialistas", amount: "$13.000" },
      { concept: "Programa HIV", amount: "Exento" },
      { concept: "Oncología", amount: "Exento" },
      { concept: "Discapacidad", amount: "Exento" },
      { concept: "Plan Materno Infantil", amount: "Exento" },
      { concept: "Consulta en guardia", amount: "Exento" },
    ],
  },
  {
    id: "psicologia",
    title: "Psicología",
    rows: [
      { concept: "Sesión incluida", amount: "$10.000" },
      { concept: "Sesión excedente", amount: "$25.000" },
    ],
  },
  {
    id: "laboratorio",
    title: "Prácticas de Laboratorio",
    rows: [
      { concept: "Prácticas básicas (hasta 6 determinaciones básicas)", amount: "$5.000" },
      { concept: "Valor extra por prestación adicional a las 6 definidas", amount: "$2.000" },
    ],
  },
  {
    id: "diagnosticas",
    title: "Prácticas Diagnósticas y Terapéuticas",
    rows: [
      { concept: "Baja complejidad (RX simple y ecografía simple)", amount: "$5.000" },
      { concept: "Mediana complejidad", amount: "$5.000" },
      {
        concept:
          "Alta complejidad (TAC, RMN, RIE, laboratorio biomolecular/genético, Medicina Nuclear, Endoscopía)",
        amount: "$15.000",
      },
    ],
  },
  {
    id: "kinesiologia",
    title: "Prácticas Kinesiología / Fisiatría",
    rows: [
      { concept: "Por sesión", amount: "$3.000" },
      { concept: "Por sesión excedente", amount: "$5.000" },
    ],
  },
  {
    id: "enfermeria",
    title: "Prácticas de Enfermería",
    rows: [{ concept: "Prácticas de enfermería", amount: "Exento" }],
  },
  {
    id: "fonoaudiologia",
    title: "Fonoaudiología y Foniatría",
    rows: [{ concept: "Por sesión", amount: "$3.000" }],
  },
  {
    id: "domiciliaria",
    title: "Atención Domiciliaria",
    rows: [
      { concept: "Diurna (Código Verde)", amount: "$11.000" },
      { concept: "Nocturna (Código Verde)", amount: "$11.000" },
      { concept: "Emergencias (Código Rojo)", amount: "Exento" },
      { concept: "Mayores de 65 años", amount: "$6.500" },
    ],
  },
  {
    id: "odontologia-coseguro",
    title: "Odontología",
    rows: [
      { concept: "Consultas", amount: "$13.000" },
      { concept: "Consultas para menores de 15 y mayores de 65 años", amount: "$13.000" },
      { concept: "Prácticas odontológicas", amount: "$13.000" },
    ],
  },
];
