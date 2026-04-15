import type { Metadata } from "next";
import { HolidayGuideExplorer } from "@/components/tools/HolidayGuideExplorer";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guia de feriados",
  description:
    "Consulte os proximos feriados do Brasil e compare com outros paises em uma ferramenta editorial para agenda e planejamento.",
  alternates: {
    canonical: "/guia-feriados",
  },
};

const faqItems = [
  {
    question: "O guia mostra so os proximos feriados?",
    answer:
      "No topo da ferramenta, sim. A leitura inicial destaca apenas os cinco proximos feriados para acelerar a consulta.",
  },
  {
    question: "Posso ver o ano inteiro de outro pais?",
    answer:
      "Sim. A parte inferior da pagina mostra a lista anual completa do pais selecionado.",
  },
  {
    question: "Essa pagina substitui o calendario mensal?",
    answer:
      "Nao. O calendario continua focado no mes; o guia de feriados concentra a exploracao editorial de feriados por pais.",
  },
];

export default function HolidayGuidePage() {
  const referenceDate = new Date();
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
    url: `${getSiteUrl()}/guia-feriados`,
  };

  return (
    <div className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="page-hero">
        <p className="page-kicker">Feriados e agenda</p>
        <h1>Guia de feriados</h1>
        <p>
          Uma ferramenta propria para consultar proximos feriados, comparar
          paises e abrir leitura anual completa sem poluir a experiencia do
          calendario mensal.
        </p>
      </section>

      <HolidayGuideExplorer referenceDateIso={referenceDate.toISOString()} />

      <section className="legal-card">
        <h2>Como usar</h2>
        <p>
          Compare os proximos feriados do Brasil com outro pais, troque o
          seletor para explorar novas agendas nacionais e use a lista anual para
          planejar janelas de publicacao, operacao, viagens ou pausas.
        </p>

        <h3>Perguntas frequentes</h3>
        <ul className="calculator-faq">
          {faqItems.map((item) => (
            <li key={item.question}>
              <strong>{item.question}</strong> {item.answer}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
