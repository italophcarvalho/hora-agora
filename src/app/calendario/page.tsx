import type { Metadata } from "next";
import { CalendarExplorer } from "@/components/tools/CalendarExplorer";
import { HolidayCountryPicker } from "@/components/tools/HolidayCountryPicker";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calendario mensal",
  description:
    "Consulte o calendario do mes, destaque o dia atual e prepare o terreno para feriados e planejamento de agenda.",
  alternates: {
    canonical: "/calendario",
  },
};

const faqItems = [
  {
    question: "O calendario mostra o mes atual?",
    answer:
      "Sim. A ferramenta abre no mes atual e permite navegar de forma simples para meses anteriores e seguintes.",
  },
  {
    question: "Posso usar para planejar agenda?",
    answer:
      "Sim. O objetivo inicial e oferecer uma leitura rapida do mes, semanas e contexto do dia selecionado.",
  },
  {
    question: "Vai incluir feriados depois?",
    answer:
      "Sim. A proxima expansao planejada e adicionar lista de feriados de todos os paises.",
  },
];

const brazilNationalHolidays = [
  {
    date: "01 jan 2026",
    label: "Confraternizacao Universal",
    note: "Abre o calendario civil do ano.",
  },
  {
    date: "03 abr 2026",
    label: "Paixao de Cristo",
    note: "Data movel do calendario religioso.",
  },
  {
    date: "21 abr 2026",
    label: "Tiradentes",
    note: "Feriado nacional civico.",
  },
  {
    date: "01 maio 2026",
    label: "Dia do Trabalho",
    note: "Data nacional do trabalho.",
  },
  {
    date: "07 set 2026",
    label: "Independencia do Brasil",
    note: "Marco civico nacional.",
  },
  {
    date: "12 out 2026",
    label: "Nossa Senhora Aparecida",
    note: "Padroeira do Brasil.",
  },
  {
    date: "02 nov 2026",
    label: "Finados",
    note: "Feriado nacional.",
  },
  {
    date: "15 nov 2026",
    label: "Proclamacao da Republica",
    note: "Marco civico nacional.",
  },
  {
    date: "20 nov 2026",
    label: "Dia da Consciencia Negra",
    note: "Feriado nacional.",
  },
  {
    date: "25 dez 2026",
    label: "Natal",
    note: "Encerramento do ano civil.",
  },
];

export default function CalendarPage() {
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
    url: `${getSiteUrl()}/calendario`,
  };

  return (
    <div className="page-stack">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="page-hero">
        <p className="page-kicker">Agenda e datas</p>
        <h1>Calendario mensal</h1>
        <p>
          Uma ferramenta de base para leitura do mes, selecao de dias e
          evolucao futura com feriados internacionais, dias uteis e planejamento
          anual.
        </p>
      </section>

      <CalendarExplorer />

      <section className="holiday-columns" aria-label="Listas de feriados">
        <section className="holiday-section-card">
          <div className="holiday-section-heading">
            <h2>Feriados do Brasil em 2026.</h2>
          </div>

          <div className="holiday-list">
            {brazilNationalHolidays.map((holiday) => (
              <article key={holiday.date} className="holiday-item">
                <strong>{holiday.date}</strong>
                <div>
                  <h3>{holiday.label}</h3>
                  <p>{holiday.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <HolidayCountryPicker />
      </section>

      <section className="legal-card">
        <h2>Como usar</h2>
        <p>
          Navegue pelos meses, clique em um dia para ver o contexto da data e
          use a leitura rapida de semana e trimestre como apoio para agenda e
          organizacao do periodo.
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
