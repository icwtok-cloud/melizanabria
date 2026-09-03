export type Property = {
  slug: string;
  title: string;
  type: string;
  location: string;
  operation: "Venta";
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
    slug: "urquiza-1880",
    title: "Urquiza 1880",
    type: "Departamento a estrenar",
    location: "Santa Fe, Santa Fe",
    operation: "Venta",
    surface: "50 m²",
    rooms: "1 dormitorio",
    baths: "1 baño",
    extra: "Entrega 2026",
    description:
      "Alto Urquiza resalta por su estética contemporánea combinando diseño, calidad y confort. A estrenar, con entrega en 2026 y últimas unidades disponibles. Sobre calle Urquiza, a 200 metros de la Legislatura y a 600 metros de Casa de Gobierno y de la manzana histórica de la ciudad.",
    features: ["Balcón", "Gas natural", "Agua caliente central", "A 200 m de la Legislatura"],
    images: [
      "https://images.mercado-unico.com/mu/image/upload/v1765550772/propiedades/Copia_de_apl8_stories-01_dlkoik.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1765551478/propiedades/WhatsApp_Image_2025-12-12_at_11.56.44_1_gc3qlj.jpg",
    ],
    sourceUrl:
      "https://aplinmobiliaria.com/propiedades/CompraVenta-Santa-Fe-Santa-Fe-urquiza-1880_693c29ec6d0192001148ab1d",
  },
  {
    slug: "general-paz-4700",
    title: "General Paz 4700",
    type: "Cochera en pozo",
    location: "Santa Fe, Santa Fe",
    operation: "Venta",
    extra: "Entrega abril/mayo 2026",
    description:
      "Cochera en venta dentro de un edificio en construcción sobre avenida General Paz, con entrega estimada para abril o mayo de 2026. Una opción de inversión simple para sumar a la cartera o resolver estacionamiento en una zona de alta demanda.",
    features: ["En construcción", "Avenida General Paz", "Alumbrado público y pavimento"],
    images: [
      "https://images.mercado-unico.com/mu/image/upload/v1765551252/propiedades/WhatsApp_Image_2025-12-12_at_11.52.32_wq71um.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1765551252/propiedades/WhatsApp_Image_2025-12-12_at_11.52.31_f8nvj3.jpg",
    ],
    sourceUrl:
      "https://aplinmobiliaria.com/propiedades/CompraVenta-Santa-Fe-Santa-Fe-General-paz-4700_693c2b5d6d0192001148ab2c",
  },
  {
    slug: "ruta-19-km-7-fincas-san-jose",
    title: "RUTA 19 KM 7 · Loteo Fincas San José",
    type: "Terreno",
    location: "Colonia San José, Santa Fe",
    operation: "Venta",
    surface: "600 m² (33 x 17)",
    extra: "Lote 44",
    description:
      "Terreno en venta dentro del loteo Fincas de San José, en una ubicación privilegiada dentro del barrio. 600 m², ideal para vivir rodeado de naturaleza y tranquilidad, a 5 minutos de Santo Tomé y a 12 minutos de Santa Fe por autopista.",
    features: [
      "Plano de mensura",
      "Libre de inhibición, embargo e hipoteca",
      "Alumbrado público y electricidad",
    ],
    images: [
      "https://images.mercado-unico.com/mu/image/upload/v1747739667/propiedades/WhatsApp_Image_2025-04-15_at_17.29.42_kybxdd_msgcq3.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1747739666/propiedades/WhatsApp_Image_2025-03-17_at_13.52.41_w8fveo_wmxtfd_intiey_acdiml_gphcwp_kr6fhi.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1747739667/propiedades/WhatsApp_Image_2025-03-17_at_13.52.42_1_qt41wn_xbstuv_crvj5l_jmdni8_f4ai5u_cqzhuq.jpg",
    ],
    sourceUrl:
      "https://aplinmobiliaria.com/propiedades/CompraVenta-Santa-Fe-Colonia-San-Jose-RUTA-19-KM-7-Loteo-Fincas-San-Jose_67fec5ed17fefb00107d74b7",
  },
  {
    slug: "magnolias-y-fresnos",
    title: "Magnolias y Fresnos",
    type: "Casa",
    location: "Sauce Viejo, Santa Fe",
    operation: "Venta",
    surface: "943,14 m² (42,87 x 22)",
    covered: "341 m² cubiertos",
    rooms: "3 dormitorios",
    baths: "4 baños",
    extra: "Con cochera",
    description:
      "Casa de categoría en excelente barrio de Sauce Viejo. Cuenta con 3 dormitorios, 4 baños, living, cocina-comedor, lavadero, amplio quincho techado con asador, pileta, patio verde, 3 patios de luz y un cuarto de servicio con cocina incluida. Completamente amueblada, con alarma y cámaras.",
    features: ["Pileta", "Quincho con asador", "Alarma y cámaras", "Escritura traslativa de dominio"],
    images: [
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/36_pnhbrf_t6d1b9.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/1_bey0vg_dh5rtv.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/2_texdkm_mhs5h5.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/3_yzovpx_oda9wz.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/9_libuuc_rptz6b.jpg",
      "https://images.mercado-unico.com/mu/image/upload/v1749552992/propiedades/17_voseze_cpzkbu.jpg",
    ],
    sourceUrl: "https://aplinmobiliaria.com/propiedades/Magnolias-y-Fresnos1683759792754",
  },
];

export function getPropertyBySlug(slug: string | null | undefined) {
  if (!slug) return undefined;
  return properties.find((p) => p.slug === slug);
}
