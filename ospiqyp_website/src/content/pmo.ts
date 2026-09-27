/**
 * Programa Médico Obligatorio (PMO / PMOE) — contenido de la sección
 * /programa-medico-obligatorio.
 *
 * Fuente: Decreto 2724/2002 (Emergencia Sanitaria Nacional) y su Anexo I
 * (Programa Médico Obligatorio de Emergencia), provistos por OSPIQYP.
 * Se corrigieron los cortes de guión del documento original.
 *
 * - PMO_PRESTACIONES → contenido legible (Anexo I), mostrado en subsecciones.
 * - PMO_NORMATIVA   → texto del decreto (Visto / Considerando / Articulado),
 *                     mostrado en acordeón por ser texto legal extenso.
 *
 * El catálogo de prácticas (Anexo II) vive en `pmo-catalogo.ts`.
 */

export type PmoBlock =
  | { type: "p"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] };

/** Subsección legible del Anexo I (prestaciones). */
export type PmoPrestacion = {
  id: string;
  title: string;
  /** Texto breve de referencia (badge / copete opcional). */
  tag?: string;
  blocks: PmoBlock[];
};

/** Parte del texto normativo (decreto), para el acordeón. */
export type PmoNorma = {
  id: string;
  heading: string;
  paragraphs: string[];
};

export const PMO_INTRO =
  "El Programa Médico Obligatorio (PMO) define el conjunto de prestaciones básicas " +
  "esenciales que OSPIQYP, como Agente del Seguro de Salud, está obligado a garantizar " +
  "a sus afiliados. Está basado en la estrategia de Atención Primaria de la Salud y se " +
  "rige por el Programa Médico Obligatorio de Emergencia (PMOE) y su normativa de referencia.";

/* ------------------------------------------------------------------ */
/*  Anexo I — Prestaciones (contenido legible, en subsecciones)        */
/* ------------------------------------------------------------------ */

export const PMO_PRESTACIONES: PmoPrestacion[] = [
  {
    id: "atencion-primaria",
    title: "Atención Primaria de la Salud",
    tag: "Cobertura · punto 1.1",
    blocks: [
      {
        type: "p",
        text: "Este Programa de Salud se refiere al conjunto de prestaciones esenciales que deben garantizar los Agentes del Seguro a sus beneficiarios. Es de carácter obligatorio para los Agentes del Seguro de Salud, quienes no son meramente financiadores del sistema, sino, y por sobre todo, responsables de la cobertura de salud de la población beneficiaria.",
      },
      {
        type: "p",
        text: "Se reafirma el principio de que este Programa Médico Obligatorio está basado en los principios de la atención primaria de la salud, entendida no sólo como la cobertura para el primer nivel de atención, sino fundamentalmente como una estrategia de organización de los servicios sanitarios. Por tanto se sostienen los principios de privilegiar la preservación de la salud antes que las acciones curativas, reforzando los programas de prevención.",
      },
      {
        type: "p",
        text: "Brindar una cobertura integral, es decir un abordaje biopsicosocial de los problemas de salud. Asegurar un mecanismo integrado de atención en los distintos niveles de prevención primaria, secundaria y terciaria. Proveer de cuidados continuos a los beneficiarios, privilegiando la atención a partir de un médico de familia responsable de los cuidados del beneficiario, quien tiene derecho a conocer el nombre de su médico y de los demás proveedores de servicios.",
      },
      { type: "subheading", text: "Programas de Prevención Primaria y Secundaria" },
      {
        type: "p",
        text: "Se deberán acordar en colaboración con la autoridad jurisdiccional. En todos los casos será obligación de los Agentes del Seguro la entrega del listado de personas bajo programa, que deberá elevarse en forma trimestral a la Superintendencia de Servicios de Salud junto con la información requerida en la Resolución 650/97 ANSSAL y modificatorias.",
      },
      {
        type: "p",
        text: "Para que un programa de prevención sea reconocido como tal, los Agentes del Seguro deberán especificar objetivos, metas, recursos humanos, recursos materiales, guías de atención, mecanismos de evaluación y resultados esperados, y presentarlos en la Superintendencia de Servicios de Salud. Además, deberán adaptar los programas a sus características sociodemográficas particulares.",
      },
    ],
  },
  {
    id: "plan-materno-infantil",
    title: "Plan Materno Infantil y prevención",
    tag: "Cobertura · puntos 1.1.1 a 1.1.4",
    blocks: [
      {
        type: "p",
        text: "Se dará cobertura durante el embarazo y el parto a partir del momento del diagnóstico y hasta el primer mes luego del nacimiento, y atención del recién nacido hasta cumplir un año de edad. Todo con cobertura al 100% tanto en internación como en ambulatorio, y exceptuado del pago de todo tipo de coseguros para las atenciones y medicaciones específicas. Esta cobertura comprende:",
      },
      {
        type: "list",
        items: [
          "Embarazo y parto: consultas, estudios de diagnóstico exclusivamente relacionados con el embarazo, parto y puerperio (otros estudios tendrán la cobertura general del PMO); psicoprofilaxis obstétrica y medicamentos relacionados con el embarazo y el parto, con cobertura al 100%.",
          "Infantil: realización perinatológica obligatoria de los estudios para detección de fenilcetonuria, hipotiroidismo congénito y enfermedad fibroquística en el recién nacido. Consultas de seguimiento y control, inmunizaciones del período y cobertura del 100% de la medicación del primer año de vida que figure en el listado de medicamentos esenciales.",
          "Para estimular la lactancia materna no se cubrirán las leches maternizadas o de otro tipo, salvo expresa indicación médica con evaluación de la auditoría médica.",
        ],
      },
      { type: "subheading", text: "Programas de prevención de cánceres femeninos" },
      {
        type: "p",
        text: "En especial cáncer de mama y de cuello uterino: diagnóstico y tratamiento de todas las afecciones malignas, con cobertura de las medicaciones que figuren en los protocolos del Programa Nacional de Garantía de Calidad de la Atención Médica. Se excluyen los tratamientos y/o protocolos de carácter experimental o en fase de prueba.",
      },
      { type: "subheading", text: "Odontología preventiva" },
      {
        type: "p",
        text: "Campañas de prevención, fluoración y educación para la salud bucal.",
      },
    ],
  },
  {
    id: "atencion-secundaria",
    title: "Atención Secundaria",
    tag: "Cobertura · punto 2",
    blocks: [
      {
        type: "p",
        text: "Los Agentes del Seguro de Salud se encuentran obligados a brindar exclusivamente las especialidades reconocidas por la autoridad sanitaria nacional:",
      },
      {
        type: "list",
        items: [
          "Anatomía Patológica",
          "Anestesiología",
          "Cardiología",
          "Cirugía cardiovascular",
          "Cirugía de cabeza y cuello",
          "Cirugía general",
          "Cirugía infantil",
          "Cirugía plástica reparadora",
          "Cirugía de tórax",
          "Clínica médica",
          "Dermatología",
          "Diagnóstico por imágenes (radiología, tomografía computada, resonancia magnética y ecografía)",
          "Endocrinología",
          "Infectología",
          "Fisiatría (medicina física y rehabilitación)",
          "Gastroenterología",
          "Geriatría",
          "Ginecología",
          "Hematología",
          "Hemoterapia",
          "Medicina familiar y general",
          "Medicina nuclear (diagnóstico y tratamiento)",
          "Nefrología",
          "Neonatología",
          "Neumonología",
          "Neurología",
          "Nutrición",
          "Obstetricia",
          "Oftalmología",
          "Oncología",
          "Ortopedia y traumatología",
          "Otorrinolaringología",
          "Pediatría",
          "Psiquiatría",
          "Reumatología",
          "Terapia intensiva",
          "Urología",
        ],
      },
      { type: "subheading", text: "Prestaciones a brindar" },
      {
        type: "p",
        text: "Se asegura la consulta en consultorio e internación, y la consulta de urgencia y emergencia en domicilio. En mayores de 65 años que no puedan movilizarse, se asegura la consulta programada en domicilio con un coseguro de $10 por cada visita. En todo otro grupo etario donde el paciente esté imposibilitado de desplazarse, la atención programada en domicilio quedará a discreción de la auditoría del Agente del Seguro.",
      },
      { type: "subheading", text: "Prácticas y estudios complementarios ambulatorios" },
      {
        type: "p",
        text: "Todas las prácticas diagnósticas y terapéuticas detalladas en el Anexo II (catálogo de prestaciones), considerando el material descartable y los medios de contraste como parte de la prestación que se realiza.",
      },
    ],
  },
  {
    id: "internacion",
    title: "Internación",
    tag: "Cobertura · punto 3",
    blocks: [
      {
        type: "p",
        text: "Se asegura el 100% de cobertura en la internación en cualquiera de sus modalidades (institucional, hospital de día o domiciliaria). Todas las prestaciones y prácticas detalladas en el Anexo II se encuentran incluidas. La cobertura se extiende sin límite de tiempo, a excepción de lo contemplado en el capítulo de salud mental.",
      },
    ],
  },
  {
    id: "salud-mental",
    title: "Salud Mental",
    tag: "Cobertura · punto 4",
    blocks: [
      {
        type: "p",
        text: "Se incluyen las actividades de fortalecimiento y desarrollo de comportamientos y hábitos de vida saludables como promoción de la salud en general y de la salud mental en particular, así como actividades específicas de prevención de trastornos y malestares psíquicos (depresión, suicidio, adicciones, violencia, violencia familiar, maltrato infantil).",
      },
      { type: "subheading", text: "Prestaciones cubiertas" },
      {
        type: "list",
        items: [
          "Atención ambulatoria: hasta 30 visitas por año calendario, no pudiendo exceder 4 consultas mensuales. Incluye entrevista psiquiátrica, psicológica, psicopedagogía, psicoterapia individual, grupal, de familia y de pareja, y psicodiagnóstico.",
          "Internación: patologías agudas en modalidad institucional u hospital de día, hasta 30 días por año calendario.",
        ],
      },
    ],
  },
  {
    id: "rehabilitacion",
    title: "Rehabilitación",
    tag: "Cobertura · punto 5",
    blocks: [
      {
        type: "p",
        text: "Se incluyen todas las prácticas kinesiológicas y fonoaudiológicas detalladas en el Anexo II. Los Agentes del Seguro darán cobertura ambulatoria para rehabilitación motriz, psicomotriz, readaptación ortopédica y rehabilitación sensorial:",
      },
      {
        type: "list",
        items: [
          "Kinesioterapia: hasta 25 sesiones por beneficiario por año calendario.",
          "Fonoaudiología: hasta 25 sesiones por beneficiario por año calendario.",
          "Estimulación temprana: en los términos definidos en el Anexo II.",
        ],
      },
    ],
  },
  {
    id: "odontologia",
    title: "Odontología",
    tag: "Cobertura · punto 6",
    blocks: [
      {
        type: "p",
        text: "Se asegura la cobertura de las siguientes prácticas odontológicas (entre otras detalladas en la normativa):",
      },
      {
        type: "list",
        items: [
          "Consulta, diagnóstico, fichado y plan de tratamiento; consulta de urgencia.",
          "Obturaciones con amalgama y con resina (auto y fotocurado); reconstrucción de ángulo en dientes anteriores.",
          "Tratamientos endodónticos (uni y multirradiculares), biopulpectomía y necropulpectomía parcial.",
          "Tartrectomía y cepillado mecánico; consultas preventivas con terapias fluoradas y control de placa bacteriana.",
          "Selladores de surcos, fosas y fisuras; aplicación de cariostáticos.",
          "Odontopediatría: consultas de motivación, mantenedores de espacio, coronas provisorias, protección pulpar, reimplante e inmovilización dentaria.",
          "Periodoncia: tratamiento de gingivitis y enfermedad periodontal; desgaste selectivo o armonización oclusal.",
          "Radiografías periapicales, oclusales, seriadas, panorámicas y estudio cefalométrico.",
          "Cirugía: extracciones simples y complejas, germectomía, alveolectomías, frenectomía, drenaje de abscesos, biopsias, entre otras.",
        ],
      },
      { type: "subheading", text: "Coseguros odontológicos" },
      {
        type: "list",
        items: [
          "Hasta $4 para niños de hasta 15 años y para mayores de 65 años.",
          "Hasta $7 para beneficiarios entre 16 y 64 años.",
          "Los coseguros se pagan donde el Agente del Seguro lo determine.",
        ],
      },
    ],
  },
  {
    id: "medicamentos",
    title: "Medicamentos",
    tag: "Cobertura · punto 7",
    blocks: [
      {
        type: "list",
        items: [
          "Medicamentos ambulatorios del Anexo III: cobertura del 40% según el precio de referencia (Anexo IV) y en las formas farmacéuticas indicadas.",
          "Medicamentos en internación: cobertura del 100%.",
          "Cobertura del 100% por parte del Agente del Seguro: eritropoyetina en insuficiencia renal crónica y medicamentos oncológicos según protocolos nacionales aprobados.",
          "Cobertura del 100% con financiamiento del Fondo Solidario de Redistribución: Programas Especiales (APE) y programas de protección de grupos vulnerables. No pueden introducir limitaciones sobre tratamientos en curso.",
          "Diabetes (Res. 301/99): insulina (100%), antidiabéticos orales (70%) y tirillas reactivas (400 anuales; se duplican en pacientes insulinodependientes lábiles en programas de prevención secundaria).",
          "Miastenia Gravis (Res. 791/99): mestinón 60 mg al 100%.",
        ],
      },
      {
        type: "p",
        text: "Todos los prestadores deben recetar por nombre genérico, aplicándose los mecanismos de sustitución y precios de referencia para establecer la cobertura a cargo del Agente del Seguro.",
      },
    ],
  },
  {
    id: "otras-coberturas",
    title: "Otras coberturas",
    tag: "Cobertura · punto 8",
    blocks: [
      {
        type: "list",
        items: [
          "Cuidados paliativos: asistencia activa y total por equipo multidisciplinario cuando la expectativa de vida no supera los 6 meses, con cobertura del 100% de las prestaciones de los Anexos II y III.",
          "Hemodiálisis y diálisis peritoneal continua ambulatoria: cobertura del 100%, con inscripción obligatoria del paciente en el INCUCAI dentro de los primeros 30 días de iniciado el tratamiento.",
          "Otoamplífonos: cobertura del 100% en niños de hasta 15 años.",
          "Anteojos con lentes estándar: cobertura del 100% en niños de hasta 15 años.",
          "Prótesis y órtesis: 100% en prótesis e implantes de colocación interna permanente y 50% en órtesis y prótesis externas (no se reconocen prótesis miogénicas o bioeléctricas). Se proveen prótesis nacionales según indicación; sólo se admiten importadas cuando no exista similar nacional.",
          "Traslados: son parte de la prestación que se realiza; la auditoría médica podrá autorizar otros según necesidad del beneficiario.",
        ],
      },
    ],
  },
  {
    id: "coseguros",
    title: "Coseguros",
    tag: "Cobertura · punto 9",
    blocks: [
      {
        type: "p",
        text: "Las prestaciones cubiertas no abonarán ningún tipo de coseguro fuera de los descriptos en la Resolución.",
      },
      { type: "subheading", text: "Exentos del pago de todo tipo de coseguros" },
      {
        type: "list",
        items: [
          "La mujer embarazada desde el diagnóstico hasta 30 días después del parto, en todas las prestaciones inherentes al embarazo, parto y puerperio (y sus complicaciones, hasta su resolución).",
          "El niño hasta cumplido el año de edad, de acuerdo a normativa.",
          "Los pacientes oncológicos, de acuerdo a normativa.",
          "Los programas preventivos.",
        ],
      },
      {
        type: "p",
        text: "Se establece un monto de hasta $4 en concepto de coseguro para todo tipo de consultas médicas en ambulatorio (es facultad del Agente del Seguro su cobro y modalidad de percepción) y se unifican en un solo valor de hasta $5 los montos para estudios de alta y baja complejidad.",
      },
    ],
  },
  {
    id: "calidad-vigilancia",
    title: "Calidad y Vigilancia de la Salud",
    tag: "Cobertura · puntos 10 y 11",
    blocks: [
      {
        type: "list",
        items: [
          "El PMO debe cumplir con el Programa Nacional de Garantía de Calidad de la Atención Médica.",
          "El PMO debe cumplir con el Programa de Vigilancia de la Salud y Control de Enfermedades (VIGIA) en el ámbito de la Seguridad Social (Decreto 865/2000), a fin de garantizar la salud de la población, en especial en emergencias sociales.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Decreto 2724/2002 — texto normativo (acordeón)                     */
/* ------------------------------------------------------------------ */

export const PMO_NORMATIVA_INTRO =
  "Decreto 2724/2002 — Prorróganse la Emergencia Sanitaria Nacional declarada por el " +
  "Decreto N° 486/2002 hasta el 10 de diciembre de 2003, el Programa Médico Obligatorio " +
  "de Emergencia (PMOE), la obligatoriedad de prescripción y dispensa por nombre genérico " +
  "del medicamento o denominación común internacional y el procedimiento de facturación y " +
  "cobro de prestaciones efectuadas por Hospitales Públicos de Gestión Descentralizada. " +
  "Créanse el Seguro de Salud Materno-Infantil y el Consejo Nacional Consultivo de Salud. " +
  "(Bs. As., 31/12/2002).";

export const PMO_NORMATIVA: PmoNorma[] = [
  {
    id: "visto",
    heading: "Visto",
    paragraphs: [
      "VISTO las Leyes N° 19.032 de creación del INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS y sus modificatorias: N° 23.568, N° 24.901, N° 25.615; la Ley N° 23.660 del Sistema Nacional de Obras Sociales, la N° 23.661 del Sistema Nacional del Seguro de Salud, la N° 25.561 de Emergencia Pública y de Reforma del Régimen Cambiario, la N° 25.563 de Emergencia Crediticia y Productiva y sus modificatorias N° 25.589, N° 25.640 y los Decretos Nros. 9 del 7 de enero de 1993, 576 del 1° de abril de 1993, 436 del 30 de mayo de 2000, 446 del 2 de Junio de 2000, 1.140 del 2 de Diciembre de 2000, 1.305 del 29 de Diciembre de 2000, 1.023 del 13 de agosto de 2001, 50 del 8 de enero de 2002, 486 del 12 de Marzo de 2002, 1.053 del 19 de junio de 2002 y las Resoluciones del MINISTERIO DE SALUD Nros. 939 del 24 de octubre de 2000, 201 del 9 de abril de 2002, 326 del 3 de Junio de 2002 y 798 del 7 de Noviembre de 2002 y",
    ],
  },
  {
    id: "considerando",
    heading: "Considerando",
    paragraphs: [
      "Que la situación económica y financiera de la República Argentina, de altísimo contenido crítico, tornó institucionalmente obligatorio, instrumentar en su oportunidad las herramientas adecuadas y necesarias para enfrentar la difícil situación de excepción.",
      "Que por ello a fines del año 2001, con el objeto de paliar la grave coyuntura, los niveles de pobreza, la parálisis productiva con el consecuente desorden fiscal y su correlato de crisis política, fue necesario declarar con arreglo a la CONSTITUCION NACIONAL y a través de la sanción de la Ley N° 25.561 la emergencia pública en materia social, económica, administrativa, financiera y cambiaria.",
      "Que en dicho contexto, y sin desconocer la responsabilidad primaria que en materia de salud tienen las jurisdicciones locales, fue necesaria la adopción de medidas coyunturales de auxilio de la Nación a las Provincias, en el corto plazo, lo que motivó el dictado del Decreto N° 486 del 12 de marzo de 2002 declarándose la Emergencia Sanitaria Nacional hasta el 31 de diciembre de 2002.",
      "Que dicha declaración tuvo por objeto paliar el impacto inicial de la crisis, garantizando a la población argentina el acceso a los bienes y servicios básicos para la conservación de la salud, restableciendo primordialmente el suministro de medicamentos e insumos críticos en las instituciones públicas con servicio de internación.",
      "Que si bien muchos de los motivos que dieron origen a dicha declaración han sido atenuados, otros aún subsisten y es por ello que se propicia la prórroga de la declaración de emergencia hasta el 10 de diciembre de 2003, en concordancia con la Ley N° 25.563, con el objeto de continuar con las actividades iniciadas, pero orientadas a obtener soluciones más estructurales que permitan superar definitivamente las causas que la originaron.",
      "Que la realidad sanitaria del país impone hoy priorizar la Atención Primaria de la Salud manteniendo el Programa de Medicamentos Ambulatorios destinados a personas en condiciones de alta vulnerabilidad social y a la prevención y el tratamiento de enfermedades infecciosas, así como el acceso a las prestaciones médicas esenciales por parte de los beneficiarios del INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS y de los restantes Agentes del Sistema Nacional del Seguro de Salud regulados por las Leyes N° 23.660 y N° 23.661.",
      "Que fundamentalmente se advierte la necesidad de priorizar las tareas de inmunización de la población, la ejecución de los programas protegidos y del Programa Remediar, el suministro de leche a menores de dos años, así como la difusión e implementación de los mecanismos atinentes a la salud reproductiva.",
      "Que estas medidas tienden en esta etapa a fortalecer las políticas de Atención Primaria y a adoptar medidas de urgente implementación para tutelar la salud de la mujer en edad fértil, la mujer embarazada y los menores de cinco años de edad, a través de la creación de un Seguro Materno Infantil de gradual implementación y de adhesión voluntaria de las Provincias.",
      "Que la adopción de tales medidas constituye un mandato constitucional conforme surge del artículo 23 de dicho cuerpo legal, por el que el Poder Legislativo debe proceder a dictar un régimen de seguridad social especial e integral en protección del niño en situación de desamparo, desde el embarazo hasta la finalización del período de enseñanza elemental, y de la madre durante el embarazo y el tiempo de lactancia.",
      "Que a esos efectos resulta necesario prorrogar la emergencia sanitaria en relación a aquellas declaraciones y medidas que permitan llevar a cabo las acciones descriptas en el párrafo anterior.",
      "Que asimismo, por el Decreto N° 1053 de fecha 19 de junio de 2002 se instruyó al MINISTERIO DE ECONOMIA para que elabore un Programa Mensual de Caja, para el ejercicio presupuestario de ese año, que priorice entre otros gastos los provenientes del Plan Nacional a favor de la Madre y el Niño, como también los de los Programas de Lucha contra el SIDA y ETS, Enfermedades Crónicas y Conductas Adictivas y la Emergencia Sanitaria.",
      "Que en ese mismo orden de ideas, también resulta necesario prorrogar por idéntico plazo que el que corresponda a la emergencia sanitaria, otras normas prescriptivas que coadyuvarán a superarla, y que fueron dictadas durante el año 2002, en tanto no se opongan a la normativa vigente ni a las previsiones del presente.",
      "Que en este sentido, corresponde prorrogar las Resoluciones del Ministerio de Salud N° 201 del 9 de Abril de 2002, por la que se aprobó el PROGRAMA MEDICO OBLIGATORIO DE EMERGENCIA (PMOE) integrado por el conjunto de prestaciones básicas esenciales garantizadas por los Agentes del Seguro de Salud comprendidos en el Artículo 1° de la Ley N° 23.660; la Resolución del MINISTERIO DE SALUD N° 326 del 3 de Junio de 2002, por la que se estableció en forma obligatoria la prescripción y dispensa por nombre genérico del medicamento o denominación común internacional siempre que no sea contraria a los principios previstos en la Ley N° 25.649; y la Resolución N° 798 del 7 de Noviembre de 2002, por la que se suspendió la vigencia de la Resolución N° 488 del 21 de agosto de 2002 con la finalidad de efectuar ajustes y adecuaciones necesarias al procedimiento de facturación y cobro de las prestaciones efectuadas por los Hospitales Públicos de Gestión Descentralizada, así como toda otra prescriptiva reglamentaria o aclaratoria de la normativa que declaró la Emergencia Sanitaria.",
      "Que por otro lado, en el marco de la Mesa de Diálogo Argentino se advirtió la necesidad de buscar mecanismos paliativos y superadores de la emergencia y de crear en el ámbito del MINISTERIO DE SALUD el COMITE NACIONAL DE CRISIS DEL SECTOR SALUD, para la organización y coordinación de la utilización de los recursos disponibles instrumentados a través del Decreto N° 486/02.",
      "Que frente a los logros obtenidos durante el año 2002 y a la persistencia de muchos otros efectos de la crisis, resulta necesario institucionalizar esa mecánica, creando una instancia superadora con mayor presencia institucional y de carácter permanente a través de un Consejo Nacional Consultivo del Sector Salud, en atención a que se estima más efectivo y conveniente que prorrogar el funcionamiento del Comité de Crisis previsto en el Decreto N° 486/02.",
      "Que del análisis de la situación financiera que atraviesa el Sistema de Obras Sociales se desprende que la mayoría de ellas encuentra serias dificultades para cumplir los compromisos asumidos a causa de la acumulación de sus pasivos, producidos en buena medida por la caída de las recaudaciones originadas por una elevada morosidad de los empleadores cuando no por una evasión lisa y llana.",
      "Que el sector prestador privado de la salud atraviesa una profunda crisis producto de los elevados pasivos prestacionales que presentan las Obras Sociales Nacionales y el INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS, que los ha convertido en prefinanciadores del sistema y ha consumido su escaso capital de trabajo.",
      "Que la Ley N° 25.563, que declaró la emergencia productiva y crediticia promulgada el 14 de febrero de 2002, impuso en el artículo 16 la suspensión por el plazo de CIENTO OCHENTA (180) días, a partir de su vigencia, de la totalidad de las ejecuciones judiciales y extrajudiciales y de las medidas cautelares trabadas.",
      "Que la Ley N° 25.589 en su artículo 12 modifica el texto referido en el anterior considerando, fijando el plazo de CIENTO OCHENTA (180) días corridos contados a partir de su vigencia como fecha de inicio de la suspensión de los actos de subasta de inmuebles y de la ejecución de medidas cautelares que importen el desapoderamiento de bienes afectados a la actividad de establecimientos comerciales, fabriles o afines que los necesiten para su funcionamiento.",
      "Que a su vez, el Decreto N° 486/02, en su artículo 24, suspende hasta el 31 de diciembre de 2002 la ejecución de sentencias que condenen al pago de una suma de dinero contra Agentes del Sistema Nacional del Seguro de Salud, incluyendo al INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS.",
      "Que asimismo, la profunda crisis de desfinanciamiento sufrida por los prestadores médico asistenciales en servicio de internación públicos o privados requiere la adopción de otras medidas que les permitan continuar brindando las prestaciones a su cargo, tales como el diferimiento de los pagos correspondientes a las contribuciones previsionales de la Seguridad Social, por lo que se hace necesario autorizar a la ADMINISTRACION FEDERAL DE INGRESOS PUBLICOS (AFIP) a adoptar medidas a ese respecto.",
      "Que a fin de reflejar la correcta implementación del Programa Nacional de Universalización del Acceso a Medicamentos previsto en el Decreto N° 486/02, debe establecerse que el mismo se ha venido desarrollando y continuará su desarrollo a través del Programa Nacional de Atención Primaria de la Salud bajo el nombre “Remediar”.",
      "Que de todo lo expuesto surge que la crítica situación que atraviesa el sector salud configura una circunstancia excepcional que hace imposible seguir los trámites ordinarios previstos por la Constitución Nacional para la sanción de las Leyes, resultando imperioso el dictado de este acto.",
      "Que la DIRECCION GENERAL DE ASUNTOS JURIDICOS del MINISTERIO DE SALUD ha tomado la intervención de su competencia.",
      "Que el presente Decreto se dicta en uso de las atribuciones emergentes del artículo 99, incisos 1 y 3 de la CONSTITUCION NACIONAL.",
    ],
  },
  {
    id: "articulado",
    heading: "El Presidente de la Nación Argentina decreta",
    paragraphs: [
      "Artículo 1° — Prorrógase hasta el 10 de Diciembre de 2003 la Emergencia Sanitaria Nacional declarada por el Decreto 486 del 12 de Marzo de 2002, con excepción de las declaraciones y medidas previstas en los artículos 1° inciso a), 4°, 5°, 6°, 7°, 11, 12, 13, 14, 26, 28, 29, 30, 31 y 32.",
      "Art. 2° — Prorrógase hasta el 10 de Diciembre de 2003 las Resoluciones del MINISTERIO DE SALUD N° 201 del 9 de abril de 2002 (por la que se aprobó el Programa Médico Obligatorio de Emergencia, PMOE), N° 326 del 3 de junio de 2002 (prescripción y dispensa por nombre genérico) y N° 798 del 7 de Noviembre de 2002, así como toda otra norma reglamentaria o aclaratoria del Decreto 486/2002, en todo aquello que no se oponga a la normativa vigente. Las copias autenticadas de las Resoluciones prorrogadas forman parte integrante del presente Decreto como ANEXO I.",
      "Art. 3° — Créase el Seguro de Salud Materno-Infantil para la atención de la cobertura médico-asistencial y de las prestaciones sociales en forma integral y universal, para la mujer embarazada, la mujer en edad fértil y los niños de hasta cinco años de edad, bajo la dependencia del MINISTERIO DE SALUD. Para las mujeres en edad fértil se cubrirán exclusivamente las acciones referidas a la salud sexual y reproductiva. La implementación será gradual, invitándose a las Provincias a adherir.",
      "Art. 4° — El Seguro de Salud Materno-Infantil será financiado con las partidas presupuestarias del ejercicio 2003, los aportes de las Provincias que adhieran, los créditos con financiamiento internacional y las donaciones, contribuciones u otros recursos que se aporten.",
      "Art. 5° — Créase en el ámbito del MINISTERIO DE SALUD el Consejo Nacional Consultivo de Salud, que tendrá como misión proponer alternativas para la identificación, formulación, aplicación y evaluación de las acciones destinadas a paliar las necesidades básicas de la atención a la salud, así como alcanzar los consensos sectoriales necesarios para instrumentar las políticas sanitarias.",
      "Art. 6° — Mantiénese la prioridad prevista para los Programas del MINISTERIO DE SALUD establecida por el Decreto 1053/2002, en las mismas condiciones y alcances, para el ejercicio 2003. Invítase a las Provincias a atender como prioridad la asignación de recursos al Sector Salud.",
      "Art. 7° — Inclúyese dentro de la suspensión prevista en el artículo 24 del Decreto N° 486/02 la traba de las medidas cautelares preventivas y/o ejecutivas dictadas contra los Agentes del Sistema Nacional del Seguro de Salud, incluyendo al INSTITUTO NACIONAL DE SERVICIOS SOCIALES PARA JUBILADOS Y PENSIONADOS.",
      "Art. 8° — Suspéndense por el término de CIENTO OCHENTA (180) días corridos las ejecuciones forzadas de los créditos que el Estado Nacional y los entes allí indicados posean contra los prestadores médico asistenciales en internación, públicos o privados.",
      "Art. 9° — Instrúyese a la ADMINISTRACION FEDERAL DE INGRESOS PUBLICOS a establecer prórrogas y planes especiales de facilidades de pago de los tributos, intereses y multas adeudados por dichos sujetos, teniendo en cuenta la situación de emergencia. Los interesados deberán contar con el certificado de inscripción del Registro Nacional de Prestadores Sanatoriales que emite la SUPERINTENDENCIA DE SERVICIOS DE SALUD.",
      "Art. 10. — Establécese que el MINISTERIO DE SALUD continuará el desarrollo del objetivo de universalizar el acceso de medicamentos genéricos ambulatorios a través del Programa Nacional de Atención Primaria de la Salud bajo el nombre de “Remediar”.",
      "Art. 11. — Dése cuenta al HONORABLE CONGRESO DE LA NACION en cumplimiento del artículo 99, inciso 3 de la CONSTITUCION NACIONAL.",
      "Art. 12. — Comuníquese, publíquese, dése a la Dirección Nacional del Registro Oficial y archívese. — DUHALDE. — Alfredo N. Atanasof. — Ginés M. González García. — Carlos F. Ruckauf. — Jorge R. Matzkin. — Roberto Lavagna. — Graciela Giannettasio. — María N. Doga. — Graciela Camaño. — Aníbal D. Fernández.",
      "NOTA: Se deja constancia de que las Resoluciones del Ministerio de Salud Nros. 201/2002, 326/2002 y 798/2002, que forman parte integrante del presente decreto como Anexo I, fueron respectivamente publicadas en las ediciones del 19-04-2002, 07-06-2002 y 13-11-2002.",
    ],
  },
];
