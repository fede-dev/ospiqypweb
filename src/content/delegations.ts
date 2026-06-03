/**
 * Delegaciones nacionales de OSPIQYP.
 * Datos tomados del Resumen de Cartilla 2026 (sección "Delegaciones").
 */

export type Delegation = {
  id: string;
  city: string;
  province: string;
  provinceCode: string; // código CA para integración futura
  address?: string;
  phone?: string;
  email?: string;
};

export const DELEGATIONS: Delegation[] = [
  // CABA
  {
    id: "caba",
    city: "Sede Central (CABA)",
    province: "Ciudad de Buenos Aires",
    provinceCode: "C",
    address: "México 1474",
    phone: "(011) 5275-2270",
    email: "info@ospiqyp.org.ar",
  },

  // Buenos Aires
  {
    id: "florencio-varela",
    city: "Florencio Varela",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Lavalle 126",
    email: "afiliadosvarela@gmail.com",
  },
  {
    id: "moreno",
    city: "Moreno",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Tte. Oscar Camilli 168",
    phone: "(011) 2375-8477",
    email: "zonaoestesindical@gmail.com",
  },
  {
    id: "san-miguel-del-monte",
    city: "San Miguel del Monte",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Laura Giagnacovo 505",
    phone: "(02271) 40-9353",
    email: "sindicatoquimicosabbott@hotmail.com",
  },
  {
    id: "la-plata",
    city: "La Plata",
    province: "Buenos Aires",
    provinceCode: "B",
    phone: "(0221) 15610-7126",
    email: "ospiqypdellaplata@gmail.com",
  },
  {
    id: "san-martin",
    city: "San Martín",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Lincoln 4345",
    phone: "(011) 7398-0429",
    email: "obrasocial43@gmail.com",
  },
  {
    id: "monte-grande",
    city: "Monte Grande",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Arana 225",
    phone: "(011) 2073-2753",
  },
  {
    id: "san-nicolas",
    city: "San Nicolás",
    province: "Buenos Aires",
    provinceCode: "B",
    address: "Necochea 258",
    phone: "(03364) 43-1762",
    email: "stiqyp258@hotmail.com",
  },

  // Catamarca
  {
    id: "catamarca",
    city: "Catamarca",
    province: "Catamarca",
    provinceCode: "K",
    address: "Prado 107",
    phone: "(0383) 15422-7329",
    email: "ivana338@hotmail.com",
  },

  // Córdoba
  {
    id: "cordoba",
    city: "Córdoba",
    province: "Córdoba",
    provinceCode: "X",
    address: "Pasaje Oliver 46",
    phone: "(0351) 423-5696",
    email: "spiq_cba@hotmail.com",
  },
  {
    id: "rio-tercero",
    city: "Río Tercero",
    province: "Córdoba",
    provinceCode: "X",
    address: "Hipólito Yrigoyen 908",
    phone: "(03571) 64-0264",
    email: "ospiqyprio3@live.com.ar",
  },

  // Entre Ríos
  {
    id: "concordia",
    city: "Concordia",
    province: "Entre Ríos",
    provinceCode: "E",
    address: "Urdinarrain 105",
    phone: "(0345) 421-3366",
    email: "ospiqypconcordia@gmail.com",
  },
  {
    id: "gualeguaychu",
    city: "Gualeguaychú",
    province: "Entre Ríos",
    provinceCode: "E",
    address: "López y Planes 180",
    email: "ospiqyp_gchu@hotmail.com",
  },

  // Formosa
  {
    id: "formosa",
    city: "Formosa",
    province: "Formosa",
    provinceCode: "P",
    address: "Paraguay 12 este",
    phone: "(0370) 443-2226",
    email: "ospiqypdlgformosa@gmail.com",
  },

  // Jujuy
  {
    id: "jujuy",
    city: "San Salvador de Jujuy",
    province: "Jujuy",
    provinceCode: "Y",
    address: "E. Carriego 273, Bº 23 de Agosto",
    phone: "(0388) 447-1877",
    email: "sandraivone47@gmail.com",
  },

  // Mendoza
  {
    id: "gral-gutierrez",
    city: "Gral. Gutiérrez",
    province: "Mendoza",
    provinceCode: "M",
    address: "Hipólito Yrigoyen 5 y Juan Giol",
    phone: "(0261) 497-2401",
    email: "vivianagomez@live.com",
  },
  {
    id: "palmira",
    city: "Palmira",
    province: "Mendoza",
    provinceCode: "M",
    address: "Tiburcio Benegas 121 esq. San Martín",
    phone: "(0263) 446-3933",
    email: "sandramaria29cb@gmail.com",
  },

  // Río Negro
  {
    id: "san-antonio-oeste",
    city: "San Antonio Oeste",
    province: "Río Negro",
    provinceCode: "R",
    address: "Pablo Torello 580",
    email: "spiqypsanantonio@hotmail.com",
  },

  // Salta
  {
    id: "campo-quijano",
    city: "Campo Quijano",
    province: "Salta",
    provinceCode: "A",
    address: "Las Lomitas s/n",
    phone: "(0387) 490-4932",
    email: "caronebreda@hotmail.com",
  },

  // San Juan
  {
    id: "san-juan",
    city: "San Juan",
    province: "San Juan",
    provinceCode: "J",
    address: "Av. Rioja 72 Sur",
    phone: "(0264) 447-7388",
    email: "soqasanjuan@yahoo.com.ar",
  },

  // Santa Fe
  {
    id: "capitan-bermudez",
    city: "Capitán Bermúdez",
    province: "Santa Fe",
    provinceCode: "S",
    address: "Av. San Lorenzo 1345",
    phone: "(0341) 478-3703",
    email: "ospiqypcbermudez@hotmail.es",
  },
  {
    id: "rosario",
    city: "Rosario",
    province: "Santa Fe",
    provinceCode: "S",
    address: "Presidente Roca 1815",
    phone: "(0341) 481-0279",
    email: "sindicatoqp@hotmail.com",
  },
  {
    id: "santa-fe",
    city: "Santa Fe",
    province: "Santa Fe",
    provinceCode: "S",
    address: "Moreno 1902",
    phone: "(0342) 559-8068",
    email: "sindpersindquim@gmail.com",
  },
];
