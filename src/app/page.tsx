import type { Metadata } from "next";
import Link from "next/link";
import { GlobalHoursTicker } from "@/components/layout/GlobalHoursTicker";
import { GlobalClock } from "@/components/layout/GlobalClock";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hora Agora no Brasil e no Mundo",
  description:
    "Veja a hora agora, compare cidades importantes e acesse ferramentas de tempo, datas e fusos em um so lugar.",
  alternates: {
    canonical: "/",
  },
};

const featuredTools = [
  {
    href: "/converter-fuso",
    title: "Conversor de Fuso",
    description: "Compare horarios e encontre o ritmo certo entre cidades.",
    meta: "AO VIVO AGORA",
  },
  {
    href: "/calculadora-idade",
    title: "Calculadora de idade",
    description: "Transforme uma data em leitura clara, precisa e elegante.",
    meta: "CALCULO EDITORIAL",
  },
  {
    href: "/calendario",
    title: "Calendario mensal",
    description: "Uma moldura de datas para planejar pausas, agenda e ciclos.",
    meta: "CURADORIA",
  },
  {
    href: "/guia-feriados",
    title: "Guia de feriados",
    description: "Compare proximos feriados e leia a agenda anual de cada pais.",
    meta: "AGENDA GLOBAL",
  },
];

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hora Agora",
    url: getSiteUrl(),
    description: siteConfig.defaultDescription,
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="editorial-hero">
        <div className="shell-width hero-shell">
          <div className="hero-stage">
            <GlobalClock variant="hero" />
            <div className="hero-pill-grid">
              {featuredTools.map((tool) => (
                <Link key={tool.title} href={tool.href} className="hero-pill">
                  <span className="hero-pill-meta">{tool.meta}</span>
                  <strong>{tool.title}</strong>
                  <span className="hero-pill-description">
                    {tool.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalHoursTicker />

      <section className="home-newsletter-section">
        <div className="shell-width home-newsletter-shell">
          <div className="home-newsletter-card">
            <div className="home-newsletter-copy">
              <p className="section-kicker">Newsletter do Tempo</p>
              <h2>
                Receba leituras curtas sobre horario, agenda global e janelas de
                operacao.
              </h2>
              <p>
                Uma secao final objetiva para quem quiser acompanhar o projeto,
                sem competir com o hero nem carregar a home com blocos extras.
              </p>
            </div>

            <form className="home-newsletter-form">
              <label>
                Nome
                <input type="text" placeholder="Seu nome" />
              </label>
              <label>
                E-mail
                <input type="email" placeholder="voce@email.com" />
              </label>
              <button type="submit">INSCREVER-SE</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
