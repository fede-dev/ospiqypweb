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
  highlight?: boolean; // emergencia 24/7
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
};

export const MAIN_PHONES: PhoneLine[] = [
  { label: "Línea principal", number: "(011) 5275-2200", tel: "+541152752200" },
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
    email: "afiliaciones@ospiqyp.org.ar",
  },
  {
    label: "Autorizaciones",
    number: "(011) 5272-5044",
    tel: "+541152725044",
    email: "autorizaciones@ospiqyp.org.ar",
  },
  {
    label: "Discapacidad",
    number: "(011) 5272-5040",
    tel: "+541152725040",
    email: "ospiqyp.discapacidad@gmail.com",
  },
  {
    label: "Medicación",
    number: "(011) 5272-5045",
    tel: "+541152725045",
    email: "medicacionospiqyp@gmail.com",
  },
  {
    label: "Auditoría Médica",
    number: "(011) 5272-5049",
    tel: "+541152725049",
    email: "auditoria@ospiqyp.org.ar",
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
    highlight: true,
  },
  {
    label: "Emergencias 24/7",
    number: "0800-333-2732",
    tel: "+5408003332732",
    highlight: true,
  },
];

export const EMAILS: EmailLine[] = [
  { label: "General", email: "info@ospiqyp.org.ar" },
  { label: "Afiliaciones", email: "afiliaciones@ospiqyp.org.ar" },
  { label: "Autorizaciones", email: "autorizaciones@ospiqyp.org.ar" },
  { label: "Liquidaciones", email: "liquidaciones.cob@ospiqyp.org.ar" },
  { label: "Farmacia / Medicación", email: "medicacionospiqyp@gmail.com" },
  { label: "Discapacidad", email: "ospiqyp.discapacidad@gmail.com" },
];
