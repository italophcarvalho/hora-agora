import type { Metadata } from "next";
import Link from "next/link";
import { TimezoneConverter } from "@/components/tools/TimezoneConverter";
import { WorldHubTimes } from "@/components/tools/WorldHubTimes";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conversor de fuso horario",
  description:
    "Compare o horario atual entre cidades relevantes, veja a diferenca entre fusos e acompanhe centros globais em tempo real.",
  alternates: {
    canonical: "/converter-fuso",
  },
};

const faqItems = [
  {
    question: "Como o conversor de fuso funciona?",
    answer:
      "Voce escolhe o fuso de origem e o de destino. A ferramenta mostra o horario atual nas duas cidades e calcula a diferenca entre elas em tempo real.",
  },
  {
    question: "Ele considera horario de verao?",
    answer:
      "Sim. A conversao usa a base de fusos do proprio navegador, entao as mudancas sazonais entram automaticamente quando existem.",
  },
  {
    question: "Posso usar para reunioes internacionais?",
    answer:
      "Sim. Ele e ideal para validar rapidamente em que parte do dia cada cidade esta antes de marcar uma chamada, entrega ou operacao internacional.",
  },
];

const howToSteps = [
  {
    title: "Escolha a origem",
    description:
      "Comece pela cidade que representa seu horario de referencia para trabalho, embarque ou reuniao.",
  },
  {
    title: "Compare com o destino",
    description:
      "Troque o segundo seletor para a outra ponta da conversa e veja a diferenca aplicada ao instante atual.",
  },
  {
    title: "Decida a janela",
    description:
      "Use a leitura cruzada para validar se o horario cai em expediente, transicao ou periodo sensivel.",
  },
];

const marketRows = [
  { route: "Sao Paulo -> Londres", delta: "+4h", reading: "Europa abre antes" },
  { route: "Sao Paulo -> Nova York", delta: "+1h", reading: "Janela ainda proxima" },
  { route: "Londres -> Pequim", delta: "+7h", reading: "Asia ja em outro turno" },
  { route: "Bruxelas -> Dubai", delta: "+2h", reading: "Ponte euro-mena eficiente" },
];

const meetingWindows = [
  {
    label: "Janela equilibrada",
    title: "13h a 15h Brasil",
    description:
      "Boa sobreposicao entre Sao Paulo, Nova York e parte final do expediente em Londres.",
  },
  {
    label: "Europa + Oriente Medio",
    title: "9h a 11h Londres",
    description:
      "Intervalo eficiente para alinhar times entre Bruxelas, Londres e Dubai sem empurrar demais a noite.",
  },
  {
    label: "Americas + Asia",
    title: "20h Brasil / 8h Toquio",
    description:
      "Faixa mais dura, mas util quando Asia precisa entrar no inicio do expediente local.",
  },
];

const businessRegions = [
  {
    region: "Americas",
    window: "09:00 - 18:00",
    note: "Melhor para operacoes Brasil, Costa Leste e mercados latino-americanos.",
  },
  {
    region: "Europa",
    window: "08:00 - 17:00",
    note: "Faixa decisiva para financeiro, regulatorio e coordenacao institucional.",
  },
  {
    region: "Asia Oriental",
    window: "09:00 - 18:00",
    note: "Importante para supply chain, tecnologia e execucao industrial.",
  },
  {
    region: "Oriente Medio",
    window: "09:00 - 18:00",
    note: "Relevante para energia, logistica e hubs intermediarios de conexao.",
  },
];

const popularComparisons = [
  "Brasil x Londres",
  "Brasil x Nova York",
  "Londres x Dubai",
  "Bruxelas x Pequim",
  "Sao Paulo x Toquio",
  "Nova York x Pequim",
];

const relatedTools = [
  {
    href: "/que-horas-sao-agora",
    meta: "Ao vivo",
    title: "Hora atual",
    description: "Pagina direta para consulta de horario em tempo real.",
  },
  {
    href: "/calculadora-idade",
    meta: "Calculo",
    title: "Calculadora de idade",
    description: "Ferramenta paralela para datas, diferencas e intervalos.",
  },
  {
    href: "/contato",
    meta: "Proxima expansao",
    title: "Pecas paginas por cidade",
    description: "Abra pedidos de rotas como hora em Nova York, Londres ou Dubai.",
  },
];

export default function TimezoneConverterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: `${getSiteUrl()}/converter-fuso`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="tool-focus-hero">
        <div className="shell-width tool-focus-shell">
          <TimezoneConverter />
        </div>
      </section>

      <section className="world-hubs-section">
        <div className="shell-width world-hubs-shell">
          <div className="section-heading">
            <p className="page-kicker">Centros globais em foco</p>
            <h2>Seis horarios que mais influenciam a agenda internacional.</h2>
          </div>

          <WorldHubTimes />
        </div>
      </section>

      <section className="converter-sections">
        <div className="shell-width converter-stack">
          <section className="converter-block converter-block-dark">
            <div className="section-heading section-heading-wide">
              <div>
                <p className="page-kicker">Leitura rapida</p>
                <h2>Como usar o conversor sem perder tempo operacional.</h2>
              </div>
            </div>

            <div className="steps-grid">
              {howToSteps.map((step, index) => (
                <article key={step.title} className="step-card">
                  <span className="step-index">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>

            <div className="faq-panel">
              <div>
                <p className="page-kicker">Perguntas frequentes</p>
                <h3>Base essencial para leitura imediata.</h3>
              </div>

              <ul className="calculator-faq">
                {faqItems.map((item) => (
                  <li key={item.question}>
                    <strong>{item.question}</strong> {item.answer}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="converter-block">
            <div className="section-heading">
              <p className="page-kicker">Mercados-chave</p>
              <h2>Diferencas que mais pesam em operacao, call e decisao.</h2>
            </div>

            <div className="market-table">
              {marketRows.map((row) => (
                <article key={row.route} className="market-row">
                  <strong>{row.route}</strong>
                  <span>{row.delta}</span>
                  <p>{row.reading}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="converter-block">
            <div className="section-heading">
              <p className="page-kicker">Agenda global</p>
              <h2>Janelas que tendem a funcionar melhor para reunioes internacionais.</h2>
            </div>

            <div className="window-grid">
              {meetingWindows.map((window) => (
                <article key={window.title} className="window-card">
                  <span className="window-label">{window.label}</span>
                  <h3>{window.title}</h3>
                  <p>{window.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="converter-block">
            <div className="section-heading section-heading-wide">
              <div>
                <p className="page-kicker">Expediente por regiao</p>
                <h2>Horario comercial para leitura rapida de contexto.</h2>
              </div>
              <div className="comparison-tags">
                {popularComparisons.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="regional-grid">
              {businessRegions.map((region) => (
                <article key={region.region} className="regional-card">
                  <span className="regional-kicker">{region.region}</span>
                  <strong>{region.window}</strong>
                  <p>{region.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="converter-block">
            <div className="section-heading">
              <p className="page-kicker">Fluxo de navegacao</p>
              <h2>Ferramentas e proximas paginas que combinam com esta jornada.</h2>
            </div>

            <div className="related-grid">
              {relatedTools.map((tool) => (
                <Link key={tool.title} href={tool.href} className="related-card">
                  <span className="tool-card-meta">{tool.meta}</span>
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
