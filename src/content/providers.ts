/**
 * Cartilla de prestadores de OSPIQYP — Capital Federal y zonas adyacentes.
 * Datos tomados del Resumen de Cartilla 2026.
 *
 * Estructura pensada para una tabla buscable/filtrable en /prestadores:
 * cada prestador tiene zona, categoría, localidad y datos de contacto.
 */

export type ProviderCategory =
  | "Clínicas y Sanatorios"
  | "Centros de Diagnóstico"
  | "Kinesiología"
  | "Farmacias"
  | "Ópticas";

export type ProviderZone =
  | "Capital Federal"
  | "Zona Sur"
  | "Zona Oeste"
  | "Zona Norte"
  | "Provincia de Buenos Aires";

export type Provider = {
  name: string;
  category: ProviderCategory;
  zone: ProviderZone;
  locality?: string;
  address?: string;
  phone?: string;
  note?: string;
};

export const PROVIDERS: Provider[] = [
  /* ============ CAPITAL FEDERAL ============ */
  // Clínicas y Sanatorios
  { name: "Climédica", category: "Clínicas y Sanatorios", zone: "Capital Federal", address: "Saavedra 1039", phone: "4943-0183 / 1497", note: "Posee guardia" },
  { name: "Hospital Naval", category: "Clínicas y Sanatorios", zone: "Capital Federal", address: "A. Patricias Argentinas 351", phone: "4103-5300", note: "Posee guardia y guardia pediátrica" },
  { name: "Centro Médico San Juan", category: "Clínicas y Sanatorios", zone: "Capital Federal", address: "Av. San Juan 2511", phone: "4941-1594", note: "Posee guardia" },
  // Centros de Diagnóstico
  { name: "Centro Oftalmológico Metropolitano", category: "Centros de Diagnóstico", zone: "Capital Federal", address: "Av. Nazca 3312", phone: "4503-5572 / 11-2372-6754" },
  { name: "I.A.M.A.", category: "Centros de Diagnóstico", zone: "Capital Federal", address: "Suipacha 931", phone: "4893-2998" },
  { name: "I.A.M.A.", category: "Centros de Diagnóstico", zone: "Capital Federal", address: "Viamonte 2560", phone: "4965-3600 / 11-4965-3627" },
  // Kinesiología
  { name: "Rehabplus - Sekin", category: "Kinesiología", zone: "Capital Federal", address: "Scalabrini Ortíz 2364", phone: "4831-1595" },
  // Farmacias
  { name: "Gran Farmacia Gallo", category: "Farmacias", zone: "Capital Federal", locality: "Almagro", address: "Av. Córdoba 3199", phone: "4961-4917 / 4962-5949" },
  { name: "Del Mercado Spinetto", category: "Farmacias", zone: "Capital Federal", locality: "Balvanera", address: "Alsina 2302", phone: "4954-3517" },
  { name: "Rivadavia 2463", category: "Farmacias", zone: "Capital Federal", locality: "Balvanera", address: "Av. Rivadavia 2463", phone: "4951-4479 / 4953-4504" },
  { name: "Mancini", category: "Farmacias", zone: "Capital Federal", locality: "Barracas", address: "Av. Montes de Oca 1229", phone: "4301-1449 / 4302-5255" },
  { name: "Farmaplus 48", category: "Farmacias", zone: "Capital Federal", locality: "Belgrano", address: "Av. Cabildo 2171", phone: "4787-3100" },
  { name: "Farmaplus 51", category: "Farmacias", zone: "Capital Federal", locality: "Belgrano", address: "Av. Congreso 2486", phone: "4787-3100" },
  { name: "Openfarma Daflo", category: "Farmacias", zone: "Capital Federal", locality: "Belgrano", address: "Blanco Escalada 1609", phone: "5353-0030" },
  { name: "TKL Galesa", category: "Farmacias", zone: "Capital Federal", locality: "Belgrano", address: "Av. Cabildo 1631", phone: "4783-5210" },
  { name: "Acoyte", category: "Farmacias", zone: "Capital Federal", locality: "Caballito", address: "Avellaneda 469", phone: "4902-2006" },
  { name: "Farmaplus Caba 4", category: "Farmacias", zone: "Capital Federal", locality: "Caballito", address: "Av. Rivadavia 4502", phone: "0810-555-7777" },
  { name: "TKL Nueva González", category: "Farmacias", zone: "Capital Federal", locality: "Caballito", address: "Av. Rivadavia 5415", phone: "4902-3333" },
  { name: "RP. Botica de Julián", category: "Farmacias", zone: "Capital Federal", locality: "Centro", address: "Carlos Pellegrini 423", phone: "4322-2888 / 4322-6501" },
  { name: "RP. Scannapieco", category: "Farmacias", zone: "Capital Federal", locality: "Centro", address: "Esmeralda 599", phone: "4393-9833 / 4322-3700" },
  { name: "RP. Went", category: "Farmacias", zone: "Capital Federal", locality: "Centro", address: "Av. Corrientes 901", phone: "4322-2888 / 0258" },
  { name: "SOY Zeus", category: "Farmacias", zone: "Capital Federal", locality: "Colegiales", address: "Av. Cabildo 810", phone: "4772-0321 / 4777-4814" },
  { name: "SOY Saint Etienne", category: "Farmacias", zone: "Capital Federal", locality: "Colegiales", address: "Av. Álvarez Thomas 700", phone: "11-5427-6315" },
  { name: "SOY L'Aiglon", category: "Farmacias", zone: "Capital Federal", locality: "Congreso", address: "Av. Callao 200", phone: "4372-8885 / 9339" },
  { name: "TKL Etcheverry", category: "Farmacias", zone: "Capital Federal", locality: "Congreso", address: "Av. Callao 299", phone: "4371-4844 / 5626" },
  { name: "SOY Vital", category: "Farmacias", zone: "Capital Federal", locality: "Flores", address: "Av. Rivadavia 6799", phone: "4632-0389 / 6930" },
  { name: "TKL Gran Liniers", category: "Farmacias", zone: "Capital Federal", locality: "Liniers", address: "Av. Rivadavia 11552", phone: "4641-0055 / 4642-3678" },
  { name: "GES", category: "Farmacias", zone: "Capital Federal", locality: "Mataderos", address: "Av. Emilio Castro 7649", phone: "4642-3051" },
  { name: "SOY Obras", category: "Farmacias", zone: "Capital Federal", locality: "Núñez", address: "Av. del Libertador 7446", phone: "4702-6017 / 4702-1588" },
  { name: "Marina", category: "Farmacias", zone: "Capital Federal", locality: "Nueva Pompeya", address: "Av. La Plata 2501", phone: "4923-3984 / 4921-2657" },
  { name: "5100", category: "Farmacias", zone: "Capital Federal", locality: "Palermo", address: "Ángel J. Carranza 2388", phone: "4771-0450" },
  { name: "Openfarma Gran Rural", category: "Farmacias", zone: "Capital Federal", locality: "Palermo", address: "Av. Santa Fe 4228", phone: "5353-0030" },
  { name: "Gran Ferrari", category: "Farmacias", zone: "Capital Federal", locality: "Pque. Patricios", address: "Av. Caseros 1990", phone: "4363-2400 / 31" },
  { name: "SOY Social Once", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Santa Fe 2099", phone: "4382-0705 / 3750-8756" },
  { name: "TKL Facultad", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Marcelo T. de Alvear 2045", phone: "4821-2787 / 2788" },
  { name: "TKL Naveyra", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Las Heras 2318", phone: "4803-3011 / 0885" },
  { name: "TKL Quintana", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Quintana 392", phone: "4813-1189 / 5328" },
  { name: "TKL San Agustín", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Las Heras 2699", phone: "4807-2790 / 2569" },
  { name: "Lasante - Las Heras", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Las Heras 2991", phone: "2068-1360" },
  { name: "Matech Las Heras", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Las Heras 3701", phone: "15-3931-6591" },
  { name: "TKL Tekiel", category: "Farmacias", zone: "Capital Federal", locality: "Recoleta", address: "Av. Santa Fe 2399", phone: "4821-5134 / 4823-1551" },
  { name: "SOY Arenales", category: "Farmacias", zone: "Capital Federal", locality: "Retiro", address: "Arenales 1302", phone: "4812-9078 / 4811-2883" },
  { name: "SOY San Nicolás", category: "Farmacias", zone: "Capital Federal", locality: "San Nicolás", address: "Av. Santa Fe 1299", phone: "4811-4152 / 4816-1009" },
  { name: "RP. Obelisco", category: "Farmacias", zone: "Capital Federal", locality: "San Nicolás", address: "Av. Corrientes 1182", phone: "4382-9501 / 4322-1001" },
  { name: "TKL América", category: "Farmacias", zone: "Capital Federal", locality: "Tribunales", address: "Av. Córdoba 1402", phone: "4372-9633 / 4373-2191" },
  { name: "Daneri", category: "Farmacias", zone: "Capital Federal", locality: "V. del Parque", address: "Campana 2502", phone: "4580-2299" },
  { name: "General Paz", category: "Farmacias", zone: "Capital Federal", locality: "V. Pueyrredón", address: "Constituyentes 6117", phone: "4572-5130 / 4574-5866" },
  { name: "Cosmopolita", category: "Farmacias", zone: "Capital Federal", locality: "V. Santa Rita", address: "Av. Nazca 1120", phone: "4611-0233 / 15-3699-1928" },
  { name: "Ca.De.Fa.", category: "Farmacias", zone: "Capital Federal", locality: "Villa Crespo", address: "Av. Scalabrini Ortiz 362", phone: "4854-3069" },
  { name: "Devoto III", category: "Farmacias", zone: "Capital Federal", locality: "Villa Devoto", address: "Av. Lope de Vega 3249", phone: "0810-555-7779" },
  { name: "Inglesa de Lugano", category: "Farmacias", zone: "Capital Federal", locality: "Villa Lugano", address: "Somellera 5725", phone: "4601-3100 / 4602-6874" },
  { name: "Central", category: "Farmacias", zone: "Capital Federal", locality: "Villa Urquiza", address: "Av. Monroe 4968", phone: "4523-5148 / 4523-3178" },
  // Ópticas (Hipervisión)
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Barracas", address: "Anchoris 2", phone: "4306-4387" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Belgrano", address: "Av. Cabildo 1081", phone: "4781-3903" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Belgrano", address: "Av. Federico Lacroze 2468", phone: "4776-6722" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Congreso", address: "Uriburu 61", phone: "4953-9168 / 11-6427-0345" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Flores", address: "Artigas 313", phone: "11-7519-3500" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Flores", address: "Av. Varela 1250", phone: "11-7221-0924" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Floresta", address: "Juan B. Alberdi 4738", phone: "11-6477-7346" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Liniers", address: "Cosquín 16", phone: "4641-4125" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Mataderos", address: "Av. de los Corrales 7316", phone: "3971-4815" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Núñez", address: "Av. Cabildo 4403", phone: "4701-5408 / 11-3354-3095" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Núñez", address: "Av. Libertador 6677", phone: "4781-2924 / 11-3269-8851" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Palermo", address: "Arenales 3396", phone: "4827-3384" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Palermo", address: "Bulnes 2629", phone: "4801-3734 / 11-3949-6936" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Palermo", address: "French 3012", phone: "4823-6493 / 11-3558-8842" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Palermo", address: "Av. R. Scalabrini Ortíz 3016", phone: "4801-1891 / 11-3415-4520" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Recoleta", address: "Ayacucho 1272", phone: "4811-8047 / 11-3933-1847" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Recoleta", address: "Azcuénaga 1025", phone: "4822-5840 / 11-3881-6529" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Retiro", address: "Marcelo T. de Alvear 770", phone: "11-3155-8668" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Crespo", address: "J. R. Velasco 475", phone: "4854-7911 / 11-6426-9856" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Crespo", address: "Av. R. Scalabrini Ortiz 455", phone: "4855-0995 / 11-6427-0221" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Devoto", address: "Lope de Vega 3529", phone: "4892-6438 / 11-2274-2159" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Ortúzar", address: "Guevara 1623", phone: "4551-4524" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Pueyrredón", address: "Av. José G. Artigas 5111", phone: "4572-6794 / 11-6438-3457" },
  { name: "Hipervisión", category: "Ópticas", zone: "Capital Federal", locality: "Villa Urquiza", address: "Díaz Colodrero 2374", phone: "11-6254-9600" },

  /* ============ ZONA SUR ============ */
  { name: "Sanatorio Solano", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "San Fco. Solano", address: "Calle 841 N° 2469 (cons. externos)", phone: "2120-2600" },
  { name: "Clínica Ntra. Sra. Dulce Espera", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Sarandí", address: "Ferré 521", phone: "4205-7100", note: "Posee guardia" },
  { name: "Clínica Banfield (psiquiatría)", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Banfield", address: "Azara 1780", phone: "4242-2862 / 7389" },
  { name: "Sanatorio Nuevos Aires", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Tristán Suárez", address: "Gaddini 185", phone: "4234-8803", note: "Posee guardia y guardia pediátrica" },
  { name: "Clínica del Niño Quilmes", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Quilmes", address: "Av. Lamadrid 444", phone: "4364-9999 / 4364-9900", note: "Posee guardia pediátrica e internación" },
  { name: "Sanatorio San Juan", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Lanús O.", address: "Hipólito Yrigoyen 5132", phone: "7534-0404", note: "Posee guardia y guardia pediátrica" },
  { name: "Instituto Central de Medicina", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "La Plata", address: "Calle 43 N° 585 e/ 6 y 7", phone: "(0221) 482-5566 / 423-1099", note: "Posee guardia" },
  { name: "Clínica Privada Ranelagh", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Ranelagh", address: "Km 28,5 Cno. Gral. Belgrano 4786", phone: "4223-8000 / 4223-8080", note: "Con derivación de la Obra Social. Posee guardia" },
  { name: "Sanatorio Bernal", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Bernal", address: "Av. San Martín 572", phone: "4229-4600 / 4646", note: "Con derivación de la Obra Social. Posee guardia y guardia traumatológica" },
  { name: "Policonsultorio CEM M. Grande", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Monte Grande", address: "Vicente López 265", phone: "4290-7672 / 5263-0801" },
  { name: "Policonsultorio CEM Lomas", category: "Clínicas y Sanatorios", zone: "Zona Sur", locality: "Lomas", address: "Hipólito Yrigoyen 9175/77", phone: "5263-0801" },
  // Diagnóstico Zona Sur
  { name: "Diagmed", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "La Plata", address: "Calle 7 N° 1486", phone: "(0221) 439-2100" },
  { name: "Laboratorio Canosanirato", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "Florencio Varela", address: "Juan Bautista Alberdi 2855", phone: "11-2337-4925" },
  { name: "Centro de Alta Complejidad Fcio. Varela (RADIOMED)", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "Florencio Varela", address: "Mitre 268 / Av. J. B. Alberdi 3172", phone: "(011) 4355-0329 / 4287-4601" },
  { name: "Diagnóstico Médico Varela (DIMEVA)", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "Florencio Varela", address: "Juan de la Cruz Contrera 160", phone: "(011) 4355-1763" },
  { name: "Varelab (laboratorio)", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "Florencio Varela", address: "Tte. Gral. Juan Domingo Perón 1004", phone: "4287-6172 / 11-3919-8027" },
  { name: "CYTEC (Resonancia Magnética)", category: "Centros de Diagnóstico", zone: "Zona Sur", locality: "Florencio Varela", address: "Bmé. Mitre N° 43 (e/ España y S. Martín)", phone: "4237-5458 / 4355-2957 / 4355-4833" },
  // Farmacias Zona Sur
  { name: "Nueva Seguí", category: "Farmacias", zone: "Zona Sur", locality: "Adrogué", address: "Seguí 602 esq. Avellaneda", phone: "4214-1932" },
  { name: "Alejandro Korn", category: "Farmacias", zone: "Zona Sur", locality: "Alejandro Korn", address: "Av. Independencia 85", phone: "(02225) 424671 / 425370" },
  { name: "MAGA SHOP - Cassissa", category: "Farmacias", zone: "Zona Sur", locality: "Avellaneda", address: "Av. Bartolomé Mitre 1471", phone: "4203-7923 / 4205-6944" },
  { name: "Del Hiper I", category: "Farmacias", zone: "Zona Sur", locality: "Avellaneda", address: "Av. H. Yrigoyen 261 (ex Pavón)", phone: "4222-6461" },
  { name: "Farmaplus 34", category: "Farmacias", zone: "Zona Sur", locality: "Berazategui", address: "Calle 14 N° 4998", phone: "4226-6770 / 72" },
  { name: "Nueva Canning", category: "Farmacias", zone: "Zona Sur", locality: "Canning", address: "Castex 1078", phone: "4232-5617 / 4389-1069" },
  { name: "Nueva Ezeiza", category: "Farmacias", zone: "Zona Sur", locality: "Ezeiza", address: "Avellaneda 70", phone: "4232-9576 / 4529" },
  { name: "Manuela Amarelle", category: "Farmacias", zone: "Zona Sur", locality: "Fcio. Varela", address: "Av. San Martín 2944", phone: "4287-5499" },
  { name: "P. de Salud - Marmol", category: "Farmacias", zone: "Zona Sur", locality: "José Mármol", address: "Bynnon 3180", phone: "4291-1291" },
  { name: "Lofrano", category: "Farmacias", zone: "Zona Sur", locality: "L. de Zamora (O)", address: "Mitre 188", phone: "4292-3920" },
  { name: "UOM Gorriti", category: "Farmacias", zone: "Zona Sur", locality: "L. de Zamora (O)", address: "H. Yrigoyen 9125", phone: "4244-5129 / 3924" },
  { name: "REX", category: "Farmacias", zone: "Zona Sur", locality: "Lanús (E)", address: "29 de Septiembre 1884", phone: "4241-1253 / 4225-2173" },
  { name: "Nueva Llavallol", category: "Farmacias", zone: "Zona Sur", locality: "Llavallol", address: "Av. A. Argentina 1644", phone: "7700-0068" },
  { name: "Lujilde", category: "Farmacias", zone: "Zona Sur", locality: "Longchamps", address: "Alsina 838", phone: "5357-8978" },
  { name: "Nueva Longchamps", category: "Farmacias", zone: "Zona Sur", locality: "Longchamps", address: "Av. La Aviación 991", phone: "4233-8248 / 8247" },
  { name: "Petit", category: "Farmacias", zone: "Zona Sur", locality: "Luis Guillón", address: "Boulevard Buenos Aires 1024", phone: "2072-7401 / 2064-5481" },
  { name: "Franco", category: "Farmacias", zone: "Zona Sur", locality: "Monte Grande", address: "General Rodríguez 129", phone: "4296-3458 / 4281-7271" },
  { name: "Malvinas de Pefesan", category: "Farmacias", zone: "Zona Sur", locality: "Monte Grande", address: "Nuestras Malvinas 450", phone: "4281-2083 / 1144" },
  { name: "Del Este", category: "Farmacias", zone: "Zona Sur", locality: "Quilmes (E)", address: "Lavalle 895 esq. Brandsen", phone: "4257-0604 / 4486" },
  { name: "Juncal", category: "Farmacias", zone: "Zona Sur", locality: "Temperley", address: "Almirante Brown 2820", phone: "4244-3003 / 4245-9109" },
  { name: "Red XXI", category: "Farmacias", zone: "Zona Sur", locality: "Temperley", address: "Av. H. Yrigoyen 10581/83", phone: "4231-0803 / 3489" },
  { name: "P. de Salud XVII SCS", category: "Farmacias", zone: "Zona Sur", locality: "Tristán Suárez", address: "Las Hortensias 305, dto. 2", phone: "4389-4711" },
  { name: "Asoc. Mut. Cec.", category: "Farmacias", zone: "Zona Sur", locality: "Turdera", address: "Av. Antártida Arg. 127", phone: "4298-6222" },
  { name: "Ferreri", category: "Farmacias", zone: "Zona Sur", locality: "Wilde", address: "Fabián Onzari 1598", phone: "4246-5046 / 4220-1091" },
  { name: "Nueva Wilde", category: "Farmacias", zone: "Zona Sur", locality: "Wilde", address: "Fabián Onzari 1202", phone: "4217-0174" },
  // Ópticas Zona Sur
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Adrogué", address: "Mitre 971", phone: "11-6969-9587" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Avellaneda", address: "Av. Belgrano 866", phone: "4201-6396 / 11-3212-6661" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Berazategui", address: "Calle 149 N° 1387", phone: "5291-1066" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Florencio Varela", address: "Balcarce 2179 (ex 113)", phone: "2144-1844 / 11-4980-6806" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Lanús Oeste", address: "Av. San Martín 1618", phone: "4247-0356 / 11-6828-6207" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Lanús Oeste", address: "Presidente Quintana 138", phone: "4225-2837" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Lomas de Zamora", address: "Sáenz 347", phone: "4244-5220 / 11-6404-4891" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Monte Grande", address: "Alem 273", phone: "4290-4495" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Monte Grande", address: "Bruzzone 288", phone: "11-3326-2151" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Monte Grande", address: "Cardeza 87", phone: "11-5903-4467" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Monte Grande", address: "Vicente López 434", phone: "4290-4632" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Quilmes", address: "Alvear 635", phone: "3221-0510 / 11-3855-4122" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Sur", locality: "Wilde", address: "Las Flores 59-57", phone: "4207-0141 / 11-5927-3590" },

  /* ============ ZONA OESTE ============ */
  { name: "Clínica Privada Centro", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "G. Rodríguez", address: "España 352", phone: "(0237) 484-1904", note: "Posee guardia y guardia pediátrica" },
  { name: "Figueroa Paredes", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "I. Casanova", address: "Dante Alighieri 3637 y R.3", phone: "4480-2582 / 4480-2500", note: "Posee guardia y guardia pediátrica" },
  { name: "Instituto Médico Agüero", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "Morón", address: "Azul 1831", phone: "4645-9000 / 0810-999-9700", note: "Posee guardia y guardia pediátrica" },
  { name: "Clínica Total Salud (ex Tachela)", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "Haedo", address: "2da. Rivadavia 15577", phone: "4443-2818 / 0810-220-0086", note: "Posee guardia" },
  { name: "VITAS Centro Médico", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "Morón", address: "Ntra. Sra. del Buen Viaje 545, 1er piso", phone: "11-2120-9878 / 11-5127-9009" },
  { name: "Figueroa Paredes", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "M. Acosta", address: "Tres Sargentos 540", phone: "(0220) 491-2353 / 499-8157", note: "Posee guardia y guardia pediátrica" },
  { name: "Figueroa Paredes", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "Laferrere", address: "Juan M. de Rosas 10841", phone: "4480-2500", note: "Posee guardia y guardia pediátrica" },
  { name: "Centro Médico K41", category: "Clínicas y Sanatorios", zone: "Zona Oeste", locality: "Francisco Álvarez", address: "Colectora sur Acc. Oeste km. 41", phone: "11-2120-2770" },
  // Diagnóstico Zona Oeste
  { name: "ELAB Laboratorio Análisis Clínicos", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "San Justo", address: "Salta 2278", phone: "11-2889-8055" },
  { name: "IMAT CEMI", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "Morón", address: "Almirante Brown 425", phone: "5263-5376" },
  { name: "R.M. Laboratorio Análisis Clínicos", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "Morón", address: "Ing. Ernesto C. Boatti 461", phone: "4627-8386" },
  { name: "TC Haedo", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "Haedo", address: "Manuel Fresco 128", phone: "11-4403-0073", note: "Resonancias, tomografías, ecografías / doppler" },
  { name: "TC Haedo (Gral. Rodríguez)", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "General Rodríguez", address: "Hosp. Vicente López y Planes, 25 de Mayo esq. Alem", phone: "11-2467-3111", note: "Resonancia nuclear magnética abierta" },
  { name: "RESOCENTER", category: "Centros de Diagnóstico", zone: "Zona Oeste", locality: "Morón", address: "25 de Mayo 344", phone: "5365-9800", note: "Centro médico de alta complejidad" },
  // Farmacias Zona Oeste
  { name: "Palmer", category: "Farmacias", zone: "Zona Oeste", locality: "Gral. Rodríguez", address: "Av. 25 de Mayo 504/6", phone: "11-3212-7654" },
  { name: "Buacar", category: "Farmacias", zone: "Zona Oeste", locality: "I. Casanova", address: "Av. J. M. de Rosas 6933", phone: "7079-0909" },
  { name: "Escalante", category: "Farmacias", zone: "Zona Oeste", locality: "Ituzaingó", address: "Cristiania 1324", phone: "4625-1581" },
  { name: "C. Oeste Ituzaingó", category: "Farmacias", zone: "Zona Oeste", locality: "Ituzaingó", address: "Las Heras 381", phone: "4624-4774" },
  { name: "Estanislao", category: "Farmacias", zone: "Zona Oeste", locality: "Laferrere", address: "Estanislao del Campo 4229", phone: "4457-7824" },
  { name: "Zona Vital Luján", category: "Farmacias", zone: "Zona Oeste", locality: "Luján", address: "Negrito Manuel 758 esq. C. Pellegrini", phone: "(02323) 435800" },
  { name: "De la Estación Merlo", category: "Farmacias", zone: "Zona Oeste", locality: "Merlo", address: "Av. Libertador 788", phone: "(0220) 4822360 / 0039" },
  { name: "Altos de Moreno", category: "Farmacias", zone: "Zona Oeste", locality: "Moreno", address: "Libertador 299", phone: "(0237) 4638983" },
  { name: "Del Hiper II", category: "Farmacias", zone: "Zona Oeste", locality: "Ciudadela", address: "Av. Gaona s/n esq. G. Bell (loc. 7)", phone: "(0237) 4687106 / 4681205" },
  { name: "Cravenna", category: "Farmacias", zone: "Zona Oeste", locality: "Morón", address: "Av. Rivadavia 18199", phone: "4483-4747 / 4333" },
  { name: "Martinoia", category: "Farmacias", zone: "Zona Oeste", locality: "Ramos Mejía", address: "Av. de Mayo 899", phone: "4658-4909 / 4658-6547" },
  { name: "Romano", category: "Farmacias", zone: "Zona Oeste", locality: "San Justo", address: "Pte. Illia 2302", phone: "4484-5600 / 4484-7055" },
  // Ópticas Zona Oeste
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Caseros", address: "3 de Febrero 3038", phone: "4750-8742 / 11-3431-0922" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Castelar", address: "Martín Irigoyen 437", phone: "4489-4177 / 11-6565-9375" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Ciudadela", address: "San Martín 77", phone: "4653-2146" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Ituzaingó", address: "F. Olazabal 720", phone: "4623-2644 / 11-6564-9263" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "José C. Paz", address: "Granaderos a Caballo 4546", phone: "11-5596-3-6944" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Merlo", address: "Av. Constitución 537", phone: "0220-4865125 / 11-6140-7495" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Morón", address: "Buen Viaje 812", phone: "15-5793-3956" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Ramos Mejía", address: "Alvarado 407", phone: "4654-3526" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "Ramos Mejía", address: "Díaz Vélez 1155", phone: "11-6736-4048" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "San Justo", address: "Pte. Illia 2305", phone: "4484-5984 / 11-6902-7380" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Oeste", locality: "San Justo", address: "Villegas 2639", phone: "4482-3250 / 11-2502-7402" },

  /* ============ ZONA NORTE ============ */
  { name: "Sanatorio Modelo de Caseros", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "Caseros", address: "Lisandro Medina 2285", phone: "4716-3200", note: "Posee guardia y guardia pediátrica" },
  { name: "Sanatorio La Torre Vicente López", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "Florida", address: "San Martín 2142", phone: "4797-9697", note: "Posee guardia e internación" },
  { name: "Hospital La Merced", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "Martín Coronado", address: "Julio Besada 6969", phone: "4842-0093 / 4840-0101", note: "Posee guardia y guardia pediátrica" },
  { name: "Nuestra Sra. Fátima de Escobar", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "Escobar", address: "Spadaccini 1084", phone: "(0348) 442-1000", note: "Posee guardia" },
  { name: "Clínica Fátima de Pilar", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "Pilar", address: "Vergani 830", phone: "(0230) 442-0789 / 0303", note: "Posee guardia y guardia pediátrica" },
  { name: "Zentrum (policonsultorios)", category: "Clínicas y Sanatorios", zone: "Zona Norte", locality: "San Martín", address: "San Lorenzo 3391", phone: "4767-3561 / 4847-1095" },
  // Farmacias Zona Norte
  { name: "M & A", category: "Farmacias", zone: "Zona Norte", locality: "Bella Vista", address: "Av. San Martín 404", phone: "4668-2607" },
  { name: "Billinghurst", category: "Farmacias", zone: "Zona Norte", locality: "Billinghurst", address: "Moreno 4106", phone: "4842-9614" },
  { name: "Gigliotti", category: "Farmacias", zone: "Zona Norte", locality: "Caseros", address: "Av. San Martín 2643", phone: "4512-7200 / 3" },
  { name: "Glaser", category: "Farmacias", zone: "Zona Norte", locality: "El Palomar", address: "Misiones 6578", phone: "4751-0509 / 4751-3197" },
  { name: "Iris", category: "Farmacias", zone: "Zona Norte", locality: "Florida (E)", address: "H. Yrigoyen 1756", phone: "4791-2522 / 4795-3480" },
  { name: "Behigo", category: "Farmacias", zone: "Zona Norte", locality: "Hurlingham", address: "Jauretche 999", phone: "4665-0667" },
  { name: "Fijtman", category: "Farmacias", zone: "Zona Norte", locality: "José C. Paz", address: "Av. Pte. Perón 3680", phone: "11-7079-4343" },
  { name: "Pazos", category: "Farmacias", zone: "Zona Norte", locality: "José C. Paz", address: "Pte. Perón 4708", phone: "(02320) 422198 / 429059" },
  { name: "Del Pueblo", category: "Farmacias", zone: "Zona Norte", locality: "Martínez", address: "Alvear 202", phone: "4792-1202 / 8985" },
  { name: "TKL La Perla", category: "Farmacias", zone: "Zona Norte", locality: "Munro", address: "Vélez Sarsfield 4653", phone: "4762-1102" },
  { name: "Cecilia Soria", category: "Farmacias", zone: "Zona Norte", locality: "Pilar", address: "Av. Lagomarsino 1910", phone: "15-7893-7410" },
  { name: "Mietta", category: "Farmacias", zone: "Zona Norte", locality: "Pilar", address: "11 de Septiembre 998", phone: "(0230) 4427565" },
  { name: "Navarro", category: "Farmacias", zone: "Zona Norte", locality: "Navarro", address: "Sarratea 15 (ex T. de Pilar)", phone: "(02241) 426215" },
  { name: "Quinta 46", category: "Farmacias", zone: "Zona Norte", locality: "Pilar", address: "Sor Teresa 169", phone: "11-3760-9873" },
  { name: "Mitre", category: "Farmacias", zone: "Zona Norte", locality: "San Fernando", address: "Constitución 652", phone: "4744-3132" },
  { name: "Fabris", category: "Farmacias", zone: "Zona Norte", locality: "San Isidro", address: "Centenario 448", phone: "4743-1797" },
  { name: "Nueva Pascual", category: "Farmacias", zone: "Zona Norte", locality: "San Martín", address: "Belgrano 3600", phone: "4752-1832 / 4752-2357" },
  { name: "TKL Central S. Miguel", category: "Farmacias", zone: "Zona Norte", locality: "San Miguel", address: "Av. Mitre 1181", phone: "4664-9418 / 4664-6263" },
  { name: "López", category: "Farmacias", zone: "Zona Norte", locality: "Santos Lugares", address: "Av. Rodríguez Peña 1301", phone: "4712-6992" },
  { name: "Sarmiento", category: "Farmacias", zone: "Zona Norte", locality: "Tigre", address: "Cazón 1200", phone: "4749-0643" },
  { name: "Antigua del Águila", category: "Farmacias", zone: "Zona Norte", locality: "Villa Ballester", address: "Alvear 2640", phone: "5222-0410 / 1" },
  { name: "Revelant", category: "Farmacias", zone: "Zona Norte", locality: "Villa Ballester", address: "José Hernández 3000", phone: "4768-0313" },
  { name: "Brzezinski", category: "Farmacias", zone: "Zona Norte", locality: "Villa Martelli", address: "Perú 508", phone: "4730-0703" },
  // Ópticas Zona Norte
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Benavídez", address: "Av. Alvear 3075", phone: "03327-483698" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Martínez", address: "Alvear 375", phone: "4512-2073" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Martínez", address: "Eduardo Costa 1806", phone: "4792-2979 / 11-3774-7289" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "San Isidro", address: "Sucre 1869", phone: "4737-1756" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "San Miguel", address: "Pte. Perón 1645, loc. 13 y 14", phone: "4667-2332 / 11-6609-4676" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "San Miguel", address: "Sarmiento 1660", phone: "4667-5969 / 11-2330-6619" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Vicente López", address: "Av. Maipú 1386", phone: "4791-6460 / 11-2795-5470" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Villa Adelina", address: "Paraná 6292", phone: "4766-8953" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Villa Ballester", address: "Sgto. Cabral 2673", phone: "4768-5515 / 15-6649-8050" },
  { name: "Hipervisión", category: "Ópticas", zone: "Zona Norte", locality: "Villa de Mayo", address: "Presidente Perón 844", phone: "4744-63-7230" },

  /* ============ PROVINCIA DE BUENOS AIRES (interior) — Farmacias ============ */
  { name: "C.E.C.", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Ayacucho", address: "Sarmiento 857", phone: "(02296) 452088 / 451150" },
  { name: "Petruzzelli", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Baradero", address: "San Martín 2125", phone: "(03329) 480577" },
  // Brandsen
  { name: "Dal Buoni", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "San Martín s/n, Jeppener", phone: "(02223) 498353" },
  { name: "Desmoures", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Mitre 309", phone: "(02223) 442567" },
  { name: "Guzmán", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Ituzaingó 882", phone: "(02223) 442497" },
  { name: "Kroeger", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Ituzaingó 1153", phone: "(02223) 443239" },
  { name: "La Torre", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Belloc 153", phone: "(0221) 2204102" },
  { name: "María Esperanza", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Sáenz Peña 1204", phone: "(02223) 443891" },
  { name: "Xamin", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Brandsen", address: "Rivadavia 552", phone: "(02223) 445221" },
  // Cañuelas
  { name: "Nueva Cañuelas", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Cañuelas", address: "Alem 966", phone: "(02226) 432800 / 1" },
  { name: "Nueva Cañuelas Express", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Cañuelas", address: "Av. Libertad 1630", phone: "(02226) 431427" },
  // Campana
  { name: "Del Paraná S.C.S.", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Campana", address: "French 470", phone: "(03489) 437000 / 468030" },
  // Gob. Castro
  { name: "Catalán", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Gob. Castro", address: "Rivadavia y San Martín", phone: "(03329) 493228" },
  { name: "García", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Gob. Castro", address: "San Martín 505", phone: "(03329) 493496" },
  // Junín
  { name: "De Paul de Silva", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Junín", address: "Coronel Suárez 92", phone: "(0236) 4430749" },
  { name: "Del Águila", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Junín", address: "Rivadavia 117", phone: "(0236) 4422049" },
  { name: "Silva", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Junín", address: "C. Pellegrini 396", phone: "(0236) 4421285" },
  // La Plata
  { name: "Ferrando", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "La Plata", address: "Calle 7 N° 51 esq. 33", phone: "(0221) 4257449 / 4832746" },
  { name: "Manes", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "La Plata", address: "Calle 49 N° 636", phone: "(0221) 4250100" },
  { name: "Paladino", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "La Plata", address: "Calle 29 N° 1099 esq. 55", phone: "(0221) 4526254" },
  { name: "Sarti", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "La Plata", address: "Calle 38 N° 751", phone: "(0221) 4233003" },
  // Mar de Ajó / Mar del Plata
  { name: "Antigua Birreci", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Mar de Ajó", address: "Peatonal H. Irigoyen 24", phone: "(02257) 420130" },
  { name: "Luro", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Mar del Plata", address: "Av. Luro 3499", phone: "(0223) 4730287 / 4731103" },
  { name: "Nueva Córdoba", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Mar del Plata", address: "Córdoba 4546", phone: "(0223) 4941294 / 6665" },
  // Mercedes
  { name: "Nueva Palma", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Mercedes", address: "Calle 29 N° 987", phone: "(02324) 422834" },
  // Ramallo / Río Tala
  { name: "Mutual", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Ramallo", address: "Av. Mitre 1115", phone: "(03407) 422677 / 494625" },
  { name: "Lobbe", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Río Tala", address: "Rivadavia y San Martín", phone: "(03407) 432753" },
  // S. A. de Giles
  { name: "Bocassi", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. A. de Giles", address: "Rawson 744", phone: "(02325) 443233" },
  // S. M. del Monte
  { name: "Ancinas", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Sarden e Irigoyen", phone: "(02271) 405592" },
  { name: "Giotti", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Alem 571", phone: "(02271) 406905" },
  { name: "Helmsauer", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Av. Rivadavia 371", phone: "(02271) 405888" },
  { name: "López", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Rivadavia 991", phone: "(02271) 405657" },
  { name: "Moreda", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "San Martín 370", phone: "(02271) 405209" },
  { name: "Moscoloni", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Petracchi 701", phone: "(02271) 405970" },
  { name: "Nueva Monte", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "San Martín 601", phone: "(02271) 442025 / 443398" },
  { name: "Troina", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "S. M. del Monte", address: "Rivadavia 1458", phone: "(02271) 420486" },
  // San Nicolás
  { name: "Coccaro", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Nicolás", address: "Rivadavia 987 bis", phone: "(0336) 4450202" },
  { name: "Nuvo del Pueblo", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Nicolás", address: "Nación 450", phone: "(0336) 4425552" },
  // San Pedro
  { name: "Allegrone", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Mitre 1789", phone: "(03329) 426363" },
  { name: "Antelo", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Mitre 3190", phone: "(03329) 427889" },
  { name: "Barcelo", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Sarmiento 550", phone: "(03329) 491830" },
  { name: "Bella Vita", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "L. Mansilla 199", phone: "(03329) 511217" },
  { name: "Botta", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "3 de Febrero 601", phone: "(03329) 425766" },
  { name: "Carrizo", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Litoral 1080", phone: "(03329) 430669" },
  { name: "Cedraschi", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Av. Sarmiento 1601", phone: "(03329) 426755" },
  { name: "Coliva", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Almafuerte y J. B. Justo", phone: "(03329) 422096" },
  { name: "Grau", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Belgrano 1500", phone: "(03329) 420420" },
  { name: "Gustavo Molina", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "San Martín y Naón", phone: "(03329) 423872" },
  { name: "Hps Pharma", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Ituzaingó 560", phone: "(03329) 341888" },
  { name: "La Central", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "25 de Mayo 802", phone: "(03329) 425253" },
  { name: "Lavagnino", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Dr. Casella 500", phone: "(03329) 423950" },
  { name: "Libertad", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Mitre 2440", phone: "(03329) 426137" },
  { name: "Liliana Martínez", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Almafuerte y Arnaldo", phone: "(03329) 422722" },
  { name: "López", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "E. Frers 320", phone: "(03329) 421320" },
  { name: "Martínez", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Blvr. Moreno 620", phone: "(03329) 426790" },
  { name: "Marzorati", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "3 de Febrero 1201", phone: "(03329) 423988" },
  { name: "Mauro Coliva", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Pellegrini 2250", phone: "(03329) 424003" },
  { name: "Millet", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "25 de Mayo 600", phone: "(03329) 425810" },
  { name: "Molina", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "San Martín 665", phone: "(03329) 426424" },
  { name: "Otero", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Miguel Porta 899", phone: "(03329) 427202" },
  { name: "Pasteur", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "San Martín 150", phone: "(03329) 423838" },
  { name: "Pierdominici", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Sarmiento 390", phone: "(03329) 427302" },
  { name: "Rochetti", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Ayacucho 755", phone: "(03329) 422215" },
  { name: "Rosa", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Pellegrini 1366", phone: "(03329) 423843" },
  { name: "Select", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Mitre 1101 y Moreno", phone: "(03329) 425364" },
  { name: "Taurizano", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Pellegrini 485", phone: "(03329) 425629" },
  { name: "Universal", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Pedro", address: "Pellegrini 1045", phone: "(03329) 425945" },
  // San Vicente / Santa Lucía / Tandil / Zárate
  { name: "Nueva Ocampo", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "San Vicente", address: "Av. Sarmiento 397", phone: "(02225) 482670" },
  { name: "Álvarez", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Santa Lucía", address: "San Martín 498", phone: "(03329) 491550" },
  { name: "A.M.E.M.T.", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Tandil", address: "San Martín 840", phone: "(0249) 4421989 / 4448733" },
  { name: "Silvetti Justa", category: "Farmacias", zone: "Provincia de Buenos Aires", locality: "Zárate", address: "Lima de Atucha 330", phone: "(03487) 422101 / 424611" },
];
