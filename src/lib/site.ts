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

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://horaagora.com.br";
}
