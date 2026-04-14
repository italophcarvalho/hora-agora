export const siteConfig = {
  name: "Hora Agora",
  defaultTitle: "Hora Agora - hora atual, idade e ferramentas de tempo",
  defaultDescription:
    "Site de ferramentas de hora e tempo com foco em publicacao rapida, SEO basico e estrutura pronta para crescer.",
};

export const mainCities = [
  { name: "Sao Paulo", timeZone: "America/Sao_Paulo" },
  { name: "Londres", timeZone: "Europe/London" },
  { name: "Nova York", timeZone: "America/New_York" },
  { name: "Toquio", timeZone: "Asia/Tokyo" },
];

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://horaagora.com.br";
}
