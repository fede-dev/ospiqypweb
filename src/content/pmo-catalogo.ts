/**
 * Anexo II del PMOE — Catálogo de Prestaciones (prácticas y procedimientos).
 *
 * El texto oficial se almacena crudo en CATALOGO_RAW (una línea por código,
 * con encabezados de categoría) y se parsea a filas tipadas en build/runtime.
 * Esto permite ir pegando los sucesivos tramos del anexo sin reformatear cada
 * código a mano.
 *
 * Formato esperado por línea:
 *   - "010101 descripción de la práctica"     → fila de práctica
 *   - "Operaciones en el sistema nervioso"     → encabezado de categoría
 *   - cualquier otra línea                      → nota de la práctica anterior
 *     (p. ej. "Obligación de cobertura en los siguientes casos:")
 */

export type CatalogoItem = {
  code: string;
  description: string;
  category: string;
  /** Texto adicional (obligación/condiciones de cobertura), si existe. */
  note?: string;
};

const CATALOGO_INTRO_PARRAFOS = [
  "Los Agentes del Seguro de Salud garantizarán a través de sus prestadores propios o contratados la cobertura y el acceso a todas las prestaciones incluidas en este catálogo. Las prácticas de alto costo, necesarias para el diagnóstico y tratamiento de patologías de baja incidencia y alto impacto económico y social, han sido normatizadas para asegurar el correcto uso de la tecnología y establecer los alcances de su cobertura. El Agente del Seguro podrá ampliar los límites de cobertura de acuerdo a necesidades individuales de sus beneficiarios.",
  "Este catálogo asegura la cobertura a los beneficiarios; no es un listado indicativo de facturación prestacional. Las prácticas podrán ser realizadas por la especialidad correspondiente, sin afectar la libertad de contratación ni los acuerdos de aranceles entre los Agentes del Seguro y los prestadores. Dado el carácter dinámico de la ciencia médica, la Superintendencia de Servicios de Salud establece mecanismos de adecuación permanente para su actualización.",
];

export const CATALOGO_INTRO = CATALOGO_INTRO_PARRAFOS;

/**
 * Texto crudo del Anexo II. Pegá aquí los sucesivos tramos del catálogo
 * (Anexo II), respetando los encabezados de categoría ("Operaciones en…").
 */
const CATALOGO_RAW = String.raw`
Operaciones en el sistema nervioso
010101 tratamiento quirúrgico del encefalomeningocele
010102 tratamiento quirúrgico craneostenosis
010103 craneoplastias con injerto óseo o protésico
010104 reducción abierta de fractura de cráneo
010105 escisión de lesión tumoral infecciosa
010106 descompresión orbitaria unilateral
010201 ventriculocisternostomias
010202 derivación ventriculoauricula derecha
010203 revisión de válvulas derivativas o restitución parcial o total
010204 lobectomia parcial o total por traumatismo o epilepsia
010205 tractotomia espinotalamica trigeminal o mesencefalica
010206 tratamiento quirúrgico de los aneurismas y malformaciones
010207 evacuación por punción de colección intercerebral, epidural, subdural y/o subaracnoidea
010208 craneotomia exploradora
010209 reparación plástica de senos craneales
010210 escisión de lesión tumoral intracraneana
010211 drenaje ventricular continuo
010212 extracción de tubos en operaciones derivativas craneanas
010213 cirugía estereotaxica por diversos métodos incluso radiocirugía
010214 punción diagnostica o terapéutica de ventriculo por trepanacion
010215 punción transfontanelar de ventriculos o subdural
010216 colocación de set para monitoreo de presion intracraneana
010217 cirugía de la hipertension congenita endocraneana por fibra optica
010301 reparación de defectos congenitos del complejo vertebromeningeomedular
010302 tratamiento quirúrgico lesiones adquiridas del complejo vertebromeningeomedular
010303 extirpacion o ligadura de aneurismas o malformaciones arteriovenosas medulares
010304 cordotomia espinotalamica, anterior, posterior, mielotomia comisural
010305 rizotomia radicotomia posterior
010306 seccion de ligamentos dentados
010307 punción raquidea doble con pruebas manometricas
010308 punción cisternal con o sin manometria
010309 punción lumbar con / sin manometria
010310 vertebroplastias
010401 neurotomia o descompresion retrogaseriana trigeminal
010402 neurolisis transoval del trigemino
010403 neurotomia del intermediario vestibular o glosofaringeo
010404 intervenciones sobre nervios opticos
010405 neurotomia del supraorbitario, infraorbitario, dentario inferior, suboccipital y temporal superficial
010406 neurotomia selectiva del facial o del glosofaringeo o neumogastrico cervical
010407 injerto y/o anastomosis de nervio facial, hipogloso, espinal y similares
010408 neurolisis extracraneal alcoholizacion o similar
010409 bloqueo extracraneal antialgico
010501 tratamiento quirúrgico por patologia del plexo cervicobraquial
010502 tratamiento quirúrgico por patologia del plexo lumbosacro
010503 neurografia injerto tubulizacion escisión de lesión tumoral del nervio periferico
010504 transposicion del cubital
010505 descompresion del mediano a nivel del tunel carpiano
010507 neurolisis quirurgica de nervio periferico
010508 neurolisis química o bloqueo antialgico de nervio periferico
010601 simpatectomia cervical
010602 simpatectomia toracica
010603 simpatectomia lumbar por lumbotomia
010604 resección de plexos hipogastricos superior e inferior
010605 simpatectomia periarterial carotidea, humeral, femoral o similar
010606 inyeccion paravertebral de troncos y ganglios simpaticos
010607 simpaticectomia por videoscopia
010701 ventriculografia por inyeccion de un medio de contraste
010702 pan-arteriografia cerebral por cateterismo
010703 arteriografia carotidea o vertebral
010704 neumoencefaloventriculografia fraccionada
010705 mielografia ascendente o descendente, cisternomielografia, radiculografia
010706 discografia neurografia epidurografia
010707 infusion intratecal o en canal medular de citostaticos
010708 tratamiento endovascular de aneurismas craneales con embolizaciones terapéuticas o microlisis
010709 tratamiento endovascular de malformaciones craneales con embolizaciones terapéuticas o microlisis
010710 tratamiento endovascular de tumores craneales con embolizaciones terapéuticas prequirúrgica
010711 ablación de nervio craneal por radiofrecuencia
010801 biopsia cerebral estereotaxica

Operaciones en el aparato de la vision
020101 exenteracion del contenido orbitario
020102 neurotomia del nervio optico
020103 orbitotomia con escisión de lesión de orbita, exploracion, extracción de cuerpo extraño, biopsia, drenaje
020104 introducción de sustancias terapéuticas retroglobulares inyectables
020105 reparación plástica de la orbita con o sin injerto de piel
020106 enucleacion o evisceracion del globo ocular
020107 aspiracion, lavado e implante del vitreo
020108 vitrectomia
020109 tratamiento quirúrgico correctivo del estrabismo
020110 operación de Humnelshein suplantamiento del recto externo por el recto superior y recto inferior y variantes
020111 excenteración de contenido orbitario y resección total de maxilar superior
020201 reconstruccion total del parpado tecnica de hugjes o similar
020202 blefaroplastia
020203 blefarorrafia parcial o total
020204 blefarochalasis
020205 escisión de lesión de parpados blefarectomia, blefarotomia
020301 conjuntivoplastia
020302 escisión de lesión conjuntiva
020303 introducción de sustancias terapéuticas subconjuntivales
020304 peritectomia peritotomia
020305 sutura de conjuntiva
020401 queratoplastia laminar injerto de cornea
020402 queratoprotesis total queratoplastia total
020403 sutura de cornea
020404 queratocentesis
020405 cauterizacion corneal
020406 sutura de herida de cornea con prolapso de iris y/o herida de cristalino, extracción de cuerpo extraño en camara anterior
020501 tratamiento quirúrgico del glaucoma
020502 iridotomia coreoplastia iridectomia
020503 iridociclectomia o ciclectomia por tumores
020601 fotocoagulacion convencional
020602 fotocoagulacion con rayo laser de argon
020603 retinopexia con esclerectomia e implante
020604 retinopexia y esclerectomia
020605 retinopexia (diatermia, crio, etc.)
020606 esclerectomia con extracción de cuerpo extraño
020701 extracción del cristalino
020702 extracción de masas cristalinianas
020703 capsulotomia
020704 implante de lente intraocular en forma extracapsular
020705 implante de membrana amniotica solo en quemaduras igneas o quimicas
020801 dacriocistorrinostomia fistulizacion de saco lagrimal en cavidad nasal, plombaje
020802 escisión de glandula lagrimal
020803 drenaje de glandula o saco lagrimal
020804 cateterizacion de conducto lagrimo nasal
020901 fotocoagulacion con yag laser
Obligación de cobertura en opacificación de cápsula posterior y otros casos específicos detallados en la normativa.
020902 fotocoagulacion con laser only green
Obligación de cobertura: lesiones maculares.
020904 fotocirugía con dye laser
Obligación de cobertura: lesiones maculares.
020905 fotocirugía con krypton laser
Obligación de cobertura: hemorragias de cuerpo vítreo.
020906 iridectomia por laser
Obligación de cobertura: glaucoma agudo de ángulo estrecho; ángulo estrecho de un ojo con antecedente de iridectomía en el contralateral.
020907 trabeculoplastia con laser
Obligación de cobertura: glaucoma crónico cuando no mejora con tratamiento médico y la cirugía está contraindicada.

Operaciones Otorrinolaringológicas
030101 reconstrucción del pabellón auricular con injerto de cartílago y piel
030102 otoplastia o reconstrucción del pabellon ansiforme o defecto similar
030103 otoplastia de lobulo hendido
030104 escisión completa o amputacion de pabellon
030105 insición y drenaje de auricula. sutura del pabellon auricular
030106 cirugía de agenesia de conducto auditivo externo
030107 resección de osteoma
030108 extirpacion de coloboma auris
030109 escisión de lesión local de conducto auditivo externo. biopsia de oido externo
030201 miringoplastia
030202 timpanoplastia
030203 miringotomia con o sin colocación de tubo drenaje
030204 cirugía plástica por agenesia de oido medio
030205 movilizacion del estribo
030206 estapedectomia
030207 mastoidectomia simple o radical
030208 antrotomia mastoidea cierre de fistula mastoidea
030209 punción de antro mastoideo
030210 cirugía del glomus yugularis
030211 cirugía de 2da y 3ra porciones nervio facial
030301 laberintectomia
030302 fenestracion del conducto semicircular externo
030303 cirugía del saco endolinfatico
030304 cirugía del conducto auditivo interno y su contenido
030305 tratamiento quirúrgico de fractura del penasco
030306 tratamiento quirúrgico de neurinoma del acustico
030401 atresia de coanas permeabilizacion por acceso palatino
030402 resección total de nariz
030403 reconstruccion diferida de piramide nasal
030404 tratamiento quirúrgico del rinofima
030405 escisión de tumores endonasales
030406 resección de lesión local endonasal
030407 escisión de polipo retro-coanal
030408 rinoplastia con injerto cutaneo pediculado
030409 septumplastia por implantacion de cartilago autogeno
030410 septumplastia por perforacion o implantacion de acrilico en fosas nasales
030411 resección de tabique nasal operación de killian
030412 turbinectomia parcial o completa simple
030413 sutura de nariz biopsia de nariz
030501 cierre de fistula meningea
030502 sinusotomia combinada frontal etmoidal y esfenoidal
030504 sinusotomia radical frontal
030505 sinusotomia frontal externa simple – trepanopunción
030506 sinusotomia esfenoidal
030507 punción de seno esfenoidal
030508 etmoidectomia interna
030509 cirugía de tumores etmoidales
030510 antrotomia maxilar radical sinusotomia maxilar radical
030512 sinusotomia maxilar simple ventana antral
030514 cierre de fistula oral de seno maxilar
030515 punción de seno con o sin insercion de sonda. biopsia de seno paranasal
030516 cirugía de la fosa pterigomaxilar exploradora
030517 sinusotomia combinada con fibra optica y videoscopia
030518 sinusotomia radical con fibra optica y videoscopia
030519 cirugía de la fosa pterigomaxilar con videofibroscopia
030601 laringuectomia radical con vaciamiento de cuello (operación comando de laringe)
030602 laringofaringectomia
030603 laringectomia total
030604 laringectomia parcial
030605 laringoplastia cordopexia aritenoideopexia
030606 laringotomia mediana e inferior laringofisura-tirotomia-cricotirotomia-laringorafia
030607 insición y drenaje de laringe abceso, pericondritis
030608 microcirugía de laringe
030609 microcirugía de laringe con laser
030701 incision y drenaje de lesión origen dentario
030702 extirpacion de germen dentario ameloblastoma
030703 gingivectomia parcial tumores
030704 gingivectomia total ampliada tumores
030705 operación comando de encia o de trigono retromolar, mas vaciamiento ganglionar cervical
030706 biopsia de encia sutura de encia
030801 parotidectomia total
030802 operación comando de parotida
030803 parotidectomia del lobulo superficial
030804 escisión radical de glandula submaxilar
030805 operación comando de glandula submaxilar
030806 insición y drenaje de glandula parotida, submaxilar o sus conductos
030807 biopsia de glandula salival extracción incisional de cálculos salivales
030808 extirpacion de ranula
030901 operación comando piso de boca
030902 escisión ampliada de mucosa yugal y reconstruccion
030903 estomatoplastia con injerto
030904 insición y drenaje de piso de boca biopsia de mucosa bucal
030905 cierre de fistula externa de boca
031001 queiloplastia labio leporino
031003 queiloplastia con palatoplastia
031004 resección de labio. escisión en cuña
031005 queiloplastia de bernard borow abbe eastlander o similar
031006 queiloplastia con vaciamiento ganglionar suprahioideo
031007 escisión local de lesión de labio
031008 insición y drenaje de labio, absceso, sutura, biopsia
031101 operación comando de lengua
031102 glosectomia subtotal
031103 escisión local de lesión de lengua
031104 glosoplastia
031105 glosotomia con drenaje de abceso, extracción de cuerpo extraño, seccion frenillo, sutura, biopsia en la lengua
031201 palatoplastia paladar blando o duro
031202 resección parcial de paladar
031203 resección total de paladar
031204 resección total paladar y reconstruccion
031205 operación comando de paladar blando
031206 insición y drenaje de paladar absceso, sutura, biopsia de paladar
031301 amigdalectomia adenoidectomia
031302 escisión o electrocoagulacion de amigdala lingual, resto amigdalino o tejido linfoideo faringeo
031303 insición y drenaje de amigdala o tejidos periamigdalinos
031304 operación comando de faringe
031305 faringoplastia
031306 faringuectomia parcial tumores
031307 escisión de diverticulo faringoesofagico, o de lesión local de faringe
031308 faringotomia exploracion extracción de cuerpo extraño
031309 cierre de faringostoma
031310 sutura de faringe
031311 biopsia de faringe
031312 escisión radical de lesión de nasofaringe
031313 biopsia de lesión de nasofaringe

Operaciones en el Sistema Endocrino
040101 tiroidectomia total con vaciamiento ganglionar
040103 tiroidectomia total
040104 tiroidectomia sub-total hemitiroidectomia
040105 extirpacion de quiste tirogloso
040106 punción biopsia de tiroides
040107 insición y drenaje de quiste tirogloso infectado
040108 paratiroidectomia
040201 adrenalectomia bilateral
040202 adrenalectomia unilateral
040301 hipofisectomia transeptoesfenoidal

Operaciones en el Torax
050101 resección de pleura parietal costillas, musculos
050102 operación plástica por torax en carina o excavado
050103 toracoplastia
050201 traqueoplastia
050202 traqueostomia traqueotomia
050203 traqueorrafia, sutura, cierre de traqueostomia o fistula traqueal
050301 traqueoplastia, broncoplastia
050302 broncotomia broncorrafia por herida o traumatismo
050303 cavernostomia
050304 cierre de fistula bronco cutanea
050401 neumonectomia lobectomia segmentectomia, pleuroneumonectomia, decorticación de pulmón
050402 escisión local de lesión pulmonar cuerpo extraño, quistectomia o lesiones de enfisema
050403 operaciones en el mediastino via toracica o videoscopica
Obligación de cobertura: estadificación de cáncer de pulmón, tumores del mediastino, heridas torácicas.
050405 mediastinoscopia con o sin videoscopia
Obligación de cobertura: estadificación de cáncer de pulmón.
050406 toracotomia amplia exploradora biopsia de pulmon, pleura o mediastino
050407 drenaje de pleura con trocard por toracotomia minima
050408 punción de cavidad pleural para lavaje o instilacion de sustancias. punción pleural o pulmonar
050409 punción biopsia de pleura o pulmon con aguja de vimsilverman, coper o similares
050410 biopsia de grasa pre-escalenica. biopsia de daniels
050411 neumotorax
050413 toracovideoscopia terapéutica para resecciones
Obligación de cobertura: lesiones periféricas cuya resección sea exclusivamente por esa vía.
050501 colocación de stent endobronquial
Obligación de cobertura: alivio de obstrucción crítica de la vía aérea, patología benigna obstructiva no operable y tratamiento paliativo de enfermedades neoplásicas obstructivas.

Operaciones en la Mama
060101 mastectomia radical
060102 mastectomia subradical
060103 mastectomia simple
060104 mastectomia subcutanea adenomastectomia
060105 mastoplastia
060107 mamiloplastia
060108 escisión local de lesión de mama, de conducto de pezon
060109 escisión de cuadrante mamario
060110 drenaje de absceso mamario
060111 punción quiste mamario punción biopsia de mama
060112 cuadrantectomia con vaciamiento axilar

Operaciones en el Sistema Cardiovascular
070101 septostomia interauricular
070102 septostomia con balon de rashbind
070103 colocación de marcapaso definitivo con electrodo endocavitario
070105 cambio de generador marcapaso definitivo. recolocación plástica de bolsillo de marcapaso
070106 implantacion de circulacion asistida externa prolongada por contrapulsacion
070108 cardiorrafia sutura de corazon herida o traumatismo
070109 pericardiotomia con exploracion con drenaje, descomprension para evacuación de hematoma
070110 biopsia de pericardio
070111 pericardiocentesis diagnostica o terapéutica
070112 cateterismo de corazon para colocación de marcapaso transitorio
070113 biopsia de endocardio por cateterismo cardiaco
070114 biopsia de miocardio por cateterismo cardiaco
070115 colocación de desfibrilador implantable
Obligación de cobertura: prevención secundaria y primaria de muerte súbita según criterios detallados en la normativa.
070201 tratamiento quirúrgico de las cardiopatias congenitas
070203 reemplazo de valvula cardiaca por protesis o injerto
070204 doble reemplazo valvular cardiaco
070206 cierre defectos septales
070207 tratamiento quirúrgico de aneurismas del cayado aortico. aneurisma disecante de aorta
070208 tratamiento quirúrgico de aneurismas de aorta ascendente o descendente
070209 derivación (by-pass) aorto coronario
070210 derivación (by-pass) mamario coronario
070211 resección de aneurisma ventricular
070301 cirugía en los grandes troncos arteriovenosos de la cavidad toracica
070302 tratamiento quirúrgico del aneurisma de aorta toraco abdominal
070401 tratamiento quirúrgico del aneurisma de aorta abdominal
070402 cirugía de las ramas viscerales de la aorta abdominal y troncos iliacos
070403 derivación aorto o iliaco femoral uni o bilateral con o sin simpatisectomia
070405 derivación aorto iliaco uni o bilateral
070406 otras derivaciones arteriales en cavidad abdominal
070407 anastomosis porto-cava o esplenorenal o mesenterico cava
070408 cirugía de la vena cava
070409 colocación de filtro Mobin Uddin
070501 cirugía de la arteria carotida o de la vertebral tromboendarterectomia embolectomia
070502 sutura o ligadura de los vasos profundos del cuello
070503 glomectomia tumor de glomus carotideo
070601 embolectomia en arterias perifericas
070602 tromboendarterectomia de vasos perifericos
070603 derivación by-pass de vasos perifericos con injerto venoso o sintetico
070605 tratamiento del aneurisma o de las fistulas arteriovenosas
070606 anastomosis arterial arteriorrafia
070607 shunt o fistula arteriovenosa periferica para hemodiálisis
070608 diseccion de arterias para perfusion regional
070609 punción arterial para inyeccion medicamentosa
070610 ligadura unilateral de troncos venosos profundos
070611 trombectomia venosa profunda
070612 safenectomia interna y/o externa con ligaduras y/o resecciones escalonadas
070614 operación de linton, gockett o similares
070615 flebotomia con colocación de cateter
070616 flebectomia segmentaria por varices residuales
070701 cateterismo cardiaco derecho
070703 coronariografia selectiva
070704 aortografia por punción lumbar
070705 aortografia por cateterismo con o sin estudio selectivo de cualquiera de sus ramas toracicas o abdominales
070709 cavografia abdominal y/o toracica
070710 acigografia por punción transosea
070711 flebografia del seno petroso bilateral
070713 flebografia suprarrenal bilateral
070714 arteriografia periferica por punción
070715 embolizacion selectiva terapéutica
070716 flebografia de miembro inferior o superior
070717 flebotomía transcutanea y colocación de catéter doble lumen como acceso vascular para diálisis
070718 flebotomía con colocación de cateter implantable con reservorio
070801 angioplastia trasluminal coronaria con o sin colocación de stent
070803 angioplastia trasluminal coronaria con rotablator / simpson
Obligación de cobertura: lesiones calcificadas no dilatables.
070804 tratamiento desembolizante con quinasas
Obligación de cobertura: infarto agudo de miocardio.
070805 angioplastia periferica
070806 angioplastia periferica con colocación de stent
Obligación de cobertura: estenosis de arteria renal y enfermedad arterial periférica de miembros inferiores según criterios detallados en la normativa.
070901 transplante cardiaco
070902 transplante cardiopulmonar
071001 valvuloplastia mitral
Obligación de cobertura: estenosis mitral moderada o severa según criterios clínicos y ecocardiográficos detallados en la normativa.
071002 valvuloplastia pulmonar
Obligación de cobertura: pacientes con disnea de esfuerzo, angina, presíncope o síncope; gradiente arterial pulmonar pico mayor a 40 mmHg.

Operaciones en el Aparato Digestivo y Abdomen
080101 esofaguectomia total
080102 esofaguectomia segmentaria
080104 reemplazo de esofago
080105 esofagogastroplastia esofago-cardioplastia
080106 operaciones derivativas paliativas esofagogastro o esofagoyeyunoanastomosis
080107 tratamiento atresia esofagica
080108 esofagotomia exploradora via toracica o abdominal
080109 escisión de diverticulo esofagico intratoracico
080110 esofagotomia o esofagorafia de esofago cervical
080111 escisión de diverticulo esofagico cervical
080112 intubacion de esofago por gastrotomia
080113 colocación de prótesis esofágicas
Obligación de cobertura: fístula traqueoesofágica y tratamiento paliativo de la disfagia en estenosis malignas esofágicas.
080201 dermolipectomia abdominal con o sin reconstruccion del ombligo
080202 hernioplastia diafragmatica o isquiorrectal
080203 hernioplastia inguinal, crural, epigastrica, umbilical, obturatriz
080204 tratamiento quirúrgico del onfalocele
080205 hernioplastia bilateral
080206 eventracion hernia recidivada
080207 cierre de pared abdominal por evisceracion
080208 laparatomia exploradora
080209 enterolisis de bridamiento intestinal
080211 laparascopia convencional incluye biopsia dirigida
080212 peritoneocentesis evacuadora, diagnostica o para neumoperitoneo
080213 escisión tumor retroperitoneal
080214 drenaje absceso subfrenico
080216 hernioplastia diafragmatica con fundoplicatura videolaparoscopica
080217 videolaparoscopia con biopsia o diagnostica
080301 gastrectomia total
080302 gastrectomia subtotal o regastrectomia
080303 gastrotomia exploracion extracción cuerpo extraño, escición local de ulcera o tumor benigno
080304 gastrotomia
080305 gastrorrafia ulcera-gastrica perforada herida, traumatismo
080306 gastroduodenostomia gastroyeyunostomia
080307 vagotomia con piloroplastia
080308 piloromiotomia-piloroplastia
080309 cierre o eliminacion gastroenteroanastomosis
080310 cierre de fistula gastrocolica
080311 cierre de gastrostomia u otra fistula externa de estomago
080401 enterectomia de yeyuno o ileon
080402 escisión diverticulo de meckel
080403 enterotomia esterostomia temporaria
080404 derivaciones intestinales internas
080405 operación plástica en ileostomia
080406 plicatura de intestino delgado operación de noble
080407 gastrostomia por fibroscopia
080408 vagotomia con o sin piloroplastia por videoscopia
080409 cirugía gastrica de procesos benignos por videoscopia
080410 cirugía gastrica de procesos malignos por videoscopia
080501 colectomia total sin recto con restitucion del transito en un tiempo
080502 colectomia total sin recto con ileostomia temporaria o definitiva
080503 hemicolectomia derecha o izquierda
080504 colectomia segmentaria resección segmentaria de colon operación de Hartman
080505 resección anterior operación de Dixon o Maunsen
080506 operaciones radicales para megacolon
080508 colon protectomia total incluye ileostomia
080509 proctosigmoidectomia abdominoperineal operación de miles
080511 protectomia
080512 protectomia con prostatectomia o colpectomia
080513 rectotomia sigmoidotomia por via abdominal
080514 proctotomia con descompresion ano imperforado
080515 descenso transanal atresia ano rectal
080516 operación plástica en malformaciones congenitas anorrectales
080518 proctorrafia
080519 proctopexia prolapso de recto via abdominal
080520 confeccion o cierre de fistulas rectovesicales
080521 colostomia temporaria o definitiva unica intervencion
080522 operación plástica colostomia
080523 drenaje absceso perirrectal de Douglas
080524 apendicectomia
080525 extracción instrumental de fecalomas inaccesibles
080526 extracción manual de fecaloma
080601 anoplastia estenosis con o sin esfinterotomia
080602 anoplastia por estenosis con deslizamiento de colgajos
080603 esfinteroplastia tipo pickrel o similar
080604 esfinteroplastia tipo plicatura o similar
080605 cerclaje de ano
080606 hemorroidectomia con o sin fisura anal
080607 trombectomia infartectomia trombosis hemorroidaria
080608 tratamiento quirúrgico del prolapso mucoso operación de Whit
080609 tratamiento hemorroides con ligadura elastica
080610 tratamiento esclerosante en hemorroides
080611 fistulectomia o fistulotomia fistula del canal anal
080612 fisurectomia criptectomia o papilectomia
080613 esfinterotomia como unica operación
080614 escisión de lesión de piel perianal
080615 fulguracion radical de condilomas acuminados
080616 incision drenaje de absceso perianal
080617 tratamiento radical del absceso perianal con resección de cripta de origen
080618 tratamiento de las lesiones rectoanales con ultrasonido (leep o similares)
080701 lobectomia hepatica
080702 segmentectomia hepatica
080703 hepatectomia parcial escisión radical lesión de higado, quiste, tumor, etcétera
080704 hepatostomia marsupializacion de quistes
080705 sutura de higado por traumatismo herida
080706 biopsia de higado por laparatomia
080707 punción de higado percutanea
080708 colecistostomia
080710 seccion de ampolla de Vater transduodenal
080711 coledocotomia unico tratamiento
080712 anastomosis biliodigestivas simples
080713 anastomosis biliodigestivas complejas
080714 operaciones reparadoras de la via biliar
080715 extracción instrumental completa de cálculos
080716 colecistectomia con o sin coledocotomia
080717 coledocotomia unico tratamiento por laparoscopia
080718 biopsia de higado por videolaparoscopia
080720 dilatación de via biliar percutanea
080722 colangiopancreatografia retrograda endoscopica
080723 papilotomia y esfinterotomia endoscopica con extracción de litos y/o biopsia
080801 duodenopancreatectomia
080802 anastomosis pancreaticodigestivas
080803 escisión local lesión pancreas adenoma
080804 escisión corporocaudal esplenopancreatectomia
080805 sutura de pancreas herida traumatismo biopsia
080901 esplenectomia unica intervencion
080902 punción esplenica percutanea esplenoportografia
081001 trasplante hepático (parcial) de donante vivo
081002 trasplante hepático (parcial) de donante cadaverico
081003 trasplante hepático total

Operaciones en los vasos y ganglios linfaticos
090101 linfadenectomia cervical axilar o inguinal unilateral
090102 linfadenectomia cervical axilar inguinal radical bilateral
090103 escisión de lesión de conductos linfaticos linfangioma higroma
090104 drenaje de seno linfatico derivación
090105 linfadenectomia biopsia de ganglio linfatico
090106 linfadenotomia
090107 biopsia de ganglio linfatico por punción
090108 diseccion quirurgica para linfoadenografia

Operaciones en el aparato urinario y genital masculino
100101 nefrectomia total cualquier vía utilizada
100102 nefrectomia parcial
100103 nefroureterectomia total con cistectomia parcial
100104 nefrotomia nefrostomia nefropexia
100105 cirugía vasculorrenal aneurisma fistula
100106 transplante renal
100107 lumbotomia exploradora drenaje perirrenal biopsia
100108 tratamiento quirúrgico de la fistula lumbar con riñon funcionante
100109 biopsia renal percutanea pielografia percutanea
100110 plastia union ureteropielica
100111 derivaciones ureterales a intestino in situ
100112 derivaciones ureterales a porciones intestinales aisladas
100113 ureterectomia parcial
100114 pielotomia pielolitotomia ureterotomia
100115 extracción de cálculos ureterales cuerpo extraño
100116 tratamiento quirúrgico fistula ureterointestinal
100117 nefrostomia percutanea con o sin nefroscopia
100118 colocación de Pigtail / doble J endoscopico
100119 retiro de Pigtail o doble J endoscopico
100120 retroperitoneoscopia
100121 plastia union ureteropielica laparoscopica
100122 nefrolitotomia percutanea
100123 ureterolitotomia laparoscopica con pinza o dormia
100124 ureterorrenoscopia con litotomia litotricia y ectomia por cualquier metodo
Obligación de cobertura: cálculos impactados en cualquier sector del uréter que no respondieron a la litotricia extracorpórea.
100125 litotricia extracorporea renal y/o ureteral
Obligación de cobertura: según criterios clínicos detallados en la normativa (tamaño, número de cálculos, sintomatología, etc.).
100201 cistectomia total con derivación ureteral a asa delgada o colon, o neovejiga
100202 cistectomia total con derivación ureteral a intestino in situ o piel
100203 cistectomia parcial diverticulectomia resección de cuello vesical
100204 cistoplastia con colon o iliocistoplastia
100205 cistoplastia para la extrofia vesical
100206 tratamiento quirúrgico de la fistula vesicointestinal
100207 tratamiento quirúrgico fistula vesicocutanea
100208 cistotomia a cielo abierto extracción de cuerpo extraño
100209 cistotomia por punción con trocar
100210 resección endoscopica cuello vesical tumores
100211 tratamiento incontinencia de orina mujer por via vaginal
100212 tratamiento incontinencia de orina via abdominal en la mujer operación de marshall marchetti o similar
100213 tratamiento incontinencia de orina mujer por ambas vías
100301 epispadias o hipospadias por tiempo operatorio
100302 uretroplastia por traumatismo correccion de fistula uretrorectal o vaginal estrechez uretral
100303 uretrotomia externa derivativa por extracción de calculo uretrotomia interna
100304 uretrorrafia
100305 meatotomia
100306 electrocoagulacion endoscopica de tumores uretrales
100401 prostatectomia radical
100402 adenomectomia de prostata con o sin vasectomia bilateral
100403 resecciones de fibrosis y cicatrices del cuello vesical
100404 resección endoscopica trasuretral prostata
100405 vesiculectomia unica operación uni o bilateral
100406 prostatomia drenaje
100407 biopsia prostatica por punción
100501 orquidectomia unilateral completa con vaciamiento
100502 orquidectomia sub-albuginea bilateral
100503 orquidectomia unilateral
100504 orquidopexia unilateral cualquier tecnica con o sin tratamiento de hernia concomitante
100505 orquidopexia bilateral con o sin tratamiento de hernia concomitante
100506 tratamiento quirúrgico hidrocele varicocele torsion
100507 biopsia de testiculo
100508 escrotoplastia
100509 drenaje de absceso testicular lesión local de testiculo
100510 punción derrame escrotal
100601 epididimectomia bilateral
100602 epididimectomia unilateral
100603 epididimovasostomia anastomosis de conducto deferente
100604 epididimotomia y drenaje
100605 anastomosis del conducto deferente
100606 biopsia de epididimo
100701 amputacion radical, parcial de pene con vaciamiento
100702 amputacion completa o parcial de pene
100703 operación plástica del pene por tiempo operatorio
100704 escisión total de lesión de pene
100705 biopsia de pene
100706 cavernostomia punción cuerpos cavernosos
100707 resección de esclerosis en cuerpos cavernosos
100708 shunt caverno-esponjoso o caverno-safeno
100709 postioplastia fimosis – incluye frenulotomia
100710 circuncision
100711 incision dorsal o lateral prepucio frenulotomia
101010 plastia union ureteropielica
101101 colocación de stent uretral
Obligación de cobertura: disinergia detrusor – esfínter externo.
101102 tratamiento endoscopico de lesiones de prostata y vejiga por medios físicos y químicos
Obligación de cobertura: remoción de tejido de la glándula que ocupa la luz uretral causando síntomas u obstrucción al vaciamiento de la vejiga.

Operaciones en el Aparato Genital Femenino y Operaciones Obstétricas
110101 cirugía sobre anexos
110102 laparoscopia diagnostica
110105 microcirugía tubaria para tratamiento de esterilidad
Obligación de cobertura: mujeres menores de 35 años con factor tuboperitoneal leve o moderado como único factor de esterilidad.
110201 histerectomia radical colpoanexohisterectomia total
110202 exenteracion pelviana operación de Brusgwig
110203 histerectomia con o sin anexectomia por vía abdominal o vaginal con o sin colpoperineorrafia
110204 miomectomia uterina por via abdominal
110205 miomectomia vaginal mioma-nacens
110206 miomectomia vaginal por histerotomia con liberacion de vejiga
110208 operación correctora de malformaciones uterinas
110209 correccion quirurgica de la inversion uterina por via abdominal, histeropexia
110210 raspado uterino terapeutico
110211 raspado uterino diagnostico con o sin biopsia de cuello o aspiracion endometrial para citologia exfoliativa
110212 amputacion de cuello traquelectomia, traqueloplastia
110213 conizacion de cuello
110214 traquelorrafia fuera del parto cerclaje de cuello uterino
110215 escisión local de lesión de cuello, electrocoagulacion o cauterizacion quimica, biopsia de cuello
110216 colocación de aplicadores para radioterapia extra o intrauterino
110217 colocación de dispositivo intrauterino
110219 conizacion de cuello por leep
110301 tratamiento quirúrgico de la agenesia vaginal
110303 colporrafia anterior y/o posterior con o sin amputacion de cuello, incluye tratamiento de la incontinencia de orina
110304 colporrafia por herida o desgarro fuera del parto
110305 colporrafia posterior con reconstruccion del esfinter
110306 colpopexia por via abdominal
110307 colpopexia combinada por via abdominal y vaginal
110308 colpocleisis
110309 colpotomia vaginotomia de drenaje
110310 resección de tabique vaginal
110311 biopsia de vagina punción de fondo de saco de douglas
110312 vulvectomia radical
110313 vulvectomia simple
110314 escisión de labios mayores, menores glandula de bartholino, glandula de skene
110315 himenotomia
110318 ablasion de lesiones de vulva y vagina con laser
110319 ablasion de lesiones de cuello con criocirugía
110401 parto
110402 evacuación uterina 2º trimestre del embarazo con mecanismo de parto
110403 operación cesarea clasica, extraperitoneal, vaginal
110404 atencion del alumbramiento o puerperio y/o sus complicaciones cuando el parto no fue asistido por medico
110405 amniocentesis
110501 cirugía laparoscopica ginecologica
110502 videohisteroscopia diagnostica
110503 videohisteroscopia terapéutica

Operaciones en el sistema músculo esquelético, huesos y articulaciones
120301 reducción osteosintesis columna cervical dorsal o lumbar
120302 reducción osteosintesis humero pelvis sacro femur tibia perone cubito
120303 reducción osteosintesis cubito radio tercio inferior carpo primer metacarpo – tarso maxilares
120304 reducción osteosintesis esternon costilla clavicula escapula rotula
120305 reducción osteosintesis metacarpianos excepto el primero, metatarsiano, falanges, malar, propio de la nariz
120401 incision, resección parcial de vertebras laminectomia
120402 incision, resección parcial de coxal femur humero
120403 incision, resección parcial de esternon escapula cubito radio carpo tibia perone tarso
120404 incision, resección parcial de costilla clavicula metacarpo metatarso falanges
120405 punción biopsia de vertebras
120406 punción biopsia de cualquier otro hueso
120501 resección total de escapula humero isquion ilion
120502 resección total de coxal femur tibia humero maxilar superior inferior
120503 resección total de cubito radio perone carpo astragalo calcaneo tarso costillas malar
120504 resección total de clavicula rotula metatarsiano o falange de un mismo dedo
120601 osteotomias correctivas femur tibial tibia y perone
120602 osteotomias correctivas humero cubital y/o radial astragalo y/o calcaneo
120603 osteotomia correctiva metacarpiano metatarsiano falanges
120701 osteoplastia clavicula
120702 osteoplastia humero
120703 osteoplastia cubito radio carpo huesos de la cara
120704 osteoplastia metacarpiano
120705 osteoplastia falanges
120706 osteoplastia femur tibia perone
120707 osteoplastia astragalo calcaneo otros huesos del tarso
120708 osteoplastia metatarsiano falanges
120801 artrocentesis diagnostica terapéutica artrografia
120901 artrotomia sacro-iliaca condro-costal condro-esternal
120902 artrotomia hombro cadera rodilla
120903 artrotomia metacarpo/metatarso/falangica interfalangica
121001 artoplastia cadera
121002 artoplastia rodilla
121003 artoplastia hombro codo muñeca cuello de pie temporo-mandibular
121004 artoplastia esterno-clavicular carpo tarso-metatarsiana
121005 artoplastia acromio clavicular metacarpo-falangica
121101 artrodesis columna cervical dorsal lumbar
121102 artrodesis columna cervical dorsal lumbar cadera rodilla
121103 artrodesis hombro codo
121104 artrodesis esterno clavicular muñeca tarso tibiotarsal tarsometatarsiana sinfisis pubiana
121105 doble artrodesis chopart sub astragalina
121106 triple artrodesis tibiotarsiana subastragalina
121107 artrodesis metacarpo falangica metatarso falangica interfalangica
121201 sutura de capsula o ligamentos esternoclavicular acromio clavicular codo muñeca carpo
121202 sutura de capsula o ligamentos hombro cadera rodilla temporo maxilar
121203 sutura de capsula o ligamentos metacarpo o metatarso falangica interfalangica
121204 escisión o incision biopsia drenaje o extracción de depositos
121301 inmovilizacion por luxacion de columna cervical dorsal o lumbar
121302 inmovilizacion por luxacion de cadera rodilla
121303 inmovilizacion por luxacion de clavicula hombro codo muñeca metacarpo tobillo
121304 inmovilizacion de metacarpo o metatarso falangica por una o mas luxaciones
121305 tratamiento quirúrgico e inmovilizacion por luxacion de columna cervical dorsal lumbar
121306 tratamiento quirúrgico e inmovilizacion por luxacion de cadera rodilla
121307 tratamiento quirúrgico e inmovilizacion por luxacion de clavicula hombro codo muñeca metacarpo tobillo
121308 tratamiento quirúrgico e inmovilizacion por luxacion de metacarpo metatarso falangica temporomaxilar
121401 miectomias con vaciamiento de celda muscular
121402 incision de musculos escisión de lesión local biopsia miorrafias

Operaciones en tendones, vainas tendinosas y fascias
121501 exploracion drenaje extracción incision, biopsia, tenotomia, fasciotomia
121502 reparación y sutura tenorrafia de tendon de la muñeca o de dedo de la mano
121503 tenoplastia con alargamiento o acortamiento o injerto tendon flexor de la muñeca o dedo
121504 reparación o sutura tenorrafia en tendon extensor de la muñeca o dedo
121505 tenoplastia con alargamiento o acortamiento o injerto de tendon extensor de la muñeca o dedo
121506 reparación sutura tenorrafia de otro tendon
121507 tenoplastia con alargamiento o acortamiento o injerto de tendon
121508 tratamiento de la secuela por paralisis, poliomielitis
121509 escisión ganglio

Amputaciones y desarticulaciones
121601 amputacion interescapulotoracica
121602 amputacion de hombro
121603 amputacion de brazo codo antebrazo muñeca mano
121604 amputacion interileoabdominal
121605 amputacion de cadera
121606 amputacion de muslo o rodilla
121607 amputacion de pie o pierna
121608 amputacion de dedo de la mano
121609 amputacion de dedo del pie

Procedimientos combinados
121701 discectomia cervical dorsal o lumbar
121702 discectomia cervical dorsal lumbar con artrodesis
121703 tratamiento quirúrgico elevacion congenita de escapula
121704 tenotomia y/o fasciotomias unicas o multiples para el tratamiento de la torticolis
121705 operaciones en el hueco supraclavicular
121706 tratamiento quirúrgico de la luxacion inveterada y recidivante de hombro
121707 aponeurectomia palmar parcial o total con o sin injerto
121712 reconstruccion total del pulgar por transposicion
121714 luxacion congenita de cadera reducción incruenta
121715 luxacion congenita de cadera reducción cruenta
121717 epifisiolosis de cadera coxavara del adolescente
`;

/** Convierte una descripción en minúsculas a una con mayúscula inicial. */
function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function parseCatalogo(raw: string): CatalogoItem[] {
  const items: CatalogoItem[] = [];
  let category = "General";
  let current: CatalogoItem | null = null;

  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    const codeMatch = line.match(/^(\d{6})\s+(.+)$/);
    if (codeMatch) {
      current = {
        code: codeMatch[1],
        description: capitalize(codeMatch[2].trim()),
        category,
      };
      items.push(current);
      continue;
    }

    // Encabezado de categoría: "Operaciones…" / "Operaciónes…" /
    // "Amputaciones y…" / "Procedimientos combinados".
    if (/^(operaci[oó]nes|amputaciones y|procedimientos combinados)/i.test(line)) {
      category = line.replace(/:$/, "").trim();
      current = null;
      continue;
    }

    // Cualquier otra línea es nota de la práctica anterior.
    if (current) {
      current.note = current.note ? `${current.note} ${line}` : line;
    }
  }

  return items;
}

export const PMO_CATALOGO: CatalogoItem[] = parseCatalogo(CATALOGO_RAW);

/** Lista ordenada y única de categorías presentes en el catálogo. */
export const PMO_CATALOGO_CATEGORIAS: string[] = Array.from(
  new Set(PMO_CATALOGO.map((i) => i.category)),
);
