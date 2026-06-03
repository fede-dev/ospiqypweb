export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
};

export const NEWS: NewsItem[] = [
  {
    slug: "alerta-fraude-telefonico",
    title: "Alerta de fraudes telefónicos solicitando datos personales",
    date: "2026",
    summary:
      "ARCA alerta sobre un fraude telefónico que solicita la clave fiscal para 'actualizar datos de la obra social'. No la compartas con terceros.",
    body: [
      "ARCA alerta que desconocidos montaron un fraude telefónico: llaman o envían mensajes para \"actualizar datos de la obra social\", \"consultar sobre la cobertura\" u \"ofrecer un cambio a prepagas\" y solicitan la clave fiscal para hacerlo. Esta contraseña no debe ser brindada a terceros.",
      "Si se recibe este tipo de llamados telefónicos, se recomienda cortar la comunicación automáticamente. Por seguridad, ARCA blanqueó esas claves para que puedan ser recuperadas por un canal seguro. Es posible hacerlo a través de: la app ARCA móvil, un cajero automático u homebanking.",
      "Para verificar si te cambiaron de obra social sin permiso, podés consultarnos a afiliaciones@ospiqyp.org.ar. En caso de haber caído en este tipo de fraude, debés denunciarlo en la Superintendencia de Servicios de Salud a través de TAD (Trámites a Distancia) para solucionarlo y evitar también que siga sucediendo con otros beneficiarios.",
    ],
  },
  {
    slug: "concurso-preventivo",
    title: "Apertura de concurso preventivo",
    date: "2026",
    summary:
      "La Obra Social ha solicitado la apertura de un concurso preventivo.",
    body: [
      "La Obra Social ha solicitado la apertura de un concurso preventivo en el marco de la normativa vigente.",
      "Las prestaciones a los afiliados continúan con normalidad. Ante cualquier consulta, comunicate con las líneas de atención habituales.",
    ],
  },
];
