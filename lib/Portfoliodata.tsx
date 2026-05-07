const imagen1 = "/demos/box.png";
const imagen2 = "/demos/ceremonias.png";
const imagen3 = "/demos/clinica.png";
const imagen4 = "/demos/cm.png";
const imagen5 = "/demos/courier.png";
const imagen6 = "/demos/dj.png";
const imagen7 = "/demos/italiano.png";
const imagen8 = "/demos/metal.png";
const imagen9 = "/demos/ojeda.png";
const imagen10 = "/demos/portfolioji.png";
const imagen11 = "/demos/steel-metal.png";
const imagen12 = "/demos/steel.png";
const imagen13 = "/demos/tecno.png";
const imagen14 = "/demos/vinoteca.png";
const imagen15 = "/demos/wanfix.png";
const imagen16 = "/demos/yanina.png";
const imagen17 = "/demos/venue.png"; 
const imagen18 = "/demos/festiland.png"; 



export type CategoryKey =
  | "all"
  | "construction"
  | "home_outdoor"
  | "legal_finance"
  | "health"
  | "wellness"
  | "beauty"
  | "education"
  | "events"
  | "food"
  | "retail"
  | "services"
  | "industrial"
  | "automotive"
  | "real_estate"
  | "corporate"
  | "personal_brand";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  all: "Todas",
  construction: "Construcción e Ingeniería",
  home_outdoor: "Hogar, Piscinas y Outdoor",
  legal_finance: "Legal, Contable y Finanzas",
  health: "Salud y Medicina",
  wellness: "Bienestar y Terapias",
  beauty: "Belleza y Estética",
  education: "Educación y Formación",
  events: "Eventos y Organización",
  food: "Gastronomía",
  retail: "Comercio y Tiendas",
  services: "Servicios Profesionales",
  industrial: "Industria y Técnicos",
  automotive: "Automotor y Transporte",
  real_estate: "Inmobiliaria y Desarrollos",
  corporate: "Empresas y Corporativo",
  personal_brand: "Marca Personal y Portfolio",
};

export type DemoItem = {
  title: string;
  categoryKey: Exclude<CategoryKey, "all">;
  href: string;
  cover: string;
  tags?: string[];
  summary?: string;
};

export const demos: DemoItem[] = [
  {
    title: "Steel Frame — Landing Premium",
    categoryKey: "construction",
    href: "https://steel-frame-builders.vercel.app/",
    cover: imagen12,
    tags: ["Alta conversión", "WhatsApp"],
    summary: "Optimizado para empresas de construcción en San Juan.",
  },
  {
    title: "Construcciones",
    categoryKey: "construction",
    href: "https://mcmconstrucciones.vercel.app/",
    cover: imagen9,
    tags: ["Llave en mano", "Formulario"],
    summary: "Servicios, proceso y calificador de lead.",
  },
  {
    title: "Idiomas — Aprende Italiano",
    categoryKey: "education",
    href: "https://academia-idiomas-mcm.vercel.app/",
    cover: imagen7,
    tags: ["Idioma", "Confianza"],
    summary: "Hablá italiano desde la primera clase.",
  },
  {
    title: "Portfolio — CV Digital",
    categoryKey: "personal_brand",
    href: "https://juannaveda.vercel.app/",
    cover: imagen10,
    tags: ["CV", "Portfolio"],
    summary: "Soluciones técnicas, prolijas y medibles.",
  },
  {
    title: "Yanina Sarmiento Estética",
    categoryKey: "beauty",
    href: "https://yaninasarmiento.com.ar/",
    cover: imagen16,
    tags: ["Estética", "Belleza", "Agenda"],
    summary: "Estudio profesional de estética (Buenos Aires).", 
  },
  {
    title: "Tecno",
    categoryKey: "retail",
    href: "https://tecno-l24.vercel.app/",
    cover: imagen13,
    tags: ["Tecnología", "Servicios"],
    summary: "Servicio técnico especializado para floristerías.",
  },
  {
    title: "DJ",
    categoryKey: "events",
    href: "https://dj-l24.vercel.app/",
    cover: imagen6,
    tags: ["DJ", "Eventos", "Música"],
    summary: "Productor y DJ para fiestas y eventos.",
  },
  {
    title: "Courier",
    categoryKey: "services",
    href: "https://courier-l24.vercel.app/",
    cover: imagen5,
    tags: ["Courier", "Logística", "Exportación"],
    summary: "Servicio de courier y comercio exterior.",
  },
  {
    title: "Ceremonias",
    categoryKey: "events",
    href: "https://ceremonias-l24.vercel.app/",
    cover: imagen2,
    tags: ["Ceremonias", "Bodas", "Laicas"],
    summary: "Oficiante profesional de ceremonias elegantes.",
  },
  {
    title: "App Transporte",
    categoryKey: "automotive",
    href: "https://apptransporte-l24.vercel.app/",
    cover: imagen15,
    tags: ["Transporte", "Logística", "Mendoza"],
    summary: "Logística inteligente con alcance en toda la región de Cuyo.", 
  },
  {
    title: "Baulera",
    categoryKey: "services",
    href: "https://baulera-l24.vercel.app/",
    cover: imagen1,
    tags: ["Seguridad", "Alarmas", "Monitoreo"],
    summary: "Protección total para tu hogar y negocio.",
  },
  {
    title: "Vinoteca de Autor",
    categoryKey: "food",
    href: "https://vinoteca-l24.vercel.app/",
    cover: imagen14,
    tags: ["Vinos", "Gastronomía", "Premium"],
    summary: "E-commerce exclusivo para bodegas y vinotecas boutique.",
  },
  {
    title: "Centro Salud Mental",
    categoryKey: "health",
    href: "https://clinicamental-l24.vercel.app/",
    cover: imagen3,
    tags: ["Salud Mental", "Terapias", "Bienestar"],
    summary: "Espacio dedicado a tu salud mental.",
  },
  {
    title: "Constructora",
    categoryKey: "construction",
    href: "https://constructora-l24.vercel.app/",
    cover: imagen8,
    tags: ["Construcción", "Desarrollos", "Steel Frame"],
    summary: "Constructora desarrollista premium en Córdoba.",
  },
  {
    title: "Carlos Mansilla",
    categoryKey: "personal_brand",
    href: "https://carlosmansilla.com.ar/",
    cover: imagen4,
    tags: ["Growth Manager", "Project Manager", "Portfolio"],
    summary: "Growth & Project Manager profesional.",
  },
  {
    title: "Steel Solutions",
    categoryKey: "construction",
    href: "https://steel-l24.vercel.app/",
    cover: imagen11,
    tags: ["Steel Frame", "Construcción", "Ingeniería"],
    summary: "Soluciones integrales en steel frame.",
  },
  {
    title: "VENUE Salon de Eventos",
    categoryKey: "events",
    href: "https://venue-l24.vercel.app/",
    cover: imagen17,
    tags: ["Eventos", "Sociales", "Premium"],
    summary: "Landing de alta conversión para salones y eventos exclusivos.",
  },
  {
    title: "FESTILAND Salón de Fiestas",
    categoryKey: "events",
    href: "https://festiland-l24.vercel.app/",
    cover: imagen18,
    tags: ["Infantiles", "Reservas", "Diversión"],
    summary: "Sistema de reservas online para salones infantiles.",
  },
];