/**
 * Datos de contacto verificados contra https://www.ospiqyp.org.ar/ (mayo 2026).
 * Todos los tels deben mostrarse grandes, clickeables (tel:) y con aria-label
 * accesible.
 */

export type PhoneLine = {
  label: string;
  number: string;
  tel: string; // formato tel: para link
  email?: string; // mail asociado al área (si existe)
};

export type EmailLine = {
  label: string;
  email: string;
};

export const ADDRESS = {
  street: "México 1474",
  city: "Ciudad Autónoma de Buenos Aires",
  postalCode: "C1097",
  country: "Argentina",
  hours: "Lunes a viernes, 9 a 17 hs",
  // Lo mismo que `hours`, en el formato que leen los datos estructurados de
  // Google (JsonLd). Si cambia el horario, cambian los tres.
  opens: "09:00",
  closes: "17:00",
};

/**
 * Los mails y teléfonos que alguna página usa por su cuenta tienen nombre:
 * ninguna página escribe un mail o un número a mano, y nadie depende de la
 * posición dentro de una lista.
 */
export const GENERAL_EMAIL = "info@ospiqyp.org.ar";
export const AFFILIATIONS_EMAIL = "afiliaciones@ospiqyp.org.ar";
export const AUTHORIZATIONS_EMAIL = "autorizaciones@ospiqyp.org.ar";
export const COMPANY_ENROLLMENT_EMAIL = "liquidaciones.cob@ospiqyp.org.ar";
export const MEDICATION_EMAIL = "medicacionospiqyp@gmail.com";
const DISABILITY_EMAIL = "ospiqyp.discapacidad@gmail.com";
const MEDICAL_AUDIT_EMAIL = "auditoria@ospiqyp.org.ar";

export const MAIN_PHONE: PhoneLine = {
  label: "Línea principal",
  number: "(011) 5275-2200",
  tel: "+541152752200",
};

export const MAIN_PHONES: PhoneLine[] = [
  MAIN_PHONE,
  { label: "Sede Central", number: "(011) 5275-2270", tel: "+541152752270" },
];

export const SPECIALIZED_PHONES: PhoneLine[] = [
  {
    label: "Recepción (solo texto / WhatsApp)",
    number: "+54 9 11 4063-7171",
    tel: "+5491140637171",
  },
  {
    label: "Afiliaciones",
    number: "(011) 5272-5046",
    tel: "+541152725046",
    email: AFFILIATIONS_EMAIL,
  },
  {
    label: "Autorizaciones",
    number: "(011) 5272-5044",
    tel: "+541152725044",
    email: AUTHORIZATIONS_EMAIL,
  },
  {
    label: "Discapacidad",
    number: "(011) 5272-5040",
    tel: "+541152725040",
    email: DISABILITY_EMAIL,
  },
  {
    label: "Medicación",
    number: "(011) 5272-5045",
    tel: "+541152725045",
    email: MEDICATION_EMAIL,
  },
  {
    label: "Auditoría Médica",
    number: "(011) 5272-5049",
    tel: "+541152725049",
    email: MEDICAL_AUDIT_EMAIL,
  },
];

/**
 * Redes y servicios externos contratados (de la cartilla 2026).
 */
export type ServiceContact = {
  label: string;
  name: string;
  phone?: string;
  tel?: string;
  url?: string;
};

export const SERVICE_CONTACTS: ServiceContact[] = [
  {
    label: "Emergencias (ECCO)",
    name: "ECCO Emergencias",
    phone: "0810-888-3226",
    tel: "+5408108883226",
    url: "https://www.ecco.com.ar",
  },
  {
    label: "Red de Odontología",
    name: "CONSULMED",
    phone: "(011) 5217-4400",
    tel: "+541152174400",
    url: "https://www.consulmed.com.ar",
  },
  {
    label: "Ópticas",
    name: "Red Hipervisión",
    url: "https://www.redhipervision.com.ar",
  },
];

export const EMERGENCY_PHONES: PhoneLine[] = [
  {
    label: "Emergencias 24/7",
    number: "0810-888-3226",
    tel: "+5408108883226",
  },
  {
    label: "Emergencias 24/7",
    number: "0800-333-2732",
    tel: "+5408003332732",
  },
];

export const EMAILS: EmailLine[] = [
  { label: "General", email: GENERAL_EMAIL },
  { label: "Afiliaciones", email: AFFILIATIONS_EMAIL },
  { label: "Autorizaciones", email: AUTHORIZATIONS_EMAIL },
  { label: "Liquidaciones", email: COMPANY_ENROLLMENT_EMAIL },
  { label: "Farmacia / Medicación", email: MEDICATION_EMAIL },
  { label: "Discapacidad", email: DISABILITY_EMAIL },
];

/** Los dos que se muestran al pie de todas las páginas. */
export const FOOTER_EMAILS = [GENERAL_EMAIL, AFFILIATIONS_EMAIL];
