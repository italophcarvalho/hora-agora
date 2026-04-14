import type { Metadata } from "next";
import Link from "next/link";
import { CityTimesList } from "@/components/layout/CityTimesList";
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
    href: "/que-horas-sao-agora",
    title: "Que horas sao agora",
    description: "Hora atual no seu fuso horario, detectado automaticamente.",
  },
  {
    href: "/calculadora-idade",
    title: "Calculadora de idade",
    description: "Calcule anos, meses e dias com um resultado simples e rapido.",
  },
  {
    href: "/sobre",
    title: "Sobre o projeto",
    description: "Entenda a proposta do site e como vamos expandir as ferramentas.",
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
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">MVP no ar para validar demanda</p>
          <h1>
            Hora certa, ferramentas uteis e base pronta para crescer com SEO.
          </h1>
          <p className="hero-text">
            O Hora Agora estreia com um nucleo enxuto para publicar hoje:
            relogio em tempo real, pagina de hora atual, calculadora de idade e
            estrutura pronta para receber novas paginas de fuso, datas e
            conteudo.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/que-horas-sao-agora">
              Ver hora atual
            </Link>
            <Link className="secondary-link" href="/calculadora-idade">
              Abrir calculadora de idade
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <span className="panel-label">Hora do seu dispositivo</span>
          <GlobalClock variant="hero" />
          <CityTimesList />
        </aside>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Backlog de hoje</p>
          <h2>O que ja esta online no MVP</h2>
        </div>
        <div className="tool-grid">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card">
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section prose-section">
        <div className="section-heading">
          <p className="section-kicker">Proximo passo pratico</p>
          <h2>Publicar cedo e expandir em ciclos curtos</h2>
        </div>
        <p>
          Este primeiro corte nao tenta entregar todo o PRD. A ideia aqui e
          colocar um site limpo, confiavel e indexavel no ar ainda hoje, para
          que dominio, Search Console, navegacao, branding e paginas legais
          comecem a trabalhar a seu favor imediatamente.
        </p>
        <p>
          Depois do deploy, as proximas entregas mais naturais sao as paginas
          de <strong>hora em cidade</strong>, <strong>conversor de fuso</strong>
          , <strong>calendario</strong> e <strong>feriados</strong>. Elas se
          conectam bem com a estrutura atual e aumentam o potencial organico sem
          exigir refazer o layout.
        </p>
      </section>
    </>
  );
}
