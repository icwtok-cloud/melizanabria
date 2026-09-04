export type Property = {
  slug: string;
  title: string;
  type: string;
  location: string;
  operation: "Venta";
  price?: string;
  surface?: string;
  covered?: string;
  rooms?: string;
  baths?: string;
  extra?: string;
  description: string;
  features: string[];
  images: string[];
  sourceUrl: string;
};

export const properties: Property[] = [
  {
    slug: "roverano-saavedra",
    title: "Roverano esquina Saavedra",
    type: "Terreno en esquina",
    location: "Adelina Centro, Santo Tomé",
    operation: "Venta",
    price: "USD 11.500",
    surface: "200 m² (10 x 20)",
    extra: "Listo para escriturar",
    description:
      "Terreno en venta en Santo Tomé, ubicado en esquina entre calles Roverano y Saavedra. Ideal para construir tu primera vivienda: terreno irregular en ochava con 200 m² de superficie, en una zona tranquila y de fácil acceso. Documentación al día y listo para escriturar.",
    features: ["Alumbrado público", "Electricidad", "Agua corriente", "Escritura traslativa de dominio"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1748465486/propiedades/WhatsApp_Image_2025-05-28_at_3.55.45_PM_o7njlp_as1l7c_nenttw.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/683755de7da090001119cd1c",
  },
  {
    slug: "av-freyre-2831",
    title: "Av. Freyre 2831",
    type: "Casa a refaccionar",
    location: "República del Oeste, Santa Fe",
    operation: "Venta",
    price: "USD 73.000",
    surface: "147 m² de terreno",
    rooms: "3 dormitorios",
    baths: "2 baños",
    extra: "Reposicionada · propiedad interna (no PH)",
    description:
      "Propiedad interna (no PH) a refaccionar sobre una de las avenidas más importantes de la ciudad. Ideal para quienes buscan personalizar cada espacio o invertir con visión de futuro. Cuenta con hall de ingreso, patio seco, 3 dormitorios, baño principal, cocina-comedor, lavadero cubierto y baño de servicio. No cuenta con gas natural.",
    features: ["Electricidad", "Pavimento", "Cloacas", "Agua corriente", "Plano de edificación"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1758210357/propiedades/WhatsApp_Image_2025-09-18_at_12.27.42_PM_1_zuyiha.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/68cc2843ff8cf10010a46018",
  },
  {
    slug: "4-de-enero-4229",
    title: "4 de Enero 4229",
    type: "Departamento",
    location: "Barranquitas, Santa Fe",
    operation: "Venta",
    price: "USD 63.000",
    covered: "43,99 m² cubiertos",
    rooms: "1 dormitorio",
    baths: "1 baño",
    extra: "Apto crédito · bajas expensas · alquilado",
    description:
      "Zona Jerárquicos, a 5 cuadras de la Facultad de Abogacía y a una de Facundo Zuviria. Amplios ambientes, buena conservación, ventilación cruzada y muy buena iluminación natural. Primer piso por escalera, con cocina-comedor-living integrados, dormitorio con placard empotrado y balcón al frente, baño completo y patio con alero y lavadero. Actualmente alquilado, con una renta mensual de $460.000 — una excelente oportunidad de inversión.",
    features: ["Apto crédito", "Bajas expensas", "Balcón", "Gas natural", "Alquilado (renta activa)"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1785764086/propiedades/jfp-12_z0j6xj.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/6a709543714582219101f9f0",
  },
  {
    slug: "paraje-los-jacintos",
    title: "Paraje Los Jacintos · Sobre el río",
    type: "Quinta",
    location: "Alejandra, Santa Fe",
    operation: "Venta",
    surface: "1.300 m² de terreno (20 x 65)",
    covered: "112 m² cubiertos",
    rooms: "2 dormitorios",
    baths: "1 baño",
    extra: "Frente al río",
    description:
      "Casa frente al río en el paraje Los Jacintos, a 20 km antes de la ciudad de Alejandra por la ruta 1 (se llega en auto hasta unos 300 m de la costa). Zona no inundable y arbolada, con luz eléctrica, agua caliente y posibilidad de conexión a internet. Cocina-comedor, living con hogar, dos dormitorios, baño completo y galería abierta en los dos frentes de la casa. Además, por separado, quincho con parrilla amplia cerrado y dos habitaciones de depósito. Se vende amueblada, con cocina y heladera incluidas. Con espacio para invertir en cabañas y/o guardería de lanchas.",
    features: ["Electricidad", "Zona no inundable", "Se vende amueblada", "Espacio para cabañas o guardería náutica"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1787233514/propiedades/WhatsApp_Image_2026-08-20_at_9.07.41_AM_2_i32pci.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/6a87037bea1610ed66c80ead",
  },
  {
    slug: "bygger-soul-colastine",
    title: "Bygger Soul · Lote 11",
    type: "Terreno en loteo",
    location: "Colastiné, Santa Fe",
    operation: "Venta",
    price: "USD 19.000 · acepta financiación",
    surface: "220 m² (13 x 17)",
    extra: "A 7 minutos de Santa Fe",
    description:
      "Lote en venta en el barrio Bygger Soul, Colastiné — Lote N° 11, a solo 7 minutos de Santa Fe. La oportunidad ideal para dar el primer paso hacia tu hogar propio: un espacio pensado para construir tu vivienda rodeado de naturaleza, en un entorno tranquilo y seguro, con la cercanía de la ciudad a minutos. Seguridad planificada con portón automático, espacio para personal de vigilancia, iluminación LED y columnas para cámaras de monitoreo. Se vende por cesión.",
    features: ["Portón automático", "Seguridad planificada", "Iluminación LED", "Acepta financiación"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1758803428/propiedades/bigger_soul_ujzonf.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/68d530143506c30011b66b4e",
  },
  {
    slug: "monsenor-zaspe-monte-vera",
    title: "Monseñor Zaspe 5409",
    type: "Casa",
    location: "Setúbal, Monte Vera",
    operation: "Venta",
    price: "USD 115.000",
    surface: "512 m² de terreno",
    covered: "205 m² cubiertos",
    rooms: "3 dormitorios",
    baths: "3 baños",
    extra: "Cochera · ingreso exclusivo",
    description:
      "Ingreso exclusivo en Monte Vera. Ubicada en esquina y a una cuadra de la ruta, esta propiedad ofrece una cómoda vivienda desarrollada íntegramente en planta baja, con ambientes amplios, luminosos y muy bien ventilados. Cuenta con tres dormitorios, dos baños, amplio living, cocina separada y cochera. La galería techada con asador se integra al patio verde, creando un espacio ideal para disfrutar al aire libre. Como valor agregado, posee un salón completamente independiente con baño y dos ambientes — ¡y espacio para desarrollar tu emprendimiento desde casa!",
    features: ["Cochera", "Patio verde", "Salón independiente", "Plano de mensura", "Escritura traslativa de dominio"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1781099533/propiedades/Monsenor_Zaspe_5409_-_Monte_Vera_-_APL_-_12_hjekeo.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/6a296a4601b48e310cb92ae6",
  },
  {
    slug: "cordoba-2444-cochera",
    title: "Córdoba 2444",
    type: "Cochera semicubierta",
    location: "Fomento 9 de Julio, Santa Fe",
    operation: "Venta",
    price: "USD 12.000",
    extra: "Con renta activa: $110.000/mes",
    description:
      "Cochera semicubierta en venta sobre calle Córdoba, a media cuadra de Aristóbulo del Valle. Cuenta con portón de acceso automatizado y cámaras, lo que brinda mayor seguridad y comodidad para el ingreso y egreso del vehículo. Ideal tanto para uso propio como para inversión en una zona con alta demanda de estacionamiento. Genera ingresos desde el primer día: baja inversión, alta demanda.",
    features: ["Portón automático", "Cámaras de seguridad", "Renta activa mensual", "Se vende por cesión"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1777040570/propiedades/WhatsApp_Image_2026-04-24_at_11.09.48_AM_2_tpejle.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/69eb7c63d79d3c0da932c03b",
  },
  {
    slug: "country-nuevos-aires-barrio-6",
    title: "Country Nuevos Aires · Barrio 6 \"La Manza\"",
    type: "Terreno en country",
    location: "La Mansa, Santo Tomé",
    operation: "Venta",
    extra: "6 lotes disponibles · consultar precio por unidad",
    surface: "Desde 1.000 m²",
    description:
      "Seis lotes en venta dentro del Country Nuevos Aires, Barrio N° 6 \"La Manza\", a solo 5 minutos de la ciudad de Santa Fe. Ideal para inversión o vivienda. El country cuenta con canchas de fútbol y tenis, SUM con piscina, espacios verdes, parques y lagunas, planta de tratamiento cloacal y vigilancia monitoreada las 24 horas. Consultá los precios de cada unidad.",
    features: ["Canchas de fútbol y tenis", "SUM con piscina", "Vigilancia 24 hs", "Libre de inhibición, embargo e hipoteca"],
    images: [
      "https://images.mercado-unico.com/mu/c_thumb,g_auto/dpr_1.0,w_auto/c_limit,w_1600/q_auto:eco/f_auto/v1765998099/propiedades/PLANO_BARRIO_6_152025_pekuxr.jpg",
    ],
    sourceUrl: "https://www.mercado-unico.com/propiedades/6896c4643b3f8e00119aa29a",
  },
];

export function getPropertyBySlug(slug: string | null | undefined) {
  if (!slug) return undefined;
  return properties.find((p) => p.slug === slug);
}
