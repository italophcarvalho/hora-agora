export const siteConfig = {
  name: "Hora Agora",
  defaultTitle: "Hora Agora - hora atual, idade e ferramentas de tempo",
  defaultDescription:
    "Site de ferramentas de hora e tempo com foco em publicacao rapida, SEO basico e estrutura pronta para crescer.",
};

export type CityPage = {
  slug: string;
  name: string;
  country: string;
  timeZone: string;
  region: string;
  summary: string;
  marketRole: string;
};

export const mainCities = [
  { name: "Sao Paulo", timeZone: "America/Sao_Paulo" },
  { name: "Londres", timeZone: "Europe/London" },
  { name: "Nova York", timeZone: "America/New_York" },
  { name: "Toquio", timeZone: "Asia/Tokyo" },
];

export const timeZoneOptions = [
  { label: "Sao Paulo", timeZone: "America/Sao_Paulo" },
  { label: "Rio Branco", timeZone: "America/Rio_Branco" },
  { label: "Manaus", timeZone: "America/Manaus" },
  { label: "Nova York", timeZone: "America/New_York" },
  { label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { label: "Cidade do Mexico", timeZone: "America/Mexico_City" },
  { label: "Bogota", timeZone: "America/Bogota" },
  { label: "Buenos Aires", timeZone: "America/Argentina/Buenos_Aires" },
  { label: "Santiago", timeZone: "America/Santiago" },
  { label: "Londres", timeZone: "Europe/London" },
  { label: "Lisboa", timeZone: "Europe/Lisbon" },
  { label: "Madri", timeZone: "Europe/Madrid" },
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "Berlim", timeZone: "Europe/Berlin" },
  { label: "Bruxelas", timeZone: "Europe/Brussels" },
  { label: "Roma", timeZone: "Europe/Rome" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
  { label: "Pequim", timeZone: "Asia/Shanghai" },
  { label: "Toquio", timeZone: "Asia/Tokyo" },
  { label: "Seul", timeZone: "Asia/Seoul" },
  { label: "Singapura", timeZone: "Asia/Singapore" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
  { label: "Auckland", timeZone: "Pacific/Auckland" },
];

export const cityPages: CityPage[] = [
  {
    slug: "sao-paulo",
    name: "Sao Paulo",
    country: "Brasil",
    timeZone: "America/Sao_Paulo",
    region: "America do Sul",
    summary:
      "Centro financeiro do Brasil e referencia principal para operacoes locais, reunioes regionais e coordenacao de mercado.",
    marketRole:
      "Boa ancora para comparar horarios com Europa, Costa Leste dos EUA e hubs latino-americanos.",
  },
  {
    slug: "nova-york",
    name: "Nova York",
    country: "Estados Unidos",
    timeZone: "America/New_York",
    region: "America do Norte",
    summary:
      "Um dos horarios mais consultados do mundo para financeiro, midia, tecnologia e operacoes globais.",
    marketRole:
      "Importante para cruzar agenda com Brasil, Londres e polos americanos no mesmo ciclo de trabalho.",
  },
  {
    slug: "londres",
    name: "Londres",
    country: "Reino Unido",
    timeZone: "Europe/London",
    region: "Europa",
    summary:
      "Ponte operacional entre Americas e Europa, com peso forte em financas, regulacao e coordenacao internacional.",
    marketRole:
      "Ajuda a definir a melhor faixa de sobreposicao entre Brasil, Europa continental e Oriente Medio.",
  },
  {
    slug: "bruxelas",
    name: "Bruxelas",
    country: "Belgica",
    timeZone: "Europe/Brussels",
    region: "Europa",
    summary:
      "Capital politica da Uniao Europeia e um horario sensivel para relacoes institucionais e agenda continental.",
    marketRole:
      "Util para contexto politico, regulatorio e alinhamento com Londres, Dubai e hubs da Asia.",
  },
  {
    slug: "pequim",
    name: "Pequim",
    country: "China",
    timeZone: "Asia/Shanghai",
    region: "Asia Oriental",
    summary:
      "Horario central para agenda chinesa, supply chain, industria e coordenacao com mercados asiaticos.",
    marketRole:
      "Serve de referencia para quem precisa planejar transicoes entre Europa, Oriente Medio e leste asiatico.",
  },
  {
    slug: "toquio",
    name: "Toquio",
    country: "Japao",
    timeZone: "Asia/Tokyo",
    region: "Asia Oriental",
    summary:
      "Hub de tecnologia, industria e financas na Asia, com ritmo proprio e grande distanciamento do horario brasileiro.",
    marketRole:
      "Essencial para decidir janelas de reuniao e handoff entre Brasil, Europa e leste asiatico.",
  },
  {
    slug: "dubai",
    name: "Dubai",
    country: "Emirados Arabes Unidos",
    timeZone: "Asia/Dubai",
    region: "Oriente Medio",
    summary:
      "Hub logistico e financeiro de conexao entre Europa, Asia e operacoes ligadas a energia.",
    marketRole:
      "Bom ponto intermediario para negociar janelas entre Europa continental, Reino Unido e Asia.",
  },
];

export function getCityPageBySlug(slug: string) {
  return cityPages.find((city) => city.slug === slug);
}

export function getRelatedCityPages(slug: string, limit = 4) {
  return cityPages.filter((city) => city.slug !== slug).slice(0, limit);
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://horaagora.com.br";
}
