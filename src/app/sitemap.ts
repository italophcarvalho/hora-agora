import type { MetadataRoute } from "next";
import { cityPages, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
    "",
    "/que-horas-sao-agora",
    "/converter-fuso",
    "/calendario",
    "/guia-feriados",
    "/calculadora-idade",
    "/sobre",
    "/privacidade",
    "/contato",
    ...cityPages.map((city) => `/hora-em/${city.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
