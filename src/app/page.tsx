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
    href: "/privacidade",
    title: "Guia de feriados",
    description: "Uma moldura de datas para planejar pausas e janelas de foco.",
    meta: "CURADORIA",
  },
  {
    href: "/contato",
    title: "Pomodoro Pro",
    description: "Um compasso de trabalho para estudo, escrita e execucao.",
    meta: "ROTINA",
  },
];

const metrics = [
  { value: "500+", label: "cidades mapeadas" },
  { value: "32", label: "fusos observados" },
  { value: "12M", label: "leituras previstas" },
  { value: "0ms", label: "atraso visual alvo" },
];

const categoryRail = [
  "Fuso",
  "UTC",
  "Mercados",
  "Agenda",
  "Calendario",
  "Mapas",
  "Jet lag",
  "Planejamento",
];

const briefs = [
  "Fusos da Lua Gaia Complete para 2026",
  "O fim do horario de verao impacta reunioes",
  "Mercados globais e janelas ideais para operacao",
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

      <section className="category-rail">
        <div className="shell-width category-rail-row">
          {categoryRail.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="metrics-section">
        <div className="shell-width metrics-grid">
          {metrics.map((item) => (
            <article key={item.label} className="metric-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section">
        <div className="shell-width">
          <div className="section-heading section-heading-wide">
            <div>
              <p className="section-kicker">Curadoria de Precisao</p>
              <h2>Ferramentas com textura de revista e leitura de produto.</h2>
            </div>
            <div className="section-arrows" aria-hidden="true">
              <span>{"<"}</span>
              <span>{">"}</span>
            </div>
          </div>
          <div className="tool-grid editorial-grid">
            {featuredTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="tool-card">
                <span className="tool-card-meta">{tool.meta}</span>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="tool-card-link">ACESSAR AGORA</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="shell-width story-grid">
          <article className="feature-story-card">
            <div className="feature-visual">
              <div className="watch-orb">
                <div className="watch-core" />
              </div>
            </div>
            <div className="feature-copy">
              <h3>Por que o tempo e o ativo mais valioso do seculo XXI?</h3>
              <p>
                Um bloco editorial grande para abrir espaco a conteudo premium,
                comparativos e contexto de agenda.
              </p>
            </div>
          </article>

          <article className="briefs-card">
            {briefs.map((brief) => (
              <Link key={brief} href="/sobre" className="brief-item">
                {brief}
              </Link>
            ))}
          </article>

          <aside className="story-side">
            <div className="aside-card glass-card">
              <span className="aside-label">Cidades em foco</span>
              <CityTimesList />
            </div>
            <div className="aside-card newsletter-card">
              <span className="aside-label">Newsletter do Tempo</span>
              <h3>Insights semanais sobre agenda, fusos e previsao.</h3>
              <p>
                Um bloco pronto para capturar interesse sem quebrar a calma do
                layout editorial.
              </p>
              <div className="newsletter-form-shell">
                <input type="email" placeholder="seu@email.com" />
                <button type="button">INSCREVER-SE</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
