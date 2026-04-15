import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityTimeSpotlightView } from "@/components/tools/CityTimeSpotlightView";
import {
  cityPages,
  getCityPageBySlug,
  getRelatedCityPages,
  getSiteUrl,
} from "@/lib/site";

type CityPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return cityPages.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityPageBySlug(slug);

  if (!city) {
    return {
      title: "Cidade nao encontrada",
    };
  }

  return {
    title: `Que horas sao em ${city.name}`,
    description: `Veja a hora atual em ${city.name}, ${city.country}, compare o fuso com o Brasil e encontre as melhores janelas para agenda internacional.`,
    alternates: {
      canonical: `/hora-em/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityPageBySlug(slug);

  if (!city) {
    notFound();
  }

  const relatedCities = getRelatedCityPages(city.slug, 4);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Hora em ${city.name}`,
    url: `${getSiteUrl()}/hora-em/${city.slug}`,
    description: city.summary,
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <CityTimeSpotlightView
        city={city.name}
        country={city.country}
        timeZone={city.timeZone}
        marketRole={city.marketRole}
      />

      <section className="city-page-section">
        <div className="shell-width city-page-stack">
          <section className="city-page-block">
            <div className="section-heading">
              <p className="page-kicker">Contexto da cidade</p>
              <h2>{city.name} como referencia de agenda global.</h2>
            </div>

            <div className="city-page-grid">
              <article className="city-page-card">
                <span className="tool-card-meta">Resumo</span>
                <p>{city.summary}</p>
              </article>

              <article className="city-page-card">
                <span className="tool-card-meta">Regiao</span>
                <strong>{city.region}</strong>
                <p>
                  Essa pagina ajuda a ler o horario de {city.name} com rapidez
                  para operacoes, calls e coordenacao entre regioes.
                </p>
              </article>

              <article className="city-page-card">
                <span className="tool-card-meta">Melhor uso</span>
                <p>{city.marketRole}</p>
              </article>
            </div>
          </section>

          <section className="city-page-block">
            <div className="section-heading">
              <p className="page-kicker">Proximos horarios</p>
              <h2>Outras cidades para comparar a seguir.</h2>
            </div>

            <div className="city-links-grid">
              {relatedCities.map((relatedCity) => (
                <Link
                  key={relatedCity.slug}
                  href={`/hora-em/${relatedCity.slug}`}
                  className="city-link-card"
                >
                  <span className="tool-card-meta">{relatedCity.country}</span>
                  <h3>{relatedCity.name}</h3>
                  <p>{relatedCity.marketRole}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
